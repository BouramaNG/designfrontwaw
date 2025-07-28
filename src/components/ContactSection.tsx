import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Building,
  Globe,
  Linkedin,
  Instagram,
  Facebook
} from 'lucide-react';

const ContactSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Adresse',
      details: 'Ngor Almadies, Immeuble BIB\'S',
      subtitle: '56 Route de Ngor – Dakar, Sénégal',
      color: 'from-waw-yellow to-waw-yellow-dark'
    },
    {
      icon: Phone,
      title: 'Téléphone',
      details: '+221 33 860 19 29',
      subtitle: '+221 76 929 17 17',
      color: 'from-waw-dark to-gray-800'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'contact@wawtelecom.com',
      subtitle: 'Support 24/7 disponible',
      color: 'from-waw-yellow to-waw-yellow-dark'
    },
    {
      icon: Clock,
      title: 'Horaires',
      details: 'Lun - Ven: 8h - 18h',
      subtitle: 'Sam: 9h - 13h',
      color: 'from-waw-dark to-gray-800'
    }
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/wawtelecom',
      color: 'bg-waw-yellow'
    },
    {
      icon: Instagram,
      name: 'Instagram',
      url: 'https://www.instagram.com/wawtelecom',
      color: 'bg-waw-dark'
    },
    {
      icon: Facebook,
      name: 'Facebook',
      url: 'https://www.facebook.com/wawtelecom',
      color: 'bg-waw-yellow'
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation d'envoi
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ nom: '', email: '', message: '' });
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 35,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-waw-yellow/5 to-waw-yellow-dark/5 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 28,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-waw-dark/5 to-gray-600/5 rounded-full blur-3xl"
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
              📞 Contact
            </motion.span>

            <h2 className="text-4xl lg:text-6xl font-display font-bold text-waw-dark mb-6">
              Besoin d'informations ou{' '}
              <span className="gradient-text">d'assistance</span> ?
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Contactez-nous dès aujourd'hui ! Notre équipe d'experts est là
              pour répondre à vos questions et vous accompagner.
            </p>
          </motion.div>

          {/* Contact Info Grid */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info) => (
              <motion.div
                key={info.title}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <info.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-waw-dark mb-2">{info.title}</h3>
                <p className="text-gray-900 font-medium">{info.details}</p>
                <p className="text-gray-600 text-sm mt-1">{info.subtitle}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left - Contact Form */}
            <motion.div variants={itemVariants}>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-waw-yellow to-waw-yellow-dark rounded-xl flex items-center justify-center">
                    <MessageSquare size={20} className="text-waw-dark" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-waw-dark">Envoyez-nous un message</h3>
                    <p className="text-gray-600">Nous vous répondrons rapidement</p>
                  </div>
                </div>

                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        id="nom"
                        name="nom"
                        value={formData.nom}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-waw-yellow focus:border-waw-yellow transition-colors"
                        placeholder="Votre nom complet"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-waw-yellow focus:border-waw-yellow transition-colors"
                        placeholder="votre@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-waw-yellow focus:border-waw-yellow transition-colors resize-none"
                        placeholder="Décrivez votre besoin ou votre question..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full btn-primary flex items-center justify-center space-x-2"
                    >
                      <Send size={20} />
                      <span>Envoyer le message</span>
                    </motion.button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-waw-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-waw-yellow" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Message envoyé !</h4>
                    <p className="text-gray-600">Nous vous répondrons dans les plus brefs délais.</p>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Right - Map & Info */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-waw-yellow to-waw-yellow-dark rounded-xl flex items-center justify-center">
                    <Building size={20} className="text-waw-dark" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-waw-dark">Notre siège social</h3>
                    <p className="text-gray-600">Dakar, Sénégal</p>
                  </div>
                </div>

                {/* Map simulation */}
                <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin size={48} className="text-waw-yellow-dark mx-auto mb-2" />
                      <p className="text-gray-600 font-medium">WAW TELECOM</p>
                      <p className="text-sm text-gray-500">Ngor Almadies, Dakar</p>
                    </div>
                  </div>

                  {/* Animated pins */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-waw-yellow rounded-full shadow-lg"
                  />
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 text-center">
                    📍 Cliquez pour ouvrir dans Google Maps
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-waw-yellow to-waw-yellow-dark rounded-xl flex items-center justify-center">
                    <Globe size={20} className="text-waw-dark" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-waw-dark">Suivez-nous</h3>
                    <p className="text-gray-600">Nos réseaux sociaux</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`${social.color} w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow`}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-waw-yellow/10 rounded-lg">
                  <p className="text-sm text-waw-dark text-center font-medium">
                    🚀 Suivez nos actualités et innovations !
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
