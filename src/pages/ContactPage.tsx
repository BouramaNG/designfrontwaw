import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  User,
  Building,
  MessageSquare,
  AlertCircle,
  Globe,
  Headphones,
  Zap
} from 'lucide-react';
import type { PageType } from '../App';

interface ContactPageProps {
  onNavigate: (page: PageType) => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  subject: string;
  message: string;
  acceptTerms: boolean;
  newsletter: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  subject?: string;
  message?: string;
  acceptTerms?: string;
  newsletter?: string;
}

const ContactPage = ({ onNavigate }: ContactPageProps) => {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formRef, formInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [infoRef, infoInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [mapRef, mapInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    subject: '',
    message: '',
    acceptTerms: false,
    newsletter: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

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

  const services = [
    'Connectivité d\'entreprise',
    'Solutions Cloud',
    'eSIM Travel',
    'Infrastructure réseau',
    'Support technique',
    'Consultation personnalisée',
    'Formation équipes',
    'Autre (préciser dans le message)'
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: 'Téléphone principal',
      value: '+221 33 860 19 29',
      description: 'Lun-Ven: 8h-18h, Sam: 9h-13h',
      action: 'tel:+221338601929'
    },
    {
      icon: Phone,
      title: 'Mobile / WhatsApp',
      value: '+221 76 929 17 17',
      description: 'Support urgence 24h/24',
      action: 'tel:+221769291717'
    },
    {
      icon: Mail,
      title: 'Email professionnel',
      value: 'contact@wawtelecom.com',
      description: 'Réponse sous 1h en moyenne',
      action: 'mailto:contact@wawtelecom.com'
    },
    {
      icon: MapPin,
      title: 'Adresse physique',
      value: 'Ngor Almadies',
      description: '56 Route de Ngor – Dakar, Sénégal',
      action: 'https://www.google.com/maps/place/Siège+Social+WAW+TELECOM/@14.7496095,-17.5082828,17z'
    }
  ];


  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis';
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!/^[\+]?[0-9\s\-\(\)]{8,}$/.test(formData.phone)) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }
    if (!formData.service) newErrors.service = 'Veuillez sélectionner un service';
    if (!formData.subject.trim()) newErrors.subject = 'Le sujet est requis';
    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Le message doit contenir au moins 20 caractères';
    }
    if (!formData.acceptTerms) newErrors.acceptTerms = 'Vous devez accepter les conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        subject: '',
        message: '',
        acceptTerms: false,
        newsletter: false
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Light & Modern */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-amber-50/40 pt-32 pb-20">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Soft gradient orbs */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
            className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-waw-yellow/20 to-amber-200/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut', delay: 2 }}
            className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-gradient-to-tr from-amber-100/30 to-yellow-100/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut', delay: 4 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-waw-yellow/5 to-orange-100/10 rounded-full blur-3xl"
          />

          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'radial-gradient(circle, #1a1a2e 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />

          {/* Floating decorative bubbles */}
          {[
            { size: 'w-3 h-3', position: 'top-[20%] left-[10%]', delay: 0, duration: 6 },
            { size: 'w-2 h-2', position: 'top-[30%] right-[15%]', delay: 1, duration: 5 },
            { size: 'w-4 h-4', position: 'bottom-[25%] left-[20%]', delay: 2, duration: 7 },
            { size: 'w-2 h-2', position: 'top-[60%] right-[25%]', delay: 0.5, duration: 8 },
            { size: 'w-3 h-3', position: 'bottom-[40%] right-[10%]', delay: 3, duration: 6 },
            { size: 'w-2 h-2', position: 'top-[15%] left-[45%]', delay: 1.5, duration: 5 },
          ].map((bubble, index) => (
            <motion.div
              key={`bubble-${index}`}
              className={`absolute ${bubble.position} ${bubble.size} rounded-full bg-waw-yellow/20 hidden lg:block`}
              animate={{ y: [-15, 15, -15], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: bubble.duration, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut', delay: bubble.delay }}
            />
          ))}
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Text Content */}
            <motion.div
              ref={heroRef}
              variants={containerVariants}
              initial="hidden"
              animate={heroInView ? 'visible' : 'hidden'}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div variants={itemVariants}>
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={heroInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-waw-yellow/10 border border-waw-yellow/20 rounded-full text-sm font-semibold text-waw-dark"
                >
                  <span className="w-2 h-2 bg-waw-yellow rounded-full animate-pulse" />
                  Contactez-nous
                </motion.span>
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl lg:text-5xl xl:text-6xl font-display font-bold leading-tight text-waw-dark"
              >
                Parlons de votre{' '}
                <span className="relative">
                  <span className="gradient-text">projet</span>
                  <motion.span
                    initial={{ width: 0 }}
                    animate={heroInView ? { width: '100%' } : {}}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute bottom-1 left-0 h-1 bg-waw-yellow/30 rounded-full"
                  />
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg"
              >
                Notre équipe d'experts est à votre écoute pour vous accompagner dans vos projets de transformation numérique.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-2">
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0 10px 40px rgba(234, 179, 8, 0.3)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-waw-yellow text-waw-dark font-bold px-8 py-4 rounded-xl text-lg hover:bg-waw-yellow-dark transition-all flex items-center justify-center space-x-2 group shadow-lg shadow-waw-yellow/20"
                >
                  <span>Envoyer un message</span>
                  <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => window.open('tel:+221338601929')}
                  className="border-2 border-gray-200 text-waw-dark font-bold px-8 py-4 rounded-xl text-lg hover:border-waw-yellow hover:bg-waw-yellow/5 transition-all flex items-center justify-center space-x-2 bg-white/60 backdrop-blur-sm"
                >
                  <Phone size={20} />
                  <span>Appeler maintenant</span>
                </motion.button>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-6 pt-6 border-t border-gray-100"
              >
                {[
                  { icon: Clock, label: 'Réponse sous 24h', color: 'text-amber-600' },
                  { icon: Headphones, label: 'Support 7j/7', color: 'text-emerald-600' },
                  { icon: Phone, label: '+221 33 860 19 29', color: 'text-blue-600' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.2 + index * 0.15 }}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center ${stat.color}`}>
                      <stat.icon size={16} />
                    </div>
                    <span className="font-medium">{stat.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Floating Contact Cards */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative hidden lg:block"
            >
              {/* Main floating card stack */}
              <div className="relative h-[520px]">
                {/* Card 1 - Phone */}
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                  className="absolute top-0 left-8 w-80 z-30"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100/80 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-waw-yellow to-amber-400 rounded-xl flex items-center justify-center shadow-lg shadow-waw-yellow/20">
                        <Phone size={24} className="text-waw-dark" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Téléphone</p>
                        <p className="text-lg font-bold text-waw-dark">+221 33 860 19 29</p>
                        <p className="text-xs text-gray-400">Lun-Ven: 8h-18h</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="text-xs text-emerald-600 font-medium">Disponible maintenant</span>
                    </div>
                  </div>
                </motion.div>

                {/* Card 2 - Email */}
                <motion.div
                  animate={{ y: [6, -10, 6] }}
                  transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute top-36 right-0 w-80 z-20"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100/80 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <Mail size={24} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Email</p>
                        <p className="text-lg font-bold text-waw-dark">contact@wawtelecom.com</p>
                        <p className="text-xs text-gray-400">Réponse sous 1h</p>
                      </div>
                    </div>
                    <div className="mt-4 bg-blue-50 rounded-lg px-3 py-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-blue-500" />
                        <span className="text-xs text-blue-600 font-medium">98% de satisfaction client</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Card 3 - Location */}
                <motion.div
                  animate={{ y: [-5, 12, -5] }}
                  transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut', delay: 1 }}
                  className="absolute bottom-8 left-4 w-80 z-10"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100/80 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <MapPin size={24} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Adresse</p>
                        <p className="text-lg font-bold text-waw-dark">Ngor Almadies</p>
                        <p className="text-xs text-gray-400">56 Route de Ngor - Dakar</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe size={14} className="text-emerald-500" />
                        <span className="text-xs text-gray-500 font-medium">Voir sur Maps</span>
                      </div>
                      <span className="text-xs text-gray-400">Sénégal</span>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative elements behind cards */}
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border border-waw-yellow/10 rounded-full"
                />
                <motion.div
                  animate={{ rotate: [360, 0] }}
                  transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-dashed border-gray-200/50 rounded-full"
                />

                {/* Small floating accent dots */}
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute top-20 right-12 w-3 h-3 bg-waw-yellow rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                  className="absolute bottom-24 right-28 w-2 h-2 bg-blue-400 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                  className="absolute top-48 left-0 w-2 h-2 bg-emerald-400 rounded-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* Contact Form */}
            <motion.div
              ref={formRef}
              variants={containerVariants}
              initial="hidden"
              animate={formInView ? 'visible' : 'hidden'}
              id="contact-form"
            >
              <motion.div variants={itemVariants} className="space-y-8">
                <div>
                  <p className="text-xl text-gray-600">
                    Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        Prénom *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-waw-yellow focus:border-transparent transition-colors ${
                            errors.firstName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Votre prénom"
                        />
                        <User className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                      </div>
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={16} className="mr-1" />
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Nom *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-waw-yellow focus:border-transparent transition-colors ${
                            errors.lastName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Votre nom"
                        />
                        <User className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                      </div>
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={16} className="mr-1" />
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-waw-yellow focus:border-transparent transition-colors ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="votre@email.com"
                        />
                        <Mail className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={16} className="mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-waw-yellow focus:border-transparent transition-colors ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="+221 XX XXX XX XX"
                        />
                        <Phone className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={16} className="mr-1" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Company and Service */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Entreprise
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-waw-yellow focus:border-transparent transition-colors"
                          placeholder="Nom de votre entreprise"
                        />
                        <Building className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                        Service souhaité *
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-waw-yellow focus:border-transparent transition-colors ${
                          errors.service ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Sélectionnez un service</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={16} className="mr-1" />
                          {errors.service}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-waw-yellow focus:border-transparent transition-colors ${
                        errors.subject ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Objet de votre demande"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle size={16} className="mr-1" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-waw-yellow focus:border-transparent transition-colors resize-none ${
                          errors.message ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Détaillez votre demande..."
                      />
                      <MessageSquare className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                    </div>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle size={16} className="mr-1" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="acceptTerms"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 text-waw-yellow focus:ring-waw-yellow border-gray-300 rounded"
                      />
                      <label htmlFor="acceptTerms" className="ml-3 text-sm text-gray-700">
                        J'accepte les{' '}
                        <button
                          type="button"
                          className="text-waw-yellow hover:text-waw-yellow-dark underline"
                        >
                          conditions générales
                        </button>{' '}
                        et la{' '}
                        <button
                          type="button"
                          className="text-waw-yellow hover:text-waw-yellow-dark underline"
                        >
                          politique de confidentialité
                        </button>{' '}
                        *
                      </label>
                    </div>
                    {errors.acceptTerms && (
                      <p className="text-sm text-red-600 flex items-center">
                        <AlertCircle size={16} className="mr-1" />
                        {errors.acceptTerms}
                      </p>
                    )}

                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="newsletter"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 text-waw-yellow focus:ring-waw-yellow border-gray-300 rounded"
                      />
                      <label htmlFor="newsletter" className="ml-3 text-sm text-gray-700">
                        Je souhaite recevoir la newsletter WAW TELECOM avec les dernières actualités et offres
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all flex items-center justify-center space-x-2 ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-waw-yellow hover:bg-waw-yellow-dark text-waw-dark'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-waw-dark border-t-transparent rounded-full"
                        />
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Envoyer le message</span>
                      </>
                    )}
                  </motion.button>

                  {/* Success Message */}
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3"
                    >
                      <CheckCircle size={24} className="text-green-600" />
                      <div>
                        <h4 className="font-semibold text-green-800">Message envoyé avec succès !</h4>
                        <p className="text-green-700 text-sm">
                          Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </form>
              </motion.div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              ref={infoRef}
              variants={containerVariants}
              initial="hidden"
              animate={infoInView ? 'visible' : 'hidden'}
              className="space-y-8"
            >
              <motion.div variants={itemVariants}>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={infoInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8 }}
                  className="text-4xl font-display font-bold text-waw-dark mb-4"
                >
                  Comment nous contacter
                </motion.h2>
                <p className="text-xl text-gray-600">
                  Plusieurs moyens de nous contacter selon vos préférences et l'urgence de votre demande.
                </p>
              </motion.div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <motion.div
                    key={info.title}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all cursor-pointer"
                    onClick={() => window.open(info.action)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-waw-yellow to-waw-yellow-dark rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon size={24} className="text-waw-dark" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-waw-dark mb-1">{info.title}</h3>
                        <p className="text-xl text-gray-800 font-semibold mb-1">{info.value}</p>
                        <p className="text-gray-600 text-sm">{info.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Emergency Support */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                    <Zap size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-red-800">Support Urgence</h3>
                    <p className="text-red-600">Disponible 24h/24 et 7j/7</p>
                  </div>
                </div>
                <p className="text-red-700 mb-4">
                  Pour toute urgence technique ou panne critique affectant vos services.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('tel:+221769291717')}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Phone size={20} />
                  <span>+221 76 929 17 17</span>
                </motion.button>
              </motion.div>

              {/* Business Hours */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-r from-waw-yellow/10 to-waw-yellow-dark/10 border-2 border-waw-yellow/30 rounded-xl p-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-waw-yellow rounded-lg flex items-center justify-center">
                    <Clock size={24} className="text-waw-dark" />
                  </div>
                  <h3 className="text-xl font-bold text-waw-dark">Horaires d'ouverture</h3>
                </div>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Lundi - Vendredi</span>
                    <span className="font-semibold">8h00 - 18h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samedi</span>
                    <span className="font-semibold">9h00 - 13h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dimanche</span>
                    <span className="font-semibold text-gray-500">Fermé</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map & Location Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            ref={mapRef}
            variants={containerVariants}
            initial="hidden"
            animate={mapInView ? 'visible' : 'hidden'}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={mapInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              className="inline-block px-4 py-2 bg-waw-yellow/20 text-waw-dark rounded-full text-sm font-semibold mb-4"
            >
              📍 Notre Localisation
            </motion.span>

            <h2 className="text-4xl lg:text-5xl font-display font-bold text-waw-dark mb-6">
              Rendez-nous visite à{' '}
              <span className="gradient-text">Dakar</span>
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Notre bureau principal est situé au cœur de Dakar, facilement accessible
              et parfaitement équipé pour vous recevoir.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid lg:grid-cols-3 gap-8 mb-12"
          >
            {/* Address Card */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gradient-to-br from-waw-dark to-gray-800 rounded-xl p-8 text-white">
                <div className="w-16 h-16 bg-waw-yellow rounded-xl flex items-center justify-center mb-6">
                  <MapPin size={32} className="text-waw-dark" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Siège Social</h3>
                <div className="space-y-3">
                  <p className="text-gray-300">
                    <strong>WAW TELECOM</strong><br />
                    Ngor Almadies<br />
                    56 Route de Ngor<br />
                    Dakar, Sénégal
                  </p>
                  <div className="pt-4 border-t border-gray-600">
                    <p className="text-sm text-gray-400 mb-2">Coordonnées GPS:</p>
                    <p className="text-waw-yellow font-mono text-sm">
                      14.7496095, -17.5082828
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('https://www.google.com/maps/place/Siège+Social+WAW+TELECOM/@14.7496095,-17.5082828,17z')}
                  className="w-full mt-6 bg-waw-yellow hover:bg-waw-yellow-dark text-waw-dark font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Globe size={20} />
                  <span>Voir sur Google Maps</span>
                </motion.button>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="lg:col-span-2">
              <div className="relative h-96 bg-gray-200 rounded-xl overflow-hidden">
                <img
                  src="https://ugc.same-assets.com/fTPKYXXgDXEEpOV6Qc94DbEKo5UlOmfw.png"
                  alt="Localisation WAW TELECOM sur carte de Dakar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg p-4">
                  <h4 className="font-bold text-lg text-gray-800 mb-2">WAW TELECOM - Ngor Almadies</h4>
                  <p className="text-gray-600">56 Route de Ngor, Dakar, Sénégal</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-waw-yellow rounded-full animate-pulse" />
                      <span className="text-sm text-gray-600">Bureau ouvert</span>
                    </div>
                    <span className="text-sm text-gray-600">15 min du centre-ville</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Transport Info */}
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: '🚗',
                title: 'En voiture',
                description: 'Parking gratuit disponible sur site',
                time: '15 min depuis le centre-ville'
              },
              {
                icon: '🚌',
                title: 'Transport public',
                description: 'Ligne de bus 8 et 15, arrêt Ngor',
                time: '25 min depuis Plateau'
              },
              {
                icon: '🚕',
                title: 'Taxi/Uber',
                description: 'Service disponible 24h/24',
                time: '20 min depuis l\'aéroport'
              }
            ].map((transport, index) => (
              <motion.div
                key={transport.title}
                initial={{ opacity: 0, y: 20 }}
                animate={mapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white border-2 border-gray-100 rounded-xl p-6 text-center hover:border-waw-yellow/50 transition-colors"
              >
                <div className="text-4xl mb-4">{transport.icon}</div>
                <h3 className="text-lg font-bold text-waw-dark mb-2">{transport.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{transport.description}</p>
                <p className="text-waw-yellow font-semibold text-sm">{transport.time}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
