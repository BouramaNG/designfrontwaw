// Guide step images

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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
  Building,
  MapPin,
  CreditCard,
  Download,
  Settings,
  Star
} from 'lucide-react';
import { CompatibleDevicesModal } from '../components/CompatibleDevicesModal';
import React from 'react';
import { useState } from 'react';
import type { PageType } from '../App';

interface ESimPageProps {
  onNavigate: (page: PageType) => void;
  onNavigateWithPlan?: (page: PageType, planId?: string) => void;
}

const ESimPage = ({ onNavigate, onNavigateWithPlan }: ESimPageProps) => {
  // State for Compatible Devices Modal
  const [modalOpen, setModalOpen] = useState(false);
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

  const [section5Ref, section5InView] = useInView({
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

  // Destinations populaires avec drapeaux
  const destinations = [
    {
      country: 'France',
      flag: '/flags/fr.svg',
      price: '600 FCFA',
      duration: '30 jours',
      popular: true
    },
    {
      country: 'États-Unis',
      flag: '/flags/us.svg',
      price: '800 FCFA',
      duration: '30 jours',
      popular: true
    },
    {
      country: 'Royaume-Uni',
      flag: '/flags/gb.svg',
      price: '700 FCFA',
      duration: '30 jours',
      popular: true
    },
    {
      country: 'Allemagne',
      flag: '/flags/de.svg',
      price: '650 FCFA',
      duration: '30 jours',
      popular: true
    },
    {
      country: 'Espagne',
      flag: '/flags/es.svg',
      price: '650 FCFA',
      duration: '30 jours',
      popular: true
    },
    {
      country: 'Italie',
      flag: '/flags/it.svg',
      price: '650 FCFA',
      duration: '30 jours',
      popular: true
    },
    {
      country: 'Japon',
      flag: '/flags/jp.svg',
      price: '1000 FCFA',
      duration: '30 jours',
      popular: true
    },
    {
      country: 'Canada',
      flag: '/flags/ca.svg',
      price: '800 FCFA',
      duration: '30 jours',
      popular: true
    },
    {
      country: 'Australie',
      flag: '/flags/au.svg',
      price: '1200 FCFA',
      duration: '30 jours',
      popular: true
    },
    {
      country: 'Brésil',
      flag: '/flags/br.svg',
      price: '900 FCFA',
      duration: '30 jours',
      popular: false
    },
    {
      country: 'Turquie',
      flag: '/flags/tr.svg',
      price: '750 FCFA',
      duration: '30 jours',
      popular: false
    },
    {
      country: 'Maroc',
      flag: '/flags/ma.svg',
      price: '850 FCFA',
      duration: '30 jours',
      popular: false
    }
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Vérifiez la compatibilité de votre appareil',
      description: 'Assurez-vous que votre smartphone ou tablette prend en charge la technologie eSIM.',
      icon: Smartphone
    },
    {
      step: '2',
      title: 'Commandez votre eSIM en ligne',
      description: 'Sélectionnez votre forfait et finalisez votre achat en quelques clics sur notre plateforme sécurisée.',
      icon: CreditCard
    },
    {
      step: '3',
      title: 'Recevez le QR code par e-mail',
      description: 'Votre eSIM vous est envoyée instantanément par e-mail, prête à être activée.',
      icon: Mail
    },
    {
      step: '4',
      title: 'Scannez et activez votre forfait',
      description: 'Scannez le QR code avec votre appareil et profitez immédiatement de votre connexion.',
      icon: Download
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-waw-dark via-gray-900 to-black text-white pt-32">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
            className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-waw-yellow/10 to-waw-yellow-dark/10 rounded-full blur-3xl"
          />

          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 30,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
            className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-waw-yellow/5 to-white/5 rounded-full blur-3xl"
          />

          {/* Floating Tech Icons */}
          {[
            { icon: Smartphone, position: 'top-40 left-20', delay: 0 },
            { icon: Globe, position: 'top-60 right-40', delay: 1 },
            { icon: Wifi, position: 'bottom-60 left-40', delay: 2 },
            { icon: Shield, position: 'bottom-40 right-20', delay: 0.5 },
          ].map((item, index) => (
            <motion.div
              key={`floating-${index}`}
              className={`absolute ${item.position} hidden lg:block`}
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4 + item.delay,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeInOut',
                delay: item.delay,
              }}
            >
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg flex items-center justify-center">
                <item.icon size={24} className="text-waw-yellow" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            ref={heroRef}
            variants={containerVariants}
            initial="hidden"
            animate={heroInView ? 'visible' : 'hidden'}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Text Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="inline-block px-6 py-3 bg-waw-yellow/20 text-waw-yellow rounded-full text-lg font-semibold"
              >
                📱 eSIM Travel & Business
              </motion.span>

              <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight">
              Votre eSIM  dès {' '}
                <span className="bg-gradient-to-r from-waw-yellow to-waw-yellow-dark bg-clip-text text-transparent">
                1 000 FCFA
                </span>{' '}
                internationale
              </h1>

              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
              Profitez d'une connectivité mobile instantanée, sans carte SIM physique, et restez connecté où que vous soyez dans le monde.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 pt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-waw-yellow text-waw-dark font-bold px-8 py-4 rounded-lg text-lg hover:bg-waw-yellow-dark transition-colors flex items-center justify-center space-x-2 group"
                >
                  <span>Découvrir nos forfaits | Activer une eSIM</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>

                {/* <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('contact')}
                  className="border-2 border-waw-yellow text-waw-yellow font-bold px-8 py-4 rounded-lg text-lg hover:bg-waw-yellow hover:text-waw-dark transition-colors flex items-center justify-center space-x-2"
                >
                  <Building size={20} />
                  <span>Solutions Business</span>
                </motion.button> */}
              </div>
            </motion.div>

            {/* Real Image Content */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative">
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                  }}
                  className="relative z-10 mx-auto"
                >
                  <div className="relative bg-gradient-to-br from-waw-yellow to-waw-yellow-dark rounded-3xl p-8 shadow-2xl">
                    <img
                      src="https://ugc.same-assets.com/mmwqyPhZZfN6huiaLIBut1TOcH7iK4uX.jpeg"
                      alt="Technologie eSIM et smartphone pour connectivité mondiale"
                      className="w-full h-96 object-cover rounded-2xl shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-waw-dark/20 to-transparent rounded-2xl" />

                    {/* Overlay Info */}
                    <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-sm rounded-xl p-4">
                      <h4 className="font-bold text-lg text-gray-800 mb-2">eSIM WAW TELECOM</h4>
                      <p className="text-sm text-gray-600 mb-3">Connectivité mondiale instantanée</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-waw-yellow rounded-full animate-pulse" />
                          <span className="text-xs text-gray-600">Réseau actif</span>
                        </div>
                        <div className="text-xs text-gray-600">Mondial</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Feature Badges */}
                <motion.div
                  animate={{
                    x: [0, 20, 0],
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                  }}
                  className="absolute -top-10 -left-10 bg-white rounded-xl shadow-lg p-4"
                >
                  <div className="flex items-center space-x-2">
                    <Zap size={16} className="text-waw-yellow-dark" />
                    <span className="text-sm font-medium text-gray-700">Activation 24h</span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    x: [0, -15, 0],
                    y: [0, 15, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                    delay: 1,
                  }}
                  className="absolute -bottom-10 -right-10 bg-white rounded-xl shadow-lg p-4"
                >
                  <div className="flex items-center space-x-2">
                    <Globe size={16} className="text-waw-yellow" />
                    <span className="text-sm font-medium text-gray-700">Couverture Mondiale</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <div className="w-12 h-12 bg-waw-yellow rounded-lg flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={24} className="text-waw-dark" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
                <p className="text-gray-300 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-waw-yellow rounded-full flex justify-center">
            <div className="w-1 h-3 bg-waw-yellow rounded-full mt-2 animate-pulse" />
          </div>
        </motion.div>
      </section>

  {/* Section 1 - Avantages eSIM */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
            className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-waw-yellow/20 to-waw-yellow-dark/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            ref={section1Ref}
            variants={containerVariants}
            initial="hidden"
            animate={section1InView ? 'visible' : 'hidden'}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={section1InView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              className="inline-block px-4 py-2 bg-waw-yellow/10 text-waw-yellow-dark rounded-full text-sm font-semibold mb-4"
            >
              ⚡ Avantages eSIM
            </motion.span>

            <h2 className="text-4xl lg:text-5xl font-display font-bold text-waw-dark mb-6">
              Pourquoi choisir l'
              <span className="gradient-text">eSIM WAW Travel</span> ?
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Découvrez tous les avantages de notre technologie eSIM avancée,
              conçue pour les voyageurs modernes et les entreprises connectées.
            </p>
          </motion.div>

          {/* Advantages Steps - Modern Timeline Style */}
          <div className="flex flex-col md:flex-row md:justify-center gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 30 }}
                animate={section1InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.5 + index * 0.15 }}
                whileHover={{ scale: 1.07, y: -8 }}
                className="relative bg-white rounded-3xl p-8 shadow-xl border-2 border-waw-yellow/20 hover:border-waw-yellow transition-all flex-1 flex flex-col items-center text-center min-w-[220px] max-w-xs mx-auto"
              >
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-waw-yellow to-waw-yellow-dark rounded-full flex items-center justify-center shadow-lg border-4 border-white z-10">
                  <span className="text-2xl font-extrabold text-waw-dark drop-shadow-lg">{advantage.step}</span>
                </div>
                <div className="w-14 h-14 mt-8 mb-4 bg-gradient-to-br from-waw-yellow/30 to-waw-yellow-dark/30 rounded-xl flex items-center justify-center">
                  <advantage.icon size={28} className="text-waw-yellow-dark" />
                </div>
                <h3 className="text-lg font-bold text-waw-dark mb-2 tracking-tight">{advantage.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Appareils Compatibles - Premium UX */}
      <section className="section-padding bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-12"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              className="inline-block px-4 py-2 bg-waw-yellow/10 text-waw-yellow-dark rounded-full text-sm font-semibold mb-4"
            >
              📱 Appareils compatibles
            </motion.span>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-waw-dark mb-6">
              Votre smartphone est-il <span className="gradient-text">compatible eSIM</span> ?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Vérifiez si votre appareil prend en charge la technologie eSIM avant de commander. La majorité des modèles récents Apple, Samsung, Google Pixel et autres sont compatibles.
            </p>
          </motion.div>
          <div className="flex flex-col items-center justify-center gap-6">
            <button
              onClick={() => setModalOpen(true)}
              className="relative px-8 py-4 bg-gradient-to-r from-waw-yellow to-waw-yellow-dark text-waw-dark font-bold rounded-xl text-lg shadow-lg flex items-center gap-3 hover:scale-105 transition-transform border-2 border-waw-yellow/40"
            >
              <Smartphone size={28} className="text-waw-yellow-dark animate-bounce" />
              <span>Voir la liste des appareils compatibles</span>
              <span className="ml-2 text-2xl">🔍</span>
            </button>
            <span className="text-gray-500 text-sm">Apple 🍏, Samsung 🤖, Google Pixel, Huawei, Oppo, Xiaomi, et plus</span>
          </div>
          {/* Modal */}
          <CompatibleDevicesModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
      </section>

      {/* Section 2 - Destinations eSIM */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
            className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-waw-yellow/20 to-waw-yellow-dark/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            ref={section2Ref}
            variants={containerVariants}
            initial="hidden"
            animate={section2InView ? 'visible' : 'hidden'}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={section2InView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              className="inline-block px-4 py-2 bg-waw-yellow/20 text-waw-dark rounded-full text-sm font-semibold mb-4"
            >
              🌍 Destinations eSIM
            </motion.span>

            <h2 className="text-4xl lg:text-5xl font-display font-bold text-waw-dark mb-6">
              Choisissez votre{' '}
              <span className="gradient-text">destination</span>
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Plus de 200 pays et territoires couverts. Sélectionnez votre destination
              et découvrez nos plans eSIM adaptés à vos besoins de voyage.
            </p>
          </motion.div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.country}
                initial={{ opacity: 0, y: 20 }}
                animate={section2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`relative bg-white rounded-xl p-6 shadow-lg border-2 transition-all cursor-pointer ${
                  destination.popular
                    ? 'border-waw-yellow shadow-waw-yellow/20'
                    : 'border-gray-200 hover:border-waw-yellow/50'
                }`}
              >
                {destination.popular && (
                  <div className="absolute -top-3 -right-3">
                    <span className="bg-waw-yellow text-waw-dark px-3 py-1 rounded-full text-xs font-bold flex items-center">
                      <Star size={12} className="mr-1" />
                      Populaire
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <div className="mb-3">
                  <img src={destination.flag} alt={destination.country} className="w-12 h-12 rounded-full mx-auto" />
                </div>
                  <h3 className="text-lg font-bold text-waw-dark mb-2">{destination.country}</h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>À partir de</span>
                      <span className="font-bold text-waw-dark">{destination.price}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Validité</span>
                      <span>{destination.duration}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onNavigateWithPlan?.('plan-details', destination.country)}
                    className={`w-full py-2 rounded-lg font-semibold transition-colors text-sm ${
                      destination.popular
                        ? 'bg-waw-yellow text-waw-dark hover:bg-waw-yellow-dark'
                        : 'bg-gray-100 text-waw-dark hover:bg-waw-yellow'
                    }`}
                  >
                    Voir les plans
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Section 3 - Comment ça marche */}
      <section className="section-padding bg-gradient-to-br from-waw-yellow/5 to-waw-yellow-dark/5 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <motion.div
            ref={section3Ref}
            variants={containerVariants}
            initial="hidden"
            animate={section3InView ? 'visible' : 'hidden'}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Text Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={section3InView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                  className="inline-block px-4 py-2 bg-waw-yellow/20 text-waw-dark rounded-full text-sm font-semibold mb-4"
                >
                  💳 Paiement Mobile
                </motion.span>

                <h2 className="text-4xl lg:text-5xl font-display font-bold text-waw-dark mb-6">
                  Comment ça marche&nbsp;?
                </h2>

                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Notre processus d'achat eSIM est optimisé dans tout le monde .
                  Payez facilement avec Wave ou Orange Money et connectez-vous instantanément.
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-6">
                {howItWorks.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={section3InView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-waw-yellow to-waw-yellow-dark rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-waw-dark font-bold">{step.step}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-waw-dark mb-1">{step.title}</h3>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Real Image Content - African Person with Mobile Payment */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative">
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                  }}
                  className="relative z-10 mx-auto"
                >
                  <div className="relative bg-gradient-to-br from-waw-dark to-gray-800 rounded-3xl p-8 shadow-2xl">
                    <img
                      src="https://wawtelecom.com/esim23.jpg"
                      alt="Personne africaine heureuse utilisant Orange Money pour acheter une eSIM"
                      className="w-full h-96 object-cover rounded-2xl shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-waw-dark/20 to-transparent rounded-2xl" />

                    {/* Overlay Info */}
                    <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-sm rounded-xl p-4">
                      <h4 className="font-bold text-lg text-gray-800 mb-2">Paiement Mobile Facile</h4>
                      <p className="text-sm text-gray-600 mb-3">Wave & Orange Money acceptés</p>

                      {/* Payment Methods */}
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { name: 'Wave', icon: '🌊' },
                          { name: 'Orange Money', icon: '🍊' },
                          { name: 'Carte', icon: '💳' },
                          { name: 'eSIM', icon: '📱' },
                        ].map((method) => (
                          <div key={method.name} className="text-center">
                            <div className="text-lg mb-1">{method.icon}</div>
                            <div className="text-xs text-gray-600">{method.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Payment Features */}
                <motion.div
                  animate={{
                    x: [0, 15, 0],
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                  }}
                  className="absolute -top-10 -left-10 bg-white rounded-xl shadow-lg p-4"
                >
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className="text-waw-yellow" />
                    <span className="text-sm font-medium text-gray-700">Instantané</span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    x: [0, -12, 0],
                    y: [0, 12, 0],
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                    delay: 2,
                  }}
                  className="absolute -bottom-10 -right-10 bg-white rounded-xl shadow-lg p-4"
                >
                  <div className="flex items-center space-x-2">
                    <Shield size={16} className="text-waw-yellow" />
                    <span className="text-sm font-medium text-gray-700">100% Sécurisé</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>



      {/* Section Guide d’activation eSIM interactif - Tabs UX */}
      <section className="section-padding bg-gradient-to-br from-waw-yellow/10 to-white relative overflow-hidden">
        <div className="container-custom relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-12"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              className="inline-block px-4 py-2 bg-waw-yellow/20 text-waw-yellow-dark rounded-full text-sm font-semibold mb-4"
            >
              🛠️ Guide d’activation eSIM
            </motion.span>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-waw-dark mb-6">
              Activez votre <span className="gradient-text">WAW Travel eSIM</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Suivez le guide interactif selon votre méthode préférée&nbsp;: <span className="font-bold text-waw-yellow-dark">Activation rapide</span>, <span className="font-bold text-waw-yellow-dark">QR Code</span> ou <span className="font-bold text-waw-yellow-dark">Activation manuelle</span>.
            </p>
          </motion.div>
          {/* Onglets */}
          {(() => {
            const [tab, setTab] = useState('');
            const tabList = [
              { key: 'single', label: 'Activation rapide', icon: '🟣', desc: '1 clic (iOS 17.4+)' },
              { key: 'qr', label: 'QR Code', icon: '🔳', desc: 'Scanner le QR' },
              { key: 'manual', label: 'Manuelle', icon: '📱', desc: 'Code d’activation' },
            ];
            return (
              <div className="max-w-3xl mx-auto">
                <div className="flex justify-center gap-4 mb-8">
                  {tabList.map(t => (
                    <button
                      key={t.key}
                      onClick={() => setTab(t.key)}
                      className={`flex flex-col items-center px-6 py-3 rounded-xl border-2 transition-all font-semibold text-lg shadow-sm bg-white hover:bg-waw-yellow/10 ${tab === t.key ? 'border-waw-yellow bg-waw-yellow/20 text-waw-yellow-dark scale-105' : 'border-gray-200 text-gray-500'}`}
                    >
                      <span className="text-2xl mb-1">{t.icon}</span>
                      {t.label}
                      <span className="text-xs font-normal text-gray-400">{t.desc}</span>
                    </button>
                  ))}
                </div>
                {/* Contenu du guide selon l’onglet */}
                {tab ? (
                  <div className="bg-white rounded-3xl shadow-xl border-2 border-waw-yellow/20 p-8 animate-fade-in">
                    {tab === 'single' && (
                      <div className="space-y-4 text-left">
                        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">🟣 Activation rapide (iOS 17.4+)</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                          <li>Assurez-vous d’être connecté à un <b>WiFi stable</b> <span className="ml-1">📶</span></li>
                          <li>Le mode avion doit être <b>désactivé</b> <span className="ml-1">✈️❌</span></li>
                          <li>Ouvrez l’app WAW Travel et cliquez sur <b>«&nbsp;Activer maintenant&nbsp;»</b></li>
                          <li>Cliquez sur <b>«&nbsp;Démarrer l’activation&nbsp;»</b></li>
                          <li>Autorisez l’accès et cliquez sur <b>«&nbsp;Continuer&nbsp;»</b></li>
                          <li>Patientez 1 à 2 minutes, écran allumé <span className="ml-1">⏳</span></li>
                          <li>À la fin, cliquez sur <b>«&nbsp;Continuer&nbsp;»</b> pour finaliser la configuration iOS</li>
                          <li>Pour chaque étape (Ligne par défaut, iMessage/Facetime, Données mobiles), sélectionnez <b>Primaire</b> puis <b>Continuer</b> <span className="ml-1">📱</span></li>
                          <li>Notez le nom attribué à votre eSIM (ex: Personnel, Voyage, Données…)</li>
                        </ul>
                      </div>
                    )}
                    {tab === 'qr' && (
                      <div className="space-y-4 text-left">
                        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">🔳 Activation par QR Code</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                          <li>Assurez-vous d’être connecté à un <b>WiFi stable</b> <span className="ml-1">📶</span></li>
                          <li>Le mode avion doit être <b>désactivé</b> <span className="ml-1">✈️❌</span></li>
                          <li>Envoyez le QR code reçu sur un autre appareil (PC, tablette, téléphone d’un ami)</li>
                          <li>Ouvrez l’appareil photo de votre iPhone et scannez le QR code</li>
                          <li>Cliquez sur <b>«&nbsp;Continuer&nbsp;»</b> sur l’écran d’activation eSIM</li>
                          <li>Patientez 1 à 2 minutes, écran allumé <span className="ml-1">⏳</span></li>
                          <li>À la fin, cliquez sur <b>«&nbsp;Continuer&nbsp;»</b> pour finaliser la configuration iOS</li>
                          <li>Pour chaque étape (Ligne par défaut, iMessage/Facetime, Données mobiles), sélectionnez <b>Primaire</b> puis <b>Continuer</b> <span className="ml-1">📱</span></li>
                          <li>Notez le nom attribué à votre eSIM (ex: Personnel, Voyage, Données…)</li>
                        </ul>
                      </div>
                    )}
                    {tab === 'manual' && (
                      <div className="space-y-4 text-left">
                        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">📱 Activation manuelle</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                          <li>Assurez-vous d’être connecté à un <b>WiFi stable</b> <span className="ml-1">📶</span></li>
                          <li>Le mode avion doit être <b>désactivé</b> <span className="ml-1">✈️❌</span></li>
                          <li>Ouvrez l’app WAW Travel et cliquez sur <b>«&nbsp;Activation manuelle&nbsp;»</b></li>
                          <li>Copiez l’adresse SMDP+ et le code d’activation fournis</li>
                          <li>Sur votre iPhone : Réglages → Données cellulaires → Ajouter eSIM → Utiliser QR Code → Saisir manuellement</li>
                          <li>Collez l’adresse SMDP+ puis le code d’activation</li>
                          <li>Cliquez sur <b>Suivant</b> et patientez 1 à 2 minutes <span className="ml-1">⏳</span></li>
                          <li>À la fin, cliquez sur <b>«&nbsp;Continuer&nbsp;»</b> pour finaliser la configuration iOS</li>
                          <li>Pour chaque étape (Ligne par défaut, iMessage/Facetime, Données mobiles), sélectionnez <b>Primaire</b> puis <b>Continuer</b> <span className="ml-1">📱</span></li>
                          <li>Notez le nom attribué à votre eSIM (ex: Personnel, Voyage, Données…)</li>
                        </ul>
                      </div>
                    )}
                    {/* Bloc commun : Paramétrage iOS & Data */}
                    <div className="mt-8 border-t pt-6">
                      <h4 className="text-lg font-bold mb-2 flex items-center gap-2">⚙️ Paramétrage iOS & Données</h4>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Ouvrez Réglages → Données cellulaires → faites défiler jusqu’à la section SIMs</li>
                        <li>Cliquez sur votre eSIM WAW Travel (nom attribué précédemment)</li>
                        <li>Activez <b>Itinérance des données</b> <span className="ml-1">🌍</span></li>
                        <li>Pour votre SIM principale, désactivez <b>Itinérance des données</b> <span className="ml-1">🚫</span></li>
                        <li>Pour les données mobiles, sélectionnez la ligne WAW Travel et activez <b>Autoriser le basculement des données</b> <span className="ml-1">🔄</span></li>
                        <li><b>Astuce&nbsp;:</b> Pour éviter la consommation en tâche de fond, activez le <b>Mode données limitées</b> sur la eSIM WAW Travel <span className="ml-1">💡</span></li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl shadow-xl border-2 border-waw-yellow/20 p-8 animate-fade-in text-center text-gray-500 text-lg">
                    <span>Sélectionnez une méthode d’activation ci-dessus pour afficher le guide détaillé 👆</span>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </section>

      {/* Section Témoignages clients - Slider africain */}
      <section className="section-padding bg-gradient-to-br from-white to-waw-yellow/10 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              className="inline-block px-4 py-2 bg-waw-yellow/20 text-waw-yellow-dark rounded-full text-sm font-semibold mb-4"
            >
              ⭐ Témoignages clients
            </motion.span>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-waw-dark mb-6">
              Ils ont choisi <span className="gradient-text">WAW eSIM</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Découvrez les avis de nos clients africains satisfaits !
            </p>
          </motion.div>
          {/* Slider horizontal auto défilant */}
          {(() => {
            // Témoignages africains
            const testimonials = [
              {
                name: 'Fatou Ndiaye',
                country: 'Sénégal',
                flag: '/flags/sn.svg',
                stars: 5,
                text: 'Service rapide, activation instantanée et support très réactif. Je recommande à tous les voyageurs africains !'
              },
              {
                name: 'Yao Kouassi',
                country: 'Côte d’Ivoire',
                flag: '/flags/ci.svg',
                stars: 5,
                text: 'Activation facile, connexion stable à Abidjan comme à Dakar. Merci WAW eSIM !'
              },
              {
                name: 'Aminata Traoré',
                country: 'Mali',
                flag: '/flags/ma.svg',
                stars: 4,
                text: 'Très pratique pour voyager sans changer de SIM. Support WhatsApp efficace.'
              },
              {
                name: 'Mohamed Camara',
                country: 'Guinée',
                flag: '/flags/gh.svg',
                stars: 5,
                text: 'J’ai utilisé WAW eSIM au Maroc et en France, tout a fonctionné parfaitement.'
              },
              {
                name: 'Awa Diop',
                country: 'Sénégal',
                flag: '/flags/sn.svg',
                stars: 5,
                text: 'Installation simple, internet rapide, je recommande à mes amis !'
              },
              {
                name: 'Koffi Mensah',
                country: 'Togo',
                flag: '/flags/gh.svg',
                stars: 4,
                text: 'Bon rapport qualité/prix pour les voyageurs africains.'
              }
            ];
            // Auto-scroll state
            const [offset, setOffset] = useState(0);
            // Largeur d’une carte + gap
            const cardWidth = 360;
            // Scroll automatique
            React.useEffect(() => {
              const interval = setInterval(() => {
                setOffset(prev => (prev + 1) % testimonials.length);
              }, 3500);
              return () => clearInterval(interval);
            }, [testimonials.length]);
            return (
              <div className="relative w-full overflow-hidden">
                <div
                  className="flex gap-8 transition-transform duration-700"
                  style={{ transform: `translateX(-${offset * cardWidth}px)` }}
                >
                  {testimonials.concat(testimonials[0]).map((testimonial, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + (i % testimonials.length) * 0.1 }}
                      className="relative flex flex-col items-center bg-white rounded-3xl p-8 shadow-xl border-2 border-waw-yellow/20 hover:border-waw-yellow transition-all min-w-[320px] max-w-[340px]"
                    >
                      <div className="relative mb-4 flex flex-col items-center">
                        <img src={testimonial.flag} alt={testimonial.country} className="w-16 h-16 rounded-full border-4 border-waw-yellow/30 shadow-lg mb-2" />
                      </div>
                      <div className="flex items-center mb-2">
                        {Array.from({ length: testimonial.stars }).map((_, idx) => (
                          <Star key={idx} size={18} className="text-waw-yellow" />
                        ))}
                      </div>
                      <p className="text-gray-700 text-base italic mb-4">“{testimonial.text}”</p>
                      <div className="font-bold text-waw-dark">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.country}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </section>
     
      {/* Section 5 - Support & Contact */}
      <section className="section-padding bg-gradient-to-r from-waw-dark to-gray-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
            className="w-full h-full opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFDD33' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            ref={section5Ref}
            variants={containerVariants}
            initial="hidden"
            animate={section5InView ? 'visible' : 'hidden'}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={section5InView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                  className="inline-block px-6 py-3 bg-waw-yellow/20 text-waw-yellow rounded-full text-lg font-semibold mb-6"
                >
                  📞 Contact & Support
                </motion.span>

                <h2 className="text-4xl lg:text-6xl font-display font-bold mb-6">
                  Prêt à vous connecter au{' '}
                  <span className="bg-gradient-to-r from-waw-yellow to-waw-yellow-dark bg-clip-text text-transparent">
                    monde entier
                  </span> ?
                </h2>

                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Notre équipe est disponible pour vous guider dans le choix et l’activation de votre eSIM.
                </p>
              </div>

              {/* Contact Options */}
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {[
                  {
                    icon: Phone,
                    title: 'Support Immédiat',
                    desc: '+221 33 860 19 29',
                    action: 'Appeler maintenant'
                  },
                  {
                    icon: Mail,
                    title: 'Commande eSIM',
                    desc: 'contact@wawtelecom.com',
                    action: 'Commander par email'
                  },
                  {
                    icon: Building,
                    title: 'Devis Business',
                    desc: 'Solutions sur mesure pour entreprises',
                    action: 'Demander un devis'
                  }
                ].map((contact, index) => (
                  <motion.div
                    key={contact.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={section5InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all cursor-pointer"
                  >
                    <div className="w-16 h-16 bg-waw-yellow rounded-xl flex items-center justify-center mx-auto mb-4">
                      <contact.icon size={28} className="text-waw-dark" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{contact.title}</h3>
                    <p className="text-gray-300 mb-4">{contact.desc}</p>
                    <p className="text-waw-yellow font-semibold text-sm">{contact.action}</p>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
            
            </motion.div>
          </motion.div>
        </div>
      </section>
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
