export interface KPICard {
  label: string;
  value: string;
  trend: string;
  iconName: string;
}

export interface ModuleItem {
  moduleName: string;
  columns: string[];
  rows: string[][];
}

export interface DatabaseField {
  name: string;
  type: string;
  description: string;
}

export interface DatabaseTable {
  tableName: string;
  description: string;
  fields: DatabaseField[];
}

export interface SystemProposal {
  systemTitle: string;
  brandMood: string;
  colorHex: string;
  secondaryColorHex: string;
  accentColorHex: string;
  welcomeMessage: string;
  keyPerformanceIndicators: KPICard[];
  modulesData: ModuleItem[];
  databaseTables: DatabaseTable[];
  budgetExplanation: string;
  
  // Advanced simulation properties
  detectedFlaws?: string[];
  scores?: {
    organization: number;
    automation: number;
    financialControl: number;
    scalability: number;
  };
  aiRecommendation?: string;
  systemTree?: string[];
  impactProjections?: {
    metric: string;
    improvement: string;
    details: string;
  }[];
}

export interface ContactFormData {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  mensagem: string;
  ondeOuviu: string;
}
