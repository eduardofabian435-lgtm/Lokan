import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

// Parse request bodies as JSON
app.use(express.json());

// Initialize Google Gen AI lazily or safely
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!ai) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      // Return a dummy object if missing, but we'll throw an error if used
      console.warn("⚠️ Warning: GEMINI_API_KEY is not defined in environment variables.");
    }
    ai = new GoogleGenAI({
      apiKey: key || "dummy_key",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return ai;
}

// 1. API: Custom system proposal generator using Gemini
app.post("/api/generate-system", async (req, res) => {
  try {
    const { companyName, segment, colorTheme, painPoints, features } = req.body;

    if (!companyName || !segment) {
      return res.status(400).json({ error: "Nome da empresa e segmento são obrigatórios." });
    }

    const client = getGeminiClient();
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "GEMINI_API_KEY não foi configurado. Por favor, adicione sua chave de API nos Segredos."
      });
    }

    const promptText = `
      Crie uma proposta de sistema inovador e personalizado com a cara da empresa para:
      Nome da Empresa: "${companyName}"
      Segmento de Atuação: "${segment}"
      Cores preferidas/Identidade: "${colorTheme || "Combinação moderna tecnológica"}"
      Dores/Frustrações a resolver (processos manuais antigos): "${painPoints || "Planilhas confusas e cadernos de anotações"}"
      Recursos adicionais focados: "${features && features.length > 0 ? features.join(", ") : "Gestão geral, relatórios inteligentes"}"

      Explique os problemas que eles estão enfrentando ao continuar no Excel / caderno / papel (erros de digitação, falta de relatórios, perda de tempo, insegurança de dados). Proponha um painel sob medida.
    `;

    const systemInstruction = `
      Você é o Engenheiro de Software Chefe eUX Designer sênior da LOKAN, empresa baiana de tecnologia sediada na Ilha de Vera Cruz.
      Sua missão é projetar mentalmente um sistema web sob medida, moderno, inteligente e 100% focado no segmento do cliente para substituir processos manuais obsoletos (Excel, cadernos, etc).
      Gere um objeto JSON completo respeitando estritamente o esquema fornecido.
      As métricas de KPIs (keyPerformanceIndicators) e as bases de dados de demonstração (modulesData) devem conter dados realistas, contextualizados e representativos específicos do negócio solicitado (exemplo: se for pizzaria, comanda com pizzas famosas; se for escritório, faturas de serviços consultivos; se for ponto online, ponto de funcionários locais).
      Em 'budgetExplanation', descreva um tom acolhedor e altamente persuasivo para vendas, enfatizando a localização da LOKAN na Bahia, a proximidade do atendimento humanizado, os passos estratégicos do desenvolvimento personalizado e as economias estimadas de tempo e dinheiro ao migrar das planilhas para a LOKAN.
      Escreva todos os textos em Português do Brasil.
    `;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: [
            "systemTitle",
            "brandMood",
            "colorHex",
            "secondaryColorHex",
            "accentColorHex",
            "welcomeMessage",
            "keyPerformanceIndicators",
            "modulesData",
            "databaseTables",
            "budgetExplanation",
            "detectedFlaws",
            "scores",
            "aiRecommendation",
            "systemTree",
            "impactProjections"
          ],
          properties: {
            systemTitle: {
              type: Type.STRING,
              description: "Um nome elegante e personalizado para o sistema do cliente, ex: RestauranteGest, VeraPonto, MarEsmalte, etc."
            },
            brandMood: {
              type: Type.STRING,
              description: "Uma frase marcante ou slogan sob medida para a cara do sistema gerado."
            },
            colorHex: {
              type: Type.STRING,
              description: "Código de cor hexadecimal primária para customizar o fundo e componentes do painel (ex: '#2563eb'). Deve harmonizar com as preferências do cliente."
            },
            secondaryColorHex: {
              type: Type.STRING,
              description: "Código de cor hexadecimal secundária correspondente."
            },
            accentColorHex: {
              type: Type.STRING,
              description: "Código de cor hexadecimal para botões de destaque, sucesso, ou badges de destaque."
            },
            welcomeMessage: {
              type: Type.STRING,
              description: "Uma mensagem personalizada de boas-vindas do painel que faz o usuário se sentir dono da plataforma."
            },
            keyPerformanceIndicators: {
              type: Type.ARRAY,
              description: "Conjunto de 3 a 4 indicadores-chave para o dashboard do cliente, ex: total de comissões, faturamento simulado, produtos em estoque, horas de ponto registradas.",
              items: {
                type: Type.OBJECT,
                required: ["label", "value", "trend", "iconName"],
                properties: {
                  label: { type: Type.STRING },
                  value: { type: Type.STRING },
                  trend: { type: Type.STRING, description: "Indicação de crescimento ou status, ex: '+14% esta semana' ou 'Funcionamento Normal'" },
                  iconName: { type: Type.STRING, description: "Nome de ícone do Lucide, use exclusivamente um dos seguintes: TrendingUp, DollarSign, Users, Clock, Layers, Package, AlertCircle, Sparkles, CheckCircle" }
                }
              }
            },
            modulesData: {
              type: Type.ARRAY,
              description: "Tabelas completas com dados demonstrativos simulando o módulo do sistema, ex: histórico de comandas, lista de colaboradores ou romaneio de faturas.",
              items: {
                type: Type.OBJECT,
                required: ["moduleName", "columns", "rows"],
                properties: {
                  moduleName: { type: Type.STRING, description: "Nome do módulo comercial, ex: 'Controle de Entrada', 'Vendas Concluídas', 'Insumos Críticos'" },
                  columns: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  rows: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    }
                  }
                }
              }
            },
            databaseTables: {
              type: Type.ARRAY,
              description: "Modelagem das tabelas do banco de dados relacional que seriam criadas pela LOKAN para o cliente.",
              items: {
                type: Type.OBJECT,
                required: ["tableName", "description", "fields"],
                properties: {
                  tableName: { type: Type.STRING, description: "Nome técnico da tabela, ex: tbl_comandas, tbl_registro_pontos, tbl_pedidos_estoque" },
                  description: { type: Type.STRING, description: "Para que serve esta tabela na modelagem" },
                  fields: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      required: ["name", "type", "description"],
                      properties: {
                        name: { type: Type.STRING },
                        type: { type: Type.STRING, description: "Tipo de dados ex: VARCHAR(255), INTEGER, TIMESTAMP, DECIMAL(10,2)" },
                        description: { type: Type.STRING }
                      }
                    }
                  }
                }
              }
            },
            budgetExplanation: {
              type: Type.STRING,
              description: "A explicação consultiva comercial sob medida da LOKAN sobre o projeto desenvolvido para eles, estimativas de produtividade e como a LOKAN implementará isso."
            },
            detectedFlaws: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Uma lista de 3 a 5 dores e falhas que a IA detectou que ocorrem se a empresa continuar usando Excel/cadernos, ex: 'Duplicidade de lançamentos manuais', 'Inconsistência de caixa de fechamento'."
            },
            scores: {
              type: Type.OBJECT,
              required: ["organization", "automation", "financialControl", "scalability"],
              properties: {
                organization: { type: Type.INTEGER, description: "Score atual estimado antes da migração (de 1 a 100)" },
                automation: { type: Type.INTEGER, description: "Score de automação estimado antes da migração (de 1 a 100)" },
                financialControl: { type: Type.INTEGER, description: "Score de controle analítico atual (de 1 a 100)" },
                scalability: { type: Type.INTEGER, description: "Score de capacidade de expansão atual (de 1 a 100)" }
              }
            },
            aiRecommendation: {
              type: Type.STRING,
              description: "Uma explicação em tom de assistente inteligente IA explicando amigavelmente seus achados e por que o sistema projetado é ideal."
            },
            systemTree: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Uma árvore estrutural simplificada das camadas principais do sistema que a IA montou, ex: ['Painel Geral', 'Módulo Frente de Caixa', 'Aplicativo Garçom', 'Módulo Estoque']"
            },
            impactProjections: {
              type: Type.ARRAY,
              description: "Conjunto de 3 a 4 projeções de melhoria com números precisos, ex: '+40% Produtividade', '15 horas/semana salvas', etc.",
              items: {
                type: Type.OBJECT,
                required: ["metric", "improvement", "details"],
                properties: {
                  metric: { type: Type.STRING, description: "Nome da métrica, ex: 'Produtividade Geral', 'Redução de Erros', 'Economia de Tempo'" },
                  improvement: { type: Type.STRING, description: "O número/gráfico de melhoria, ex: '+35%', 'Erro Zero', '15h economizadas'" },
                  details: { type: Type.STRING, description: "Breve detalhe, ex: 'Automatizando a digitação de comandas para a cozinha'" }
                }
              }
            }
          }
        }
      }
    });

    const textResult = response.text || "{}";
    res.json(JSON.parse(textResult));

  } catch (err: any) {
    console.error("Erro no API generate-system:", err);
    res.status(500).json({
      error: "Ocorreu um erro ao planejar seu sistema personalizado.",
      details: err?.message || err
    });
  }
});

// Serve health status
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

// Configure Vite or Serve static assets
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite dev middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving static files in production...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 LOKAN Full-Stack Dev Server running on http://localhost:${PORT}`);
  });
}

setupServer();
