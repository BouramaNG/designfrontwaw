import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Shield,
  Network,
  Zap,
  Globe,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  Building,
  Router,
  Lock,
  Users,
  Clock,
  TrendingUp,
  Cpu,
  Wifi,
  BarChart3,
  Settings
} from 'lucide-react';
import type { PageType } from '../App';

interface ConnectivitePageProps {
  onNavigate: (page: PageType) => void;
}

const ConnectivitePage = ({ onNavigate }: ConnectivitePageProps) => {
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

  const features = [
    {
      icon: Shield,
      title: 'Sécurité Renforcée',
      description: 'Chiffrement de bout en bout et protection avancée'
    },
    {
      icon: Zap,
      title: 'Performance Optimale',
      description: 'Faible latence et haute disponibilité garanties'
    },
    {
      icon: Network,
      title: 'Infrastructure Évolutive',
      description: 'Solutions qui grandissent avec votre entreprise'
    },
    {
      icon: Clock,
      title: 'Support 24/7',
      description: 'Assistance technique experte en permanence'
    }
  ];

  const mplsFeatures = [
    'Qualité de Service (QoS) garantie',
    'Interconnexion sécurisée multi-sites',
    'Gestion centralisée du réseau',
    'Visibilité complète des flux de données',
    'Redondance automatique',
    'SLA avec garantie de performance'
  ];

  const stats = [
    { icon: Building, value: '500+', label: 'Entreprises connectées', color: 'text-waw-yellow' },
    { icon: Globe, value: '99.9%', label: 'Disponibilité du réseau', color: 'text-waw-yellow' },
    { icon: Router, value: '<5ms', label: 'Latence moyenne', color: 'text-waw-yellow' },
    { icon: Users, value: '24/7', label: 'Support technique', color: 'text-waw-yellow' }
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

          {/* Floating Network Icons */}
          {[
            { icon: Network, position: 'top-40 left-20', delay: 0 },
            { icon: Router, position: 'top-60 right-40', delay: 1 },
            { icon: Globe, position: 'bottom-60 left-40', delay: 2 },
            { icon: Shield, position: 'bottom-40 right-20', delay: 0.5 },
          ].map((item, index) => (
            <motion.div
              key={index}
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
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="inline-block px-6 py-3 bg-waw-yellow/20 text-waw-yellow rounded-full text-lg font-semibold"
              >
                🔗 Connectivité Enterprise
              </motion.span>

              <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight">
                Connectivité{' '}
                <span className="bg-gradient-to-r from-waw-yellow to-waw-yellow-dark bg-clip-text text-transparent">
                  privée sécurisée
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                Chez WAW TELECOM, nous offrons bien plus qu'une simple connexion :
                nous fournissons des solutions de connectivité privée qui garantissent
                une infrastructure sécurisée, performante et adaptée aux enjeux de l'ère numérique.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('contact')}
                  className="bg-waw-yellow text-waw-dark font-bold px-8 py-4 rounded-lg text-lg hover:bg-waw-yellow-dark transition-colors flex items-center justify-center space-x-2 group"
                >
                  <span>Contactez-nous</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-waw-yellow text-waw-yellow font-bold px-8 py-4 rounded-lg text-lg hover:bg-waw-yellow hover:text-waw-dark transition-colors flex items-center justify-center space-x-2"
                >
                  <Network size={20} />
                  <span>Découvrir nos solutions</span>
                </motion.button>
              </div>
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

      {/* Section 1 - Connectivité privée sécurisée */}
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
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Text Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={section1InView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                  className="inline-block px-4 py-2 bg-waw-yellow/20 text-waw-dark rounded-full text-sm font-semibold mb-4"
                >
                  🔒 Sécurité Avancée
                </motion.span>

                <h2 className="text-4xl lg:text-5xl font-display font-bold text-waw-dark mb-6">
                  Connectivité privée{' '}
                  <span className="gradient-text">sécurisée</span>
                </h2>

                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Chez WAW TELECOM, nous offrons bien plus qu'une simple connexion :
                  nous fournissons des solutions de connectivité privée qui garantissent
                  une infrastructure sécurisée, performante et adaptée aux enjeux de l'ère numérique.
                  Faites confiance à notre expertise pour renforcer la sécurité et l'efficacité
                  de votre entreprise tout en répondant à vos besoins les plus stratégiques.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={section1InView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-waw-yellow to-waw-yellow-dark rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-waw-dark mb-1">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('contact')}
                className="btn-primary flex items-center space-x-2 group"
              >
                <span>Contactez-nous</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

            {/* Visual Content */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative">
                {/* Main Network Visualization */}
                <motion.div
                  animate={{ y: [-20, 20, -20] }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                  }}
                  className="relative z-10 mx-auto w-96 h-96 bg-gradient-to-br from-waw-dark to-gray-800 rounded-3xl p-8 shadow-2xl"
                >
                  <div className="w-full h-full bg-gradient-to-br from-white/90 to-gray-100/90 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
                    {/* Network Nodes */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-64 h-64">
                        {/* Central Hub */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-waw-yellow to-waw-yellow-dark rounded-full flex items-center justify-center shadow-lg"
                        >
                          <Router size={24} className="text-waw-dark" />
                        </motion.div>

                        {/* Satellite Nodes */}
                        {[
                          { angle: 0, icon: Building, delay: 0 },
                          { angle: 60, icon: Globe, delay: 0.5 },
                          { angle: 120, icon: Shield, delay: 1 },
                          { angle: 180, icon: Network, delay: 1.5 },
                          { angle: 240, icon: Lock, delay: 2 },
                          { angle: 300, icon: Zap, delay: 2.5 },
                        ].map((node, index) => (
                          <motion.div
                            key={index}
                            className="absolute w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-waw-yellow"
                            style={{
                              top: `${50 + 35 * Math.sin((node.angle * Math.PI) / 180)}%`,
                              left: `${50 + 35 * Math.cos((node.angle * Math.PI) / 180)}%`,
                              transform: 'translate(-50%, -50%)',
                            }}
                            animate={{
                              scale: [1, 1.1, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: node.delay,
                            }}
                          >
                            <node.icon size={16} className="text-waw-dark" />
                          </motion.div>
                        ))}

                        {/* Connection Lines */}
                        <svg className="absolute inset-0 w-full h-full">
                          {[0, 60, 120, 180, 240, 300].map((angle, index) => (
                            <motion.line
                              key={index}
                              x1="50%"
                              y1="50%"
                              x2={`${50 + 35 * Math.cos((angle * Math.PI) / 180)}%`}
                              y2={`${50 + 35 * Math.sin((angle * Math.PI) / 180)}%`}
                              stroke="#FFDD33"
                              strokeWidth="2"
                              strokeDasharray="5,5"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: 'reverse',
                                delay: index * 0.2,
                              }}
                            />
                          ))}
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Security Badges */}
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
                    <Shield size={16} className="text-waw-yellow" />
                    <span className="text-sm font-medium text-gray-700">SSL/TLS Encrypted</span>
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
                    <Lock size={16} className="text-waw-yellow" />
                    <span className="text-sm font-medium text-gray-700">Private Network</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 2 - MPLS Solutions */}
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
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Visual Content */}
            <motion.div variants={itemVariants} className="relative lg:order-1">
              <div className="relative">
                {/* MPLS Network Diagram */}
                <motion.div
                  animate={{ y: [-15, 15, -15] }}
                  transition={{
                    duration: 7,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                  }}
                  className="relative z-10 mx-auto w-96 h-96 bg-gradient-to-br from-waw-dark to-gray-800 rounded-3xl p-8 shadow-2xl"
                >
                  <div className="w-full h-full bg-gradient-to-br from-white/90 to-gray-100/90 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
                    {/* MPLS Cloud */}
                    <div className="text-center mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-waw-yellow to-waw-yellow-dark rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Network size={32} className="text-waw-dark" />
                      </div>
                      <h4 className="font-bold text-lg text-gray-800">MPLS Network</h4>
                      <p className="text-sm text-gray-600">Quality of Service</p>
                    </div>

                    {/* Sites Connection */}
                    <div className="grid grid-cols-3 gap-4 w-full">
                      {['Site A', 'Site B', 'Site C'].map((site, index) => (
                        <motion.div
                          key={site}
                          animate={{
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: index * 0.5,
                          }}
                          className="bg-white rounded-lg p-3 shadow-md border border-gray-200 text-center"
                        >
                          <Building size={20} className="text-waw-yellow mx-auto mb-2" />
                          <p className="text-xs font-medium text-gray-700">{site}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Data Flow Animation */}
                    <div className="absolute inset-0">
                      {[0, 1, 2].map((index) => (
                        <motion.div
                          key={index}
                          className="absolute w-2 h-2 bg-waw-yellow rounded-full"
                          animate={{
                            x: [0, 100, 200],
                            y: [50, 0, 50],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: index * 1,
                          }}
                          style={{
                            left: '10%',
                            top: '70%',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Performance Indicators */}
                <motion.div
                  animate={{
                    x: [0, 15, 0],
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                  }}
                  className="absolute -top-10 -right-10 bg-white rounded-xl shadow-lg p-4"
                >
                  <div className="flex items-center space-x-2">
                    <TrendingUp size={16} className="text-waw-yellow" />
                    <span className="text-sm font-medium text-gray-700">QoS Optimized</span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    x: [0, -10, 0],
                    y: [0, 10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                    delay: 1.5,
                  }}
                  className="absolute -bottom-10 -left-10 bg-white rounded-xl shadow-lg p-4"
                >
                  <div className="flex items-center space-x-2">
                    <Zap size={16} className="text-waw-yellow" />
                    <span className="text-sm font-medium text-gray-700">Low Latency</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div variants={itemVariants} className="space-y-8 lg:order-2">
              <div>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={section2InView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                  className="inline-block px-4 py-2 bg-waw-yellow/20 text-waw-dark rounded-full text-sm font-semibold mb-4"
                >
                  🚀 Solutions MPLS
                </motion.span>

                <h2 className="text-4xl lg:text-5xl font-display font-bold text-waw-dark mb-6">
                  WAW TELECOM : La connectivité au{' '}
                  <span className="gradient-text">service de votre entreprise</span>
                </h2>

                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Optimisez vos performances avec nos solutions MPLS robustes,
                  idéales pour interconnecter vos sites distants et garantir une qualité
                  de service (QoS) optimale. Bénéficiez d'une faible latence pour vos
                  applications critiques, d'une gestion centralisée, et d'une visibilité
                  complète sur vos flux de données. Avec WAW TELECOM, assurez la fiabilité
                  et l'efficacité de votre réseau, pour des communications d'entreprises sans compromis.
                </p>
              </div>

              {/* MPLS Features */}
              <div className="space-y-3">
                {mplsFeatures.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={section2InView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
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
                <span>Contactez-nous</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 3 - Solutions SD-WAN */}
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
                  🌐 SD-WAN Solutions
                </motion.span>

                <h2 className="text-4xl lg:text-5xl font-display font-bold text-waw-dark mb-6">
                  Des solutions SD-WAN pour une connectivité{' '}
                  <span className="gradient-text">agile et performante</span>
                </h2>

                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Avec nos solutions SD-WAN de pointe, simplifiez la gestion de votre réseau
                  tout en améliorant ses performances. Offrez à votre entreprise une connectivité
                  optimisée, une gestion fluide de vos applications et une réduction significative
                  des coûts par rapport aux infrastructures réseau traditionnelles. WAW TELECOM
                  vous accompagne vers une infrastructure plus intelligente et flexible.
                </p>
              </div>

              {/* SD-WAN Benefits */}
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: Zap, title: 'Gestion simplifiée', desc: 'Interface centralisée intuitive' },
                  { icon: TrendingUp, title: 'Performance optimisée', desc: 'Routage intelligent du trafic' },
                  { icon: Shield, title: 'Sécurité renforcée', desc: 'Chiffrement bout-en-bout' },
                  { icon: Network, title: 'Flexibilité totale', desc: 'Adaptation aux besoins métier' },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={section3InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-waw-yellow to-waw-yellow-dark rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon size={18} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-waw-dark text-sm mb-1">{item.title}</h3>
                        <p className="text-gray-600 text-xs">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('contact')}
                className="btn-primary flex items-center space-x-2 group"
              >
                <span>Contactez-nous</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

            {/* Visual Content */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative">
                {/* SD-WAN Network Visualization */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                  }}
                  className="relative z-10 mx-auto w-96 h-96 bg-gradient-to-br from-waw-dark to-gray-800 rounded-3xl p-8 shadow-2xl"
                >
                  <div className="w-full h-full bg-gradient-to-br from-white/90 to-gray-100/90 rounded-2xl p-6 flex flex-col relative overflow-hidden">
                    {/* SD-WAN Controller */}
                    <div className="text-center mb-6">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
                        className="w-20 h-20 bg-gradient-to-br from-waw-yellow to-waw-yellow-dark rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                      >
                        <Router size={32} className="text-waw-dark" />
                      </motion.div>
                      <h4 className="font-bold text-lg text-gray-800">SD-WAN Controller</h4>
                      <p className="text-sm text-gray-600">Gestion Centralisée</p>
                    </div>

                    {/* Branch Offices */}
                    <div className="grid grid-cols-3 gap-3 w-full">
                      {['Site 1', 'Site 2', 'Site 3'].map((site, index) => (
                        <motion.div
                          key={site}
                          animate={{
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: index * 0.5,
                          }}
                          className="bg-white rounded-lg p-3 shadow-md border border-gray-200 text-center"
                        >
                          <Building size={18} className="text-waw-yellow mx-auto mb-2" />
                          <p className="text-xs font-medium text-gray-700">{site}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Intelligent Path Selection */}
                    <div className="absolute inset-0">
                      {[0, 1, 2].map((index) => (
                        <motion.div
                          key={index}
                          className="absolute w-2 h-2 bg-waw-yellow rounded-full"
                          animate={{
                            x: [50, 150, 250],
                            y: [100 + index * 20, 80 + index * 15, 100 + index * 20],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: index * 0.8,
                          }}
                          style={{
                            left: '5%',
                            top: '60%',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* SD-WAN Features */}
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
                    <Zap size={16} className="text-waw-yellow" />
                    <span className="text-sm font-medium text-gray-700">Intelligent Routing</span>
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
                    <span className="text-sm font-medium text-gray-700">Zero Trust Security</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 4 - Solutions IoT */}
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
            {/* Visual Content */}
            <motion.div variants={itemVariants} className="relative lg:order-1">
              <div className="relative">
                {/* IoT Network Visualization */}
                <motion.div
                  animate={{ y: [-15, 15, -15] }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                  }}
                  className="relative z-10 mx-auto w-96 h-96 bg-gradient-to-br from-waw-dark to-gray-800 rounded-3xl p-8 shadow-2xl"
                >
                  <div className="w-full h-full bg-gradient-to-br from-white/90 to-gray-100/90 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
                    {/* IoT Hub */}
                    <div className="text-center mb-6">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
                        className="w-20 h-20 bg-gradient-to-br from-waw-yellow to-waw-yellow-dark rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                      >
                        <Cpu size={32} className="text-waw-dark" />
                      </motion.div>
                      <h4 className="font-bold text-lg text-gray-800">IoT Platform</h4>
                      <p className="text-sm text-gray-600">Connectivité Intelligente</p>
                    </div>

                    {/* IoT Devices */}
                    <div className="grid grid-cols-2 gap-4 w-full">
                      {[
                        { icon: Wifi, label: 'Capteurs', color: 'text-waw-yellow' },
                        { icon: BarChart3, label: 'Analytics', color: 'text-waw-yellow' },
                        { icon: Settings, label: 'Contrôleurs', color: 'text-waw-dark' },
                        { icon: Shield, label: 'Sécurité', color: 'text-waw-dark' },
                      ].map((device, index) => (
                        <motion.div
                          key={device.label}
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: index * 0.4,
                          }}
                          className="bg-white rounded-lg p-3 shadow-md border border-gray-200 text-center"
                        >
                          <device.icon size={20} className={`${device.color} mx-auto mb-2`} />
                          <p className="text-xs font-medium text-gray-700">{device.label}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Data Streams */}
                    <div className="absolute inset-0">
                      {[0, 1, 2, 3].map((index) => (
                        <motion.div
                          key={index}
                          className="absolute w-1.5 h-1.5 bg-waw-yellow rounded-full"
                          animate={{
                            x: [20 + index * 15, 150, 280 + index * 10],
                            y: [150 + index * 30, 100 + index * 10, 150 + index * 30],
                            opacity: [1, 0.5, 1],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: index * 0.6,
                          }}
                          style={{
                            left: '10%',
                            top: '50%',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* IoT Features */}
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
                    <BarChart3 size={16} className="text-waw-yellow" />
                    <span className="text-sm font-medium text-gray-700">Real-time Analytics</span>
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
                    <Wifi size={16} className="text-waw-yellow" />
                    <span className="text-sm font-medium text-gray-700">Smart Connectivity</span>
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
                  🤖 Solutions IoT
                </motion.span>

                <h2 className="text-4xl lg:text-5xl font-display font-bold text-waw-dark mb-6">
                  Chez WAW TELECOM : Des solutions IoT{' '}
                  <span className="gradient-text">sur mesure pour votre entreprise</span>
                </h2>

                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Adoptez nos solutions IoT adaptées à vos besoins spécifiques et bénéficiez
                  d'une visibilité totale sur vos équipements et processus. Optimisez la gestion
                  de vos ressources, améliorez votre efficacité opérationnelle et réduisez vos
                  coûts d'exploitation grâce à notre expertise en connectivité intelligente.
                </p>
              </div>

              {/* IoT Benefits */}
              <div className="space-y-3">
                {[
                  'Visibilité totale sur vos équipements et processus',
                  'Optimisation de la gestion des ressources',
                  'Amélioration de l\'efficacité opérationnelle',
                  'Réduction des coûts d\'exploitation',
                  'Analytics en temps réel et prédictive',
                  'Plateforme de gestion centralisée'
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={section4InView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center space-x-3 p-3 bg-gradient-to-r from-waw-yellow/10 to-waw-yellow-dark/10 rounded-lg border border-waw-yellow/30"
                  >
                    <CheckCircle size={16} className="text-waw-yellow flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('contact')}
                className="btn-primary flex items-center space-x-2 group"
              >
                <span>Contactez-nous</span>
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
                  📞 Support Expert
                </motion.span>

                <h2 className="text-4xl lg:text-6xl font-display font-bold mb-6">
                  Prêt à sécuriser votre{' '}
                  <span className="bg-gradient-to-r from-waw-yellow to-waw-yellow-dark bg-clip-text text-transparent">
                    connectivité
                  </span> ?
                </h2>

                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  Nos experts en connectivité sont là pour analyser vos besoins
                  et concevoir une solution sur mesure. Bénéficiez d'un accompagnement
                  personnalisé et d'un support technique disponible 24h/24, 7j/7.
                </p>
              </div>

              {/* Contact Options */}
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {[
                  {
                    icon: Phone,
                    title: 'Appelez-nous',
                    desc: '+221 33 860 19 29',
                    action: 'Appeler maintenant'
                  },
                  {
                    icon: Mail,
                    title: 'Email',
                    desc: 'contact@wawtelecom.com',
                    action: 'Envoyer un email'
                  },
                  {
                    icon: Users,
                    title: 'Consultation',
                    desc: 'Audit gratuit de votre infrastructure',
                    action: 'Planifier un audit'
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
                  onClick={() => onNavigate('contact')}
                  className="bg-waw-yellow text-waw-dark font-bold px-8 py-4 rounded-lg text-lg hover:bg-waw-yellow-dark transition-colors flex items-center justify-center space-x-2 group"
                >
                  <span>Contactez nos experts</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-waw-yellow text-waw-yellow font-bold px-8 py-4 rounded-lg text-lg hover:bg-waw-yellow hover:text-waw-dark transition-all flex items-center justify-center space-x-2"
                >
                  <Network size={20} />
                  <span>Audit réseau gratuit</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ConnectivitePage;
