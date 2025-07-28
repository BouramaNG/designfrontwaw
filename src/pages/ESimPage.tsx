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
import type { PageType } from '../App';

interface ESimPageProps {
  onNavigate: (page: PageType) => void;
  onNavigateWithPlan?: (page: PageType, planId?: string) => void;
}

const ESimPage = ({ onNavigate, onNavigateWithPlan }: ESimPageProps) => {
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
    { icon: Globe, value: '200+', label: 'Pays couverts', color: 'text-waw-yellow' },
    { icon: Zap, value: '24h', label: 'Activation immédiate', color: 'text-waw-yellow' },
    { icon: Shield, value: '5G', label: 'Technologie avancée', color: 'text-waw-yellow' },
    { icon: Users, value: '50K+', label: 'Clients satisfaits', color: 'text-waw-yellow' }
  ];

  const advantages = [
    {
      icon: Zap,
      title: 'Activation Instantanée',
      description: 'Connectez-vous en quelques minutes sans attendre de carte physique'
    },
    {
      icon: Globe,
      title: 'Couverture Mondiale',
      description: 'Plus de 200 pays et territoires couverts avec des partenaires locaux'
    },
    {
      icon: CreditCard,
      title: 'Tarifs Transparents',
      description: 'Pas de frais cachés, tarifs fixes connus à l\'avance'
    },
    {
      icon: Shield,
      title: 'Sécurité Avancée',
      description: 'Chiffrement de niveau bancaire et protection des données'
    },
    {
      icon: Settings,
      title: 'Gestion Flexible',
      description: 'Contrôlez vos plans depuis notre application mobile'
    },
    {
      icon: Building,
      title: 'Solutions Business',
      description: 'Offres dédiées pour les entreprises et équipes nomades'
    }
  ];

  // Destinations populaires avec drapeaux
  const destinations = [
    {
      country: 'France',
      flag: '🇫🇷',
      price: '€8.95',
      data: '5GB',
      duration: '30 jours',
      popular: true
    },
    {
      country: 'États-Unis',
      flag: '🇺🇸',
      price: '€12.95',
      data: '10GB',
      duration: '30 jours',
      popular: false
    },
    {
      country: 'Royaume-Uni',
      flag: '🇬🇧',
      price: '€9.95',
      data: '5GB',
      duration: '30 jours',
      popular: false
    },
    {
      country: 'Allemagne',
      flag: '🇩🇪',
      price: '€8.95',
      data: '5GB',
      duration: '30 jours',
      popular: false
    },
    {
      country: 'Espagne',
      flag: '🇪🇸',
      price: '€8.95',
      data: '5GB',
      duration: '30 jours',
      popular: false
    },
    {
      country: 'Italie',
      flag: '🇮🇹',
      price: '€8.95',
      data: '5GB',
      duration: '30 jours',
      popular: false
    },
    {
      country: 'Japon',
      flag: '🇯🇵',
      price: '€15.95',
      data: '8GB',
      duration: '30 jours',
      popular: false
    },
    {
      country: 'Canada',
      flag: '🇨🇦',
      price: '€12.95',
      data: '10GB',
      duration: '30 jours',
      popular: false
    },
    {
      country: 'Australie',
      flag: '🇦🇺',
      price: '€16.95',
      data: '12GB',
      duration: '30 jours',
      popular: false
    },
    {
      country: 'Brésil',
      flag: '🇧🇷',
      price: '€13.95',
      data: '8GB',
      duration: '30 jours',
      popular: false
    },
    {
      country: 'Turquie',
      flag: '🇹🇷',
      price: '€10.95',
      data: '6GB',
      duration: '30 jours',
      popular: false
    },
    {
      country: 'Maroc',
      flag: '🇲🇦',
      price: '€11.95',
      data: '5GB',
      duration: '30 jours',
      popular: false
    }
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Choisissez votre destination',
      description: 'Sélectionnez le pays où vous voyagez parmi nos 200+ destinations',
      icon: MapPin
    },
    {
      step: '2',
      title: 'Payez avec Wave ou Orange Money',
      description: 'Paiement sécurisé avec vos solutions mobiles préférées',
      icon: CreditCard
    },
    {
      step: '3',
      title: 'Recevez votre eSIM',
      description: 'Code QR envoyé par SMS et email instantanément',
      icon: Download
    },
    {
      step: '4',
      title: 'Activez et connectez-vous',
      description: 'Scannez le QR code et profitez d\'Internet partout',
      icon: Wifi
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-waw-dark via-gray-900 to-black text-white">
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
                Connectivité{' '}
                <span className="bg-gradient-to-r from-waw-yellow to-waw-yellow-dark bg-clip-text text-transparent">
                  eSIM
                </span>{' '}
                mondiale
              </h1>

              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
                Restez connecté partout dans le monde avec nos solutions eSIM avancées.
                Activation instantanée, couverture mondiale, tarifs transparents.
                La révolution de la connectivité mobile pour voyageurs et entreprises.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 pt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-waw-yellow text-waw-dark font-bold px-8 py-4 rounded-lg text-lg hover:bg-waw-yellow-dark transition-colors flex items-center justify-center space-x-2 group"
                >
                  <span>Commander maintenant</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('contact')}
                  className="border-2 border-waw-yellow text-waw-yellow font-bold px-8 py-4 rounded-lg text-lg hover:bg-waw-yellow hover:text-waw-dark transition-colors flex items-center justify-center space-x-2"
                >
                  <Building size={20} />
                  <span>Solutions Business</span>
                </motion.button>
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
                        <div className="text-xs text-gray-600">200+ pays</div>
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
              <span className="gradient-text">eSIM WAW TELECOM</span> ?
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Découvrez tous les avantages de notre technologie eSIM avancée,
              conçue pour les voyageurs modernes et les entreprises connectées.
            </p>
          </motion.div>

          {/* Advantages Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                animate={section1InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-waw-yellow to-waw-yellow-dark rounded-xl flex items-center justify-center mb-4">
                  <advantage.icon size={24} className="text-waw-dark" />
                </div>
                <h3 className="text-xl font-bold text-waw-dark mb-3">{advantage.title}</h3>
                <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
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
                  <div className="text-4xl mb-3">{destination.flag}</div>
                  <h3 className="text-lg font-bold text-waw-dark mb-2">{destination.country}</h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>À partir de</span>
                      <span className="font-bold text-waw-dark">{destination.price}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Données</span>
                      <span>{destination.data}</span>
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

          {/* View All Destinations Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={section2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 1.5 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-waw-yellow to-waw-yellow-dark text-waw-dark font-bold px-8 py-4 rounded-lg text-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2 mx-auto"
            >
              <Globe size={20} />
              <span>Voir toutes les destinations (200+)</span>
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
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
                  Achetez votre eSIM en{' '}
                  <span className="gradient-text">4 étapes simples</span>
                </h2>

                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Notre processus d'achat eSIM est optimisé pour l'Afrique.
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
                      src="https://ugc.same-assets.com/QDOu1p2nTx2jV3_73oS96YaWxH4cih6Q.webp"
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

      {/* Section 4 - Solutions Business */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 30,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
            className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-waw-yellow/20 to-waw-yellow-dark/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            ref={section4Ref}
            variants={containerVariants}
            initial="hidden"
            animate={section4InView ? 'visible' : 'hidden'}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Real Image Content */}
            <motion.div variants={itemVariants} className="relative lg:order-1">
              <div className="relative">
                <motion.div
                  animate={{ y: [-15, 15, -15] }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                  }}
                  className="relative z-10 mx-auto"
                >
                  <div className="relative bg-gradient-to-br from-waw-dark to-gray-800 rounded-3xl p-8 shadow-2xl">
                    <img
                      src="https://ugc.same-assets.com/eFUx4jLdWtvsnZOlpDs0e7-Ux1jQUjTT.png"
                      alt="Solutions eSIM business pour entreprises"
                      className="w-full h-96 object-cover rounded-2xl shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-waw-dark/20 to-transparent rounded-2xl" />

                    {/* Overlay Info */}
                    <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-sm rounded-xl p-4">
                      <h4 className="font-bold text-lg text-gray-800 mb-2">Solutions Business</h4>
                      <p className="text-sm text-gray-600 mb-3">Gestion centralisée et contrôle total</p>

                      {/* Business Stats */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center">
                          <div className="text-lg font-bold text-waw-yellow">24/7</div>
                          <div className="text-xs text-gray-600">Support</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-waw-yellow">API</div>
                          <div className="text-xs text-gray-600">Intégration</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-waw-yellow">-30%</div>
                          <div className="text-xs text-gray-600">Tarifs</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Business Features */}
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
                  className="absolute -top-10 -right-10 bg-white rounded-xl shadow-lg p-4"
                >
                  <div className="flex items-center space-x-2">
                    <Users size={16} className="text-waw-yellow" />
                    <span className="text-sm font-medium text-gray-700">Multi-utilisateurs</span>
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
                    delay: 2,
                  }}
                  className="absolute -bottom-10 -left-10 bg-white rounded-xl shadow-lg p-4"
                >
                  <div className="flex items-center space-x-2">
                    <TrendingUp size={16} className="text-waw-yellow" />
                    <span className="text-sm font-medium text-gray-700">Analytics</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div variants={itemVariants} className="space-y-8 lg:order-2">
              <div>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={section4InView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                  className="inline-block px-4 py-2 bg-waw-yellow/20 text-waw-dark rounded-full text-sm font-semibold mb-4"
                >
                  🏢 Solutions Business
                </motion.span>

                <h2 className="text-4xl lg:text-5xl font-display font-bold text-waw-dark mb-6">
                  eSIM pour{' '}
                  <span className="gradient-text">entreprises</span>
                </h2>

                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Équipez vos équipes nomades avec nos solutions eSIM business.
                  Gestion centralisée, contrôle des coûts, support dédié et
                  intégration parfaite à vos systèmes existants.
                </p>
              </div>

              {/* Business Features */}
              <div className="space-y-3">
                {businessFeatures.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={section4InView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center space-x-3 p-3 bg-gradient-to-r from-waw-yellow/10 to-waw-yellow-dark/10 rounded-lg border border-waw-yellow/30"
                  >
                    <CheckCircle size={16} className="text-waw-yellow flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('contact')}
                className="btn-primary flex items-center space-x-2 group"
              >
                <span>Demander un devis business</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </motion.div>
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
                  📞 Support eSIM Expert
                </motion.span>

                <h2 className="text-4xl lg:text-6xl font-display font-bold mb-6">
                  Prêt à vous connecter au{' '}
                  <span className="bg-gradient-to-r from-waw-yellow to-waw-yellow-dark bg-clip-text text-transparent">
                    monde entier
                  </span> ?
                </h2>

                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  Nos experts eSIM vous accompagnent dans le choix de la solution
                  parfaite. Support technique 24/7, activation rapide garantie.
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
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-waw-yellow text-waw-dark font-bold px-8 py-4 rounded-lg text-lg hover:bg-waw-yellow-dark transition-colors flex items-center justify-center space-x-2 group"
                >
                  <span>Commander votre eSIM</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('contact')}
                  className="border-2 border-waw-yellow text-waw-yellow font-bold px-8 py-4 rounded-lg text-lg hover:bg-waw-yellow hover:text-waw-dark transition-all flex items-center justify-center space-x-2"
                >
                  <Smartphone size={20} />
                  <span>Guide d'activation</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ESimPage;
