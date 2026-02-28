import { useState, useEffect, useCallback } from 'react';
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
  Cpu,
  X,
  Search,
  PartyPopper,
  Navigation,
  Loader2,
  Headphones,
  User,
  Briefcase,
  Network
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { sendPublicContact } from '../services/contactService';
import type { PageType } from '../App';
import logoWaw from '../assets/images/Logo Waw officiel.png';
import backbone from '../assets/images/backbone.png';
import ingenieur from '../assets/images/ingenieurs .png';
import images4 from '../assets/images/Images4.png';
import technicien from '../assets/images/technicien.png';
import slide1 from '../assets/images/slide1.png';
import starlinkImage from '../assets/images/sanscta.png';

// Custom marker icon for Leaflet
const customMarkerIcon = L.divIcon({
  className: '',
  html: `<div style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:#FFDD33;border-radius:50%;border:3px solid #333333;box-shadow:0 4px 12px rgba(0,0,0,0.3);">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333333" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
  </div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

// Component to handle map clicks
function HomeMapClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

interface HomePage2Props {
  onNavigate: (page: PageType) => void;
}

const HomePage2 = ({ onNavigate }: HomePage2Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bgSlide, setBgSlide] = useState(0);
  const [selectedService, setSelectedService] = useState('');
  const [formStep, setFormStep] = useState(0);
  const [showComingSoon, setShowComingSoon] = useState(false);

  // Modal Starlink (bannière d'accueil)
  const [starlinkModalOpen, setStarlinkModalOpen] = useState(true);

  // Modal devis state
  const [devisModalOpen, setDevisModalOpen] = useState(false);
  const [devisStep, setDevisStep] = useState(1);
  const [devisLocation, setDevisLocation] = useState('');
  const [devisMarkerPos, setDevisMarkerPos] = useState<[number, number] | null>(null);
  const [devisForm, setDevisForm] = useState({ nom: '', email: '', telephone: '', entreprise: '', role: 'direct' as 'direct' | 'dsi' });
  const [isSubmittingDevis, setIsSubmittingDevis] = useState(false);
  const [devisError, setDevisError] = useState<string | null>(null);

  const openDevisModal = useCallback(() => {
    setDevisStep(1);
    setDevisLocation('');
    setDevisMarkerPos(null);
    setDevisForm({ nom: '', email: '', telephone: '', entreprise: '', role: 'direct' });
    setDevisError(null);
    setDevisModalOpen(true);
  }, []);

  // Contact expert modal state
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactModalStep, setContactModalStep] = useState<'choose' | 'form' | 'done'>('choose');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [expertForm, setExpertForm] = useState({ nom: '', email: '', telephone: '', entreprise: '' });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);

  const handleTeamSelect = (team: string) => {
    setSelectedTeam(team);
    setContactModalStep('form');
    setContactError(null);
  };

  const handleExpertSubmit = async () => {
    const { nom, email, telephone, entreprise } = expertForm;
    if (!nom?.trim() || !email?.trim()) {
      setContactError('Veuillez remplir au moins le nom et l\'email.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setContactError('Veuillez saisir une adresse email valide.');
      return;
    }

    setContactError(null);
    setIsSubmittingContact(true);

    const contactType = selectedTeam === 'Technique' ? 'support' : 'sales';
    const message = `Demande de contact via formulaire - Équipe ${selectedTeam}. Nom: ${nom}, Email: ${email}, Téléphone: ${telephone || 'Non renseigné'}, Entreprise: ${entreprise || 'Non renseignée'}.`;

    try {
      const response = await sendPublicContact({
        name: nom.trim(),
        email: email.trim(),
        phone: telephone?.trim() || undefined,
        company: entreprise?.trim() || undefined,
        contact_type: contactType,
        service: selectedTeam === 'Technique' ? 'Support technique' : 'Commercial',
        message,
        source_page: 'home-page-2',
      });

      if (response?.success) {
        setContactModalStep('done');
      } else {
        setContactError(response?.message || 'Une erreur est survenue.');
      }
    } catch (err: unknown) {
      const e = err as { response?: { status?: number; data?: { message?: string; errors?: Record<string, string[]> } } };
      if (e.response?.status === 422 && e.response?.data?.errors) {
        const messages = Object.values(e.response.data.errors).flat().join(' ');
        setContactError(messages || 'Erreur de validation.');
      } else if (e.response?.status === 0) {
        setContactError('Serveur inaccessible. Vérifiez votre connexion.');
      } else {
        setContactError(e.response?.data?.message || 'Une erreur est survenue. Réessayez.');
      }
    } finally {
      setIsSubmittingContact(false);
    }
  };

  const closeContactModal = () => {
    setContactModalOpen(false);
    setContactModalStep('choose');
    setSelectedTeam('');
    setExpertForm({ nom: '', email: '', telephone: '', entreprise: '' });
    setContactError(null);
  };

  /** Ouvre le modal contact directement sur le formulaire (équipe Sales), sans l’étape de choix Technique/Sales */
  const openContactModalForStudy = useCallback(() => {
    setSelectedTeam('Sales');
    setContactModalStep('form');
    setContactError(null);
    setContactModalOpen(true);
  }, []);

  const handleDevisMapClick = useCallback((lat: number, lng: number) => {
    setDevisMarkerPos([lat, lng]);
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=fr`)
      .then(res => res.json())
      .then(data => {
        const addr = data.address;
        const name = addr?.suburb || addr?.neighbourhood || addr?.city_district || addr?.town || addr?.city || 'Dakar';
        setDevisLocation(name);
      })
      .catch(() => {
        setDevisLocation(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      });
  }, []);

  const confirmDevisLocation = useCallback(() => {
    if (!devisMarkerPos || !devisLocation) return;
    setDevisStep(2);
    setTimeout(() => {
      setDevisStep(3);
    }, 3000);
  }, [devisMarkerPos, devisLocation]);

  const handleDevisSubmit = useCallback(async () => {
    const { nom, email, telephone, entreprise, role } = devisForm;
    if (!nom?.trim() || !email?.trim()) {
      setDevisError('Veuillez remplir au moins le nom et l\'email.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setDevisError('Veuillez saisir une adresse email valide.');
      return;
    }

    setDevisError(null);
    setIsSubmittingDevis(true);

    const messageDetails = [
      'Demande de devis via formulaire accueil.',
      `Localisation: ${devisLocation || 'Non spécifiée'}`,
      devisMarkerPos ? `Coordonnées: ${devisMarkerPos[0].toFixed(6)}, ${devisMarkerPos[1].toFixed(6)}` : 'Coordonnées: Non spécifiées',
      `Rôle: ${role === 'direct' ? 'Décideur direct' : 'DSI / Responsable IT'}`,
      `Entreprise: ${entreprise || 'Non spécifiée'}`,
      `Nom: ${nom}, Email: ${email}, Téléphone: ${telephone || 'Non renseigné'}.`,
    ].join('\n');

    try {
      const response = await sendPublicContact({
        name: nom.trim(),
        email: email.trim(),
        phone: telephone?.trim() || undefined,
        company: entreprise?.trim() || undefined,
        subject: 'Demande de devis',
        contact_type: 'sales',
        service: 'Demande de devis',
        message: messageDetails,
        source_page: 'home-devis-modal',
      });

      if (response?.success) {
        setDevisStep(5);
      } else {
        setDevisError(response?.message || 'Une erreur est survenue.');
      }
    } catch (err: unknown) {
      const e = err as { response?: { status?: number; data?: { message?: string; errors?: Record<string, string[]> } } };
      if (e.response?.status === 422 && e.response?.data?.errors) {
        const messages = Object.values(e.response.data.errors).flat().join(' ');
        setDevisError(messages || 'Erreur de validation.');
      } else if (e.response?.status === 0) {
        setDevisError('Serveur inaccessible. Vérifiez votre connexion.');
      } else {
        setDevisError(e.response?.data?.message || 'Une erreur est survenue. Réessayez.');
      }
    } finally {
      setIsSubmittingDevis(false);
    }
  }, [devisForm, devisLocation, devisMarkerPos]);

  const closeDevisModal = useCallback(() => {
    setDevisModalOpen(false);
    setDevisStep(1);
    setDevisError(null);
  }, []);

  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [contactRef, contactInView] = useInView({ triggerOnce: true, threshold: 0.2 });



  const heroSlides = [
    {
      title: "WAW est Revendeur Autorisé Starlink au Sénégal",
      subtitle: "Internet haut débit par satellite, partout au Sénégal",
      description: "Accédez à une connectivité satellitaire professionnelle pour vos sites d'entreprise, zones rurales et sites stratégiques. Installation clé en main et support premium par les équipes WAW.",
      image: starlinkImage,
      imageType: "single"
    },
    {
      badge: "Fibre · Cloud · IoT · SD-WAN",
      titleLine1: "La connectivité",
      titleAccent: "intelligente",
      titleLine2: "pour vos ambitions",
      tagline: "Fibre optique · Cloud souverain · eSIM · IoT",
      description: "Nous connectons votre entreprise au monde avec performance, sécurité et simplicité.",
      image: backbone,
      imageType: "single"
    },
    {
      badge: "Solutions Entreprises",
      titleLine1: "Tout ce dont vous avez",
      titleAccent: "besoin",
      titleLine2: "en un seul partenaire",
      tagline: "Connectivité · Cloud · eSIM · Infrastructure IoT",
      description: "Une gamme complète de services professionnels, adaptés à chaque stade de votre croissance.",
      images: [
        ingenieur,
        images4,
        technicien
      ],
      imageType: "collage"
    },
    {
      badge: "eSIM Internationale",
      titleLine1: "Restez connecté",
      titleAccent: "partout",
      titleLine2: "dans le monde",
      tagline: "Activation instantanée · Couverture mondiale · Sans SIM physique",
      description: "Notre eSIM nouvelle génération — voyagez sans frontières, sans changer de carte.",
      image: slide1,
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



  // Images pour le slideshow background contact
  const contactBgImages = [
    'https://wawtelecom.com/leguileu.png',
    services[0].image,
    services[1].image,
    services[3].image,
    'https://wawtelecom.com/operateurs.jpg',
  ];

  // Auto-slide pour le hero : slide Starlink (0) = 8 s, les autres = 5 s
  useEffect(() => {
    const delay = currentSlide === 0 ? 8000 : 5000;
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, delay);
    return () => clearTimeout(timer);
  }, [currentSlide, heroSlides.length]);

  // Auto-slide pour le background contact
  useEffect(() => {
    const bgTimer = setInterval(() => {
      setBgSlide((prev) => (prev + 1) % contactBgImages.length);
    }, 4000);
    return () => clearInterval(bgTimer);
  }, [contactBgImages.length]);
  
  // Détection Safari/WebKit pour optimisations spécifiques
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const checkSafari = () => {
      const ua = navigator.userAgent.toLowerCase();
      // Détection Safari desktop (macOS)
      const isSafariMac = /safari/i.test(ua) && !/chrome|crios|fxios|edge|opr/i.test(ua) && /macintosh|macintel|macos/i.test(ua);
      // Détection Safari/WebKit sur iOS
      const isIosSafari = /iphone|ipad|ipod/i.test(ua) && /webkit/i.test(ua);
      
      setIsSafari(isSafariMac || isIosSafari);
    };

    checkSafari();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Modal d'accueil Starlink */}
      <AnimatePresence>
        {starlinkModalOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 bg-black/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            onClick={() => setStarlinkModalOpen(false)}
          >
            <div className="relative w-full max-w-4xl md:max-w-5xl pointer-events-auto">
              {/* Bouton fermer — en dehors du modal, coin haut-droit, ne chevauche rien */}
              <button
                type="button"
                onClick={() => setStarlinkModalOpen(false)}
                className="absolute -top-4 -right-4 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-gray-700 text-xs font-medium shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                aria-label="Fermer"
              >
                <X size={14} />
                <span>Fermer</span>
              </button>
            <motion.div
              className="relative w-full bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.25, 0.8, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="starlink-modal-title"
            >
              {/* Image */}
              <div className="relative md:w-1/2 bg-black">
                <img
                  src={starlinkImage}
                  alt="Solution Starlink par WAW Telecom"
                  className="w-full h-56 md:h-[360px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent pointer-events-none" />
                {/* Badge déplacé dans la zone de texte */}
              </div>

              {/* Contenu texte */}
              <div className="md:w-1/2 flex flex-col justify-center px-5 py-5 md:px-7 md:py-7 gap-4">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-waw-yellow text-waw-dark text-[11px] md:text-xs font-semibold shadow-md border border-waw-dark/15">
                  <Shield className="w-3.5 h-3.5 text-waw-dark" aria-hidden />
                  <span className="tracking-wide uppercase">Revendeur Autorisé Starlink</span>
                </span>
                <h2
                  id="starlink-modal-title"
                  className="text-xl md:text-2xl font-display font-bold text-waw-dark leading-snug"
                >
                  Connectivité Starlink pour vos sites stratégiques
                </h2>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  WAW accompagne les entreprises et organisations au Sénégal pour déployer Starlink sur leurs sites
                  distants, agences et infrastructures critiques, avec un service clé en main et un support local.
                </p>
                <div className="mt-3 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setStarlinkModalOpen(false);
                      openContactModalForStudy();
                    }}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-waw-yellow text-waw-dark font-semibold text-sm md:text-base shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_14px_40px_rgba(0,0,0,0.35)] transition-all"
                  >
                    <CheckCircle size={16} className="text-waw-dark" />
                    <span>Demander une étude personnalisée</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setStarlinkModalOpen(false);
                      onNavigate('starlink-press');
                    }}
                    className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-2xl border border-gray-200 text-gray-700 text-sm md:text-base bg-white hover:bg-gray-50 shadow-sm hover:shadow-md transition-all"
                  >
                    <CheckCircle size={16} className="text-waw-yellow" />
                    <span>Lire le communiqué de presse</span>
                  </button>
                </div>
              </div>
            </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section avec Slider */}
      <section ref={heroRef} className="relative min-h-screen pt-28 md:pt-32 lg:pt-36 pb-12 md:pb-20 flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">

        <div className="container-custom relative z-10">
          {isSafari ? (
            // Version simplifiée optimisée pour Safari/WebKit (sans compositing sur le texte pour éviter le mélange de slides sur iOS)
            <div className={`flex flex-col lg:grid gap-8 items-center ${currentSlide === 0 ? 'lg:grid-cols-[0.4fr_0.6fr] lg:gap-8' : 'lg:grid-cols-2 lg:gap-12 xl:gap-16'}`}>
              {/* Contenu Texte - Gauche : key pour remount complet à chaque slide (évite repaint bug iOS) */}
              <div className="space-y-6 order-1 lg:order-none safari-slide-content">
                <div key={currentSlide}>
                  {currentSlide === 0 ? (
                    <>
                      {/* Badge Starlink Safari */}
                      <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-waw-dark text-waw-yellow text-[11px] md:text-xs font-bold tracking-widest uppercase shadow-lg border border-waw-yellow/20">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-waw-yellow opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-waw-yellow" />
                        </span>
                        Revendeur Officiel Starlink · Sénégal
                      </div>

                      <h1
                        className="font-display font-black leading-[1.1] tracking-tight text-waw-dark mb-4"
                        style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
                      >
                        Internet satellite<br />
                        <span className="text-waw-yellow" style={{ WebkitTextStroke: '1px #E6C300' }}>
                          haut débit
                        </span>{' '}
                        partout au Sénégal
                      </h1>

                      <p className="text-base md:text-lg font-medium text-waw-dark/60 mb-2 leading-snug">
                        Sites distants · Zones rurales · Infrastructures critiques
                      </p>

                      <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-md">
                        WAW déploie Starlink pour vos entreprises — installation clé en main, support local premium.
                      </p>

                      <div className="hidden lg:flex flex-col sm:flex-row gap-4 pt-5">
                        <button
                          onClick={openContactModalForStudy}
                          className="relative overflow-hidden bg-waw-yellow text-waw-dark px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_8px_32px_rgba(255,221,51,0.45)] hover:shadow-[0_16px_48px_rgba(255,221,51,0.6)] transition-all hover:scale-[1.04] hover:-translate-y-1 active:scale-97"
                        >
                          <span>Demander une étude</span>
                          <ArrowRight size={18} />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Badge Safari slides 1-3 */}
                      <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-waw-dark text-waw-yellow text-[11px] md:text-xs font-bold tracking-widest uppercase shadow-lg border border-waw-yellow/20">
                        <Zap className="w-3 h-3" />
                        {'badge' in heroSlides[currentSlide] ? (heroSlides[currentSlide] as { badge: string }).badge : ''}
                      </div>

                      <h1
                        className="font-display font-black leading-[1.1] tracking-tight text-waw-dark mb-4"
                        style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
                      >
                        {'titleLine1' in heroSlides[currentSlide] && (heroSlides[currentSlide] as { titleLine1: string }).titleLine1}<br />
                        <span className="text-waw-yellow" style={{ WebkitTextStroke: '1px #E6C300' }}>
                          {'titleAccent' in heroSlides[currentSlide] && (heroSlides[currentSlide] as { titleAccent: string }).titleAccent}
                        </span>{' '}
                        {'titleLine2' in heroSlides[currentSlide] && (heroSlides[currentSlide] as { titleLine2: string }).titleLine2}
                      </h1>

                      <p className="text-base md:text-lg font-medium text-waw-dark/60 mb-2 leading-snug">
                        {'tagline' in heroSlides[currentSlide] ? (heroSlides[currentSlide] as { tagline: string }).tagline : ''}
                      </p>

                      <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-md">
                        {heroSlides[currentSlide].description}
                      </p>

                      <div className="hidden lg:flex flex-col sm:flex-row gap-4 pt-5">
                        <button
                          onClick={() => setContactModalOpen(true)}
                          className="relative overflow-hidden bg-waw-yellow text-waw-dark px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_8px_32px_rgba(255,221,51,0.45)] hover:shadow-[0_16px_48px_rgba(255,221,51,0.6)] transition-all hover:scale-[1.04] hover:-translate-y-1 active:scale-97"
                        >
                          <span>Nous contacter</span>
                          <ArrowRight size={18} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Images - Droite (order-2 sur mobile) */}
              <div className="relative order-2 lg:order-none safari-fade-content w-full min-w-0">
                {heroSlides[currentSlide].imageType === 'single' ? (
                  <div className={`relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl gpu-accelerated w-full ${currentSlide === 0 ? '' : ''}`}>
                    <img
                      src={heroSlides[currentSlide].image}
                      alt={heroSlides[currentSlide].title}
                      className={currentSlide === 0
                        ? 'w-full h-auto max-w-full block'
                        : 'w-full h-[300px] sm:h-[400px] lg:h-[600px] object-cover'
                      }
                      style={{
                        transform: 'translate3d(0, 0, 0)',
                        WebkitTransform: 'translate3d(0, 0, 0)',
                        willChange: 'auto'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-waw-dark/20 to-transparent pointer-events-none" />
                    {currentSlide === 0 && (
                      <button
                        type="button"
                        onClick={openContactModalForStudy}
                        className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-5 md:py-3 rounded-2xl bg-waw-yellow text-waw-dark font-semibold text-[11px] md:text-sm shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.45)] transition-all absolute bottom-2 left-3 md:bottom-6 md:left-6"
                      >
                        <span>Demander une étude personnalisée</span>
                        <ArrowRight size={14} className="md:w-4 md:h-4" />
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    {heroSlides[currentSlide].images?.map((img: string, idx: number) => (
                      <div
                        key={idx}
                        className={`relative rounded-2xl overflow-hidden shadow-xl gpu-accelerated ${
                          idx === 0 ? 'sm:col-span-2 h-[200px] sm:h-[240px] md:h-[280px]' : 'h-[180px] sm:h-[200px] md:h-[240px]'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Service ${idx + 1}`}
                          className="w-full h-full object-cover"
                          style={{
                            transform: 'translate3d(0, 0, 0)',
                            WebkitTransform: 'translate3d(0, 0, 0)',
                            willChange: 'auto'
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-waw-dark/30 to-transparent" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bouton CTA - Mobile uniquement (order-3, après les images) */}
              <div className="flex lg:hidden flex-col sm:flex-row gap-4 order-3 w-full">
                <button
                  onClick={currentSlide === 0 ? openContactModalForStudy : ('ctaType' in heroSlides[currentSlide] && heroSlides[currentSlide].ctaType === 'devis' ? openDevisModal : () => setContactModalOpen(true))}
                  className={`flex items-center justify-center gap-3 w-full min-h-[52px] rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-97 ${
                    currentSlide === 0
                      ? 'bg-waw-yellow text-waw-dark shadow-[0_8px_32px_rgba(255,221,51,0.45)]'
                      : 'bg-waw-yellow text-waw-dark shadow-[0_8px_30px_rgba(255,221,51,0.25)]'
                  }`}
                >
                  <span>{currentSlide === 0 ? 'Demander une étude' : 'Nous contacter'}</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ) : (
            // Version avec animations Framer Motion optimisées pour desktop
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1]
              }}
              className={`flex flex-col lg:grid gap-8 items-center ${currentSlide === 0 ? 'lg:grid-cols-[0.4fr_0.6fr] lg:gap-8' : 'lg:grid-cols-2 lg:gap-12 xl:gap-16'}`}
              style={{
                willChange: 'opacity',
                transform: 'translate3d(0, 0, 0)'
              }}
            >
              {/* Contenu Texte - Gauche */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="space-y-6 order-1 lg:order-none min-w-0"
                style={{
                  willChange: 'opacity, transform',
                  transform: 'translate3d(0, 0, 0)'
                }}
              >
                <div>
                  {currentSlide === 0 ? (
                    <>
                      {/* Badge Starlink — slide 0 */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
                        className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-waw-dark text-waw-yellow text-[11px] md:text-xs font-bold tracking-widest uppercase shadow-lg border border-waw-yellow/20"
                      >
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-waw-yellow opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-waw-yellow" />
                        </span>
                        Revendeur Officiel Starlink · Sénégal
                      </motion.div>

                      {/* Titre slide 0 — splitté avec accent couleur */}
                      <motion.h1
                        className="font-display font-black leading-[1.1] tracking-tight text-waw-dark mb-4"
                        style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.08, ease: [0.25, 0.8, 0.25, 1] }}
                      >
                        Internet satellite<br />
                        <span className="text-waw-yellow" style={{ WebkitTextStroke: '1px #E6C300' }}>
                          haut débit
                        </span>{' '}
                        <span className="relative">
                          partout
                          <motion.span
                            className="absolute -bottom-1 left-0 h-[3px] bg-waw-yellow rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 0.5, delay: 0.55, ease: [0.25, 0.8, 0.25, 1] }}
                          />
                        </span>{' '}
                        au Sénégal
                      </motion.h1>

                      {/* Subtitle slide 0 */}
                      <motion.p
                        className="text-base md:text-lg font-medium text-waw-dark/60 mb-2 leading-snug"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.18, ease: [0.25, 0.8, 0.25, 1] }}
                      >
                        Sites distants · Zones rurales · Infrastructures critiques
                      </motion.p>
                    </>
                  ) : (
                    <>
                      {/* Badge slides 1-3 */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
                        className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-waw-dark text-waw-yellow text-[11px] md:text-xs font-bold tracking-widest uppercase shadow-lg border border-waw-yellow/20"
                      >
                        <Zap className="w-3 h-3" />
                        {'badge' in heroSlides[currentSlide] ? (heroSlides[currentSlide] as { badge: string }).badge : ''}
                      </motion.div>

                      {/* Titre slides 1-3 — même traitement que slide 0 */}
                      <motion.h1
                        className="font-display font-black leading-[1.1] tracking-tight text-waw-dark mb-4"
                        style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.08, ease: [0.25, 0.8, 0.25, 1] }}
                      >
                        {'titleLine1' in heroSlides[currentSlide] && (heroSlides[currentSlide] as { titleLine1: string }).titleLine1}<br />
                        <span className="text-waw-yellow" style={{ WebkitTextStroke: '1px #E6C300' }}>
                          {'titleAccent' in heroSlides[currentSlide] && (heroSlides[currentSlide] as { titleAccent: string }).titleAccent}
                        </span>{' '}
                        <span className="relative">
                          {'titleLine2' in heroSlides[currentSlide] && (heroSlides[currentSlide] as { titleLine2: string }).titleLine2}
                          <motion.span
                            className="absolute -bottom-1 left-0 h-[3px] bg-waw-yellow rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 0.5, delay: 0.55, ease: [0.25, 0.8, 0.25, 1] }}
                          />
                        </span>
                      </motion.h1>

                      {/* Tagline slides 1-3 */}
                      <motion.p
                        className="text-base md:text-lg font-medium text-waw-dark/60 mb-2 leading-snug"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.18, ease: [0.25, 0.8, 0.25, 1] }}
                      >
                        {'tagline' in heroSlides[currentSlide] ? (heroSlides[currentSlide] as { tagline: string }).tagline : ''}
                      </motion.p>
                    </>
                  )}
                </div>

                {/* Description — même style pour tous les slides */}
                <motion.p
                  className="text-base md:text-lg text-gray-600 leading-relaxed max-w-md"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.25, ease: [0.25, 0.8, 0.25, 1] }}
                >
                  {heroSlides[currentSlide].description}
                </motion.p>

                {/* Bouton — même style pour tous les slides */}
                <motion.div
                  className="hidden lg:flex flex-col sm:flex-row gap-4 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
                >
                  <motion.button
                    onClick={currentSlide === 0 ? openContactModalForStudy : () => setContactModalOpen(true)}
                    whileHover={{ scale: 1.04, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    className="group relative overflow-hidden bg-waw-yellow text-waw-dark px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_8px_32px_rgba(255,221,51,0.45)] hover:shadow-[0_16px_48px_rgba(255,221,51,0.6)] transition-shadow"
                  >
                    <motion.span
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    />
                    <span className="relative z-10">{currentSlide === 0 ? 'Demander une étude' : 'Nous contacter'}</span>
                    <motion.div
                      className="relative z-10"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <ArrowRight size={18} />
                    </motion.div>
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Images - Droite (order-2 sur mobile) */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="relative order-2 lg:order-none w-full min-w-0"
                style={{
                  willChange: 'opacity, transform',
                  transform: 'translate3d(0, 0, 0)'
                }}
              >
                {heroSlides[currentSlide].imageType === 'single' ? (
                  /* Image unique - slide Starlink (0) : div à la taille de l'image + CTA */
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className={`relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl w-full ${currentSlide === 0 ? 'inline-block w-full' : ''}`}
                    style={{
                      willChange: 'opacity',
                      transform: 'translate3d(0, 0, 0)'
                    }}
                  >
                    <img
                      src={heroSlides[currentSlide].image}
                      alt={heroSlides[currentSlide].title}
                      className={currentSlide === 0
                        ? 'w-full h-auto max-w-full block'
                        : 'w-full h-[300px] sm:h-[400px] lg:h-[600px] object-cover'
                      }
                      style={{
                        willChange: 'auto',
                        transform: 'translate3d(0, 0, 0)',
                        WebkitTransform: 'translate3d(0, 0, 0)'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-waw-dark/20 to-transparent pointer-events-none" />
                    {currentSlide === 0 && (
                      <motion.button
                        type="button"
                        onClick={openContactModalForStudy}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-5 md:py-3 rounded-2xl bg-waw-yellow text-waw-dark font-semibold text-[11px] md:text-sm shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.45)] transition-all absolute bottom-2 left-3 md:bottom-6 md:left-6"
                      >
                        <span>Demander une étude personnalisée</span>
                        <ArrowRight size={14} className="md:w-4 md:h-4" />
                      </motion.button>
                    )}
                  </motion.div>
                ) : (
                  /* Collage d'images */
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4"
                    style={{
                      willChange: 'opacity',
                      transform: 'translate3d(0, 0, 0)'
                    }}
                  >
                    {heroSlides[currentSlide].images?.map((img: string, idx: number) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: 0.15 + idx * 0.03 }}
                        className={`relative rounded-2xl overflow-hidden shadow-xl ${
                          idx === 0 ? 'sm:col-span-2 h-[200px] sm:h-[240px] md:h-[280px]' : 'h-[180px] sm:h-[200px] md:h-[240px]'
                        }`}
                        style={{
                          willChange: 'opacity',
                          transform: 'translate3d(0, 0, 0)'
                        }}
                      >
                        <img
                          src={img}
                          alt={`Service ${idx + 1}`}
                          className="w-full h-full object-cover"
                          style={{
                            willChange: 'auto',
                            transform: 'translate3d(0, 0, 0)',
                            WebkitTransform: 'translate3d(0, 0, 0)'
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-waw-dark/30 to-transparent" />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </motion.div>

              {/* Bouton CTA - Mobile uniquement (order-3, après les images) */}
              <motion.div
                className="flex lg:hidden flex-col sm:flex-row gap-4 order-3 w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <motion.button
                  onClick={currentSlide === 0 ? openContactModalForStudy : ('ctaType' in heroSlides[currentSlide] && heroSlides[currentSlide].ctaType === 'devis' ? openDevisModal : () => setContactModalOpen(true))}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full min-h-[52px] rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${
                    currentSlide === 0
                      ? 'bg-waw-yellow text-waw-dark shadow-[0_8px_32px_rgba(255,221,51,0.45)]'
                      : 'bg-waw-yellow text-waw-dark shadow-[0_8px_30px_rgba(255,221,51,0.25)]'
                  }`}
                >
                  <span>{currentSlide === 0 ? 'Demander une étude' : 'Nous contacter'}</span>
                  <ArrowRight size={18} />
                </motion.button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          )}

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

      {/* Section Pourquoi choisir WAW ? - Bento Grid Ultra Moderne */}
      <section ref={statsRef} className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-white via-blue-50/30 to-yellow-50/30 relative overflow-hidden">
        {/* Décorations de fond */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-waw-yellow/10 to-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-l from-purple-500/5 to-waw-yellow/5 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16 lg:mb-20"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={statsInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-block px-4 py-2 md:px-6 md:py-3 bg-waw-yellow/10 text-waw-dark rounded-full text-xs md:text-sm font-semibold mb-4 md:mb-6"
            >
              ⚡ Pourquoi choisir WAW ?
            </motion.span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold mb-4 md:mb-6 text-waw-dark px-4">
              Pourquoi choisir WAW ?
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              L'excellence technologique au service de votre entreprise.
            </p>
          </motion.div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 max-w-7xl mx-auto px-4">
            {/* Colonne gauche */}
            <div className="space-y-4 md:space-y-6">
              {/* Grande carte noire */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={statsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative bg-gradient-to-br from-waw-dark to-gray-800 rounded-2xl md:rounded-3xl p-6 md:p-8 overflow-hidden lg:max-h-[450px]"
              >
              {/* Background animé */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-0 opacity-10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-waw-yellow to-blue-500" />
              </motion.div>

              <div className="relative z-10 w-full flex flex-col">
                {/* Logo WAW avec animation */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-waw-yellow/30 p-2"
                >
                  <img
                    src={logoWaw}
                    alt="WAW Telecom Logo"
                    className="w-full h-full object-contain"
                  />
                </motion.div>

                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 md:mb-3">
                  L'efficacité dans la synergie
                </h3>
                <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6 leading-relaxed">
                  Quand tout fonctionne ensemble, tout fonctionne mieux. Nous orchestrons chaque composant de votre infrastructure pour offrir une continuité opérationnelle sans compromis.
                </p>

                {/* Mini stats avec compteurs animés */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20"
                  >
                    <div className="text-2xl font-bold text-waw-yellow mb-1">150+</div>
                    <div className="text-xs text-gray-300">Pays couverts</div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20"
                  >
                    <div className="text-2xl font-bold text-waw-yellow mb-1">99.9%</div>
                    <div className="text-xs text-gray-300">Uptime garanti</div>
                  </motion.div>
                </div>

                {/* Logo WAW en watermark en arrière-plan */}
                <motion.div
                  animate={{ opacity: [0.05, 0.1, 0.05] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute bottom-4 right-4 w-40 h-40"
                >
                  <img
                    src={logoWaw}
                    alt="WAW Telecom Logo"
                    className="w-full h-full object-contain opacity-10"
                  />
                </motion.div>
              </div>
              </motion.div>

              {/* Notre identité - juste en dessous de la grande carte */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={statsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
                className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 shadow-xl shadow-blue-500/5 overflow-hidden"
              >
                {/* Gradient animé au hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 to-yellow-500/0 group-hover:from-yellow-500/5 group-hover:to-orange-500/5 transition-all duration-500" />

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-yellow-500/30"
                  >
                    <Cpu className="text-white" size={28} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-waw-dark mb-3">Notre identité</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Acteur 100&nbsp;% sénégalais, nous grandissons au rythme des besoins de nos clients et des défis du numérique local. Chaque jour, nous plaçons la proximité, l'écoute et l'agilité au cœur de notre action.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Colonne droite - 3 cartes */}
            <div className="space-y-6">
              {/* Notre expertise */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={statsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
                className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 shadow-xl shadow-purple-500/5 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500" />

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30"
                  >
                    <Users className="text-white" size={28} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-waw-dark mb-3">Notre expertise</h3>
                  <p className="text-gray-600 leading-relaxed">
                    WAW TELECOM est un partenaire de confiance pour piloter votre transformation numérique, grâce à une approche intégrée, des infrastructures de nouvelle génération et une gouvernance de projet éprouvée.
                  </p>
                </div>
              </motion.div>

              {/* Notre promesse */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={statsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
                className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 shadow-xl shadow-green-500/5 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/0 group-hover:from-green-500/5 group-hover:to-emerald-500/5 transition-all duration-500" />

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-green-500/30"
                  >
                    <Building className="text-white" size={28} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-waw-dark mb-3">Notre promesse</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Être le moteur local d'un avenir numérique plus inclusif, plus humain et plus accessible. Parce qu'un réseau n'a de valeur que s'il crée du lien, nous garantissons une expérience qui place l'humain au centre.
                  </p>
                </div>
              </motion.div>

              {/* Notre identité (version courte) */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={statsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
                className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 shadow-xl shadow-blue-500/5 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 transition-all duration-500" />

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30"
                  >
                    <Shield className="text-white" size={28} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-waw-dark mb-3">Notre identité</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Acteur 100&nbsp;% sénégalais, nous grandissons au rythme des besoins de nos clients et des défis du numérique local.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Services - Bento Grid Asymétrique */}
      <section ref={servicesRef} className="py-28 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
        {/* Background decoratif */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-waw-yellow/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={servicesInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block px-5 py-2 bg-waw-yellow/10 border border-waw-yellow/20 rounded-full text-sm font-semibold text-waw-dark mb-6"
            >
              Nos solutions
            </motion.span>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-waw-dark mb-6">
              Nos services phare
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez nos services conçus pour propulser votre entreprise vers le succès
            </p>
          </motion.div>

          {/* Bento Grid Asymétrique */}
          <div className="grid lg:grid-cols-3 gap-5 max-w-7xl mx-auto">

            {/* GRANDE CARTE - Connectivité (prend 2 colonnes) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              onClick={() => onNavigate('connectivite')}
              className="lg:col-span-2 group relative rounded-3xl overflow-hidden cursor-pointer h-[400px]"
            >
              <img
                src={services[0].image}
                alt={services[0].title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Contenu */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end relative z-10">
                <motion.div
                  className="w-14 h-14 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/20"
                >
                  <Wifi className="text-white" size={26} />
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-2">{services[0].title}</h3>
                <p className="text-gray-200 text-base mb-4 max-w-lg">{services[0].description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {services[0].features.map((f, i) => (
                    <span key={i} className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white border border-white/10">
                      {f}
                    </span>
                  ))}
                </div>
                <div className="flex items-center text-waw-yellow font-semibold text-sm group-hover:gap-3 gap-2 transition-all">
                  <span>En savoir plus</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>

            {/* CARTE - Cloud & Hébergement */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              onClick={() => setShowComingSoon(true)}
              className="group relative rounded-3xl overflow-hidden cursor-pointer h-[400px]"
            >
              <img
                src={services[1].image}
                alt={services[1].title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

              <div className="absolute inset-0 p-6 flex flex-col justify-end relative z-10">
                <motion.div
                  className="w-12 h-12 bg-white/15 backdrop-blur-md rounded-xl flex items-center justify-center mb-3 border border-white/20"
                >
                  <Cloud className="text-white" size={22} />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">{services[1].title}</h3>
                <p className="text-gray-300 text-sm mb-3">{services[1].description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {services[1].features.map((f, i) => (
                    <span key={i} className="px-2.5 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white border border-white/10">
                      {f}
                    </span>
                  ))}
                </div>
                <div className="flex items-center text-waw-yellow font-semibold text-sm group-hover:gap-3 gap-2 transition-all">
                  <span>En savoir plus</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>

            {/* CARTE - IoT & Objets connectés */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              onClick={() => setShowComingSoon(true)}
              className="group relative rounded-3xl overflow-hidden cursor-pointer h-[350px]"
            >
              <img
                src={services[2].image}
                alt={services[2].title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

              <div className="absolute inset-0 p-6 flex flex-col justify-end relative z-10">
                <motion.div
                  className="w-12 h-12 bg-white/15 backdrop-blur-md rounded-xl flex items-center justify-center mb-3 border border-white/20"
                >
                  <Cpu className="text-white" size={22} />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">{services[2].title}</h3>
                <p className="text-gray-300 text-sm mb-3">{services[2].description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {services[2].features.map((f, i) => (
                    <span key={i} className="px-2.5 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white border border-white/10">
                      {f}
                    </span>
                  ))}
                </div>
                <div className="flex items-center text-waw-yellow font-semibold text-sm group-hover:gap-3 gap-2 transition-all">
                  <span>En savoir plus</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>

            {/* GRANDE CARTE - eSIM & Travel (prend 2 colonnes) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              onClick={() => onNavigate('travel')}
              className="lg:col-span-2 group relative rounded-3xl overflow-hidden cursor-pointer h-[350px]"
            >
              <img
                src={services[3].image}
                alt={services[3].title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Badge populaire */}
              <div className="absolute top-6 right-6 z-20">
                <motion.span
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="px-4 py-1.5 bg-waw-yellow text-waw-dark text-xs font-bold rounded-full shadow-lg"
                >
                  Populaire
                </motion.span>
              </div>

              <div className="absolute inset-0 p-8 flex flex-col justify-end relative z-10">
                <motion.div
                  className="w-14 h-14 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/20"
                >
                  <Smartphone className="text-white" size={26} />
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-2">{services[3].title}</h3>
                <p className="text-gray-200 text-base mb-4 max-w-lg">{services[3].description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {services[3].features.map((f, i) => (
                    <span key={i} className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white border border-white/10">
                      {f}
                    </span>
                  ))}
                </div>
                <div className="flex items-center text-waw-yellow font-semibold text-sm group-hover:gap-3 gap-2 transition-all">
                  <span>En savoir plus</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Section Contact - Slideshow BG + Formulaire */}
      <section ref={contactRef} className="relative min-h-screen overflow-hidden">
        {/* Slideshow Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={bgSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img
              src={contactBgImages[bgSlide]}
              alt="WAW Telecom"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

        {/* Contenu */}
        <div className="relative z-10 py-28">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Colonne gauche - Titre + infos */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="inline-block px-4 py-2 bg-waw-yellow/10 border border-waw-yellow/20 rounded-full text-sm font-semibold text-waw-yellow mb-6 backdrop-blur-sm"
                >
                  Contactez-nous
                </motion.span>

                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6">
                  Prêt à passer au{' '}
                  <span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-waw-yellow via-orange-400 to-waw-yellow bg-[length:200%_auto]"
                    style={{ animation: 'shimmer 3s ease-in-out infinite' }}
                  >
                    niveau supérieur
                  </span>
                  {' '}?
                </h2>

                <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-lg">
                  Parlons de vos besoins et trouvons la solution parfaite ensemble. Notre équipe est prête à vous accompagner.
                </p>

                {/* Coordonnées */}
                <div className="space-y-5">
                  {[
                    { icon: Phone, label: 'Téléphone', value: '+221 76 929 17 17', href: 'tel:+221769291717' },
                    { icon: Mail, label: 'Email', value: 'contact@wawtelecom.com', href: 'mailto:contact@wawtelecom.com' },
                    { icon: MapPin, label: 'Bureau', value: '56 Route de Ngor - Almadies, Dakar', href: null },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {item.href ? (
                        <a href={item.href} className="flex items-center gap-4 group">
                          <div className="w-12 h-12 rounded-xl bg-white/[0.08] backdrop-blur-sm border border-white/[0.1] flex items-center justify-center group-hover:border-waw-yellow/40 group-hover:bg-waw-yellow/10 transition-all duration-300">
                            <item.icon size={20} className="text-gray-400 group-hover:text-waw-yellow transition-colors" />
                          </div>
                          <div>
                            <p className="text-[11px] uppercase tracking-widest text-gray-500 mb-0.5">{item.label}</p>
                            <p className="text-white font-medium">{item.value}</p>
                          </div>
                        </a>
                      ) : (
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-white/[0.08] backdrop-blur-sm border border-white/[0.1] flex items-center justify-center">
                            <item.icon size={20} className="text-gray-400" />
                          </div>
                          <div>
                            <p className="text-[11px] uppercase tracking-widest text-gray-500 mb-0.5">{item.label}</p>
                            <p className="text-white font-medium">{item.value}</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Réseaux sociaux */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
                  className="flex gap-3 mt-8"
                >
                  {[
                    { icon: MessageCircle, href: 'https://wa.me/221769291717', hoverColor: 'hover:text-green-400 hover:border-green-500/30 hover:bg-green-500/10' },
                    { icon: Mail, href: 'mailto:contact@wawtelecom.com', hoverColor: 'hover:text-waw-yellow hover:border-waw-yellow/30 hover:bg-waw-yellow/10' },
                    { icon: Building, href: 'https://www.linkedin.com/company/waw-telecom/', hoverColor: 'hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/10' },
                  ].map((item, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => window.open(item.href, '_blank')}
                      className={`w-11 h-11 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-gray-500 transition-all duration-300 backdrop-blur-sm ${item.hoverColor}`}
                    >
                      <item.icon size={18} />
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>

              {/* Colonne droite - Formulaire animé */}
              <motion.div
                initial={{ opacity: 0, x: 60, rotateY: -5 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                style={{ perspective: '1000px' }}
              >
                <div className="bg-white/[0.07] backdrop-blur-xl rounded-3xl p-8 border border-white/[0.1] shadow-2xl shadow-black/20">
                  {/* Header formulaire */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Demander un devis</h3>
                    <p className="text-gray-400 text-sm">Remplissez le formulaire et nous vous recontactons sous 24h</p>

                    {/* Barre de progression */}
                    <div className="flex gap-2 mt-5">
                      {[0, 1, 2].map((step) => (
                        <motion.div
                          key={step}
                          className={`h-1 rounded-full flex-1 transition-all duration-500 ${
                            formStep >= step ? 'bg-waw-yellow' : 'bg-white/10'
                          }`}
                          initial={false}
                          animate={{ scaleX: formStep >= step ? 1 : 0.5, opacity: formStep >= step ? 1 : 0.3 }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Étape 1: Service */}
                  <AnimatePresence mode="wait">
                    {formStep === 0 && (
                      <motion.div
                        key="step0"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-4"
                      >
                        <p className="text-white font-medium mb-4">Quel service vous intéresse ?</p>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { value: 'connectivite', label: 'Connectivité', icon: Wifi, color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/20' },
                            { value: 'cloud', label: 'Cloud', icon: Cloud, color: 'from-purple-500/20 to-pink-500/20 border-purple-500/20' },
                            { value: 'iot', label: 'IoT', icon: Cpu, color: 'from-green-500/20 to-emerald-500/20 border-green-500/20' },
                            { value: 'esim', label: 'eSIM Travel', icon: Smartphone, color: 'from-waw-yellow/20 to-orange-500/20 border-waw-yellow/20' },
                          ].map((svc) => (
                            <motion.button
                              key={svc.value}
                              whileHover={{ scale: 1.03, y: -2 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => { setSelectedService(svc.value); setFormStep(1); }}
                              className={`relative p-4 rounded-2xl border text-left transition-all duration-300 ${
                                selectedService === svc.value
                                  ? 'bg-waw-yellow/10 border-waw-yellow/40'
                                  : `bg-gradient-to-br ${svc.color} border-white/[0.08] hover:border-white/20`
                              }`}
                            >
                              <svc.icon size={24} className={`mb-3 ${selectedService === svc.value ? 'text-waw-yellow' : 'text-gray-300'}`} />
                              <p className={`font-semibold text-sm ${selectedService === svc.value ? 'text-waw-yellow' : 'text-white'}`}>{svc.label}</p>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Étape 2: Coordonnées */}
                    {formStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-4"
                      >
                        <p className="text-white font-medium mb-4">Vos coordonnées</p>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <label className="text-xs text-gray-400 uppercase tracking-wider">Prénom</label>
                            <input
                              type="text"
                              placeholder="Votre prénom"
                              className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-waw-yellow/50 focus:border-waw-yellow/30 transition-all text-sm"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs text-gray-400 uppercase tracking-wider">Nom</label>
                            <input
                              type="text"
                              placeholder="Votre nom"
                              className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-waw-yellow/50 focus:border-waw-yellow/30 transition-all text-sm"
                            />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs text-gray-400 uppercase tracking-wider">Email</label>
                          <input
                            type="email"
                            placeholder="votre@email.com"
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-waw-yellow/50 focus:border-waw-yellow/30 transition-all text-sm"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs text-gray-400 uppercase tracking-wider">Téléphone</label>
                          <input
                            type="tel"
                            placeholder="+221 XX XXX XX XX"
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-waw-yellow/50 focus:border-waw-yellow/30 transition-all text-sm"
                          />
                        </div>
                        <div className="flex gap-3 pt-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setFormStep(0)}
                            className="px-6 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-gray-300 font-medium text-sm hover:bg-white/[0.1] transition-all"
                          >
                            Retour
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02, y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setFormStep(2)}
                            className="flex-1 px-6 py-3 rounded-xl bg-waw-yellow text-waw-dark font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-waw-yellow/20 hover:shadow-xl hover:shadow-waw-yellow/30 transition-all"
                          >
                            Suivant
                            <ArrowRight size={16} />
                          </motion.button>
                        </div>
                      </motion.div>
                    )}

                    {/* Étape 3: Message */}
                    {formStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-4"
                      >
                        <p className="text-white font-medium mb-4">Décrivez votre projet</p>
                        <div className="space-y-1.5">
                          <label className="text-xs text-gray-400 uppercase tracking-wider">Message</label>
                          <textarea
                            rows={5}
                            placeholder="Décrivez-nous votre projet ou vos besoins..."
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-waw-yellow/50 focus:border-waw-yellow/30 transition-all resize-none text-sm"
                          />
                        </div>
                        <div className="flex gap-3 pt-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setFormStep(1)}
                            className="px-6 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-gray-300 font-medium text-sm hover:bg-white/[0.1] transition-all"
                          >
                            Retour
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            type="submit"
                            className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-waw-yellow to-orange-400 text-waw-dark font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-waw-yellow/25 hover:shadow-xl hover:shadow-waw-yellow/40 transition-all"
                          >
                            <Send size={16} />
                            Envoyer la demande
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Indicateur slide background */}
                  <div className="flex justify-center gap-1.5 mt-8">
                    {contactBgImages.map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ width: bgSlide === i ? 24 : 6, opacity: bgSlide === i ? 1 : 0.3 }}
                        className="h-1.5 rounded-full bg-waw-yellow"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CSS Keyframes pour le shimmer effect */}
      <style>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 200% center; }
        }
      `}</style>

      {/* ================================================ */}
      {/* MODAL DEVIS - 5 étapes                         */}
      {/* ================================================ */}
      <AnimatePresence>
        {devisModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={closeDevisModal}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />

            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 40 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeDevisModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X size={18} className="text-gray-500" />
              </button>

              {/* Progress bar */}
              <div className="h-1 bg-gray-100">
                <motion.div
                  className="h-full bg-gradient-to-r from-waw-yellow to-orange-400 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${(devisStep / 5) * 100}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>

              <div className="p-8">
                <AnimatePresence mode="wait">

                  {/* ──────── STEP 1: Carte Dakar ──────── */}
                  {devisStep === 1 && (
                    <motion.div
                      key="devis-step1"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="text-center mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-waw-yellow/10 flex items-center justify-center mx-auto mb-3">
                          <MapPin size={28} className="text-waw-dark" />
                        </div>
                        <h3 className="text-xl font-bold text-waw-dark mb-1">Demande de devis</h3>
                        <p className="text-sm text-gray-400">Cliquez sur la carte pour localiser votre entreprise</p>
                      </div>

                      <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm h-[400px] mb-3 relative z-0">
                        <MapContainer
                          center={[14.7167, -17.4677]}
                          zoom={12}
                          scrollWheelZoom={true}
                          style={{ height: '100%', width: '100%' }}
                          zoomControl={false}
                        >
                          <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />
                          <HomeMapClickHandler onMapClick={handleDevisMapClick} />
                          {devisMarkerPos && (
                            <Marker position={devisMarkerPos} icon={customMarkerIcon} />
                          )}
                        </MapContainer>
                      </div>

                      {devisMarkerPos ? (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-3"
                        >
                          <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-waw-yellow/15 flex items-center justify-center flex-shrink-0">
                              <Navigation size={14} className="text-waw-dark" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-[10px] text-gray-400 uppercase tracking-wide">Emplacement sélectionné</p>
                              <p className="text-sm font-semibold text-waw-dark truncate">{devisLocation || 'Chargement...'}</p>
                            </div>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.02, y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={confirmDevisLocation}
                            disabled={!devisLocation}
                            className="w-full bg-waw-dark text-white py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                          >
                            <span>Vérifier l'éligibilité</span>
                            <ArrowRight size={16} />
                          </motion.button>
                        </motion.div>
                      ) : (
                        <p className="text-center text-xs text-gray-400">
                          Zoomez et cliquez pour placer le marqueur
                        </p>
                      )}
                    </motion.div>
                  )}

                  {/* ──────── STEP 2: Recherche d'éligibilité ──────── */}
                  {devisStep === 2 && (
                    <motion.div
                      key="devis-step2"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.4 }}
                      className="text-center py-8"
                    >
                      <div className="relative w-24 h-24 mx-auto mb-8">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          className="absolute inset-0 rounded-full border-2 border-transparent border-t-waw-yellow border-r-waw-yellow/30"
                        />
                        <motion.div
                          animate={{ rotate: -360 }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                          className="absolute inset-2 rounded-full border-2 border-transparent border-b-orange-400 border-l-orange-400/30"
                        />
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                          className="absolute inset-4 rounded-full border-2 border-transparent border-t-waw-dark/30"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                            <Search size={28} className="text-waw-dark" />
                          </motion.div>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-waw-dark mb-2">Recherche d'éligibilité</h3>
                      <p className="text-sm text-gray-400 mb-6">
                        Vérification de la couverture à <span className="font-semibold text-waw-dark">{devisLocation}</span>...
                      </p>

                      <div className="max-w-xs mx-auto">
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 3, ease: 'easeInOut' }}
                            className="h-full bg-gradient-to-r from-waw-yellow via-orange-400 to-waw-yellow rounded-full"
                          />
                        </div>
                        <div className="flex justify-between mt-2">
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-[10px] text-gray-400"
                          >
                            Analyse réseau...
                          </motion.span>
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="text-[10px] text-waw-dark font-medium"
                          >
                            <Loader2 size={10} className="inline animate-spin mr-1" />
                            En cours
                          </motion.span>
                        </div>
                      </div>

                      <div className="mt-6 space-y-2 max-w-xs mx-auto">
                        {[
                          { text: 'Vérification infrastructure...', delay: 0.5 },
                          { text: 'Analyse bande passante disponible...', delay: 1.2 },
                          { text: 'Test de connectivité...', delay: 2 },
                        ].map((log, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: log.delay, duration: 0.3 }}
                            className="flex items-center gap-2 text-left"
                          >
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: log.delay + 0.3 }}
                              className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0"
                            >
                              <CheckCircle size={10} className="text-emerald-500" />
                            </motion.div>
                            <span className="text-[11px] text-gray-500">{log.text}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* ──────── STEP 3: Bravo ──────── */}
                  {devisStep === 3 && (
                    <motion.div
                      key="devis-step3"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className="text-center py-6"
                    >
                      <div className="relative">
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 0, x: 0, scale: 0 }}
                            animate={{
                              opacity: [0, 1, 0],
                              y: [0, -60 - Math.random() * 40],
                              x: [(Math.random() - 0.5) * 120],
                              scale: [0, 1, 0.5],
                              rotate: [0, Math.random() * 360],
                            }}
                            transition={{ duration: 1.2, delay: i * 0.08, ease: 'easeOut' }}
                            className="absolute left-1/2 top-1/2"
                          >
                            <div
                              className="w-3 h-3 rounded-sm"
                              style={{
                                background: ['#FFDD33', '#FF8C42', '#4ADE80', '#60A5FA', '#F472B6', '#A78BFA'][i % 6],
                              }}
                            />
                          </motion.div>
                        ))}

                        <motion.div
                          initial={{ scale: 0, rotate: -20 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                          className="w-20 h-20 rounded-3xl bg-gradient-to-br from-waw-yellow/20 to-emerald-100 flex items-center justify-center mx-auto mb-6"
                        >
                          <PartyPopper size={40} className="text-waw-dark" />
                        </motion.div>
                      </div>

                      <motion.h3
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl font-bold text-waw-dark mb-2"
                      >
                        Bravo !
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-sm text-gray-500 mb-2"
                      >
                        Votre zone <span className="font-bold text-waw-dark">{devisLocation}</span> est éligible
                      </motion.p>

                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-sm text-gray-400 mb-8"
                      >
                        à nos services <span className="font-semibold text-waw-dark">WAW Telecom</span>
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-emerald-50 rounded-2xl p-4 mb-8 border border-emerald-100"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle size={18} className="text-emerald-500" />
                          <span className="text-sm font-semibold text-emerald-700">Zone couverte - Infrastructure disponible</span>
                        </div>
                      </motion.div>

                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setDevisStep(4)}
                        className="bg-waw-dark text-white px-8 py-3.5 rounded-2xl font-bold text-sm inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
                      >
                        <span>Continuer</span>
                        <ArrowRight size={16} />
                      </motion.button>
                    </motion.div>
                  )}

                  {/* ──────── STEP 4: Formulaire contact ──────── */}
                  {devisStep === 4 && (
                    <motion.div
                      key="devis-step4"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="text-center mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-waw-yellow/10 flex items-center justify-center mx-auto mb-4">
                          <User size={28} className="text-waw-dark" />
                        </div>
                        <h3 className="text-xl font-bold text-waw-dark mb-1">Vos coordonnées</h3>
                        <p className="text-sm text-gray-400">Renseignez vos informations ou celles de votre DSI</p>
                      </div>

                      <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
                        <button
                          onClick={() => setDevisForm(f => ({ ...f, role: 'direct' }))}
                          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                            devisForm.role === 'direct'
                              ? 'bg-white text-waw-dark shadow-sm'
                              : 'text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          <User size={14} className="inline mr-1.5" />
                          Contact direct
                        </button>
                        <button
                          onClick={() => setDevisForm(f => ({ ...f, role: 'dsi' }))}
                          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                            devisForm.role === 'dsi'
                              ? 'bg-white text-waw-dark shadow-sm'
                              : 'text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          <Briefcase size={14} className="inline mr-1.5" />
                          Contact DSI
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-semibold text-gray-500 mb-1 block">
                            {devisForm.role === 'dsi' ? 'Nom du DSI' : 'Nom complet'}
                          </label>
                          <input
                            type="text"
                            value={devisForm.nom}
                            onChange={(e) => setDevisForm(f => ({ ...f, nom: e.target.value }))}
                            placeholder={devisForm.role === 'dsi' ? 'Nom du Directeur SI' : 'Votre nom complet'}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-waw-dark placeholder:text-gray-300 focus:outline-none focus:border-waw-yellow focus:ring-2 focus:ring-waw-yellow/10 transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 mb-1 block">Email professionnel</label>
                          <input
                            type="email"
                            value={devisForm.email}
                            onChange={(e) => setDevisForm(f => ({ ...f, email: e.target.value }))}
                            placeholder="email@entreprise.com"
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-waw-dark placeholder:text-gray-300 focus:outline-none focus:border-waw-yellow focus:ring-2 focus:ring-waw-yellow/10 transition-all"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-semibold text-gray-500 mb-1 block">Téléphone</label>
                            <input
                              type="tel"
                              value={devisForm.telephone}
                              onChange={(e) => setDevisForm(f => ({ ...f, telephone: e.target.value }))}
                              placeholder="+221 7X XXX XX XX"
                              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-waw-dark placeholder:text-gray-300 focus:outline-none focus:border-waw-yellow focus:ring-2 focus:ring-waw-yellow/10 transition-all"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-gray-500 mb-1 block">Entreprise</label>
                            <input
                              type="text"
                              value={devisForm.entreprise}
                              onChange={(e) => setDevisForm(f => ({ ...f, entreprise: e.target.value }))}
                              placeholder="Nom entreprise"
                              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-waw-dark placeholder:text-gray-300 focus:outline-none focus:border-waw-yellow focus:ring-2 focus:ring-waw-yellow/10 transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      {devisError && (
                        <p className="mt-3 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-xl">{devisError}</p>
                      )}

                      <motion.button
                        whileHover={!isSubmittingDevis ? { scale: 1.02, y: -1 } : undefined}
                        whileTap={!isSubmittingDevis ? { scale: 0.98 } : undefined}
                        onClick={handleDevisSubmit}
                        disabled={isSubmittingDevis}
                        className="w-full mt-6 bg-waw-dark text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmittingDevis ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                        <span>{isSubmittingDevis ? 'Envoi en cours...' : 'Envoyer ma demande'}</span>
                      </motion.button>
                    </motion.div>
                  )}

                  {/* ──────── STEP 5: Confirmation ──────── */}
                  {devisStep === 5 && (
                    <motion.div
                      key="devis-step5"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className="text-center py-6"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                        className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6"
                      >
                        <motion.div
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                        >
                          <CheckCircle size={40} className="text-emerald-500" />
                        </motion.div>
                      </motion.div>

                      <motion.h3
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl font-bold text-waw-dark mb-3"
                      >
                        Demande envoyée !
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-sm text-gray-500 mb-6 leading-relaxed max-w-sm mx-auto"
                      >
                        Merci pour votre intérêt ! Notre équipe <span className="font-bold text-waw-dark">Sales</span> va étudier votre demande et vous recontactera dans les plus brefs délais.
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-gray-50 rounded-2xl p-5 mb-8 text-left space-y-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-waw-yellow/10 flex items-center justify-center flex-shrink-0">
                            <MapPin size={16} className="text-waw-dark" />
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Zone</p>
                            <p className="text-sm font-semibold text-waw-dark">{devisLocation}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-waw-yellow/10 flex items-center justify-center flex-shrink-0">
                            <Network size={16} className="text-waw-dark" />
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Service</p>
                            <p className="text-sm font-semibold text-waw-dark">WAW Telecom - Demande de contact</p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={closeDevisModal}
                        className="bg-waw-dark text-white px-8 py-3.5 rounded-2xl font-bold text-sm inline-flex items-center gap-2 shadow-lg transition-all"
                      >
                        <span>Fermer</span>
                      </motion.button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Coming Soon */}
      <AnimatePresence>
        {showComingSoon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowComingSoon(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-3xl p-10 max-w-sm w-full shadow-2xl text-center"
              onClick={(e) => e.stopPropagation()}
              onAnimationComplete={() => {
                setTimeout(() => setShowComingSoon(false), 2500);
              }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-16 h-16 bg-waw-yellow/10 rounded-2xl flex items-center justify-center mx-auto mb-5"
              >
                <Clock size={32} className="text-waw-yellow" />
              </motion.div>
              <h3 className="text-xl font-bold text-waw-dark mb-2">Bientôt disponible</h3>
              <p className="text-gray-500 text-sm">Ce service arrive très prochainement. Restez connecté !</p>
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 2.5, ease: 'linear' }}
                className="h-1 bg-waw-yellow rounded-full mt-6 mx-auto"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Expert Modal */}
      <AnimatePresence>
        {contactModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={closeContactModal}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />

            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 40 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeContactModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X size={18} className="text-gray-500" />
              </button>

              <div className="p-8">
                <AnimatePresence mode="wait">

                  {/* ── Choix équipe ── */}
                  {contactModalStep === 'choose' && (
                    <motion.div
                      key="choose"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="text-center mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-waw-yellow/10 flex items-center justify-center mx-auto mb-4">
                          <Phone size={28} className="text-waw-dark" />
                        </div>
                        <h3 className="text-xl font-bold text-waw-dark mb-1">Nous contacter</h3>
                        <p className="text-sm text-gray-400">Avec quelle équipe souhaitez-vous échanger ?</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <motion.button
                          whileHover={{ scale: 1.03, y: -3 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleTeamSelect('Technique')}
                          className="group p-6 rounded-2xl border-2 border-gray-100 hover:border-waw-yellow/40 bg-gray-50 hover:bg-waw-yellow/5 transition-all text-center"
                        >
                          <div className="w-14 h-14 rounded-2xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center mx-auto mb-4 transition-colors">
                            <Headphones size={26} className="text-blue-600" />
                          </div>
                          <p className="font-bold text-waw-dark text-sm mb-1">Équipe Technique</p>
                          <p className="text-xs text-gray-400 leading-relaxed">Support, infrastructure, déploiement</p>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.03, y: -3 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleTeamSelect('Sales')}
                          className="group p-6 rounded-2xl border-2 border-gray-100 hover:border-waw-yellow/40 bg-gray-50 hover:bg-waw-yellow/5 transition-all text-center"
                        >
                          <div className="w-14 h-14 rounded-2xl bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center mx-auto mb-4 transition-colors">
                            <TrendingUp size={26} className="text-emerald-600" />
                          </div>
                          <p className="font-bold text-waw-dark text-sm mb-1">Équipe Sales</p>
                          <p className="text-xs text-gray-400 leading-relaxed">Offres, tarifs, partenariats</p>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* ── Formulaire contact ── */}
                  {contactModalStep === 'form' && (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="text-center mb-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                          selectedTeam === 'Technique' ? 'bg-blue-50' : 'bg-emerald-50'
                        }`}>
                          {selectedTeam === 'Technique'
                            ? <Headphones size={28} className="text-blue-600" />
                            : <TrendingUp size={28} className="text-emerald-600" />
                          }
                        </div>
                        <h3 className="text-xl font-bold text-waw-dark mb-1">Équipe {selectedTeam}</h3>
                        <p className="text-sm text-gray-400">Laissez-nous vos coordonnées</p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-semibold text-gray-500 mb-1 block">Nom complet</label>
                          <input
                            type="text"
                            value={expertForm.nom}
                            onChange={(e) => setExpertForm(f => ({ ...f, nom: e.target.value }))}
                            placeholder="Votre nom complet"
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-waw-dark placeholder:text-gray-300 focus:outline-none focus:border-waw-yellow focus:ring-2 focus:ring-waw-yellow/10 transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 mb-1 block">Email professionnel</label>
                          <input
                            type="email"
                            value={expertForm.email}
                            onChange={(e) => setExpertForm(f => ({ ...f, email: e.target.value }))}
                            placeholder="email@entreprise.com"
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-waw-dark placeholder:text-gray-300 focus:outline-none focus:border-waw-yellow focus:ring-2 focus:ring-waw-yellow/10 transition-all"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-semibold text-gray-500 mb-1 block">Téléphone</label>
                            <input
                              type="tel"
                              value={expertForm.telephone}
                              onChange={(e) => setExpertForm(f => ({ ...f, telephone: e.target.value }))}
                              placeholder="+221 7X XXX XX XX"
                              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-waw-dark placeholder:text-gray-300 focus:outline-none focus:border-waw-yellow focus:ring-2 focus:ring-waw-yellow/10 transition-all"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-gray-500 mb-1 block">Entreprise</label>
                            <input
                              type="text"
                              value={expertForm.entreprise}
                              onChange={(e) => setExpertForm(f => ({ ...f, entreprise: e.target.value }))}
                              placeholder="Nom entreprise"
                              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-waw-dark placeholder:text-gray-300 focus:outline-none focus:border-waw-yellow focus:ring-2 focus:ring-waw-yellow/10 transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      {contactError && (
                        <p className="mt-3 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-xl">{contactError}</p>
                      )}

                      <motion.button
                        whileHover={!isSubmittingContact ? { scale: 1.02, y: -1 } : undefined}
                        whileTap={!isSubmittingContact ? { scale: 0.98 } : undefined}
                        onClick={handleExpertSubmit}
                        disabled={isSubmittingContact}
                        className="w-full mt-6 bg-waw-dark text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmittingContact ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                        <span>{isSubmittingContact ? 'Envoi en cours...' : 'Envoyer'}</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setContactModalStep('choose')}
                        className="w-full mt-3 text-gray-500 hover:text-gray-700 font-medium py-2"
                      >
                        ← Retour
                      </motion.button>
                    </motion.div>
                  )}

                  {/* ── Confirmation ── */}
                  {contactModalStep === 'done' && (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className="text-center py-6"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                        className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6"
                      >
                        <motion.div
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                        >
                          <CheckCircle size={40} className="text-emerald-500" />
                        </motion.div>
                      </motion.div>

                      <motion.h3
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl font-bold text-waw-dark mb-3"
                      >
                        Message envoyé !
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-sm text-gray-500 mb-8 leading-relaxed max-w-sm mx-auto"
                      >
                        Merci de votre intérêt ! Notre équipe <span className="font-bold text-waw-dark">{selectedTeam}</span> va étudier votre demande et vous recontactera dans les plus brefs délais.
                      </motion.p>

                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={closeContactModal}
                        className="bg-waw-dark text-white px-8 py-3.5 rounded-2xl font-bold text-sm inline-flex items-center gap-2 shadow-lg transition-all"
                      >
                        <span>Fermer</span>
                      </motion.button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default HomePage2;
