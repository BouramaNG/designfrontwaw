import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
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
import HomePage2 from './pages/HomePage2';

export type PageType = 'home' | 'home2' | 'connectivite' | 'cloud' | 'travel' | 'iot' | 'about' | 'contact' | 'plan-details';

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
        return <PlanDetailsPage onNavigate={setCurrentPage} planId={selectedPlanId} />;
      case 'contact':
        return <ContactPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage2 onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
      <Footer onNavigate={setCurrentPage} />

      {/* WhatsApp Floating Button Global */}
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
    </div>
  );
}

export default App;
