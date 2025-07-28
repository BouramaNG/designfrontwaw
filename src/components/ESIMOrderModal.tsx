import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Smartphone,
  CreditCard,
  User,
  Calendar,
  CheckCircle,
  Loader,
  QrCode,
  Download,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Clock,
  Shield
} from 'lucide-react';
import type { ESIMPlan, CustomerInfo, ActivationInfo } from '../types/esim';
import { useESIM } from '../hooks/useESIM';

interface ESIMOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: ESIMPlan | null;
}

type OrderStep = 'plan' | 'customer' | 'payment' | 'confirmation';

const ESIMOrderModal = ({ isOpen, onClose, selectedPlan }: ESIMOrderModalProps) => {
  const [currentStep, setCurrentStep] = useState<OrderStep>('plan');
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'Sénégal',
    acceptTerms: false,
    marketingConsent: false
  });
  const [activationInfo, setActivationInfo] = useState<ActivationInfo>({
    deviceType: 'smartphone',
    travelDate: undefined,
    notes: ''
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');

  const { paymentMethods, loading, error, createOrder, currentOrder } = useESIM();

  const steps = [
    { id: 'plan', title: 'Forfait', icon: Smartphone },
    { id: 'customer', title: 'Informations', icon: User },
    { id: 'payment', title: 'Paiement', icon: CreditCard },
    { id: 'confirmation', title: 'Confirmation', icon: CheckCircle }
  ];

  const handleNext = () => {
    const stepOrder: OrderStep[] = ['plan', 'customer', 'payment', 'confirmation'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const stepOrder: OrderStep[] = ['plan', 'customer', 'payment', 'confirmation'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const handleCreateOrder = async () => {
    if (!selectedPlan || !selectedPaymentMethod) return;

    const success = await createOrder(customerInfo, activationInfo, selectedPaymentMethod);
    if (success) {
      setCurrentStep('confirmation');
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 'plan':
        return !!selectedPlan;
      case 'customer':
        return customerInfo.firstName && customerInfo.lastName && customerInfo.email && customerInfo.phone && customerInfo.acceptTerms;
      case 'payment':
        return !!selectedPaymentMethod;
      default:
        return true;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-waw-dark to-gray-800 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Commande eSIM</h2>
                <p className="text-gray-300">Configuration de votre forfait de voyage</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mt-8">
              {steps.map((step, index) => {
                const isActive = step.id === currentStep;
                const isCompleted = steps.findIndex(s => s.id === currentStep) > index;

                return (
                  <div key={step.id} className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-waw-yellow text-waw-dark' :
                      isActive ? 'bg-white text-waw-dark' : 'bg-white/20 text-white'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle size={20} />
                      ) : (
                        <step.icon size={20} />
                      )}
                    </div>
                    <div className="ml-3">
                      <p className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>
                        {step.title}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-12 h-0.5 mx-4 ${isCompleted ? 'bg-waw-yellow' : 'bg-white/20'}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {/* Plan Selection Step */}
            {currentStep === 'plan' && selectedPlan && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-xl font-bold text-waw-dark mb-2">Forfait sélectionné</h3>
                  <p className="text-gray-600">Vérifiez les détails de votre forfait</p>
                </div>

                <div className="bg-gradient-to-br from-waw-yellow/10 to-waw-yellow-dark/10 rounded-xl p-6 border border-waw-yellow/20">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-2xl font-bold text-waw-dark mb-2">{selectedPlan.name}</h4>
                      <p className="text-lg text-gray-700 mb-4">{selectedPlan.country}</p>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Smartphone size={16} className="text-waw-yellow-dark" />
                          <span className="text-sm text-gray-600">{selectedPlan.data}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock size={16} className="text-waw-yellow-dark" />
                          <span className="text-sm text-gray-600">{selectedPlan.duration} jours</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {selectedPlan.features.map((feature) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <CheckCircle size={14} className="text-green-500" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-3xl font-bold text-waw-dark">
                        {formatPrice(selectedPlan.price)} FCFA
                      </p>
                      {selectedPlan.popular && (
                        <span className="inline-block mt-2 px-3 py-1 bg-waw-yellow text-waw-dark rounded-full text-sm font-semibold">
                          Populaire
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-white/50 rounded-lg">
                    <h5 className="font-semibold text-waw-dark mb-2">Couverture:</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedPlan.coverage.map((country) => (
                        <span key={country} className="flex items-center space-x-1 px-2 py-1 bg-white rounded-lg text-sm">
                          <MapPin size={12} className="text-waw-yellow-dark" />
                          <span>{country}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Customer Info Step */}
            {currentStep === 'customer' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-xl font-bold text-waw-dark mb-2">Vos informations</h3>
                  <p className="text-gray-600">Nous avons besoin de ces informations pour activer votre eSIM</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.firstName}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-waw-yellow focus:border-waw-yellow"
                      placeholder="Votre prénom"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.lastName}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-waw-yellow focus:border-waw-yellow"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-waw-yellow focus:border-waw-yellow"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-waw-yellow focus:border-waw-yellow"
                      placeholder="+221 XX XXX XX XX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type d'appareil
                    </label>
                    <select
                      value={activationInfo.deviceType}
                      onChange={(e) => setActivationInfo(prev => ({ ...prev, deviceType: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-waw-yellow focus:border-waw-yellow"
                    >
                      <option value="smartphone">Smartphone</option>
                      <option value="tablet">Tablette</option>
                      <option value="laptop">Ordinateur portable</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date de voyage (optionnel)
                    </label>
                    <input
                      type="date"
                      value={activationInfo.travelDate ? activationInfo.travelDate.toISOString().split('T')[0] : ''}
                      onChange={(e) => setActivationInfo(prev => ({
                        ...prev,
                        travelDate: e.target.value ? new Date(e.target.value) : undefined
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-waw-yellow focus:border-waw-yellow"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customerInfo.acceptTerms}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, acceptTerms: e.target.checked }))}
                      className="mt-1 w-4 h-4 text-waw-yellow border-gray-300 rounded focus:ring-waw-yellow"
                    />
                    <span className="text-sm text-gray-600">
                      J'accepte les <a href="#" className="text-waw-yellow-dark underline">conditions d'utilisation</a> et la <a href="#" className="text-waw-yellow-dark underline">politique de confidentialité</a> *
                    </span>
                  </label>

                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customerInfo.marketingConsent}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, marketingConsent: e.target.checked }))}
                      className="mt-1 w-4 h-4 text-waw-yellow border-gray-300 rounded focus:ring-waw-yellow"
                    />
                    <span className="text-sm text-gray-600">
                      Je souhaite recevoir les actualités et offres de WAW TELECOM
                    </span>
                  </label>
                </div>
              </motion.div>
            )}

            {/* Payment Step */}
            {currentStep === 'payment' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-xl font-bold text-waw-dark mb-2">Méthode de paiement</h3>
                  <p className="text-gray-600">Choisissez votre mode de paiement préféré</p>
                </div>

                <div className="grid gap-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        selectedPaymentMethod === method.id
                          ? 'border-waw-yellow bg-waw-yellow/5'
                          : 'border-gray-200 hover:border-waw-yellow/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{method.icon}</span>
                          <div>
                            <h4 className="font-semibold text-gray-900">{method.name}</h4>
                            <p className="text-sm text-gray-600">{method.provider}</p>
                          </div>
                        </div>
                        {method.fees && (
                          <span className="text-sm text-gray-500">
                            +{method.fees}% frais
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {selectedPlan && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Récapitulatif</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{selectedPlan.name}</span>
                        <span className="font-medium">{formatPrice(selectedPlan.price)} FCFA</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span className="text-waw-dark">{formatPrice(selectedPlan.price)} FCFA</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Confirmation Step */}
            {currentStep === 'confirmation' && currentOrder && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-center"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={40} className="text-green-500" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-waw-dark mb-2">Commande confirmée !</h3>
                  <p className="text-gray-600">Votre eSIM a été créée avec succès</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Commande #{currentOrder.id}
                  </p>
                </div>

                {currentOrder.qrCode && (
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center justify-center space-x-2">
                      <QrCode size={20} />
                      <span>QR Code d'activation</span>
                    </h4>
                    <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                      <QrCode size={80} className="text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 mt-4">
                      Scannez ce QR code avec votre appareil pour activer l'eSIM
                    </p>
                  </div>
                )}

                <div className="bg-waw-yellow/10 rounded-xl p-6">
                  <h4 className="font-semibold text-waw-dark mb-4 flex items-center justify-center space-x-2">
                    <Shield size={20} />
                    <span>Code d'activation</span>
                  </h4>
                  <p className="text-2xl font-mono font-bold text-waw-dark tracking-wider">
                    {currentOrder.activationCode}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Utilisez ce code si vous ne pouvez pas scanner le QR code
                  </p>
                </div>

                <div className="flex space-x-4 justify-center">
                  <button className="flex items-center space-x-2 px-6 py-3 bg-waw-yellow text-waw-dark rounded-lg font-semibold hover:bg-waw-yellow-dark transition-colors">
                    <Download size={20} />
                    <span>Télécharger le QR code</span>
                  </button>
                  <button className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                    <Smartphone size={20} />
                    <span>Guide d'installation</span>
                  </button>
                </div>
              </motion.div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600">{error}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {currentStep !== 'confirmation' && (
            <div className="border-t border-gray-200 p-6">
              <div className="flex justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 'plan'}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                    currentStep === 'plan'
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ArrowLeft size={20} />
                  <span>Précédent</span>
                </button>

                {currentStep === 'payment' ? (
                  <button
                    onClick={handleCreateOrder}
                    disabled={!isStepValid() || loading}
                    className="flex items-center space-x-2 px-8 py-3 bg-waw-yellow text-waw-dark rounded-lg font-semibold hover:bg-waw-yellow-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? (
                      <Loader size={20} className="animate-spin" />
                    ) : (
                      <CreditCard size={20} />
                    )}
                    <span>{loading ? 'Traitement...' : 'Payer maintenant'}</span>
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className="flex items-center space-x-2 px-6 py-3 bg-waw-yellow text-waw-dark rounded-lg font-semibold hover:bg-waw-yellow-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <span>Suivant</span>
                    <ArrowRight size={20} />
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ESIMOrderModal;
