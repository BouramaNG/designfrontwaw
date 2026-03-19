import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import Header from './components/Header';
import { useLocation, useNavigate } from 'react-router-dom';

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
import StarlinkPressPage from './pages/StarlinkPressPage';
import StarlinkPage from './pages/StarlinkPage';

export type PageType = 'home' | 'home2' | 'connectivite' | 'cloud' | 'starlink' | 'starlink-press' | 'travel' | 'iot' | 'about' | 'contact' | 'plan-details' | 'checkout' | 'confirmation' | 'login' | 'register';

interface AppProps {
  initialPage?: PageType;
}

function App({ initialPage = 'home2' }: AppProps) {
  const [currentPage, setCurrentPage] = useState<PageType>(initialPage);
  const [selectedPlanId, setSelectedPlanId] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const location = useLocation();

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

  // Navigation hybride: on garde l'app state-based, mais on pousse l'URL
  // uniquement pour les pages déjà routées (test: / et /starlink).
  const onNavigate = useCallback((page: PageType) => {
    if (page === 'home2') {
      if (location.pathname !== '/') navigate('/', { replace: false });
      setCurrentPage('home2');
      return;
    }
    if (page === 'starlink') {
      if (location.pathname !== '/starlink') navigate('/starlink', { replace: false });
      setCurrentPage('starlink');
      return;
    }
    if (page === 'connectivite') {
      if (location.pathname !== '/connectivite') navigate('/connectivite', { replace: false });
      setCurrentPage('connectivite');
      return;
    }
    if (page === 'contact') {
      if (location.pathname !== '/contact') navigate('/contact', { replace: false });
      setCurrentPage('contact');
      return;
    }
    if (page === 'travel') {
      if (location.pathname !== '/travel') navigate('/travel', { replace: false });
      setCurrentPage('travel');
      return;
    }
    if (page === 'cloud') {
      if (location.pathname !== '/cloud') navigate('/cloud', { replace: false });
      setCurrentPage('cloud');
      return;
    }
    if (page === 'about') {
      if (location.pathname !== '/about') navigate('/about', { replace: false });
      setCurrentPage('about');
      return;
    }
    if (page === 'iot') {
      if (location.pathname !== '/iot') navigate('/iot', { replace: false });
      setCurrentPage('iot');
      return;
    }
    setCurrentPage(page);
  }, [location.pathname, navigate]);

  const renderPage = () => {
    switch (currentPage) {
      case 'connectivite':
        return <ConnectivitePage onNavigate={onNavigate} />;
      case 'cloud':
        return <CloudPage onNavigate={onNavigate} />;
      case 'about':
        return <AboutPage onNavigate={onNavigate} />;
      case 'travel':
        return <ESimPage onNavigate={onNavigate} onNavigateWithPlan={navigateToPage} />;
      case 'iot':
        return <IoTPage onNavigate={onNavigate} />;
      case 'home2':
        return <HomePage2 onNavigate={onNavigate} />;
      case 'plan-details':
        return <PlanDetailsPage onNavigate={onNavigate} navigateToPage={navigateToPage} planId={selectedPlanId} />;
      case 'checkout':
        return <CheckoutPage onNavigate={onNavigate} selectedPlan={{
          data: selectedPlanId || '1GB',
          price: 1000,
          description: 'Forfait standard',
          country: 'Sénégal'
        }} />;
      case 'confirmation':
        return <ConfirmationPage onNavigate={onNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={onNavigate} />;
      case 'starlink':
        return <StarlinkPage onNavigate={onNavigate} />;
      case 'starlink-press':
        return <StarlinkPressPage onNavigate={onNavigate} />;
      case 'login':
        return <LoginPage onNavigate={onNavigate} />;
      case 'register':
        return <RegisterPage onNavigate={onNavigate} />;
      default:
        return <HomePage2 onNavigate={onNavigate} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Header currentPage={currentPage} onNavigate={onNavigate} />
      {renderPage()}
      <Footer onNavigate={onNavigate} />

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
