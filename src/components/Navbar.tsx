import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";

interface NavbarProps {
  onPlanClick: () => void;
  onContactClick: () => void;
}

export default function Navbar({ onPlanClick, onContactClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active link detection
      const sections = ["inicio", "sobre", "servicos", "faq", "contato"];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "inicio", label: "Início" },
    { id: "sobre", label: "Quem Somos" },
    { id: "servicos", label: "Serviços" },
    { id: "faq", label: "Dúvidas" },
    { id: "contato", label: "Contato" },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header
        id="navbar-root"
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "top-4 max-w-6xl mx-auto px-4 sm:px-6"
            : "top-0 w-full px-4 sm:px-8 py-5"
        }`}
      >
        <div
          className={`w-full transition-all duration-500 ease-in-out ${
            isScrolled
              ? "bg-black/90 backdrop-blur-xl border border-zinc-800/80 p-3 sm:py-3.5 sm:px-6 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              : "bg-transparent py-2 px-0"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* LOGO */}
            <div
              onClick={() => handleNavClick("inicio")}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-all duration-300">
                L
              </div>
              <div>
                <div className="text-sm font-black tracking-wider text-white flex items-center gap-1.5 leading-none">
                  LOKAN
                  <span className="text-[9px] font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-900/50 tracking-normal flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                    Vera Cruz
                  </span>
                </div>
                <span className="text-[10px] font-medium text-zinc-500 tracking-wider">
                  SISTEMAS INTELIGENTES
                </span>
              </div>
            </div>

            {/* DESKTOP MENU */}
            <nav className="hidden md:flex items-center gap-1.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-1.5 text-xs font-semibold transition-all duration-300 rounded-full cursor-pointer hover:text-white ${
                    activeSection === item.id ? "text-white" : "text-zinc-400"
                  }`}
                >
                  {activeSection === item.id && (
                    <motion.span
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-zinc-900/90 rounded-full -z-10 border border-zinc-800/60"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              ))}
            </nav>

            {/* ACTION BUTTON */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={onPlanClick}
                className="group relative px-4.5 py-2 rounded-full text-xs font-bold overflow-hidden transition-all duration-300 bg-emerald-600 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20 text-white flex items-center gap-1.5 border border-emerald-500/30 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-white" />
                Criar Proposta com IA
              </button>
              <button
                onClick={onContactClick}
                className="px-4.5 py-2 rounded-full text-xs font-bold text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all duration-300 cursor-pointer"
              >
                Suporte Local
              </button>
            </div>

            {/* MOBILE MENU TRIGGER */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={onPlanClick}
                className="p-2 px-3.5 rounded-full bg-emerald-600 font-bold text-white hover:bg-emerald-500 transition-colors text-[10px] flex items-center gap-1 shadow"
              >
                <Sparkles className="w-3 h-3 text-white" />
                Simular
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-full transition-colors cursor-pointer"
                id="mobile-menu-btn"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[70px] left-4 right-4 z-40 bg-black/95 backdrop-blur-xl border border-zinc-800/80 p-5 rounded-2xl flex flex-col gap-4 shadow-2xl md:hidden"
          >
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`py-2.5 px-3.5 text-left font-bold rounded-xl text-xs transition-colors ${
                    activeSection === item.id
                      ? "bg-zinc-900 text-emerald-400 border border-zinc-800"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="h-px bg-zinc-800/60 my-1" />

            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onPlanClick();
                }}
                className="w-full py-3 rounded-xl bg-emerald-600 text-[11px] font-bold text-white flex items-center justify-center gap-2 hover:bg-emerald-500 shadow transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-white" />
                Criar Proposta Grátis
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onContactClick();
                }}
                className="w-full py-3 rounded-xl bg-zinc-950 text-[11px] font-bold text-zinc-300 hover:text-white border border-zinc-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                Solicitar Suporte no WhatsApp
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
