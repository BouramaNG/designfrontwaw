import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Network,
  Cloud,
  Shield,
  Zap,
  Globe,
  Database,
  Cpu,
  Lock,
  ArrowRight,
  CheckCircle,
  Building,
  Router
} from 'lucide-react';

const ServicesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      id: 'connectivite',
      icon: Network,
      title: 'Connectivité',
      subtitle: 'Solutions réseau sécurisées',
      description: 'Infrastructure réseau privée et performante pour votre entreprise avec sécurité renforcée.',
      features: [
        'Connexions privées dédiées',
        'Bande passante garantie',
        'Redondance automatique',
        'Monitoring 24/7'
      ],
      color: 'from-waw-yellow to-waw-yellow-dark',
      bgColor: 'bg-waw-yellow/10'
    },
    {
      id: 'cloud',
      icon: Cloud,
      title: 'Cloud',
      subtitle: 'Infrastructure cloud évolutive',
      description: 'Solutions cloud flexibles et sécurisées adaptées aux besoins de votre entreprise.',
      features: [
        'Stockage sécurisé illimité',
        'Sauvegarde automatique',
        'Accès multi-plateforme',
        'API intégrées'
      ],
      color: 'from-waw-dark to-gray-800',
      bgColor: 'bg-gray-50'
    },
    {
      id: 'iot',
      icon: Cpu,
      title: 'IoT',
      subtitle: 'Internet des objets connectés',
      description: 'Connectez et gérez vos objets intelligents avec notre plateforme IoT avancée.',
      features: [
        'Gestion centralisée',
        'Capteurs intelligents',
        'Analytics en temps réel',
        'Évolutivité massive'
      ],
      color: 'from-waw-yellow to-waw-yellow-dark',
      bgColor: 'bg-waw-yellow/5'
    },
    {
      id: 'peering',
      icon: Router,
      title: 'DIA Direct Peering',
      subtitle: 'Peering direct haute performance',
      description: 'Connexions directes aux principaux opérateurs pour une performance optimale.',
      features: [
        'Latence ultra-faible',
        'Débit garanti',
        'Peering direct',
        'QoS prioritaire'
      ],
      color: 'from-waw-dark to-gray-800',
      bgColor: 'bg-gray-100'
    }
  ];

  const stats = [
    { icon: Building, value: '500+', label: 'Entreprises clientes' },
    { icon: Globe, value: '99.9%', label: 'Uptime garanti' },
    { icon: Shield, value: '24/7', label: 'Support expert' },
    { icon: Zap, value: '<10ms', label: 'Latence moyenne' }
  ];

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

  return (
    <section id="services" className="section-padding bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-r from-waw-yellow/5 to-waw-yellow-dark/5 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-r from-waw-dark/5 to-gray-600/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.span
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              className="inline-block px-4 py-2 bg-waw-yellow/20 text-waw-dark rounded-full text-sm font-semibold mb-4"
            >
              🏢 Services Entreprise
            </motion.span>

            <h2 className="text-4xl lg:text-6xl font-display font-bold text-waw-dark mb-6">
              Infrastructure{' '}
              <span className="gradient-text">numérique</span>{' '}
              évolutive
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Bénéficiez d'une infrastructure numérique évolutive et sécurisée,
              conçue pour répondre aux exigences de l'ère numérique.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-waw-yellow to-waw-yellow-dark rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={24} className="text-waw-dark" />
                </div>
                <h3 className="text-3xl font-bold text-waw-dark mb-2">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Services Grid */}
          <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`${service.bgColor} rounded-2xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden`}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <div className={`w-full h-full bg-gradient-to-br ${service.color} rounded-full blur-xl`} />
                </div>

                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <service.icon size={28} className="text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-waw-dark mb-2">{service.title}</h3>
                  <p className="text-waw-dark/70 font-medium mb-4">{service.subtitle}</p>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                  <div className="space-y-3 mb-6">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-3">
                        <CheckCircle size={16} className="text-waw-yellow flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 text-waw-dark font-semibold hover:text-waw-yellow-dark transition-colors group"
                  >
                    <span>En savoir plus</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="text-center bg-gradient-to-r from-waw-dark to-gray-800 rounded-2xl p-12 text-white relative overflow-hidden"
          >
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

            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">
                Prêt à transformer votre infrastructure ?
              </h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Nos experts sont là pour vous accompagner dans votre transformation
                numérique avec des solutions sur mesure.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-waw-yellow text-waw-dark font-semibold px-8 py-4 rounded-lg hover:bg-waw-yellow-dark transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Contactez nos experts</span>
                  <ArrowRight size={20} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-waw-dark transition-all flex items-center justify-center space-x-2"
                >
                  <Database size={20} />
                  <span>Voir nos solutions</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
