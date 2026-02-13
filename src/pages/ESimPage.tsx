// Guide step images

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import useDeviceOptimization from '../hooks/useDeviceOptimization';
import useOptimizedTransition from '../hooks/useOptimizedTransition';
import '../styles/safari-animations.css';
import { esimService, type ESimPackage } from '../services/esimService';
import { PAYS, CONTINENTS } from '../utils/constants';
import {
  Smartphone,
  Globe,
  Zap,
  Shield,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  Users,
  Clock,
  TrendingUp,
  Wifi,
  MapPin,
  CreditCard,
  Download,
  Settings,
  Star,
  ChevronDown,
  Search,
  Plane
} from 'lucide-react';
import { CompatibleDevicesModal } from '../components/CompatibleDevicesModal';
import React from 'react';
import { useState, useEffect } from 'react';
import type { PageType } from '../App';

// Import user images
import esimImg from '../assets/images/esim.png';
import slide1Img from '../assets/images/slide1.png';
import image4Img from '../assets/images/Image4.jpg';
import compatibliteImg from '../assets/images/compatiblite.png';

// Installation eSIM step images
import esim1Img from '../assets/images/installationesim/esim1.png';
import esim2Img from '../assets/images/installationesim/esim2.png';
import esim3Img from '../assets/images/installationesim/esim3.png';
import esim4Img from '../assets/images/installationesim/esim4.png';
import esim5Img from '../assets/images/installationesim/esim5.png';

interface ESimPageProps {
  onNavigate: (page: PageType) => void;
  onNavigateWithPlan?: (page: PageType, planId?: string) => void;
}

const heroImages = [esimImg, slide1Img, image4Img];

