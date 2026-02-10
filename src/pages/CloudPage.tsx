import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import useDeviceOptimization from '../hooks/useDeviceOptimization';
import {
  Cloud,
  Server,
  Shield,
  Zap,
  Database,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  Users,
  Clock,
  TrendingUp,
  Layers,
  HardDrive,
  Cpu,
  BarChart3,
  Lock,
  Settings,
  Wifi,
  Building
} from 'lucide-react';
import VpsPlans from '../components/VpsPlans';
import WebHostingPlans from '../components/WebHostingPlans';
import type { PageType } from '../App';

interface CloudPageProps {
  onNavigate: (page: PageType) => void;
}

const CloudPage = ({ onNavigate }: CloudPageProps) => {
  // Optimisation device
  const { isSafari, isMobile, transitionConfig } = useDeviceOptimization();
  
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
    { icon: Server, value: '99.9%', label: 'Uptime garanti', color: 'text-waw-yellow' },
    { icon: Shield, value: '24/7', label: 'Monitoring sécurité', color: 'text-waw-yellow' },
    { icon: Database, value: '1TB+', label: 'Stockage disponible', color: 'text-waw-yellow' },
    { icon: Users, value: '500+', label: 'Clients satisfaits', color: 'text-waw-yellow' }
  ];

  const mutualiseFeatures = [
    'Stockage sécurisé pour vos données et sauvegardes',
    'Hébergement optimisé pour vos projets de petite taille',
    'Adresses e-mail professionnelles incluses',
    'Outils de gestion dédiés aux startups',
    'Support réactif pour une assistance rapide et efficace'
  ];

  const proFeatures = [
    'Hébergement sur mesure pour vos projets de grande envergure',
    'Adresses e-mail professionnelles incluses',
    'Outils avancés de sécurité pour protéger vos données',
    'Support business dédié pour un accompagnement optimal'
  ];

  const vpsFeatures = [
    'Systèmes d\'exploitation au choix : Ubuntu, CentOS, Debian, Fedora…',
    'Environnements Microsoft : Windows, Windows Server, SQL Server',
    'Outils avancés de sécurité intégrés',
    'Haute disponibilité pour une fiabilité maximale',
    'Sauvegardes automatiques, snapshots, et firewall inclus'
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

          {/* Floating Cloud Icons */}
          {[
            { icon: Cloud, position: 'top-40 left-20', delay: 0 },
            { icon: Server, position: 'top-60 right-40', delay: 1 },
            { icon: Database, position: 'bottom-60 left-40', delay: 2 },
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
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="inline-block px-6 py-3 bg-waw-yellow/20 text-waw-yellow rounded-full text-lg font-semibold"
              >
                ☁️ Solutions Cloud
              </motion.span>

              <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight">
                Hébergement{' '}
                <span className="bg-gradient-to-r from-waw-yellow to-waw-yellow-dark bg-clip-text text-transparent">
                  Cloud sécurisé
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                Des solutions d'hébergement cloud adaptées à tous vos besoins :
                du projet startup aux applications d'entreprise. Performance,
                sécurité et flexibilité garanties.
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
                  <Cloud size={20} />
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
                    <stat.icon size={24} className="text-white" />
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

      {/* Section 1 - Hébergement Mutualisé */}
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
                  🏢 Hébergement Mutualisé
                </motion.span>

                <h2 className="text-4xl lg:text-5xl font-display font-bold text-waw-dark mb-6">
                  Hébergement Mutualisé :{' '}
                  <span className="gradient-text">La solution idéale pour vos projets</span>
                </h2>

                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Une solution d'hébergement économique et performante, parfaitement
                  adaptée aux startups et projets en développement. Bénéficiez de
                  tous les outils essentiels pour lancer votre présence en ligne.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-3">
                {mutualiseFeatures.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={section1InView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
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
                  <div className="relative bg-gradient-to-br from-waw-dark to-gray-800 rounded-3xl p-8 shadow-2xl">
                    <img
                      src="https://ugc.same-assets.com/GOWGZuEXJGxXIeoIyxRBnfQhBpCRd0gs.png"
                      alt="Infrastructure de datacenter pour hébergement mutualisé"
                      className="w-full h-96 object-cover rounded-2xl shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-waw-dark/20 to-transparent rounded-2xl" />

                    {/* Overlay Info */}
                    <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-sm rounded-xl p-4">
                      <h4 className="font-bold text-lg text-gray-800 mb-2">Hébergement Mutualisé</h4>
                      <p className="text-sm text-gray-600">Infrastructure partagée haute performance</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-waw-yellow rounded-full animate-pulse" />
                          <span className="text-xs text-gray-600">Serveurs actifs</span>
                        </div>
                        <div className="text-xs text-gray-600">99.9% Uptime</div>
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
                    <Mail size={16} className="text-waw-yellow" />
                    <span className="text-sm font-medium text-gray-700">Email Pro Inclus</span>
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
                    <Shield size={16} className="text-waw-yellow" />
                    <span className="text-sm font-medium text-gray-700">Sécurisé SSL</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 2 - Hosting Pro Dédié */}
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
            {/* Real Image Content */}
            <motion.div variants={itemVariants} className="relative lg:order-1">
              <div className="relative">
                <motion.div
                  animate={{ y: [-15, 15, -15] }}
                  transition={{
                    duration: 7,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                  }}
                  className="relative z-10 mx-auto"
                >
                  <div className="relative bg-gradient-to-br from-waw-dark to-gray-800 rounded-3xl p-8 shadow-2xl">
                    <img
                      src="https://ugc.same-assets.com/vr_bFP4YrOE2Z8e6ttDmWyeDjP-hPxkZ.jpeg"
                      alt="Serveurs dédiés en datacenter pour hosting pro"
                      className="w-full h-96 object-cover rounded-2xl shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-waw-dark/20 to-transparent rounded-2xl" />

                    {/* Overlay Info */}
                    <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-sm rounded-xl p-4">
                      <h4 className="font-bold text-lg text-gray-800 mb-2">Hosting Pro Dédié</h4>
                      <p className="text-sm text-gray-600">Serveurs dédiés haute performance</p>
                      <div className="grid grid-cols-3 gap-3 mt-3">
                        <div className="text-center">
                          <div className="text-lg font-bold text-waw-yellow">8 Cores</div>
                          <div className="text-xs text-gray-600">CPU</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-waw-yellow">32GB</div>
                          <div className="text-xs text-gray-600">RAM</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-waw-yellow">1TB</div>
                          <div className="text-xs text-gray-600">SSD</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Pro Features */}
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
                    <span className="text-sm font-medium text-gray-700">Performance Max</span>
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
                    <Users size={16} className="text-waw-yellow" />
                    <span className="text-sm font-medium text-gray-700">Support Business</span>
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
                  🚀 Hosting Pro Dédié
                </motion.span>

                <h2 className="text-4xl lg:text-5xl font-display font-bold text-waw-dark mb-6">
                  Hébergement Pro Dédié :{' '}
                  <span className="gradient-text">La puissance au service de vos grands projets</span>
                </h2>

                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Pour vos applications critiques et projets d'envergure, bénéficiez
                  d'un serveur entièrement dédié avec des performances exceptionnelles
                  et un support business de premier niveau.
                </p>
              </div>

              {/* Pro Features */}
              <div className="space-y-3">
                {proFeatures.map((feature, index) => (
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

      {/* Section 3 - Service Cloud VPS */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 35,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
            className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-waw-yellow/20 to-waw-yellow-dark/20 rounded-full blur-3xl"
          />
        </div>

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
                  ⚡ Service Cloud VPS
                </motion.span>

                <h2 className="text-4xl lg:text-5xl font-display font-bold text-waw-dark mb-6">
                  Service Cloud VPS :{' '}
                  <span className="gradient-text">Performance, flexibilité et sécurité</span>
                </h2>

                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  La solution cloud la plus flexible pour vos besoins techniques
                  spécifiques. Choisissez votre environnement et bénéficiez d'une
                  infrastructure cloud haute performance avec une sécurité renforcée.
                </p>
              </div>

              {/* VPS Features */}
              <div className="space-y-3">
                {vpsFeatures.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={section3InView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
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

            {/* Real Image Content */}
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
                      src="https://ugc.same-assets.com/KysW4vstJyfbE6UZ5xZthUknCmf9R2HI.jpeg"
                      alt="Infrastructure cloud VPS avec virtualisation"
                      className="w-full h-96 object-cover rounded-2xl shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-waw-dark/20 to-transparent rounded-2xl" />

                    {/* Overlay Info */}
                    <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-sm rounded-xl p-4">
                      <h4 className="font-bold text-lg text-gray-800 mb-2">Cloud VPS</h4>
                      <p className="text-sm text-gray-600">Infrastructure virtuelle flexible</p>

                      {/* OS Options */}
                      <div className="grid grid-cols-4 gap-2 mt-3">
                        {[
                          { name: 'Ubuntu', icon: '🐧' },
                          { name: 'Windows', icon: '🪟' },
                          { name: 'CentOS', icon: '⚙️' },
                          { name: 'Debian', icon: '🔧' },
                        ].map((os) => (
                          <div key={os.name} className="text-center">
                            <div className="text-lg mb-1">{os.icon}</div>
                            <div className="text-xs text-gray-600">{os.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* VPS Features */}
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
                    <Settings size={16} className="text-waw-yellow" />
                    <span className="text-sm font-medium text-gray-700">Full Control</span>
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
                    <BarChart3 size={16} className="text-waw-yellow" />
                    <span className="text-sm font-medium text-gray-700">Évolutif</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section VPS Plans */}
      <VpsPlans />

      {/* Section Web Hosting Plans */}
      <WebHostingPlans />

      {/* Section 4 - Support & Contact */}
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
            ref={section4Ref}
            variants={containerVariants}
            initial="hidden"
            animate={section4InView ? 'visible' : 'hidden'}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={section4InView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                  className="inline-block px-6 py-3 bg-waw-yellow/20 text-waw-yellow rounded-full text-lg font-semibold mb-6"
                >
                  ☁️ Support Cloud Expert
                </motion.span>

                <h2 className="text-4xl lg:text-6xl font-display font-bold mb-6">
                  Prêt à migrer vers le{' '}
                  <span className="bg-gradient-to-r from-waw-yellow to-waw-yellow-dark bg-clip-text text-transparent">
                    Cloud
                  </span> ?
                </h2>

                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  Nos experts cloud sont là pour vous accompagner dans le choix
                  de la solution parfaite pour vos besoins. Migration, configuration
                  et support technique inclus.
                </p>
              </div>

              {/* Contact Options */}
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {[
                  {
                    icon: Phone,
                    title: 'Conseil Expert',
                    desc: '+221 33 860 19 29',
                    action: 'Parler à un expert'
                  },
                  {
                    icon: Mail,
                    title: 'Devis Cloud',
                    desc: 'contact@wawtelecom.com',
                    action: 'Demander un devis'
                  },
                  {
                    icon: Building,
                    title: 'Migration Gratuite',
                    desc: 'Assistance à la migration incluse',
                    action: 'Planifier la migration'
                  }
                ].map((contact, index) => (
                  <motion.div
                    key={contact.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={section4InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all cursor-pointer"
                  >
                    <div className="w-16 h-16 bg-waw-yellow rounded-xl flex items-center justify-center mx-auto mb-4">
                      <contact.icon size={28} className="text-white" />
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
                  <Cloud size={20} />
                  <span>Calculateur de prix</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CloudPage;
