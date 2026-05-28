import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Layers,
  Clock,
  Database,
  Briefcase,
  Monitor,
  Code,
  ArrowRight,
  MessageSquare,
  Copy,
  Check,
  CheckCircle,
  HelpCircle,
  Plus
} from "lucide-react";

interface SistemasTransformamProps {
  triggerToast: (title: string, message: string, type?: "success" | "error" | "info" | "warning") => void;
  scrollSection: (id: string) => void;
  getWhatsAppLink: (customText?: string) => string;
  selectedCardSystem?: number;
  setSelectedCardSystem?: (idx: number) => void;
}

export default function SistemasTransformam({
  triggerToast,
  scrollSection,
  getWhatsAppLink,
  selectedCardSystem: externalCardSystem,
  setSelectedCardSystem: externalSetCardSystem,
}: SistemasTransformamProps) {
  // Navigation & UI controls
  const [internalCardSystem, setInternalCardSystem] = useState<number>(0);
  const selectedCardSystem = externalCardSystem !== undefined ? externalCardSystem : internalCardSystem;
  const setSelectedCardSystem = externalSetCardSystem !== undefined ? externalSetCardSystem : setInternalCardSystem;
  const [customTheme, setCustomTheme] = useState<"cyan" | "emerald" | "amber" | "violet">("cyan");
  const [customFeatures, setCustomFeatures] = useState<string[]>([
    "Controle Financeiro de Caixa",
    "Monitor de Vendas PDV"
  ]);

  // Speed Audit Simulation States
  const [auditProgress, setAuditProgress] = useState(0);
  const [auditRunning, setAuditRunning] = useState(false);
  const [auditStageText, setAuditStageText] = useState("");
  const [auditResults, setAuditResults] = useState<{ performance: number; seo: number; accessibility: number } | null>(null);

  // Simple Cash Ledger for Microempresas card inside the workspace
  const [ledgerEntries, setLedgerEntries] = useState([
    { id: "1", description: "Venda de Balcão", value: 120.00, type: "input", date: "14:30" },
    { id: "2", description: "Reposição de Bebidas", value: -45.00, type: "output", date: "14:10" },
    { id: "3", description: "Taxa de Adquirente Cartão", value: -3.20, type: "output", date: "13:55" }
  ]);
  const [newLedgerDesc, setNewLedgerDesc] = useState("");
  const [newLedgerVal, setNewLedgerVal] = useState("");
  const [newLedgerType, setNewLedgerType] = useState<"input" | "output">("input");

  // PDV States
  const [cart, setCart] = useState<{ id: string; name: string; price: number; qty: number }[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const productsList = [
    { id: "p1", name: "Cerveja Heineken 600ml", price: 14.50, stock: 124 },
    { id: "p2", name: "Queijo Coalho Mar Grande", price: 32.00, stock: 45 },
    { id: "p3", name: "Carvão Vegetal 5kg", price: 18.90, stock: 18 },
    { id: "p4", name: "Saco de Gelo Cubo 10kg", price: 12.00, stock: 6 }
  ];

  // Restaurant states
  const [orders, setOrders] = useState([
    { id: "101", table: "Mesa 04 (Varanda)", items: "1x Moqueca de Peixe, 2x Skol", time: "14:12", status: "Preparando" },
    { id: "102", table: "Mesa 09 (Deck)", items: "1x Carne de Sol c/ Aipim", time: "14:22", status: "Preparando" },
    { id: "103", table: "Mesa 12 (Deck)", items: "1x Casquinha de Siri, 1x Caipirinha", time: "14:35", status: "Pronto" }
  ]);
  const [newOrderTable, setNewOrderTable] = useState("");
  const [newOrderItems, setNewOrderItems] = useState("");

  // Ponto online states
  const [pointRecords, setPointRecords] = useState([
    { name: "Carlos de Souza (Estoquista)", role: "Logística", time: "08:02 AM", location: "Mar Grande (Wi-fi)", photo: "Selfie Verificada" },
    { name: "Luciana Santos (Recepcionista)", role: "Administrativo", time: "08:15 AM", location: "Centro (GPS 12m)", photo: "Selfie Verificada" }
  ]);
  const [simulatedPontoName, setSimulatedPontoName] = useState("");

  // Ledger Add Handler
  const handleAddLedger = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLedgerDesc || !newLedgerVal) return;
    const val = parseFloat(newLedgerVal);
    if (isNaN(val)) return;
    const finalVal = newLedgerType === "output" ? -Math.abs(val) : Math.abs(val);

    setLedgerEntries([
      {
        id: Date.now().toString(),
        description: newLedgerDesc,
        value: finalVal,
        type: newLedgerType,
        date: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
      },
      ...ledgerEntries
    ]);
    setNewLedgerDesc("");
    setNewLedgerVal("");
    triggerToast("Lançamento Adicionado", `Operação de R$ ${Math.abs(finalVal).toFixed(2)} cadastrada com sucesso!`, "success");
  };

  const ledgerBalance = ledgerEntries.reduce((acc, entry) => acc + entry.value, 0);

  // PDV Cart helpers
  const handleAddToCart = (product: any) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    setCartTotal(prev => prev + product.price);
  };

  const handleClearCart = () => {
    setCart([]);
    setCartTotal(0);
  };

  // Order additions
  const handleAddOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrderTable || !newOrderItems) return;
    setOrders([
      { id: Date.now().toString().slice(-3), table: newOrderTable, items: newOrderItems, time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }), status: "Preparando" },
      ...orders
    ]);
    setNewOrderTable("");
    setNewOrderItems("");
    triggerToast("Pedido Sincronizado", `Pedido da ${newOrderTable} enviado para monitor da cozinha térmica.`, "success");
  };

  const handleToggleOrderStatus = (id: string) => {
    setOrders(orders.map(o => {
      if (o.id === id) {
        const nextStatus = o.status === "Preparando" ? "Pronto" : "Entregue";
        return { ...o, status: nextStatus };
      }
      return o;
    }));
  };

  // Ponto logger helpers
  const handleRegisterSimulatedPonto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simulatedPontoName) return;
    setPointRecords([
      {
        name: simulatedPontoName,
        role: "Colaborador",
        time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
        location: "Vera Cruz, Sede Local (GPS)",
        photo: "Selfie Verificada"
      },
      ...pointRecords
    ]);
    setSimulatedPontoName("");
    triggerToast("Ponto Registrado", "Presença georreferenciada salva no banco espelho criptografado.", "success");
  };

  // Running Lighthouse Speed Audit
  const runSpeedAudit = () => {
    if (auditRunning) return;
    setAuditRunning(true);
    setAuditResults(null);
    setAuditProgress(10);
    setAuditStageText("Inicializando análise lighthouse...");

    setTimeout(() => {
      setAuditProgress(40);
      setAuditStageText("Auditando Core Web Vitals (FCP, LCP)...");
    }, 800);

    setTimeout(() => {
      setAuditProgress(75);
      setAuditStageText("Comprimindo e otimizando imagens WebP / SVG...");
    }, 1600);

    setTimeout(() => {
      setAuditProgress(93);
      setAuditStageText("Verificando performance mobile e SEO estrutural...");
    }, 2400);

    setTimeout(() => {
      setAuditProgress(100);
      setAuditRunning(false);
      setAuditStageText("Análise Concluída com Sucesso!");
      setAuditResults({ performance: 99, seo: 100, accessibility: 98 });
      triggerToast("Nota Excelente!", "Performance auditada na palma da mão superou 99%! Totalmente otimizado para celulares.", "success");
    }, 3200);
  };

  return (
    <section id="sistemas" className="py-24 border-t border-zinc-900 bg-gray-950/45 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* TÍTULO PRINCIPAL */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-zinc-850 text-emerald-400 text-[10px] font-mono uppercase rounded-full tracking-wider shadow">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            TECNOLOGIA DE PONTA & IMPACTO EMPRESARIAL
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-4 tracking-tight leading-none">
            Sistemas que transformam empresas.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 max-w-2xl mx-auto leading-relaxed">
            Criamos sistemas inteligentes, modernos e personalizados para organizar sua empresa, aumentar produtividade e eliminar processos manuais.
          </p>
          <div className="h-0.5 w-[60px] bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto mt-6 rounded" />
        </div>

        {/* ÁREA PRINCIPAL — CARDS DE SISTEMAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "Sistema de Gestão Empresarial",
              description: "Controle financeiro, vendas, estoque, clientes, relatórios e gestão completa.",
              icon: Layers,
              color: "text-blue-400",
              badge: "Mais Vendido",
              preview: (
                <div className="space-y-2 font-mono text-[9px] text-zinc-400">
                  <div className="flex justify-between border-b border-zinc-900 pb-1">
                    <span>Faturamento Mensal</span>
                    <span className="text-emerald-400 font-bold">R$ 42.150,00</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-900 pb-1">
                    <span>Giro de Estoque</span>
                    <span className="text-white">852 itens saídos</span>
                  </div>
                  <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden mt-1">
                    <div className="bg-blue-500 h-full w-[78%]" />
                  </div>
                </div>
              )
            },
            {
              title: "Sistema de Ponto Online",
              description: "Controle de funcionários, horários, GPS, banco de horas e relatórios inteligentes.",
              icon: Clock,
              color: "text-emerald-400",
              badge: "Inviolável (MTE)",
              preview: (
                <div className="space-y-1 font-mono text-[9px] text-zinc-400">
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Mariana Mendes - Entrada</span>
                  </div>
                  <div className="text-zinc-500 flex justify-between">
                    <span>Horário: 08:02 AM</span>
                    <span className="text-emerald-400">Selfie Ativa</span>
                  </div>
                  <div className="text-[8px] bg-zinc-900/60 p-1.5 rounded border border-zinc-900 text-ellipsis overflow-hidden whitespace-nowrap">
                    GPS: -12.973, -38.502 (Mar Grande)
                  </div>
                </div>
              )
            },
            {
              title: "Sistema para Restaurantes",
              description: "Pedidos, cozinha, mesas, delivery, estoque e caixa.",
              icon: Database,
              color: "text-amber-400",
              badge: "Atendimento Rápido",
              preview: (
                <div className="grid grid-cols-3 gap-1 font-mono text-[8px] text-center">
                  <div className="p-1 rounded bg-amber-950/40 border border-amber-900/35 text-amber-300">Mesa 01 Ocupada</div>
                  <div className="p-1 rounded bg-emerald-950/40 border border-emerald-900/35 text-emerald-300">Mesa 02 Livre</div>
                  <div className="p-1 rounded bg-amber-950/40 border border-amber-900/35 text-amber-300">Mesa 03 Cozinha</div>
                </div>
              )
            },
            {
              title: "Sistema para Microempresas",
              description: "Ideal para pequenos negócios que querem sair do Excel.",
              icon: Briefcase,
              color: "text-purple-400",
              badge: "Simples & Ágil",
              preview: (
                <div className="space-y-1.5 font-mono text-[9px]">
                  <div className="flex justify-between text-zinc-400">
                    <span>Caixa Hoje:</span>
                    <span className="text-white font-bold">R$ 1.540,12</span>
                  </div>
                  <div className="flex justify-between text-[8px] text-zinc-500">
                    <span>Entradas: + R$ 1.710</span>
                    <span>Saídas: - R$ 170</span>
                  </div>
                  <div className="h-1 bg-zinc-900 w-full rounded-full">
                    <div className="h-full bg-purple-500 w-[90%]" />
                  </div>
                </div>
              )
            },
            {
              title: "Sites Profissionais",
              description: "Sites modernos, rápidos e focados em conversão.",
              icon: Monitor,
              color: "text-cyan-400",
              badge: "100% de Velocidade",
              preview: (
                <div className="flex items-center justify-around font-mono text-center">
                  <div>
                    <div className="text-[14px] font-bold text-emerald-400">100</div>
                    <div className="text-[7px] text-zinc-500">SPEED</div>
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-emerald-400">100</div>
                    <div className="text-[7px] text-zinc-500 font-mono">SEO</div>
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-blue-400">Pass</div>
                    <div className="text-[7px] text-zinc-500">VITALS</div>
                  </div>
                </div>
              )
            },
            {
              title: "Sistemas Personalizados",
              description: "Criamos qualquer sistema com a identidade da sua empresa.",
              icon: Code,
              color: "text-violet-400",
              badge: "Artesanal de Elite",
              preview: (
                <div className="space-y-1 font-mono text-[9px] text-zinc-400">
                  <div className="flex justify-between items-center bg-zinc-900/60 p-1.5 rounded border border-zinc-900">
                    <span>Cor Tema</span>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-cyan-400" />
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <div className="w-2 h-2 rounded-full bg-amber-400" />
                    </div>
                  </div>
                  <div className="text-[7px] text-zinc-500">Módulos: Controle Financeiro, Backups...</div>
                </div>
              )
            }
          ].map((sys, idx) => {
            const IconComp = sys.icon;
            const isSelected = selectedCardSystem === idx;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                onClick={() => {
                  setSelectedCardSystem(idx);
                  triggerToast("Workspace Ativado", `Carregando simulador em tempo real para: ${sys.title}`, "success");
                }}
                className={`relative p-6 rounded-3xl cursor-pointer transition-all duration-300 border text-left overflow-hidden group ${
                  isSelected 
                    ? "bg-zinc-900/95 border-emerald-500/50 shadow-[0_15px_30px_rgba(16,185,129,0.1)]" 
                    : "bg-black/30 border-zinc-850 hover:bg-zinc-900/40 hover:border-zinc-700/60"
                }`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-zinc-800/5 to-transparent rounded-full opacity-60 group-hover:scale-125 transition-transform" />
                
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center ${sys.color}`}>
                    <IconComp size={18} />
                  </div>
                  <span className="text-[8px] font-bold text-zinc-500 bg-zinc-900/60 border border-zinc-800/55 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {sys.badge}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white tracking-wide group-hover:text-blue-400 transition-colors">
                  {sys.title}
                </h3>
                <p className="text-[11px] text-zinc-400 leading-relaxed mt-1.5 mb-5 h-8">
                  {sys.description}
                </p>

                <div className="bg-black/45 border border-zinc-900 rounded-2xl p-4 mt-auto group-hover:border-zinc-800 transition-colors">
                  {sys.preview}
                </div>

                <div className={`absolute bottom-0 left-0 right-0 h-[3px] transition-all duration-300 ${
                  isSelected ? "bg-gradient-to-r from-blue-500 to-emerald-500" : "bg-transparent h-0 text-transparent"
                }`} />
              </motion.div>
            );
          })}
        </div>

        {/* SEÇÃO DASHBOARD PREMIUM — Central high-fidelity visual preview workspace */}
        <div className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="inline-block text-[10px] font-bold text-zinc-500 tracking-widest uppercase font-mono">AMBIENTE OPERACIONAL EM TEMPO REAL</span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">Interaja com o Dashboard Premium</h3>
            <p className="text-xs text-zinc-400 mt-1.5">Clique em qualquer um dos 6 cards acima e utilize seus botões para simular ações em tempo real.</p>
          </div>

          <div className="w-full max-w-5xl mx-auto bg-black border border-zinc-850 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden">
            
            {/* Window Header */}
            <div className="bg-zinc-950/90 border-b border-zinc-900/90 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5 animate-pulse">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                </div>
                <div className="h-4 w-px bg-zinc-800" />
                <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  lokan-cloud-server-v4.3@ba-vc
                </span>
              </div>
              
              <span className="text-[9px] font-mono px-3 py-1 bg-zinc-900 text-zinc-400 border border-zinc-800 rounded-full tracking-wide hidden sm:inline-block">
                {selectedCardSystem === 0 && "Core Suite: Gestão Empresarial (ERP)"}
                {selectedCardSystem === 1 && "Core Suite: IlhaPonto Digital"}
                {selectedCardSystem === 2 && "Core Suite: SaborDaIlha Control"}
                {selectedCardSystem === 3 && "Core Suite: Compact ERP Microempresas"}
                {selectedCardSystem === 4 && "Core Suite: Speed Engine (Sites)"}
                {selectedCardSystem === 5 && "Core Suite: Tailor-Made Modular Customizer"}
              </span>
            </div>

            {/* Dashboard Workspace Content */}
            <div className="p-6 md:p-8 bg-zinc-950/20 min-h-[420px] flex flex-col justify-between text-left">
              
              <AnimatePresence mode="wait">
                {selectedCardSystem === 0 && (
                  <motion.div
                    key="erp-dashboard"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-900 text-left">
                        <span className="text-[10px] text-zinc-500 uppercase font-mono block">Faturamento Hoje</span>
                        <span className="text-lg font-bold text-white mt-1 block">R$ {cartTotal > 0 ? (1240.20 + cartTotal).toFixed(2) : "1.240,20"}</span>
                        <span className="text-[9px] text-emerald-400 font-semibold mt-1 inline-block">✓ Caixa Ativo Sincronizado</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-900 text-left">
                        <span className="text-[10px] text-zinc-500 uppercase font-mono block">Giro do Estoquista</span>
                        <span className="text-lg font-bold text-white mt-1 block">852 itens</span>
                        <span className="text-[9px] text-amber-400 font-semibold mt-1 inline-block">Alerta de reposição: 3 itens</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-900 text-left">
                        <span className="text-[10px] text-zinc-500 uppercase font-mono block">Margem Média Líquida</span>
                        <span className="text-lg font-bold text-white mt-1 block">R$ 5.840,40</span>
                        <span className="text-[9px] text-blue-400 font-semibold mt-1 inline-block">Projeção: +12% no final do turno</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-900 text-left">
                        <span className="text-[10px] text-zinc-500 uppercase font-mono block">Backup em Nuvem</span>
                        <span className="text-lg font-bold text-emerald-400 mt-1 block">Ativo 100%</span>
                        <span className="text-[9px] text-zinc-500 mt-1 inline-block">Backups automáticos seguros</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      <div className="lg:col-span-8 p-5 rounded-2xl bg-zinc-900/30 border border-zinc-900">
                        <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest mb-3">Frente de Caixa PDV (Clique para Vender)</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {productsList.map((product) => (
                            <button
                              key={product.id}
                              type="button"
                              onClick={() => handleAddToCart(product)}
                              className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 flex justify-between items-center text-xs text-zinc-300 hover:border-emerald-500 hover:text-white transition-all text-left cursor-pointer active:scale-98"
                            >
                              <div>
                                <p className="font-bold">{product.name}</p>
                                <p className="text-[10px] text-zinc-500 font-mono">Estoque: {product.stock} un</p>
                              </div>
                              <span className="font-mono text-emerald-400 font-semibold">R$ {product.price.toFixed(2)}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="lg:col-span-4 p-5 rounded-2xl bg-zinc-900/60 border border-zinc-900 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest mb-3">Carrinho de Compra</h4>
                          {cart.length === 0 ? (
                            <div className="py-6 text-center text-[10px] text-zinc-500 font-mono">
                              <p>Carrinho vazio.</p>
                              <p className="mt-1">Selecione produtos ao lado!</p>
                            </div>
                          ) : (
                            <div className="space-y-1.5 max-h-[120px] overflow-y-auto mb-3 pr-1">
                              {cart.map((item) => (
                                <div key={item.id} className="flex justify-between text-[10px] text-zinc-300 border-b border-zinc-900/80 pb-1.5">
                                  <span className="truncate max-w-[120px] font-bold">{item.qty}x {item.name}</span>
                                  <span className="font-mono text-zinc-400">R$ {(item.price * item.qty).toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="pt-3 border-t border-zinc-900/80">
                          <div className="flex justify-between items-center text-xs font-bold text-white mb-2">
                            <span>Faturamento PDV</span>
                            <span className="font-mono text-emerald-400 text-sm">R$ {cartTotal.toFixed(2)}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              triggerToast("Cupom NFC-e Emitido", `Transação faturada no caixa litorâneo: R$ ${cartTotal.toFixed(2)}. Cupom impresso com sucesso!`, "success");
                              handleClearCart();
                            }}
                            disabled={cart.length === 0}
                            className={`w-full py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-wider text-center transition-all ${
                              cart.length > 0 
                                ? "bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer active:scale-95" 
                                : "bg-zinc-900 text-zinc-600 cursor-not-allowed"
                            }`}
                          >
                            ✓ Confirmar & Emitir Nota
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {selectedCardSystem === 1 && (
                  <motion.div
                    key="ponto-dashboard"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-900">
                        <span className="text-[10px] text-zinc-500 uppercase font-mono block">Colaboradores</span>
                        <span className="text-lg font-bold text-white mt-1 block">{18 + pointRecords.length - 2} Cadastrados</span>
                        <span className="text-[9px] text-emerald-400 mt-1 inline-block">✓ Presença ativa confirmada</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-900">
                        <span className="text-[10px] text-zinc-500 uppercase font-mono block">Legislação MTE</span>
                        <span className="text-lg font-bold text-emerald-400 mt-1 block">Portaria 671</span>
                        <span className="text-[9px] text-zinc-400 mt-1 inline-block">Totalmente dentro da regra trabalhista</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-900">
                        <span className="text-[10px] text-zinc-500 uppercase font-mono block">Inviolabilidade</span>
                        <span className="text-lg font-bold text-blue-400 mt-1 block">Assinatura Ativa</span>
                        <span className="text-[9px] text-zinc-500 mt-1 inline-block">SHA-256 de segurança ativa</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-900">
                        <span className="text-[10px] text-zinc-500 uppercase font-mono block">Exportar</span>
                        <button type="button" onClick={() => triggerToast("PFD Gerado", "Folha de ponto e espelho consolidados em andamento...", "success")} className="text-blue-400 font-bold hover:underline text-xs flex mt-1">
                          Emitir Livro Espelho
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      <div className="lg:col-span-5 p-5 bg-zinc-900/40 border border-zinc-900 rounded-2xl">
                        <form onSubmit={handleRegisterSimulatedPonto} className="space-y-4">
                          <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest leading-none">Registrar Batida de Ponto</h4>
                          <p className="text-[10px] text-zinc-400 leading-relaxed">Simule o ponto registrando seu nome. O sistema utiliza GPS local e biometria facial para validar a presença.</p>
                          
                          <div>
                            <label className="text-[9px] text-zinc-500 block uppercase mb-1 font-mono">Nome Completo</label>
                            <input
                              type="text"
                              required
                              value={simulatedPontoName}
                              onChange={(e) => setSimulatedPontoName(e.target.value)}
                              placeholder="Ex: Amanda dos Anjos"
                              className="w-full bg-black text-xs text-white border border-zinc-800 rounded-xl px-3 py-2.5 focus:border-emerald-500 outline-none"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            ✓ Bater Ponto Geocriptografado
                          </button>
                        </form>
                      </div>

                      <div className="lg:col-span-7 p-5 rounded-2xl bg-zinc-900/20 border border-zinc-900">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest leading-none">Monitor Rh em Tempo Real</h4>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        </div>
                        
                        <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                          {pointRecords.map((rec, idx) => (
                            <div key={idx} className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl text-[10px] flex justify-between items-start">
                              <div>
                                <p className="font-bold text-white leading-none">{rec.name}</p>
                                <span className="text-zinc-500 mt-1 block">GPS: {rec.location}</span>
                              </div>
                              <div className="text-right font-mono">
                                <span className="text-emerald-400 font-bold block">{rec.time}</span>
                                <span className="text-[8px] text-zinc-500 block">{rec.photo}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {selectedCardSystem === 2 && (
                  <motion.div
                    key="restaurant-dashboard"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      <div className="lg:col-span-7 p-5 rounded-2xl bg-zinc-900/20 border border-zinc-900">
                        <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest mb-1 leading-none">Comanda Eletrônica das Mesas</h4>
                        <p className="text-[10px] text-zinc-500 mb-4">Selecione mesas e simule pedidos sendo transmitidos em tempo real para a cozinha térmica.</p>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {[
                            { id: "Mesa 01", status: "ocupada", items: "1x Anchova Assada" },
                            { id: "Mesa 02", status: "livre", items: "-" },
                            { id: "Mesa 03", status: "cozinha", items: "1x Moqueca de Frango" },
                            { id: "Mesa 04", status: "ocupada", items: "2x Siri Grelhado" },
                            { id: "Mesa 05", status: "livre", items: "-" },
                            { id: "Mesa 06", status: "cozinha", items: "1x Polvo c/ Fritas" },
                            { id: "Mesa 07", status: "ocupada", items: "1x Moqueca Peixe" },
                            { id: "Mesa 08", status: "livre", items: "-" }
                          ].map((mesa, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                if (mesa.status === "livre") {
                                  setNewOrderTable(mesa.id);
                                  setNewOrderItems("1x Moqueca de Camarão + 2 Suco Cajá");
                                  triggerToast("Mesa Selecionada", `Telas preparadas para abrir pedido na ${mesa.id}.`, "info");
                                } else {
                                  triggerToast("Comanda Ativa", `${mesa.id} consumindo: ${mesa.items}`, "success");
                                }
                              }}
                              className={`p-3 rounded-2xl border text-center transition-all cursor-pointer active:scale-95 ${
                                mesa.status === "livre" ? "bg-emerald-950/20 border-emerald-900/40 text-emerald-400 hover:border-emerald-500" :
                                mesa.status === "cozinha" ? "bg-amber-950/20 border-amber-900/40 text-amber-400 hover:border-amber-500" :
                                "bg-blue-950/20 border-blue-900/40 text-blue-400 hover:border-blue-500"
                              }`}
                            >
                              <span className="font-bold text-xs block leading-none">{mesa.id}</span>
                              <span className="text-[8px] font-mono uppercase tracking-wider block mt-1">
                                {mesa.status === "livre" ? "Disponível" :
                                 mesa.status === "cozinha" ? "Na Cozinha" : "Aberta"}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="lg:col-span-5 p-5 bg-zinc-900/60 border border-zinc-900 rounded-2xl flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest leading-none">Fila Cozinha (KDS Monitor)</h4>
                            <span className="text-[9px] font-mono text-zinc-500 px-2 py-0.5 bg-zinc-950 rounded">Painel Cozinha</span>
                          </div>

                          <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                            {orders.map((order) => (
                              <div key={order.id} className="p-2.5 bg-zinc-950/80 border border-zinc-900 rounded-xl text-[9px] flex justify-between items-center">
                                <div className="truncate max-w-[140px]">
                                  <p className="font-bold text-white leading-none mb-1">{order.table}</p>
                                  <p className="text-zinc-400 leading-none">{order.items}</p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleToggleOrderStatus(order.id)}
                                  className={`px-2 py-1 rounded font-bold uppercase text-[7px] cursor-pointer ${
                                    order.status === "Preparando" ? "bg-amber-950/55 text-amber-400 border border-amber-900/40 hover:bg-amber-900" :
                                    "bg-emerald-950/55 text-emerald-400 border border-emerald-900/40 hover:bg-emerald-900"
                                  }`}
                                >
                                  {order.status === "Midnight" ? "Entregador" : order.status === "Preparando" ? "Despachar ✓" : "Completar 🚀"}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        <form onSubmit={handleAddOrder} className="pt-3 border-t border-zinc-900/80 mt-3 grid grid-cols-12 gap-2">
                          <input
                            type="text"
                            required
                            value={newOrderTable}
                            onChange={(e) => setNewOrderTable(e.target.value)}
                            placeholder="Mesa 02, Delivery etc"
                            className="col-span-4 bg-black text-[10px] text-white border border-zinc-800 rounded-lg px-2 py-1.5 focus:border-blue-500 outline-none font-mono"
                          />
                          <input
                            type="text"
                            required
                            value={newOrderItems}
                            onChange={(e) => setNewOrderItems(e.target.value)}
                            placeholder="Ex: Prato + Bebida"
                            className="col-span-5 bg-black text-[10px] text-white border border-zinc-800 rounded-lg px-2 py-1.5 focus:border-blue-500 outline-none"
                          />
                          <button
                            type="submit"
                            className="col-span-3 py-1.5 rounded-lg bg-blue-650 hover:bg-blue-600 font-bold text-[9px] text-white uppercase text-center cursor-pointer"
                          >
                            Lançar
                          </button>
                        </form>
                      </div>

                    </div>
                  </motion.div>
                )}

                {selectedCardSystem === 3 && (
                  <motion.div
                    key="compact-dashboard"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-900">
                        <span className="text-[10px] text-zinc-500 uppercase font-mono block">Saldo Líquido</span>
                        <span className={`text-lg font-bold mt-1 block ${ledgerBalance >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                          R$ {ledgerBalance.toFixed(2)}
                        </span>
                        <span className="text-[9px] text-zinc-400 mt-1 inline-block">Consolidado no dia</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-900">
                        <span className="text-[10px] text-zinc-500 uppercase font-mono block">Simplicidade</span>
                        <span className="text-lg font-bold text-white mt-1 block">Aposente o Papel</span>
                        <span className="text-[9px] text-zinc-400 mt-1 inline-block">Para pequenos comércios saírem do caderninho</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-900">
                        <span className="text-[10px] text-zinc-500 uppercase font-mono block">Mobilidade Total</span>
                        <span className="text-lg font-bold text-blue-400 mt-1 block">Smartphone Ativo</span>
                        <span className="text-[9px] text-zinc-500 mt-1 inline-block">Administre de onde estiver</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-900">
                        <span className="text-[10px] text-zinc-500 uppercase font-mono block">Fechamento do Mês</span>
                        <button type="button" onClick={() => triggerToast("Caixa Salvo", `Receita total do dia calculada em R$ ${ledgerBalance.toFixed(2)}.`, "success")} className="text-emerald-400 font-bold hover:underline text-xs flex mt-1">
                          Concluir Caixa de Hoje
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      <div className="lg:col-span-5 p-5 bg-zinc-900/40 border border-zinc-900 rounded-2xl">
                        <form onSubmit={handleAddLedger} className="space-y-4">
                          <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest leading-none">Registrar Entrada / Saída de Caixa</h4>
                          
                          <div>
                            <label className="text-[9px] text-zinc-500 block uppercase mb-1 font-mono">Descrição do Lançamento</label>
                            <input
                              type="text"
                              required
                              value={newLedgerDesc}
                              onChange={(e) => setNewLedgerDesc(e.target.value)}
                              placeholder="Ex: Pagamento Fornecedor de Gás"
                              className="w-full bg-black text-xs text-white border border-zinc-800 rounded-xl px-3 py-2 focus:border-purple-500 outline-none"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[9px] text-zinc-500 block uppercase mb-1 font-mono">Transação</label>
                              <select
                                value={newLedgerType}
                                onChange={(e) => setNewLedgerType(e.target.value as "input" | "output")}
                                className="w-full bg-black text-xs text-white border border-zinc-800 rounded-xl p-2 focus:border-purple-500 outline-none"
                              >
                                <option value="input">Recebimento (+)</option>
                                <option value="output">Despesa (-)</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-[9px] text-zinc-500 block uppercase mb-1 font-mono">Valor (R$)</label>
                              <input
                                type="text"
                                required
                                value={newLedgerVal}
                                placeholder="0.00"
                                onChange={(e) => setNewLedgerVal(e.target.value)}
                                className="w-full bg-black text-xs text-white border border-zinc-800 rounded-xl px-3 py-2 focus:border-purple-500 outline-none font-mono"
                              />
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="w-full py-2.5 rounded-xl bg-purple-650 hover:bg-purple-600 text-white font-bold text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            ✓ Registrar Lançamento
                          </button>
                        </form>
                      </div>

                      <div className="lg:col-span-7 p-5 rounded-2xl bg-zinc-900/20 border border-zinc-900">
                        <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest mb-3 leading-none">Histórico de Lançamentos</h4>
                        
                        <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                          {ledgerEntries.map((entry) => (
                            <div key={entry.id} className="p-3 bg-zinc-900/80 border border-zinc-800/40 rounded-xl text-[10px] flex justify-between items-center">
                              <div>
                                <p className="font-bold text-white leading-none">{entry.description}</p>
                                <span className="text-zinc-500 mt-1 block">Lançado às {entry.date}</span>
                              </div>
                              <span className={`font-mono font-bold ${entry.value >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                                {entry.value >= 0 ? "+" : "-"} R$ {Math.abs(entry.value).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {selectedCardSystem === 4 && (
                  <motion.div
                    key="sites-dashboard"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-900 relative">
                      <div className="max-w-xl mx-auto text-center space-y-4">
                        <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest leading-none">Testar Velocidade e SEO de Páginas Webs</h4>
                        <p className="text-xs text-zinc-500 leading-relaxed">Nossos sites são projetados para abrir instantaneamente mesmo sob conexões 3G instáveis da Ilha, garantindo notas perfeitas no teste oficial móvel. Simule agora uma auditoria remota:</p>
                        
                        <div className="py-2">
                          <button
                            type="button"
                            onClick={runSpeedAudit}
                            disabled={auditRunning}
                            className={`px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
                              auditRunning ? "bg-zinc-800 text-zinc-650 cursor-not-allowed" : "bg-cyan-600 hover:bg-cyan-500 text-white"
                            }`}
                          >
                            {auditRunning ? "Processando Auditoria..." : "🚀 Executar Auditoria de Velocidade (Lighthouse)"}
                          </button>
                        </div>

                        {/* Progress bar loader */}
                        {auditRunning && (
                          <div className="space-y-2 max-w-sm mx-auto">
                            <p className="text-[10px] text-zinc-400 font-mono italic">{auditStageText}</p>
                            <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-cyan-400 h-full transition-all duration-300" style={{ width: `${auditProgress}%` }} />
                            </div>
                          </div>
                        )}

                        {/* Speed Audit Scores results */}
                        {auditResults && (
                          <div className="flex justify-center gap-6 pt-4 animate-fadeIn">
                            <div className="text-center">
                              <div className="w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center font-bold font-mono text-emerald-400 bg-emerald-950/20 text-sm">
                                {auditResults.performance}
                              </div>
                              <p className="text-[10px] font-mono text-zinc-500 mt-2">Performance</p>
                            </div>
                            <div className="text-center">
                              <div className="w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center font-bold font-mono text-emerald-400 bg-emerald-950/20 text-sm">
                                {auditResults.seo}
                              </div>
                              <p className="text-[10px] font-mono text-zinc-500 mt-2">SEO Score</p>
                            </div>
                            <div className="text-center">
                              <div className="w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center font-bold font-mono text-emerald-400 bg-emerald-950/20 text-sm">
                                {auditResults.accessibility}
                              </div>
                              <p className="text-[10px] font-mono text-zinc-500 mt-2">Acessibilidade</p>
                            </div>
                          </div>
                        )}

                        {!auditRunning && !auditResults && (
                          <div className="py-6 text-center text-[10px] text-zinc-500 font-mono">
                            Aguardando clique para iniciar o escaneamento Lighthouse de performance móvel...
                          </div>
                        )}

                      </div>
                    </div>
                  </motion.div>
                )}

                {selectedCardSystem === 5 && (
                  <motion.div
                    key="custom-dashboard"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      <div className="lg:col-span-5 p-5 bg-zinc-900/40 border border-zinc-900 rounded-2xl flex flex-col justify-between">
                        <div className="space-y-4">
                          <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest leading-none">Personalizar Identidade</h4>
                          <p className="text-[10px] text-zinc-500">Selecione uma cor corporativa para sua marca e ative módulos para testar o sistema sob medida.</p>
                          
                          <div>
                            <label className="text-[9px] text-zinc-500 block uppercase mb-1.5 font-mono">Cor de Destaque da Marca</label>
                            <div className="flex gap-2">
                              {[
                                { id: "cyan", name: "Neon Cyan", color: "bg-cyan-500 hover:bg-cyan-400" },
                                { id: "emerald", name: "Emerald Glow", color: "bg-emerald-500 hover:bg-emerald-400" },
                                { id: "amber", name: "Amber Cyber", color: "bg-amber-500 hover:bg-amber-400" },
                                { id: "violet", name: "Violet Tech", color: "bg-violet-500 hover:bg-violet-400" }
                              ].map((palette) => (
                                <button
                                  key={palette.id}
                                  type="button"
                                  onClick={() => {
                                    setCustomTheme(palette.id as any);
                                    triggerToast("Design Atualizado", `Identidade visual da marca setada para: ${palette.name}`, "info");
                                  }}
                                  className={`w-6 h-6 rounded-full cursor-pointer flex items-center justify-center border-2 transition-all ${palette.color} ${
                                    customTheme === palette.id ? "border-white scale-110" : "border-transparent"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="text-[9px] text-zinc-500 block uppercase mb-1.5 font-mono font-bold">Módulos Exclusivos Ativos</label>
                            <div className="space-y-1.5">
                              {[
                                "Dashboard Gerencial",
                                "Controle Financeiro de Caixa",
                                "Faturamento de Notas Fiscais",
                                "Mapeamento Computacional",
                                "Backups Diários em Nuvem",
                                "Suporte Local Presencial"
                              ].map((feature) => {
                                const included = customFeatures.includes(feature);
                                return (
                                  <button
                                    key={feature}
                                    type="button"
                                    onClick={() => {
                                      if (included) {
                                        setCustomFeatures(customFeatures.filter(f => f !== feature));
                                      } else {
                                        setCustomFeatures([...customFeatures, feature]);
                                      }
                                    }}
                                    className="w-full text-left p-2 rounded-lg bg-zinc-950/60 border border-zinc-900 text-[10px] text-zinc-300 flex items-center gap-2 hover:border-zinc-800 transition-colors cursor-pointer"
                                  >
                                    <span className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[8px] font-bold ${
                                      included ? "bg-emerald-600 text-white border-emerald-500" : "bg-black border-zinc-800"
                                    }`}>
                                      {included && "✓"}
                                    </span>
                                    <span>{feature}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                        </div>
                      </div>

                      <div className="lg:col-span-7 p-6 bg-zinc-900/10 border border-zinc-900 rounded-3xl flex flex-col justify-between">
                        <div className="space-y-4">
                          <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest leading-none">Layout Gerado em Tempo Real</h4>
                          
                          <div className="bg-black border border-zinc-800 p-5 rounded-2xl relative">
                            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-0.5 bg-zinc-950 border border-zinc-850 rounded font-mono text-[8px] text-zinc-400">
                              <span className={`w-1.5 h-1.5 rounded-full inline-block ${
                                customTheme === "cyan" ? "bg-cyan-400 animate-pulse" :
                                customTheme === "emerald" ? "bg-emerald-400 animate-pulse" :
                                customTheme === "amber" ? "bg-amber-400 animate-pulse" :
                                "bg-violet-400 animate-pulse"
                              }`} />
                              Dynamic Renderer
                            </div>

                            <p className="text-[10px] font-mono text-zinc-500 leading-none mb-1">SYSTEM INSTANCE CODE PREVIEW</p>
                            
                            <h5 className={`text-base font-bold text-white ${
                              customTheme === "cyan" ? "text-cyan-400" :
                              customTheme === "emerald" ? "text-emerald-400" :
                              customTheme === "amber" ? "text-amber-400" :
                              "text-violet-400"
                            }`}>
                              Lokan Core custom_system_run_vc()
                            </h5>

                            <div className="mt-4 space-y-2 border-t border-zinc-900 pt-3">
                              <p className="text-[10px] text-zinc-400 leading-snug">O design, as cores e as funcionalidades do programa se adaptam perfeitamente para combinar com o fluxo original da sua equipe de Salvador ou Vera Cruz.</p>
                              
                              <div className="pt-2">
                                <span className="text-[8px] font-mono uppercase text-zinc-500 leading-none block font-bold mb-1.5">Módulos Carregados ao Núcleo</span>
                                <div className="flex flex-wrap gap-1">
                                  {customFeatures.map((feat) => (
                                    <span key={feat} className={`text-[8px] font-mono px-2 py-0.5 rounded border ${
                                      customTheme === "cyan" ? "bg-cyan-950/40 text-cyan-400 border-cyan-900/40" :
                                      customTheme === "emerald" ? "bg-emerald-950/40 text-emerald-400 border-emerald-900/40" :
                                      customTheme === "amber" ? "bg-amber-950/40 text-amber-400 border-amber-900/40" :
                                      "bg-violet-950/40 text-violet-400 border-violet-900/40"
                                    }`}>
                                      ✓ {feat}
                                    </span>
                                  ))}
                                  {customFeatures.length === 0 && (
                                    <span className="text-[8px] text-zinc-500 font-mono">Defina os recursos ativados no controlador ao lado.</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-zinc-900 mt-3 flex justify-end">
                          <button
                            type="button"
                            onClick={() => triggerToast("Estilo Salvo", "A paleta personalizada foi vinculada à sua sessão de usuário com sucesso!", "success")}
                            className={`px-5 py-2 rounded-xl text-[9px] font-bold uppercase transition-colors font-mono cursor-pointer ${
                              customTheme === "cyan" ? "bg-cyan-600 hover:bg-cyan-500 text-white" :
                              customTheme === "emerald" ? "bg-emerald-600 hover:bg-emerald-500 text-white" :
                              customTheme === "amber" ? "bg-amber-600 hover:bg-amber-500 text-white" :
                              "bg-violet-600 hover:bg-violet-500 text-white"
                            }`}
                          >
                            ✓ Consolidar Configurações Estilizadas
                          </button>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>
        </div>

        {/* SEÇÃO DE IMPACTO — SEM LOKAN vs COM LOKAN */}
        <div className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[9px] font-bold text-zinc-500 tracking-widest uppercase font-mono">MIGRAÇÃO DE VALOR</span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">O Impacto Real de Profissionalizar</h3>
            <p className="text-xs text-zinc-400 mt-1.5">Veja a diferença imediata entre manter canetas, papel ou Excel versus modernizar com a LOKAN.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Lado Esquerdo — SEM LOKAN */}
            <div className="p-6 sm:p-8 rounded-3xl bg-red-950/10 border border-red-950/30 relative overflow-hidden text-left">
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-red-600/5 rounded-full blur-[60px]" />
              
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-red-950/40 border border-red-900/30 flex items-center justify-center font-black text-red-500 font-mono text-center">
                  ✕
                </div>
                <div>
                  <h4 className="text-sm font-bold text-red-400 tracking-wide uppercase">SEM LOKAN</h4>
                  <p className="text-[10px] text-zinc-500 mt-0.5">Gestão desorganizada que freia o faturamento</p>
                </div>
              </div>

              <ul className="space-y-4">
                {[
                  "Erros humanos graves em contas manuais no Excel",
                  "Cadernos de fiado frágeis, fáceis de molhar ou se perder",
                  "Anotações de cozinha em papelotes que somem no expediente",
                  "Falta total de visão de estoque mínimo e faturamento integrado",
                  "Sempre na dependência de tarefas repetitivas e cansativas"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-red-500 mt-0.5 font-bold shrink-0 text-xs">✕</span>
                    <span className="text-xs text-zinc-300 font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lado Direito — COM LOKAN */}
            <div className="p-6 sm:p-8 rounded-3xl bg-emerald-950/10 border border-emerald-950/30 relative overflow-hidden text-left">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-600/5 rounded-full blur-[60px]" />

              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-emerald-950/40 border border-emerald-900/30 flex items-center justify-center font-black text-emerald-400">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-400 tracking-wide uppercase">COM LOKAN</h4>
                  <p className="text-[10px] text-zinc-500 mt-0.5 font-mono">Modernidade e controle total unificado</p>
                </div>
              </div>

              <ul className="space-y-4">
                {[
                  "Ambiente centralizado em nuvem e em tempo real via celular",
                  "Relatórios analíticos transparentes de entradas e saídas",
                  "Organização impecável de mesas, colaboradores e estoque",
                  "Controle unificado de inadimplência fiado e envio de faturas rápidos",
                  "Tudo na palma da mão para focar em escalar o lucro"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-0.5 font-bold shrink-0 text-xs">✓</span>
                    <span className="text-xs text-zinc-300 font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* SEÇÃO PROCESSO LOKAN — Step timeline */}
        <div className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[9px] font-bold text-zinc-500 tracking-widest uppercase font-mono">METODOLOGIA DE DESIGN</span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">Processo Próximo e Transparente</h3>
            <p className="text-xs text-zinc-400 mt-1.5">Passo a passo organizado desde o primeiro contato até a decolagem do sistema.</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Glowing connection line on desktop */}
            <div className="hidden lg:block absolute top-7 left-1/12 right-1/12 h-[2px] bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600/60 z-0" />
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
              {[
                { step: "1", title: "Você explica sua necessidade", desc: "Apresente suas dificuldades de controle operacional e quais fluxos quer automatizar." },
                { step: "2", title: "A LOKAN entende seu negócio", desc: "Nossos arquitetos mapeiam seus gargalos específicos para desenhar a solução ideal." },
                { step: "3", title: "Projetamos o sistema ideal", desc: "Modelamos protótipos de telas e a arquitetura ideal do banco de dados." },
                { step: "4", title: "Desenvolvemos sua solução", desc: "Desenvolvemos com as melhores linguagens de alto nível com segurança de elite." },
                { step: "5", title: "Implantação e suporte", desc: "Treinamos sua equipe presencialmente na Ilha e prestamos suporte 24h especializado." }
              ].map((p, idx) => (
                <div key={idx} className="text-center lg:text-left space-y-3.5 group">
                  <div className="flex justify-center lg:justify-start">
                    <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono font-black text-xs text-emerald-400 group-hover:border-emerald-500 transition-all shadow">
                      {p.step}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-zinc-200 tracking-wide uppercase leading-normal">
                      {p.title}
                    </h4>
                    <p className="text-[10px] text-zinc-500 leading-relaxed font-sans">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* CHAMADA FINAL */}
        <div className="mt-16 max-w-4xl mx-auto rounded-3xl bg-gradient-to-tr from-zinc-950 via-zinc-900/60 to-blue-950/25 border border-zinc-800 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-500/5 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-44 h-44 bg-blue-500/5 rounded-full blur-[80px]" />

          <div className="max-w-2xl mx-auto space-y-6 relative z-10 text-center">
            <span className="inline-block text-[10px] font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-900/50 px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">
              ✓ MODERNIZAÇÃO DE FLUXOS
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-none text-center">
              Chegou a hora de modernizar sua empresa.
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-lg mx-auto text-center">
              Pare de depender de planilhas e tenha uma gestão inteligente com a LOKAN.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                type="button"
                onClick={() => scrollSection("contato")}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase cursor-pointer tracking-wider transition-all shadow-[0_10px_25px_rgba(37,99,235,0.2)] active:scale-95"
              >
                Solicitar Orçamento
              </button>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 hover:border-zinc-700 text-zinc-200 hover:text-white font-bold text-xs uppercase flex items-center justify-center gap-1.5 transition-all text-center"
              >
                <MessageSquare size={14} className="text-emerald-400" />
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
