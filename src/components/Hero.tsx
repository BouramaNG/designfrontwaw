import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Globe, Smartphone } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const Hero = () => {
  const [ref, inView] = useInView({
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

  const floatingIcons = [
    { icon: Zap, position: 'top-20 left-10', delay: 0, id: 'zap' },
    { icon: Shield, position: 'top-40 right-20', delay: 1, id: 'shield' },
    { icon: Globe, position: 'bottom-40 left-20', delay: 2, id: 'globe' },
    { icon: Smartphone, position: 'bottom-20 right-10', delay: 0.5, id: 'smartphone' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-waw-yellow/10" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Geometric Shapes */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
          className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-waw-yellow/20 to-waw-yellow-dark/20 rounded-full blur-xl"
        />

        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
          className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-waw-dark/10 to-waw-dark/20 rounded-full blur-xl"
        />

        {/* Floating Icons */}
        {floatingIcons.map((item) => (
          <motion.div
            key={item.id}
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
            <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg flex items-center justify-center">
              <item.icon size={24} className="text-waw-yellow-dark" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="inline-block px-4 py-2 bg-waw-yellow/20 text-waw-dark rounded-full text-sm font-semibold"
              >
                🚀 Innovation Télécom
              </motion.span>

              <h1 className="text-5xl lg:text-7xl font-display font-bold text-waw-dark leading-tight">
                L'efficacité dans la{' '}
                <span className="gradient-text">synergie</span>
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 leading-relaxed"
            >
              Tout fonctionne mieux quand tout fonctionne ensemble.
              Accompagnons votre transformation numérique avec nos solutions
              <span className="text-waw-yellow-dark font-semibold"> eSIM, connectivité et cloud</span>.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center justify-center space-x-2 text-lg px-8 py-4 group"
              >
                <span>Découvrir nos solutions</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary flex items-center justify-center space-x-2 text-lg px-8 py-4"
              >
                <Smartphone size={20} />
                <span>Obtenir eSIM Travel</span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              {[
                { value: '50+', label: 'Pays couverts', id: 'pays' },
                { value: '24/7', label: 'Support client', id: 'support' },
                { value: '99.9%', label: 'Disponibilité', id: 'disponibilite' },
              ].map((stat) => (
                <motion.div
                  key={stat.id}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <h3 className="text-3xl font-bold text-waw-dark">{stat.value}</h3>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - eSIM Visual */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="relative">
              {/* Main Phone Mockup */}
              <motion.div
                animate={{
                  y: [-20, 20, -20],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'easeInOut',
                }}
                className="relative z-10 mx-auto w-80 h-96 bg-gradient-to-br from-waw-dark to-gray-800 rounded-[3rem] p-4 shadow-2xl"
              >
                <div className="w-full h-full bg-gradient-to-br from-waw-yellow to-waw-yellow-dark rounded-[2.5rem] p-6 flex flex-col items-center justify-center text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
                    className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg"
                  >
                    <Smartphone size={32} className="text-waw-dark" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-waw-dark mb-2">eSIM Travel</h3>
                  <p className="text-waw-dark/80 text-sm mb-4">Connexion mondiale instantanée</p>

                  <div className="space-y-2 w-full">
                    <div className="h-2 bg-white/30 rounded-full">
                      <motion.div
                        className="h-full bg-white rounded-full"
                        animate={{ width: ['0%', '100%'] }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                      />
                    </div>
                    <p className="text-xs text-waw-dark/70">Activation en cours...</p>
                  </div>
                </div>
              </motion.div>

              {/* Background Elements */}
              <div className="absolute -inset-10 bg-gradient-to-r from-waw-yellow/20 to-waw-yellow-dark/20 rounded-full blur-3xl opacity-50" />

              {/* Floating Cards */}
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
                  <div className="w-3 h-3 bg-waw-yellow rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-gray-700">Connecté</span>
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
                  <Globe size={16} className="text-waw-yellow-dark" />
                  <span className="text-sm font-medium text-gray-700">Monde entier</span>
                </div>
              </motion.div>
            </div>
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
        <div className="w-6 h-10 border-2 border-waw-yellow-dark rounded-full flex justify-center">
          <div className="w-1 h-3 bg-waw-yellow-dark rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
