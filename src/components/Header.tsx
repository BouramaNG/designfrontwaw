import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Smartphone, Cloud, Network, Globe, Phone, Mail, Cpu, Clock } from 'lucide-react';
import type { PageType } from '../App';

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

const Header = ({ currentPage, onNavigate }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Accueil', page: 'home2' as PageType, icon: Globe },
    { name: 'Connectivité', page: 'connectivite' as PageType, icon: Network },
    { name: 'Cloud', page: 'cloud' as PageType, icon: Cloud },
    { name: 'eSIM Travel', page: 'travel' as PageType, icon: Smartphone },
    { name: 'IoT', page: 'iot' as PageType, icon: Cpu },
    { name: 'Notre Histoire', page: 'about' as PageType, icon: Clock },
    { name: 'Contact', page: 'contact' as PageType, icon: Mail },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-waw-yellow to-waw-yellow-dark rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-waw-dark font-bold text-xl">W</span>
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-waw-dark">
                WAW TELECOM
              </h1>
              <p className="text-xs text-gray-600">Solutions Innovantes</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => onNavigate(item.page)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center space-x-2 font-medium transition-colors group ${
                  currentPage === item.page
                    ? 'text-waw-yellow-dark'
                    : 'text-gray-700 hover:text-waw-yellow-dark'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <item.icon size={18} className="group-hover:text-waw-yellow transition-colors" />
                <span>{item.name}</span>
              </motion.button>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('travel')}
            className="hidden lg:block btn-primary"
          >
            Connexion
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg bg-waw-yellow/10 text-waw-dark"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="container-custom py-4">
              <nav className="space-y-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => {
                      onNavigate(item.page);
                      setIsOpen(false);
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`w-full flex items-center space-x-3 font-medium transition-colors p-3 rounded-lg hover:bg-waw-yellow/5 ${
                      currentPage === item.page
                        ? 'text-waw-yellow-dark bg-waw-yellow/10'
                        : 'text-gray-700 hover:text-waw-yellow-dark'
                    }`}
                  >
                    <item.icon size={20} />
                    <span>{item.name}</span>
                  </motion.button>
                ))}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  onClick={() => onNavigate('travel')}
                  className="w-full btn-primary mt-4"
                >
                  Connexion
                </motion.button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
