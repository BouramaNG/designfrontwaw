import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Wifi, Globe, Server, Clock } from 'lucide-react';
import { useRef, useState } from 'react';

const NosInfrastructures = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const [hovered, setHovered] = useState<number | null>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 });

  const container = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  } as const;

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  } as const;

  const infrastructures = [
    {
      icon: Wifi,
      title: 'Réseau Fibre Propriétaire',
      description: 'Un backbone fibre performant sur Dakar et la région, optimisé pour les entreprises.'
    },
    {
      icon: Globe,
      title: 'Accès aux Câbles Sous-Marins',
      description: 'Interconnexions internationales (ACE, SAT-3) pour une latence minimale.'
    },
    {
      icon: Server,
      title: 'Datacenters Stratégiques',
      description: 'Sites redondants et sécurisés pour haute disponibilité et sauvegardes.'
    },
    {
      icon: Clock,
      title: 'Supervision 24/7',
      description: 'Monitoring, alerting et support proactif 24/7.'
    }
  ];

  return (
    <section ref={containerRef} className="relative isolate overflow-hidden bg-[#041024] text-white py-28">
      {/* Particules / subtle background */}
      <div className="absolute inset-0 -z-10">
        <svg className="w-full h-full" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0%" stopColor="#07203a" />
              <stop offset="100%" stopColor="#000" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#g1)" />
        </svg>
        <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
          {/* floating orbs */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.25 + Math.random() * 0.45, 0] }}
              transition={{ duration: 6 + Math.random() * 6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              className={`absolute rounded-full bg-gradient-to-r from-[#ffd84d] to-[#ff7a18] blur-2xl w-${6 + (i % 5)} h-${6 + (i % 5)} opacity-40`}
            />
          ))}
        </div>
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div style={{ y: yParallax }} initial="hidden" animate={inView ? 'show' : 'hidden'} variants={container} className="text-center mb-16">
          <motion.span variants={item} className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-yellow-500/10 text-yellow-400 border border-yellow-800/20">
            NOS INFRASTRUCTURES
          </motion.span>

          <motion.h2 variants={item} className="mt-6 text-4xl sm:text-5xl font-extrabold leading-tight">
            L'infrastructure au coeur de l'expérience
          </motion.h2>

          <motion.p variants={item} className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Une architecture pensée pour la résilience, la latence faible et la sécurité, conçue pour accompagner vos charges critiques.
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={container} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {infrastructures.map((infra, i) => {
            const Icon = infra.icon as any;
            return (
              <motion.div
                key={i}
                variants={item}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="relative rounded-2xl overflow-hidden p-6 bg-gradient-to-br from-[#062035]/60 to-[#071423]/60 border border-white/6 hover:scale-[1.02] transition-transform duration-400"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/10 to-yellow-500/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg bg-white/6 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-semibold">{infra.title}</h3>
                  </div>

                  <p className="mt-4 text-gray-300 flex-grow">{infra.description}</p>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-yellow-300 font-medium">En savoir plus</div>
                    <div className="text-xs text-gray-400">Service critique</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }} className="mt-12 rounded-2xl p-8 bg-gradient-to-r from-[#071428] to-[#021018] border border-white/6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h4 className="text-xl font-semibold">Support & Surveillance</h4>
              <p className="mt-2 text-gray-300">Equipe dédiée de NOC, monitoring 24/7, et procédures de restauration validées pour minimiser les interruptions.</p>
            </div>
            <div className="flex items-center gap-4">
              <Clock className="w-6 h-6 text-yellow-400" />
              <div className="text-sm text-gray-300">Disponible 24/7</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NosInfrastructures;
