import { SystemProposal } from "./types";

export const SERVICES = [
  {
    id: "gestao",
    title: "Sistema de Gestão Empresarial",
    short: "ERP Completo",
    icon: "Layers",
    description: "Controle financeiro total, registro de vendas PDV, controle de estoque inteligente, emissão de relatórios consolidados, histórico de clientes e administração unificada em uma única tela.",
    badge: "Mais Vendido"
  },
  {
    id: "ponto",
    title: "Sistema de Ponto Online",
    short: "Controle de Presença",
    icon: "Clock",
    description: "Controle digital de funcionários com geolocalização ou foto, gestão de horários, faltas registradas, banco de horas automático e conformidade com as regras trabalhistas.",
    badge: "Implantação Imediata"
  },
  {
    id: "sites",
    title: "Criação de Sites",
    short: "Institucionais & Landing Pages",
    icon: "Sparkles",
    description: "Desenvolvimento de sites profissionais, elegantes, extremamente rápidos, otimizados para o Google (SEO) e totalmente focados em converter cliques de visitantes em vendas diretas.",
    badge: "Alta Conversão"
  },
  {
    id: "personalizados",
    title: "Sistemas Personalizados",
    short: "Desenho Sob Medida",
    icon: "Code",
    description: "Criamos qualquer sistema do zero e sob demanda, modelado perfeitamente para atender à realidade operacional exclusiva e fluxos de trabalho do seu negócio local.",
    badge: "Sem Limites"
  },
  {
    id: "apps",
    title: "Aplicativos e Plataformas Web",
    short: "Acesso Mobile Total",
    icon: "Tv",
    description: "Plataformas web de alta performance e aplicativos híbridos otimizados para smartphones, permitindo que você gerencie seu negócio em trânsito com total segurança dos dados.",
    badge: "100% Responsivo"
  },
  {
    id: "automacao",
    title: "Automação Empresarial",
    short: "Elimine Gargalos",
    icon: "TrendingUp",
    description: "Substitua de forma automática processos repetitivos de redigitação, envio automático de mensagens/lembretes, alertas de estoque baixo e backups programados em nuvem.",
    badge: "Economia de Tempo"
  }
];

export const DIFFERENTIALS = [
  {
    title: "FEITO PARA SUA EMPRESA",
    description: "Diferente de softwares genéricos de grandes capitais, o seu sistema é moldado sob medida para o seu estilo de atendimento e processos.",
    icon: "CheckCircle"
  },
  {
    title: "GESTÃO NA PALMA DA MÃO",
    description: "Monitore faturamento, estoques críticos e equipe de trabalho diretamente pelo celular, esteja você em Vera Cruz ou em qualquer lugar do mundo.",
    icon: "Tv"
  },
  {
    title: "MAIS ORGANIZAÇÃO",
    description: "Elimine de vez as anotações espalhadas, fiados esquecidos, cadernos rasgados e erros em fórmulas de planilhas complexas que travam o computador.",
    icon: "Layers"
  },
  {
    title: "MAIS PRODUTIVIDADE",
    description: "Economize até 15 horas semanais eliminando conferências manuais e fechamentos de caixa estressantes no fim de cada expediente.",
    icon: "TrendingUp"
  },
  {
    title: "SUPORTE HUMANIZADO",
    description: "Sem robôs impessoais de atendimento. Nossa equipe é local, acolhedora, prestativa e disposta a ajudar por WhatsApp, ligação ou visita presencial.",
    icon: "Users"
  },
  {
    title: "REFERÊNCIA EM VERA CRUZ",
    description: "Sediada na Ilha de Vera Cruz, Bahia, conhecemos intimamente a economia local (comércio, turismo, pousadas e serviços) e somos pioneiros regionais.",
    icon: "Sparkles"
  }
];

