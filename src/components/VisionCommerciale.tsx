import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Rocket, Handshake } from 'lucide-react';

const VisionCommerciale = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={container}
          className="text-center mb-16"
        >
          <motion.span 
            variants={item}
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-waw-yellow/10 text-waw-yellow-dark mb-6"
          >
            Notre Vision Commerciale
          </motion.span>

          <motion.h2 
            variants={item}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Connecter pour faire grandir
          </motion.h2>

          <motion.p 
            variants={item}
            className="mx-auto max-w-2xl text-xl text-gray-600 leading-relaxed"
          >
            Chez WAW TELECOM, nous croyons qu'une connectivité performante n'a de valeur que si elle sert la croissance de nos clients.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={container}
        >
          <motion.div 
            variants={item}
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Proximité et accompagnement</h3>
            <p className="text-gray-600">Un service client réactif et à l'écoute, disponible pour répondre à vos besoins à chaque étape.</p>
          </motion.div>

          <motion.div 
            variants={item}
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center mb-6">
              <Rocket className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Performance et innovation</h3>
            <p className="text-gray-600">Des solutions toujours à la pointe (fibre, eSIM, IoT, Cloud) pour une connectivité optimale.</p>
          </motion.div>

          <motion.div 
            variants={item}
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-xl bg-amber-50 flex items-center justify-center mb-6">
              <Handshake className="w-7 h-7 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Partenariat durable</h3>
            <p className="text-gray-600">Une relation gagnant-gagnant basée sur la confiance et la transparence avec nos clients et partenaires.</p>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={item}
          className="bg-gradient-to-r from-waw-dark to-waw-darker rounded-2xl p-8 text-white"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Notre objectif</h3>
            <p className="text-xl text-waw-light/90">
              Renforcer le leadership interne et améliorer l'efficacité commerciale de nos clients en les connectant au monde.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionCommerciale;
