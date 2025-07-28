import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Cpu,
  Wifi,
  Shield,
  TrendingUp,
  Zap,
  Eye,
  Thermometer,
  Droplets,
  Globe,
  Factory,
  Sprout,
  Home,
  Car,
  Building,
  ArrowRight,
  CheckCircle,
  MessageCircle,
  Phone,
  Mail,
  Smartphone,
  Cloud,
  Database,
  Settings,
  BarChart3,
  Lock,
  Users,
  Target,
  Gauge
} from 'lucide-react';
import type { PageType } from '../App';

interface IoTPageProps {
  onNavigate: (page: PageType) => void;
}

const IoTPage = ({ onNavigate }: IoTPageProps) => {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [solutionsRef, solutionsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [sectorsRef, sectorsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [benefitsRef, benefitsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [ctaRef, ctaInView] = useInView({
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
        ease: 'easeOut',
      },
    },
  };

  const openWhatsApp = (message: string) => {
    const phoneNumber = '221769291717';
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-waw-dark via-gray-800 to-waw-dark">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #FFDD33 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #FFDD33 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Floating IoT Icons */}
        {[
          { icon: Wifi, position: 'top-20 left-10', delay: 0 },
          { icon: Cpu, position: 'top-40 right-20', delay: 1 },
          { icon: Smartphone, position: 'bottom-60 left-40', delay: 2 },
          { icon: Shield, position: 'bottom-40 right-20', delay: 0.5 },
        ].map((item, index) => (
          <motion.div
            key={index}
            className={`absolute ${item.position} hidden lg:block`}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: item.delay,
              ease: 'easeInOut',
            }}
          >
            <div className="w-16 h-16 bg-waw-yellow/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <item.icon size={32} className="text-waw-yellow" />
            </div>
          </motion.div>
        ))}

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            ref={heroRef}
            variants={containerVariants}
            initial="hidden"
            animate={heroInView ? 'visible' : 'hidden'}
            className="max-w-6xl mx-auto text-center"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-block px-6 py-3 bg-waw-yellow/20 text-waw-yellow rounded-full text-lg font-semibold mb-6">
                🌐 Internet des Objets (IoT)
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Connectez le{' '}
                <span className="bg-gradient-to-r from-waw-yellow to-waw-yellow-dark bg-clip-text text-transparent">
                  Sénégal
                </span>{' '}
                à l'avenir
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                Transformez votre entreprise avec nos solutions IoT de pointe.
                De l'agriculture intelligente aux villes connectées,
                WAW TELECOM vous accompagne dans la révolution numérique.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openWhatsApp('Bonjour, je suis intéressé par vos solutions IoT')}
                className="flex items-center space-x-3 bg-waw-yellow hover:bg-waw-yellow-dark text-waw-dark font-bold px-8 py-4 rounded-xl transition-colors shadow-lg"
              >
                <MessageCircle size={24} />
                <span>Découvrir l'IoT</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => onNavigate('contact')}
                className="flex items-center space-x-3 bg-transparent border-2 border-waw-yellow text-waw-yellow hover:bg-waw-yellow hover:text-waw-dark font-bold px-8 py-4 rounded-xl transition-colors"
              >
                <Phone size={20} />
                <span>Consultation gratuite</span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '50B+', label: 'Objets connectés d\'ici 2030' },
                { value: '85%', label: 'Réduction des coûts' },
                { value: '24/7', label: 'Monitoring en temps réel' },
                { value: '99.9%', label: 'Fiabilité garantie' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-waw-yellow mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* IoT Solutions Overview */}
      <section ref={solutionsRef} className="section-padding bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={solutionsInView ? 'visible' : 'hidden'}
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-waw-yellow/20 text-waw-dark rounded-full text-sm font-semibold mb-4">
                🔧 Solutions IoT
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-waw-dark mb-6">
                L'écosystème IoT{' '}
                <span className="bg-gradient-to-r from-waw-yellow to-waw-yellow-dark bg-clip-text text-transparent">
                  complet
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Des capteurs aux tableaux de bord, nous fournissons une infrastructure IoT complète
                adaptée aux besoins du marché sénégalais.
              </p>
            </motion.div>

            {/* IoT Ecosystem Image */}
            <motion.div variants={itemVariants} className="mb-16">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-xl">
                <img
                  src="https://pub.mdpi-res.com/sensors/sensors-22-09271/article_deploy/html/images/sensors-22-09271-g001.png?1669873792"
                  alt="Écosystème IoT complet - Smart City, Agriculture, Industrie"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <div className="text-center mt-6">
                  <h3 className="text-xl font-bold text-waw-dark mb-2">Écosystème IoT Intégré</h3>
                  <p className="text-gray-600">Smart Cities • Agriculture • Industrie • Santé • Transport • Retail</p>
                </div>
              </div>
            </motion.div>

            {/* Solutions Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Settings,
                  title: 'Capteurs Intelligents',
                  description: 'Capteurs de température, humidité, mouvement, qualité de l\'air adaptés au climat tropical',
                  features: ['Résistance IP67', 'Autonomie 5+ ans', 'Transmission LoRaWAN/NB-IoT'],
                  color: 'from-blue-500 to-blue-600'
                },
                {
                  icon: Wifi,
                  title: 'Connectivité Robuste',
                  description: 'Réseaux LPWAN, LoRaWAN, NB-IoT et 4G/5G pour une couverture optimale au Sénégal',
                  features: ['Couverture nationale', 'Redondance réseau', 'Encryption AES-256'],
                  color: 'from-green-500 to-green-600'
                },
                {
                  icon: BarChart3,
                  title: 'Plateforme Analytics',
                  description: 'Tableaux de bord en temps réel, alertes intelligentes et analyses prédictives',
                  features: ['Dashboard web/mobile', 'IA intégrée', 'API REST complète'],
                  color: 'from-purple-500 to-purple-600'
                }
              ].map((solution, index) => (
                <motion.div
                  key={solution.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${solution.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <solution.icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-waw-dark mb-4">{solution.title}</h3>
                  <p className="text-gray-600 mb-6">{solution.description}</p>
                  <ul className="space-y-2">
                    {solution.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Secteurs d'Application */}
      <section ref={sectorsRef} className="section-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={sectorsInView ? 'visible' : 'hidden'}
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-waw-yellow/20 text-waw-dark rounded-full text-sm font-semibold mb-4">
                🏭 Secteurs d'Application
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-waw-dark mb-6">
                IoT pour tous les{' '}
                <span className="bg-gradient-to-r from-waw-yellow to-waw-yellow-dark bg-clip-text text-transparent">
                  secteurs
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Des solutions IoT adaptées aux défis spécifiques du Sénégal et de l'Afrique de l'Ouest.
              </p>
            </motion.div>

            {/* Sectors Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: Sprout,
                  title: 'Agriculture Intelligente',
                  description: 'Optimisez vos rendements avec l\'IoT agricole',
                  applications: ['Irrigation automatique', 'Monitoring sol/climat', 'Gestion du bétail', 'Prévision météo'],
                  image: 'https://pub.mdpi-res.com/applsci/applsci-12-03396/article_deploy/html/images/applsci-12-03396-g007.png?1648367605',
                  impact: '+40% rendement, -60% eau'
                },
                {
                  icon: Building,
                  title: 'Smart Cities',
                  description: 'Villes connectées pour un Sénégal moderne',
                  applications: ['Éclairage intelligent', 'Gestion déchets', 'Trafic urbain', 'Qualité air'],
                  image: 'https://tektelic.com/wp-content/uploads/smart_city_tektelic.png',
                  impact: '-30% consommation énergie'
                },
                {
                  icon: Factory,
                  title: 'Industrie 4.0',
                  description: 'Modernisez vos usines avec l\'IoT industriel',
                  applications: ['Maintenance prédictive', 'Contrôle qualité', 'Suivi production', 'Sécurité machines'],
                  image: 'https://processgenius.eu/wp-content/uploads/2024/06/Types-of-IoT-PG-1024x576.webp',
                  impact: '-25% pannes, +20% productivité'
                },
                {
                  icon: Home,
                  title: 'Bâtiments Intelligents',
                  description: 'Optimisation énergétique et confort',
                  applications: ['Climatisation auto', 'Sécurité avancée', 'Gestion énergie', 'Confort occupants'],
                  image: 'https://solutions.aaeon.com/wp-content/uploads/2021/06/Smartcity_info_v3.png',
                  impact: '-35% facture électricité'
                },
                {
                  icon: Car,
                  title: 'Transport & Logistique',
                  description: 'Flotte connectée et supply chain optimisée',
                  applications: ['Géolocalisation temps réel', 'Maintenance véhicules', 'Optimisation routes', 'Sécurité marchandises'],
                  image: '',
                  impact: '-20% coûts transport'
                },
                {
                  icon: Gauge,
                  title: 'Utilities & Énergie',
                  description: 'Gestion intelligente des ressources',
                  applications: ['Smart meters', 'Détection fuites', 'Load balancing', 'Énergies renouvelables'],
                  image: '',
                  impact: '-15% pertes réseau'
                }
              ].map((sector, index) => (
                <motion.div
                  key={sector.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                >
                  {sector.image && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={sector.image}
                        alt={sector.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-waw-yellow rounded-xl flex items-center justify-center">
                        <sector.icon size={24} className="text-waw-dark" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-waw-dark">{sector.title}</h3>
                        <p className="text-sm text-waw-yellow font-semibold">{sector.impact}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{sector.description}</p>
                    <ul className="space-y-2">
                      {sector.applications.map((app, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="section-padding bg-waw-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, #FFDD33 25%, transparent 25%, transparent 75%, #FFDD33 75%),
                             linear-gradient(45deg, #FFDD33 25%, transparent 25%, transparent 75%, #FFDD33 75%)`,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px'
          }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={benefitsInView ? 'visible' : 'hidden'}
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-waw-yellow/20 text-waw-yellow rounded-full text-sm font-semibold mb-4">
                💡 Avantages IoT
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Pourquoi choisir l'IoT avec{' '}
                <span className="bg-gradient-to-r from-waw-yellow to-waw-yellow-dark bg-clip-text text-transparent">
                  WAW TELECOM
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Des bénéfices concrets et mesurables pour votre entreprise au Sénégal.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: TrendingUp,
                  title: 'ROI Garanti',
                  description: 'Retour sur investissement en moyenne 18 mois',
                  metric: '300%',
                  color: 'from-green-400 to-green-500'
                },
                {
                  icon: Eye,
                  title: 'Visibilité Totale',
                  description: 'Monitoring 24/7 de tous vos équipements',
                  metric: '99.9%',
                  color: 'from-blue-400 to-blue-500'
                },
                {
                  icon: Shield,
                  title: 'Sécurité Renforcée',
                  description: 'Encryption bout-en-bout et conformité RGPD',
                  metric: '100%',
                  color: 'from-purple-400 to-purple-500'
                },
                {
                  icon: Zap,
                  title: 'Efficacité Maximale',
                  description: 'Automatisation et optimisation des processus',
                  metric: '+85%',
                  color: 'from-orange-400 to-orange-500'
                }
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="text-center group"
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <benefit.icon size={40} className="text-white" />
                  </div>
                  <div className="text-4xl font-bold text-waw-yellow mb-2">{benefit.metric}</div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="section-padding bg-gradient-to-br from-waw-yellow to-waw-yellow-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 30% 70%, rgba(51, 51, 51, 0.3) 2px, transparent 2px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={ctaInView ? 'visible' : 'hidden'}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-block px-6 py-3 bg-waw-dark/20 text-waw-dark rounded-full text-lg font-semibold mb-6">
                🚀 Prêt pour l'IoT ?
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-waw-dark mb-6">
                Connectons votre entreprise{' '}
                <span className="text-gray-800">
                  dès aujourd'hui
                </span>
              </h2>
              <p className="text-xl text-waw-dark/80 mb-8 max-w-3xl mx-auto">
                Rejoignez les 200+ entreprises sénégalaises qui ont déjà transformé
                leurs activités avec nos solutions IoT. Consultation gratuite incluse !
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openWhatsApp('Bonjour, je souhaite une consultation IoT gratuite')}
                  className="flex items-center space-x-3 bg-waw-dark hover:bg-gray-800 text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg"
                >
                  <MessageCircle size={24} />
                  <span>Consultation Gratuite</span>
                  <ArrowRight size={20} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => onNavigate('contact')}
                  className="flex items-center space-x-3 bg-transparent border-2 border-waw-dark text-waw-dark hover:bg-waw-dark hover:text-white font-bold px-8 py-4 rounded-xl transition-colors"
                >
                  <Phone size={20} />
                  <span>Nous contacter</span>
                </motion.button>
              </div>

              {/* Contact Info */}
              <div className="grid md:grid-cols-3 gap-6 text-waw-dark/80">
                <div className="flex items-center justify-center space-x-2">
                  <Phone size={18} />
                  <span className="font-medium">+221 33 860 19 29</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <MessageCircle size={18} />
                  <span className="font-medium">+221 76 929 17 17</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Mail size={18} />
                  <span className="font-medium">iot@wawtelecom.com</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default IoTPage;
