import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect, useCallback } from 'react';
import useDeviceOptimization from '../hooks/useDeviceOptimization';
import useOptimizedTransition from '../hooks/useOptimizedTransition';
import {
  ArrowLeft,
  Globe,
  Zap,
  Shield,
  CheckCircle,
  Star,
  Wifi,
  Phone,
  CreditCard,
  Download,
  Clock,
  ArrowRight,
  ChevronRight,
  Lock,
  Mail,
  X,
  Sparkles,
  Check
} from 'lucide-react';
import type { PageType } from '../App';
import { esimService } from '../services/esimService';
import { orderService } from '../services/orderService';
import { PAYS, INDICATIFS } from '../utils/constants';

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
  // Optimisation device
  const { isSafari, isMobile, transitionConfig } = useDeviceOptimization();
  const { transitions } = useOptimizedTransition();
  
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [section1Ref, section1InView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Backend data states
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [countryInfo, setCountryInfo] = useState<any>(null);

  // Interactive checkout states
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [chatEmail, setChatEmail] = useState('');
  const [chatPhone, setChatPhone] = useState('');
  const [selectedIndicatif, setSelectedIndicatif] = useState('+221');
  const [processing, setProcessing] = useState(false);
  // Modal flow states - UNE SEULE MODALE
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  // Modal "Contactez-nous" - Pas encore de prix définis
  const [showContactModal, setShowContactModal] = useState(false);
  // Modal de confirmation de paiement - NOUVEAU
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<(() => Promise<void>) | null>(null);
  // How it works interactive step
  const [activeHowStep, setActiveHowStep] = useState(0);
  const [howStepPaused, setHowStepPaused] = useState(false);
  // Email & Phone submission tracking
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [phoneSubmitted, setPhoneSubmitted] = useState(false);
  const STEP_DURATION = 4000;

  // Charger les packages depuis l'API
  useEffect(() => {
    const loadPackages = async () => {
      if (!planId) return;

      setLoading(true);
      try {
        const country = PAYS.find(p => p.code === planId);
        setCountryInfo(country);

        const data = await esimService.getPackagesWithPrice(planId);
        setPackages(data);
      } catch (err) {
        console.error('Erreur chargement packages:', err);
        setError('Erreur lors du chargement des packages');
      } finally {
        setLoading(false);
      }
    };

    loadPackages();
  }, [planId]);

  // Auto-cycle how it works steps
  useEffect(() => {
    if (howStepPaused) return;
    const timer = setInterval(() => {
      setActiveHowStep((prev) => (prev + 1) % 4);
    }, STEP_DURATION);
    return () => clearInterval(timer);
  }, [howStepPaused, activeHowStep]);

  const handleHowStepClick = useCallback((index: number) => {
    setActiveHowStep(index);
    setHowStepPaused(true);
    // Resume auto after 10s of inactivity
    setTimeout(() => setHowStepPaused(false), 10000);
  }, []);

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

  // Créer planDetails depuis les vraies données
  const planDetails = {
    country: countryInfo?.nom || 'Destination',
    flag: countryInfo?.drapeau || '',
    description: `Restez connecté ${countryInfo?.nom ? `en ${countryInfo.nom}` : ''} avec notre eSIM haute performance. Activation instantanée, couverture optimale.`,
    technicalDetails: {
      hotspot: 'Illimité',
      speedLimit: 'Illimitée',
      validity: '30 jours',
      activation: 'Instantanée'
    },
    plans: packages.map((pkg, idx) => ({
      id: pkg.id,
      data: `${(pkg.data_mb / 1024).toFixed(0)}GB`,
      price: parseFloat(pkg.price),
      originalPrice: null,
      popular: idx === 1,
      description: pkg.name || `Package ${(pkg.data_mb / 1024).toFixed(0)}GB`
    }))
  };

  const selectedPlan = packages.find(p => p.id === selectedPlanId) || null;

  // Vérifier si l'utilisateur peut procéder au paiement
  const canCheckout = emailSubmitted && phoneSubmitted && selectedPlanId !== null;

  const handleSelectPlan = (id: number) => {
    setSelectedPlanId(id);
    setShowCheckoutModal(true);
  };

  const handleChangePlan = (id: number) => {
    // Même chose que handleSelectPlan - change le plan sélectionné
    setSelectedPlanId(id);
  };

  const handleCheckoutSubmit = async () => {
    if (!chatEmail.trim() || !chatEmail.includes('@')) {
      alert('Veuillez entrer un email valide');
      return;
    }

    if (!chatPhone.trim() || chatPhone.length < 8) {
      alert('Veuillez entrer un numéro de téléphone valide');
      return;
    }

    if (!selectedPlan) {
      alert('Aucun forfait sélectionné');
      return;
    }

    setProcessing(true);

    try {
      const orderData = {
        esim_package_template_id: selectedPlan.id,  // ← Correct field name
        email: chatEmail,
        phone_number: `${selectedIndicatif}${chatPhone}`,  // ← Correct field name
        amount: selectedPlan.price
      };

      console.log('📦 Création commande:', orderData);
      const orderResponse = await orderService.createOrder(orderData);

      if (!orderResponse.success || !orderResponse.order_id) {
        // Si erreur, afficher le modal contact avec l'erreur
        console.warn('⚠️ Création commande échouée, affichage modal contact');
        setShowContactModal(true);
        setProcessing(false);
        return;
      }

      console.log('✅ Commande créée:', orderResponse);
      
      // 👉 ÉTAPE 2: Afficher une modale de confirmation élégante
      const confirmPayment = async () => {
        setProcessing(true);
        try {
          // 👉 ÉTAPE 3: Initier le paiement
          const paymentResponse = await orderService.initiatePayment(orderResponse.order_id!);

          if (!paymentResponse.success || !paymentResponse.payment_url) {
            throw new Error(paymentResponse.message || 'Erreur initiation paiement');
          }

          console.log('✅ Paiement initié, redirection vers:', paymentResponse.payment_url);
          window.location.href = paymentResponse.payment_url;
        } catch (err: any) {
          console.error('❌ Erreur paiement:', err);
          setShowConfirmModal(false);
          setShowContactModal(true);
          setProcessing(false);
        }
      };

      // Afficher la modale de confirmation
      setConfirmAction(() => confirmPayment);
      setShowConfirmModal(true);
      setProcessing(false);

    } catch (err: any) {
      console.error('❌ Erreur checkout:', err);
      // Afficher le modal contact en cas d'erreur
      setShowContactModal(true);
      setProcessing(false);
    }
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

  // Gradient colors for plan cards
  const planGradients = [
    { bg: 'from-slate-50 to-gray-50', border: 'border-gray-200', accent: 'bg-gray-100', iconBg: 'bg-gray-800', ring: 'ring-gray-300' },
    { bg: 'from-amber-50/80 to-yellow-50/60', border: 'border-waw-yellow/40', accent: 'bg-waw-yellow/10', iconBg: 'bg-waw-yellow', ring: 'ring-waw-yellow' },
    { bg: 'from-violet-50/80 to-indigo-50/60', border: 'border-violet-200', accent: 'bg-violet-100', iconBg: 'bg-violet-600', ring: 'ring-violet-400' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100/50 sticky top-0 z-50">
        <div className="container-custom py-3">
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('travel')}
              className="flex items-center gap-2 text-gray-500 hover:text-waw-dark transition-colors group"
            >
              <ArrowLeft size={18} className="group-hover:text-waw-yellow-dark transition-colors" />
              <span className="text-sm font-medium">Retour aux destinations</span>
            </motion.button>

            <div className="hidden md:flex items-center gap-2 text-xs text-gray-400">
              <span className="hover:text-waw-dark cursor-pointer transition-colors" onClick={() => onNavigate('travel')}>eSIM Travel</span>
              <ChevronRight size={12} />
              <span className="text-waw-dark font-semibold">{planDetails.country}</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-waw-yellow to-waw-yellow-dark rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-waw-dark font-bold text-xs">W</span>
              </div>
              <span className="font-bold text-waw-dark text-sm hidden sm:inline">WAW TELECOM</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== HERO SECTION ===================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50" ref={heroRef}>
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-waw-yellow/8 to-transparent rounded-full translate-x-1/3 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-waw-yellow/5 to-transparent rounded-full -translate-x-1/4 translate-y-1/4" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="absolute top-20 right-[15%] w-72 h-72 border border-dashed border-gray-200/50 rounded-full"
          />
        </div>

        <div className="container-custom relative z-10 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* ===== LEFT - Country Info ===== */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              {/* Pill badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-waw-yellow/10 border border-waw-yellow/20 rounded-full px-4 py-2"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-waw-dark">eSIM {planDetails.country}</span>
                <span className="text-xs text-gray-400">|</span>
                <span className="text-xs text-gray-500">Activation instantanée</span>
              </motion.div>

              {/* Country flag + title */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={heroInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="flex items-center gap-4"
                >
                  <div className="relative">
                    <img
                      src={planDetails.flag}
                      alt={planDetails.country}
                      className="w-14 h-14 rounded-2xl shadow-lg object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <CheckCircle size={10} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium">Destination</p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-waw-dark leading-tight">
                      {planDetails.country}
                    </h1>
                  </div>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.45, duration: 0.6 }}
                  className="text-gray-500 text-lg leading-relaxed max-w-lg"
                >
                  {planDetails.description}
                </motion.p>
              </div>

              {/* Quick info cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.55, duration: 0.6 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3"
              >
                {[
                  { icon: Wifi, label: 'Hotspot', value: planDetails.technicalDetails.hotspot, color: 'from-blue-500/10 to-blue-600/5' },
                  { icon: Zap, label: 'Vitesse', value: planDetails.technicalDetails.speedLimit === 'Aucune limitation' ? 'Illimitée' : planDetails.technicalDetails.speedLimit, color: 'from-amber-500/10 to-amber-600/5' },
                  { icon: Clock, label: 'Validité', value: planDetails.technicalDetails.validity, color: 'from-emerald-500/10 to-emerald-600/5' },
                  { icon: Zap, label: 'Activation', value: 'Instantanée', color: 'from-purple-500/10 to-purple-600/5' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.08, duration: 0.5 }}
                    className={`bg-gradient-to-br ${item.color} border border-gray-100 rounded-2xl p-3.5 text-center`}
                  >
                    <item.icon size={18} className="text-waw-dark mx-auto mb-1.5" />
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{item.label}</p>
                    <p className="text-sm font-bold text-waw-dark mt-0.5">{item.value}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Status indicators when user completed flow */}
              <AnimatePresence>
                {emailSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap gap-3"
                  >
                    <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2 text-sm">
                      <CheckCircle size={14} className="text-emerald-500" />
                      <span className="text-emerald-700 font-medium">{chatEmail}</span>
                    </div>
                    {phoneSubmitted && (
                      <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2 text-sm">
                        <CheckCircle size={14} className="text-emerald-500" />
                        <span className="text-emerald-700 font-medium">{chatPhone}</span>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CTA Paiement - visible quand tout est validé */}
              <AnimatePresence>
                {canCheckout && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="pt-2"
                  >
                    <motion.button
                      whileHover={{ scale: 1.03, y: -3 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleCheckoutSubmit}
                      disabled={processing}
                      className="w-full sm:w-auto bg-gradient-to-r from-waw-yellow via-yellow-400 to-waw-yellow-dark text-waw-dark px-10 py-4.5 rounded-2xl font-bold text-base inline-flex items-center justify-center gap-3 shadow-xl shadow-waw-yellow/30 hover:shadow-2xl hover:shadow-waw-yellow/40 transition-all relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                      <Lock size={18} />
                      <span className="relative">{processing ? 'Traitement...' : 'Accéder au paiement sécurisé'}</span>
                      {!processing && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                    </motion.button>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Shield size={12} className="text-emerald-500" /> SSL Encrypté
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Download size={12} className="text-blue-500" /> QR Code instant
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* ===== RIGHT - Plan Cards ===== */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8, type: 'spring', stiffness: 80 }}
              className="space-y-4"
            >
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex items-center gap-3 mb-2"
              >
                <div className="w-10 h-10 bg-waw-dark rounded-xl flex items-center justify-center">
                  <CreditCard size={18} className="text-waw-yellow" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-waw-dark">Choisissez votre forfait</h2>
                  <p className="text-xs text-gray-400">Sélectionnez le plan adapté à vos besoins</p>
                </div>
              </motion.div>

              {/* Plan Cards */}
              {planDetails.plans.map((plan, i) => {
                const isSelected = selectedPlanId === plan.id;
                const gradient = planGradients[i] || planGradients[0];
                const savings = plan.originalPrice ? Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100) : 0;

                return (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 25, x: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.12, duration: 0.6, type: 'spring', stiffness: 100 }}
                    whileHover={{ y: -4, scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => emailSubmitted ? handleChangePlan(plan.id) : handleSelectPlan(plan.id)}
                    className={`relative cursor-pointer rounded-2xl p-6 py-7 border-2 transition-all duration-300 overflow-hidden group bg-gradient-to-br ${gradient.bg} ${
                      isSelected
                        ? `${gradient.border} ring-2 ${gradient.ring} ring-offset-2 shadow-xl`
                        : `border-gray-100/80 shadow-md hover:shadow-xl hover:${gradient.border}`
                    }`}
                  >
                    {/* Popular badge */}
                    {plan.popular && (
                      <div className="absolute -top-0 right-4 z-10">
                        <motion.div
                          initial={{ y: -20 }}
                          animate={{ y: 0 }}
                          className="bg-gradient-to-r from-waw-yellow to-amber-400 text-waw-dark px-3 py-1.5 rounded-b-xl text-[10px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1"
                        >
                          <Star size={10} className="fill-waw-dark" />
                          Populaire
                        </motion.div>
                      </div>
                    )}

                    {/* Savings badge */}
                    {savings > 0 && (
                      <div className="absolute top-3 left-4 z-10">
                        <span className="bg-emerald-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                          -{savings}%
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between relative z-[1]">
                      {/* Left : Icon + Info */}
                      <div className="flex items-center gap-4">
                        {/* Icon */}
                        <motion.div
                          animate={isSelected ? { scale: [1, 1.1, 1], rotate: [0, 5, 0] } : {}}
                          transition={{ duration: 0.5 }}
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            isSelected ? gradient.iconBg : 'bg-gray-100 group-hover:bg-gray-200'
                          } transition-colors`}
                        >
                          <Globe size={20} className={isSelected || plan.popular ? 'text-white' : 'text-gray-500'} />
                        </motion.div>

                        <div>
                          <div className="flex items-center gap-2.5">
                            <h3 className="text-2xl font-black text-waw-dark tracking-tight">{plan.data}</h3>
                            <span className="text-[10px] text-gray-400 bg-white/80 border border-gray-200/50 px-2 py-0.5 rounded-full font-semibold">
                              {planDetails.technicalDetails.validity}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{plan.description}</p>
                        </div>
                      </div>

                      {/* Right : Price + Selection indicator */}
                      <div className="text-right flex items-center gap-3">
                        <div>
                          {plan.originalPrice && (
                            <p className="text-xs text-gray-400 line-through">{formatPrice(plan.originalPrice)}</p>
                          )}
                          <p className="text-xl font-black text-waw-dark">
                            {formatPrice(plan.price)}
                            <span className="text-[10px] font-medium text-gray-400 ml-0.5">FCFA</span>
                          </p>
                        </div>

                        {/* Selection circle */}
                        <motion.div
                          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                            isSelected
                              ? 'border-emerald-500 bg-emerald-500 shadow-lg shadow-emerald-500/30'
                              : 'border-gray-300 group-hover:border-gray-400'
                          }`}
                        >
                          <AnimatePresence>
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0, rotate: -90 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0 }}
                                transition={{ type: 'spring', stiffness: 500 }}
                              >
                                <Check size={14} className="text-white" strokeWidth={3} />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </div>
                    </div>

                    {/* Selected details row */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-200/50">
                            {[
                              { icon: Wifi, text: `Hotspot ${planDetails.technicalDetails.hotspot}` },
                              { icon: Zap, text: 'Activation instantanée' },
                              { icon: Shield, text: 'Paiement sécurisé' },
                            ].map((feat, j) => (
                              <span key={j} className="inline-flex items-center gap-1.5 text-[11px] text-waw-dark font-medium bg-white/80 border border-gray-200/50 px-2.5 py-1 rounded-full">
                                <feat.icon size={11} className="text-waw-yellow-dark" />
                                {feat.text}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-waw-yellow/0 to-waw-yellow/0 group-hover:from-waw-yellow/[0.03] group-hover:to-amber-500/[0.03] transition-all duration-500 rounded-2xl" />
                  </motion.div>
                );
              })}

              {/* Floating badges under plans */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : {}}
                transition={{ delay: 1, duration: 0.5 }}
                className="flex items-center justify-center gap-4 pt-2"
              >
                <span className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Shield size={12} className="text-emerald-500" />
                  Paiement sécurisé
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Zap size={12} className="text-amber-500" />
                  Activation instantanée
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Download size={12} className="text-blue-500" />
                  QR Code
                </span>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ===================== HOW IT WORKS - Interactive Timeline ===================== */}
      <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden" ref={section1Ref}>
        {/* Decorative */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-waw-yellow/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="container-custom relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={section1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={section1InView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-block px-5 py-2 bg-waw-yellow/10 border border-waw-yellow/20 rounded-full text-sm font-semibold text-waw-dark mb-5"
            >
              En 4 étapes
            </motion.span>
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-waw-dark mb-4">
              Comment ça marche
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              De l'achat à l'activation, tout se fait en quelques minutes
            </p>
          </motion.div>

          {/* Interactive Timeline Layout */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">

            {/* LEFT - Steps Timeline */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={section1InView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-2"
            >
              {howItWorks.map((step, index) => {
                const isActive = activeHowStep === index;
                const isPast = activeHowStep > index;
                const StepIcon = step.icon;

                return (
                  <motion.div
                    key={index}
                    onClick={() => handleHowStepClick(index)}
                    className={`relative flex gap-5 cursor-pointer rounded-2xl p-5 transition-all duration-400 ${
                      isActive
                        ? 'bg-white shadow-xl shadow-gray-200/50 border border-gray-100'
                        : 'hover:bg-white/60 border border-transparent'
                    }`}
                    whileHover={{ x: isActive ? 0 : 4 }}
                  >
                    {/* Step number + line */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <motion.div
                        animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                        transition={{ duration: 0.4 }}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? 'bg-waw-dark shadow-lg shadow-waw-dark/20'
                            : isPast
                              ? 'bg-emerald-500 shadow-md shadow-emerald-500/20'
                              : 'bg-gray-100'
                        }`}
                      >
                        {isPast ? (
                          <Check size={18} className="text-white" strokeWidth={3} />
                        ) : (
                          <StepIcon size={18} className={isActive ? 'text-waw-yellow' : 'text-gray-400'} />
                        )}
                      </motion.div>

                      {/* Connecting line */}
                      {index < howItWorks.length - 1 && (
                        <div className="relative w-0.5 h-full min-h-[20px] mt-2">
                          <div className="absolute inset-0 bg-gray-200 rounded-full" />
                          {(isPast || isActive) && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: '100%' }}
                              transition={{ duration: 0.5 }}
                              className={`absolute top-0 left-0 w-full rounded-full ${isPast ? 'bg-emerald-400' : 'bg-waw-yellow'}`}
                            />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${
                          isActive ? 'text-waw-yellow-dark' : isPast ? 'text-emerald-500' : 'text-gray-400'
                        }`}>
                          Étape {step.step}
                        </span>
                        {isPast && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-[9px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-semibold"
                          >
                            Complété
                          </motion.span>
                        )}
                      </div>
                      <h3 className={`text-lg font-bold mb-1 transition-colors ${
                        isActive ? 'text-waw-dark' : 'text-gray-600'
                      }`}>
                        {step.title}
                      </h3>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="text-sm text-gray-500 leading-relaxed mb-3">
                              {step.description}
                            </p>
                            {/* Progress bar */}
                            {!howStepPaused && (
                              <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: '0%' }}
                                  animate={{ width: '100%' }}
                                  transition={{ duration: STEP_DURATION / 1000, ease: 'linear' }}
                                  key={`progress-${activeHowStep}`}
                                  className="h-full bg-gradient-to-r from-waw-yellow to-amber-400 rounded-full"
                                />
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* RIGHT - Visual illustration */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={section1InView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-waw-dark via-gray-900 to-gray-800 rounded-3xl p-8 md:p-10 min-h-[400px] flex items-center justify-center overflow-hidden shadow-2xl">
                {/* Background decorations */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-waw-yellow/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                    className="absolute -top-16 -right-16 w-64 h-64 border border-white/5 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                    className="absolute -bottom-20 -left-20 w-72 h-72 border border-white/5 rounded-full"
                  />
                </div>

                {/* Step illustrations */}
                <AnimatePresence mode="wait">
                  {/* Step 1 - Choose plan */}
                  {activeHowStep === 0 && (
                    <motion.div
                      key="step0"
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.5, type: 'spring', stiffness: 150 }}
                      className="relative z-10 w-full max-w-xs mx-auto space-y-3"
                    >
                      <p className="text-white/40 text-xs text-center uppercase tracking-widest mb-4 font-semibold">Sélection du forfait</p>
                      {['1 GB', '3 GB', '10 GB'].map((plan, i) => (
                        <motion.div
                          key={plan}
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
                          className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                            i === 1
                              ? 'bg-waw-yellow/15 border-waw-yellow/30'
                              : 'bg-white/5 border-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${i === 1 ? 'bg-waw-yellow/20' : 'bg-white/10'}`}>
                              <Globe size={14} className={i === 1 ? 'text-waw-yellow' : 'text-white/50'} />
                            </div>
                            <span className={`font-bold text-sm ${i === 1 ? 'text-waw-yellow' : 'text-white'}`}>{plan}</span>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            i === 1 ? 'border-waw-yellow bg-waw-yellow' : 'border-white/30'
                          }`}>
                            {i === 1 && <Check size={10} className="text-waw-dark" strokeWidth={3} />}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {/* Step 2 - Pay */}
                  {activeHowStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.5, type: 'spring', stiffness: 150 }}
                      className="relative z-10 w-full max-w-xs mx-auto text-center"
                    >
                      <p className="text-white/40 text-xs uppercase tracking-widest mb-6 font-semibold">Paiement sécurisé</p>

                      {/* Payment methods */}
                      <div className="space-y-3 mb-6">
                        {[
                          { name: 'Wave', color: 'from-blue-500 to-blue-600', letter: 'W' },
                          { name: 'Orange Money', color: 'from-orange-400 to-orange-500', letter: 'OM' },
                        ].map((method, i) => (
                          <motion.div
                            key={method.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + i * 0.15 }}
                            className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4"
                          >
                            <div className={`w-10 h-10 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center shadow-lg`}>
                              <span className="text-white font-black text-xs">{method.letter}</span>
                            </div>
                            <span className="text-white font-semibold text-sm flex-1 text-left">{method.name}</span>
                            <div className="w-5 h-5 rounded-full border-2 border-white/20" />
                          </motion.div>
                        ))}
                      </div>

                      {/* Secure badge */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center justify-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl py-3 px-4"
                      >
                        <Shield size={14} className="text-emerald-400" />
                        <span className="text-emerald-400 text-xs font-semibold">Transaction 100% sécurisée</span>
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Step 3 - QR Code */}
                  {activeHowStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.5, type: 'spring', stiffness: 150 }}
                      className="relative z-10 text-center"
                    >
                      <p className="text-white/40 text-xs uppercase tracking-widest mb-6 font-semibold">Réception du QR Code</p>

                      {/* QR Code visual */}
                      <motion.div
                        initial={{ scale: 0.5, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="relative mx-auto w-44 h-44 mb-6"
                      >
                        <div className="absolute inset-0 bg-white rounded-2xl shadow-xl p-4">
                          {/* Fake QR pattern */}
                          <div className="w-full h-full grid grid-cols-8 grid-rows-8 gap-[2px]">
                            {[...Array(64)].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + i * 0.008, duration: 0.2 }}
                                className={`rounded-[2px] ${
                                  [0,1,2,5,6,7,8,15,16,23,24,25,31,32,39,40,47,48,49,50,55,56,57,58,59,62,63].includes(i)
                                    ? 'bg-waw-dark'
                                    : Math.random() > 0.5 ? 'bg-waw-dark' : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Scan line animation */}
                        <motion.div
                          animate={{ y: [0, 160, 0] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                          className="absolute top-4 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-waw-yellow to-transparent shadow-lg shadow-waw-yellow/50"
                        />
                      </motion.div>

                      {/* Delivery info */}
                      <div className="flex items-center justify-center gap-4">
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 }}
                          className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2"
                        >
                          <Mail size={12} className="text-blue-400" />
                          <span className="text-white/60 text-xs">Par email</span>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 }}
                          className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2"
                        >
                          <Phone size={12} className="text-emerald-400" />
                          <span className="text-white/60 text-xs">Par SMS</span>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4 - Activate */}
                  {activeHowStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.5, type: 'spring', stiffness: 150 }}
                      className="relative z-10 text-center"
                    >
                      <p className="text-white/40 text-xs uppercase tracking-widest mb-6 font-semibold">Activation à destination</p>

                      {/* Phone with signal */}
                      <div className="relative mx-auto w-36">
                        <motion.div
                          initial={{ y: 20 }}
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          {/* Phone frame */}
                          <div className="bg-gradient-to-b from-gray-700 to-gray-800 rounded-[28px] p-2 shadow-2xl border border-gray-600/30">
                            <div className="bg-waw-dark rounded-[22px] p-4 min-h-[200px] flex flex-col items-center justify-center">
                              {/* Status bar */}
                              <div className="flex items-center gap-1 mb-6">
                                <motion.div
                                  animate={{ opacity: [0.3, 1, 0.3] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                  className="flex items-end gap-[2px]"
                                >
                                  {[6, 9, 12, 15].map((h, i) => (
                                    <div key={i} className="w-[3px] bg-emerald-400 rounded-full" style={{ height: h }} />
                                  ))}
                                </motion.div>
                                <span className="text-emerald-400 text-[10px] font-bold ml-1.5">5G</span>
                              </div>

                              {/* Connected icon */}
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: [0, 1.3, 1] }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-3"
                              >
                                <motion.div
                                  animate={{ scale: [1, 1.1, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center"
                                >
                                  <Wifi size={20} className="text-white" />
                                </motion.div>
                              </motion.div>

                              <p className="text-emerald-400 text-xs font-bold">Connecté</p>
                              <p className="text-white/30 text-[10px] mt-0.5">{planDetails.country}</p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Signal waves */}
                        {[1, 2, 3].map((ring) => (
                          <motion.div
                            key={ring}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: [0, 0.3, 0], scale: [0.8, 1.2 + ring * 0.2, 1.5 + ring * 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, delay: ring * 0.3 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-emerald-400/30 rounded-full pointer-events-none"
                            style={{ width: 160 + ring * 40, height: 160 + ring * 40 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Step counter bottom */}
                <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-2">
                  {howItWorks.map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => handleHowStepClick(i)}
                      animate={{
                        width: activeHowStep === i ? 28 : 8,
                        backgroundColor: activeHowStep === i ? '#FCD34D' : 'rgba(255,255,255,0.2)',
                      }}
                      className="h-2 rounded-full transition-all"
                    />
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
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

          <div className="space-y-6 max-w-3xl mx-auto">
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

      {/* ===================== MODALE CHECKOUT ===================== */}
      <AnimatePresence>
        {showCheckoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={() => setShowCheckoutModal(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="relative bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top gradient accent */}
              <div className="h-1.5 bg-gradient-to-r from-waw-yellow via-amber-400 to-orange-400" />

              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowCheckoutModal(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
              >
                <X size={16} className="text-gray-500" />
              </motion.button>

              <div className="p-8">
                {/* Icon animation */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 300 }}
                  className="w-16 h-16 bg-gradient-to-br from-waw-yellow/20 to-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6"
                >
                  <Mail size={28} className="text-waw-dark" />
                </motion.div>

                {/* Selected plan summary */}
                {selectedPlan && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gray-50 rounded-2xl p-4 mb-6 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={planDetails.flag}
                        alt={planDetails.country}
                        className="w-8 h-8 rounded-lg object-cover shadow-sm"
                      />
                      <div>
                        <p className="text-xs text-gray-400">Forfait sélectionné</p>
                        <p className="text-sm font-bold text-waw-dark">{selectedPlan.data} - {planDetails.country}</p>
                      </div>
                    </div>
                    <p className="text-lg font-black text-waw-dark">{formatPrice(selectedPlan.price)} <span className="text-xs font-normal text-gray-400">FCFA</span></p>
                  </motion.div>
                )}

                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="text-center mb-6"
                >
                  <h3 className="text-xl font-bold text-waw-dark mb-1.5">Finaliser votre commande</h3>
                  <p className="text-sm text-gray-500">Remplissez vos informations pour recevoir votre eSIM</p>
                </motion.div>

                {/* Inputs */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  {/* Email */}
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={chatEmail}
                      onChange={(e) => {
                        setChatEmail(e.target.value);
                        // Marquer email comme soumis si valide
                        if (e.target.value.trim() && e.target.value.includes('@')) {
                          setEmailSubmitted(true);
                        } else {
                          setEmailSubmitted(false);
                        }
                      }}
                      placeholder="votre@email.com"
                      autoFocus
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-gray-200 text-waw-dark placeholder:text-gray-400 focus:outline-none focus:border-waw-yellow focus:ring-4 focus:ring-waw-yellow/10 transition-all text-base font-medium"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex gap-2">
                    <select
                      value={selectedIndicatif}
                      onChange={(e) => setSelectedIndicatif(e.target.value)}
                      className="w-32 px-3 py-4 rounded-2xl bg-gray-50 border-2 border-gray-200 text-waw-dark focus:outline-none focus:border-waw-yellow focus:ring-4 focus:ring-waw-yellow/10 transition-all text-base font-medium"
                    >
                      {INDICATIFS.map((ind) => (
                        <option key={ind.ind} value={ind.ind}>
                          {ind.ind}
                        </option>
                      ))}
                    </select>
                    <div className="relative flex-1">
                      <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        value={chatPhone}
                        onChange={(e) => {
                          setChatPhone(e.target.value);
                          // Marquer phone comme soumis si valide
                          if (e.target.value.trim() && e.target.value.length >= 8) {
                            setPhoneSubmitted(true);
                          } else {
                            setPhoneSubmitted(false);
                          }
                        }}
                        placeholder="77 123 45 67"
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-gray-200 text-waw-dark placeholder:text-gray-400 focus:outline-none focus:border-waw-yellow focus:ring-4 focus:ring-waw-yellow/10 transition-all text-base font-medium"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckoutSubmit}
                    disabled={processing || !chatEmail.includes('@') || chatPhone.length < 8}
                    className="w-full mt-4 py-4 rounded-2xl bg-waw-dark text-white font-bold text-base flex items-center justify-center gap-2.5 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
                  >
                    {processing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Traitement...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirmer et payer</span>
                        {selectedPlan && <span className="text-waw-yellow">{formatPrice(selectedPlan.price)} FCFA</span>}
                        <ArrowRight size={18} />
                      </>
                    )}
                  </motion.button>
                </motion.div>

                {/* Trust line */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center text-[11px] text-gray-400 mt-4 flex items-center justify-center gap-1.5"
                >
                  <Lock size={10} />
                  Vos données sont protégées et ne seront jamais partagées
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================== MODALE CONFIRMATION PAIEMENT ===================== */}
      <AnimatePresence>
        {showConfirmModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={() => setShowConfirmModal(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="relative bg-white rounded-3xl w-full sm:w-96 md:max-w-md overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top gradient accent */}
              <div className="h-1.5 bg-gradient-to-r from-waw-yellow via-amber-400 to-orange-400" />

              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowConfirmModal(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
              >
                <X size={16} className="text-gray-500" />
              </motion.button>

              <div className="p-6 sm:p-8">
                {/* Icon animation */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 300 }}
                  className="w-16 h-16 bg-gradient-to-br from-waw-yellow/20 to-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6"
                >
                  <Check size={28} className="text-waw-dark" />
                </motion.div>

                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mb-6"
                >
                  <h3 className="text-2xl font-black text-waw-dark mb-2">Confirmer votre commande</h3>
                  <p className="text-sm text-gray-600">Récapitulatif avant paiement</p>
                </motion.div>

                {/* Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="space-y-4 mb-6"
                >
                  {/* Forfait */}
                  <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4 border-2 border-gray-200">
                    <div className="w-12 h-12 bg-gradient-to-br from-waw-yellow/20 to-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Zap size={20} className="text-waw-dark" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-400 font-semibold">FORFAIT</p>
                      <p className="text-sm font-bold text-waw-dark">{selectedPlan?.data}</p>
                      <p className="text-xs text-gray-500">{planDetails.country}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4 border-2 border-gray-200">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail size={20} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-400 font-semibold">EMAIL</p>
                      <p className="text-sm font-bold text-waw-dark truncate">{chatEmail}</p>
                    </div>
                  </div>

                  {/* Téléphone */}
                  <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4 border-2 border-gray-200">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone size={20} className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-400 font-semibold">TÉLÉPHONE</p>
                      <p className="text-sm font-bold text-waw-dark">{selectedIndicatif} {chatPhone}</p>
                    </div>
                  </div>

                  {/* Prix */}
                  <div className="bg-gradient-to-r from-waw-yellow/10 to-amber-100 rounded-2xl p-4 border-2 border-waw-yellow/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600 font-semibold">MONTANT À PAYER</p>
                        <p className="text-lg font-black text-waw-dark mt-1">
                          {selectedPlan && formatPrice(selectedPlan.price)} FCFA
                        </p>
                      </div>
                      <CreditCard size={24} className="text-waw-dark" />
                    </div>
                  </div>
                </motion.div>

                {/* Warning */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 mb-6"
                >
                  <p className="text-xs font-semibold text-blue-900 flex items-start gap-2">
                    <span className="text-base mt-0.5">ℹ️</span>
                    <span>Vous allez être redirigé vers Paytech pour effectuer le paiement de manière sécurisée</span>
                  </p>
                </motion.div>

                {/* Action buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="space-y-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={confirmAction || (() => {})}
                    disabled={processing}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-waw-dark to-gray-800 text-white font-bold text-base flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all shadow-md"
                  >
                    {processing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Redirection Paytech...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard size={18} />
                        <span>Confirmer et Payer</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowConfirmModal(false)}
                    disabled={processing}
                    className="w-full py-3 rounded-2xl text-gray-700 font-semibold text-sm hover:text-gray-900 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Modifier ma commande
                  </motion.button>
                </motion.div>

                {/* Trust line */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center text-[11px] text-gray-400 mt-5 flex items-center justify-center gap-1.5"
                >
                  <Lock size={10} />
                  Connexion sécurisée avec SSL 256-bit
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================== MODALE CONTACT (Prices not defined) ===================== */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={() => setShowContactModal(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="relative bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top gradient accent */}
              <div className="h-1.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400" />

              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowContactModal(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
              >
                <X size={16} className="text-gray-500" />
              </motion.button>

              <div className="p-8">
                {/* Icon animation with pulsing effect */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 300 }}
                  className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 relative"
                >
                  <Sparkles size={28} className="text-blue-600" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-blue-400/20 rounded-2xl"
                  />
                </motion.div>

                {/* Title with gradient */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mb-6"
                >
                  <h3 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    Commande en attente
                  </h3>
                  <p className="text-sm text-gray-600">Nos forfaits arrivent bientôt! 🚀</p>
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-5 mb-6 border border-blue-100"
                >
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-waw-dark text-sm">Forfait sélectionné</p>
                        {selectedPlan && (
                          <p className="text-xs text-gray-600 mt-1">
                            {selectedPlan.data} pour {planDetails.country} - <span className="font-bold text-waw-dark">{formatPrice(selectedPlan.price)} FCFA</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-waw-dark text-sm">Vos informations</p>
                        <p className="text-xs text-gray-600 mt-1">{chatEmail}</p>
                        <p className="text-xs text-gray-600">{selectedIndicatif} {chatPhone}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 mb-6"
                >
                  <p className="text-sm font-semibold text-amber-900 mb-3">⚡ Actuellement en configuration</p>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    Nos forfaits de données arrivent prochainement! Pendant ce temps, veuillez contacter notre équipe pour finaliser votre commande.
                  </p>
                </motion.div>

                {/* Contact CTA */}
                <motion.a
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href="mailto:contact@wawtelecom.com"
                  className="w-full block py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-base flex items-center justify-center gap-2.5 hover:shadow-lg transition-all shadow-md"
                >
                  <Mail size={18} />
                  <span>Envoyer un email</span>
                  <ArrowRight size={18} />
                </motion.a>

                {/* Alternative contact info */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="text-center text-xs text-gray-500 mt-5"
                >
                  📧 <span className="font-bold text-waw-dark">contact@wawtelecom.com</span>
                </motion.p>

                {/* Secondary action */}
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowContactModal(false)}
                  className="w-full mt-4 py-3 rounded-2xl text-gray-600 font-semibold text-sm hover:text-gray-800 hover:bg-gray-100 transition-all"
                >
                  Continuer à explorer
                </motion.button>

                {/* Trust line */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center text-[11px] text-gray-400 mt-4 flex items-center justify-center gap-1.5"
                >
                  <Lock size={10} />
                  Vos informations seront sauvegardées
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlanDetailsPage;
