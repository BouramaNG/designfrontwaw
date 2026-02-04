import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Smartphone, Cloud, Network, Globe, Cpu, Clock, Mail, ArrowRight, MessageCircle } from 'lucide-react';
import type { PageType } from '../App';
import logoWaw from '../assets/images/Logo Waw officiel.png';

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

const Header = ({ currentPage, onNavigate }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer menu mobile au resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { name: 'Accueil', page: 'home2' as PageType, icon: Globe },
    { name: 'Connectivité', page: 'connectivite' as PageType, icon: Network },
    { name: 'Cloud', page: 'cloud' as PageType, icon: Cloud, comingSoon: true },
    { name: 'eSIM Travel', page: 'travel' as PageType, icon: Smartphone },
    { name: 'IoT', page: 'iot' as PageType, icon: Cpu, comingSoon: true },
    { name: 'Notre Histoire', page: 'about' as PageType, icon: Clock },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.comingSoon) {
      setShowComingSoon(true);
      setTimeout(() => setShowComingSoon(false), 2500);
    } else {
      onNavigate(item.page);
      setIsOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4"
      >
        <div
          className={`max-w-6xl mx-auto rounded-2xl transition-all duration-500 ${
            isScrolled
              ? 'bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/50'
              : 'bg-white/60 backdrop-blur-lg shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-white/30'
          }`}
        >
          <div className="px-5 sm:px-6">
            <div className="flex items-center justify-between h-16">

              {/* Logo */}
              <motion.button
                onClick={() => onNavigate('home2' as PageType)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 relative z-10"
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-white shadow-md flex items-center justify-center p-1">
                  <img src={logoWaw} alt="WAW Telecom" className="w-full h-full object-contain" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-base font-bold text-waw-dark leading-tight tracking-tight">
                    WAW TELECOM
                  </h1>
                  <p className="text-[10px] text-gray-400 leading-tight">Solutions Innovantes</p>
                </div>
              </motion.button>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-1">
                {navItems.map((item) => (
                  <motion.button
                    key={item.name}
                    onClick={() => handleNavClick(item)}
                    className="relative px-4 py-2 rounded-xl text-sm font-medium transition-colors group"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {/* Background au hover */}
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-waw-yellow/0 group-hover:bg-waw-yellow/8 transition-colors duration-300"
                    />

                    <span className={`relative z-10 transition-colors duration-300 ${
                      currentPage === item.page
                        ? 'text-waw-dark'
                        : 'text-gray-500 group-hover:text-waw-dark'
                    }`}>
                      {item.name}
                    </span>

                    {/* Indicateur page active */}
                    {currentPage === item.page && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-waw-yellow rounded-full"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}

                    {/* Badge Coming Soon */}
                    {item.comingSoon && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full" />
                    )}
                  </motion.button>
                ))}
              </nav>

              {/* CTA Button Desktop */}
              <div className="hidden lg:flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onNavigate('contact' as PageType)}
                  className="relative bg-waw-dark text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-waw-dark/20"
                >
                  <Mail size={15} />
                  <span>Contact</span>
                </motion.button>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden relative w-10 h-10 rounded-xl bg-waw-dark/5 flex items-center justify-center"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={20} className="text-waw-dark" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={20} className="text-waw-dark" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 35 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white/95 backdrop-blur-xl shadow-2xl"
            >
              <div className="flex flex-col h-full pt-24 pb-8 px-6">
                {/* Nav Items */}
                <nav className="flex-1 space-y-1">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      onClick={() => handleNavClick(item)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 group ${
                        currentPage === item.page
                          ? 'bg-waw-yellow/10'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                        currentPage === item.page
                          ? 'bg-waw-yellow text-waw-dark'
                          : 'bg-gray-100 text-gray-400 group-hover:bg-waw-yellow/10 group-hover:text-waw-dark'
                      }`}>
                        <item.icon size={20} />
                      </div>
                      <div className="flex-1 text-left">
                        <p className={`font-semibold text-sm ${
                          currentPage === item.page ? 'text-waw-dark' : 'text-gray-700'
                        }`}>
                          {item.name}
                        </p>
                        {item.comingSoon && (
                          <p className="text-[11px] text-orange-400 font-medium">Bientôt disponible</p>
                        )}
                      </div>
                      <ArrowRight size={16} className={`transition-all ${
                        currentPage === item.page ? 'text-waw-dark' : 'text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1'
                      }`} />
                    </motion.button>
                  ))}
                </nav>

                {/* CTA Mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-3 pt-6 border-t border-gray-100"
                >
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { onNavigate('contact' as PageType); setIsOpen(false); }}
                    className="w-full bg-waw-dark text-white py-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2"
                  >
                    <Mail size={18} />
                    Nous contacter
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => window.open('https://wa.me/221769291717', '_blank')}
                    className="w-full bg-green-500 text-white py-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={18} />
                    WhatsApp
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Coming Soon */}
      <AnimatePresence>
        {showComingSoon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={() => setShowComingSoon(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-3xl p-10 max-w-sm w-full shadow-2xl text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-16 h-16 bg-waw-yellow/10 rounded-2xl flex items-center justify-center mx-auto mb-5"
              >
                <Clock size={32} className="text-waw-yellow" />
              </motion.div>
              <h3 className="text-xl font-bold text-waw-dark mb-2">Bientôt disponible</h3>
              <p className="text-gray-500 text-sm">Ce service arrive très prochainement. Restez connecté !</p>
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 2.5, ease: 'linear' }}
                className="h-1 bg-waw-yellow rounded-full mt-6 mx-auto"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
