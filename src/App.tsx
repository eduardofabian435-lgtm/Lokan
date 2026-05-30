import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  CheckCircle,
  Database,
  Smartphone,
  Shield,
  HelpCircle,
  Clock,
  Layers,
  TrendingUp,
  DollarSign,
  Users,
  Code,
  Check,
  ChevronDown,
  Locate,
  Send,
  MessageSquare,
  Network,
  Cpu,
  Monitor,
  HeartHandshake,
  AlertCircle,
  Briefcase,
  Copy,
  Check as CheckedIcon,
  MapPin,
  ExternalLink,
  ChevronRight
} from "lucide-react";

import Navbar from "./components/Navbar";
import DynamicIcon from "./components/DynamicIcon";
import { SERVICES, DIFFERENTIALS, BENEFITS, PRE_MADE_PROPOSALS, FAQS } from "./data";
import { SystemProposal, ContactFormData } from "./types";

export default function App() {
  // Navigation & UI controls
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);
  
  // Custom Toast state
  const [toast, setToast] = useState<{
    visible: boolean;
    title: string;
    message: string;
    type: "success" | "error" | "info" | "warning";
  }>({
    visible: false,
    title: "",
    message: "",
    type: "success"
  });

  const triggerToast = (
    title: string,
    message: string,
    type: "success" | "error" | "info" | "warning" = "success"
  ) => {
    setToast({ visible: true, title, message, type });
    // Autohide toast after 4 seconds
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 4500);
  };

  // Form submission state
  const [contactForm, setContactForm] = useState<ContactFormData>({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    mensagem: "",
    ondeOuviu: "Google"
  });
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.nome || !contactForm.email || !contactForm.telefone) {
      triggerToast("Campos Obrigatórios", "Por favor, insira pelo menos Nome, E-mail e Telefone de contato válidos.", "warning");
      return;
    }

    setIsSubmittingForm(true);
    // Simulate API registration lag
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmittingForm(false);
    setFormSubmitted(true);
    triggerToast("Proposta Solicitada!", "Sua ficha comercial foi registrada. Nosso arquiteto local entrará em contato em instantes por WhatsApp!", "success");

    // Keep it interactive: offer to directly sync registration on Whatsapp
    setTimeout(() => {
      setFormSubmitted(false);
      setContactForm({ nome: "", email: "", telefone: "", empresa: "", mensagem: "", ondeOuviu: "Google" });
    }, 60000);
  };

  const scrollSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Pre-formatted messages for quick redirects
  const getWhatsAppLink = (customText?: string) => {
    const text = customText 
      ? customText 
      : "Olá LOKAN, vi o site de vocês e quero agendar um orçamento para criar um sistema com a cara do meu negócio na Ilha de Vera Cruz.";
    return `https://wa.me/5571991804818?text=${encodeURIComponent(text)}`;
  };

  return (
    <div id="website-root" className="min-h-screen bg-black text-gray-100 font-sans antialiased overflow-x-hidden selection:bg-blue-600 selection:text-white">
      {/* Immersive moving cosmic-aurora background with smooth fluid color movement */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
        {/* Subtle premium tech grid layer */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:64px_64px] opacity-25" />
        
        {/* Moving organic fluid flows (emerald, deep blue, cyan) to represent modern intelligent software systems */}
        <div className="absolute -top-[15%] -left-[15%] w-[90%] h-[90%] bg-[radial-gradient(circle,rgba(16,185,129,0.24),transparent_65%)] rounded-full blur-[140px] animate-glow-smooth-1" />
        <div className="absolute top-[20%] -right-[15%] w-[95%] h-[95%] bg-[radial-gradient(circle,rgba(37,99,235,0.26),transparent_65%)] rounded-full blur-[160px] animate-glow-smooth-2" />
        <div className="absolute bottom-[-20%] left-[10%] w-[90%] h-[90%] bg-[radial-gradient(circle,rgba(6,182,212,0.22),transparent_65%)] rounded-full blur-[130px] animate-glow-smooth-3" />
      </div>



      {/* Floating Action WhatsApp */}
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-emerald-600 text-white shadow-[0_10px_30px_rgba(16,185,129,0.5)] hover:bg-emerald-500 hover:scale-110 active:scale-95 transition-all duration-300 group"
        title="Falar Conosco no WhatsApp"
        id="whatsapp-floating-btn"
      >
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 border border-gray-800 text-xs px-3 py-1.5 rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:inline-block shadow">
          💬 Falar com Especialista
        </span>
        <MessageSquare className="w-6 h-6 animate-pulse" />
      </a>

      {/* NAVBAR */}
      <Navbar 
        onPlanClick={() => scrollSection("contato")} 
        onContactClick={() => scrollSection("contato")} 
      />

      {/* =========================================
          SEÇÃO 1 — HERO SECTION
          ========================================= */}
      <section id="inicio" className="relative z-10 pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Tag Local Reference */}
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/65 border border-blue-800/40 text-blue-400 text-xs font-semibold backdrop-blur"
              id="hero-local-badge"
            >
              <MapPin size={12} className="text-emerald-400 animate-pulse" />
              <span>Sistemas de Elite na Ilha de Vera Cruz, Bahia</span>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]"
                id="hero-title"
              >
                Sistemas inteligentes <br className="hidden sm:inline" />
                <span className="text-moving-gradient">
                  com a cara da sua empresa.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                id="hero-subheadline"
              >
                A LOKAN cria sistemas personalizados para empresas litorâneas e comércios que desejam abandonar planilhas, Excel, papel e a complexidade da gestão manual.
              </motion.p>

              {/* Bold Sales Callout */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-950/70 border border-gray-800/80 p-5 rounded-2xl max-w-xl mx-auto lg:mx-0 flex items-start gap-4 text-left shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur"
                id="hero-sales-callout"
              >
                <div className="p-2.5 rounded-xl bg-red-950/50 border border-red-900/40 text-red-400 font-bold shrink-0 text-sm">
                  SAIA DO
                  <br />
                  ONTEM
                </div>
                <div>
                  <p className="text-sm font-bold text-white tracking-wide">
                    Adeus Excel. Adeus planilhas. Adeus cadernos rasgados.
                  </p>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    Acompanhe vendas faturadas, fluxo de caixa e ponto de funcionários em tempo real de qualquer lugar pelo celular com sistemas profissionais de elite.
                  </p>
                </div>
              </motion.div>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                id="hero-cta-buttons"
              >
                <button
                  onClick={() => scrollSection("contato")}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:opacity-95 text-white font-bold text-sm tracking-wider flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(37,99,235,0.3)] transition-all active:scale-98 cursor-pointer"
                >
                  <Sparkles size={16} className="text-emerald-300 animate-pulse" />
                  SOLICITAR ORÇAMENTO
                </button>
                <button
                  onClick={() => scrollSection("servicos")}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gray-950 hover:bg-gray-900 text-gray-200 border border-gray-800 font-bold text-sm flex items-center justify-center gap-2 hover:border-gray-700 transition-all cursor-pointer"
                >
                  Ver Serviços de Elite
                  <ArrowRight size={14} className="text-gray-400 group-hover:translate-x-1" />
                </button>
              </motion.div>

              {/* Real social proof inline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 pt-4 text-xs text-gray-400"
              >
                <div className="flex -space-x-2">
                  <span className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-black">R</span>
                  <span className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-black">H</span>
                  <span className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-black">B</span>
                </div>
                <span>
                  Mais de <strong className="text-white">10 empresas consolidadas</strong> na Ilha de Vera Cruz
                </span>
                <span className="hidden sm:inline text-gray-600">|</span>
                <span className="flex items-center gap-1">
                  ⭐ <strong className="text-white">5.0</strong> em Satisfação Operacional
                </span>
              </motion.div>
            </div>

            {/* Right Dashboard Mockup Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 relative"
              id="hero-dashboard-mockup"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-transparent to-emerald-500 opacity-20 blur-2xl pointer-events-none" />
              
              {/* Premium Dashboard Chrome Box */}
              <div className="relative bg-gray-950/80 border border-gray-800 rounded-3xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.8)] backdrop-blur-md">
                {/* Windows/Mac Bar */}
                <div className="bg-gray-900/60 px-5 py-3 border-b border-gray-800/80 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 flex items-center gap-1.5 uppercase letter tracking-wider">
                    <Monitor size={10} className="text-emerald-500" />
                    LOKAN CLOUD OS v1.07
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900/50">
                    ONLINE
                  </span>
                </div>

                {/* Dashboard content */}
                <div className="p-6 space-y-6">
                  {/* Mock head */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-400">DEMO EXCLUSIVA LOKAN</span>
                      <h3 className="text-lg font-bold text-white mt-1">SaborDaIlha - Barra do Gil</h3>
                    </div>
                    <div className="px-3 py-1 rounded bg-gray-900 text-[10px] font-mono text-gray-400 border border-gray-800">
                      Ref: 2026-05-28
                    </div>
                  </div>

                  {/* Micro grid of items */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-900/50 border border-gray-800 p-3 rounded-xl">
                      <span className="text-[10px] text-gray-400 block">Faturamento Hoje</span>
                      <span className="text-lg font-bold text-white tracking-tight mt-1 inline-block">R$ 1.842,50</span>
                      <span className="text-[9px] text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-900/30 font-medium ml-1.5 inline-block font-mono">
                        +14%
                      </span>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-800 p-3 rounded-xl">
                      <span className="text-[10px] text-gray-400 block">Mesas em Operação</span>
                      <span className="text-lg font-bold text-white tracking-tight mt-1 block">12 de 24</span>
                      <div className="w-full bg-gray-800 h-1.5 rounded-full mt-2">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "50%" }} />
                      </div>
                    </div>
                  </div>

                  {/* Mini data list */}
                  <div className="space-y-2">
                    <span className="text-[10px] text-gray-400 block font-semibold">COZINHA INTELIGENTE (FILA DE PEDIDOS)</span>
                    <div className="bg-gray-900/40 border border-gray-800/80 rounded-xl divide-y divide-gray-800/60 overflow-hidden">
                      <div className="p-3 flex items-center justify-between text-xs">
                        <span className="font-semibold text-gray-200">Mesa 04 (Varanda)</span>
                        <span className="text-gray-400 text-[10px]">Moqueca de Camarão</span>
                        <span className="px-2 py-0.5 rounded text-[9px] bg-amber-950/80 text-amber-400 border border-amber-900/40">PREPARANDO</span>
                      </div>
                      <div className="p-3 flex items-center justify-between text-xs">
                        <span className="font-semibold text-gray-200">Delivery Barra do Gil</span>
                        <span className="text-gray-400 text-[10px]">Pizza Big + Refri</span>
                        <span className="px-2 py-0.5 rounded text-[9px] bg-blue-950/80 text-blue-400 border border-blue-900/40">NO FORNO</span>
                      </div>
                      <div className="p-3 flex items-center justify-between text-xs">
                        <span className="font-semibold text-gray-200">Mesa 08 (Deck Mar)</span>
                        <span className="text-gray-400 text-[10px]">Pescada + Suco</span>
                        <span className="px-2 py-0.5 rounded text-[9px] bg-emerald-950/80 text-emerald-400 border border-emerald-900/40">RECOLHIDO</span>
                      </div>
                    </div>
                  </div>

                  {/* Micro database representation */}
                  <div className="bg-gray-900/60 border border-gray-800/80 rounded-xl p-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-blue-400 font-mono">
                      <Database size={12} />
                      <span>tbl_pedidos_comanda (BD Relacional)</span>
                    </div>
                    <div className="text-[10px] font-mono text-gray-500 overflow-x-auto space-y-1">
                      <p className="text-gray-400 font-mono">id_comanda : INT [PK] AI</p>
                      <p className="text-gray-400 font-mono">valor_total : DECIMAL(10,2)</p>
                      <p className="text-gray-400 font-mono">status_preparo : VARCHAR(50)</p>
                    </div>
                  </div>

                  {/* Professional disclaimer banner */}
                  <div className="text-[10px] text-center text-gray-500 font-mono pt-2 border-t border-gray-900">
                    ✔ 100% livre de falhas de digitação ou fórmulas corrompidas de planilhas.
                  </div>
                </div>
              </div>

              {/* Decorative extra absolute card */}
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-950 to-emerald-950 border border-blue-800/30 p-4 rounded-xl shadow-xl hidden md:flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400">
                  <Smartphone size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Pronto para Mobile</h4>
                  <p className="text-[10px] text-gray-400">Nuvem segura 24h por dia</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================
          SEÇÃO 2 — SOBRE A EMPRESA
          ========================================= */}
      <section id="sobre" className="relative z-10 py-24 border-t border-gray-900 bg-gray-950/30 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-blue-400 uppercase">IDENTIDADE LOKAN</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white mt-2" id="about-title">
              Quem é a LOKAN?
            </p>
            <div className="h-1 w-12 bg-emerald-500 mx-auto mt-4 rounded" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left explanation */}
            <div className="lg:col-span-6 space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg font-semibold text-white">
                A LOKAN nasceu para transformar e escalar empresas litorâneas através da alta tecnologia de software.
              </p>
              <p>
                Nossa equipe de engenheiros e designers cria sistemas modernos, inteligentes e personalizados que se adaptam exatamente à realidade e aos desafios operacionais de cada negócio privado.
              </p>
              <p className="border-l-2 border-emerald-500 pl-4 py-1 italic text-gray-200">
                “Diferente de sistemas genéricos de grandes polos que forçam você a mudar seu processo comercial, nós criamos plataformas que combinam perfeitamente com a identidade e processos da sua empresa.”
              </p>
              <p>
                Já possuímos as melhores arquiteturas prontas para restaurantes e registro de ponto comercial de implantação rápida na ilha, mas também moldamos soluções unificadas totalmente personalizadas sob demanda do empreendedor.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => scrollSection("servicos")}
                  className="px-6 py-3 rounded-lg bg-blue-900/55 border border-blue-700/40 text-blue-400 hover:text-white hover:bg-blue-900 font-bold text-xs inline-flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Sparkles size={14} className="text-emerald-400" />
                  Ver Nossos Serviços de Elite
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Right checklist grid items */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-black/40 border border-gray-900 p-5 rounded-2xl hover:border-gray-800 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-blue-950/50 border border-blue-900 text-blue-400 flex items-center justify-center mb-3">
                  <CheckCircle size={16} />
                </div>
                <h3 className="font-bold text-white text-sm">Sistema com a cara do negócio</h3>
                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Desenvolvemos com as suas regras fiscais, logomarca, comissionamento e nomenclatura local.</p>
              </div>

              <div className="bg-black/40 border border-gray-900 p-5 rounded-2xl hover:border-gray-800 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-emerald-950/50 border border-emerald-900 text-emerald-400 flex items-center justify-center mb-3">
                  <Cpu size={16} />
                </div>
                <h3 className="font-bold text-white text-sm">Personalização completa</h3>
                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Adicione campos de dados personalizados, formulários de comandas ou relatórios financeiros exclusivos.</p>
              </div>

              <div className="bg-black/40 border border-gray-900 p-5 rounded-2xl hover:border-gray-800 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-emerald-950/50 border border-emerald-900 text-emerald-400 flex items-center justify-center mb-3">
                  <TrendingUp size={16} />
                </div>
                <h3 className="font-bold text-white text-sm">Gestão simplificada</h3>
                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Deixamos tudo em telas limpas, diretas ao ponto, sem termos em inglês vazios ou burocracia de uso.</p>
              </div>

              <div className="bg-black/40 border border-gray-900 p-5 rounded-2xl hover:border-gray-800 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-blue-950/50 border border-blue-900 text-blue-400 flex items-center justify-center mb-3">
                  <Shield size={16} />
                </div>
                <h3 className="font-bold text-white text-sm">Segurança absoluta de dados</h3>
                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Controle em nuvem com criptografia de ponta e backups diários à prova de falhas físicas locais.</p>
              </div>

              <div className="bg-black/40 border border-gray-900 p-5 rounded-2xl hover:border-gray-800 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-blue-950/50 border border-blue-900 text-blue-400 flex items-center justify-center mb-3">
                  <Monitor size={16} />
                </div>
                <h3 className="font-bold text-white text-sm">Interface moderna premium</h3>
                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Cores elegantes, gráficos limpos e fluidos que parecem caros e geram orgulho na equipe de vendas.</p>
              </div>

              <div className="bg-black/40 border border-gray-900 p-5 rounded-2xl hover:border-gray-800 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-emerald-950/50 border border-emerald-900 text-emerald-400 flex items-center justify-center mb-3">
                  <HeartHandshake size={16} />
                </div>
                <h3 className="font-bold text-white text-sm">Suporte humanizado local</h3>
                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Atendimento próximo por WhatsApp ou presencialmente em sua empresa na Ilha de Vera Cruz.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SEÇÃO 3 — SERVIÇOS
          ========================================= */}
      <section id="servicos" className="relative z-10 py-24 border-t border-gray-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-emerald-400 uppercase">SOLUÇÕES ROBUSTAS</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white mt-2" id="services-headline">
              Nossos Serviços Especializados
            </p>
            <div className="h-1 w-12 bg-blue-500 mx-auto mt-4 rounded" />
          </div>

          {/* Bento-style Grid map services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="services-grid">
            {SERVICES.map((item, idx) => (
              <div
                key={item.id}
                className="group relative bg-gray-950/40 border border-gray-900 hover:border-gray-800 p-6 rounded-2xl hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-950/40 border border-blue-900/50 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform duration-300">
                      <DynamicIcon name={item.icon} size={20} />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/30 px-2 py-0.5 rounded">
                      {item.badge}
                    </span>
                  </div>
                  
                  <span className="text-[11px] font-mono text-gray-500">{item.short}</span>
                  <h3 className="text-lg font-bold text-white mt-1 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-6 border-t border-gray-900 mt-6 flex items-center justify-between text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  <span>Sistemas Inteligentes LOKAN</span>
                  <a 
                    href={getWhatsAppLink(`Olá LOKAN! Gostaria de falar sobre o serviço "${item.title}" para minha empresa na Ilha de Vera Cruz.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 font-semibold group-hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    Solicitar Orçamento
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Big impactful quote block */}
          <div className="mt-16 bg-gradient-to-r from-gray-950 to-blue-950/30 border border-gray-900 p-8 rounded-3xl text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[200px] h-full bg-[radial-gradient(circle,rgba(37,99,235,0.06),transparent)] pointer-events-none" />
            <h4 className="text-xl sm:text-2xl font-bold text-white">
              “Seu negócio em Vera Cruz merece muito mais do que planilhas travadas.”
            </h4>
            <p className="text-xs text-gray-400 mt-2 max-w-2xl mx-auto block leading-relaxed">
              Planilhas perdem histórico, podem ser deletadas sem querer e não fornecem alertas de prazos. Nós automatizamos e blindamos seus dados para seu negócio crescer de forma segura.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          SEÇÃO 4 — DIFERENCIAL
          ========================================= */}
      <section id="diferencial" className="relative z-10 py-24 border-t border-gray-900 bg-gray-950/20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side texts */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-xs font-bold tracking-widest text-blue-400 uppercase">NOSSO COMPROMISSO</h2>
              <p className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Por que escolher a LOKAN?
              </p>
              <div className="h-1 w-12 bg-emerald-500 rounded" />
              
              <p className="text-sm text-gray-400 leading-relaxed">
                Temos orgulho de ser uma das primeiras referências regionais de tecnologia e sistemas robustos sediadas na própria regiao litorânea. Conhecemos o público da Bahia e oferecemos tecnologia de capital com preço justo e suporte próximo que funciona.
              </p>

              {/* Local reference map-card */}
              <div className="bg-gray-950/80 border border-gray-950 p-4 rounded-2xl space-y-3 shadow-lg">
                <div className="flex items-center gap-2.5 text-xs text-emerald-400 font-bold">
                  <Locate size={14} className="animate-pulse" />
                  <span>Sede Própria na Ilha</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Não sofra mais esperando horas por suporte de São Paulo ou aguardando chamados impessoais por e-mail. Nós entendemos as dores de comércio da Ilha, flutuações de energia e internet, e criamos softwares blindados para funcionar offline se preciso!
                </p>
              </div>
            </div>

            {/* Right side differentials grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DIFFERENTIALS.map((diff, idx) => (
                <div key={idx} className="bg-black/30 border border-gray-900/60 p-5 rounded-2xl hover:border-gray-800 transition-all flex gap-4">
                  <div className="mt-1 flex-shrink-0 text-emerald-400">
                    <CheckCircle size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">{diff.title}</h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">{diff.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SEÇÃO 6 — BENEFÍCIOS
          ========================================= */}
      <section id="beneficios" className="relative z-10 py-24 border-t border-gray-900 bg-transparent px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-blue-400 uppercase">MIGRAÇÃO DE VALOR</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white mt-2" id="benefits-headline">
              O que muda de verdade na sua empresa?
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Diga adeus ao estresse do fechamento diário e erros operacionais que custam clientes.
            </p>
            <div className="h-1 w-12 bg-emerald-500 mx-auto mt-4 rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BENEFITS.map((item, idx) => (
              <div key={idx} className="bg-gray-950/40 border border-gray-900 hover:border-gray-800 p-6 rounded-2xl relative overflow-hidden group transition-all">
                {/* Accent watermark number */}
                <span className="absolute top-4 right-4 text-4xl font-extrabold text-gray-900/60 select-none group-hover:text-blue-900/30 transition-colors font-mono">
                  {item.number}
                </span>

                <div className="flex items-center gap-2 text-emerald-400 mb-3">
                  <Check size={16} />
                  <span className="text-[10px] uppercase font-bold tracking-widest">LOKAN SECURITY</span>
                </div>

                <h3 className="text-md font-bold text-white mt-1 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          SEÇÃO 5 — POR QUE EMPRESAS ESCOLHEM A LOKAN?
          ========================================= */}
      <section id="escolha-lokan" className="py-24 border-t border-gray-900 bg-gray-950/20 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
        {/* Decorative ambient lights */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-[0.2em] text-emerald-400 uppercase">DIFERENCIAIS DE ELITE</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
              Por que empresas escolhem a <span className="text-moving-gradient">LOKAN</span>?
            </p>
            <p className="text-zinc-400 text-sm mt-3 max-w-xl mx-auto">
              Construímos tecnologia robusta e interfaces impecáveis para transformar a operação interna do seu comércio ou serviço.
            </p>
            <div className="h-[2px] w-12 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto mt-6 rounded" />
          </div>

          {/* Cards modern layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="group relative bg-[#09090b]/80 border border-zinc-900 hover:border-blue-500/40 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_30px_rgba(37,99,235,0.1)] backdrop-blur-md animate-fade-in">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                <Code size={22} />
              </div>
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Sistema com a cara da sua empresa</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Criamos soluções 100% personalizadas que se adaptam exatamente ao seu fluxo de trabalho, respeitando a identidade da sua marca.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group relative bg-[#09090b]/80 border border-zinc-900 hover:border-emerald-500/40 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_30px_rgba(16,185,129,0.1)] backdrop-blur-md animate-fade-in">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300">
                <Layers size={22} />
              </div>
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Adeus planilhas</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Substitua de forma definitiva o Excel, cadernos rasurados, anotações de balcão e os processos manuais lentos por um único sistema organizado.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group relative bg-[#09090b]/80 border border-zinc-900 hover:border-violet-500/40 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_30px_rgba(139,92,246,0.1)] backdrop-blur-md animate-fade-in">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-6 group-hover:scale-110 group-hover:bg-violet-500/20 transition-all duration-300">
                <TrendingUp size={22} />
              </div>
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">Gestão inteligente</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Acompanhe as comandas, caixas abertos, faturamento bruto e histórico de movimentações em tempo real direto da tela do seu telefone.
              </p>
            </div>

            {/* Card 4 */}
            <div className="group relative bg-[#09090b]/80 border border-zinc-900 hover:border-amber-500/40 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_30px_rgba(245,158,11,0.1)] backdrop-blur-md animate-fade-in">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-300">
                <Cpu size={22} />
              </div>
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">Tecnologia moderna</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Plataformas extremamente velozes, com design limpo, agradável de usar e otimizadas para carregamento instantâneo em qualquer conexão 4G/5G.
              </p>
            </div>

            {/* Card 5 */}
            <div className="group relative bg-[#09090b]/80 border border-zinc-900 hover:border-rose-500/40 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_30px_rgba(244,63,94,0.1)] backdrop-blur-md animate-fade-in">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-6 group-hover:scale-110 group-hover:bg-rose-500/20 transition-all duration-300">
                <HeartHandshake size={22} />
              </div>
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-rose-400 transition-colors">Suporte próximo</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Chega de robôs e tickets sem respostas. Na LOKAN, você conta com atendimento humanizado rápido por WhatsApp e acompanhamento consultivo presencial.
              </p>
            </div>

            {/* Card 6 */}
            <div className="group relative bg-[#09090b]/80 border border-zinc-900 hover:border-cyan-500/40 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_30px_rgba(6,182,212,0.1)] backdrop-blur-md animate-fade-in">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-300">
                <Briefcase size={22} />
              </div>
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Feito para microempresas</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Desenvolvemos soluções de elite totalmente viáveis e acessíveis para o orçamento de mercadinhos, pousadas, clínicas e comércios locais.
              </p>
            </div>

          </div>

          {/* Emotional Headline callout with dark glassmorphism */}
          <div className="mt-20 relative bg-gradient-to-br from-zinc-950/80 to-[#0e0e11]/80 border border-zinc-800 p-8 sm:p-12 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md animate-fade-in">
            {/* Background absolute grids / circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider mb-6">
                <Sparkles size={11} className="text-blue-400 animate-pulse" />
                Novas Histórias em Construção
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight max-w-2xl">
                “Ainda estamos construindo <span className="text-moving-gradient">histórias de sucesso</span>. A sua pode ser a próxima.”
              </h2>
              
              <p className="text-zinc-400 text-sm max-w-xl mt-4 leading-relaxed">
                A LOKAN nasceu para transformar empresas através de tecnologia inteligente e crescer lado a lado junto com cada cliente. Nenhum negócio é pequeno demais para ser brilhante.
              </p>

              {/* Sub CTA layout */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                <div className="text-zinc-200 text-sm font-semibold tracking-wide block sm:inline mb-2 sm:mb-0">
                  Vamos construir seu sistema?
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => scrollSection("contato")}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs tracking-wider transition-all duration-200 active:scale-95 shadow-[0_4px_25px_rgba(37,99,235,0.25)] cursor-pointer"
                  >
                    Solicitar orçamento
                  </button>
                  <a
                    href={getWhatsAppLink("Olá LOKAN! Vi as soluções que vocês desenvolvem sob medida e gostaria de programar uma conversa para meu comércio local.")}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-100 font-bold text-xs tracking-wider flex items-center gap-1.5 transition-all duration-200 active:scale-95 cursor-pointer"
                  >
                    <MessageSquare size={13} className="text-emerald-400" />
                    Falar no WhatsApp
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================
          FAQ (DÚVIDAS FREQUENTESAccordion)
          ========================================= */}
      <section id="faq" className="relative z-10 py-24 border-t border-gray-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold tracking-widest text-blue-400 uppercase">PERGUNTAS RECORRENTES</h2>
            <p className="text-3xl font-extrabold text-white mt-2">
              Dúvidas Sobre Nossos Processos
            </p>
            <div className="h-1 w-12 bg-emerald-500 mx-auto mt-4 rounded" />
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-gray-950/60 border border-gray-900 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setFaqOpenIndex(faqOpenIndex === idx ? null : idx)}
                  className="w-full p-5 text-left font-bold text-white text-sm hover:text-blue-400 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`text-gray-500 shrink-0 transition-transform duration-300 ${
                      faqOpenIndex === idx ? "transform rotate-180 text-blue-400" : ""
                    }`}
                    size={16}
                  />
                </button>
                
                <AnimatePresence initial={false}>
                  {faqOpenIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-5 pt-0 text-xs text-gray-400 leading-relaxed border-t border-gray-900/50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          SEÇÃO 7 — CHAMADA FINAL & CONTATO COM FORM
          ========================================= */}
      <section id="contato" className="relative z-10 py-24 border-t border-gray-900 bg-transparent px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side Callout */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <span className="px-2.5 py-1 bg-red-950/45 border border-red-900/40 text-red-400 text-xs font-bold uppercase rounded inline-block tracking-wider">
                FORA DA ESTAGNAÇÃO
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                Sua empresa ainda <br />
                vive presa no Excel?
              </h2>
              <p className="text-md text-gray-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Laptops travando por planilhas sobrecarregadas, faturamento impossível de enxergar rapidamente e sem backup diário comprometem seu lucro. É momento de modernizar.
              </p>

              {/* Direct call references */}
              <div className="pt-6 border-t border-gray-900 flex flex-col sm:flex-row justify-center lg:justify-start gap-6 text-xs text-gray-400">
                <div className="space-y-1">
                  <span className="block text-[10px] font-bold text-gray-500 uppercase">TELEFONE LOCAL</span>
                  <a href="tel:+5571991804818" className="text-white hover:underline text-sm font-semibold block">(71) 99180-4818</a>
                  <span className="text-[10px] block">Segunda à Sexta, 8h às 18h</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-[10px] font-bold text-gray-500 uppercase">E-MAIL COMERCIAL</span>
                  <a href="mailto:contato@lokan.com.br" className="text-white hover:underline text-sm font-semibold block">contato@lokan.com.br</a>
                  <span className="text-[10px] block font-mono">Suporte em Vera Cruz - BA</span>
                </div>
              </div>
            </div>

            {/* Functional Contact Form Container */}
            <div className="lg:col-span-6 bg-gray-950/80 border border-gray-800 p-6 sm:p-8 rounded-3xl shadow-2xl relative">
              <h3 className="text-lg font-bold text-white mb-4">Solicitar Orçamentos & Projetos</h3>
              
              <AnimatePresence mode="wait">
                {formSubmitted ? (
                  <motion.div
                    key="submitted"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="p-8 text-center space-y-4 h-[350px] flex flex-col items-center justify-center bg-emerald-950/20 border border-emerald-900/30 rounded-2xl"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-900/60 border border-emerald-800 text-emerald-400 flex items-center justify-center animate-bounce">
                      <Send size={20} />
                    </div>
                    <h4 className="text-lg font-bold text-white">Solicitação Enviada!</h4>
                    <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
                      Nossa equipe comercial da IIha de Vera Cruz recebeu seus dados e entrará em contato via WhatsApp nas próximas horas.
                    </p>
                    <div className="pt-2">
                      <a
                        href={getWhatsAppLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-4 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-colors inline-flex items-center gap-2"
                      >
                        Acelerar Atendimento por WhatsApp
                        <ArrowRight size={12} />
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleContactSubmit} className="space-y-4">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">Seu Nome *</label>
                        <input
                          type="text"
                          required
                          value={contactForm.nome}
                          onChange={(e) => setContactForm({ ...contactForm, nome: e.target.value })}
                          className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">Seu E-mail *</label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">WhatsApp / Celular *</label>
                        <input
                          type="tel"
                          required
                          placeholder="(71) 99999-9999"
                          value={contactForm.telefone}
                          onChange={(e) => setContactForm({ ...contactForm, telefone: e.target.value })}
                          className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">Nome da Empresa</label>
                        <input
                          type="text"
                          value={contactForm.empresa}
                          onChange={(e) => setContactForm({ ...contactForm, empresa: e.target.value })}
                          className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">Como nos conheceu?</label>
                      <select
                        value={contactForm.ondeOuviu}
                        onChange={(e) => setContactForm({ ...contactForm, ondeOuviu: e.target.value })}
                        className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none cursor-pointer"
                      >
                        <option value="Google">Google / Pesquisa</option>
                        <option value="Instagram">Instagram / Redes Sociais</option>
                        <option value="Recomedacao">Indicação de Empresa Amiga</option>
                        <option value="Presencial">Vi a Sede na Vera Cruz</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">Detalhes / Mensagem</label>
                      <textarea
                        rows={3}
                        placeholder="Em poucas palavras, quais planilhas ou processos manuais você gostaria de eliminar na sua empresa hoje?"
                        value={contactForm.mensagem}
                        onChange={(e) => setContactForm({ ...contactForm, mensagem: e.target.value })}
                        className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-600"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmittingForm}
                        className={`w-full py-3 px-4 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer text-white ${
                          isSubmittingForm 
                            ? "bg-gray-800 border border-gray-700 cursor-wait" 
                            : "bg-gradient-to-r from-blue-600 to-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-98"
                        }`}
                      >
                        {isSubmittingForm ? (
                          <>
                            <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                            <span>ENVIANDO REQUISITOS...</span>
                          </>
                        ) : (
                          <>
                            <Send size={13} />
                            <span>SOLICITAR CONSULTORIA GRÁTIS</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[10px] text-center text-gray-500 leading-relaxed font-mono">
                      🔒 Seus dados comerciais estão protegidos pelas regras da LGPD nacional.
                    </p>

                  </motion.form>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================
          SEÇÃO 8 — RODAPÉ
          ========================================= */}
      <footer className="relative z-10 bg-transparent py-16 border-t border-gray-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 text-xs">
          
          {/* Lokan Bio */}
          <div className="md:col-span-5 space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 group">
              <div className="w-8 h-8 rounded bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center font-bold text-white shadow-md">
                L
              </div>
              <span className="text-md font-bold tracking-widest text-white">LOKAN</span>
            </div>
            <p className="text-gray-400 max-w-sm mx-auto md:mx-0 leading-relaxed">
              Sistemas inteligentes construídos perfeitamente com a cara da sua empresa. Sediados na Ilha de Vera Cruz, Bahia, eliminamos processos manuais legados e impulsionamos faturamento real.
            </p>
            <div className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-900/30 px-2 py-1 rounded inline-block">
              📍 Ilha de Vera Cruz, Bahia - Brasil
            </div>
          </div>

          {/* Quick links map */}
          <div className="md:col-span-3 space-y-4 text-center md:text-left">
            <h4 className="font-bold text-white uppercase tracking-wider">Navegação Rápida</h4>
            <ul className="space-y-2.5 text-gray-400">
              <li>
                <button onClick={() => scrollSection("inicio")} className="hover:text-white hover:underline cursor-pointer">
                  Início
                </button>
              </li>
              <li>
                <button onClick={() => scrollSection("sobre")} className="hover:text-white hover:underline cursor-pointer">
                  Quem Somos
                </button>
              </li>
              <li>
                <button onClick={() => scrollSection("servicos")} className="hover:text-white hover:underline cursor-pointer">
                  Serviços Compartilhados
                </button>
              </li>
              <li>
                <button onClick={() => scrollSection("faq")} className="hover:text-white hover:underline cursor-pointer">
                  Dúvidas Frequentes
                </button>
              </li>
              <li>
                <button onClick={() => scrollSection("contato")} className="hover:text-white hover:underline cursor-pointer">
                  Fale Conosco
                </button>
              </li>
            </ul>
          </div>

          {/* Contacts info details */}
          <div className="md:col-span-4 space-y-4 text-center md:text-left">
            <h4 className="font-bold text-white uppercase tracking-wider">Atendimento & Redes</h4>
            <ul className="space-y-2.5 text-gray-400 leading-normal">
              <li>
                <span className="text-gray-500 font-semibold block text-[10px] uppercase">Instagram</span>
                <a href="https://instagram.com/lokan.sistemas" target="_blank" rel="noreferrer" className="text-gray-200 hover:text-white flex items-center justify-center md:justify-start gap-1">
                  @lokan.sistemas
                  <ExternalLink size={10} />
                </a>
              </li>
              <li>
                <span className="text-gray-500 font-semibold block text-[10px] uppercase">WhatsApp Direto</span>
                <a href={getWhatsAppLink()} className="text-emerald-400 font-semibold hover:underline block">(71) 99180-4818</a>
              </li>
              <li>
                <span className="text-gray-500 font-semibold block text-[10px] uppercase">E-mail Profissional</span>
                <span>contato@lokan.com.br</span>
              </li>
              <li>
                <span className="text-gray-500 font-semibold block text-[10px] uppercase">Localização Física</span>
                <span className="text-gray-300">Vera Cruz, Ilha de Itaparica - BA</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copy lines */}
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-gray-500">
          <p>© 2026 LOKAN Sistemas Inteligentes. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <span className="hover:text-gray-400 cursor-pointer">Termos de Uso</span>
            <span>•</span>
            <span className="hover:text-gray-400 cursor-pointer">Política de Privacidade</span>
          </div>
        </div>
      </footer>

      {/* Futuristic Floating Toast Notification Overlay */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-6 left-6 z-50 p-4 max-w-sm rounded-2xl bg-black/90 border border-zinc-800 text-xs shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-md flex items-start gap-3.5"
          >
            <div className={`p-2 rounded-xl shrink-0 font-bold border ${
              toast.type === "success" ? "bg-emerald-950/80 text-emerald-400 border-emerald-900/40" :
              toast.type === "error" ? "bg-red-950/85 text-red-400 border-red-900/40" :
              toast.type === "warning" ? "bg-amber-950/85 text-amber-400 border-amber-900/50" :
              "bg-zinc-900 text-sky-400 border-zinc-800"
            }`}>
              {toast.type === "success" && "⚡"}
              {toast.type === "error" && "⚠️"}
              {toast.type === "warning" && "🔔"}
              {toast.type === "info" && "ℹ️"}
            </div>
            <div>
              <h5 className="font-bold text-white tracking-wide">{toast.title}</h5>
              <p className="text-[11px] text-zinc-300 leading-relaxed mt-1 font-sans">{toast.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
