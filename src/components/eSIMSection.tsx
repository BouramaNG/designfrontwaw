import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Smartphone,
  Globe,
  Zap,
  Shield,
  Download,
  CheckCircle,
  ArrowRight,
  MapPin,
  Wifi,
  CreditCard,
  ShoppingCart,
  Loader
} from 'lucide-react';
import { useESIM } from '../hooks/useESIM';
import type { ESIMPlan } from '../types/esim';
import type { PageType } from '../App';
import ESIMOrderModal from './ESIMOrderModal';

interface ESIMSectionProps {
  onNavigateWithPlan?: (page: PageType, planId?: string) => void;
}

export default function ESIMSection({ onNavigateWithPlan }: ESIMSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { plans, loading, error, addToCart, cartItemsCount } = useESIM();
  const [selectedPlan, setSelectedPlan] = useState<ESIMPlan | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Function to get flag image path
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
      'Afrique': '/flags/af.svg',
      'Amérique du Nord': '/flags/na.svg',
      'Moyen-Orient': '/flags/me.svg'
    };

    return countryFlags[countryName] || '/flags/world.svg';
  };

  // Format price function
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-FR').format(price);
  };

  const handleOrderPlan = (plan: ESIMPlan) => {
    setSelectedPlan(plan);
    setShowOrderModal(true);
  };

  const handleAddToCart = (planId: string) => {
    addToCart(planId);
  };

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

  return (
    <section id="travel" className="section-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-waw-yellow/5 to-waw-yellow-dark/5 rounded-full blur-3xl"
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
              📱 eSIM Travel
            </motion.span>

            <h2 className="text-4xl lg:text-6xl font-display font-bold text-waw-dark mb-6">
              Voyagez sans{' '}
              <span className="gradient-text">frontières</span>
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Dites adieu aux cartes SIM physiques ! Profitez d'une connexion instantanée
              et fluide partout dans le monde, sans tracas.
            </p>

            {/* Cart indicator */}
            {cartItemsCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mt-4 inline-flex items-center space-x-2 px-4 py-2 bg-waw-yellow text-waw-dark rounded-full font-semibold"
              >
                <ShoppingCart size={16} />
                <span>{cartItemsCount} forfait(s) dans le panier</span>
              </motion.div>
            )}
          </motion.div>

          {/* Plans Grid */}
          <motion.div variants={itemVariants} className="mb-16">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader size={40} className="animate-spin text-waw-yellow" />
                <span className="ml-3 text-lg text-gray-600">Chargement des forfaits...</span>
              </div>
            ) : error ? (
              <div className="bg-waw-yellow/10 border border-waw-yellow/30 rounded-xl p-6 text-center">
                <p className="text-waw-dark">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-waw-dark text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Réessayer
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {plans.map((plan) => (
                  <motion.div
                    key={plan.id}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border ${
                      plan.popular ? 'border-waw-yellow' : 'border-gray-200'
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3 left-6 bg-waw-yellow text-waw-dark px-3 py-1 rounded-full text-sm font-semibold">
                        Populaire
                      </span>
                    )}

                    {plan.discount && (
                      <span className="absolute -top-3 right-6 bg-waw-yellow text-waw-dark px-3 py-1 rounded-full text-sm font-semibold">
                        -{plan.discount}%
                      </span>
                    )}

                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-waw-dark mb-2">{plan.name}</h3>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <img src={getCountryFlag(plan.country)} alt={plan.country} className="w-8 h-8 rounded-full" />
                        <p className="text-gray-600">{plan.country}</p>
                      </div>

                      <div className="text-center mb-4">
                        {plan.originalPrice && plan.discount ? (
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

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="flex items-center justify-center space-x-1">
                          <Smartphone size={16} className="text-waw-yellow-dark" />
                          <span>{plan.data}</span>
                        </div>
                        <div className="flex items-center justify-center space-x-1">
                          <Globe size={16} className="text-waw-yellow-dark" />
                          <span>{plan.duration} jours</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {plan.features.slice(0, 3).map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <CheckCircle size={14} className="text-waw-yellow flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={() => onNavigateWithPlan?.('plan-details', plan.country)}
                        className="w-full btn-primary flex items-center justify-center space-x-2"
                      >
                        <Globe size={18} />
                        <span>Voir les détails</span>
                      </button>

                      <button
                        onClick={() => handleAddToCart(plan.id)}
                        className="w-full border border-waw-yellow text-waw-dark font-semibold px-4 py-2 rounded-lg hover:bg-waw-yellow/10 transition-colors flex items-center justify-center space-x-2"
                      >
                        <ShoppingCart size={18} />
                        <span>Ajouter au panier</span>
                      </button>
                    </div>

                    {/* Coverage preview */}
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Couverture:</p>
                      <div className="flex flex-wrap gap-2">
                        {plan.coverage.slice(0, 3).map((country) => (
                          <div key={country} className="flex items-center gap-2 p-2 bg-white rounded-full border border-gray-200">
                            <img src={getCountryFlag(country)} alt={country} className="w-6 h-6 rounded-full" />
                            <span className="text-sm text-gray-600">{country}</span>
                          </div>
                        ))}
                        {plan.coverage.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{plan.coverage.length - 3} autres
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Features Grid supprimée - remplacée par la grid des plans */}

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            {/* Left - Visual */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative">
                {/* Phone with eSIM */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                  className="relative z-10 mx-auto w-80 h-96 bg-gradient-to-br from-waw-dark to-gray-900 rounded-[3rem] p-4 shadow-2xl"
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-[2.5rem] p-6 flex flex-col relative overflow-hidden">
                    {/* Screen Content */}
                    <div className="text-center text-white space-y-4">
                      <div className="flex items-center justify-center space-x-2 mb-6">
                        <div className="w-3 h-3 bg-waw-yellow rounded-full animate-pulse" />
                        <span className="text-sm">eSIM activée</span>
                      </div>

                      <div className="bg-waw-yellow rounded-xl p-4 text-waw-dark">
                        <MapPin size={24} className="mx-auto mb-2" />
                        <p className="font-semibold">Arabie Saoudite</p>
                        <p className="text-sm opacity-80">Forfait Umrah</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Données utilisées</span>
                          <span>250MB / 1GB</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <motion.div
                            className="bg-waw-yellow h-2 rounded-full"
                            animate={{ width: ['0%', '25%'] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="bg-gray-800 rounded-lg p-2">
                          <Wifi size={16} className="mx-auto mb-1" />
                          <p>Signal fort</p>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-2">
                          <Zap size={16} className="mx-auto mb-1" />
                          <p>5G Ready</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                  className="absolute -top-6 -left-6 bg-white rounded-xl shadow-lg p-3"
                >
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-waw-yellow" />
                    <span className="text-sm font-medium">Activation réussie</span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ x: [0, -15, 0], y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-3"
                >
                  <div className="flex items-center space-x-2">
                    <Globe size={16} className="text-waw-yellow-dark" />
                    <span className="text-sm font-medium">50+ pays</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-waw-dark mb-4">
                  Restez connecté, où que vous soyez
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Ne perdez plus jamais le réseau en voyage. Avec notre eSIM,
                  accédez à Internet en quelques clics et gardez le contact en toute simplicité.
                </p>
              </div>

              {/* Plans */}
              <div className="space-y-4">
                {plans.map((plan, index) => (
                  <motion.div
                    key={plan.country}
                    whileHover={{ scale: 1.02 }}
                    className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
                      plan.popular
                        ? 'border-waw-yellow bg-waw-yellow/5 shadow-lg'
                        : 'border-gray-200 bg-white hover:border-waw-yellow/50'
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3 left-6 bg-waw-yellow text-waw-dark px-3 py-1 rounded-full text-sm font-semibold">
                        Populaire
                      </span>
                    )}

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-lg text-waw-dark">{plan.country}</h4>
                        <p className="text-gray-600">{plan.region} • {plan.data} • {plan.duration} jours</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-waw-dark">{plan.price}</p>
                        <button className="mt-2 px-4 py-2 bg-waw-yellow text-waw-dark rounded-lg font-semibold hover:bg-waw-yellow-dark transition-colors">
                          Choisir
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex items-center justify-center space-x-2 group"
                >
                  <span>Obtenir votre eSIM</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary flex items-center justify-center space-x-2"
                >
                  <Download size={20} />
                  <span>Télécharger l'app</span>
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* App Download Section */}
          <motion.div
            variants={itemVariants}
            className="text-center bg-gradient-to-r from-waw-dark to-gray-800 rounded-2xl p-8 text-white"
          >
            <h3 className="text-2xl font-bold mb-4">Téléchargez l'application WAW Travel</h3>
            <p className="text-gray-300 mb-6">Gérez vos eSIM et forfaits directement depuis votre smartphone</p>

            <div className="flex justify-center space-x-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#"
                className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <Download size={20} />
                <span>App Store</span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#"
                className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <Download size={20} />
                <span>Google Play</span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Order Modal */}
      <ESIMOrderModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        selectedPlan={selectedPlan}
      />
    </section>
  );
};
