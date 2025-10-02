import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import Header from './components/Header';

import ESIMSection from './components/eSIMSection';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ConnectivitePage from './pages/ConnectivitePage';
import CloudPage from './pages/CloudPage';
import AboutPage from './pages/AboutPage';
import ESimPage from './pages/ESimPage';
import IoTPage from './pages/IoTPage';
import ContactPage from './pages/ContactPage';
import PlanDetailsPage from './pages/PlanDetailsPage';
import CheckoutPage from './pages/CheckoutPage';
import ConfirmationPage from './pages/ConfirmationPage';
import HomePage2 from './pages/HomePage2';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

export type PageType = 'home' | 'home2' | 'connectivite' | 'cloud' | 'travel' | 'iot' | 'about' | 'contact' | 'plan-details' | 'checkout' | 'confirmation' | 'login' | 'register';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home2');
  const [selectedPlanId, setSelectedPlanId] = useState<string | undefined>(undefined);

  const openWhatsApp = (message: string) => {
    const phoneNumber = '221769291717';
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  const navigateToPage = (page: PageType, planId?: string) => {
    if (planId) {
      setSelectedPlanId(planId);
    }
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'connectivite':
        return <ConnectivitePage onNavigate={setCurrentPage} />;
      case 'cloud':
        return <CloudPage onNavigate={setCurrentPage} />;
      case 'about':
        return <AboutPage onNavigate={setCurrentPage} />;
      case 'travel':
        return <ESimPage onNavigate={setCurrentPage} onNavigateWithPlan={navigateToPage} />;
      case 'iot':
        return <IoTPage onNavigate={setCurrentPage} />;
      case 'home2':
        return <HomePage2 onNavigate={setCurrentPage} />;
      case 'plan-details':
        return <PlanDetailsPage onNavigate={setCurrentPage} navigateToPage={navigateToPage} planId={selectedPlanId} />;
      case 'checkout':
        return <CheckoutPage onNavigate={setCurrentPage} selectedPlan={{
          data: selectedPlanId || '1GB',
          price: 1000,
          description: 'Forfait standard',
          country: 'Sénégal'
        }} />;
      case 'confirmation':
        return <ConfirmationPage onNavigate={setCurrentPage} />;
      case 'contact':
        return <ContactPage onNavigate={setCurrentPage} />;
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} />;
      case 'register':
        return <RegisterPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage2 onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
      <Footer onNavigate={setCurrentPage} />

      {/* WhatsApp Floating Button Support (droite) */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 3, type: 'spring', stiffness: 200 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => openWhatsApp('Bonjour, j\'ai une question concernant vos services WAW TELECOM')}
          className="w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        >
          <MessageCircle size={28} />
        </motion.button>
      </motion.div>

      {/* WhatsApp Floating Button Achat (gauche) */}
      <a
        href="https://wa.me/221763644946"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 flex items-center gap-3 px-5 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-lg transition-all text-base group"
        style={{ boxShadow: '0 4px 24px 0 rgba(39, 174, 96, 0.25)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="16" fill="#25D366"/><path fill="#fff" d="M16 7.5A8.5 8.5 0 0 0 7.5 16c0 1.5.4 2.9 1.1 4.1l-1.2 4.4 4.5-1.2A8.5 8.5 0 1 0 16 7.5Zm4.8 12.1c-.2.6-1.1 1.1-1.5 1.2-.4.1-.9.2-1.5-.1-.3-.1-.7-.2-1.5-.5-2.6-1.1-4.3-3.7-4.4-3.9-.1-.2-1-1.3-1-2.5 0-1.1.6-1.6.8-1.8.2-.2.4-.2.6-.2.1 0 .3 0 .4.3.2.3.5 1 .6 1.1.1.1.1.2 0 .4-.1.2-.2.3-.3.5-.1.1-.2.2-.1.4.2.4.7 1.2 1.5 1.7.7.4 1.1.6 1.3.5.2-.1.3-.2.4-.4.1-.2.2-.2.4-.2.1 0 .2 0 .3 0 .1 0 .2 0 .3.2.1.2.4.9.5 1.2.1.3.2.3.1.5Z"/></svg>
        Acheter votre eSIM avec WhatsApp
      </a>
    </div>
  );
}

export default App;