const ESimPage = ({ onNavigate, onNavigateWithPlan }: ESimPageProps) => {
  // Optimisation device
  const { isSafari, isMobile, transitionConfig } = useDeviceOptimization();
  const { transitions } = useOptimizedTransition();
  
  // State for Compatible Devices Modal
  const [modalOpen, setModalOpen] = useState(false);
  // Hero image cycling
  const [imgIndex, setImgIndex] = useState(0);
  // Active advantage for interactive showcase
  const [activeAdvantage, setActiveAdvantage] = useState(0);
  // Compatibility checker states
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  // Destination filter states
  const [destSearch, setDestSearch] = useState('');
  const [activeContinent, setActiveContinent] = useState('Tous');
  // Comment ça marche - active step
  const [activeStep, setActiveStep] = useState(0);

  // Destinations avec packages
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [errorPackages, setErrorPackages] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Charger les packages pour chaque destination
  useEffect(() => {
    const loadDestinationsWithPackages = async () => {
      setLoadingPackages(true);
      try {
        const destinationsWithPackages = await Promise.all(
          PAYS.map(async (pays) => {
            try {
              const packages = await esimService.getPackagesWithPrice(pays.code);
              return {
                ...pays,
                packages: packages || []
              };
            } catch (err) {
              return {
                ...pays,
                packages: []
              };
            }
          })
        );
        setDestinations(destinationsWithPackages);
      } catch (err) {
        console.error('Erreur chargement destinations:', err);
        setErrorPackages('Erreur lors du chargement des destinations');
        setDestinations(PAYS.map(p => ({ ...p, packages: [] })));
      } finally {
        setLoadingPackages(false);
      }
    };

    loadDestinationsWithPackages();
  }, []);

  // Auto-cycle advantages every 5s unless user interacts
  const [advantagePaused, setAdvantagePaused] = useState(false);
  useEffect(() => {
    if (advantagePaused) return;
    const interval = setInterval(() => {
      setActiveAdvantage((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, [advantagePaused]);

  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [section1Ref, section1InView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [section2Ref, section2InView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [section3Ref, section3InView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [section4Ref, section4InView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const,
      },
    },
  };

  const stats = [
    { icon: Globe, value: 'Nos destinations', label: 'Pays couverts', color: 'text-waw-yellow' },
    { icon: Zap, value: '24h', label: 'Activation immédiate', color: 'text-waw-yellow' },
    { icon: Shield, value: '5G', label: 'Technologie avancée', color: 'text-waw-yellow' },
    { icon: Users, value: '50K+', label: 'Clients satisfaits', color: 'text-waw-yellow' }
  ];

  const advantages = [
    {
      step: '1',
      icon: Globe,
      title: "Connectivité mondiale instantanée",
      description: "Accédez à Internet dans plus de 60 pays, sans changer de carte SIM. Votre liberté n'a plus de frontières."
    },
    {
      step: '2',
      icon: CreditCard,
      title: "Tarification claire & accessible",
      description: "Des forfaits dès 1 000 FCFA, pensés pour tous. Maîtrisez votre budget, profitez d'une expérience premium."
    },
    {
      step: '3',
      icon: Zap,
      title: "Activation ultra-rapide",
      description: "Scannez, activez, surfez. Votre eSIM est opérationnelle en quelques secondes, où que vous soyez."
    },
    {
      step: '4',
      icon: Star,
      title: "Support humain & multilingue",
      description: "Notre équipe WAW vous accompagne 7j/7, en français, anglais et wolof. Un service client réactif, expert et proche de vous."
    }
  ];

  const continents = CONTINENTS;

  // Filtrer les destinations selon le continent et la recherche
  const filteredDestinations = destinations.filter((country) => {
    // Filtre continent
    if (activeContinent !== 'Tous') {
      if (country.continent !== activeContinent) {
        return false;
      }
    }

    // Filtre recherche
    if (destSearch) {
      const searchLower = destSearch.toLowerCase();
      return (
        country.nom.toLowerCase().includes(searchLower) ||
        country.code.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  const howItWorks = [
    {
      step: '1',
      title: 'Vérifiez la compatibilité de votre appareil',
      description: 'Assurez-vous que votre smartphone ou tablette prend en charge la technologie eSIM.',
      icon: Smartphone,
      img: esim1Img
    },
    {
      step: '2',
      title: 'Commandez votre eSIM en ligne',
      description: 'Sélectionnez votre forfait et finalisez votre achat en quelques clics sur notre plateforme sécurisée.',
      icon: CreditCard,
      img: esim2Img
    },
    {
      step: '3',
      title: 'Recevez le QR code par e-mail',
      description: 'Votre eSIM vous est envoyée instantanément par e-mail, prête à être activée.',
      icon: Mail,
      img: esim3Img
    },
    {
      step: '4',
      title: 'Scannez et activez votre forfait',
      description: 'Scannez le QR code avec votre appareil et profitez immédiatement de votre connexion.',
      icon: Download,
      img: esim4Img
    },
    {
      step: '5',
      title: 'Profitez de votre connexion',
      description: 'Votre eSIM est activée ! Naviguez, appelez et restez connecté partout dans le monde.',
      icon: CheckCircle,
      img: esim5Img
    }
  ];

  const businessFeatures = [
    'Gestion centralisée des eSIM équipes',
    'Facturation consolidée et reporting détaillé',
    'Support dédié avec gestionnaire de compte',
    'API pour intégration aux systèmes existants',
    'Tarifs préférentiels volume',
    'Contrôle des coûts en temps réel'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#0a0a0a' }}>
        {/* Subtle background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-waw-yellow/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-waw-yellow/3 rounded-full blur-[100px]" />
        </div>

        <div className="container-custom relative z-10 pt-32 pb-20">
          <motion.div
            ref={heroRef}
            variants={containerVariants}
            initial="hidden"
            animate={heroInView ? 'visible' : 'hidden'}
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            {/* Left - Text Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: isSafari ? 0.15 : 0.3, duration: isSafari ? 0.3 : 0.6 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-waw-yellow/10 border border-waw-yellow/20 rounded-full"
              >
                <div className="w-2 h-2 bg-waw-yellow rounded-full animate-pulse" />
                <span className="text-waw-yellow font-medium text-sm tracking-wide">eSIM Travel & Business</span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.1] text-white">
                Votre eSIM dès{' '}
                <span className="bg-gradient-to-r from-waw-yellow to-waw-yellow-dark bg-clip-text text-transparent">
                  1 000 FCFA
                </span>{' '}
                internationale
              </h1>

              <p className="text-lg lg:text-xl text-gray-400 leading-relaxed max-w-xl">
                Profitez d'une connectivité mobile instantanée, sans carte SIM physique, et restez connecté où que vous soyez dans le monde.
              </p>

              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onNavigate('contact')}
                  className="bg-waw-yellow text-waw-dark font-bold px-10 py-4 rounded-xl text-lg hover:bg-waw-yellow-dark transition-colors flex items-center justify-center gap-2 group shadow-lg shadow-waw-yellow/20"
                >
                  <Phone size={20} />
                  <span>Nous Contacter</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>

            {/* Right - 3D Image with cycling */}
            <motion.div variants={itemVariants} className="relative flex items-center justify-center">
              <div
                className="relative w-full max-w-[500px]"
                style={{ perspective: '1200px' }}
              >
                {isSafari ? (
                  // Safari: Pure CSS fade animation - NO Framer Motion
                  <div
                    key={`hero-safari-${imgIndex}`}
                    className="relative safari-animate-image-fade"
                  >
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
                      <img
                        src={heroImages[imgIndex]}
                        alt="eSIM WAW Telecom"
                        className="w-full h-[400px] sm:h-[480px] object-cover"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Bottom info overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-bold text-lg">eSIM WAW TELECOM</h4>
                            <p className="text-gray-300 text-sm">Connectivité mondiale instantanée</p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-green-400 text-xs font-medium">Actif</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Yellow accent border */}
                    <div className="absolute -inset-[2px] rounded-3xl border-2 border-waw-yellow/30 pointer-events-none" />
                  </div>
                ) : (
                  // Chrome/Firefox: Full 3D flip animation
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={imgIndex}
                      initial={{ rotateY: 90, opacity: 0, scale: 0.9 }}
                      animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                      exit={{ rotateY: -90, opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                      style={{ transformStyle: 'preserve-3d' }}
                      className="relative"
                    >
                      <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
                        <img
                          src={heroImages[imgIndex]}
                          alt="eSIM WAW Telecom"
                          className="w-full h-[400px] sm:h-[480px] object-cover"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Bottom info overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-white font-bold text-lg">eSIM WAW TELECOM</h4>
                              <p className="text-gray-300 text-sm">Connectivité mondiale instantanée</p>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                              <span className="text-green-400 text-xs font-medium">Actif</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Yellow accent border */}
                      <div className="absolute -inset-[2px] rounded-3xl border-2 border-waw-yellow/30 pointer-events-none" />
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* Image dots indicator */}
                <div className="flex justify-center gap-2 mt-4">
                  {heroImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIndex(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        i === imgIndex ? 'bg-waw-yellow w-8' : 'bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>

                {/* Floating badge - top left */}
                <motion.div
                  animate={{
                    x: [0, 12, 0],
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                  }}
                  className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-xl p-3 hidden lg:flex items-center gap-2"
                >
                  <div className="w-10 h-10 bg-waw-yellow/10 rounded-xl flex items-center justify-center">
                    <Zap size={18} className="text-waw-yellow-dark" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Activation 24h</p>
                    <p className="text-xs text-gray-500">Instantanée</p>
                  </div>
                </motion.div>

                {/* Floating badge - bottom right */}
                <motion.div
                  animate={{
                    x: [0, -10, 0],
                    y: [0, 10, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                    delay: 1.5,
                  }}
                  className="absolute -bottom-4 -right-6 bg-white rounded-2xl shadow-xl p-3 hidden lg:flex items-center gap-2"
                >
                  <div className="w-10 h-10 bg-waw-yellow/10 rounded-xl flex items-center justify-center">
                    <Globe size={18} className="text-waw-yellow" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">200+ Pays</p>
                    <p className="text-xs text-gray-500">Couverture mondiale</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-gray-500 uppercase tracking-widest">Découvrir</span>
            <ChevronDown size={20} className="text-waw-yellow" />
          </div>
        </motion.div>
      </section>

      {/* Section - Qu'est-ce que l'eSIM ? */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        {/* Subtle bg accent */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-waw-yellow/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container-custom relative z-10">
          {/* Section header - centré */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-waw-yellow/10 border border-waw-yellow/20 rounded-full mb-6">
              <Zap size={14} className="text-waw-yellow-dark" />
              <span className="text-sm font-semibold text-waw-dark">Technologie du Futur</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-display font-bold text-waw-dark mb-6">
              Qu'est-ce que l'eSIM ?
            </h2>

            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
              Découvrez la révolution de la connectivité mobile : l'eSIM, votre passeport numérique vers une connexion mondiale sans limites.
            </p>
          </motion.div>

          {/* Layout: Image gauche + Features droite */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Image avec 3D perspective */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div style={{ perspective: '1000px' }}>
                <motion.div
                  whileHover={{ rotateY: -5, rotateX: 3, scale: 1.02 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="relative rounded-3xl overflow-hidden shadow-2xl"
                >
                  <img
                    src={esimImg}
                    alt="Technologie eSIM"
                    className="w-full h-[420px] lg:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-waw-dark/70 via-waw-dark/20 to-transparent" />

                  {/* Info overlay en bas */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-waw-yellow rounded-xl flex items-center justify-center flex-shrink-0">
                          <Smartphone size={24} className="text-waw-dark" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-waw-dark">SIM intégrée</h4>
                          <p className="text-sm text-gray-500">Pas de carte physique, tout est numérique</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-xs text-green-600 font-medium">Actif</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Badge flottant */}
              <motion.div
                animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 bg-waw-dark text-white rounded-2xl shadow-xl px-4 py-3 hidden lg:flex items-center gap-2"
              >
                <Globe size={16} className="text-waw-yellow" />
                <span className="text-sm font-bold">200+ pays</span>
              </motion.div>
            </motion.div>

            {/* Features - 4 cards empilées */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-5"
            >
              {[
                {
                  icon: Smartphone,
                  title: '100% Numérique',
                  desc: 'Intégrée directement dans votre appareil, sans carte physique. La simplicité à l\'état pur.',
                  color: 'bg-blue-50',
                  iconColor: 'text-blue-600',
                },
                {
                  icon: Zap,
                  title: 'Activation Express',
                  desc: 'Installation instantanée via QR code. Connecté en quelques secondes, partout dans le monde.',
                  color: 'bg-waw-yellow/10',
                  iconColor: 'text-waw-yellow-dark',
                },
                {
                  icon: Users,
                  title: 'Multi-Profils',
                  desc: 'Gérez plusieurs numéros sur un seul appareil. Idéal pour voyages et business.',
                  color: 'bg-emerald-50',
                  iconColor: 'text-emerald-600',
                },
                {
                  icon: CheckCircle,
                  title: 'Compatibilité Étendue',
                  desc: 'Fonctionne avec les derniers iPhone, Samsung, Google Pixel et autres appareils modernes.',
                  color: 'bg-purple-50',
                  iconColor: 'text-purple-600',
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                  whileHover={{ x: 8, scale: 1.01 }}
                  className="group flex items-start gap-5 p-5 rounded-2xl border border-gray-100 bg-white hover:bg-gray-50/80 hover:border-waw-yellow/30 hover:shadow-lg transition-all cursor-default"
                >
                  <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <feature.icon size={22} className={feature.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-waw-dark mb-1 text-[15px]">{feature.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                  </div>
                  <ArrowRight size={16} className="text-gray-300 group-hover:text-waw-yellow group-hover:translate-x-1 transition-all mt-1 flex-shrink-0" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 1 - Avantages eSIM - Interactive Showcase */}
      <section className="py-24 lg:py-32 bg-gray-50 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-waw-yellow/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container-custom relative z-10">
          {/* Header */}
          <motion.div
            ref={section1Ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-waw-yellow/10 border border-waw-yellow/20 rounded-full mb-6">
              <Star size={14} className="text-waw-yellow-dark" />
              <span className="text-sm font-semibold text-waw-dark">Avantages eSIM</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-display font-bold text-waw-dark mb-6">
              Pourquoi choisir l'<span className="bg-gradient-to-r from-waw-yellow to-waw-yellow-dark bg-clip-text text-transparent">eSIM WAW Travel</span> ?
            </h2>

            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
              Découvrez tous les avantages de notre technologie eSIM avancée,
              conçue pour les voyageurs modernes et les entreprises connectées.
            </p>
          </motion.div>

          {/* Interactive layout: tabs gauche + card active droite */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid lg:grid-cols-[340px_1fr] gap-8 lg:gap-12 items-start max-w-5xl mx-auto"
          >
            {/* Tabs - côté gauche */}
            <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {advantages.map((adv, index) => {
                const isActive = activeAdvantage === index;
                const colors = [
                  { bg: 'bg-blue-500', light: 'bg-blue-50', text: 'text-blue-600' },
                  { bg: 'bg-waw-yellow', light: 'bg-waw-yellow/10', text: 'text-waw-yellow-dark' },
                  { bg: 'bg-emerald-500', light: 'bg-emerald-50', text: 'text-emerald-600' },
                  { bg: 'bg-purple-500', light: 'bg-purple-50', text: 'text-purple-600' },
                ];
                const color = colors[index];
                return (
                  <motion.button
                    key={adv.title}
                    onClick={() => {
                      setActiveAdvantage(index);
                      setAdvantagePaused(true);
                      // Resume auto-cycle after 15s
                      setTimeout(() => setAdvantagePaused(false), 15000);
                    }}
                    whileHover={{ x: isActive ? 0 : 4 }}
                    className={`relative flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all min-w-[200px] lg:min-w-0 ${
                      isActive
                        ? 'bg-white shadow-lg border-2 border-waw-yellow/30'
                        : 'bg-white/60 border-2 border-transparent hover:bg-white hover:shadow-md'
                    }`}
                  >
                    {/* Progress bar pour l'item actif */}
                    {isActive && !advantagePaused && (
                      <motion.div
                        className="absolute bottom-0 left-3 right-3 h-[3px] rounded-full bg-waw-yellow/20 overflow-hidden"
                      >
                        <motion.div
                          className="h-full bg-waw-yellow rounded-full"
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 5, ease: 'linear' }}
                          key={`progress-${activeAdvantage}`}
                        />
                      </motion.div>
                    )}

                    {/* Step number */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      isActive ? color.bg + ' text-white' : color.light + ' ' + color.text
                    }`}>
                      <span className="font-bold text-sm">{adv.step}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-sm truncate ${isActive ? 'text-waw-dark' : 'text-gray-500'}`}>
                        {adv.title}
                      </p>
                    </div>

                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-waw-yellow rounded-full flex-shrink-0"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Card active - côté droit */}
            <div className="relative min-h-[320px]">
              {isSafari ? (
                // Safari: Simple fade without AnimatePresence
                advantages.map((adv, index) => {
                  if (index !== activeAdvantage) return null;
                  const colors = [
                    { gradient: 'from-blue-500 to-blue-600', light: 'bg-blue-50', iconColor: 'text-blue-600', accent: 'border-blue-200' },
                    { gradient: 'from-waw-yellow to-waw-yellow-dark', light: 'bg-waw-yellow/10', iconColor: 'text-waw-yellow-dark', accent: 'border-waw-yellow/30' },
                    { gradient: 'from-emerald-500 to-emerald-600', light: 'bg-emerald-50', iconColor: 'text-emerald-600', accent: 'border-emerald-200' },
                    { gradient: 'from-purple-500 to-purple-600', light: 'bg-purple-50', iconColor: 'text-purple-600', accent: 'border-purple-200' },
                  ];
                  const color = colors[index];
                  return (
                    <motion.div
                      key={adv.title}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`bg-white rounded-3xl shadow-xl border-2 ${color.accent} p-8 lg:p-10`}
                    >
                      <div className="flex flex-col h-full">
                        {/* Top: step indicator + icon */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color.gradient} flex items-center justify-center shadow-lg`}>
                            <adv.icon size={28} className="text-white" />
                          </div>
                          <div>
                            <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">Avantage {adv.step}/4</span>
                            <h3 className="text-xl lg:text-2xl font-bold text-waw-dark">{adv.title}</h3>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed text-base lg:text-lg mb-8">
                          {adv.description}
                        </p>

                        {/* Visual bottom accent */}
                        <div className="mt-auto flex items-center gap-3">
                          <div className={`flex-1 h-1 rounded-full bg-gradient-to-r ${color.gradient} opacity-20`} />
                          <div className="flex gap-1.5">
                            {advantages.map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                  i === activeAdvantage
                                    ? `bg-gradient-to-r ${color.gradient} w-6`
                                    : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                          <div className={`flex-1 h-1 rounded-full bg-gradient-to-r ${color.gradient} opacity-20`} />
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                // Chrome/Firefox: Full animation with AnimatePresence
                <AnimatePresence mode="wait">
                  {advantages.map((adv, index) => {
                    if (index !== activeAdvantage) return null;
                    const colors = [
                      { gradient: 'from-blue-500 to-blue-600', light: 'bg-blue-50', iconColor: 'text-blue-600', accent: 'border-blue-200' },
                      { gradient: 'from-waw-yellow to-waw-yellow-dark', light: 'bg-waw-yellow/10', iconColor: 'text-waw-yellow-dark', accent: 'border-waw-yellow/30' },
                      { gradient: 'from-emerald-500 to-emerald-600', light: 'bg-emerald-50', iconColor: 'text-emerald-600', accent: 'border-emerald-200' },
                      { gradient: 'from-purple-500 to-purple-600', light: 'bg-purple-50', iconColor: 'text-purple-600', accent: 'border-purple-200' },
                    ];
                    const color = colors[index];
                    return (
                      <motion.div
                        key={adv.title}
                        initial={{ opacity: 0, x: 40, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -40, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className={`bg-white rounded-3xl shadow-xl border-2 ${color.accent} p-8 lg:p-10`}
                      >
                        <div className="flex flex-col h-full">
                          {/* Top: step indicator + icon */}
                          <div className="flex items-center gap-4 mb-6">
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color.gradient} flex items-center justify-center shadow-lg`}>
                              <adv.icon size={28} className="text-white" />
                            </div>
                            <div>
                              <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">Avantage {adv.step}/4</span>
                              <h3 className="text-xl lg:text-2xl font-bold text-waw-dark">{adv.title}</h3>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-gray-600 leading-relaxed text-base lg:text-lg mb-8">
                            {adv.description}
                          </p>

                          {/* Visual bottom accent */}
                          <div className="mt-auto flex items-center gap-3">
                            <div className={`flex-1 h-1 rounded-full bg-gradient-to-r ${color.gradient} opacity-20`} />
                            <div className="flex gap-1.5">
                              {advantages.map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    i === activeAdvantage
                                      ? `bg-gradient-to-r ${color.gradient} w-6`
                                      : 'bg-gray-200'
                                  }`}
                                />
                              ))}
                            </div>
                            <div className={`flex-1 h-1 rounded-full bg-gradient-to-r ${color.gradient} opacity-20`} />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Appareils Compatibles - Interactive Checker */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        {/* Subtle bg accents */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-waw-yellow/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-[100px] pointer-events-none" />

        <div className="container-custom relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-waw-yellow/10 border border-waw-yellow/20 rounded-full mb-6">
              <Smartphone size={14} className="text-waw-yellow-dark" />
              <span className="text-sm font-semibold text-waw-dark">Compatibilité</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-display font-bold text-waw-dark mb-6">
              Votre smartphone est-il{' '}
              <span className="bg-gradient-to-r from-waw-yellow to-waw-yellow-dark bg-clip-text text-transparent">compatible eSIM</span> ?
            </h2>

            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
              Vérifiez si votre appareil prend en charge la technologie eSIM avant de commander. La majorité des modèles récents Apple, Samsung, Google Pixel et autres sont compatibles.
            </p>
          </motion.div>

          {/* Layout: Image left + Interactive checker right */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Image with 3D */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <div style={{ perspective: '1000px' }}>
                <motion.div
                  whileHover={{ rotateY: 5, rotateX: -3, scale: 1.02 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="relative rounded-3xl overflow-hidden shadow-2xl"
                >
                  <img
                    src={compatibliteImg}
                    alt="Appareils compatibles eSIM"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-waw-dark/60 via-transparent to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                          <CheckCircle size={20} className="text-emerald-500" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-waw-dark text-sm">Compatible eSIM</h4>
                          <p className="text-xs text-gray-500">iPhone, Samsung, Pixel & plus</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 bg-waw-dark text-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2"
              >
                <Smartphone size={16} className="text-waw-yellow" />
                <span className="text-sm font-bold">50+ modeles</span>
              </motion.div>
            </motion.div>

            {/* Right - Interactive Checker */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-gray-50 rounded-3xl border border-gray-100 p-6 lg:p-8 shadow-sm">
                {/* Step indicator */}
                <div className="flex items-center gap-3 mb-6">
                  {[1, 2, 3].map((step) => {
                    const currentStep = !selectedBrand ? 1 : !selectedModel ? 2 : 3;
                    const isActive = step === currentStep;
                    const isDone = step < currentStep;
                    return (
                      <React.Fragment key={step}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                          isDone ? 'bg-emerald-500 text-white' : isActive ? 'bg-waw-yellow text-waw-dark' : 'bg-gray-200 text-gray-400'
                        }`}>
                          {isDone ? <CheckCircle size={14} /> : step}
                        </div>
                        {step < 3 && (
                          <div className={`flex-1 h-0.5 rounded-full transition-all duration-300 ${
                            isDone ? 'bg-emerald-500' : 'bg-gray-200'
                          }`} />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait">
                  {/* STEP 1: Choose Brand */}
                  {!selectedBrand && (
                    <motion.div
                      key="step-brand"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.35 }}
                    >
                      <h3 className="text-lg font-bold text-waw-dark mb-1">Choisissez votre marque</h3>
                      <p className="text-sm text-gray-400 mb-6">Sélectionnez le fabricant de votre appareil</p>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[
                          { name: 'Apple', icon: '🍎', color: 'hover:border-gray-800 hover:bg-gray-50' },
                          { name: 'Samsung', icon: '📱', color: 'hover:border-blue-500 hover:bg-blue-50/50' },
                          { name: 'Google', icon: '🔵', color: 'hover:border-emerald-500 hover:bg-emerald-50/50' },
                          { name: 'Huawei', icon: '🔴', color: 'hover:border-red-500 hover:bg-red-50/50' },
                          { name: 'Xiaomi', icon: '🟠', color: 'hover:border-orange-500 hover:bg-orange-50/50' },
                          { name: 'Oppo', icon: '🟢', color: 'hover:border-green-500 hover:bg-green-50/50' },
                        ].map((brand) => (
                          <motion.button
                            key={brand.name}
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setSelectedBrand(brand.name)}
                            className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 border-gray-100 bg-white transition-all ${brand.color} shadow-sm hover:shadow-md`}
                          >
                            <span className="text-2xl">{brand.icon}</span>
                            <span className="font-bold text-sm text-waw-dark">{brand.name}</span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Choose Model */}
                  {selectedBrand && !selectedModel && (
                    <motion.div
                      key="step-model"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-bold text-waw-dark">Choisissez votre modèle</h3>
                        <button
                          onClick={() => setSelectedBrand(null)}
                          className="text-sm text-gray-400 hover:text-waw-dark transition-colors"
                        >
                          ← Retour
                        </button>
                      </div>
                      <p className="text-sm text-gray-400 mb-5">Modèles {selectedBrand} compatibles eSIM</p>

                      <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
                        {(() => {
                          const brandModels: Record<string, string[]> = {
                            Apple: [
                              'iPhone 16 / 16 Plus / 16 Pro / 16 Pro Max',
                              'iPhone 15 / 15 Plus / 15 Pro / 15 Pro Max',
                              'iPhone 14 / 14 Plus / 14 Pro / 14 Pro Max',
                              'iPhone 13 / 13 Mini / 13 Pro / 13 Pro Max',
                              'iPhone SE 3 (2022)',
                              'iPhone 12 / 12 Mini / 12 Pro / 12 Pro Max',
                              'iPhone SE 2 (2020)',
                              'iPhone 11 / 11 Pro / 11 Pro Max',
                              'iPhone XR / XS / XS Max',
                              'iPad Air (3e - 6e gen)',
                              'iPad Pro 11" (1re - 4e gen)',
                              'iPad (7e - 10e gen)',
                              'iPad Mini (5e, 6e gen)',
                            ],
                            Samsung: [
                              'Galaxy S25 / S25+ / S25 Ultra',
                              'Galaxy S24 / S24+ / S24 Ultra / S24 FE',
                              'Galaxy S23 / S23+ / S23 Ultra / S23 FE',
                              'Galaxy S22 / S22+ / S22 Ultra',
                              'Galaxy S21 / S21+ 5G / S21 Ultra 5G',
                              'Galaxy S20 / S20+ / S20+ 5G / S20 Ultra',
                              'Galaxy Note 20 / Note 20 Ultra 5G',
                              'Galaxy Z Fold 5 / Z Fold 4 / Z Fold 3 / Fold',
                              'Galaxy Z Flip 5 / Z Flip 4 / Z Flip 3 / Z Flip',
                            ],
                            Google: [
                              'Pixel 9 / 9 Pro / 9 Pro XL',
                              'Pixel 8 / 8a / 8 Pro',
                              'Pixel 7 / 7a / 7 Pro',
                              'Pixel 6 / 6 Pro',
                              'Pixel 5 / 5a',
                              'Pixel 4 / 4a / 4 XL',
                              'Pixel 3 / 3 XL / 3a / 3a XL',
                              'Pixel Fold',
                            ],
                            Huawei: [
                              'P40 / P40 Pro',
                              'Mate 40 Pro',
                              'P50 Pro',
                              'Mate Xs 2',
                            ],
                            Xiaomi: [
                              'Xiaomi 12T Pro',
                              'Xiaomi 13 / 13 Pro / 13 Lite',
                              'Xiaomi 14 / 14 Pro',
                              'Redmi Note 13 Pro+ 5G',
                            ],
                            Oppo: [
                              'Find X3 Pro',
                              'Find X5 / X5 Pro',
                              'Find N2 Flip',
                              'Reno 8 Pro 5G',
                            ],
                          };
                          return (brandModels[selectedBrand] || []).map((model, index) => (
                            <motion.button
                              key={model}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.04, duration: 0.3 }}
                              whileHover={{ x: 6 }}
                              onClick={() => setSelectedModel(model)}
                              className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:border-waw-yellow/40 hover:bg-waw-yellow/5 hover:shadow-md transition-all text-left group"
                            >
                              <div className="w-9 h-9 rounded-lg bg-gray-100 group-hover:bg-waw-yellow/10 flex items-center justify-center flex-shrink-0 transition-colors">
                                <Smartphone size={16} className="text-gray-400 group-hover:text-waw-yellow-dark transition-colors" />
                              </div>
                              <span className="text-sm font-medium text-gray-700 group-hover:text-waw-dark transition-colors flex-1">{model}</span>
                              <ArrowRight size={14} className="text-gray-300 group-hover:text-waw-yellow group-hover:translate-x-1 transition-all flex-shrink-0" />
                            </motion.button>
                          ));
                        })()}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Result */}
                  {selectedBrand && selectedModel && (
                    <motion.div
                      key="step-result"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className="text-center py-4"
                    >
                      {/* Success animation */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                        className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6"
                      >
                        <motion.div
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                        >
                          <CheckCircle size={40} className="text-emerald-500" />
                        </motion.div>
                      </motion.div>

                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="text-xl font-bold text-waw-dark mb-2"
                      >
                        Compatible eSIM !
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="text-sm text-gray-500 mb-6"
                      >
                        Votre <span className="font-bold text-waw-dark">{selectedBrand} {selectedModel}</span> supporte la technologie eSIM
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                        className="bg-emerald-50 rounded-2xl p-4 mb-6 border border-emerald-100"
                      >
                        <div className="flex items-center justify-center gap-3">
                          <CheckCircle size={18} className="text-emerald-500" />
                          <span className="text-sm font-semibold text-emerald-700">Appareil compatible - Prêt pour l'activation</span>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55 }}
                        className="flex flex-col sm:flex-row gap-3"
                      >
                        <motion.button
                          whileHover={{ scale: 1.03, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => onNavigate('contact')}
                          className="flex-1 bg-waw-yellow text-waw-dark font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-waw-yellow/20 hover:bg-waw-yellow-dark transition-colors"
                        >
                          <Phone size={16} />
                          <span>Commander mon eSIM</span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.03, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            setSelectedBrand(null);
                            setSelectedModel(null);
                          }}
                          className="px-6 py-3.5 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-500 hover:border-gray-300 hover:text-waw-dark transition-all"
                        >
                          Vérifier un autre
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2 - Destinations eSIM - Premium */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-waw-yellow/3 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-[100px] pointer-events-none" />

        <div className="container-custom relative z-10">
          {/* Header */}
          <motion.div
            ref={section2Ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-waw-yellow/10 border border-waw-yellow/20 rounded-full mb-6">
              <Globe size={14} className="text-waw-yellow-dark" />
              <span className="text-sm font-semibold text-waw-dark">Destinations eSIM</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-display font-bold text-waw-dark mb-6">
              Choisissez votre{' '}
              <span className="bg-gradient-to-r from-waw-yellow to-waw-yellow-dark bg-clip-text text-transparent">destination</span>
            </h2>

            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
              Plus de 200 pays et territoires couverts. Sélectionnez votre destination
              et découvrez nos plans eSIM adaptés à vos besoins de voyage.
            </p>
          </motion.div>

          {/* Search bar + Continent filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto mb-12 space-y-5"
          >
            {/* Search */}
            <div className="relative">
              <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={destSearch}
                onChange={(e) => setDestSearch(e.target.value)}
                placeholder="Rechercher un pays..."
                className="w-full pl-13 pr-5 py-4 rounded-2xl bg-white border border-gray-200 shadow-sm text-sm text-waw-dark placeholder:text-gray-400 focus:outline-none focus:border-waw-yellow focus:ring-2 focus:ring-waw-yellow/10 transition-all"
                style={{ paddingLeft: '3rem' }}
              />
              {destSearch && (
                <button
                  onClick={() => setDestSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                >
                  Effacer
                </button>
              )}
            </div>

            {/* Continent tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {continents.map((c) => (
                <motion.button
                  key={c}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveContinent(c)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                    activeContinent === c
                      ? 'bg-waw-dark text-white shadow-lg'
                      : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300 hover:text-waw-dark'
                  }`}
                >
                  {c}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Loading state */}
          {loadingPackages && (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-waw-yellow mb-4"></div>
              <p className="text-gray-600">Chargement des destinations...</p>
            </div>
          )}

          {/* Error state */}
          {errorPackages && !loadingPackages && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 max-w-2xl mx-auto">
              ⚠️ {errorPackages}
            </div>
          )}

          {/* Destinations Grid */}
          {!loadingPackages && !errorPackages && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-6xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filteredDestinations.map((country, index) => {
                const flagUrl = country.drapeau;
                const countryName = country.nom;
                const continent = country.continent;

                return (
                  <motion.div
                    key={`${country.code}-${country.id}`}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    className="group relative"
                  >
                    <div
                      className="relative bg-white rounded-2xl border border-gray-100 p-5 hover:border-waw-yellow/40 hover:shadow-xl transition-all cursor-pointer overflow-hidden"
                      style={{ perspective: '800px' }}
                    >
                      {/* Badge disponible */}
                      <div className="absolute top-3 right-3 z-10">
                        <span className="bg-waw-yellow text-waw-dark px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                          <Star size={10} />
                          Disponible
                        </span>
                      </div>

                      {/* Top: flag + country */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all">
                          <img
                            src={flagUrl}
                            alt={countryName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://flagcdn.com/w320/ww.png';
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-waw-dark text-[15px] truncate">{countryName}</h3>
                          <p className="text-xs text-gray-400">{continent}</p>
                        </div>
                      </div>

                      {/* Info row - Packages disponibles */}
                      <div className="bg-gray-50 rounded-xl p-3 mb-4 text-center group-hover:bg-waw-yellow/5 transition-colors">
                        <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">Packages disponibles</p>
                        {country.packages && country.packages.length > 0 ? (
                          <>
                            <p className="text-sm font-bold text-waw-dark">
                              {country.packages.length} {country.packages.length === 1 ? 'offre' : 'offres'}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              À partir de {Math.min(...country.packages.map((p: any) => p.price || 0)).toLocaleString('fr-FR')} FCFA
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-sm font-bold text-gray-400">Bientôt disponible</p>
                            <p className="text-xs text-gray-400 mt-0.5">-</p>
                          </>
                        )}
                      </div>

                      {/* CTA - Voir les packages */}
                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onNavigateWithPlan?.('plan-details', country.code)}
                        disabled={!country.packages || country.packages.length === 0}
                        className={`w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm ${
                          country.packages && country.packages.length > 0
                            ? 'bg-waw-dark text-white group-hover:bg-waw-yellow group-hover:text-waw-dark'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <Plane size={14} />
                        <span>Voir les packages</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </motion.button>

                      {/* Hover accent line */}
                      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-waw-yellow to-waw-yellow-dark scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Empty state si pas de résultats */}
            {filteredDestinations.length === 0 && (
              <div className="col-span-full text-center py-16">
                <p className="text-gray-500 text-lg">Aucune destination trouvée pour cette recherche</p>
              </div>
            )}
            </div>
          )}

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-14"
          >
            <p className="text-sm text-gray-400 mb-5">Vous ne trouvez pas votre destination ?</p>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate('contact')}
              className="bg-waw-dark text-white font-bold px-8 py-4 rounded-2xl text-sm flex items-center justify-center gap-2 mx-auto shadow-lg hover:shadow-xl transition-all group"
            >
              <Globe size={18} className="text-waw-yellow" />
              <span>Voir toutes les destinations (200+)</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Section 3 - Comment ça marche - Interactive Steps with Installation Images */}
      <section className="py-24 bg-gradient-to-b from-white via-gray-50/80 to-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-waw-yellow/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-waw-yellow/3 rounded-full blur-[100px]" />
        </div>

        <div className="container-custom relative z-10">
          {/* Section Header */}
          <motion.div
            ref={section3Ref}
            initial={{ opacity: 0, y: 30 }}
            animate={section3InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={section3InView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-waw-yellow/10 border border-waw-yellow/20 rounded-full mb-6"
            >
              <div className="w-2 h-2 bg-waw-yellow rounded-full animate-pulse" />
              <span className="text-waw-dark font-medium text-sm tracking-wide">Processus Simple</span>
            </motion.span>

            <h2 className="text-4xl lg:text-5xl font-display font-bold text-waw-dark mb-5">
              Comment ça{' '}
              <span className="bg-gradient-to-r from-waw-yellow to-waw-yellow-dark bg-clip-text text-transparent">
                marche
              </span>
              &nbsp;?
            </h2>

            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
              Notre processus d'achat eSIM est optimisé dans tout le monde.
              Payez facilement avec Wave ou Orange Money et connectez-vous instantanément.
            </p>
          </motion.div>

          {/* Interactive Steps + Image Display */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Step Selector */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={section3InView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-3"
            >
              {howItWorks.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = activeStep === index;
                return (
                  <motion.button
                    key={step.step}
                    onClick={() => setActiveStep(index)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={section3InView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ x: 4 }}
                    className={`w-full flex items-start gap-4 p-5 rounded-2xl text-left transition-all duration-300 border-2 ${
                      isActive
                        ? 'bg-white shadow-lg shadow-waw-yellow/10 border-waw-yellow/40'
                        : 'bg-white/60 border-transparent hover:bg-white hover:shadow-md'
                    }`}
                  >
                    {/* Step number + connector line */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-br from-waw-yellow to-waw-yellow-dark shadow-md shadow-waw-yellow/30'
                          : 'bg-gray-100'
                      }`}>
                        <StepIcon size={20} className={isActive ? 'text-waw-dark' : 'text-gray-400'} />
                      </div>
                      {index < howItWorks.length - 1 && (
                        <div className={`w-0.5 h-6 mt-2 transition-colors duration-300 ${
                          index < activeStep ? 'bg-waw-yellow' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>

                    {/* Step content */}
                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-waw-yellow/20 text-waw-dark'
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          Étape {step.step}
                        </span>
                        {index < activeStep && (
                          <CheckCircle size={14} className="text-green-500" />
                        )}
                      </div>
                      <h3 className={`font-semibold text-base mb-1 transition-colors duration-300 ${
                        isActive ? 'text-waw-dark' : 'text-gray-600'
                      }`}>
                        {step.title}
                      </h3>
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-gray-500 text-sm leading-relaxed"
                          >
                            {step.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.button>
                );
              })}

              {/* Progress bar */}
              <div className="pt-4 px-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400 font-medium">Progression</span>
                  <span className="text-xs font-bold text-waw-dark">{activeStep + 1}/{howItWorks.length}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-waw-yellow to-waw-yellow-dark rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((activeStep + 1) / howItWorks.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Right - Phone Mockup with Installation Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={section3InView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="relative flex items-center justify-center"
            >
              {/* Phone frame */}
              <div className="relative" style={{ perspective: '1000px' }}>
                <motion.div
                  className="relative w-[280px] sm:w-[300px] mx-auto"
                  animate={{ rotateY: activeStep % 2 === 0 ? 2 : -2 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Phone shell */}
                  <div className="relative bg-waw-dark rounded-[2.5rem] p-3 shadow-2xl shadow-black/30">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-waw-dark rounded-b-2xl z-20" />

                    {/* Screen */}
                    <div className="relative bg-white rounded-[2rem] overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeStep}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.05 }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                        >
                          <img
                            src={howItWorks[activeStep].img}
                            alt={howItWorks[activeStep].title}
                            className="w-full aspect-[9/16] object-cover object-top"
                          />
                        </motion.div>
                      </AnimatePresence>

                      {/* Step overlay label */}
                      <motion.div
                        key={`label-${activeStep}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-waw-yellow to-waw-yellow-dark rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-waw-dark font-bold text-xs">{howItWorks[activeStep].step}</span>
                          </div>
                          <span className="text-sm font-semibold text-waw-dark leading-tight">
                            {howItWorks[activeStep].title}
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Floating badges */}
                  <motion.div
                    animate={{ x: [0, 8, 0], y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-4 -right-8 bg-white rounded-xl shadow-lg p-3 z-10"
                  >
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-waw-yellow" />
                      <span className="text-xs font-semibold text-gray-700">Instantané</span>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ x: [0, -6, 0], y: [0, 6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                    className="absolute -bottom-4 -left-8 bg-white rounded-xl shadow-lg p-3 z-10"
                  >
                    <div className="flex items-center gap-1.5">
                      <Shield size={14} className="text-green-500" />
                      <span className="text-xs font-semibold text-gray-700">100% Sécurisé</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Decorative glow behind phone */}
                <div className="absolute inset-0 -z-10 flex items-center justify-center">
                  <div className="w-[250px] h-[250px] bg-waw-yellow/15 rounded-full blur-[80px]" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom navigation dots */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={section3InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex items-center justify-center gap-2 mt-12"
          >
            {howItWorks.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`transition-all duration-300 rounded-full ${
                  activeStep === index
                    ? 'w-8 h-2.5 bg-gradient-to-r from-waw-yellow to-waw-yellow-dark'
                    : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </motion.div>
        </div>
      </section>



      {/* Section Témoignages clients - Premium Carousel */}
      {(() => {
        const testimonials = [
          {
            name: 'Fatou Ndiaye',
            country: 'Sénégal',
            flag: '/flags/sn.svg',
            stars: 5,
            text: 'Service rapide, activation instantanée et support très réactif. Je recommande à tous les voyageurs africains !',
            destination: 'Paris, France'
          },
          {
            name: 'Yao Kouassi',
            country: 'Côte d\u2019Ivoire',
            flag: '/flags/ci.svg',
            stars: 5,
            text: 'Activation facile, connexion stable à Abidjan comme à Dakar. Merci WAW eSIM !',
            destination: 'Dakar, Sénégal'
          },
          {
            name: 'Aminata Traoré',
            country: 'Mali',
            flag: '/flags/ml.svg',
            stars: 4,
            text: 'Très pratique pour voyager sans changer de SIM. Support WhatsApp efficace.',
            destination: 'Istanbul, Turquie'
          },
          {
            name: 'Mohamed Camara',
            country: 'Guinée',
            flag: '/flags/gn.svg',
            stars: 5,
            text: 'J\u2019ai utilisé WAW eSIM au Maroc et en France, tout a fonctionné parfaitement.',
            destination: 'Casablanca, Maroc'
          },
          {
            name: 'Awa Diop',
            country: 'Sénégal',
            flag: '/flags/sn.svg',
            stars: 5,
            text: 'Installation simple, internet rapide, je recommande à mes amis !',
            destination: 'Dubaï, EAU'
          },
          {
            name: 'Koffi Mensah',
            country: 'Togo',
            flag: '/flags/tg.svg',
            stars: 4,
            text: 'Bon rapport qualité/prix pour les voyageurs africains.',
            destination: 'New York, USA'
          }
        ];

        const [activeTestimonial, setActiveTestimonial] = useState(0);
        const [testimPaused, setTestimPaused] = useState(false);

        React.useEffect(() => {
          if (testimPaused) return;
          const interval = setInterval(() => {
            setActiveTestimonial(prev => (prev + 1) % testimonials.length);
          }, 5000);
          return () => clearInterval(interval);
        }, [testimPaused, testimonials.length]);

        const [testimRef, testimInView] = useInView({ triggerOnce: true, threshold: 0.15 });

        return (
          <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-20 left-10 w-[300px] h-[300px] bg-waw-yellow/5 rounded-full blur-[100px]" />
              <div className="absolute bottom-20 right-10 w-[250px] h-[250px] bg-waw-yellow/3 rounded-full blur-[80px]" />
            </div>

            <div className="container-custom relative z-10">
              {/* Header */}
              <motion.div
                ref={testimRef}
                initial={{ opacity: 0, y: 30 }}
                animate={testimInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.7 }}
                className="text-center mb-16"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={testimInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-waw-yellow/10 border border-waw-yellow/20 rounded-full mb-6"
                >
                  <div className="w-2 h-2 bg-waw-yellow rounded-full animate-pulse" />
                  <span className="text-waw-dark font-medium text-sm tracking-wide">Avis Clients</span>
                </motion.span>

                <h2 className="text-4xl lg:text-5xl font-display font-bold text-waw-dark mb-5">
                  Ils ont choisi{' '}
                  <span className="bg-gradient-to-r from-waw-yellow to-waw-yellow-dark bg-clip-text text-transparent">
                    WAW eSIM
                  </span>
                </h2>

                <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
                  Découvrez les avis de nos clients africains satisfaits !
                </p>
              </motion.div>

              {/* Main testimonial display */}
              <div className="max-w-4xl mx-auto">
                {/* Featured testimonial card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={testimInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="relative mb-10"
                  onMouseEnter={() => setTestimPaused(true)}
                  onMouseLeave={() => setTestimPaused(false)}
                >
                  <div className="relative bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                    {/* Accent top bar */}
                    <div className="h-1 bg-gradient-to-r from-waw-yellow via-waw-yellow-dark to-waw-yellow" />

                    <div className="p-8 sm:p-10 lg:p-12">
                      {isSafari ? (
                        // Safari: Pure CSS fade animation - NO Framer Motion
                        <div
                          key={`testimonial-safari-${activeTestimonial}`}
                          className="safari-animate-image-fade"
                        >
                          {/* Quote icon */}
                          <div className="mb-6">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-waw-yellow/30">
                              <path d="M18 20H10C10 15.6 13.6 12 18 12V8C11.4 8 6 13.4 6 20V32H18V20ZM38 20H30C30 15.6 33.6 12 38 12V8C31.4 8 26 13.4 26 20V32H38V20Z" fill="currentColor"/>
                            </svg>
                          </div>

                          {/* Testimonial text */}
                          <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed font-light mb-8">
                            {testimonials[activeTestimonial].text}
                          </p>

                          {/* Author info */}
                          <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4">
                              {/* Avatar with flag */}
                              <div className="relative">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-waw-yellow/20 to-waw-yellow/5 flex items-center justify-center text-xl font-bold text-waw-dark">
                                  {testimonials[activeTestimonial].name.charAt(0)}
                                </div>
                                <img
                                  src={testimonials[activeTestimonial].flag}
                                  alt=""
                                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white shadow-sm"
                                />
                              </div>

                              <div>
                                <p className="font-bold text-waw-dark text-base">
                                  {testimonials[activeTestimonial].name}
                                </p>
                                <p className="text-sm text-gray-400">
                                  {testimonials[activeTestimonial].country}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-col items-end gap-1">
                              <div className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }).map((_, idx) => (
                                  <Star
                                    key={idx}
                                    size={16}
                                    className={idx < testimonials[activeTestimonial].stars ? 'text-waw-yellow fill-waw-yellow' : 'text-gray-200'}
                                  />
                                ))}
                              </div>
                              <div className="flex items-center gap-1 text-xs text-gray-400">
                                <Plane size={10} />
                                <span>{testimonials[activeTestimonial].destination}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        // Chrome/Firefox: Full animation with AnimatePresence
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeTestimonial}
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                          >
                            {/* Quote icon */}
                            <div className="mb-6">
                              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-waw-yellow/30">
                                <path d="M18 20H10C10 15.6 13.6 12 18 12V8C11.4 8 6 13.4 6 20V32H18V20ZM38 20H30C30 15.6 33.6 12 38 12V8C31.4 8 26 13.4 26 20V32H38V20Z" fill="currentColor"/>
                              </svg>
                            </div>

                            {/* Testimonial text */}
                            <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed font-light mb-8">
                              {testimonials[activeTestimonial].text}
                            </p>

                            {/* Author info */}
                            <div className="flex items-center justify-between flex-wrap gap-4">
                              <div className="flex items-center gap-4">
                                {/* Avatar with flag */}
                                <div className="relative">
                                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-waw-yellow/20 to-waw-yellow/5 flex items-center justify-center text-xl font-bold text-waw-dark">
                                    {testimonials[activeTestimonial].name.charAt(0)}
                                  </div>
                                  <img
                                    src={testimonials[activeTestimonial].flag}
                                    alt=""
                                    className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white shadow-sm"
                                  />
                                </div>

                                <div>
                                  <p className="font-bold text-waw-dark text-base">
                                    {testimonials[activeTestimonial].name}
                                  </p>
                                  <p className="text-sm text-gray-400">
                                    {testimonials[activeTestimonial].country}
                                  </p>
                                </div>
                              </div>

                              <div className="flex flex-col items-end gap-1">
                                <div className="flex items-center gap-0.5">
                                  {Array.from({ length: 5 }).map((_, idx) => (
                                    <Star
                                      key={idx}
                                      size={16}
                                      className={idx < testimonials[activeTestimonial].stars ? 'text-waw-yellow fill-waw-yellow' : 'text-gray-200'}
                                    />
                                  ))}
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-400">
                                  <Plane size={10} />
                                  <span>{testimonials[activeTestimonial].destination}</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Thumbnail selector */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={testimInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="flex items-center justify-center gap-3 flex-wrap"
                >
                  {testimonials.map((t, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        setActiveTestimonial(index);
                        setTestimPaused(true);
                        setTimeout(() => setTestimPaused(false), 8000);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                        activeTestimonial === index
                          ? 'bg-white shadow-lg shadow-gray-200/50 border-2 border-waw-yellow/40'
                          : 'bg-white/60 border-2 border-transparent hover:bg-white hover:shadow-md'
                      }`}
                    >
                      <div className={`relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                        activeTestimonial === index
                          ? 'bg-gradient-to-br from-waw-yellow to-waw-yellow-dark text-waw-dark'
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {t.name.charAt(0)}
                      </div>
                      <div className="text-left hidden sm:block">
                        <p className={`text-xs font-semibold transition-colors duration-300 ${
                          activeTestimonial === index ? 'text-waw-dark' : 'text-gray-500'
                        }`}>
                          {t.name.split(' ')[0]}
                        </p>
                        <p className="text-[10px] text-gray-400">{t.country}</p>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>

                {/* Progress dots for mobile */}
                <div className="flex items-center justify-center gap-2 mt-6 sm:hidden">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`transition-all duration-300 rounded-full ${
                        activeTestimonial === index
                          ? 'w-8 h-2 bg-gradient-to-r from-waw-yellow to-waw-yellow-dark'
                          : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>

              </div>
            </div>
          </section>
        );
      })()}
     
    {/* Bouton flottant WhatsApp Achat (gauche) */}
    <a
      href="https://wa.me/221763644946"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 left-8 z-50 flex items-center gap-3 px-5 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-lg transition-all text-base group"
      style={{ boxShadow: '0 4px 24px 0 rgba(39, 174, 96, 0.25)' }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="16" fill="#25D366"/><path fill="#fff" d="M16 7.5A8.5 8.5 0 0 0 7.5 16c0 1.5.4 2.9 1.1 4.1l-1.2 4.4 4.5-1.2A8.5 8.5 0 1 0 16 7.5Zm4.8 12.1c-.2.6-1.1 1.1-1.5 1.2-.4.1-.9.2-1.5-.1-.3-.1-.7-.2-1.5-.5-2.6-1.1-4.3-3.7-4.4-3.9-.1-.2-1-1.3-1-2.5 0-1.1.6-1.6.8-1.8.2-.2.4-.2.6-.2.1 0 .3 0 .4.3.2.3.5 1 .6 1.1.1.1.1.2 0 .4-.1.2-.2.3-.3.5-.1.1-.2.2-.1.4.2.4.7 1.2 1.5 1.7.7.4 1.1.6 1.3.5.2-.1.3-.2.4-.4.1-.2.2-.2.4-.2.1 0 .2 0 .3 0 .1 0 .2 0 .3.2.1.2.4.9.5 1.2.1.3.2.3.1.5Z"/></svg>
      Acheter votre eSIM avec WhatsApp
    </a>
    </div>
  );
};

export default ESimPage;
