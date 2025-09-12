import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import jsPDF from 'jspdf';
import VisionCommerciale from '../components/VisionCommerciale';
import NosInfrastructures from '../components/NosInfrastructures';
import {
  Users,
  Rocket,
  Globe,
  Shield,
  Zap,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  Building,
  Clock,
  Award,
  Heart,
  Target,
  Star,
  Quote,
  MapPin,
  Download,
  Calendar,
  MessageCircle,
  ExternalLink,
  Wifi,
  Signal,
  Router
} from 'lucide-react';
import type { PageType } from '../App';

interface AboutPageProps {
  onNavigate: (page: PageType) => void;
}

const AboutPage = ({ onNavigate }: AboutPageProps) => {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [historyRef, historyInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [valuesRef, valuesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [testimonialsRef, testimonialsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [coverageRef, coverageInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [ctaRef, ctaInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [showConsultationModal, setShowConsultationModal] = useState(false);

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

  // Histoire de WAW TELECOM
  const historyMilestones = [
    {
      year: '2016',
      title: 'Fondation de WAW TELECOM',
      description: 'Création de l\'entreprise à Dakar avec la vision de transformer les télécommunications au Sénégal',
      icon: Rocket,
      image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=500&h=300&fit=crop'
    },
    {
      year: '2018',
      title: 'Premiers services cloud',
      description: 'Lancement de nos solutions cloud sécurisées pour les entreprises sénégalaises',
      icon: Shield,
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&h=300&fit=crop'
    },
    {
      year: '2020',
      title: 'Expansion régionale',
      description: 'Extension de nos services de connectivité dans plusieurs pays d\'Afrique de l\'Ouest',
      icon: Globe,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=300&fit=crop'
    },
    {
      year: '2025',
      title: 'eSIM & Innovation',
      description: 'Lancement révolutionnaire de nos services eSIM Travel',
      icon: Phone,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=300&fit=crop'
    },
    {
      year: '2025',
      title: 'Leader Tech',
      description: 'Position de leader dans l\'innovation télécom avec plus de 500 entreprises clientes',
      icon: Award,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop'
    }
  ];

  // Nos valeurs fondamentales
  const coreValues = [
    {
      icon: Users,
      emoji: '💼',
      title: 'Excellence Client',
      subtitle: 'Votre satisfaction, notre priorité',
      description: 'Nous mettons l\'expérience client au cœur de tout ce que nous faisons. Chaque interaction est une opportunité de dépasser vos attentes.'
    },
    {
      icon: Rocket,
      emoji: '🚀',
      title: 'Innovation Continue',
      subtitle: 'Anticiper les besoins de demain',
      description: 'Nous investissons constamment dans les technologies émergentes pour vous offrir des solutions d\'avant-garde.'
    },
    {
      icon: Globe,
      emoji: '🌍',
      title: 'Connectivité Universelle',
      subtitle: 'Réduire la fracture numérique',
      description: 'Notre mission est de démocratiser l\'accès aux technologies de pointe pour tous les Sénégalais.'
    },
    {
      icon: Shield,
      emoji: '🛡️',
      title: 'Fiabilité Totale',
      subtitle: 'Des services que vous pouvez compter',
      description: 'Nous garantissons une disponibilité de 99.9% de nos services avec un support technique d\'excellence.'
    }
  ];

  // Témoignages clients (mockés mais réalistes)
  const testimonials = [
    {
      id: 1,
      name: 'Amadou Diallo',
      position: 'Directeur IT',
      company: 'Banque Atlantique Sénégal',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      content: 'WAW TELECOM a transformé notre infrastructure IT. Depuis l\'installation de leur solution fibre, nos opérations bancaires sont 3x plus rapides. Un partenaire de confiance.',
      rating: 5,
      service: 'Connectivité Entreprise'
    },
    {
      id: 2,
      name: 'Fatou Mbaye',
      position: 'CEO',
      company: 'Digital Innovation Hub',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      content: 'Grâce à leurs solutions cloud, nous avons pu déployer notre startup tech rapidement. Le support 24/7 est exceptionnel, même pendant nos pics d\'activité.',
      rating: 5,
      service: 'Solutions Cloud'
    },
    {
      id: 3,
      name: 'Moussa Kane',
      position: 'Responsable Voyage',
      company: 'Sénégal Tours International',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content: 'Les eSIM WAW nous ont révolutionné ! Nos clients voyagent maintenant connectés dans 200+ pays. Commande en 2 minutes, activation instantanée.',
      rating: 5,
      service: 'eSIM Travel'
    },
    {
      id: 4,
      name: 'Dr. Aïssatou Sow',
      position: 'Directrice Médicale',
      company: 'Hôpital Principal de Dakar',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      content: 'L\'installation fibre de WAW a permis de connecter tous nos services médicaux. Les téléconsultations et le partage de données se font maintenant en temps réel.',
      rating: 5,
      service: 'Infrastructure Santé'
    }
  ];

  // Partenaires & Certifications
  const partners = [
    { name: 'AFR-IX', logo: 'https://th.bing.com/th/id/OIP.k7KepE5VmbaTp6nrkv4R5QHaDG?w=295&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' },
    { name: 'Banque Atlantique', logo: 'data:image/webp;base64,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' },
    { name: 'Delta Air Lines', logo: 'https://tse4.mm.bing.net/th/id/OIP.73-rMILC_coF_Tspzo2XuQHaE7?w=1250&h=833&rs=1&pid=ImgDetMain&o=7&rm=3' },
    { name: 'AIBD', logo: 'https://th.bing.com/th/id/OIP.jUbihA3tOKXmeAH72vg5cgHaDm?w=319&h=170&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' },
    { name: 'BNDE', logo: 'https://www.bnde.sn/sites/default/files/2024-06/Logo%20BNDE%20OK_Plan%20de%20travail%201.jpg' }
  ];

  // Zones de couverture
  const coverageZones = [
    {
      id: 'dakar',
      name: 'Dakar',
      status: 'active',
      coverage: '95%',
      services: ['Fibre', '5G', 'Cloud'],
      population: '3.2M',
      coordinates: { x: 45, y: 60 }
    },
    {
      id: 'thies',
      name: 'Thiès',
      status: 'active',
      coverage: '85%',
      services: ['Fibre', '4G'],
      population: '350K',
      coordinates: { x: 55, y: 45 }
    },
    {
      id: 'saint-louis',
      name: 'Saint-Louis',
      status: 'planned',
      coverage: '0%',
      services: ['Prévu 2025'],
      population: '250K',
      coordinates: { x: 50, y: 15 }
    },
    {
      id: 'kaolack',
      name: 'Kaolack',
      status: 'planned',
      coverage: '0%',
      services: ['Prévu 2026'],
      population: '180K',
      coordinates: { x: 70, y: 55 }
    },
    {
      id: 'ziguinchor',
      name: 'Ziguinchor',
      status: 'planned',
      coverage: '0%',
      services: ['Prévu 2026'],
      population: '160K',
      coordinates: { x: 35, y: 85 }
    }
  ];

  const stats = [
    { icon: Building, value: '500+', label: 'Entreprises clientes' },
    { icon: Users, value: '50K+', label: 'Utilisateurs connectés' },
    { icon: Globe, value: '99.9%', label: 'Disponibilité réseau' },
    { icon: Award, value: '10', label: 'Années d\'expertise' }
  ];

  const openWhatsApp = (message: string) => {
    const phoneNumber = '221769291717';
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  const downloadCatalog = () => {
    // Créer un PDF professionnel avec jsPDF
    const createPDF = () => {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      let yPosition = 20;

      // Helper function pour ajouter du texte centré
      const addCenteredText = (text: string, fontSize: number, isBold = false) => {
        pdf.setFontSize(fontSize);
        if (isBold) pdf.setFont('helvetica', 'bold');
        else pdf.setFont('helvetica', 'normal');

        const textWidth = pdf.getTextWidth(text);
        const x = (pageWidth - textWidth) / 2;
        pdf.text(text, x, yPosition);
        yPosition += fontSize * 0.5 + 5;
      };

      // Helper function pour ajouter du texte normal
      const addText = (text: string, fontSize = 11, isBold = false) => {
        pdf.setFontSize(fontSize);
        if (isBold) pdf.setFont('helvetica', 'bold');
        else pdf.setFont('helvetica', 'normal');
        pdf.text(text, 20, yPosition);
        yPosition += fontSize * 0.5 + 3;
      };

      // Helper function pour ajouter une nouvelle page si nécessaire
      const checkNewPage = () => {
        if (yPosition > 270) {
          pdf.addPage();
          yPosition = 20;
        }
      };

      // En-tête avec logo WAW TELECOM
      pdf.setFillColor(255, 221, 51); // Couleur WAW jaune
      pdf.rect(0, 0, pageWidth, 30, 'F');

      pdf.setTextColor(51, 51, 51); // Couleur WAW dark
      yPosition = 20;
      addCenteredText('WAW TELECOM', 24, true);
      addCenteredText('CATALOGUE DES SERVICES 2025', 14, true);

      pdf.setTextColor(0, 0, 0); // Retour au noir
      yPosition += 10;

      // À propos
      addText('A PROPOS DE WAW TELECOM', 16, true);
      yPosition += 5;
      addText('Leader des telecommunications au Senegal depuis 2015');
      addText('Expertise de pointe et engagement envers l\'excellence');
      addText('Partenaire de confiance pour la transformation digitale');
      yPosition += 10;

      // Contact
      addText('INFORMATIONS DE CONTACT', 16, true);
      yPosition += 5;
      addText('Telephone principal: +221 33 860 19 29', 11, true);
      addText('Mobile / WhatsApp: +221 76 929 17 17', 11, true);
      addText('Email: contact@wawtelecom.com');
      addText('Adresse: Ngor Almadies, Immeuble BIB\'S');
      addText('56 Route de Ngor - Dakar, Senegal');
      yPosition += 10;

      checkNewPage();

      // Services
      addText('NOS SERVICES', 16, true);
      yPosition += 5;

      // Connectivité
      addText('1. CONNECTIVITE ENTREPRISE', 13, true);
      addText('   • Fibre optique dediee haute performance');
      addText('   • Solutions MPLS pour multi-sites');
      addText('   • SD-WAN nouvelle generation');
      addText('   • Redondance garantie 99.9%');
      addText('   • Support technique 24/7');
      yPosition += 5;

      // Cloud
      addText('2. SOLUTIONS CLOUD', 13, true);
      addText('   • Hebergement mutualise economique');
      addText('   • Serveurs dedies haute performance');
      addText('   • VPS Cloud evolutifs');
      addText('   • Sauvegarde automatique');
      addText('   • Monitoring avance');
      yPosition += 5;

      checkNewPage();

      // eSIM
      addText('3. ESIM TRAVEL', 13, true);
      addText('   • Couverture 200+ pays dans le monde');
      addText('   • Activation instantanee en 2 minutes');
      addText('   • Tarifs transparents sans surprise');
      addText('   • Paiement Wave et Orange Money');
      addText('   • Support client reactif');
      yPosition += 5;

      // Infrastructure
      addText('4. INFRASTRUCTURE RESEAU', 13, true);
      addText('   • Installation fibre professionnelle');
      addText('   • Equipements Cisco certifies');
      addText('   • Monitoring reseau 24/7');
      addText('   • Maintenance preventive');
      addText('   • Audit securite regulier');
      yPosition += 10;

      checkNewPage();

      // Tarifs
      addText('GRILLE TARIFAIRE', 16, true);
      yPosition += 5;
      addText('Connectivite Entreprise: Sur devis personnalise', 11, true);
      addText('Solutions Cloud: A partir de 25,000 FCFA/mois', 11, true);
      addText('eSIM Travel: A partir de 5,000 FCFA', 11, true);
      addText('Support technique: Inclus dans tous les forfaits', 11, true);
      yPosition += 10;

      // Avantages
      addText('POURQUOI CHOISIR WAW TELECOM ?', 16, true);
      yPosition += 5;
      addText('✓ Expertise locale de plus de 10 ans');
      addText('✓ Support technique disponible 24h/24, 7j/7');
      addText('✓ Partenaires technologiques certifies');
      addText('✓ Solutions sur mesure adaptees');
      addText('✓ Prix competitifs et transparents');
      addText('✓ Engagement de disponibilite 99.9%');
      yPosition += 10;

      // Zones couvertes
      addText('COUVERTURE TERRITORIALE', 16, true);
      yPosition += 5;
      addText('Dakar: 95% de couverture (actif)', 11, true);
      addText('Thies: 85% de couverture (actif)', 11, true);
      addText('Saint-Louis: Extension prevue 2025');
      addText('Kaolack: Extension prevue 2026');
      addText('Ziguinchor: Extension prevue 2026');
      yPosition += 10;

      checkNewPage();

      // Pied de page
      yPosition = 250;
      pdf.setFillColor(51, 51, 51); // Couleur WAW dark
      pdf.rect(0, 250, pageWidth, 50, 'F');

      pdf.setTextColor(255, 221, 51); // Couleur WAW jaune
      yPosition = 265;
      addCenteredText('CONTACTEZ-NOUS DES AUJOURD\'HUI', 14, true);
      addCenteredText('www.wawtelecom.com', 12);
      addCenteredText('WhatsApp: +221 76 929 17 17', 12);

      yPosition = 290;
      pdf.setTextColor(255, 255, 255);
      addCenteredText('© 2025 WAW TELECOM - Tous droits reserves', 10);

      // Télécharger le PDF
      pdf.save('WAW-TELECOM-Catalogue-2025.pdf');
    };

    createPDF();
  };

  const openConsultationModal = () => {
    setShowConsultationModal(true);
  };

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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-waw-dark via-gray-900 to-black text-white">
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

          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 30,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
            className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-waw-yellow/5 to-white/5 rounded-full blur-3xl"
          />

          {/* Floating Icons */}
          {[
            { icon: Globe, position: 'top-40 left-20', delay: 0 },
            { icon: Zap, position: 'top-60 right-40', delay: 1 },
            { icon: Shield, position: 'bottom-60 left-40', delay: 2 },
            { icon: Building, position: 'bottom-40 right-20', delay: 0.5 },
          ].map((item, index) => (
            <motion.div
              key={index}
              className={`absolute ${item.position} hidden lg:block`}
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4 + item.delay,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeInOut',
                delay: item.delay,
              }}
            >
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg flex items-center justify-center">
                <item.icon size={24} className="text-waw-yellow" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            ref={heroRef}
            variants={containerVariants}
            initial="hidden"
            animate={heroInView ? 'visible' : 'hidden'}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div variants={itemVariants} className="space-y-8">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="inline-block px-6 py-3 bg-waw-yellow/20 text-waw-yellow rounded-full text-lg font-semibold"
              >
                🏢 Notre Histoire
              </motion.span>

              <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight">
                10 ans d'innovation{' '}
                <span className="bg-gradient-to-r from-waw-yellow to-waw-yellow-dark bg-clip-text text-transparent">
                  télécoms
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
              Depuis 2016, WAW TELECOM redéfinit les standards des télécommunications au Sénégal. Née de l’ambition de rendre la connectivité haut débit accessible, performante et locale, notre entreprise a su évoluer en combinant innovation technologique, ancrage régional et exigence de qualité.

Aujourd’hui, WAW accompagne les entreprises, institutions et opérateurs vers l’avenir numérique.

Un ADN local, une vision panafricaine.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onNavigate('about');
                  }}
                  className="bg-waw-yellow text-waw-dark font-bold px-8 py-4 rounded-lg text-lg hover:bg-waw-yellow-dark transition-colors flex items-center justify-center space-x-2 group"
                >
                  <MessageCircle size={20} />
                  <span>En savoir plus sur notre histoire</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const phoneNumber = '221769291717';
                    const message = encodeURIComponent('Bonjour, je souhaite être contacté par un conseiller WAW TELECOM pour discuter de mes besoins en télécommunications.');
                    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
                  }}
                  className="bg-waw-yellow text-waw-dark font-bold px-8 py-4 rounded-lg text-lg hover:bg-waw-yellow-dark transition-colors flex items-center justify-center space-x-2 group"
                >
                  <MessageCircle size={20} />
                  <span>Parler à un conseiller</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadCatalog}
                  className="border-2 border-waw-yellow text-waw-yellow font-bold px-8 py-4 rounded-lg text-lg hover:bg-waw-yellow hover:text-waw-dark transition-colors flex items-center justify-center space-x-2"
                >
                  <Download size={20} />
                  <span>Catalogue PDF</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                >
                  <div className="w-12 h-12 bg-waw-yellow rounded-lg flex items-center justify-center mx-auto mb-4">
                    <stat.icon size={24} className="text-waw-dark" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
                  <p className="text-gray-300 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Notre Histoire Timeline */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
            className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-waw-yellow/20 to-waw-yellow-dark/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            ref={historyRef}
            variants={containerVariants}
            initial="hidden"
            animate={historyInView ? 'visible' : 'hidden'}
            className="text-center mb-16"
          >
            <motion.span
              variants={itemVariants}
              className="inline-block px-4 py-2 bg-waw-yellow/20 text-waw-dark rounded-full text-sm font-semibold mb-4"
            >
              📅 Timeline
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-display font-bold text-waw-dark mb-6"
            >
              L'histoire de{' '}
              <span className="gradient-text">WAW TELECOM</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
            >
              Chaque étape de notre évolution témoigne de notre engagement
              à révolutionner les télécommunications au Sénégal.
            </motion.p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-waw-yellow to-waw-yellow-dark hidden lg:block" />

            <div className="space-y-16">
              {historyMilestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 50 }}
                  animate={historyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ delay: 0.3 + index * 0.2 }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  {/* Image */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}
                  >
                    <div className="relative bg-gradient-to-br from-waw-dark to-gray-800 rounded-3xl p-8 shadow-2xl">
                      <img
                        src={milestone.image}
                        alt={milestone.title}
                        className="w-full h-64 object-cover rounded-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-waw-dark/20 to-transparent rounded-2xl" />

                      {/* Year Badge */}
                      <div className="absolute -top-6 -right-6 w-20 h-20 bg-waw-yellow rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-2xl font-bold text-waw-dark">{milestone.year}</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Content */}
                  <motion.div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-waw-yellow to-waw-yellow-dark rounded-lg flex items-center justify-center">
                        <milestone.icon size={24} className="text-waw-dark" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-waw-yellow">{milestone.year}</span>
                        <h3 className="text-3xl font-bold text-waw-dark">{milestone.title}</h3>
                      </div>
                    </div>

                    <p className="text-xl text-gray-600 leading-relaxed">{milestone.description}</p>

                    <div className="flex items-center space-x-2 text-waw-yellow">
                      <CheckCircle size={20} />
                      <span className="font-semibold">Étape franchie avec succès</span>
                    </div>
                  </motion.div>

                  {/* Timeline Node (Desktop) */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-waw-yellow rounded-full border-4 border-white shadow-lg hidden lg:block"
                       style={{ top: '50%', transform: 'translate(-50%, -50%)' }} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Notre Vision Commerciale */}
      <VisionCommerciale />
      
      {/* Nos Infrastructures */}
      <NosInfrastructures />

      {/* Témoignages Clients */}
      <section className="section-padding bg-gradient-to-br from-waw-yellow/5 to-waw-yellow-dark/5 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <motion.div
            ref={testimonialsRef}
            variants={containerVariants}
            initial="hidden"
            animate={testimonialsInView ? 'visible' : 'hidden'}
            className="text-center mb-16"
          >
            <motion.span
              variants={itemVariants}
              className="inline-block px-4 py-2 bg-waw-yellow/20 text-waw-dark rounded-full text-sm font-semibold mb-4"
            >
              💬 Témoignages
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-display font-bold text-waw-dark mb-6"
            >
              Ce que disent nos{' '}
              <span className="gradient-text">clients</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
            >
              La satisfaction de nos clients est notre plus belle récompense.
              Découvrez leurs expériences avec WAW TELECOM.
            </motion.p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 50 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all relative"
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-waw-yellow rounded-full flex items-center justify-center shadow-lg">
                  <Quote size={20} className="text-waw-dark" />
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-waw-yellow fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>

                {/* Service Tag */}
                <div className="inline-block px-3 py-1 bg-waw-yellow/20 text-waw-dark text-sm font-semibold rounded-full mb-4">
                  {testimonial.service}
                </div>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-waw-dark">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.position}</p>
                    <p className="text-waw-yellow text-sm font-semibold">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Partners Section */}
          <motion.div
            variants={itemVariants}
            className="mt-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-waw-dark mb-4">Nos partenaires de confiance</h3>
              <p className="text-gray-600">Nous collaborons avec les leaders technologiques pour vous offrir l'excellence</p>
            </div>

            {/* Logos défilants */}
            <div className="relative overflow-hidden">
              <motion.div
                animate={{
                  x: [0, -100 * partners.length],
                }}
                transition={{
                  duration: 15,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear',
                }}
                className="flex space-x-8"
                style={{ width: `${200 * partners.length}%` }}
              >
                {/* Première série de logos */}
                {partners.map((partner, index) => (
                  <motion.div
                    key={`first-${partner.name}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all flex items-center justify-center flex-shrink-0"
                    style={{ width: '200px', height: '120px' }}
                  >
                    <img
                      src={partner.logo}
                      alt={`Logo ${partner.name}`}
                      className="max-h-16 max-w-full object-contain filter hover:brightness-110 transition-all"
                    />
                  </motion.div>
                ))}

                {/* Deuxième série pour créer l'effet de boucle infinie */}
                {partners.map((partner, index) => (
                  <motion.div
                    key={`second-${partner.name}`}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all flex items-center justify-center flex-shrink-0"
                    style={{ width: '200px', height: '120px' }}
                  >
                    <img
                      src={partner.logo}
                      alt={`Logo ${partner.name}`}
                      className="max-h-16 max-w-full object-contain filter hover:brightness-110 transition-all"
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Gradient fade sur les côtés */}
              <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10" />
              <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Infrastructure Fibre Optique au Sénégal */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="container-custom relative z-10">
          <motion.div
            ref={coverageRef}
            variants={containerVariants}
            initial="hidden"
            animate={coverageInView ? 'visible' : 'hidden'}
            className="text-center mb-16"
          >
            <motion.span
              variants={itemVariants}
              className="inline-block px-4 py-2 bg-waw-yellow/20 text-waw-dark rounded-full text-sm font-semibold mb-4"
            >
              🏗️ Infrastructure Fibre
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-display font-bold text-waw-dark mb-6"
            >
              Leader de la{' '}
              <span className="gradient-text">fibre optique</span> au Sénégal
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
            >
              Avec une forte croissance à Dakar et une expansion stratégique vers les régions,
              WAW TELECOM révolutionne la connectivité des entreprises sénégalaises.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Real Senegal Map */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-waw-dark mb-2">République du Sénégal</h3>
                <p className="text-gray-600">Déploiement Fibre Optique WAW TELECOM</p>
              </div>

              <div className="relative">
                {/* Real Senegal Map Image */}
                <img
                  src="https://www.ritimo.org/IMG/png/senegal.png"
                  alt="Carte du Sénégal - Infrastructure Fibre WAW TELECOM"
                  className="w-full h-auto rounded-lg shadow-lg"
                />

                {/* Fiber Coverage Overlays with Real Coordinates */}

                {/* DAKAR - Major Hub with Strong Growth */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={coverageInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-[72%] left-[8%] transform -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="relative group">
                    <motion.div
                      animate={{
                        scale: [1, 1.3, 1],
                        boxShadow: ['0 0 10px rgba(34,197,94,0.5)', '0 0 25px rgba(34,197,94,0.8)', '0 0 10px rgba(34,197,94,0.5)'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: 'easeInOut',
                      }}
                      className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white"
                    >
                      <Router size={24} className="text-white" />
                    </motion.div>
                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap shadow-lg">
                      DAKAR 95% - 850km fibre
                    </div>

                    {/* Tooltip on hover */}
                    <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      Centre économique - 320+ entreprises connectées
                    </div>
                  </div>
                </motion.div>

                {/* THIÈS - Growing Hub */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={coverageInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute top-[65%] left-[22%] transform -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="relative group">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: 'easeInOut',
                      }}
                      className="w-10 h-10 bg-waw-yellow rounded-full flex items-center justify-center shadow-lg border-3 border-white"
                    >
                      <Signal size={18} className="text-waw-dark" />
                    </motion.div>
                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-waw-yellow text-waw-dark px-3 py-2 rounded-lg text-sm font-bold whitespace-nowrap shadow-lg">
                      THIÈS 78% - 420km fibre
                    </div>

                    <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      Hub industriel - 95+ entreprises
                    </div>
                  </div>
                </motion.div>

                {/* SAINT-LOUIS - Planned */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={coverageInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ delay: 1.5 }}
                  className="absolute top-[35%] left-[12%] transform -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="relative group">
                    <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white opacity-70">
                      <Building size={16} className="text-white" />
                    </div>
                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-blue-400 text-white px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap shadow-lg">
                      SAINT-LOUIS Q2 2025
                    </div>

                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      Études en cours
                    </div>
                  </div>
                </motion.div>

                {/* Fiber Network Lines Animation */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {/* Dakar to Thiès Fiber Link */}
                  <motion.path
                    d="M 40 225 Q 70 210 105 200"
                    stroke="#10B981"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="8,4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={coverageInView ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
                    transition={{ delay: 2, duration: 2 }}
                  />

                  {/* Planned route to Saint-Louis */}
                  <motion.path
                    d="M 40 225 Q 35 180 45 105"
                    stroke="#60A5FA"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="4,8"
                    strokeOpacity="0.6"
                    initial={{ pathLength: 0 }}
                    animate={coverageInView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ delay: 3, duration: 2 }}
                  />

                  {/* Data flow animation */}
                  <motion.circle
                    r="3"
                    fill="#FFDD33"
                    initial={{ offsetDistance: "0%" }}
                    animate={coverageInView ? { offsetDistance: "100%" } : { offsetDistance: "0%" }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear"
                    }}
                  >
                    <animateMotion dur="3s" repeatCount="indefinite">
                      <path d="M 40 225 Q 70 210 105 200" />
                    </animateMotion>
                  </motion.circle>
                </svg>

                {/* Coverage Legend */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border">
                  <h4 className="font-bold text-gray-800 mb-3 text-sm">Infrastructure Fibre</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-green-500 rounded-full shadow-sm"></div>
                      <span className="text-xs text-gray-700 font-medium">Opérationnel (Forte croissance)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-waw-yellow rounded-full shadow-sm"></div>
                      <span className="text-xs text-gray-700 font-medium">En expansion active</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-blue-400 rounded-full shadow-sm opacity-70"></div>
                      <span className="text-xs text-gray-700 font-medium">Planifié 2025-2026</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Professional Infrastructure Stats */}
            <div className="space-y-6">
              {/* Performance Metrics */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-l-4 border-green-500"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <TrendingUp className="mr-3 text-green-600" size={24} />
                  Performance 2025
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={coverageInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-3xl font-bold text-green-600 mb-1"
                    >
                      +127%
                    </motion.div>
                    <div className="text-sm text-gray-600">Croissance fibre annuelle</div>
                  </div>
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={coverageInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 0.7 }}
                      className="text-3xl font-bold text-waw-yellow mb-1"
                    >
                      2,850
                    </motion.div>
                    <div className="text-sm text-gray-600">Kilomètres de fibre</div>
                  </div>
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={coverageInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 0.9 }}
                      className="text-3xl font-bold text-blue-600 mb-1"
                    >
                      450+
                    </motion.div>
                    <div className="text-sm text-gray-600">Entreprises connectées</div>
                  </div>
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={coverageInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 1.1 }}
                      className="text-3xl font-bold text-purple-600 mb-1"
                    >
                      99.9%
                    </motion.div>
                    <div className="text-sm text-gray-600">Disponibilité réseau</div>
                  </div>
                </div>
              </motion.div>

              {/* Regional Breakdown */}
              <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="text-xl font-bold text-waw-dark">Déploiement Régional</h3>

                {/* Dakar Metropolitan */}
                <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-lg text-gray-800">Région de Dakar</h4>
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">95% FIBRE</span>
                  </div>
                  <p className="text-gray-600 mb-4">Centre économique avec infrastructure fibre complète et redondance totale</p>
                  <div className="grid grid-cols-3 gap-4 text-sm bg-gray-50 rounded-lg p-3">
                    <div className="text-center">
                      <div className="font-bold text-green-600">850+ km</div>
                      <div className="text-gray-600">Fibre déployée</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-blue-600">320+</div>
                      <div className="text-gray-600">Entreprises</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-purple-600">45</div>
                      <div className="text-gray-600">Points de présence</div>
                    </div>
                  </div>
                </div>

                {/* Thiès */}
                <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-lg text-gray-800">Région de Thiès</h4>
                    <span className="bg-waw-yellow text-waw-dark px-3 py-1 rounded-full text-sm font-bold">78% EXPANSION</span>
                  </div>
                  <p className="text-gray-600 mb-4">Hub industriel en expansion rapide avec infrastructure moderne</p>
                  <div className="grid grid-cols-3 gap-4 text-sm bg-gray-50 rounded-lg p-3">
                    <div className="text-center">
                      <div className="font-bold text-waw-yellow">420+ km</div>
                      <div className="text-gray-600">Fibre en cours</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-blue-600">95+</div>
                      <div className="text-gray-600">Entreprises</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-purple-600">12</div>
                      <div className="text-gray-600">Zones industrielles</div>
                    </div>
                  </div>
                </div>

                {/* Future Expansion */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-lg text-gray-800">Expansion Stratégique</h4>
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">2025-2026</span>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between py-2 bg-white/60 rounded-lg px-3">
                      <span className="font-medium">Q2 2025: Saint-Louis</span>
                      <span className="text-blue-600 font-bold">Études finalisées</span>
                    </div>
                    <div className="flex items-center justify-between py-2 bg-white/60 rounded-lg px-3">
                      <span className="font-medium">Q4 2025: Kaolack</span>
                      <span className="text-orange-600 font-bold">En planification</span>
                    </div>
                    <div className="flex items-center justify-between py-2 bg-white/60 rounded-lg px-3">
                      <span className="font-medium">2026: Casamance (Sud)</span>
                      <span className="text-gray-600 font-bold">Étude préliminaire</span>
                    </div>
                  </div>
                </div>

                {/* Technology Stack */}
                <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100">
                  <h4 className="font-bold text-lg text-waw-dark mb-4 flex items-center">
                    <Zap className="mr-2 text-waw-yellow" size={20} />
                    Technologies Fibre
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="font-medium">FTTH/FTTP Gigabit</span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">DÉPLOYÉ</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="font-medium">MPLS & SD-WAN</span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">ACTIF</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="font-medium">Équipements Cisco Certified</span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold">PREMIUM</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="font-medium">Monitoring NOC 24/7</span>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-bold">OPTIMAL</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-waw-dark to-gray-800 text-white relative overflow-hidden">
        <div className="container-custom relative z-10">
          <motion.div
            ref={ctaRef}
            variants={containerVariants}
            initial="hidden"
            animate={ctaInView ? 'visible' : 'hidden'}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="space-y-8">
              <motion.span
                initial={{ scale: 0 }}
                animate={ctaInView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="inline-block px-6 py-3 bg-waw-yellow/20 text-waw-yellow rounded-full text-lg font-semibold mb-6"
              >
                🚀 Rejoignez l'aventure
              </motion.span>

              <h2 className="text-4xl lg:text-6xl font-display font-bold mb-6">
                Prêt à transformer votre{' '}
                <span className="bg-gradient-to-r from-waw-yellow to-waw-yellow-dark bg-clip-text text-transparent">
                  connectivité
                </span> ?
              </h2>

              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Rejoignez les 500+ entreprises qui font confiance à WAW TELECOM
                pour leur transformation digitale. Nos experts vous accompagnent
                à chaque étape de votre projet.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                  {
                    icon: MessageCircle,
                    title: 'Conseiller dédié',
                    desc: 'Échangez avec un expert',
                    action: openConsultationModal
                  },
                  {
                    icon: Download,
                    title: 'Catalogue complet',
                    desc: 'Tous nos services en PDF',
                    action: downloadCatalog
                  },
                  {
                    icon: Phone,
                    title: 'Appel immédiat',
                    desc: '+221 76 929 17 17',
                    action: () => window.open('tel:+221769291717')
                  }
                ].map((cta, index) => (
                  <motion.div
                    key={cta.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    onClick={cta.action}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all cursor-pointer"
                  >
                    <div className="w-16 h-16 bg-waw-yellow rounded-xl flex items-center justify-center mx-auto mb-4">
                      <cta.icon size={28} className="text-waw-dark" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{cta.title}</h3>
                    <p className="text-gray-300">{cta.desc}</p>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('contact')}
                  className="bg-waw-yellow text-waw-dark font-bold px-8 py-4 rounded-lg text-lg hover:bg-waw-yellow-dark transition-colors flex items-center justify-center space-x-2 group"
                >
                  <span>Contactez-nous</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('connectivite')}
                  className="border-2 border-waw-yellow text-waw-yellow font-bold px-8 py-4 rounded-lg text-lg hover:bg-waw-yellow hover:text-waw-dark transition-all flex items-center justify-center space-x-2"
                >
                  <Globe size={20} />
                  <span>Découvrir nos solutions</span>
                </motion.button>
              </div>
            </motion.div>
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
                  <div className="text-sm opacity-90">serviceclient@wawtelecom.com</div>
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

export default AboutPage;
