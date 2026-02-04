import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Globe,
  Users,
  Zap,
  Shield,
  TrendingUp,
  ArrowRight,
  Play,
  CheckCircle,
  Star,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Award,
  Wifi,
  Cloud,
  Smartphone,
  Mail,
  Send,
  Building,
  Cpu
} from 'lucide-react';

interface HomePage2Props {
  onNavigate: (page: 'home' | 'connectivite' | 'cloud' | 'travel' | 'iot' | 'about' | 'contact') => void;
}

const HomePage2 = ({ onNavigate }: HomePage2Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [contactRef, contactInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const handleWhatsAppConsultation = () => {
    setShowConsultationModal(false);
    const phoneNumber = '221769291717';
    const message = encodeURIComponent('Bonjour, je souhaite être contacté par un conseiller WAW TELECOM pour discuter de mes besoins en télécommunications.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleEmailConsultation = () => {
    setShowConsultationModal(false);
    const subject = encodeURIComponent('Demande de consultation - WAW TELECOM');
    const body = encodeURIComponent(`Bonjour,

Je souhaite être contacté par un conseiller WAW TELECOM pour discuter de mes besoins en télécommunications.

Informations de contact:
- Nom:
- Entreprise:
- Téléphone:
- Meilleur moment pour vous contacter:

Services qui m'intéressent:
□ Connectivité Entreprise
□ Solutions Cloud
□ eSIM Travel
□ Infrastructure Réseau

Message:


Cordialement,`);

    window.open(`mailto:serviceclient@wawtelecom.com?subject=${subject}&body=${body}`, '_blank');
  };

  const openConsultationModal = () => {
    setShowConsultationModal(true);
  };

  const heroSlides = [
    {
      title: "La connectivité intelligente au service de vos ambitions",
      subtitle: "Ensemble, façonnons l'avenir digital de votre entreprise",
      description: "Grâce à nos technologies de pointe — fibre optique, cloud souverain, eSIM et IoT — nous vous connectons au monde avec performance, sécurité et simplicité.",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=80",
      imageType: "single"
    },
    {
      title: "Nos solutions complètes pour votre réussite",
      subtitle: "De la connectivité au cloud, tout pour votre entreprise",
      description: "Découvrez notre gamme complète de services professionnels : connectivité fibre, solutions cloud, eSIM international, et infrastructure IoT adaptés à vos besoins.",
      images: [
        "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80",
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80"
      ],
      imageType: "collage"
    },
    {
      title: "Restez connecté partout dans le monde",
      subtitle: "L'eSIM nouvelle génération pour vos voyages",
      description: "Voyagez sans frontières avec notre eSIM internationale. Activation instantanée, couverture mondiale, et tarifs transparents pour rester connecté où que vous soyez.",
      image: "/src/assets/images/slide1.png",
      imageType: "single"
    }
  ];

  const services = [
    {
      icon: Wifi,
      title: "Connectivité",
      description: "Solutions réseau complètes pour entreprises et particuliers.",
      image: "https://wawtelecom.com/connectivite2.jpg",
      features: [
        "Internet haut débit",
        "SD-WAN",
        "VPN/MPLS"
      ]
    },
    {
      icon: Cloud,
      title: "Cloud & Hébergement",
      description: "Solutions d'hébergement adaptées à tous les besoins.",
      image: "https://wawtelecom.com/cloude3.webp",
      features: [
        "VPS",
        "Dédié",
        "Mutualisé"
      ]
    },
    {
      icon: Cpu,
      title: "IoT & Objets connectés",
      description: "Solutions innovantes pour l'industrie 4.0.",
      image: "https://tse2.mm.bing.net/th/id/OIP.oImQCErImb0pTF-wkRmnowHaD4?rs=1&pid=ImgDetMain&o=7&rm=3",
      features: [
        "Visibilité",
        "Efficacité",
        "Automatisation"
      ]
    },
    {
      icon: Smartphone,
      title: "eSIM & Travel",
      description: "Connectivité mondiale simple et abordable.",
      image: "https://wawtelecom.com/esim20.jpg",
      features: [
        "Dès 3 000 FCFA",
        "Couverture mondiale",
        "Activation instantanée"
      ]
    },
    {
      icon: Building,
      title: "Opérateurs & Institutions",
      description: "Solutions sur mesure pour les professionnels.",
      image: "https://wawtelecom.com/operateurs.jpg",
      features: [
        "Backbone",
        "Sécurité",
        "Santé & Éducation"
      ]
    }
  ];



  // Auto-slide pour le hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section avec Slider */}
      <section ref={heroRef} className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">

        <div className="container-custom relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            >
              {/* Contenu Texte - Gauche */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <motion.h1
                    className="text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-4 leading-tight text-waw-dark"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {heroSlides[currentSlide].title}
                  </motion.h1>
                  <motion.h2
                    className="text-2xl lg:text-3xl font-light text-gray-600 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {heroSlides[currentSlide].subtitle}
                  </motion.h2>
                </div>

                <motion.p
                  className="text-lg lg:text-xl leading-relaxed text-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {heroSlides[currentSlide].description}
                </motion.p>

                {/* Boutons d'action */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <motion.button
                    onClick={() => onNavigate('contact')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-waw-yellow hover:bg-yellow-400 text-waw-dark px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-xl"
                  >
                    <Smartphone size={20} />
                    <span>Nous contacter</span>
                  </motion.button>
                  <motion.button
                    onClick={openConsultationModal}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-waw-dark hover:bg-waw-dark text-waw-dark hover:text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 transition-all"
                  >
                    <MessageCircle size={20} />
                    <span>Consultation gratuite</span>
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Images - Droite */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                {heroSlides[currentSlide].imageType === 'single' ? (
                  /* Image unique */
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="relative rounded-3xl overflow-hidden shadow-2xl"
                  >
                    <img
                      src={heroSlides[currentSlide].image}
                      alt={heroSlides[currentSlide].title}
                      className="w-full h-[500px] lg:h-[600px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-waw-dark/20 to-transparent" />
                  </motion.div>
                ) : (
                  /* Collage d'images */
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    {heroSlides[currentSlide].images?.map((img: string, idx: number) => (
                      <motion.div
                        key={idx}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
                        className={`relative rounded-2xl overflow-hidden shadow-xl ${
                          idx === 0 ? 'col-span-2 h-[280px]' : 'h-[240px]'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Service ${idx + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-waw-dark/30 to-transparent" />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Indicateurs de slide */}
          <div className="flex justify-center items-center mt-12 space-x-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-waw-yellow w-12' : 'bg-gray-300 w-8'
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Décorations subtiles */}
        <div className="absolute top-40 right-10 w-72 h-72 bg-waw-yellow/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </section>

      {/* Section Pourquoi choisir WAW ? */}
      <section ref={statsRef} className="py-20 bg-waw-dark text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold mb-6">
              Pourquoi choisir WAW ?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto text-justify">
              L'excellence technologique au service de votre entreprise.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-waw-yellow/10 rounded-xl flex items-center justify-center">
                  <Building className="text-waw-yellow" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">L'efficacité dans la synergie</h3>
                  <p className="text-gray-400 leading-relaxed text-justify">
                    Quand tout fonctionne ensemble, tout fonctionne mieux. Nous orchestrons chaque composant de votre infrastructure pour offrir une continuité opérationnelle sans compromis.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-waw-yellow/10 rounded-xl flex items-center justify-center">
                  <Cpu className="text-waw-yellow" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Notre identité</h3>
                  <p className="text-gray-400 leading-relaxed text-justify">
                    Acteur 100&nbsp;% sénégalais, nous grandissons au rythme des besoins de nos clients et des défis du numérique local. Chaque jour, nous plaçons la proximité, l'écoute et l'agilité au cœur de notre action.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-waw-yellow/10 rounded-xl flex items-center justify-center">
                  <Users className="text-waw-yellow" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Notre expertise</h3>
                  <p className="text-gray-400 leading-relaxed text-justify">
                    WAW TELECOM est un partenaire de confiance pour piloter votre transformation numérique, grâce à une approche intégrée, des infrastructures de nouvelle génération et une gouvernance de projet éprouvée.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-waw-yellow/10 rounded-xl flex items-center justify-center">
                  <Shield className="text-waw-yellow" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Notre promesse</h3>
                  <p className="text-gray-400 leading-relaxed text-justify">
                    Être le moteur local d'un avenir numérique plus inclusif, plus humain et plus accessible. Parce qu'un réseau n'a de valeur que s'il crée du lien, nous garantissons une expérience qui place l'humain au centre.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Services avec Images */}
      <section ref={servicesRef} className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-waw-dark mb-6">
            Nos services phare
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos services conçus pour propulser votre entreprise vers le succès
            </p>
          </motion.div>

          <div className="space-y-20">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Contenu texte */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="w-16 h-16 bg-waw-yellow rounded-2xl flex items-center justify-center mb-6">
                    <service.icon size={32} className="text-waw-dark" />
                  </div>
                  <h3 className="text-3xl font-bold text-waw-dark mb-4">{service.title}</h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-3">
                        <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      switch(service.title) {
                        case 'Connectivité':
                          onNavigate('connectivite');
                          break;
                        case 'Cloud & Hébergement':
                          onNavigate('cloud');
                          break;
                        case 'IoT & Objets connectés':
                          onNavigate('iot');
                          break;
                        case 'eSIM & Travel':
                          onNavigate('travel');
                          break;
                        case 'Opérateurs & Institutions':
                          onNavigate('contact');
                          break;
                        default:
                          onNavigate('home');
                      }
                    }}
                    className="bg-waw-yellow hover:bg-waw-yellow-dark text-waw-dark px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all"
                  >
                    <span>En savoir plus</span>
                    <ArrowRight size={18} />
                  </motion.button>
                </div>

                {/* Image */}
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative rounded-3xl overflow-hidden shadow-2xl"
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section ref={contactRef} className="py-20 relative overflow-hidden">
        {/* Background avec image */}
        <div className="absolute inset-0">
          <img
            src="https://wawtelecom.com/leguileu.png"
            alt="Bureau moderne"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-waw-dark/95 to-waw-dark/80" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-white mb-6">
            Prêt à transformer votre connectivité ?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Parlons de vos besoins et trouvons la solution parfaite ensemble.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Formulaire à gauche */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={contactInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Demander un devis</h3>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="space-y-2"
                  >
                    <label className="text-sm font-medium text-gray-300">Prénom *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-waw-yellow focus:border-transparent transition-all"
                      placeholder="Votre prénom"
                    />
                  </motion.div>
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="space-y-2"
                  >
                    <label className="text-sm font-medium text-gray-300">Nom *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-waw-yellow focus:border-transparent transition-all"
                      placeholder="Votre nom"
                    />
                  </motion.div>
                </div>

                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <label className="text-sm font-medium text-gray-300">Email *</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-waw-yellow focus:border-transparent transition-all"
                    placeholder="votre@email.com"
                  />
                </motion.div>

                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <label className="text-sm font-medium text-gray-300">Téléphone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-waw-yellow focus:border-transparent transition-all"
                    placeholder="+221 XX XXX XX XX"
                  />
                </motion.div>

                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <label className="text-sm font-medium text-gray-300">Service souhaité</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-waw-yellow focus:border-transparent transition-all">
                    <option value="">Choisissez un service</option>
                    <option value="esim">eSIM Travel</option>
                    <option value="connectivite">Connectivité Enterprise</option>
                    <option value="cloud">Services Cloud</option>
                    <option value="iot">Solutions IoT</option>
                    <option value="autre">Autre</option>
                  </select>
                </motion.div>

                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <label className="text-sm font-medium text-gray-300">Message *</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-waw-yellow focus:border-transparent transition-all resize-none"
                    placeholder="Décrivez-nous votre projet ou vos besoins..."
                  />
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-waw-yellow hover:bg-waw-yellow-dark text-waw-dark px-8 py-4 rounded-xl font-semibold transition-all"
                >
                  Demander un devis
                </motion.button>
              </form>
            </motion.div>

            {/* Informations de contact */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={contactInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Nos coordonnées</h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Building className="w-10 h-10 text-waw-yellow" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Adresse</h4>
                    <p className="text-gray-400">
                    56 Route de Ngor - Almadies <br />
                    Dakar, Sénégal
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-10 h-10 text-waw-yellow" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Téléphone</h4>
                    <p className="text-gray-400">+221 76 929 17 17</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-10 h-10 text-waw-yellow" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Email</h4>
                    <p className="text-gray-400">contact@wawtelecom.com</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('https://wa.me/221769291717', '_blank')}
                  className="p-4 rounded-xl bg-white/5 backdrop-blur-sm text-waw-yellow hover:bg-waw-yellow hover:text-white transition-all"
                >
                  <MessageCircle size={24} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('mailto:serviceclient@wawtelecom.com', '_blank')}
                  className="p-4 rounded-xl bg-white/5 backdrop-blur-sm text-waw-yellow hover:bg-waw-yellow hover:text-white transition-all"
                >
                  <Mail size={24} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('https://www.linkedin.com/company/waw-telecom/', '_blank')}
                  className="p-4 rounded-xl bg-white/5 backdrop-blur-sm text-waw-yellow hover:bg-waw-yellow hover:text-white transition-all"
                >
                  <Building size={24} />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-waw-yellow to-waw-yellow-dark">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold text-waw-dark mb-6">
              Prêt à transformer votre business ?
            </h2>
            <p className="text-xl text-waw-dark/80 mb-8 max-w-2xl mx-auto">
              Rejoignez les entreprises qui font confiance à WAW Telecom pour leur réussite digitale
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={openConsultationModal}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-waw-dark hover:bg-gray-800 text-white px-8 py-4 rounded-2xl font-semibold text-lg flex items-center justify-center space-x-2 transition-all"
              >
                <MessageCircle size={20} />
                <span>Parler à un expert</span>
              </motion.button>

              <motion.button
                onClick={() => onNavigate('travel')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-waw-dark hover:bg-waw-dark hover:text-white text-waw-dark px-8 py-4 rounded-2xl font-semibold text-lg flex items-center justify-center space-x-2 transition-all"
              >
                <Play size={20} />
                <span>Voir une démo</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal de Consultation */}
      {showConsultationModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowConsultationModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-waw-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle size={32} className="text-waw-dark" />
              </div>
              <h3 className="text-2xl font-bold text-waw-dark mb-2">Comment préférez-vous être contacté ?</h3>
              <p className="text-gray-600">Choisissez votre moyen de communication préféré</p>
            </div>

            <div className="space-y-4">
              {/* Option WhatsApp */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsAppConsultation}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center space-x-3"
              >
                <MessageCircle size={24} />
                <div className="text-left">
                  <div className="font-bold">WhatsApp</div>
                  <div className="text-sm opacity-90">+221 76 929 17 17</div>
                </div>
              </motion.button>

              {/* Option Email */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleEmailConsultation}
                className="w-full bg-waw-yellow hover:bg-waw-yellow-dark text-waw-dark font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center space-x-3"
              >
                <Mail size={24} />
                <div className="text-left">
                  <div className="font-bold">Email</div>
                  <div className="text-sm opacity-90">contact@wawtelecom.com</div>
                </div>
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowConsultationModal(false)}
              className="w-full mt-4 text-gray-500 hover:text-gray-700 font-medium py-2"
            >
              Annuler
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default HomePage2;
