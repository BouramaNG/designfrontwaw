import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Users,
  Award,
  Target,
  Heart,
  Lightbulb,
  Shield,
  Globe,
  Zap,
  Building,
  Calendar,
  MapPin,
  TrendingUp
} from 'lucide-react';

interface AboutSectionProps {
  onNavigate: (page: string) => void;
}

const AboutSection = ({ onNavigate }: AboutSectionProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Nous repoussons constamment les limites technologiques pour offrir des solutions avant-gardistes.',
      color: 'from-waw-yellow to-waw-yellow-dark'
    },
    {
      icon: Shield,
      title: 'Sécurité',
      description: 'La protection de vos données et la sécurité de vos communications sont notre priorité absolue.',
      color: 'from-waw-dark to-gray-800'
    },
    {
      icon: Heart,
      title: 'Excellence',
      description: 'Nous nous engageons à fournir un service d\'exception et un support client de qualité supérieure.',
      color: 'from-waw-yellow to-waw-yellow-dark'
    },
    {
      icon: Globe,
      title: 'Connectivité',
      description: 'Nous connectons l\'Afrique au monde entier avec des solutions télécoms de dernière génération.',
      color: 'from-waw-dark to-gray-800'
    }
  ];

  const timeline = [
    {
      year: '2016',
      title: 'Fondation de WAW TELECOM',
      description: 'Création de l\'entreprise à Dakar avec la vision de transformer les télécommunications au Sénégal.',
      icon: Building
    },
    {
      year: '2018',
      title: 'Premiers services cloud',
      description: 'Lancement de nos solutions cloud sécurisées pour les entreprises sénégalaises.',
      icon: Shield
    },
    {
      year: '2020',
      title: 'Expansion régionale',
      description: 'Extension de nos services de connectivité dans plusieurs pays d\'Afrique de l\'Ouest.',
      icon: Globe
    },
    {
      year: '2025',
      title: 'eSIM & Innovation',
      description: 'Lancement révolutionnaire de nos services eSIM Travel, incluant le forfait Umrah.',
      icon: Zap
    },
    {
      year: '2025',
      title: 'Leader Tech',
      description: 'Position de leader dans l\'innovation télécom avec plus de 500 entreprises clientes.',
      icon: Award
    }
  ];

  const stats = [
    { icon: Users, value: '500+', label: 'Entreprises clientes', color: 'text-waw-yellow' },
    { icon: Globe, value: '50+', label: 'Pays couverts', color: 'text-waw-yellow' },
    { icon: Award, value: '6', label: 'Années d\'expérience', color: 'text-waw-yellow' },
    { icon: TrendingUp, value: '99.9%', label: 'Disponibilité', color: 'text-waw-yellow' }
  ];

  const team = [
    {
      name: 'Direction Générale',
      role: 'Leadership & Vision',
      description: 'Une équipe dirigeante expérimentée avec plus de 20 ans d\'expérience dans les télécoms.',
      icon: Target
    },
    {
      name: 'Équipe Technique',
      role: 'Innovation & Développement',
      description: 'Des ingénieurs passionnés qui développent nos solutions technologiques de pointe.',
      icon: Lightbulb
    },
    {
      name: 'Support Client',
      role: 'Service 24/7',
      description: 'Une équipe dédiée pour vous accompagner à tout moment dans vos projets.',
      icon: Heart
    }
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
    <section id="about" className="section-padding bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 40,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-waw-yellow/3 to-waw-yellow-dark/3 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 35,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-waw-dark/3 to-gray-600/3 rounded-full blur-3xl"
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
              🏢 À propos de nous
            </motion.span>

            <h2 className="text-4xl lg:text-6xl font-display font-bold text-waw-dark mb-6">
              Ensemble, façonnons{' '}
              <span className="gradient-text">l'avenir digital</span>
            </h2>

            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Depuis 2018, WAW TELECOM accompagne les entreprises sénégalaises et africaines
              dans leur transformation numérique en intégrant des technologies essentielles :
              connectivité, cloud et IoT.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-waw-yellow to-waw-yellow-dark rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={28} className="text-waw-dark" />
                </div>
                <h3 className={`text-4xl font-bold mb-2 ${stat.color}`}>{stat.value}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Notre Histoire */}
          <motion.div variants={itemVariants} className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-waw-dark mb-4">Notre Histoire</h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
                Découvrez le parcours de WAW TELECOM, de startup innovante à leader
                des télécommunications au Sénégal.
              </p>
              <div onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => onNavigate('about')}
                  className="bg-waw-yellow hover:bg-waw-yellow-dark text-waw-dark px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all mx-auto"
                >
                  <span>En savoir plus</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-waw-yellow to-waw-yellow-dark rounded-full" />

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                        <div className={`flex items-center space-x-3 mb-4 ${index % 2 === 0 ? 'justify-end' : ''}`}>
                          <div className={`w-12 h-12 bg-gradient-to-br from-waw-yellow to-waw-yellow-dark rounded-xl flex items-center justify-center ${index % 2 === 0 ? 'order-2' : ''}`}>
                            <item.icon size={20} className="text-waw-dark" />
                          </div>
                          <span className="text-2xl font-bold text-waw-dark">{item.year}</span>
                        </div>
                        <h4 className="text-xl font-bold text-waw-dark mb-2">{item.title}</h4>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>

                    {/* Center point */}
                    <div className="w-6 h-6 bg-waw-yellow border-4 border-white rounded-full shadow-lg z-10" />

                    <div className="w-1/2" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Nos Valeurs */}
          <motion.div variants={itemVariants} className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-waw-dark mb-4">Nos Valeurs</h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Les principes qui guident notre action et notre engagement envers nos clients.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <motion.div
                  key={value.title}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group text-center border border-gray-100"
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                    <value.icon size={32} className="text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-waw-dark mb-4">{value.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Notre Équipe */}
          <motion.div variants={itemVariants} className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-waw-dark mb-4">Notre Équipe</h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Une équipe passionnée et expérimentée au service de votre réussite digitale.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {team.map((member) => (
                <motion.div
                  key={member.name}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-gradient-to-br from-waw-yellow/5 to-waw-yellow-dark/5 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-waw-yellow to-waw-yellow-dark rounded-xl flex items-center justify-center mb-6">
                    <member.icon size={28} className="text-waw-dark" />
                  </div>
                  <h4 className="text-xl font-bold text-waw-dark mb-2">{member.name}</h4>
                  <p className="text-waw-dark/70 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed">{member.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Notre Mission */}
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

            <div className="relative z-10 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-16 h-16 bg-waw-yellow rounded-xl flex items-center justify-center">
                  <Target size={32} className="text-waw-dark" />
                </div>
              </div>

              <h3 className="text-3xl font-bold mb-6">Notre Mission</h3>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                "Démocratiser l'accès aux technologies de pointe en Afrique et
                accompagner chaque entreprise dans sa transformation numérique
                avec des solutions innovantes, sécurisées et performantes."
              </p>

              <div className="flex items-center justify-center space-x-2 text-waw-yellow">
                <MapPin size={20} />
                <span className="font-medium">Dakar, Sénégal</span>
                <span className="mx-2">•</span>
                <Calendar size={20} />
                <span className="font-medium">Depuis 2018</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
