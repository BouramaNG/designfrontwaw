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

export type PageType = 'home' | 'home2' | 'connectivite' | 'cloud' | 'starlink' | 'travel' | 'iot' | 'about' | 'contact' | 'plan-details' | 'checkout' | 'confirmation' | 'login' | 'register';

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

      {/* WhatsApp Floating Actions */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 3, type: 'spring', stiffness: 200 }}
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-5"
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-400 to-green-600 text-white shadow-lg border border-white/30">
            Support 24/7
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => openWhatsApp('Bonjour, j\'ai une question concernant vos services WAW TELECOM')}
            className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg flex items-center justify-center transition-colors"
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
            }}
          >
            <MessageCircle size={26} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default App;
