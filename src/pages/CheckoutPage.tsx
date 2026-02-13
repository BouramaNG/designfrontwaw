import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useDeviceOptimization from '../hooks/useDeviceOptimization';
import {
  ArrowLeft,
  Mail,
  Phone,
  Shield,
  CheckCircle,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import type { PageType } from '../App';
import { orderService, type OrderData } from '../services/orderService';
import { INDICATIFS } from '../utils/constants';

interface CheckoutPageProps {
  onNavigate: (page: 'home' | 'home2' | 'connectivite' | 'cloud' | 'travel' | 'iot' | 'about' | 'contact' | 'plan-details' | 'checkout' | 'confirmation') => void;
  selectedPlan: {
    data: string;
    price: number;
    description: string;
    country: string;
  };
}

const CheckoutPage = ({ onNavigate, selectedPlan }: CheckoutPageProps) => {
  // Optimisation device
  const { isSafari, isMobile, transitionConfig } = useDeviceOptimization();
  
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    phoneCode: '+221'
  });

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const phoneCodes = INDICATIFS.map(ind => ({ code: ind.ind, country: ind.pays }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.phone) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Préparer les données de commande
      const orderData: OrderData = {
        esim_package_id: (selectedPlan as any).id || 1, // ID du package
        email: formData.email,
        phone: `${formData.phoneCode}${formData.phone}`,
        amount: selectedPlan.price,
        payment_method: 'paytech',
        customer_name: formData.email.split('@')[0],
        country_code: (selectedPlan as any).country_code || selectedPlan.country
      };

      console.log('📦 Création commande:', orderData);

      // 1. Créer la commande
      const orderResponse = await orderService.createOrder(orderData);

      if (!orderResponse.success) {
        throw new Error(orderResponse.message || 'Erreur lors de la création de la commande');
      }

      console.log('✅ Commande créée:', orderResponse);

      // 2. Initier le paiement
      if (orderResponse.order_id) {
        const paymentResponse = await orderService.initiatePayment(orderResponse.order_id);

        if (!paymentResponse.success) {
          throw new Error(paymentResponse.message || 'Erreur lors de l\'initiation du paiement');
        }

        console.log('✅ Paiement initié:', paymentResponse);

        // 3. Rediriger vers PayTech ou page de confirmation
        if (paymentResponse.payment_url) {
          console.log('🔄 Redirection vers PayTech:', paymentResponse.payment_url);
          window.location.href = paymentResponse.payment_url;
        } else {
          // Si pas de payment_url, aller directement à la confirmation
          console.log('✅ Redirection vers confirmation');
          onNavigate('confirmation');
        }
      }
    } catch (err: any) {
      console.error('❌ Erreur checkout:', err);
      setError(err.message || 'Une erreur est survenue lors du paiement');
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('plan-details')}
              className="flex items-center space-x-2 text-waw-dark hover:text-waw-yellow transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Retour aux plans</span>
            </button>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-waw-yellow to-waw-yellow-dark rounded-lg flex items-center justify-center">
                <span className="text-waw-dark font-bold text-sm">W</span>
              </div>
              <span className="font-bold text-waw-dark">WAW TELECOM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Card - Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-display font-bold text-waw-dark mb-6">
              Informations de contact
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-5 h-5 inline-block mr-2" />
                  Email (obligatoire)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-waw-yellow focus:ring-waw-yellow transition-colors"
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-5 h-5 inline-block mr-2" />
                    Code pays
                  </label>
                  <select
                    value={formData.phoneCode}
                    onChange={(e) => setFormData({ ...formData, phoneCode: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-waw-yellow focus:ring-waw-yellow transition-colors"
                  >
                    {phoneCodes.map((code) => (
                      <option key={code.code} value={code.code}>
                        {code.code} ({code.country})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Numéro de téléphone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-waw-yellow focus:ring-waw-yellow transition-colors"
                    placeholder="77 123 45 67"
                    required
                  />
                </div>
              </div>

              {/* Message d'erreur */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 flex items-start gap-2">
                  <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={processing || !formData.email || !formData.phone}
                  className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                    processing || !formData.email || !formData.phone
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-waw-yellow text-waw-dark hover:bg-waw-yellow-dark'
                  }`}
                >
                  {processing ? 'Traitement...' : 'Continuer'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Card - Order Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-display font-bold text-waw-dark mb-6">
              Résumé de votre commande
            </h2>

            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-waw-dark">Forfait sélectionné</h3>
                <p className="text-gray-600">{selectedPlan.description}</p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Data :</span>
                  <span className="font-semibold text-waw-dark">{selectedPlan.data}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Prix :</span>
                  <span className="font-semibold text-waw-dark">
                    {selectedPlan.price.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pays :</span>
                  <span className="font-semibold text-waw-dark">{selectedPlan.country}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Durée de validité :</span>
                  <span className="font-semibold text-waw-dark">30 JOURS</span>
                </div>
              </div>

              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: processing ? 1 : 1.05 }}
                  whileTap={{ scale: processing ? 1 : 0.95 }}
                  disabled={processing || !formData.email || !formData.phone}
                  className={`px-12 py-4 rounded-xl font-semibold transition-colors flex items-center gap-3 ${
                    processing || !formData.email || !formData.phone
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-waw-yellow text-waw-dark hover:bg-waw-yellow-dark'
                  }`}
                  onClick={handleSubmit}
                >
                  {processing ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Traitement en cours...</span>
                    </>
                  ) : (
                    <>
                      <span>Payer {selectedPlan.price.toLocaleString('fr-FR')} FCFA</span>
                      <ChevronRight size={20} />
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CheckoutPage;
