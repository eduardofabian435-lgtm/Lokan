var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
var ai = null;
function getGeminiClient() {
  if (!ai) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("\u26A0\uFE0F Warning: GEMINI_API_KEY is not defined in environment variables.");
    }
    ai = new import_genai.GoogleGenAI({
      apiKey: key || "dummy_key",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return ai;
}
app.post("/api/generate-system", async (req, res) => {
  try {
    const { companyName, segment, colorTheme, painPoints, features } = req.body;
    if (!companyName || !segment) {
      return res.status(400).json({ error: "Nome da empresa e segmento s\xE3o obrigat\xF3rios." });
    }
    const client = getGeminiClient();
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "GEMINI_API_KEY n\xE3o foi configurado. Por favor, adicione sua chave de API nos Segredos."
      });
    }
    const promptText = `
      Crie uma proposta de sistema inovador e personalizado com a cara da empresa para:
      Nome da Empresa: "${companyName}"
      Segmento de Atua\xE7\xE3o: "${segment}"
      Cores preferidas/Identidade: "${colorTheme || "Combina\xE7\xE3o moderna tecnol\xF3gica"}"
      Dores/Frustra\xE7\xF5es a resolver (processos manuais antigos): "${painPoints || "Planilhas confusas e cadernos de anota\xE7\xF5es"}"
      Recursos adicionais focados: "${features && features.length > 0 ? features.join(", ") : "Gest\xE3o geral, relat\xF3rios inteligentes"}"

      Explique os problemas que eles est\xE3o enfrentando ao continuar no Excel / caderno / papel (erros de digita\xE7\xE3o, falta de relat\xF3rios, perda de tempo, inseguran\xE7a de dados). Proponha um painel sob medida.
    `;
    const systemInstruction = `
      Voc\xEA \xE9 o Engenheiro de Software Chefe eUX Designer s\xEAnior da LOKAN, empresa baiana de tecnologia sediada na Ilha de Vera Cruz.
      Sua miss\xE3o \xE9 projetar mentalmente um sistema web sob medida, moderno, inteligente e 100% focado no segmento do cliente para substituir processos manuais obsoletos (Excel, cadernos, etc).
      Gere um objeto JSON completo respeitando estritamente o esquema fornecido.
      As m\xE9tricas de KPIs (keyPerformanceIndicators) e as bases de dados de demonstra\xE7\xE3o (modulesData) devem conter dados realistas, contextualizados e representativos espec\xEDficos do neg\xF3cio solicitado (exemplo: se for pizzaria, comanda com pizzas famosas; se for escrit\xF3rio, faturas de servi\xE7os consultivos; se for ponto online, ponto de funcion\xE1rios locais).
      Em 'budgetExplanation', descreva um tom acolhedor e altamente persuasivo para vendas, enfatizando a localiza\xE7\xE3o da LOKAN na Bahia, a proximidade do atendimento humanizado, os passos estrat\xE9gicos do desenvolvimento personalizado e as economias estimadas de tempo e dinheiro ao migrar das planilhas para a LOKAN.
      Escreva todos os textos em Portugu\xEAs do Brasil.
    `;
    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: import_genai.Type.OBJECT,
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
              type: import_genai.Type.STRING,
              description: "Um nome elegante e personalizado para o sistema do cliente, ex: RestauranteGest, VeraPonto, MarEsmalte, etc."
            },
            brandMood: {
              type: import_genai.Type.STRING,
              description: "Uma frase marcante ou slogan sob medida para a cara do sistema gerado."
            },
            colorHex: {
              type: import_genai.Type.STRING,
              description: "C\xF3digo de cor hexadecimal prim\xE1ria para customizar o fundo e componentes do painel (ex: '#2563eb'). Deve harmonizar com as prefer\xEAncias do cliente."
            },
            secondaryColorHex: {
              type: import_genai.Type.STRING,
              description: "C\xF3digo de cor hexadecimal secund\xE1ria correspondente."
            },
            accentColorHex: {
              type: import_genai.Type.STRING,
              description: "C\xF3digo de cor hexadecimal para bot\xF5es de destaque, sucesso, ou badges de destaque."
            },
            welcomeMessage: {
              type: import_genai.Type.STRING,
              description: "Uma mensagem personalizada de boas-vindas do painel que faz o usu\xE1rio se sentir dono da plataforma."
            },
            keyPerformanceIndicators: {
              type: import_genai.Type.ARRAY,
              description: "Conjunto de 3 a 4 indicadores-chave para o dashboard do cliente, ex: total de comiss\xF5es, faturamento simulado, produtos em estoque, horas de ponto registradas.",
              items: {
                type: import_genai.Type.OBJECT,
                required: ["label", "value", "trend", "iconName"],
                properties: {
                  label: { type: import_genai.Type.STRING },
                  value: { type: import_genai.Type.STRING },
                  trend: { type: import_genai.Type.STRING, description: "Indica\xE7\xE3o de crescimento ou status, ex: '+14% esta semana' ou 'Funcionamento Normal'" },
                  iconName: { type: import_genai.Type.STRING, description: "Nome de \xEDcone do Lucide, use exclusivamente um dos seguintes: TrendingUp, DollarSign, Users, Clock, Layers, Package, AlertCircle, Sparkles, CheckCircle" }
                }
              }
            },
            modulesData: {
              type: import_genai.Type.ARRAY,
              description: "Tabelas completas com dados demonstrativos simulando o m\xF3dulo do sistema, ex: hist\xF3rico de comandas, lista de colaboradores ou romaneio de faturas.",
              items: {
                type: import_genai.Type.OBJECT,
                required: ["moduleName", "columns", "rows"],
                properties: {
                  moduleName: { type: import_genai.Type.STRING, description: "Nome do m\xF3dulo comercial, ex: 'Controle de Entrada', 'Vendas Conclu\xEDdas', 'Insumos Cr\xEDticos'" },
                  columns: {
                    type: import_genai.Type.ARRAY,
                    items: { type: import_genai.Type.STRING }
                  },
                  rows: {
                    type: import_genai.Type.ARRAY,
                    items: {
                      type: import_genai.Type.ARRAY,
                      items: { type: import_genai.Type.STRING }
                    }
                  }
                }
              }
            },
            databaseTables: {
              type: import_genai.Type.ARRAY,
              description: "Modelagem das tabelas do banco de dados relacional que seriam criadas pela LOKAN para o cliente.",
              items: {
                type: import_genai.Type.OBJECT,
                required: ["tableName", "description", "fields"],
                properties: {
                  tableName: { type: import_genai.Type.STRING, description: "Nome t\xE9cnico da tabela, ex: tbl_comandas, tbl_registro_pontos, tbl_pedidos_estoque" },
                  description: { type: import_genai.Type.STRING, description: "Para que serve esta tabela na modelagem" },
                  fields: {
                    type: import_genai.Type.ARRAY,
                    items: {
                      type: import_genai.Type.OBJECT,
                      required: ["name", "type", "description"],
                      properties: {
                        name: { type: import_genai.Type.STRING },
                        type: { type: import_genai.Type.STRING, description: "Tipo de dados ex: VARCHAR(255), INTEGER, TIMESTAMP, DECIMAL(10,2)" },
                        description: { type: import_genai.Type.STRING }
                      }
                    }
                  }
                }
              }
            },
            budgetExplanation: {
              type: import_genai.Type.STRING,
              description: "A explica\xE7\xE3o consultiva comercial sob medida da LOKAN sobre o projeto desenvolvido para eles, estimativas de produtividade e como a LOKAN implementar\xE1 isso."
            },
            detectedFlaws: {
              type: import_genai.Type.ARRAY,
              items: { type: import_genai.Type.STRING },
              description: "Uma lista de 3 a 5 dores e falhas que a IA detectou que ocorrem se a empresa continuar usando Excel/cadernos, ex: 'Duplicidade de lan\xE7amentos manuais', 'Inconsist\xEAncia de caixa de fechamento'."
            },
            scores: {
              type: import_genai.Type.OBJECT,
              required: ["organization", "automation", "financialControl", "scalability"],
              properties: {
                organization: { type: import_genai.Type.INTEGER, description: "Score atual estimado antes da migra\xE7\xE3o (de 1 a 100)" },
                automation: { type: import_genai.Type.INTEGER, description: "Score de automa\xE7\xE3o estimado antes da migra\xE7\xE3o (de 1 a 100)" },
                financialControl: { type: import_genai.Type.INTEGER, description: "Score de controle anal\xEDtico atual (de 1 a 100)" },
                scalability: { type: import_genai.Type.INTEGER, description: "Score de capacidade de expans\xE3o atual (de 1 a 100)" }
              }
            },
            aiRecommendation: {
              type: import_genai.Type.STRING,
              description: "Uma explica\xE7\xE3o em tom de assistente inteligente IA explicando amigavelmente seus achados e por que o sistema projetado \xE9 ideal."
            },
            systemTree: {
              type: import_genai.Type.ARRAY,
              items: { type: import_genai.Type.STRING },
              description: "Uma \xE1rvore estrutural simplificada das camadas principais do sistema que a IA montou, ex: ['Painel Geral', 'M\xF3dulo Frente de Caixa', 'Aplicativo Gar\xE7om', 'M\xF3dulo Estoque']"
            },
            impactProjections: {
              type: import_genai.Type.ARRAY,
              description: "Conjunto de 3 a 4 proje\xE7\xF5es de melhoria com n\xFAmeros precisos, ex: '+40% Produtividade', '15 horas/semana salvas', etc.",
              items: {
                type: import_genai.Type.OBJECT,
                required: ["metric", "improvement", "details"],
                properties: {
                  metric: { type: import_genai.Type.STRING, description: "Nome da m\xE9trica, ex: 'Produtividade Geral', 'Redu\xE7\xE3o de Erros', 'Economia de Tempo'" },
                  improvement: { type: import_genai.Type.STRING, description: "O n\xFAmero/gr\xE1fico de melhoria, ex: '+35%', 'Erro Zero', '15h economizadas'" },
                  details: { type: import_genai.Type.STRING, description: "Breve detalhe, ex: 'Automatizando a digita\xE7\xE3o de comandas para a cozinha'" }
                }
              }
            }
          }
        }
      }
    });
    const textResult = response.text || "{}";
    res.json(JSON.parse(textResult));
  } catch (err) {
    console.error("Erro no API generate-system:", err);
    res.status(500).json({
      error: "Ocorreu um erro ao planejar seu sistema personalizado.",
      details: err?.message || err
    });
  }
});
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: /* @__PURE__ */ new Date() });
});
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite dev middleware...");
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving static files in production...");
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`\u{1F680} LOKAN Full-Stack Dev Server running on http://localhost:${PORT}`);
  });
}
setupServer();
//# sourceMappingURL=server.cjs.map
