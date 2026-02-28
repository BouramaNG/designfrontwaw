import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import {
  Satellite, Zap, Globe, Shield, Headphones,
  Building2, Heart, GraduationCap, Hotel,
  HardHat, Radio, ArrowRight, CheckCircle2,
  FileText, Phone, MapPin, Clock, Wifi,
  Award, Star, ChevronRight, X, Send, Users,
  CheckCircle, Search, Navigation, Loader2,
  PartyPopper, User, Briefcase, Network,
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { PageType } from '../App';
import yeugouna from '../assets/images/yeugouna.png';
import technicianImg from '../assets/images/technician.png';
import heroImg from '../assets/images/hero.png';
import hotelImg from '../assets/images/hotel.png';
import ecoleImg from '../assets/images/ecole.png';
import officeImg from '../assets/images/office.png';
import intemperiesImg from '../assets/images/intemperies.png';
import { sendPublicContact } from '../services/contactService';

// Custom marker icon for Leaflet
const customMarkerIcon = L.divIcon({
  className: '',
  html: `<div style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:#FFDD33;border-radius:50%;border:3px solid #333333;box-shadow:0 4px 12px rgba(0,0,0,0.3);">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333333" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
  </div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

function StarlinkMapClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({ click: (e) => onMapClick(e.latlng.lat, e.latlng.lng) });
  return null;
}

interface StarlinkPageProps {
  onNavigate: (page: PageType) => void;
}

// ── Static star positions (deterministic to avoid re-render flicker) ──
const STARS = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  top: `${(i * 137.508) % 100}`,
  left: `${(i * 97.314) % 100}`,
  opacity: 0.15 + (i % 7) * 0.07,
  duration: 2 + (i % 5) * 0.6,
  delay: (i % 7) * 0.4,
  size: i % 3 === 0 ? 2.5 : 1.5,
}));

// ── Animation variants ──
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ── Data ──
const STATS = [
  { value: '250 Mbps', label: 'Débit descendant', icon: Zap },
  { value: '< 40 ms', label: 'Latence réseau', icon: Wifi },
  { value: '< 24 h', label: 'Délai installation', icon: Clock },
  { value: '100 %', label: 'Couverture Sénégal', icon: MapPin },
];

const WAW_VALUES = [
  {
    icon: MapPin,
    title: 'Expertise locale',
    desc: 'Nos équipes connaissent vos contraintes terrain et assurent l\'étude, le déploiement et le suivi en local.',
  },
  {
    icon: Star,
    title: 'Solution sur mesure',
    desc: 'Chaque projet est unique. Nous analysons vos besoins et concevons une architecture réseau adaptée à votre activité.',
  },
  {
    icon: Headphones,
    title: 'Support dédié 24/7',
    desc: 'Un interlocuteur dédié, un monitoring proactif et une réactivité garantie pour assurer la continuité de votre connectivité.',
  },
];

const SECTORS = [
  { icon: HardHat,     label: 'BTP & Chantiers',        desc: 'Connectivité fiable sur sites isolés et chantiers en zones non couvertes.' },
  { icon: Heart,       label: 'Santé & Cliniques',       desc: 'Télémédecine et systèmes critiques pour établissements de santé en régions.' },
  { icon: Hotel,       label: 'Hôtellerie & Tourisme',   desc: 'Wi-Fi haute performance pour vos clients et opérations quotidiennes.' },
  { icon: GraduationCap, label: 'Éducation',             desc: 'Connexion haut débit pour établissements scolaires et campus universitaires.' },
  { icon: Radio,       label: 'Événements & Médias',     desc: 'Diffusion en direct et couverture événementielle sans contrainte géographique.' },
  { icon: Building2,   label: 'Entreprises & Sièges',    desc: 'Redondance réseau et continuité de service pour vos bureaux et datacenters.' },
];

const BENEFITS = [
  {
    icon: Zap,
    title: 'Haut débit garanti',
    desc: 'Jusqu\'à 250 Mbps en download pour vos applications métier les plus exigeantes, sans dépendance à l\'infrastructure terrestre.',
  },
  {
    icon: Globe,
    title: 'Couverture universelle',
    desc: 'Opérationnel partout au Sénégal, y compris les zones blanches les plus reculées inaccessibles aux réseaux traditionnels.',
  },
  {
    icon: Shield,
    title: 'Infrastructure fiable',
    desc: 'Réseau de satellites LEO (Low Earth Orbit) de SpaceX garantissant une disponibilité et une résilience maximales.',
  },
  {
    icon: Clock,
    title: 'Déploiement express',
    desc: 'Installation et mise en service en moins de 48 heures après validation du projet par nos techniciens certifiés.',
  },
];

const STEPS = [
  {
    num: '01',
    tag: 'Vous',
    icon: Send,
    color: 'from-blue-500 to-blue-600',
    badge: 'Étape client',
    title: 'Vous envoyez votre demande',
    desc: 'En quelques clics ou par WhatsApp, vous décrivez votre projet : localisation, activité, besoins en connectivité. Notre équipe accuse réception sous 2 heures.',
    detail: 'Formulaire en ligne · WhatsApp · Appel direct',
  },
  {
    num: '02',
    tag: 'Sales WAW',
    icon: Users,
    color: 'from-waw-yellow to-amber-500',
    badge: 'Étude & offre',
    title: 'Nos Sales étudient votre dossier',
    desc: 'Un commercial dédié analyse votre besoin, effectue une étude de faisabilité terrain et vous soumet une offre personnalisée avec devis détaillé sous 24 h.',
    detail: 'Analyse terrain · Devis sur mesure · SLA inclus',
  },
  {
    num: '03',
    tag: 'Techniciens WAW',
    icon: HardHat,
    color: 'from-emerald-500 to-green-600',
    badge: 'Installation < 24 h',
    title: 'Nos techniciens installent',
    desc: 'Dès validation de l\'offre, nos techniciens certifiés se déplacent et réalisent l\'installation complète. Mise en service et tests de débit effectués sur place.',
    detail: 'Déplacement · Pose antenne · Tests & validation',
  },
  {
    num: '04',
    tag: 'Équipe WAW',
    icon: Headphones,
    color: 'from-purple-500 to-purple-700',
    badge: 'Support 24/7',
    title: 'Support & monitoring continu',
    desc: 'Votre connexion est surveillée en temps réel. En cas d\'incident, notre équipe intervient proactivement — avant même que vous ne le signaliez.',
    detail: 'Monitoring NOC · Alertes temps réel · Assistance dédiée',
  },
];

// ── Helper ──
function Section({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Données offres entreprise ──
const OFFRES_ENTREPRISE = [
  {
    nom: 'Prioritaire Local — 50 Go',
    desc: 'Connexion de secours ou pour les petites structures avec un faible volume de données.',
    users: '1 à 2 utilisateurs',
    features: ['Priorité réseau garantie', 'Utilisation fixe locale', 'Adresse IP publique', 'Tableau de bord inclus'],
    highlight: false,
  },
  {
    nom: 'Prioritaire Local — 500 Go',
    desc: 'Pour les petites entreprises avec des besoins modérés, 2 à 4 utilisateurs simultanés.',
    users: '2 à 4 utilisateurs',
    features: ['Priorité réseau garantie', 'Utilisation fixe locale', 'Adresse IP publique', 'Tableau de bord inclus'],
    highlight: false,
  },
  {
    nom: 'Prioritaire Local — 1 To',
    desc: 'Pour les PME avec des besoins moyens en bande passante, 5 à 10 utilisateurs.',
    users: '5 à 10 utilisateurs',
    features: ['Priorité réseau garantie', 'Utilisation fixe & mobile', 'Adresse IP publique', 'Support dédié WAW'],
    highlight: true,
  },
  {
    nom: 'Prioritaire Local — 2 To',
    desc: 'Pour les entreprises de taille moyenne avec des besoins élevés, 10 à 20 utilisateurs.',
    users: '10 à 20 utilisateurs',
    features: ['Priorité réseau garantie', 'Utilisation fixe & mobile', 'Adresse IP publique', 'SLA & support premium'],
    highlight: false,
  },
];

// ── Images carousel entreprise ──
const ENTREPRISE_IMAGES = [heroImg, officeImg, hotelImg, ecoleImg];

// ── Component ──
const StarlinkPage = ({ onNavigate }: StarlinkPageProps) => {
  const whatsappHref = `https://wa.me/221769291717?text=${encodeURIComponent(
    'Bonjour, je souhaite obtenir plus d\'informations sur les solutions Starlink B2B de WAW Telecom.'
  )}`;

  // ── Carousel entreprise ──
  const [carouselIdx, setCarouselIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCarouselIdx(i => (i + 1) % ENTREPRISE_IMAGES.length), 3500);
    return () => clearInterval(t);
  }, []);

  // ── Modal offres ──
  const [offresOpen, setOffresOpen] = useState(false);

  // ── Modal devis (système identique à la HomePage) ──
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

  const closeDevisModal = useCallback(() => {
    setDevisModalOpen(false);
    setDevisStep(1);
    setDevisError(null);
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
      .catch(() => setDevisLocation(`${lat.toFixed(4)}, ${lng.toFixed(4)}`));
  }, []);

  const confirmDevisLocation = useCallback(() => {
    if (!devisMarkerPos || !devisLocation) return;
    setDevisStep(2);
    setTimeout(() => setDevisStep(3), 3000);
  }, [devisMarkerPos, devisLocation]);

  const handleDevisSubmit = useCallback(async () => {
    const { nom, email, telephone, entreprise, role } = devisForm;
    if (!nom?.trim() || !email?.trim()) { setDevisError('Veuillez remplir au moins le nom et l\'email.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setDevisError('Veuillez saisir une adresse email valide.'); return; }
    setDevisError(null);
    setIsSubmittingDevis(true);
    const messageDetails = [
      'Demande de devis Starlink via page Starlink.',
      `Localisation: ${devisLocation || 'Non spécifiée'}`,
      devisMarkerPos ? `Coordonnées: ${devisMarkerPos[0].toFixed(6)}, ${devisMarkerPos[1].toFixed(6)}` : 'Coordonnées: Non spécifiées',
      `Rôle: ${role === 'direct' ? 'Décideur direct' : 'DSI / Responsable IT'}`,
      `Entreprise: ${entreprise || 'Non spécifiée'}`,
      `Nom: ${nom}, Email: ${email}, Téléphone: ${telephone || 'Non renseigné'}.`,
    ].join('\n');
    try {
      const response = await sendPublicContact({
        name: nom.trim(), email: email.trim(),
        phone: telephone?.trim() || undefined,
        company: entreprise?.trim() || undefined,
        subject: 'Demande de devis Starlink',
        contact_type: 'sales',
        service: 'Starlink Business',
        message: messageDetails,
        source_page: 'starlink-devis-modal',
      });
      if (response?.success) setDevisStep(5);
      else setDevisError(response?.message || 'Une erreur est survenue.');
    } catch (err: unknown) {
      const e = err as { response?: { status?: number; data?: { message?: string; errors?: Record<string, string[]> } } };
      if (e.response?.status === 422 && e.response?.data?.errors) {
        setDevisError(Object.values(e.response.data.errors).flat().join(' ') || 'Erreur de validation.');
      } else if (e.response?.status === 0) {
        setDevisError('Serveur inaccessible. Vérifiez votre connexion.');
      } else {
        setDevisError(e.response?.data?.message || 'Une erreur est survenue. Réessayez.');
      }
    } finally { setIsSubmittingDevis(false); }
  }, [devisForm, devisLocation, devisMarkerPos]);

  // ── Modal contact Sales ──
  const [contactOpen, setContactOpen] = useState(false);
  const [contactStep, setContactStep] = useState<'form' | 'done'>('form');
  const [contactForm, setContactForm] = useState({ nom: '', email: '', telephone: '', entreprise: '' });
  const [contactError, setContactError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const openContact = useCallback(() => {
    setContactStep('form');
    setContactError(null);
    setContactForm({ nom: '', email: '', telephone: '', entreprise: '' });
    setOffresOpen(false);
    setContactOpen(true);
  }, []);

  const handleContactSubmit = async () => {
    const { nom, email, telephone, entreprise } = contactForm;
    if (!nom.trim() || !email.trim()) { setContactError('Veuillez remplir le nom et l\'email.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setContactError('Email invalide.'); return; }
    setContactError(null);
    setIsSending(true);
    try {
      const res = await sendPublicContact({
        name: nom.trim(), email: email.trim(),
        phone: telephone?.trim() || undefined,
        company: entreprise?.trim() || undefined,
        contact_type: 'sales',
        service: 'Starlink Business',
        message: `Demande Starlink Business — Nom: ${nom}, Tél: ${telephone || 'N/A'}, Entreprise: ${entreprise || 'N/A'}`,
        source_page: 'starlink-page',
      });
      if (res?.success) setContactStep('done');
      else setContactError(res?.message || 'Une erreur est survenue.');
    } catch { setContactError('Serveur inaccessible. Réessayez.'); }
    finally { setIsSending(false); }
  };

  return (
    <main className="min-h-screen bg-white overflow-hidden">

      {/* ══════════════════════════════════
          HERO — Dark space theme
      ══════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center bg-[#05081a] overflow-hidden pt-20">

        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-waw-yellow/5 blur-[120px]" />
          <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-blue-700/10 blur-[100px] rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-waw-yellow/6 blur-[80px] rounded-full" />
        </div>

        {/* Stars */}
        <div className="absolute inset-0 pointer-events-none">
          {STARS.map((s) => (
            <motion.div
              key={s.id}
              className="absolute rounded-full bg-white"
              style={{
                top: `${s.top}%`,
                left: `${s.left}%`,
                width: s.size,
                height: s.size,
                opacity: s.opacity,
              }}
              animate={{ opacity: [s.opacity, s.opacity + 0.4, s.opacity] }}
              transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
            />
          ))}
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-28 grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* ── Left — Text ── */}
          <div className="space-y-7">

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-2"
            >
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-waw-yellow text-waw-dark text-xs font-bold tracking-wide shadow-lg shadow-waw-yellow/20">
                <CheckCircle2 size={12} />
                Revendeur Autorisé Starlink
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/8 text-gray-300 text-xs font-medium border border-white/15">
                B2B · Sénégal
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-display font-bold text-white leading-[1.1] tracking-tight"
            >
              Internet Satellite{' '}
              <span className="text-waw-yellow relative">
                Haut Débit
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-waw-yellow/40 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                />
              </span>
              <br />
              pour les Professionnels
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-base sm:text-lg text-gray-400 max-w-xl leading-relaxed"
            >
              WAW Telecom déploie la connectivité Starlink pour les entreprises, organisations
              et sites stratégiques au Sénégal. Une solution satellitaire fiable, rapide et
              opérationnelle partout — même en zones blanches.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-3 pt-1"
            >
              <button
                type="button"
                onClick={openContact}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-waw-yellow text-waw-dark font-bold text-sm hover:bg-waw-yellow-dark transition-all shadow-xl shadow-waw-yellow/25 hover:shadow-waw-yellow/40 hover:-translate-y-0.5"
              >
                Demander une étude personnalisée
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('starlink-press')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/8 text-white font-semibold text-sm hover:bg-white/15 transition-all border border-white/15 hover:border-white/30"
              >
                <FileText size={15} />
                Communiqué officiel
              </button>
            </motion.div>
          </div>

          {/* ── Right — Image Starlink ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center items-center"
          >
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">

              {/* Glow ambiant derrière */}
              <div className="absolute -inset-6 bg-waw-yellow/10 blur-[90px] rounded-full pointer-events-none" />
              <div className="absolute -inset-10 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

              {/* Cadre image */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.6)]">

                {/* Coin décoratif haut-gauche */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-waw-yellow/20 to-transparent pointer-events-none z-10" />
                {/* Coin décoratif bas-droite */}
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-waw-yellow/15 to-transparent pointer-events-none z-10" />

                <img
                  src={yeugouna}
                  alt="Antenne Starlink déployée par WAW Telecom"
                  className="w-full h-auto object-cover block"
                />

                {/* Overlay gradient bas */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />


              </div>

              {/* Badge flottant haut-droite — hors du cadre */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -top-4 -right-4 z-20 px-3.5 py-2 rounded-2xl bg-waw-yellow text-waw-dark text-[11px] font-black tracking-widest uppercase shadow-lg shadow-waw-yellow/30"
              >
                ✓ Revendeur Officiel
              </motion.div>

            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-[10px] font-medium text-gray-500 tracking-widest uppercase">Découvrir</span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-waw-yellow/60" />
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════
          STATS BAR
      ══════════════════════════════════ */}
      <section className="bg-waw-yellow py-8 sm:py-10">
        <Section className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map(({ value, label, icon: Icon }) => (
            <motion.div key={label} variants={fadeUp} className="flex items-center gap-3 sm:gap-4">
              <div className="w-11 h-11 rounded-xl bg-waw-dark/10 flex items-center justify-center shrink-0">
                <Icon size={20} className="text-waw-dark" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-display font-bold text-waw-dark leading-none">{value}</div>
                <div className="text-[11px] font-medium text-waw-dark/65 mt-0.5">{label}</div>
              </div>
            </motion.div>
          ))}
        </Section>
      </section>

      {/* ══════════════════════════════════
          VALEUR WAW
      ══════════════════════════════════ */}
      <section className="py-20 sm:py-28 px-4 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <Section className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* ── Gauche : Image technicien ── */}
            <motion.div variants={fadeUp} className="relative order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] max-w-md mx-auto lg:mx-0">
                <img
                  src={technicianImg}
                  alt="Technicien WAW Telecom sur le terrain"
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient bas */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-waw-dark/80 to-transparent pointer-events-none" />

                {/* Badge flottant bas-gauche */}
                <div className="absolute bottom-5 left-5 z-10 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-black/50 backdrop-blur-md border border-white/15">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-waw-yellow opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-waw-yellow" />
                  </span>
                  <span className="text-white text-xs font-semibold tracking-wide">Techniciens certifiés Starlink</span>
                </div>
              </div>

              {/* Décoration géométrique */}
              <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-full bg-waw-yellow/8 blur-[60px] pointer-events-none" />
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-waw-dark/5 blur-[40px] pointer-events-none" />
            </motion.div>

            {/* ── Droite : Points clés ── */}
            <div className="order-1 lg:order-2 space-y-8">
              <Section>
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-waw-yellow text-waw-dark text-xs font-bold tracking-wide shadow-md">
                    <CheckCircle2 size={12} />
                    Revendeur Autorisé Starlink
                  </span>
                </div>
                <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-display font-bold text-waw-dark mb-4 leading-tight">
                  Pourquoi WAW Telecom ?
                </motion.h2>
                <motion.p variants={fadeUp} className="text-gray-500 text-base leading-relaxed max-w-lg">
                  Revendeur agréé, WAW Telecom vous apporte bien plus qu'un équipement :
                  un accompagnement complet de A à Z, ancré dans la réalité du terrain.
                </motion.p>
              </Section>

              <Section className="space-y-5">
                {WAW_VALUES.map(({ icon: Icon, title, desc }, i) => (
                  <motion.div key={title} variants={fadeUp} className="flex gap-4 items-start">
                    <div className="shrink-0 w-11 h-11 rounded-xl bg-waw-yellow/15 flex items-center justify-center mt-0.5">
                      <Icon size={20} className="text-waw-dark" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black text-waw-yellow/60 tracking-widest">0{i + 1}</span>
                        <h3 className="font-display font-bold text-waw-dark text-base">{title}</h3>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </Section>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <button
                  type="button"
                  onClick={openContact}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-waw-dark text-white font-bold text-sm hover:bg-waw-dark/85 transition-all shadow-lg hover:-translate-y-0.5"
                >
                  Demander une étude personnalisée
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            </div>

          </Section>
        </div>
      </section>

      {/* ══════════════════════════════════
          CAS D'UTILISATION — ENTREPRISES
      ══════════════════════════════════ */}
      <section className="py-20 sm:py-28 px-4 bg-[#05081a] relative overflow-hidden">
        {/* Glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-waw-yellow/4 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          <Section className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* ── Gauche : Carousel images ── */}
            <motion.div variants={fadeUp} className="relative">
              {/* Cadre principal */}
              <div className="relative rounded-3xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.7)] border border-white/10 aspect-[4/3]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={carouselIdx}
                    src={ENTREPRISE_IMAGES[carouselIdx]}
                    alt="Cas d'utilisation Starlink entreprise"
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.7, ease: [0.25, 0.8, 0.25, 1] }}
                  />
                </AnimatePresence>

                {/* Overlay gradient bas */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

                {/* Dots navigation */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {ENTREPRISE_IMAGES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCarouselIdx(i)}
                      className={`transition-all duration-300 rounded-full ${
                        i === carouselIdx
                          ? 'w-6 h-2 bg-waw-yellow'
                          : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>

                {/* Badge flottant */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15">
                  <Building2 size={13} className="text-waw-yellow" />
                  <span className="text-white text-[11px] font-semibold tracking-wide">Emplacements fixes</span>
                </div>
              </div>

              {/* Carte stat flottante bas-droite */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-5 -right-4 bg-waw-yellow rounded-2xl px-5 py-3.5 shadow-xl shadow-waw-yellow/30"
              >
                <div className="text-waw-dark font-black text-xl leading-none">250 Mbps</div>
                <div className="text-waw-dark/70 text-[11px] font-semibold mt-0.5">Débit garanti</div>
              </motion.div>
            </motion.div>

            {/* ── Droite : Texte ── */}
            <motion.div variants={fadeUp} className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-waw-yellow/10 border border-waw-yellow/25 text-waw-yellow text-[11px] font-bold tracking-widest uppercase">
                <Zap size={12} />
                Cas d'utilisation N°1
              </div>

              {/* Titre */}
              <div>
                <h2 className="text-3xl sm:text-4xl font-display font-black text-white leading-[1.1] tracking-tight mb-3">
                  Starlink pour les{' '}
                  <span className="text-waw-yellow">emplacements fixes</span>
                </h2>
                <p className="text-gray-400 text-base leading-relaxed">
                  Une connexion internet haut débit fiable pour les entreprises, bureaux, agences et sites stratégiques — même là où la fibre n'arrive pas.
                </p>
              </div>

              {/* Bullets */}
              <ul className="space-y-3">
                {[
                  { icon: Zap, text: 'Jusqu\'à 250 Mbps en téléchargement' },
                  { icon: Shield, text: 'Réseau prioritaire garanti en tout temps' },
                  { icon: MapPin, text: 'Opérationnel partout au Sénégal' },
                  { icon: Clock, text: 'Installation clé en main' },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-waw-yellow/10 border border-waw-yellow/20 flex items-center justify-center shrink-0">
                      <Icon size={14} className="text-waw-yellow" />
                    </div>
                    <span className="text-gray-300 text-sm">{text}</span>
                  </li>
                ))}
              </ul>


              {/* CTA */}
              <motion.button
                onClick={() => setOffresOpen(true)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-waw-yellow text-waw-dark font-black text-sm uppercase tracking-widest shadow-[0_8px_32px_rgba(255,221,51,0.4)] hover:shadow-[0_16px_48px_rgba(255,221,51,0.55)] transition-shadow"
              >
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                />
                <span className="relative z-10">Voir les offres</span>
                <ArrowRight size={17} className="relative z-10" />
              </motion.button>
            </motion.div>

          </Section>
        </div>
      </section>

      {/* ══════════════════════════════════
          MODAL OFFRES ENTREPRISES
      ══════════════════════════════════ */}
      <AnimatePresence>
        {offresOpen && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-6 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOffresOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-5xl bg-[#0a0d1f] rounded-3xl shadow-2xl overflow-hidden border border-white/10"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
              onClick={e => e.stopPropagation()}
            >
              {/* Glow interne */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-waw-yellow/8 blur-[80px] pointer-events-none" />

              {/* Header modal */}
              <div className="relative flex items-center justify-between px-6 py-5 border-b border-white/10">
                <div>
                  <p className="text-waw-yellow text-[11px] font-bold tracking-widest uppercase mb-0.5">Plans Business</p>
                  <h3 className="text-white font-display font-black text-xl">Internet Haut Débit pour les Entreprises</h3>
                </div>
                <button
                  onClick={() => setOffresOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <X size={17} />
                </button>
              </div>

              {/* Cartes offres */}
              <div className="relative px-6 py-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-y-auto max-h-[65vh]">
                {OFFRES_ENTREPRISE.map((offre, i) => (
                  <motion.div
                    key={offre.nom}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
                    className={`relative flex flex-col rounded-2xl p-5 border transition-all ${
                      offre.highlight
                        ? 'bg-waw-yellow/10 border-waw-yellow/50 shadow-lg shadow-waw-yellow/10'
                        : 'bg-white/4 border-white/10 hover:border-white/25 hover:bg-white/7'
                    }`}
                  >
                    {offre.highlight && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-waw-yellow text-waw-dark text-[10px] font-black uppercase tracking-widest whitespace-nowrap shadow-lg">
                        Le plus populaire
                      </div>
                    )}

                    <div className="mb-4 pt-2">
                      <p className="text-waw-yellow text-[10px] font-black tracking-widest uppercase mb-2">
                        {offre.nom.split('—')[0].trim()}
                      </p>
                      <h4 className="text-white font-display font-black text-lg leading-tight">
                        {offre.nom.split('—')[1]?.trim()}
                      </h4>
                    </div>

                    <p className="text-gray-400 text-xs leading-relaxed mb-4 flex-1">{offre.desc}</p>

                    <div className="flex items-center gap-1.5 mb-4 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                      <Users size={12} className="text-waw-yellow shrink-0" />
                      <span className="text-gray-300 text-xs">{offre.users}</span>
                    </div>

                    <ul className="space-y-2 mb-5">
                      {offre.features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-[11px] text-gray-400">
                          <CheckCircle2 size={11} className="text-waw-yellow shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="border-t border-white/10 pt-4 mb-4">
                      <span className="text-gray-400 text-xs italic">Tarif sur devis personnalisé</span>
                    </div>

                    <motion.button
                      onClick={openContact}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                        offre.highlight
                          ? 'bg-waw-yellow text-waw-dark shadow-lg shadow-waw-yellow/30 hover:shadow-waw-yellow/50'
                          : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
                      }`}
                    >
                      <Send size={12} />
                      Contacter Sales
                    </motion.button>
                  </motion.div>
                ))}
              </div>

              {/* Footer modal */}
              <div className="px-6 py-4 border-t border-white/10 flex flex-wrap items-center gap-4 justify-between">
                <p className="text-gray-500 text-xs">Contactez notre équipe Sales pour recevoir un devis personnalisé adapté à vos besoins.</p>
                <div className="flex items-center gap-2">
                  {[
                    'Priorité réseau', 'IP publique', 'Utilisation fixe & mobile', 'Tableau de bord'
                  ].map(f => (
                    <span key={f} className="hidden sm:inline-flex items-center gap-1 text-gray-400 text-[10px]">
                      <CheckCircle2 size={10} className="text-waw-yellow" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════
          MODAL CONTACT SALES
      ══════════════════════════════════ */}
      <AnimatePresence>
        {contactOpen && (
          <motion.div
            className="fixed inset-0 z-[300] flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setContactOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-md bg-[#0a0d1f] rounded-3xl shadow-2xl border border-white/10 overflow-hidden"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
              onClick={e => e.stopPropagation()}
            >
              {/* Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-waw-yellow/10 blur-[60px] pointer-events-none" />

              {/* Header */}
              <div className="relative flex items-center justify-between px-6 py-5 border-b border-white/10">
                <div>
                  <p className="text-waw-yellow text-[11px] font-bold tracking-widest uppercase mb-0.5">Équipe Sales</p>
                  <h3 className="text-white font-display font-black text-lg">Contacter un expert</h3>
                </div>
                <button
                  onClick={() => setContactOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <X size={17} />
                </button>
              </div>

              <div className="relative px-6 py-6">
                <AnimatePresence mode="wait">
                  {contactStep === 'form' ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Un expert WAW vous rappelle sous 24h pour étudier votre projet Starlink.
                      </p>

                      {[
                        { key: 'nom', label: 'Nom complet *', placeholder: 'Votre nom', type: 'text' },
                        { key: 'email', label: 'Email professionnel *', placeholder: 'vous@entreprise.com', type: 'email' },
                        { key: 'telephone', label: 'Téléphone', placeholder: '+221 7X XXX XX XX', type: 'tel' },
                        { key: 'entreprise', label: 'Entreprise', placeholder: 'Nom de votre entreprise', type: 'text' },
                      ].map(({ key, label, placeholder, type }) => (
                        <div key={key}>
                          <label className="block text-gray-400 text-xs font-semibold mb-1.5 uppercase tracking-wide">{label}</label>
                          <input
                            type={type}
                            placeholder={placeholder}
                            value={contactForm[key as keyof typeof contactForm]}
                            onChange={e => setContactForm(f => ({ ...f, [key]: e.target.value }))}
                            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-waw-yellow/50 focus:bg-white/8 transition-all"
                          />
                        </div>
                      ))}

                      {contactError && (
                        <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-2">{contactError}</p>
                      )}

                      <motion.button
                        onClick={handleContactSubmit}
                        disabled={isSending}
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative overflow-hidden w-full py-4 rounded-2xl bg-waw-yellow text-waw-dark font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_8px_32px_rgba(255,221,51,0.4)] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                      >
                        <motion.span
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.4 }}
                        />
                        <span className="relative z-10">{isSending ? 'Envoi en cours…' : 'Envoyer ma demande'}</span>
                        {!isSending && <Send size={15} className="relative z-10" />}
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35 }}
                      className="flex flex-col items-center text-center py-8 gap-5"
                    >
                      <div className="w-16 h-16 rounded-full bg-waw-yellow/20 border border-waw-yellow/40 flex items-center justify-center">
                        <CheckCircle2 size={32} className="text-waw-yellow" />
                      </div>
                      <div>
                        <h4 className="text-white font-black text-xl mb-2">Demande envoyée !</h4>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                          Notre équipe Sales vous contacte dans les <strong className="text-waw-yellow">24 heures</strong> pour votre projet Starlink.
                        </p>
                      </div>
                      <button
                        onClick={() => setContactOpen(false)}
                        className="px-6 py-3 rounded-xl bg-white/10 text-white text-sm font-semibold hover:bg-white/20 transition-colors border border-white/15"
                      >
                        Fermer
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════
          RÉSISTANCE AUX INTEMPÉRIES — Pleine largeur
      ══════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-gray-900" aria-label="Résistance aux intempéries — équipement Starlink">
        <img
          src={intemperiesImg}
          alt="Équipement Starlink sous la pluie — résistant aux intempéries, conçu pour résister aux éléments. WAW Telecom, revendeur autorisé Starlink au Sénégal."
          className="w-full h-auto block object-contain max-h-[85vh] mx-auto"
        />
      </section>

      {/* ══════════════════════════════════
          PROCESSUS — Scénario réaliste
      ══════════════════════════════════ */}
      <section className="py-20 sm:py-28 px-4 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto">

          {/* En-tête */}
          <Section className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-waw-yellow font-bold text-xs tracking-[0.2em] uppercase mb-3">
              Votre parcours client
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-display font-bold text-waw-dark mb-4">
              De la demande à la connexion,<br className="hidden sm:block" /> en moins de 24 h
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
              Voici comment WAW Telecom traite votre projet Starlink — de votre première prise de contact
              jusqu'au monitoring de votre connexion, en temps réel.
            </motion.p>
          </Section>

          {/* Timeline verticale */}
          <div className="relative">
            {/* Ligne verticale centrale (desktop) */}
            <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-blue-200 via-waw-yellow/40 via-emerald-200 to-purple-200" />

            <div className="flex flex-col gap-10 md:gap-12">
              {STEPS.map(({ num, icon: Icon, color, badge, title, desc, detail, tag }, i) => {
                const isRight = i % 2 === 0;
                return (
                  <motion.div
                    key={num}
                    initial={{ opacity: 0, x: isRight ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.08 }}
                    className={`relative flex flex-col md:flex-row items-center gap-6 ${isRight ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    {/* Carte */}
                    <div className={`flex-1 ${isRight ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'}`}>
                      <div className={`inline-block bg-white rounded-2xl p-6 sm:p-7 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 text-left max-w-sm md:max-w-full ${isRight ? 'md:ml-auto' : ''}`}>
                        {/* Badge rôle */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r ${color} text-white text-[10px] font-bold tracking-wide`}>
                            <Icon size={10} />
                            {badge}
                          </span>
                          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{tag}</span>
                        </div>
                        {/* Numéro + Titre */}
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className={`text-4xl font-display font-black bg-gradient-to-br ${color} bg-clip-text text-transparent leading-none`}>{num}</span>
                          <h3 className="font-display font-bold text-waw-dark text-base leading-snug">{title}</h3>
                        </div>
                        {/* Description */}
                        <p className="text-gray-500 text-sm leading-relaxed mb-4">{desc}</p>
                        {/* Détail pills */}
                        <div className="flex flex-wrap gap-1.5">
                          {detail.split(' · ').map((d) => (
                            <span key={d} className="inline-block bg-gray-50 border border-gray-200 text-gray-500 text-[10px] font-medium px-2.5 py-1 rounded-full">
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Nœud central */}
                    <div className="relative z-10 shrink-0 flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} shadow-lg flex items-center justify-center`}>
                        <Icon size={20} className="text-white" />
                      </div>
                      {/* Flèche vers le bas (sauf dernier) */}
                      {i < STEPS.length - 1 && (
                        <div className="mt-2 hidden md:flex flex-col items-center gap-0.5">
                          <div className="w-px h-4 bg-gray-200" />
                          <ChevronRight size={12} className="text-gray-300 rotate-90" />
                        </div>
                      )}
                    </div>

                    {/* Espace miroir (desktop) */}
                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* CTA bas de section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-14 text-center"
          >
            <p className="text-gray-400 text-sm mb-4">Prêt à démarrer votre projet ?</p>
            <button
              type="button"
              onClick={openContact}
              className="inline-flex items-center gap-2 bg-waw-dark text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-waw-dark/90 transition-all hover:-translate-y-0.5 shadow-lg"
            >
              <Send size={15} />
              Envoyer ma demande maintenant
            </button>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════
          COMMUNIQUÉ DE PRESSE
      ══════════════════════════════════ */}
      <section className="py-14 sm:py-16 px-4 bg-white border-t border-gray-100">
        <Section className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 bg-gradient-to-r from-waw-dark via-[#1c1c2e] to-[#0d1530] rounded-3xl p-8 sm:p-10 shadow-2xl overflow-hidden relative"
          >
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-waw-yellow/8 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative w-14 h-14 rounded-2xl bg-waw-yellow flex items-center justify-center shrink-0 shadow-lg shadow-waw-yellow/30">
              <Award size={26} className="text-waw-dark" />
            </div>

            <div className="relative flex-1 text-center sm:text-left">
              <div className="text-waw-yellow text-[10px] font-bold tracking-[0.2em] uppercase mb-1.5">
                Reseller
              </div>
              <h3 className="text-white font-display font-bold text-xl sm:text-2xl mb-1.5">
                Communiqué de presse Starlink
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Lisez le document officiel annonçant le partenariat entre WAW Telecom et Starlink
                — les usages visés et les bénéfices pour les entreprises au Sénégal.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('starlink-press')}
              className="relative inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-waw-yellow text-waw-dark font-bold text-sm hover:bg-waw-yellow-dark transition-all whitespace-nowrap shadow-lg shadow-waw-yellow/20 hover:-translate-y-0.5"
            >
              <FileText size={15} />
              Lire le communiqué
            </button>
          </motion.div>
        </Section>
      </section>

      {/* ══════════════════════════════════
          CTA FINAL
      ══════════════════════════════════ */}
      <section className="py-24 sm:py-28 px-4 bg-waw-yellow relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <Section className="relative max-w-3xl mx-auto text-center">
          <motion.div variants={fadeUp} className="mb-6">
            <Satellite size={44} className="text-waw-dark/30 mx-auto" strokeWidth={1.3} />
          </motion.div>

          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-waw-dark mb-5 leading-tight">
            Prêt à connecter votre entreprise ?
          </motion.h2>

          <motion.p variants={fadeUp} className="text-waw-dark/65 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Nos experts analysent votre situation et vous proposent la solution Starlink
            parfaitement adaptée à vos besoins professionnels, partout au Sénégal.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center">
            <button
              type="button"
              onClick={openContact}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-waw-dark text-white font-bold text-sm hover:bg-waw-dark/85 transition-all shadow-xl hover:-translate-y-0.5"
            >
              Demander une étude personnalisée
              <ArrowRight size={17} />
            </button>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white/40 text-waw-dark font-bold text-sm hover:bg-white/60 transition-all border border-waw-dark/15 hover:-translate-y-0.5"
            >
              <Phone size={16} />
              Nous contacter
            </a>
          </motion.div>
        </Section>
      </section>

      {/* ══════════════════════════════════
          MODALE DEVIS — 5 étapes
      ══════════════════════════════════ */}
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
              {/* Bouton fermer */}
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

                  {/* ── ÉTAPE 1 : Carte ── */}
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
                        <h3 className="text-xl font-bold text-waw-dark mb-1">Demande de devis Starlink</h3>
                        <p className="text-sm text-gray-400">Cliquez sur la carte pour localiser votre entreprise</p>
                      </div>

                      <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm h-[400px] mb-3 relative z-0">
                        <MapContainer
                          center={[14.7167, -17.4677]}
                          zoom={12}
                          scrollWheelZoom
                          style={{ height: '100%', width: '100%' }}
                          zoomControl={false}
                        >
                          <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />
                          <StarlinkMapClickHandler onMapClick={handleDevisMapClick} />
                          {devisMarkerPos && <Marker position={devisMarkerPos} icon={customMarkerIcon} />}
                        </MapContainer>
                      </div>

                      {devisMarkerPos ? (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
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
                        <p className="text-center text-xs text-gray-400">Zoomez et cliquez pour placer le marqueur</p>
                      )}
                    </motion.div>
                  )}

                  {/* ── ÉTAPE 2 : Vérification éligibilité ── */}
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
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 rounded-full border-2 border-transparent border-t-waw-yellow border-r-waw-yellow/30" />
                        <motion.div animate={{ rotate: -360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} className="absolute inset-2 rounded-full border-2 border-transparent border-b-orange-400 border-l-orange-400/30" />
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} className="absolute inset-4 rounded-full border-2 border-transparent border-t-waw-dark/30" />
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
                          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-[10px] text-gray-400">Analyse réseau...</motion.span>
                          <motion.span initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }} className="text-[10px] text-waw-dark font-medium">
                            <Loader2 size={10} className="inline animate-spin mr-1" />En cours
                          </motion.span>
                        </div>
                      </div>

                      <div className="mt-6 space-y-2 max-w-xs mx-auto">
                        {[
                          { text: 'Vérification infrastructure...', delay: 0.5 },
                          { text: 'Analyse bande passante disponible...', delay: 1.2 },
                          { text: 'Test de connectivité satellite...', delay: 2 },
                        ].map((log, i) => (
                          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: log.delay, duration: 0.3 }} className="flex items-center gap-2 text-left">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: log.delay + 0.3 }} className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                              <CheckCircle size={10} className="text-emerald-500" />
                            </motion.div>
                            <span className="text-[11px] text-gray-500">{log.text}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* ── ÉTAPE 3 : Bravo éligible ── */}
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
                            animate={{ opacity: [0, 1, 0], y: [0, -60 - (i * 7) % 40], x: [((i % 5) - 2) * 28], scale: [0, 1, 0.5], rotate: [0, (i * 47) % 360] }}
                            transition={{ duration: 1.2, delay: i * 0.08, ease: 'easeOut' }}
                            className="absolute left-1/2 top-1/2"
                          >
                            <div className="w-3 h-3 rounded-sm" style={{ background: ['#FFDD33', '#FF8C42', '#4ADE80', '#60A5FA', '#F472B6', '#A78BFA'][i % 6] }} />
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

                      <motion.h3 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-2xl font-bold text-waw-dark mb-2">Bravo !</motion.h3>
                      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-sm text-gray-500 mb-2">
                        Votre zone <span className="font-bold text-waw-dark">{devisLocation}</span> est éligible
                      </motion.p>
                      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-sm text-gray-400 mb-8">
                        à nos services <span className="font-semibold text-waw-dark">Starlink via WAW Telecom</span>
                      </motion.p>

                      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-emerald-50 rounded-2xl p-4 mb-8 border border-emerald-100">
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle size={18} className="text-emerald-500" />
                          <span className="text-sm font-semibold text-emerald-700">Zone couverte — Infrastructure Starlink disponible</span>
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

                  {/* ── ÉTAPE 4 : Formulaire coordonnées ── */}
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

                      {/* Toggle rôle */}
                      <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
                        <button
                          onClick={() => setDevisForm(f => ({ ...f, role: 'direct' }))}
                          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${devisForm.role === 'direct' ? 'bg-white text-waw-dark shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                          <User size={14} className="inline mr-1.5" />Contact direct
                        </button>
                        <button
                          onClick={() => setDevisForm(f => ({ ...f, role: 'dsi' }))}
                          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${devisForm.role === 'dsi' ? 'bg-white text-waw-dark shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                          <Briefcase size={14} className="inline mr-1.5" />Contact DSI
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-semibold text-gray-500 mb-1 block">{devisForm.role === 'dsi' ? 'Nom du DSI' : 'Nom complet'}</label>
                          <input type="text" value={devisForm.nom} onChange={(e) => setDevisForm(f => ({ ...f, nom: e.target.value }))} placeholder={devisForm.role === 'dsi' ? 'Nom du Directeur SI' : 'Votre nom complet'} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-waw-dark placeholder:text-gray-300 focus:outline-none focus:border-waw-yellow focus:ring-2 focus:ring-waw-yellow/10 transition-all" />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 mb-1 block">Email professionnel</label>
                          <input type="email" value={devisForm.email} onChange={(e) => setDevisForm(f => ({ ...f, email: e.target.value }))} placeholder="email@entreprise.com" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-waw-dark placeholder:text-gray-300 focus:outline-none focus:border-waw-yellow focus:ring-2 focus:ring-waw-yellow/10 transition-all" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-semibold text-gray-500 mb-1 block">Téléphone</label>
                            <input type="tel" value={devisForm.telephone} onChange={(e) => setDevisForm(f => ({ ...f, telephone: e.target.value }))} placeholder="+221 7X XXX XX XX" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-waw-dark placeholder:text-gray-300 focus:outline-none focus:border-waw-yellow focus:ring-2 focus:ring-waw-yellow/10 transition-all" />
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-gray-500 mb-1 block">Entreprise</label>
                            <input type="text" value={devisForm.entreprise} onChange={(e) => setDevisForm(f => ({ ...f, entreprise: e.target.value }))} placeholder="Nom entreprise" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-waw-dark placeholder:text-gray-300 focus:outline-none focus:border-waw-yellow focus:ring-2 focus:ring-waw-yellow/10 transition-all" />
                          </div>
                        </div>
                      </div>

                      {devisError && <p className="mt-3 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-xl">{devisError}</p>}

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

                  {/* ── ÉTAPE 5 : Confirmation ── */}
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
                        <motion.div initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}>
                          <CheckCircle size={40} className="text-emerald-500" />
                        </motion.div>
                      </motion.div>

                      <motion.h3 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-2xl font-bold text-waw-dark mb-3">Demande envoyée !</motion.h3>
                      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-sm text-gray-500 mb-6 leading-relaxed max-w-sm mx-auto">
                        Merci pour votre intérêt ! Notre équipe <span className="font-bold text-waw-dark">Sales</span> va étudier votre demande Starlink et vous recontactera dans les plus brefs délais.
                      </motion.p>

                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-gray-50 rounded-2xl p-5 mb-8 text-left space-y-3">
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
                            <p className="text-sm font-semibold text-waw-dark">Starlink Business — WAW Telecom</p>
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
                        Fermer
                      </motion.button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
};

export default StarlinkPage;
