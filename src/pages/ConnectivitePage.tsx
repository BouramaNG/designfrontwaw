import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Shield,
  Network,
  Zap,
  Globe,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  Building,
  Router,
  Wifi,
  MessageCircle,
  MapPin,
  Search,
  PartyPopper,
  User,
  Briefcase,
  Send,
  X,
  Loader2,
  Navigation,
  Headphones,
  TrendingUp,
  Clock,
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { PageType } from '../App';

// Custom marker icon for Leaflet (default icons break with bundlers)
const customMarkerIcon = L.divIcon({
  className: '',
  html: `<div style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:#FFDD33;border-radius:50%;border:3px solid #333333;box-shadow:0 4px 12px rgba(0,0,0,0.3);">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333333" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
  </div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

interface ConnectivitePageProps {
  onNavigate: (page: PageType) => void;
}

// Component to handle map clicks
function MapClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

const ConnectivitePage = ({ onNavigate }: ConnectivitePageProps) => {
  const [imgFlip, setImgFlip] = useState(0);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [markerPos, setMarkerPos] = useState<[number, number] | null>(null);
  const [contactForm, setContactForm] = useState({ nom: '', email: '', telephone: '', entreprise: '', role: 'direct' as 'direct' | 'dsi' });

  const openServiceModal = (service: string) => {
    setSelectedService(service);
    setModalStep(1);
    setSelectedLocation('');
    setMarkerPos(null);
    setContactForm({ nom: '', email: '', telephone: '', entreprise: '', role: 'direct' });
    setModalOpen(true);
  };

  const handleMapClick = (lat: number, lng: number) => {
    setMarkerPos([lat, lng]);
    // Reverse geocode to get a readable address
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=fr`)
      .then(res => res.json())
      .then(data => {
        const addr = data.address;
        const name = addr?.suburb || addr?.neighbourhood || addr?.city_district || addr?.town || addr?.city || 'Dakar';
        setSelectedLocation(name);
      })
      .catch(() => {
        setSelectedLocation(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      });
  };

  const confirmLocation = () => {
    if (!markerPos || !selectedLocation) return;
    setModalStep(2);
    // After 3s of "searching", show bravo
    setTimeout(() => {
      setModalStep(3);
    }, 3000);
  };

  const handleContactSubmit = () => {
    setModalStep(5);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalStep(1);
  };

  // Contact expert modal state
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactModalStep, setContactModalStep] = useState<'choose' | 'form' | 'done'>('choose');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [expertForm, setExpertForm] = useState({ nom: '', email: '', telephone: '', entreprise: '' });

  const handleTeamSelect = (team: string) => {
    setSelectedTeam(team);
    setContactModalStep('form');
  };

  const handleExpertSubmit = () => {
    setContactModalStep('done');
  };

  const closeContactModal = () => {
    setContactModalOpen(false);
    setContactModalStep('choose');
    setSelectedTeam('');
    setExpertForm({ nom: '', email: '', telephone: '', entreprise: '' });
  };

  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [section1Ref, section1InView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [section2Ref, section2InView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [section3Ref, section3InView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.15 });

  // Cycle images every 4 seconds (0 -> 1 -> 0 -> 1...)
  useEffect(() => {
    const interval = setInterval(() => {
      setImgFlip(prev => (prev === 0 ? 1 : 0));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">

      {/* ============================== */}
      {/* HERO - INCHANGÉ (déjà validé) */}
      {/* ============================== */}
      <section className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-white pt-32 pb-12">
        <div className="absolute inset-0">
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] bg-waw-yellow/8 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1, 1.3, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px]"
          />
        </div>

        <div className="container-custom relative z-10">
          <div ref={heroRef} className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center min-h-[80vh]">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block px-4 py-2 bg-waw-yellow/10 border border-waw-yellow/20 rounded-full text-sm font-semibold text-waw-yellow mb-6 backdrop-blur-sm"
              >
                Connectivité Enterprise
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.05] mb-6"
              >
                Internet{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-waw-yellow via-orange-400 to-waw-yellow bg-[length:200%_auto]" style={{ animation: 'shimmer 3s ease-in-out infinite' }}>
                  Entreprise haut débit
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-4 mb-8"
              >
                <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
                  Restez performants en toute circonstance. Nos accès Internet professionnels s'adaptent à vos usages (bureaux, sites distants, cloud, visioconférences) pour offrir une expérience fluide et constante.
                </p>
                <p className="text-base text-gray-500">
                  <span className="text-waw-yellow font-semibold">Atouts clés :</span> performance stable, continuité de service, offres flexibles selon vos besoins.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onNavigate('contact')}
                  className="group bg-waw-yellow text-waw-dark px-8 py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow-[0_8px_30px_rgba(255,221,51,0.25)] hover:shadow-[0_12px_40px_rgba(255,221,51,0.4)]"
                >
                  <span>Parlez à un expert</span>
                  <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ArrowRight size={18} />
                  </motion.div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => window.open('tel:+221338601929')}
                  className="group bg-white/[0.06] backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 border border-white/[0.08] transition-all hover:bg-white/[0.1] hover:border-white/[0.15]"
                >
                  <Phone size={18} />
                  <span>+221 33 860 19 29</span>
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:flex items-center justify-center"
            >
              <div className="relative w-[480px] h-[480px]" style={{ perspective: '800px' }}>
                <motion.div
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 360] }}
                  transition={{ scale: { duration: 3, repeat: Infinity }, rotate: { duration: 40, repeat: Infinity, ease: 'linear' } }}
                  className="absolute inset-10 rounded-full border border-waw-yellow/10"
                />
                <motion.div
                  animate={{ scale: [1, 1.08, 1], rotate: [360, 0] }}
                  transition={{ scale: { duration: 4, repeat: Infinity }, rotate: { duration: 30, repeat: Infinity, ease: 'linear' } }}
                  className="absolute inset-20 rounded-full border border-waw-yellow/5"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-28 h-28 rounded-3xl bg-gradient-to-br from-waw-yellow/20 to-orange-500/10 backdrop-blur-xl border border-waw-yellow/20 flex items-center justify-center shadow-[0_0_60px_rgba(255,221,51,0.15)]"
                  >
                    <Network size={40} className="text-waw-yellow" />
                  </motion.div>
                </div>

                {[
                  { icon: Building, angle: 0, label: 'Bureaux', delay: 0 },
                  { icon: Globe, angle: 72, label: 'Cloud', delay: 0.3 },
                  { icon: Shield, angle: 144, label: 'VPN', delay: 0.6 },
                  { icon: Router, angle: 216, label: 'SD-WAN', delay: 0.9 },
                  { icon: Wifi, angle: 288, label: 'WiFi', delay: 1.2 },
                ].map((node, i) => {
                  const radius = 180;
                  const x = Math.cos((node.angle * Math.PI) / 180) * radius;
                  const y = Math.sin((node.angle * Math.PI) / 180) * radius;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.8 + node.delay, type: 'spring', stiffness: 200 }}
                      className="absolute"
                      style={{ left: `calc(50% + ${x}px - 28px)`, top: `calc(50% + ${y}px - 28px)` }}
                    >
                      <motion.div
                        animate={{ y: [-4, 4, -4] }}
                        transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                        whileHover={{ scale: 1.2 }}
                        className="group relative"
                      >
                        <div className="w-14 h-14 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/[0.1] flex items-center justify-center hover:border-waw-yellow/30 hover:bg-waw-yellow/5 transition-all cursor-pointer">
                          <node.icon size={22} className="text-gray-400 group-hover:text-waw-yellow transition-colors" />
                        </div>
                        <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-600 font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                          {node.label}
                        </p>
                      </motion.div>
                    </motion.div>
                  );
                })}

                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                  {[0, 72, 144, 216, 288].map((angle, i) => {
                    const radius = 180;
                    const x = 240 + Math.cos((angle * Math.PI) / 180) * radius;
                    const y = 240 + Math.sin((angle * Math.PI) / 180) * radius;
                    return (
                      <motion.line
                        key={i}
                        x1="240" y1="240" x2={x} y2={y}
                        stroke="rgba(255,221,51,0.08)"
                        strokeWidth="1"
                        initial={{ pathLength: 0 }}
                        animate={heroInView ? { pathLength: 1 } : {}}
                        transition={{ duration: 1, delay: 0.8 + i * 0.15 }}
                      />
                    );
                  })}
                </svg>

                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      x: [0, Math.random() * 40 - 20, 0],
                      y: [0, Math.random() * 40 - 20, 0],
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
                    className="absolute w-1.5 h-1.5 bg-waw-yellow/30 rounded-full"
                    style={{ left: `${20 + Math.random() * 60}%`, top: `${20 + Math.random() * 60}%` }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-9 border-2 border-white/20 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 bg-waw-yellow rounded-full mt-1.5"
            />
          </div>
        </motion.div>
      </section>

      <style>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 200% center; }
        }
      `}</style>


      {/* ================================================ */}
      {/* SECTION 1 - Connectivité privée                  */}
      {/* Texte GAUCHE  |  Image 3D DROITE                 */}
      {/* ================================================ */}
      <section ref={section1Ref} className="relative py-24 lg:py-32 overflow-hidden bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Texte */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={section1InView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-block px-4 py-2 bg-waw-yellow/10 rounded-full text-sm font-bold text-waw-dark mb-6">
                Sécurité Avancée
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-waw-dark leading-[1.15] mb-6">
                Connectivité privée &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-waw-yellow to-orange-400">
                  sécurité renforcée
                </span>
              </h2>

              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
                Au-delà d'une simple connexion, WAW TELECOM déploie des réseaux privés taillés pour les enjeux critiques de votre entreprise : isolation des flux, contrôle d'accès, chiffrement et supervision.
              </p>

              {/* Features list */}
              <div className="space-y-4 mb-10">
                {[
                  { icon: Shield, text: 'Protection des données — chiffrement de bout en bout' },
                  { icon: Zap, text: 'Conformité facilitée — haute disponibilité garantie' },
                  { icon: Network, text: 'Fiabilité et maîtrise de bout en bout' },
                ].map((item, i) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -20 }}
                    animate={section1InView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-waw-yellow/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon size={16} className="text-waw-dark" />
                    </div>
                    <p className="text-gray-600 text-[15px] leading-relaxed">{item.text}</p>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => openServiceModal('Connectivité privée & sécurité')}
                className="group bg-waw-dark text-white px-7 py-3.5 rounded-2xl font-bold text-sm inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
              >
                <span>Demander un audit</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

            {/* Images 3D avec flip */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={section1InView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
              style={{ perspective: '1200px' }}
            >
              <div className="relative h-[400px] lg:h-[480px]" style={{ transformStyle: 'preserve-3d' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`s1-${imgFlip}`}
                    initial={{ rotateY: 90, opacity: 0, scale: 0.85 }}
                    animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                    exit={{ rotateY: -90, opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                    style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
                  >
                    <div className="relative rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.15)] h-full">
                      <img
                        src={imgFlip === 0
                          ? 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80'
                          : 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800&q=80'
                        }
                        alt="Connectivité sécurisée"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-waw-dark/40 via-transparent to-transparent" />

                      <motion.div
                        animate={{ y: [-4, 4, -4] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md rounded-2xl px-5 py-3 shadow-lg"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full" />
                          <span className="text-sm font-bold text-waw-dark">
                            {imgFlip === 0 ? 'Réseau protégé 24/7' : 'Infrastructure sécurisée'}
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Petite carte flottante */}
              <motion.div
                animate={{ y: [-6, 6, -6], x: [3, -3, 3] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-waw-yellow/10 flex items-center justify-center">
                    <Shield size={20} className="text-waw-dark" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Chiffrement</p>
                    <p className="text-sm font-bold text-waw-dark">AES-256</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ================================================ */}
      {/* SECTION 2 - MPLS                                 */}
      {/* Image 3D GAUCHE  |  Texte DROITE                 */}
      {/* ================================================ */}
      <section ref={section2Ref} className="relative py-24 lg:py-32 overflow-hidden bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Images 3D avec flip */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={section2InView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative order-2 lg:order-1"
              style={{ perspective: '1200px' }}
            >
              <div className="relative h-[400px] lg:h-[480px]" style={{ transformStyle: 'preserve-3d' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`s2-${imgFlip}`}
                    initial={{ rotateX: -90, opacity: 0, scale: 0.9 }}
                    animate={{ rotateX: 0, opacity: 1, scale: 1 }}
                    exit={{ rotateX: 90, opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                    style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
                  >
                    <div className="relative rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.15)] h-full">
                      <img
                        src={imgFlip === 0
                          ? 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80'
                          : 'https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=800&q=80'
                        }
                        alt="Réseau MPLS"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-waw-dark/40 via-transparent to-transparent" />

                      <motion.div
                        animate={{ y: [-4, 4, -4] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl px-5 py-3 shadow-lg"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 bg-waw-yellow rounded-full" />
                          <span className="text-sm font-bold text-waw-dark">
                            {imgFlip === 0 ? 'Latence <5ms' : 'QoS optimisé'}
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Petite carte flottante */}
              <motion.div
                animate={{ y: [5, -5, 5], x: [-4, 4, -4] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-5 -left-5 bg-white rounded-2xl p-4 shadow-xl border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-waw-yellow/10 flex items-center justify-center">
                    <Building size={20} className="text-waw-dark" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Sites connectés</p>
                    <p className="text-sm font-bold text-waw-dark">Multi-sites</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Texte */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={section2InView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="order-1 lg:order-2"
            >
              <span className="inline-block px-4 py-2 bg-waw-yellow/10 rounded-full text-sm font-bold text-waw-dark mb-6">
                Solutions MPLS
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-waw-dark leading-[1.15] mb-6">
                MPLS pour{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-waw-yellow to-orange-400">
                  interconnexion multi-sites
                </span>
              </h2>

              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
                Interconnectez vos agences et data centers avec un réseau MPLS robuste, pensé pour vos applications critiques.
              </p>

              {/* Features list */}
              <div className="space-y-4 mb-10">
                {[
                  'Qualité de service (priorisation des applications)',
                  "Faible latence pour la voix, la vidéo et l'ERP",
                  'Gestion centralisée et visibilité sur les flux',
                ].map((text, i) => (
                  <motion.div
                    key={text}
                    initial={{ opacity: 0, x: 20 }}
                    animate={section2InView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle size={18} className="text-waw-yellow flex-shrink-0" />
                    <p className="text-gray-600 text-[15px]">{text}</p>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => openServiceModal('Solutions MPLS')}
                className="group bg-waw-dark text-white px-7 py-3.5 rounded-2xl font-bold text-sm inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
              >
                <span>Obtenir une proposition MPLS</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ================================================ */}
      {/* SECTION 3 - SD-WAN                               */}
      {/* Texte GAUCHE  |  Image 3D DROITE                 */}
      {/* ================================================ */}
      <section ref={section3Ref} className="relative py-24 lg:py-32 overflow-hidden bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Texte */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={section3InView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-block px-4 py-2 bg-waw-yellow/10 rounded-full text-sm font-bold text-waw-dark mb-6">
                SD-WAN Solutions
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-waw-dark leading-[1.15] mb-6">
                Agilité, performance{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-waw-yellow to-orange-400">
                  maîtrise des coûts
                </span>
              </h2>

              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
                Modernisez votre réseau avec le SD-WAN. Combinez plusieurs liens (fibre, LTE/5G, etc.), orchestrez le trafic applicatif et optimisez les coûts — sans compromis sur la sécurité.
              </p>

              {/* Features grid */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  { icon: Zap, title: 'Déploiements rapides', desc: 'Interface centralisée' },
                  { icon: Globe, title: 'Pilotage centralisé', desc: 'Routage intelligent' },
                  { icon: Shield, title: 'Performance accrue', desc: 'Chiffrement bout-en-bout' },
                  { icon: Network, title: 'Budget optimisé', desc: 'Besoins métier adaptés' },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 15 }}
                    animate={section3InView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                    className="p-4 rounded-2xl bg-gray-50 border border-gray-100"
                  >
                    <item.icon size={18} className="text-waw-dark mb-2" />
                    <p className="text-sm font-bold text-waw-dark">{item.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => openServiceModal('SD-WAN Solutions')}
                className="group bg-waw-dark text-white px-7 py-3.5 rounded-2xl font-bold text-sm inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
              >
                <span>Planifier une démo SD-WAN</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

            {/* Images 3D avec flip */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={section3InView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
              style={{ perspective: '1200px' }}
            >
              <div className="relative h-[400px] lg:h-[480px]" style={{ transformStyle: 'preserve-3d' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`s3-${imgFlip}`}
                    initial={{ scale: 0.6, rotateY: 45, opacity: 0 }}
                    animate={{ scale: 1, rotateY: 0, opacity: 1 }}
                    exit={{ scale: 0.6, rotateY: -45, opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                    style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
                  >
                    <div className="relative rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.15)] h-full">
                      <img
                        src={imgFlip === 0
                          ? 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80'
                          : 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80'
                        }
                        alt="SD-WAN réseau"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-waw-dark/40 via-transparent to-transparent" />

                      <motion.div
                        animate={{ y: [-4, 4, -4] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md rounded-2xl px-5 py-3 shadow-lg"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full" />
                          <span className="text-sm font-bold text-waw-dark">
                            {imgFlip === 0 ? 'Routage intelligent' : 'Multi-liens optimisés'}
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Petite carte flottante */}
              <motion.div
                animate={{ y: [-5, 5, -5], x: [4, -4, 4] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-5 -left-5 bg-white rounded-2xl p-4 shadow-xl border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <Zap size={20} className="text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Économies</p>
                    <p className="text-sm font-bold text-emerald-600">-40% coûts</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ================================================ */}
      {/* SECTION CTA - Contact                            */}
      {/* ================================================ */}
      <section ref={ctaRef} className="relative py-24 lg:py-32 overflow-hidden bg-[#0a0a0a] text-white">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-waw-yellow/[0.04] rounded-full blur-[200px]"
        />

        <div className="container-custom relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-display font-bold leading-[1.1] mb-6">
              Prêt à sécuriser votre{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-waw-yellow via-orange-300 to-waw-yellow bg-[length:200%_auto]" style={{ animation: 'shimmer 3s ease-in-out infinite' }}>
                connectivité
              </span>{' '}?
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12">
              Nos experts en connectivité sont là pour analyser vos besoins et concevoir une solution sur mesure. Support technique disponible 24h/24, 7j/7.
            </p>
          </motion.div>

          {/* Contact row */}
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {[
              { icon: Phone, label: 'Appelez-nous', value: '+221 33 860 19 29', link: 'tel:+221338601929' },
              { icon: Mail, label: 'Email', value: 'contact@wawtelecom.com', link: 'mailto:contact@wawtelecom.com' },
              { icon: MessageCircle, label: 'WhatsApp', value: 'Réponse rapide', link: 'https://wa.me/221769291717' },
            ].map((item, i) => (
              <motion.a
                key={item.label}
                href={item.link}
                target={item.link.startsWith('http') ? '_blank' : undefined}
                rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group bg-white/[0.05] backdrop-blur-sm rounded-2xl p-6 border border-white/[0.06] hover:border-waw-yellow/20 transition-all text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-waw-yellow/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-waw-yellow/20 transition-colors">
                  <item.icon size={22} className="text-waw-yellow" />
                </div>
                <p className="text-sm font-bold text-white mb-1">{item.label}</p>
                <p className="text-xs text-gray-400">{item.value}</p>
              </motion.a>
            ))}
          </div>

          {/* CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setContactModalOpen(true)}
              className="group bg-waw-yellow text-waw-dark px-8 py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-[0_8px_30px_rgba(255,221,51,0.25)] hover:shadow-[0_12px_40px_rgba(255,221,51,0.4)] transition-all"
            >
              <span>Contactez nos experts</span>
              <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight size={18} />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ================================================ */}
      {/* MODAL ÉLIGIBILITÉ MULTI-STEP                    */}
      {/* ================================================ */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={closeModal}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />

            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 40 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X size={18} className="text-gray-500" />
              </button>

              {/* Progress bar */}
              <div className="h-1 bg-gray-100">
                <motion.div
                  className="h-full bg-gradient-to-r from-waw-yellow to-orange-400 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${(modalStep / 5) * 100}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>

              <div className="p-8">
                <AnimatePresence mode="wait">

                  {/* ──────── STEP 1: Carte Dakar (Leaflet) ──────── */}
                  {modalStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Header */}
                      <div className="text-center mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-waw-yellow/10 flex items-center justify-center mx-auto mb-3">
                          <MapPin size={28} className="text-waw-dark" />
                        </div>
                        <h3 className="text-xl font-bold text-waw-dark mb-1">{selectedService}</h3>
                        <p className="text-sm text-gray-400">Cliquez sur la carte pour localiser votre entreprise</p>
                      </div>

                      {/* Vraie carte Leaflet/OpenStreetMap */}
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
                          <MapClickHandler onMapClick={handleMapClick} />
                          {markerPos && (
                            <Marker position={markerPos} icon={customMarkerIcon} />
                          )}
                        </MapContainer>
                      </div>

                      {/* Selected location display + confirm */}
                      {markerPos ? (
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
                              <p className="text-sm font-semibold text-waw-dark truncate">{selectedLocation || 'Chargement...'}</p>
                            </div>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.02, y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={confirmLocation}
                            disabled={!selectedLocation}
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
                  {modalStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.4 }}
                      className="text-center py-8"
                    >
                      <div className="relative w-24 h-24 mx-auto mb-8">
                        {/* Cercles rotatifs */}
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
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            <Search size={28} className="text-waw-dark" />
                          </motion.div>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-waw-dark mb-2">Recherche d'éligibilité</h3>
                      <p className="text-sm text-gray-400 mb-6">
                        Vérification de la couverture à <span className="font-semibold text-waw-dark">{selectedLocation}</span>...
                      </p>

                      {/* Barre de progression animée */}
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

                      {/* Faux log d'analyse */}
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
                  {modalStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className="text-center py-6"
                    >
                      {/* Confetti / celebration effect */}
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
                        Votre zone <span className="font-bold text-waw-dark">{selectedLocation}</span> est éligible
                      </motion.p>

                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-sm text-gray-400 mb-8"
                      >
                        à notre offre <span className="font-semibold text-waw-dark">{selectedService}</span>
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
                        onClick={() => setModalStep(4)}
                        className="bg-waw-dark text-white px-8 py-3.5 rounded-2xl font-bold text-sm inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
                      >
                        <span>Continuer</span>
                        <ArrowRight size={16} />
                      </motion.button>
                    </motion.div>
                  )}

                  {/* ──────── STEP 4: Formulaire contact ──────── */}
                  {modalStep === 4 && (
                    <motion.div
                      key="step4"
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

                      {/* Toggle direct / DSI */}
                      <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
                        <button
                          onClick={() => setContactForm(f => ({ ...f, role: 'direct' }))}
                          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                            contactForm.role === 'direct'
                              ? 'bg-white text-waw-dark shadow-sm'
                              : 'text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          <User size={14} className="inline mr-1.5" />
                          Contact direct
                        </button>
                        <button
                          onClick={() => setContactForm(f => ({ ...f, role: 'dsi' }))}
                          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                            contactForm.role === 'dsi'
                              ? 'bg-white text-waw-dark shadow-sm'
                              : 'text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          <Briefcase size={14} className="inline mr-1.5" />
                          Contact DSI
                        </button>
                      </div>

                      {/* Form */}
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-semibold text-gray-500 mb-1 block">
                            {contactForm.role === 'dsi' ? 'Nom du DSI' : 'Nom complet'}
                          </label>
                          <input
                            type="text"
                            value={contactForm.nom}
                            onChange={(e) => setContactForm(f => ({ ...f, nom: e.target.value }))}
                            placeholder={contactForm.role === 'dsi' ? 'Nom du Directeur SI' : 'Votre nom complet'}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-waw-dark placeholder:text-gray-300 focus:outline-none focus:border-waw-yellow focus:ring-2 focus:ring-waw-yellow/10 transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 mb-1 block">Email professionnel</label>
                          <input
                            type="email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm(f => ({ ...f, email: e.target.value }))}
                            placeholder="email@entreprise.com"
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-waw-dark placeholder:text-gray-300 focus:outline-none focus:border-waw-yellow focus:ring-2 focus:ring-waw-yellow/10 transition-all"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-semibold text-gray-500 mb-1 block">Téléphone</label>
                            <input
                              type="tel"
                              value={contactForm.telephone}
                              onChange={(e) => setContactForm(f => ({ ...f, telephone: e.target.value }))}
                              placeholder="+221 7X XXX XX XX"
                              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-waw-dark placeholder:text-gray-300 focus:outline-none focus:border-waw-yellow focus:ring-2 focus:ring-waw-yellow/10 transition-all"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-gray-500 mb-1 block">Entreprise</label>
                            <input
                              type="text"
                              value={contactForm.entreprise}
                              onChange={(e) => setContactForm(f => ({ ...f, entreprise: e.target.value }))}
                              placeholder="Nom entreprise"
                              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-waw-dark placeholder:text-gray-300 focus:outline-none focus:border-waw-yellow focus:ring-2 focus:ring-waw-yellow/10 transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleContactSubmit}
                        className="w-full mt-6 bg-waw-dark text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                      >
                        <Send size={16} />
                        <span>Envoyer ma demande</span>
                      </motion.button>
                    </motion.div>
                  )}

                  {/* ──────── STEP 5: Confirmation ──────── */}
                  {modalStep === 5 && (
                    <motion.div
                      key="step5"
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
                            <p className="text-sm font-semibold text-waw-dark">{selectedLocation}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-waw-yellow/10 flex items-center justify-center flex-shrink-0">
                            <Network size={16} className="text-waw-dark" />
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Service</p>
                            <p className="text-sm font-semibold text-waw-dark">{selectedService}</p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={closeModal}
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

      {/* ================================================ */}
      {/* MODAL CONTACT EXPERT (Technique / Sales)         */}
      {/* ================================================ */}
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
                        <h3 className="text-xl font-bold text-waw-dark mb-1">Contactez nos experts</h3>
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

                      <motion.button
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleExpertSubmit}
                        className="w-full mt-6 bg-waw-dark text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                      >
                        <Send size={16} />
                        <span>Envoyer</span>
                      </motion.button>

                      <button
                        onClick={() => setContactModalStep('choose')}
                        className="w-full mt-3 text-sm text-gray-400 hover:text-gray-600 transition-colors py-2"
                      >
                        ← Changer d'équipe
                      </button>
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
                        Demande reçue !
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-sm text-gray-500 mb-6 leading-relaxed max-w-sm mx-auto"
                      >
                        Notre équipe <span className="font-bold text-waw-dark">{selectedTeam}</span> a bien reçu votre demande et vous recontactera dans un délai de :
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-waw-yellow/10 rounded-2xl p-5 mb-8 border border-waw-yellow/20"
                      >
                        <div className="flex items-center justify-center gap-3">
                          <Clock size={22} className="text-waw-dark" />
                          <span className="text-lg font-bold text-waw-dark">Moins d'1 heure</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Du lundi au vendredi, 8h — 18h</p>
                      </motion.div>

                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
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

export default ConnectivitePage;
