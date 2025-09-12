import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Wifi, Globe, Server, Clock } from 'lucide-react';

const NosInfrastructures = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      } as any,
    },
  } as const;

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      } as any,
    },
  } as const;

  const infrastructures = [
    {
      icon: Wifi,
      title: 'Réseau Fibre Propriétaire',
      description: 'Un réseau haute performance couvrant Dakar avec un backbone régional pour une fiabilité maximale.',
      color: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: Globe,
      title: 'Accès aux Câbles Sous-Marins',
      description: 'Connectivité internationale robuste via les câbles ACE & SAT-3 pour une latence minimale.',
      color: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      icon: Server,
      title: 'Datacenters Stratégiques',
      description: 'Présence dans les points névralgiques (Diamniadio, AIBD, Onyx) pour une redondance optimale.',
      color: 'bg-amber-50',
      iconColor: 'text-amber-600'
    },
    {
      icon: Clock,
      title: 'Supervision 24/7',
      description: 'Surveillance continue et support expert pour garantir une disponibilité maximale.',
      color: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={container}
          className="text-center mb-16"
        >
          <motion.span 
            variants={item}
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-50 text-blue-600 mb-6"
          >
            Notre Infrastructure
          </motion.span>

          <motion.h2 
            variants={item}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Une puissance technologique à votre service
          </motion.h2>

          <motion.p 
            variants={item}
            className="mx-auto max-w-2xl text-xl text-gray-600 leading-relaxed"
          >
            Découvrez les fondations solides qui soutiennent notre engagement envers l'excellence et la performance.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={container}
        >
          {infrastructures.map((infra, index) => (
            <motion.div 
              key={index}
              variants={item}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col"
            >
              <div className={`w-12 h-12 rounded-lg ${infra.color} flex items-center justify-center mb-4`}>
                <infra.icon className={`w-6 h-6 ${infra.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{infra.title}</h3>
              <p className="text-gray-600 flex-grow">{infra.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          variants={item}
          className="bg-gradient-to-r from-waw-dark to-waw-darker rounded-2xl p-8 text-white"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">Support Expert 24/7</h3>
              <p className="text-waw-light/90 mb-4">
                Notre équipe d'experts est disponible en permanence pour assurer la continuité de vos services et répondre à vos besoins à tout moment.
              </p>
              <div className="flex items-center text-waw-yellow font-medium">
                <Clock className="w-5 h-5 mr-2" />
                Disponible 24h/24 et 7j/7
              </div>
            </div>
            <div className="w-16 h-16 rounded-xl bg-waw-yellow/20 flex items-center justify-center flex-shrink-0">
              <Clock className="w-8 h-8 text-waw-yellow" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NosInfrastructures;
