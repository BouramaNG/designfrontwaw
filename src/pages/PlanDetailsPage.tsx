import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ArrowLeft,
  Smartphone,
  Globe,
  Zap,
  Shield,
  CheckCircle,
  Star,
  Wifi,
  Phone,
  CreditCard,
  Download,
  Users,
  Clock,
  Signal,
  Battery,
  MapPin,
  ArrowRight
} from 'lucide-react';
import type { PageType } from '../App';
import type { ESIMPlan } from '../types/esim';

interface PlanDetailsPageProps {
  onNavigate: (page: PageType) => void;
  planId?: string;
}

const PlanDetailsPage = ({ onNavigate, planId }: PlanDetailsPageProps) => {
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

  // Fonction pour obtenir les drapeaux
  const getCountryFlag = (countryName: string): string => {
    const countryFlags: { [key: string]: string } = {
      'France': '🇫🇷',
      'Allemagne': '🇩🇪',
      'Espagne': '🇪🇸',
      'Italie': '🇮🇹',
      'Belgique': '🇧🇪',
      'États-Unis': '🇺🇸',
      'USA': '🇺🇸',
      'Porto Rico': '🇵🇷',
      'Arabie Saoudite': '🇸🇦',
      'La Mecque': '🇸🇦',
      'Médine': '🇸🇦',
      'Maroc': '🇲🇦',
      'Tunisie': '🇹🇳',
      'Côte d\'Ivoire': '🇨🇮',
      'Ghana': '🇬🇭',
      'Nigeria': '🇳🇬',
      'Royaume-Uni': '🇬🇧',
      'UK': '🇬🇧',
      'Canada': '🇨🇦',
      'Japon': '🇯🇵',
      'Australie': '🇦🇺',
      'Brésil': '🇧🇷',
      'Turquie': '🇹🇷',
      'Europe': '🇪🇺',
      'Afrique': '🌍'
    };

    return countryFlags[countryName] || '🌐';
  };

  // Format price function
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-FR').format(price);
  };

  // Plan de démonstration (normalement récupéré via API avec planId)
  const planDetails = {
    id: 'usa-esim-demo',
    country: 'États-Unis',
    flag: '🇺🇸',
    description: 'Restez connecté aux États-Unis avec notre eSIM haute performance. Couverture 5G nationale, activation instantanée.',
    networks: [
      { name: 'Verizon', technology: '5G', coverage: '99%' },
      { name: 'AT&T', technology: '5G', coverage: '98%' },
      { name: 'T-Mobile', technology: '5G', coverage: '97%' }
    ],
    technicalDetails: {
      hotspot: 'Illimité',
      speedLimit: 'Aucune limitation',
      activation: 'Instantanée à l\'arrivée',
      validity: '30 jours'
    },
    plans: [
      { id: 1, data: '500MB', price: 1500, originalPrice: null, popular: false, description: 'Parfait pour les courts séjours' },
      { id: 2, data: '1GB', price: 2500, originalPrice: null, popular: false, description: 'Idéal pour usage modéré' },
      { id: 3, data: '3GB', price: 6500, originalPrice: 8000, popular: true, description: 'Le plus populaire' },
      { id: 4, data: '5GB', price: 9500, originalPrice: 12000, popular: false, description: 'Pour les gros utilisateurs' },
      { id: 5, data: '10GB', price: 16500, originalPrice: 20000, popular: false, description: 'Usage intensif' }
    ]
  };

  const howItWorks = [
    {
      step: '1',
      title: 'Choisissez votre forfait',
      description: 'Sélectionnez le plan de données qui correspond à vos besoins de voyage',
      icon: CreditCard
    },
    {
      step: '2',
      title: 'Payez avec Wave/Orange Money',
      description: 'Paiement sécurisé avec vos solutions mobiles africaines préférées',
      icon: Phone
    },
    {
      step: '3',
      title: 'Recevez votre QR Code',
      description: 'Code QR envoyé par SMS et email en quelques minutes',
      icon: Download
    },
    {
      step: '4',
      title: 'Activez à destination',
      description: 'Scannez le QR et connectez-vous automatiquement à l\'arrivée',
      icon: Wifi
    }
  ];

  const faqItems = [
    {
      question: 'Comment fonctionne l\'eSIM WAW TELECOM ?',
      answer: 'Notre eSIM se connecte automatiquement aux meilleurs réseaux locaux. Pas besoin de changer de carte physique pour chaque pays.'
    },
    {
      question: 'Quand mon forfait commence-t-il ?',
      answer: 'Votre forfait s\'active automatiquement dès que vous vous connectez au réseau dans le pays de destination.'
    },
    {
      question: 'Puis-je utiliser mon téléphone comme point d\'accès ?',
      answer: 'Oui, le partage de connexion (hotspot) est illimité sur tous nos forfaits eSIM.'
    },
    {
      question: 'Que se passe-t-il si j\'épuise mes données ?',
      answer: 'Vous pouvez facilement recharger depuis notre application ou acheter un nouveau forfait.'
    }
  ];

  const otherDestinations = [
    { name: 'France', flag: '🇫🇷', price: 'À partir de 8.95€' },
    { name: 'Royaume-Uni', flag: '🇬🇧', price: 'À partir de 9.95€' },
    { name: 'Japon', flag: '🇯🇵', price: 'À partir de 15.95€' },
    { name: 'Canada', flag: '🇨🇦', price: 'À partir de 12.95€' },
    { name: 'Australie', flag: '🇦🇺', price: 'À partir de 16.95€' },
    { name: 'Allemagne', flag: '🇩🇪', price: 'À partir de 8.95€' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('travel')}
              className="flex items-center space-x-2 text-waw-dark hover:text-waw-yellow transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Retour aux forfaits</span>
            </button>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-waw-yellow to-waw-yellow-dark rounded-lg flex items-center justify-center">
                <span className="text-waw-dark font-bold text-sm">W</span>
              </div>
              <span className="font-bold text-waw-dark">WAW TELECOM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-waw-dark via-blue-900 to-purple-900 text-white overflow-hidden">
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
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Text Content */}
            <div className="space-y-8">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="inline-block px-6 py-3 bg-waw-yellow/20 text-waw-yellow rounded-full text-lg font-semibold"
              >
                📱 eSIM pour {planDetails.country}
              </motion.span>

              <div className="flex items-center space-x-4">
                <span className="text-6xl">{planDetails.flag}</span>
                <div>
                  <h1 className="text-5xl lg:text-6xl font-display font-bold leading-tight">
                    eSIM{' '}
                    <span className="bg-gradient-to-r from-waw-yellow to-waw-yellow-dark bg-clip-text text-transparent">
                      {planDetails.country}
                    </span>
                  </h1>
                  <p className="text-xl text-gray-300 mt-4 leading-relaxed">
                    {planDetails.description}
                  </p>
                </div>
              </div>

              {/* Technical Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Wifi size={20} className="text-waw-yellow" />
                    <span className="font-semibold">Point d'accès</span>
                  </div>
                  <p className="text-gray-300">{planDetails.technicalDetails.hotspot}</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap size={20} className="text-waw-yellow" />
                    <span className="font-semibold">Activation</span>
                  </div>
                  <p className="text-gray-300">{planDetails.technicalDetails.activation}</p>
                </div>
              </div>
            </div>

            {/* Image/Visual Content */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeInOut',
              }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-waw-yellow to-waw-yellow-dark rounded-3xl p-8 shadow-2xl">
                <img
                  src="https://ugc.same-assets.com/mmwqyPhZZfN6huiaLIBut1TOcH7iK4uX.jpeg"
                  alt={`eSIM pour ${planDetails.country}`}
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-waw-dark/20 to-transparent rounded-2xl" />

                {/* Overlay Info */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-sm rounded-xl p-4">
                  <h4 className="font-bold text-lg text-gray-800 mb-2">eSIM {planDetails.country}</h4>
                  <p className="text-sm text-gray-600 mb-3">Connectivité 5G garantie</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs text-gray-600">Réseaux actifs</span>
                    </div>
                    <div className="text-xs text-gray-600">Activation instantanée</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Networks Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            ref={section1Ref}
            initial={{ opacity: 0, y: 20 }}
            animate={section1InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-waw-dark mb-4">
                Réseaux disponibles
              </h2>
              <p className="text-xl text-gray-600">
                Connexion automatique aux meilleurs réseaux locaux
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {planDetails.networks.map((network, index) => (
                <motion.div
                  key={network.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={section1InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-waw-yellow to-waw-yellow-dark rounded-full flex items-center justify-center mx-auto mb-4">
                    <Signal size={24} className="text-waw-dark" />
                  </div>
                  <h3 className="font-bold text-xl text-waw-dark mb-2">{network.name}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        {network.technology}
                      </span>
                    </div>
                    <p className="text-gray-600">Couverture {network.coverage}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            ref={section2Ref}
            initial={{ opacity: 0, y: 20 }}
            animate={section2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-waw-dark mb-4">
                Choisissez votre forfait
              </h2>
              <p className="text-xl text-gray-600">
                Plans flexibles pour tous vos besoins de voyage
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
              {planDetails.plans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={section2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative bg-white rounded-2xl p-6 shadow-lg border-2 transition-all hover:shadow-2xl ${
                    plan.popular ? 'border-waw-yellow scale-105' : 'border-gray-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-waw-yellow text-waw-dark px-4 py-1 rounded-full text-sm font-bold flex items-center">
                        <Star size={12} className="mr-1" />
                        Populaire
                      </span>
                    </div>
                  )}

                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-waw-dark mb-2">{plan.data}</h3>
                    <p className="text-gray-600 text-sm mb-4">{plan.description}</p>

                    <div className="mb-6">
                      {plan.originalPrice ? (
                        <div>
                          <span className="text-lg text-gray-400 line-through">
                            {formatPrice(plan.originalPrice)} FCFA
                          </span>
                          <p className="text-3xl font-bold text-waw-dark">
                            {formatPrice(plan.price)} FCFA
                          </p>
                        </div>
                      ) : (
                        <p className="text-3xl font-bold text-waw-dark">
                          {formatPrice(plan.price)} FCFA
                        </p>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                        plan.popular
                          ? 'bg-waw-yellow text-waw-dark hover:bg-waw-yellow-dark'
                          : 'bg-gray-100 text-waw-dark hover:bg-waw-yellow'
                      }`}
                    >
                      Choisir ce plan
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="section-padding bg-gradient-to-br from-waw-yellow/5 to-waw-yellow-dark/5">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-waw-dark mb-6">
              Comment ça marche
            </h2>
            <p className="text-xl text-gray-600">
              4 étapes simples pour rester connecté
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-waw-yellow to-waw-yellow-dark rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-waw-dark font-bold text-xl">{step.step}</span>
                </div>
                <h3 className="text-xl font-bold text-waw-dark mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-waw-dark mb-6">
                Questions fréquentes
              </h2>
            </div>

            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-6"
                >
                  <h3 className="text-lg font-bold text-waw-dark mb-3">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Other Destinations */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-waw-dark mb-6">
              Autres destinations
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez nos forfaits eSIM pour d'autres pays
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {otherDestinations.map((destination, index) => (
              <motion.div
                key={destination.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center cursor-pointer hover:border-waw-yellow transition-all"
              >
                <div className="text-4xl mb-3">{destination.flag}</div>
                <h3 className="font-bold text-waw-dark mb-2">{destination.name}</h3>
                <p className="text-sm text-gray-600">{destination.price}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('travel')}
              className="bg-waw-yellow text-waw-dark font-bold px-8 py-4 rounded-lg text-lg hover:bg-waw-yellow-dark transition-colors flex items-center justify-center space-x-2 mx-auto"
            >
              <Globe size={20} />
              <span>Voir toutes les destinations</span>
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlanDetailsPage;
