import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Apple, Smartphone } from 'lucide-react';
import { createPortal } from 'react-dom';

interface CompatibleDevicesModalProps {
  open: boolean;
  onClose: () => void;
}

const appleDevices = [
  'iPhone 16, 16 Plus, 16 Pro, 16 Pro Max',
  'iPhone 15, 15 Plus, 15 Pro, 15 Pro Max',
  'iPhone 14, 14 Plus, 14 Pro, 14 Pro Max',
  'iPhone 13, 13 Mini, 13 Pro, 13 Pro Max, iPhone SE 3 (2022)',
  'iPhone 12, 12 Mini, 12 Pro, 12 Pro Max, iPhone SE 2 (2020)',
  'iPhone 11 Pro, 11 Pro Max, 11',
  'iPhone XR, XS, XS Max',
  'iPad Air (3rd-6th gen)',
  'iPad Pro 11-in (1st–4th gen)',
  'iPad (7th-10th gen)',
  'iPad Mini (5th, 6th gen)'
];

const androidDevices = [
  'Samsung Galaxy S20, S20+, S20+ 5G, S20 Ultra',
  'Samsung Galaxy S21, S21+ 5G, S21 Ultra 5G',
  'Samsung Galaxy S22, S22+, S22 Ultra',
  'Samsung Galaxy S23, S23+, S23 Ultra, 23 FE',
  'Samsung Galaxy S24, S24+, S24 Ultra, 24 FE',
  'Samsung Galaxy S25, S25+ 5G, S22 Ultra',
  'Samsung Note 20, Note 20 Ultra 5G',
  'Samsung Galaxy Fold, Fold 3, Z Fold2 5G, Z Fold 3 5G, Z Flip 3 5G, Z Flip3 5G Fold, Z Flip',
  'Google Pixel 2 (bought with Fi service), 2 XL',
  'Google Pixel 3, 3 XL, 3a, 3a XL',
  'Google Pixel 4, 4a, 4 XL',
  'Google Pixel 5, 5a',
  'Google Pixel 6, 6 Pro',
  'Google Pixel 8, 8a, 8 Pro',
  'Google Pixel 9, 9 Pro, 9 Pro XL',
  'Google Pixel Fold'
];

export const CompatibleDevicesModal: React.FC<CompatibleDevicesModalProps> = ({ open, onClose }) => {
  // Bloquer le scroll du body quand le modal est ouvert
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px'; // Compenser la scrollbar
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }

    // Cleanup au démontage
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [open]);

  const modalContent = (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0,
            zIndex: 9999
          }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-0 relative flex flex-col max-h-[90vh] mx-4"
            initial={{ scale: 0.95, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 40 }}
            onClick={(e) => e.stopPropagation()}
          >
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-white rounded-t-2xl border-b border-gray-100 flex items-center justify-between px-6 py-4 shadow-sm">
            <h2 className="text-xl font-bold text-waw-dark flex items-center gap-2">
              <Smartphone className="text-waw-yellow-dark" size={22} /> Appareils compatibles eSIM
            </h2>
            <button
              className="text-gray-400 hover:text-waw-yellow-dark"
              onClick={onClose}
              aria-label="Fermer"
            >
              <X size={24} />
            </button>
          </div>
            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1 px-6 py-6 md:py-8 md:px-10">
              {/* Apple Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <Apple className="text-waw-yellow-dark" size={20} />
                  <span className="text-lg font-semibold text-waw-yellow-dark">APPLE</span>
                  <span className="text-2xl">🍏</span>
                </div>
                <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2">
                  {appleDevices.map((device, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Smartphone className="text-waw-yellow-dark" size={16} />
                      {device}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Android Section */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center justify-center w-5 h-5 bg-green-100 rounded-full mr-1">🤖</span>
                  <span className="text-lg font-semibold text-waw-yellow-dark">ANDROID</span>
                </div>
                <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2">
                  {androidDevices.map((device, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Smartphone className="text-waw-yellow-dark" size={16} />
                      {device}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Utiliser un portail pour rendre le modal à la racine du DOM
  return typeof document !== 'undefined' 
    ? createPortal(modalContent, document.body)
    : null;
};