export const PRE_MADE_PROPOSALS: Record<string, SystemProposal> = {
  restaurante: {
    systemTitle: "SaborDaIlha Control",
    brandMood: "A excelência em gastronomia encontra a precisão da automação",
    colorHex: "#f97316", // Orange
    secondaryColorHex: "#c2410c",
    accentColorHex: "#10b981", // Emerald
    welcomeMessage: "Olá, Chef! O salão do Sabor da Ilha está ativo com 12 mesas ocupadas e 4 pedidos em andamento na cozinha.",
    keyPerformanceIndicators: [
      { label: "Mesas Ativas", value: "12 / 24", trend: "Funcionando com 50% de ocupação", iconName: "Layers" },
      { label: "Faturamento Hoje", value: "R$ 1.842,50", trend: "+14.2% que a última quinta-feira", iconName: "DollarSign" },
      { label: "Pedidos na Cozinha", value: "4 pendentes", trend: "Tempo médio de entrega: 22 min", iconName: "Clock" },
      { label: "Giro de Pratos", value: "48 pedidos", trend: "Prato destaque: Moqueca de Peixe", iconName: "TrendingUp" }
    ],
    modulesData: [
      {
        moduleName: "Fila de Pedidos - Cozinha Real-Time",
        columns: ["Mesa/Estação", "Pedido", "Horário", "Status"],
        rows: [
          ["Mesa 04 (Varanda)", "1x Moqueca de Camarão + 2x Suco de Umbu", "14:12", "Preparando"],
          ["Mesa 11 (Salão)", "1x Casquinha de Siri + 1x Cerveja Original", "14:20", "Aguardando Bebida"],
          ["Delivery Barra do Gil", "2x Pizza Marguerita Grande + 1x Coca-cola 2L", "14:25", "No Forno"],
          ["Mesa 08 (Deck)", "1x Filé de Peixe Grelhado + 1x Água Mineral", "13:58", "Entregue"]
        ]
      },
      {
        moduleName: "Controle de Estoque de Insumos Críticos",
        columns: ["Insumo", "Nível Atual", "Alerta", "Status"],
        rows: [
          ["Filé de Camarão Gg", "2.4 kg", "Menos de 5 kg", "Comprar Urgente"],
          ["Azeite de Dendê Especial", "12 litros", "Menos de 4 litros", "Abastecido"],
          ["Polpa de Cajá", "35 unidades", "Menos de 10 unidades", "Abastecido"],
          ["Cerveja Devassa 600ml", "2 caixas", "Menos de 5 caixas", "Abaixo do Ideal"]
        ]
      }
    ],
    databaseTables: [
      {
        tableName: "tbl_pedidos_comanda",
        description: "Registra cada transação e itens solicitados pelas mesas ou delivery na Ilha.",
        fields: [
          { name: "id_comanda", type: "INT PRIMARY KEY AUTO_INCREMENT", description: "Código identificador do pedido" },
          { name: "num_mesa", type: "INT", description: "Identifica a localização no salão ou se é delivery (0)" },
          { name: "itens_json", type: "JSON", description: "Vetor de produtos e quantidades correspondentes" },
          { name: "valor_total", type: "DECIMAL(10,2)", description: "Soma financeira calculada automaticamente" },
          { name: "horario_registro", type: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", description: "Momento exato em que a comanda foi aberta pelo garçom" }
        ]
      },
      {
        tableName: "tbl_estoque_insumos",
        description: "Gerencia a pesagem de ingredientes chaves e evita rupturas em datas festivas de grande movimento na Ilha.",
        fields: [
          { name: "id_insumo", type: "INT", description: "Identificação única" },
          { name: "nome_ingrediente", type: "VARCHAR(120)", description: "Nome comum usado na cozinha" },
          { name: "quantidade_estoque", type: "DECIMAL(10,3)", description: "Volume ou peso físico atualizado via PDV" },
          { name: "ponto_critico", type: "DECIMAL(10,3)", description: "Quantidade mínima recomendada para alerta de compras" }
        ]
      }
    ],
    budgetExplanation: "Para o segmento de Restaurantes e Bares em Vera Cruz, nossa modelagem integra o fechamento ágil de mesas com o aplicativo móvel dos garçons e comandas de impressão térmica na cozinha. Eliminando comanda manual em papel, o SaborDaIlha Control preserva mais de 8% de desperdício em itens que antes esqueciam de ser anotados no caixa!",
    
    // Novas propriedades realistas
    detectedFlaws: [
      "Gargalo severo na comunicação manual entre salão e cozinha",
      "Inconsistência recorrente de fechamento financeiro de turnos",
      "Falta de controle de estoque mínimo para datas turísticas de alto giro",
      "Dependência total de papelotes que molham ou se perdem no expediente"
    ],
    scores: {
      organization: 35,
      automation: 18,
      financialControl: 45,
      scalability: 20
    },
    aiRecommendation: "Analisamos minuciosamente o salão e a cozinha de um típico restaurante gastronômico de Vera Cruz. O uso de blocos de papel e as planilhas manuais atrasam o faturamento de mesas em até 25 minutos. Recomendamos SaborDaIlha Control para dispensar o papel e centralizar pedidos, comissões de garçons e faturamento.",
    systemTree: [
      "Sistema Restaurante Executivo",
      "├── Caixa Frente de PDV Sincronizado",
      "├── Comanda eletrônica em Tablets/Celulares",
      "├── Painel de Cozinha (Monitor KDS)",
      "├── Estoque & Alertas de Insumos",
      "└── Painel Gerencial de Faturamento"
    ],
    impactProjections: [
      { metric: "Produtividade de Salão", improvement: "+45%", details: "Garçons enviam pedidos na mesa sem andar até o caixa" },
      { metric: "Acurácia de Estoque", improvement: "100%", details: "Baixa automatizada ao faturar pratos de alto custo" },
      { metric: "Retenção de Desperdício", improvement: "-88%", details: "Extinção completa de pedidos servidos mas esquecidos no papel" }
    ]
  },
  ponto: {
    systemTitle: "IlhaPonto Digital",
    brandMood: "Fidelidade de presença e segurança trabalhista ao seu alcance",
    colorHex: "#3b82f6", // Blue
    secondaryColorHex: "#1d4ed8",
    accentColorHex: "#3b82f6",
    welcomeMessage: "Bem-vindo ao Painel Administrativo de Recursos Humanos. Seus colaboradores já registraram os pontos de entrada do turno matutino.",
    keyPerformanceIndicators: [
      { label: "Colaboradores Ativos", value: "18 registrados", trend: "100% de presença hoje", iconName: "Users" },
      { label: "Ponto em Aberto", value: "0 pendências", trend: "Todos registraram entrada no horário correto", iconName: "CheckCircle" },
      { label: "Banco de Horas Total", value: "+32h acumuladas", trend: "Ideal para compensação de feriados", iconName: "Clock" },
      { label: "Atrasos Recorrentes", value: "1 alerta leve", trend: "Abaixo da média setorial de 5%", iconName: "AlertCircle" }
    ],
    modulesData: [
      {
        moduleName: "Registros de Ponto em Tempo Real",
        columns: ["Colaborador", "Cargo", "Entrada", "Saída Almoço", "Geolocalização"],
        rows: [
          ["Mariana de Souza dos Anjos", "Gerente de Atendimento - Mar Grande", "08:02 AM", "12:00 PM", "Vera Cruz, 150m da filial"],
          ["Marcos Vinicius Santos", "Operador de Caixa", "07:58 AM", "12:05 PM", "Vera Cruz, Centro"],
          ["Ana Paula Cavalcante", "Auxiliar Administrativo", "08:00 AM", "Pendente", "Barra do Gil, Home Office"],
          ["Carlos Alberto Andrade", "Estoquista", "08:15 AM (Atraso 15m)", "12:10 PM", "Vera Cruz, No local"]
        ]
      }
    ],
    databaseTables: [
      {
        tableName: "tbl_registros_ponto",
        description: "Armazena a folha de presença criptografada e georreferenciada de cada funcionário.",
        fields: [
          { name: "id_ponto", type: "BIGINT PRIMARY KEY", description: "Código gerado único inviolável" },
          { name: "matricula_colaborador", type: "VARCHAR(20)", description: "ID único do funcionário na empresa" },
          { name: "horario_registro", type: "TIMESTAMP", description: "Carimbo de data/hora oficial sincronizado com servidor" },
          { name: "latitude_longitude", type: "VARCHAR(50)", description: "Coordenadas GPS coletadas pelo app mobile para comprovação" },
          { name: "assinatura_digital", type: "VARCHAR(64)", description: "Hash SHA-256 de segurança contra fraudes no registro" }
        ]
      }
    ],
    budgetExplanation: "O IlhaPonto foi desenhado especificamente para as empresas baianas se adequarem à Portaria 671 do MTE. Com geolocalização exata, o gestor de Vera Cruz tem o controle total da equipe externo ou nas filiais litorâneas, cortando o custo com aparelhos físicos de relógio de ponto que vivem sem papel ou com falhas de energia!",
    
    detectedFlaws: [
      "Assinaturas manuais em cadernos totalmente fraudáveis",
      "Processo de fechamento de folha demorando 4 dias úteis",
      "Dificuldade de apurar horas extras reais de funcionários externos"
    ],
    scores: {
      organization: 40,
      automation: 10,
      financialControl: 55,
      scalability: 35
    },
    aiRecommendation: "Anotar ponto em folha de livro gera falhas jurídicas graves para seu negócio na Bahia. Com o IlhaPonto, você economizará dezenas de horas de digitação e cálculos no fim do mês. Oferecemos marcação rápida por senha com detecção de Wi-Fi corporativo ou GPS integrado.",
    systemTree: [
      "Sistema Registro de Ponto",
      "├── Painel de Controle de RH",
      "├── Aplicativo de Marcação Integrado",
      "├── Auditoria de Geolocalização (GPS)",
      "├── Automatizador de Banco de Horas",
      "└── PDF de Folha com 1 clique"
    ],
    impactProjections: [
      { metric: "Segurança de Ponto", improvement: "Criptografado", details: "Assinatura inviolável com rastreamento geográfico" },
      { metric: "Economia de Cálculo", improvement: "90% Tempo", details: "Feche as horas de todos os funcionários em minutos" },
      { metric: "Conformidade MTE", improvement: "100%", details: "Totalmente alinhado à nova Portaria 671 do Ministério do Trabalho" }
    ]
  },
  comercio: {
    systemTitle: "LokanERP - Comercial",
    brandMood: "Sistemas unificados para varejo de alto desempenho",
    colorHex: "#10b981", // Emerald
    secondaryColorHex: "#047857",
    accentColorHex: "#fbbf24", // Gold
    welcomeMessage: "Painel de controle financeiro e estoque consolidado. O faturamento deste mês superou a meta de vendas estabelecida para a Ilha em 8.5%.",
    keyPerformanceIndicators: [
      { label: "Faturamento Mensal", value: "R$ 42.150,00", trend: "+8.5% acima da meta local", iconName: "DollarSign" },
      { label: "Giro de Estoque", value: "852 itens saídos", trend: "Taxa de conversão de leads: 4.8%", iconName: "TrendingUp" },
      { label: "Produtos Críticos", value: "3 alertas de falta", trend: "Necessita reposição imediata", iconName: "AlertCircle" },
      { label: "Clientes Atendidos", value: "142 compradores", trend: "Ticket médio: R$ 296,80", iconName: "Users" }
    ],
    modulesData: [
      {
        moduleName: "Vendas Recentes do Módulo Frente de Caixa",
        columns: ["Venda ID", "Vendedor", "Cliente", "Total Venda", "Metódo de Pagamento"],
        rows: [
          ["VD-24901", "Joana Dark", "Mercado Mar Grande", "R$ 1.250,00", "PIX"],
          ["VD-24902", "Alexandre Santos", "Pousada Recanto dos Sonhos", "R$ 3.420,00", "Faturado 15 dias"],
          ["VD-24903", "Joana Dark", "Consumidor Final - Barra", "R$ 82,50", "Dinheiro"],
          ["VD-24904", "Alexandre Santos", "Supermercado Aratuba", "R$ 12.800,00", "Cartão de Crédito 3x"]
        ]
      }
    ],
    databaseTables: [
      {
        tableName: "tbl_vendas_consolidado",
        description: "Controle analítico de vendas e impostos para relatórios bimestrais focados no MEI e Simples Nacional.",
        fields: [
          { name: "venda_id", type: "VARCHAR(30) PRIMARY KEY", description: "Código do comprovante fiscal/venda" },
          { name: "total_liquido", type: "DECIMAL(10,2)", description: "Valor faturado deduzidos descontos comerciais" },
          { name: "id_vendedor", type: "INT", description: "Atribuição para comissionamento salarial" },
          { name: "forma_pagamento", type: "VARCHAR(40)", description: "Indicação de PIX, Crédito, Débito, Faturado no boleto" }
        ]
      }
    ],
    budgetExplanation: "Para mercados, armarinhos e lojas locais, o LokanERP unifica estoque físico com vendas rápidas de balcão e frente de caixa. Ele elimina anotações de vendas fiadas no caderninho com alertas via WhatsApp no celular de clientes atrasados, reduzindo a inadimplência local em até 40% já nas primeiras semanas!",
    
    detectedFlaws: [
      "Fiados organizados em caderninhos frágeis e fáceis de perder",
      "Falta de controle de vencimento de lotes e produtos vencidos",
      "Inexistência de visão de margem de lucro líquida semanal"
    ],
    scores: {
      organization: 30,
      automation: 25,
      financialControl: 40,
      scalability: 25
    },
    aiRecommendation: "O comércio de Vera Cruz perde até 12% do lucro anual por conta de fiados que caem no esquecimento e falta de reposição no tempo correto. Com o LokanERP Comercial, criamos uma barreira inteligente de proteção de caixa e alertas remotos automáticos no celular do proprietário.",
    systemTree: [
      "LokanERP Comércio Físico",
      "├── PDV Venda Veloz & Etiquetas Barcode",
      "├── Financeiro e Caixa Diário",
      "├── Controle de Lotes e Vencimentos",
      "├── Gestão de Crediário e WhatsApp Cobrança",
      "└── Relatórios Inteligentes de Lucro Líquido"
    ],
    impactProjections: [
      { metric: "Inadimplência Fiado", improvement: "-40%", details: "Lembretes programados de débito enviados diretamente ao cliente" },
      { metric: "Perda de Estoque", improvement: "Zero Perda", details: "Monitoramento de lotes e validade de mercadorias" },
      { metric: "Controle Lucrativo", improvement: "100%", details: "Sabido ao centavo qual produto rende maior margem" }
    ]
  }
};

export const BENEFITS = [
  {
    title: "ORGANIZAÇÃO TOTAL",
    description: "Cada informação no seu devido lugar. Saiba quem vendeu, quanto faturou e o que está em estoque a qualquer segundo.",
    number: "01"
  },
  {
    title: "CONTROLE FINANCEIRO AFINAL",
    description: "Acabe com a dúvida de 'onde foi parar o dinheiro'. Entenda seus custos fixos e variáveis com gráficos limpos.",
    number: "02"
  },
  {
    title: "GESTÃO SIMPLIFICADA",
    description: "Interface intuitiva, desenhada para quem não é expert em computadores. Fácil de aprender e de usar diariamente.",
    number: "03"
  },
  {
    title: "VENDAS E CRÉDITO SOB SEGURANÇA",
    description: "Diga adeus ao calote e anotações perdidas. O sistema protege seus dados contra perdas com backups automáticos.",
    number: "04"
  },
  {
    title: "ACESSO REMOTO PELO CELULAR",
    description: "Sua empresa no seu bolso. Faça uma viagem, descanse no fim de semana e continue acompanhando o progresso de casa.",
    number: "05"
  },
  {
    title: "PROFISSIONALISMO PARA SEU MARCA",
    description: "Encante seus clientes ao emitir cupons modernos ou mandar notificações automáticas de agendamento por WhatsApp.",
    number: "06"
  }
];

export const TESTIMONIALS = [
  {
    quote: "Usar o sistema personalizado da LOKAN foi o divisor de águas na nossa pizzaria na Ilha. Antes era uma loucura de comandas em papel que sumiam, hoje os garçons mandam tudo direto pro telão da cozinha. O suporte deles estar aqui na Ilha faz toda a diferença!",
    author: "Ricardo Silveira",
    role: "Proprietário da Pizzaria Silveira - Barra do Gil, Vera Cruz"
  },
  {
    quote: "Controlar o ponto dos nossos 12 funcionários de pousada nos causava muita dor de cabeça em planilhas Excel. A LOKAN desenvolveu um sistema simples e ajustado ao nosso fluxo. Agora registramos entrada com selfie e GPS de forma totalmente confiável.",
    author: "Dra. Heloísa Vasconcelos",
    role: "Diretora da Pousada Brisa do Mar - Mar Grande"
  },
  {
    quote: "Sempre achei que sistemas integrados eram caros e feitos só para grandes multinacionais de Salvador. A LOKAN desmistificou isso. Criaram um painel simples pro meu mercadinho de bairro com um valor super justo. Atendimento nota mil!",
    author: "Roberto Dantas (Beto)",
    role: "Fundador do Mercadinho Dantas - Jiribatuba"
  }
];

export const FAQS = [
  {
    question: "A LOKAN já tem sistemas prontos ou cria tudo do zero?",
    answer: "Trabalhamos de forma flexível! Já possuímos bases consagradas para restaurante (comanda eletrônica), ponto online corporativo e ERP comercial para implantação em tempo recorde. Porém, nós customizamos essas bases com a identidade visual da sua equipe ou desenvolvemos recursos totalmente novos do zero com a metodologia 'com a cara da sua empresa'."
  },
  {
    question: "O suporte é presencial aqui na Ilha de Vera Cruz?",
    answer: "Sim! Este é um de nossos grandes diferenciais competitivos. Ao contrário de softwares de São Paulo ou Salvador que atendem apenas por e-mail demorado e chats robóticos, a LOKAN é vizinha de vocês. Oferecemos suporte prioritário por WhatsApp e, se necessário, visitamos sua empresa localmente para treinamento ou apoio operacional."
  },
  {
    question: "Consigo acessar os relatórios e faturamento pelo celular?",
    answer: "Sim, 100%! Todos os sistemas projetados pela LOKAN usam tecnologia responsiva moderna ou aplicativos nativos. Você pode acessar faturamento, controlar pedidos, estoque ou consultar pontos de funcionários de onde estiver com acesso seguro por senha de administrador."
  },
  {
    question: "Como funciona um sistema construído personalizado?",
    answer: "O processo é muito simples: primeiro agendamos uma conversa (café ou videochamada) para entendermos suas dores e processos manuais atuais. Em seguida, desenhamos a modelagem visual do painel e o banco de dados. Uma vez aprovado por você, programamos, testamos juntos e implantamos com treinamento completo para seu time."
  }
];
