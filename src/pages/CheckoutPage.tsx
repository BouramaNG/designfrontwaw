import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    phoneCode: '+221'
  });

  const phoneCodes = [
    { code: '+221', country: 'Sénégal' },
    { code: '+237', country: 'Cameroun' },
    { code: '+229', country: 'Bénin' },
    { code: '+226', country: 'Burkina Faso' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.phone) {
      onNavigate('confirmation');
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

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-waw-yellow text-waw-dark px-8 py-3 rounded-lg font-semibold hover:bg-waw-yellow-dark transition-colors"
                >
                  Continuer
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
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-waw-yellow text-waw-dark px-12 py-4 rounded-xl font-semibold hover:bg-waw-yellow-dark transition-colors"
                  onClick={() => onNavigate('confirmation')}
                >
                  Valider votre paiement
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
