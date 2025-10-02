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

interface Network {
  name: string;
  technology: string;
  coverage: string;
}

interface TechnicalDetails {
  hotspot: string;
  speedLimit: string;
  activation: string;
  validity: string;
}

interface Plan {
  id: number;
  data: string;
  price: number;
  originalPrice?: number | null;
  popular: boolean;
  description: string;
}

interface PlanDetails {
  id: string;
  country: string;
  flag: string;
  description: string;
  networks: Network[];
  technicalDetails: TechnicalDetails;
  plans: Plan[];
}

interface PlanDetailsPageProps {
  onNavigate: (page: PageType) => void;
  navigateToPage: (page: PageType, planId?: string) => void;
  planId?: string;
}

const PlanDetailsPage = ({ onNavigate, navigateToPage, planId }: PlanDetailsPageProps) => {
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
      'France': '/flags/fr.svg',
      'Allemagne': '/flags/de.svg',
      'Espagne': '/flags/es.svg',
      'Italie': '/flags/it.svg',
      'Belgique': '/flags/be.svg',
      'États-Unis': '/flags/us.svg',
      'USA': '/flags/us.svg',
      'Porto Rico': '/flags/pr.svg',
      'Arabie Saoudite': '/flags/sa.svg',
      'La Mecque': '/flags/sa.svg',
      'Médine': '/flags/sa.svg',
      'Maroc': '/flags/ma.svg',
      'Tunisie': '/flags/tn.svg',
      'Côte d\'Ivoire': '/flags/ci.svg',
      'Ghana': '/flags/gh.svg',
      'Nigeria': '/flags/ng.svg',
      'Royaume-Uni': '/flags/gb.svg',
      'UK': '/flags/gb.svg',
      'Canada': '/flags/ca.svg',
      'Japon': '/flags/jp.svg',
      'Australie': '/flags/au.svg',
      'Brésil': '/flags/br.svg',
      'Turquie': '/flags/tr.svg',
      'Europe': '/flags/eu.svg',
      'Afrique': '/flags/af.svg'
    };

    return countryFlags[countryName] || '/flags/world.svg';
  };

  // Format price function
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-FR').format(price);
  };

  // Fonction de mapping entre nom de pays et ID de plan
  const getPlanIdFromCountry = (country: string): string => {
    const countryIdMap: { [key: string]: string } = {
      'France': 'france-esim-demo',
      'États-Unis': 'usa-esim-demo',
      'USA': 'usa-esim-demo',
      'Royaume-Uni': 'uk-esim-demo',
      'Allemagne': 'de-esim-demo',
      'Espagne': 'es-esim-demo',
      'Italie': 'it-esim-demo',
      'Japon': 'jp-esim-demo',
      'Canada': 'ca-esim-demo',
      'Australie': 'au-esim-demo',
      'Brésil': 'br-esim-demo',
      'Turquie': 'tr-esim-demo',
      'Maroc': 'ma-esim-demo'
    };

    return countryIdMap[country] || 'usa-esim-demo';
  };

  // Plans par destination
  const plansByCountry: Record<string, PlanDetails> = {
    'usa-esim-demo': {
      id: 'usa-esim-demo',
      country: 'États-Unis',
      flag: '/flags/us.svg',
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
        { id: 1, data: '1GB', price: 2500, originalPrice: null, popular: false, description: 'Idéal pour usage modéré' },
        { id: 2, data: '3GB', price: 6500, originalPrice: 8000, popular: true, description: 'Le plus populaire' },
        { id: 3, data: '10GB', price: 16500, originalPrice: 20000, popular: false, description: 'Usage intensif' }
      ]
    },
    'france-esim-demo': {
      id: 'france-esim-demo',
      country: 'France',
      flag: '/flags/fr.svg',
      description: 'Connectivité 4G/5G nationale avec notre eSIM pour la France.',
      networks: [
        { name: 'Orange', technology: '5G', coverage: '98%' },
        { name: 'SFR', technology: '5G', coverage: '97%' },
        { name: 'Bouygues', technology: '5G', coverage: '96%' }
      ],
      technicalDetails: {
        hotspot: 'Illimité',
        speedLimit: 'Aucune limitation',
        activation: 'Instantanée à l\'arrivée',
        validity: '30 jours'
      },
      plans: [
        { id: 1, data: '1GB', price: 2000, originalPrice: null, popular: false, description: 'Idéal pour usage modéré' },
        { id: 2, data: '3GB', price: 5500, originalPrice: 7000, popular: true, description: 'Le plus populaire' },
        { id: 3, data: '10GB', price: 15000, originalPrice: 18000, popular: false, description: 'Usage intensif' }
      ]
    },
    'uk-esim-demo': {
      id: 'uk-esim-demo',
      country: 'Royaume-Uni',
      flag: '/flags/gb.svg',
      description: 'Connectivité 5G nationale avec notre eSIM pour le Royaume-Uni.',
      networks: [
        { name: 'EE', technology: '5G', coverage: '98%' },
        { name: 'Vodafone', technology: '5G', coverage: '97%' },
        { name: 'Three', technology: '5G', coverage: '96%' }
      ],
      technicalDetails: {
        hotspot: 'Illimité',
        speedLimit: 'Aucune limitation',
        activation: 'Instantanée à l\'arrivée',
        validity: '30 jours'
      },
      plans: [
        { id: 1, data: '1GB', price: 3500, originalPrice: null, popular: false, description: 'Idéal pour usage modéré' },
        { id: 2, data: '3GB', price: 7000, originalPrice: 8500, popular: true, description: 'Le plus populaire' },
        { id: 3, data: '10GB', price: 17500, originalPrice: 21000, popular: false, description: 'Usage intensif' }
      ]
    },
    'de-esim-demo': {
      id: 'de-esim-demo',
      country: 'Allemagne',
      flag: '/flags/de.svg',
      description: 'Connectivité 5G nationale avec notre eSIM pour l\'Allemagne.',
      networks: [
        { name: 'Deutsche Telekom', technology: '5G', coverage: '98%' },
        { name: 'Vodafone', technology: '5G', coverage: '97%' },
        { name: 'O2', technology: '5G', coverage: '96%' }
      ],
      technicalDetails: {
        hotspot: 'Illimité',
        speedLimit: 'Aucune limitation',
        activation: 'Instantanée à l\'arrivée',
        validity: '30 jours'
      },
      plans: [
        { id: 1, data: '1GB', price: 3250, originalPrice: null, popular: false, description: 'Idéal pour usage modéré' },
        { id: 2, data: '3GB', price: 6500, originalPrice: 8000, popular: true, description: 'Le plus populaire' },
        { id: 3, data: '10GB', price: 16250, originalPrice: 19500, popular: false, description: 'Usage intensif' }
      ]
    },
    'es-esim-demo': {
      id: 'es-esim-demo',
      country: 'Espagne',
      flag: '/flags/es.svg',
      description: 'Connectivité 5G nationale avec notre eSIM pour l\'Espagne.',
      networks: [
        { name: 'Movistar', technology: '5G', coverage: '98%' },
        { name: 'Vodafone', technology: '5G', coverage: '97%' },
        { name: 'Orange', technology: '5G', coverage: '96%' }
      ],
      technicalDetails: {
        hotspot: 'Illimité',
        speedLimit: 'Aucune limitation',
        activation: 'Instantanée à l\'arrivée',
        validity: '30 jours'
      },
      plans: [
        { id: 1, data: '1GB', price: 3250, originalPrice: null, popular: false, description: 'Idéal pour usage modéré' },
        { id: 2, data: '3GB', price: 6500, originalPrice: 8000, popular: true, description: 'Le plus populaire' },
        { id: 3, data: '10GB', price: 16250, originalPrice: 19500, popular: false, description: 'Usage intensif' }
      ]
    },
    'it-esim-demo': {
      id: 'it-esim-demo',
      country: 'Italie',
      flag: '/flags/it.svg',
      description: 'Connectivité 5G nationale avec notre eSIM pour l\'Italie.',
      networks: [
        { name: 'TIM', technology: '5G', coverage: '98%' },
        { name: 'Vodafone', technology: '5G', coverage: '97%' },
        { name: 'Wind Tre', technology: '5G', coverage: '96%' }
      ],
      technicalDetails: {
        hotspot: 'Illimité',
        speedLimit: 'Aucune limitation',
        activation: 'Instantanée à l\'arrivée',
        validity: '30 jours'
      },
      plans: [
        { id: 1, data: '1GB', price: 3250, originalPrice: null, popular: false, description: 'Idéal pour usage modéré' },
        { id: 2, data: '3GB', price: 6500, originalPrice: 8000, popular: true, description: 'Le plus populaire' },
        { id: 3, data: '10GB', price: 16250, originalPrice: 19500, popular: false, description: 'Usage intensif' }
      ]
    },
    'jp-esim-demo': {
      id: 'jp-esim-demo',
      country: 'Japon',
      flag: '/flags/jp.svg',
      description: 'Connectivité 5G nationale avec notre eSIM pour le Japon.',
      networks: [
        { name: 'NTT Docomo', technology: '5G', coverage: '98%' },
        { name: 'KDDI', technology: '5G', coverage: '97%' },
        { name: 'SoftBank', technology: '5G', coverage: '96%' }
      ],
      technicalDetails: {
        hotspot: 'Illimité',
        speedLimit: 'Aucune limitation',
        activation: 'Instantanée à l\'arrivée',
        validity: '30 jours'
      },
      plans: [
        { id: 1, data: '1GB', price: 5000, originalPrice: null, popular: false, description: 'Idéal pour usage modéré' },
        { id: 2, data: '3GB', price: 10000, originalPrice: 12000, popular: true, description: 'Le plus populaire' },
        { id: 3, data: '10GB', price: 25000, originalPrice: 30000, popular: false, description: 'Usage intensif' }
      ]
    },
    'ca-esim-demo': {
      id: 'ca-esim-demo',
      country: 'Canada',
      flag: '/flags/ca.svg',
      description: 'Connectivité 5G nationale avec notre eSIM pour le Canada.',
      networks: [
        { name: 'Bell', technology: '5G', coverage: '98%' },
        { name: 'Telus', technology: '5G', coverage: '97%' },
        { name: 'Rogers', technology: '5G', coverage: '96%' }
      ],
      technicalDetails: {
        hotspot: 'Illimité',
        speedLimit: 'Aucune limitation',
        activation: 'Instantanée à l\'arrivée',
        validity: '30 jours'
      },
      plans: [
        { id: 1, data: '1GB', price: 4000, originalPrice: null, popular: false, description: 'Idéal pour usage modéré' },
        { id: 2, data: '3GB', price: 8000, originalPrice: 9500, popular: true, description: 'Le plus populaire' },
        { id: 3, data: '10GB', price: 20000, originalPrice: 24000, popular: false, description: 'Usage intensif' }
      ]
    },
    'au-esim-demo': {
      id: 'au-esim-demo',
      country: 'Australie',
      flag: '/flags/au.svg',
      description: 'Connectivité 5G nationale avec notre eSIM pour l\'Australie.',
      networks: [
        { name: 'Telstra', technology: '5G', coverage: '98%' },
        { name: 'Optus', technology: '5G', coverage: '97%' },
        { name: 'Vodafone', technology: '5G', coverage: '96%' }
      ],
      technicalDetails: {
        hotspot: 'Illimité',
        speedLimit: 'Aucune limitation',
        activation: 'Instantanée à l\'arrivée',
        validity: '30 jours'
      },
      plans: [
        { id: 1, data: '1GB', price: 6000, originalPrice: null, popular: false, description: 'Idéal pour usage modéré' },
        { id: 2, data: '3GB', price: 12000, originalPrice: 14500, popular: true, description: 'Le plus populaire' },
        { id: 3, data: '10GB', price: 30000, originalPrice: 36000, popular: false, description: 'Usage intensif' }
      ]
    },
    'br-esim-demo': {
      id: 'br-esim-demo',
      country: 'Brésil',
      flag: '/flags/br.svg',
      description: 'Connectivité 4G/5G nationale avec notre eSIM pour le Brésil.',
      networks: [
        { name: 'Claro', technology: '5G', coverage: '98%' },
        { name: 'Vivo', technology: '5G', coverage: '97%' },
        { name: 'Oi', technology: '4G', coverage: '96%' }
      ],
      technicalDetails: {
        hotspot: 'Illimité',
        speedLimit: 'Aucune limitation',
        activation: 'Instantanée à l\'arrivée',
        validity: '30 jours'
      },
      plans: [
        { id: 1, data: '1GB', price: 4500, originalPrice: null, popular: false, description: 'Idéal pour usage modéré' },
        { id: 2, data: '3GB', price: 9000, originalPrice: 10500, popular: true, description: 'Le plus populaire' },
        { id: 3, data: '10GB', price: 22500, originalPrice: 27000, popular: false, description: 'Usage intensif' }
      ]
    },
    'tr-esim-demo': {
      id: 'tr-esim-demo',
      country: 'Turquie',
      flag: '/flags/tr.svg',
      description: 'Connectivité 4G/5G nationale avec notre eSIM pour la Turquie.',
      networks: [
        { name: 'Turkcell', technology: '5G', coverage: '98%' },
        { name: 'Vodafone', technology: '5G', coverage: '97%' },
        { name: 'Turk Telekom', technology: '4G', coverage: '96%' }
      ],
      technicalDetails: {
        hotspot: 'Illimité',
        speedLimit: 'Aucune limitation',
        activation: 'Instantanée à l\'arrivée',
        validity: '30 jours'
      },
      plans: [
        { id: 1, data: '1GB', price: 3750, originalPrice: null, popular: false, description: 'Idéal pour usage modéré' },
        { id: 2, data: '3GB', price: 7500, originalPrice: 9000, popular: true, description: 'Le plus populaire' },
        { id: 3, data: '10GB', price: 18750, originalPrice: 22500, popular: false, description: 'Usage intensif' }
      ]
    },
    'ma-esim-demo': {
      id: 'ma-esim-demo',
      country: 'Maroc',
      flag: '/flags/ma.svg',
      description: 'Connectivité 4G/5G nationale avec notre eSIM pour le Maroc.',
      networks: [
        { name: 'IAM', technology: '5G', coverage: '98%' },
        { name: 'Maroc Telecom', technology: '5G', coverage: '97%' },
        { name: 'Inwi', technology: '4G', coverage: '96%' }
      ],
      technicalDetails: {
        hotspot: 'Illimité',
        speedLimit: 'Aucune limitation',
        activation: 'Instantanée à l\'arrivée',
        validity: '30 jours'
      },
      plans: [
        { id: 1, data: '1GB', price: 4250, originalPrice: null, popular: false, description: 'Idéal pour usage modéré' },
        { id: 2, data: '3GB', price: 8500, originalPrice: 10000, popular: true, description: 'Le plus populaire' },
        { id: 3, data: '10GB', price: 21250, originalPrice: 25500, popular: false, description: 'Usage intensif' }
      ]
    }
  };

  // Récupérer les détails du plan en fonction du nom du pays
  const planDetails = plansByCountry[getPlanIdFromCountry(planId || 'États-Unis')] || plansByCountry['usa-esim-demo'];

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
                <img
                  src={planDetails.flag}
                  alt={`${planDetails.country} flag`}
                  className="w-12 h-12"
                />
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

      {/* Plans Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            ref={section2Ref}
            initial={{ opacity: 0, y: 20 }}
            animate={section2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left Column - Plan Details */}
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-display font-bold text-waw-dark mb-4">
                    Choisissez votre forfait
                  </h2>
                  <p className="text-xl text-gray-600">
                    Plans flexibles pour tous vos besoins de voyage
                  </p>
                </div>

                {/* Country Image */}
                <div className="relative h-64 mb-8">
                  <img
                    src="https://thumbs.dreamstime.com/b/palmarin-senegal-october-unidentified-fisherman-running-water-to-traditional-painted-wooden-fishing-boats-palmarin-senegal-118636235.jpg"
                    alt={planDetails.country}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-xl"></div>
                </div>

                {/* Plan Description */}
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-8 shadow-lg">
                    <h3 className="text-lg font-semibold mb-4">eSIM WAW TELECOM pour {planDetails.country}</h3>
                    <p className="text-gray-600">{planDetails.description}</p>
                  </div>
                </div>


              </div>

              {/* Right Column - Plans Grid */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-lg font-semibold mb-4">Plans WAW TELECOM</h3>
                  <p className="text-gray-600 mb-6">Valables uniquement en {planDetails.country}</p>

                  <div className="space-y-4">
                    {planDetails.plans.map((plan, index) => (
                      <div
                        key={plan.id}
                        className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
                          plan.popular ? 'bg-waw-yellow/10' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div>
                          <h4 className="font-semibold text-waw-dark">{plan.data}</h4>
                          <p className="text-gray-600">{plan.description}</p>
                        </div>
                        <div className="text-right">
                          {plan.originalPrice ? (
                            <div className="flex flex-col items-end">
                              <span className="text-gray-400 line-through">
                                {formatPrice(plan.originalPrice)} FCFA
                              </span>
                              <p className="text-2xl font-bold text-waw-dark">
                                {formatPrice(plan.price)} FCFA
                              </p>
                            </div>
                          ) : (
                            <p className="text-2xl font-bold text-waw-dark">
                              {formatPrice(plan.price)} FCFA
                            </p>
                          )}
                          {plan.popular && (
                            <div className="mt-2">
                              <span className="bg-waw-yellow text-waw-dark px-3 py-1 rounded-full text-sm font-bold">
                                Populaire 🔥
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Checkout Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-4 rounded-lg font-semibold transition-colors text-sm flex items-center justify-center gap-2 bg-waw-yellow text-waw-dark hover:bg-waw-yellow-dark"
                  onClick={() => {
                    // Passer le plan sélectionné à la page de checkout
                    const selectedPlan = planDetails.plans.find(plan => plan.popular) || planDetails.plans[0];
                    navigateToPage('checkout', selectedPlan.id.toString());
                  }}
                >
                  <Shield className="w-5 h-5" />
                  Aller au paiement sécurisé
                  <ArrowRight size={16} className="ml-2" />
                </motion.div>

                <div className="text-center text-gray-600 mt-4">
                  <p>Tous vos paiements sont sécurisés avec WAW TELECOM</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-waw-dark mb-4">
              Comment ça marche
            </h2>
            <p className="text-xl text-gray-600">
              Suivez ces étapes simples pour vous connecter
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-waw-yellow rounded-full mb-4">
                  <span className="text-waw-dark font-bold text-lg">{step.step}</span>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-waw-dark mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-waw-dark mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-xl text-gray-600">
              Réponses à vos questions les plus courantes
            </p>
          </div>

          <div className="space-y-6">
            {faqItems.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <h3 className="text-lg font-semibold text-waw-dark mb-4">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlanDetailsPage;
