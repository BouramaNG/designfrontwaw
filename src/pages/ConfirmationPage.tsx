import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useDeviceOptimization from '../hooks/useDeviceOptimization';
import {
  CheckCircle,
  Check,
  Download,
  Phone,
  Mail,
  ArrowLeft,
  Home,
  Loader
} from 'lucide-react';
import type { PageType } from '../App';
import { orderService, type OrderStatus } from '../services/orderService';

interface ConfirmationPageProps {
  onNavigate: (page: PageType) => void;
}

const ConfirmationPage = ({ onNavigate }: ConfirmationPageProps) => {
  // Optimisation device
  const { isSafari, isMobile, transitionConfig } = useDeviceOptimization();

  // States pour les données de commande
  const [orderData, setOrderData] = useState<OrderStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Récupérer ref_command depuis l'URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refCommand = urlParams.get('ref_command') || urlParams.get('ref') || urlParams.get('order_id');

    const fetchOrder = async () => {
      if (!refCommand) {
        console.warn('⚠️ Pas de ref_command dans l\'URL');
        setLoading(false);
        return;
      }

      try {
        console.log('🔍 Récupération commande:', refCommand);
        const response = await orderService.checkOrderStatus(refCommand);

        if (response.success && response.data) {
          console.log('✅ Commande récupérée:', response.data);
          setOrderData(response.data);
        } else {
          setError('Commande non trouvée');
        }
      } catch (err) {
        console.error('❌ Erreur récupération commande:', err);
        setError('Erreur lors de la récupération de la commande');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, []);

  // Afficher le loading
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-waw-yellow animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Chargement de votre commande...</p>
        </div>
      </div>
    );
  }

  // Afficher l'erreur
  if (error || !orderData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-waw-dark mb-2">Commande introuvable</h1>
          <p className="text-gray-600 mb-6">{error || 'Impossible de récupérer les détails de votre commande'}</p>
          <button
            onClick={() => onNavigate('home2')}
            className="bg-waw-yellow text-waw-dark px-6 py-3 rounded-lg font-semibold hover:bg-waw-yellow-dark transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-waw-dark hover:text-waw-yellow transition-colors">
              <ArrowLeft size={20} />
              <span>Retour</span>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-waw-yellow to-waw-yellow-dark rounded-lg flex items-center justify-center">
                <span className="text-waw-dark font-bold text-sm">W</span>
              </div>
              <span className="font-bold text-waw-dark">WAW TELECOM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Success Animation */}
      <div className="container-custom py-16">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-8"
          >
            <CheckCircle className="w-24 h-24 text-waw-yellow" />
          </motion.div>
          <h1 className="text-3xl font-display font-bold text-waw-dark mb-4">
            {orderData.payment_status === 'completed' || orderData.payment_status === 'paid'
              ? 'Paiement effectué avec succès !'
              : 'Commande en cours de traitement'}
          </h1>
          <p className="text-gray-600 mb-4">
            Référence de commande : <strong>#{orderData.order.ref_command}</strong>
          </p>
          <p className="text-gray-600 mb-8">
            {orderData.activation_code
              ? 'Votre eSIM est prête ! Utilisez le code d\'activation ci-dessous.'
              : 'Votre eSIM sera activée dès la confirmation du paiement.'}
          </p>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-waw-dark mb-4">
              Détails de votre commande
            </h2>

            {/* Infos commande */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-semibold text-waw-dark">{orderData.order.email}</p>
                </div>
                <div>
                  <p className="text-gray-500">Téléphone</p>
                  <p className="font-semibold text-waw-dark">{orderData.order.phone}</p>
                </div>
                <div>
                  <p className="text-gray-500">Montant</p>
                  <p className="font-semibold text-waw-dark">{orderData.order.amount?.toLocaleString('fr-FR')} FCFA</p>
                </div>
                <div>
                  <p className="text-gray-500">Statut</p>
                  <p className="font-semibold text-green-600">{orderData.payment_status}</p>
                </div>
              </div>
            </div>

            {/* Code d'activation si disponible */}
            {orderData.activation_code && (
              <div className="bg-waw-yellow/10 border-2 border-waw-yellow rounded-lg p-6 mb-4">
                <h3 className="font-semibold text-waw-dark mb-2">🎉 Code d'activation</h3>
                <p className="text-2xl font-mono font-bold text-waw-dark text-center py-2">
                  {orderData.activation_code}
                </p>
                {orderData.qr_code && (
                  <div className="mt-4 flex justify-center">
                    <img src={orderData.qr_code} alt="QR Code eSIM" className="w-48 h-48" />
                  </div>
                )}
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Check className="w-5 h-5 text-waw-yellow" />
                <div>
                  <h3 className="font-semibold text-waw-dark">Commande confirmée</h3>
                  <p className="text-sm text-gray-600">
                    Statut : {orderData.order.status || 'En cours'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Download className="w-5 h-5 text-waw-yellow" />
                <div>
                  <h3 className="font-semibold text-waw-dark">
                    {orderData.qr_code ? 'QR Code disponible' : 'QR Code en cours de génération'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {orderData.qr_code ? 'Scannez le code ci-dessus' : 'Sera envoyé par email'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="w-5 h-5 text-waw-yellow" />
                <div>
                  <h3 className="font-semibold text-waw-dark">Email de confirmation</h3>
                  <p className="text-sm text-gray-600">Envoyé à {orderData.order.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="w-5 h-5 text-waw-yellow" />
                <div>
                  <h3 className="font-semibold text-waw-dark">Assistance 24/7</h3>
                  <p className="text-sm text-gray-600">+221 76 929 1717</p>
                </div>
              </div>
            </div>
          </div>

          {/* Support Information */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-waw-dark mb-4">
              Besoin d'aide ?
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-waw-yellow rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-waw-dark" />
                </div>
                <div>
                  <h4 className="font-semibold text-waw-dark">Assistance technique</h4>
                  <p className="text-sm text-gray-600">+221 76 929 1717</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-waw-yellow rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-waw-dark" />
                </div>
                <div>
                  <h4 className="font-semibold text-waw-dark">Support client</h4>
                  <p className="text-sm text-gray-600">support@wawtelecom.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={() => onNavigate('plan-details')}
              className="flex items-center px-6 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Nouveau forfait
            </button>
            <button
              onClick={() => onNavigate('home2')}
              className="flex items-center px-6 py-3 bg-waw-yellow text-waw-dark rounded-lg hover:bg-waw-yellow-dark transition-colors"
            >
              Retour à l'accueil
              <Home className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
