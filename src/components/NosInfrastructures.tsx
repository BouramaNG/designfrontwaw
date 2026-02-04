import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Wifi,
  Globe,
  Server,
  Clock,
  Activity,
  CheckCircle,
  ArrowRight,
  BarChart3
} from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

const NosInfrastructures = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });


  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  } as const;

  const item = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  } as const;

  const infrastructures = [
    {
      icon: Wifi,
      title: 'Réseau Fibre Propriétaire',
      description: 'Un backbone fibre performant sur Dakar et la région, optimisé pour les entreprises avec une bande passante dédiée et symétrique.',
      color: 'from-amber-400 to-yellow-500',
      shadowColor: 'shadow-amber-500/20',
      bgAccent: 'bg-amber-500/10',
      borderAccent: 'border-amber-500/20',
      features: ['Bande passante dédiée', 'Latence < 5ms', 'SLA 99.9%'],
      metric: '10 Gbps',
      metricLabel: 'Capacité max'
    },
    {
      icon: Globe,
      title: 'Câbles Sous-Marins',
      description: 'Interconnexions internationales via les câbles ACE et SAT-3 pour une connectivité mondiale à latence minimale.',
      color: 'from-blue-400 to-indigo-500',
      shadowColor: 'shadow-blue-500/20',
      bgAccent: 'bg-blue-500/10',
      borderAccent: 'border-blue-500/20',
      features: ['Redondance multi-câbles', 'Peering international', 'Routes optimisées'],
      metric: 'Multi-câbles',
      metricLabel: 'Connectivité'
    },
    {
      icon: Server,
      title: 'Datacenters Sécurisés',
      description: 'Sites stratégiques redondants avec alimentation secourue, climatisation N+1 et sécurité physique 24/7.',
      color: 'from-emerald-400 to-teal-500',
      shadowColor: 'shadow-emerald-500/20',
      bgAccent: 'bg-emerald-500/10',
      borderAccent: 'border-emerald-500/20',
      features: ['Tier III certifié', 'Alimentation secourue', 'Accès biométrique'],
      metric: '99.99%',
      metricLabel: 'Uptime garanti'
    },
    {
      icon: Clock,
      title: 'Supervision NOC 24/7',
      description: 'Monitoring proactif, alerting intelligent et équipe dédiée pour une surveillance continue de votre infrastructure.',
      color: 'from-violet-400 to-purple-500',
      shadowColor: 'shadow-violet-500/20',
      bgAccent: 'bg-violet-500/10',
      borderAccent: 'border-violet-500/20',
      features: ['Alerting temps réel', 'Intervention < 15min', 'Rapports mensuels'],
      metric: '< 15min',
      metricLabel: 'Temps intervention'
    }
  ];

  const AUTO_CYCLE = 5000;

  const handleCardClick = useCallback((index: number) => {
    setActiveCard(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000);
  }, []);

  useEffect(() => {
    if (isPaused || !inView) return;
    const timer = setInterval(() => {
      setActiveCard(prev => (prev + 1) % infrastructures.length);
    }, AUTO_CYCLE);
    return () => clearInterval(timer);
  }, [isPaused, inView, infrastructures.length]);

  const activeInfra = infrastructures[activeCard];
  const ActiveIcon = activeInfra.icon;

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#0a0a1a] via-[#0d1528] to-[#0a0a1a] text-white py-20">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        {/* Gradient orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl"
        />
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{ left: `${10 + i * 12}%`, top: `${15 + (i % 3) * 30}%` }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={container}
          className="text-center mb-14"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-white/5 text-amber-400 border border-white/10 backdrop-blur-sm"
          >
            <Server size={14} />
            NOS INFRASTRUCTURES
          </motion.span>

          <motion.h2
            variants={item}
            className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
          >
            L'infrastructure au c&oelig;ur{' '}
            <br className="hidden sm:block" />
            de l'
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              expérience
            </span>
          </motion.h2>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 leading-relaxed"
          >
            Une architecture pensée pour la résilience, la performance et la sécurité.
            Conçue pour accompagner vos charges critiques.
          </motion.p>
        </motion.div>

        {/* Main Interactive Section */}
        <motion.div
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={container}
          className="grid lg:grid-cols-5 gap-8"
        >
          {/* Left - Cards selector (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            {infrastructures.map((infra, i) => {
              const Icon = infra.icon;
              const isActive = activeCard === i;

              return (
                <motion.div
                  key={i}
                  variants={item}
                  onClick={() => handleCardClick(i)}
                  className={`relative cursor-pointer rounded-2xl p-5 transition-all duration-500 border ${
                    isActive
                      ? `bg-white/[0.06] ${infra.borderAccent} shadow-lg ${infra.shadowColor}`
                      : 'bg-white/[0.02] border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08]'
                  }`}
                >
                  {/* Active indicator line */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={`absolute left-0 top-3 bottom-3 w-1 rounded-full bg-gradient-to-b ${infra.color}`}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="flex items-center gap-4 pl-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                      isActive ? `bg-gradient-to-br ${infra.color} shadow-lg ${infra.shadowColor}` : 'bg-white/[0.06]'
                    }`}>
                      <Icon size={22} className={isActive ? 'text-white' : 'text-gray-400'} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold text-lg transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-300'}`}>
                        {infra.title}
                      </h3>
                      <p className={`text-sm mt-0.5 transition-colors duration-300 ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                        {infra.metricLabel}: <span className="font-semibold text-white/80">{infra.metric}</span>
                      </p>
                    </div>
                    <ArrowRight size={18} className={`transition-all duration-300 ${isActive ? 'text-white opacity-100 translate-x-0' : 'text-gray-600 opacity-0 -translate-x-2'}`} />
                  </div>

                  {/* Progress bar for active card */}
                  {isActive && !isPaused && (
                    <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${infra.color} rounded-full`}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: AUTO_CYCLE / 1000, ease: 'linear' }}
                        key={`progress-${activeCard}`}
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Right - Detail Panel (3 cols) */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCard}
                initial={{ opacity: 0, x: 30, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`relative rounded-3xl p-8 lg:p-10 border ${activeInfra.borderAccent} bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm h-full`}
              >
                {/* Background glow */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${activeInfra.color} opacity-[0.06] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4`} />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${activeInfra.bgAccent} ${activeInfra.borderAccent} border mb-4`}>
                        <ActiveIcon size={12} />
                        {activeInfra.metricLabel}
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold">{activeInfra.title}</h3>
                    </div>
                    <div className="text-right">
                      <motion.p
                        key={`metric-${activeCard}`}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className={`text-3xl lg:text-4xl font-black bg-gradient-to-r ${activeInfra.color} bg-clip-text text-transparent`}
                      >
                        {activeInfra.metric}
                      </motion.p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    {activeInfra.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {activeInfra.features.map((feature, fi) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + fi * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${activeInfra.color} flex items-center justify-center flex-shrink-0`}>
                          <CheckCircle size={13} className="text-white" />
                        </div>
                        <span className="text-gray-200 font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Visual illustration */}
                  <div className={`rounded-2xl p-6 border ${activeInfra.borderAccent} bg-black/30`}>
                    <div className="flex items-center justify-between">
                      {/* Live status simulation */}
                      <div className="flex items-center gap-3">
                        <motion.div
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          className={`w-3 h-3 rounded-full bg-gradient-to-r ${activeInfra.color}`}
                        />
                        <span className="text-sm font-medium text-gray-300">Status: Opérationnel</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Activity size={12} />
                        <span>Live monitoring</span>
                      </div>
                    </div>

                    {/* Animated bars */}
                    <div className="mt-5 flex items-end gap-1.5 h-16">
                      {[...Array(20)].map((_, bi) => (
                        <motion.div
                          key={`bar-${bi}`}
                          className={`flex-1 rounded-sm bg-gradient-to-t ${activeInfra.color} opacity-60`}
                          animate={{
                            height: [`${20 + Math.random() * 40}%`, `${30 + Math.random() * 60}%`, `${20 + Math.random() * 40}%`],
                          }}
                          transition={{
                            duration: 1.5 + Math.random(),
                            repeat: Number.POSITIVE_INFINITY,
                            ease: 'easeInOut',
                            delay: bi * 0.08,
                          }}
                          style={{ minHeight: '8px' }}
                        />
                      ))}
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                      <span>Performance réseau</span>
                      <div className="flex items-center gap-1">
                        <BarChart3 size={10} />
                        <span>Temps réel</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>



      </div>
    </section>
  );
};

export default NosInfrastructures;
