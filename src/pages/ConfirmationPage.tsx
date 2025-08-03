import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Check,
  Download,
  Phone,
  Mail,
  ArrowLeft,
  Home
} from 'lucide-react';
import type { PageType } from '../App';

interface ConfirmationPageProps {
  onNavigate: (page: PageType) => void;
}

const ConfirmationPage = ({ onNavigate }: ConfirmationPageProps) => {
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
            Paiement effectué avec succès !
          </h1>
          <p className="text-gray-600 mb-8">
            Votre eSIM sera activée dès votre arrivée dans le pays de destination.
          </p>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-waw-dark mb-4">
              Détails de votre commande
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Check className="w-5 h-5 text-waw-yellow" />
                <div>
                  <h3 className="font-semibold text-waw-dark">eSIM activée</h3>
                  <p className="text-sm text-gray-600">Votre eSIM sera active à votre arrivée</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Download className="w-5 h-5 text-waw-yellow" />
                <div>
                  <h3 className="font-semibold text-waw-dark">QR Code envoyé</h3>
                  <p className="text-sm text-gray-600">Par SMS et email</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="w-5 h-5 text-waw-yellow" />
                <div>
                  <h3 className="font-semibold text-waw-dark">Email de confirmation</h3>
                  <p className="text-sm text-gray-600">Vérifiez votre boîte mail</p>
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
