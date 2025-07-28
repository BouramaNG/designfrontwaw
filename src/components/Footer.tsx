import { motion } from 'framer-motion';
import {
  Smartphone,
  Cloud,
  Network,
  Globe,
  MapPin,
  Phone,
  Mail,
  ArrowUp,
  Heart,
  Linkedin,
  Instagram,
  Facebook
} from 'lucide-react';
import type { PageType } from '../App';

interface FooterProps {
  onNavigate: (page: PageType) => void;
}

const Footer = ({ onNavigate }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'eSIM Travel', href: '#travel' },
      { name: 'Connectivité', href: '#connectivite' },
      { name: 'Cloud', href: '#cloud' },
      { name: 'DIA Direct Peering', href: '#peering' }
    ],
    company: [
      { name: 'À propos', href: '#about' },
      { name: 'Contact', href: '#contact' },
      { name: 'Carrières', href: '#careers' },
      { name: 'Blog', href: '#blog' }
    ],
    support: [
      { name: 'Centre d\'aide', href: '#help' },
      { name: 'Documentation', href: '#docs' },
      { name: 'Status réseau', href: '#status' },
      { name: 'Support 24/7', href: '#support' }
    ]
  };

  const socialLinks = [
    {
      icon: Linkedin,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/wawtelecom',
      color: 'hover:text-waw-yellow'
    },
    {
      icon: Instagram,
      name: 'Instagram',
      url: 'https://www.instagram.com/wawtelecom',
      color: 'hover:text-waw-yellow'
    },
    {
      icon: Facebook,
      name: 'Facebook',
      url: 'https://www.facebook.com/wawtelecom',
      color: 'hover:text-waw-yellow'
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-waw-dark to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFDD33' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-waw-yellow to-waw-yellow-dark rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-waw-dark font-bold text-xl">W</span>
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold">WAW TELECOM</h3>
                  <p className="text-gray-400 text-sm">Solutions Innovantes</p>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Ensemble, façonnons l'avenir digital de votre organisation.
                Nous accompagnons les entreprises dans leur transformation numérique
                à l'échelle mondiale en intégrant des technologies essentielles.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin size={18} className="text-waw-yellow flex-shrink-0" />
                  <span className="text-gray-300">Ngor Almadies, 56 Route de Ngor – Dakar, Sénégal</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone size={18} className="text-waw-yellow flex-shrink-0" />
                  <div className="text-gray-300">
                    <span>+221 33 860 19 29</span>
                    <span className="mx-2">•</span>
                    <span>+221 76 929 17 17</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail size={18} className="text-waw-yellow flex-shrink-0" />
                  <span className="text-gray-300">contact@wawtelecom.com</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 mt-6">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`text-gray-400 ${social.color} transition-colors p-2 rounded-lg bg-white/5 hover:bg-white/10`}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-bold mb-6 flex items-center space-x-2">
                <Network size={20} className="text-waw-yellow" />
                <span>Services</span>
              </h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-waw-yellow transition-colors hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-bold mb-6 flex items-center space-x-2">
                <Globe size={20} className="text-waw-yellow" />
                <span>Support</span>
              </h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-waw-yellow transition-colors hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 py-8"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-xl font-bold mb-4">Restez informé de nos innovations</h4>
            <p className="text-gray-300 mb-6">
              Recevez les dernières actualités sur nos solutions télécoms et innovations technologiques.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="votre@email.com"
                className="flex-1 px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-waw-yellow focus:border-waw-yellow transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-waw-yellow text-waw-dark font-semibold px-6 py-3 rounded-lg hover:bg-waw-yellow-dark transition-colors"
              >
                S'abonner
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-gray-400 text-sm">
              <p className="flex items-center space-x-1">
                <span>© {currentYear} WAW TELECOM. Tous droits réservés.</span>
              </p>
              <p className="flex items-center space-x-1">
                <span>Conçu et développé avec</span>
                <Heart size={14} className="text-waw-yellow" />
                <span>par WAW TELECOM</span>
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <a href="#privacy" className="text-gray-400 hover:text-waw-yellow transition-colors text-sm">
                Politique de confidentialité
              </a>
              <a href="#terms" className="text-gray-400 hover:text-waw-yellow transition-colors text-sm">
                Conditions d'utilisation
              </a>

              {/* Scroll to top */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-waw-yellow/20 hover:bg-waw-yellow/30 p-2 rounded-lg transition-colors"
              >
                <ArrowUp size={16} className="text-waw-yellow" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
        className="absolute top-20 right-20 w-16 h-16 bg-waw-yellow/10 rounded-full flex items-center justify-center"
      >
        <Smartphone size={24} className="text-waw-yellow" />
      </motion.div>

      <motion.div
        animate={{
          y: [10, -10, 10],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
        className="absolute bottom-20 left-20 w-20 h-20 bg-waw-yellow/5 rounded-full flex items-center justify-center"
      >
        <Cloud size={28} className="text-waw-yellow/50" />
      </motion.div>
    </footer>
  );
};

export default Footer;
