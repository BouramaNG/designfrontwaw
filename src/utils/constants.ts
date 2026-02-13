/**
 * Constantes - Pays et indicatifs téléphoniques
 * Copié depuis wawTelecom e-sim.component.ts
 */

export interface Indicatif {
  ind: string;
  drapeau: string;
  pays: string;
}

export interface Pays {
  id: number;
  nom: string;
  code: string;
  drapeau: string;
  continent: string;
}

/**
 * Liste des indicatifs téléphoniques
 */
export const INDICATIFS: Indicatif[] = [
  { ind: '+221', drapeau: 'https://flagcdn.com/w320/sn.png', pays: 'Sénégal' },
  { ind: '+33', drapeau: 'https://flagcdn.com/w320/fr.png', pays: 'France' },
  { ind: '+212', drapeau: 'https://flagcdn.com/w320/ma.png', pays: 'Maroc' },
  { ind: '+1', drapeau: 'https://flagcdn.com/w320/us.png', pays: 'États-Unis' },
  { ind: '+34', drapeau: 'https://flagcdn.com/w320/es.png', pays: 'Espagne' },
  { ind: '+39', drapeau: 'https://flagcdn.com/w320/it.png', pays: 'Italie' },
  { ind: '+44', drapeau: 'https://flagcdn.com/w320/gb.png', pays: 'Royaume-Uni' },
  { ind: '+225', drapeau: 'https://flagcdn.com/w320/ci.png', pays: 'Côte d\'Ivoire' },
  { ind: '+254', drapeau: 'https://flagcdn.com/w320/ke.png', pays: 'Kenya' },
  { ind: '+27', drapeau: 'https://flagcdn.com/w320/za.png', pays: 'Afrique du Sud' },
  { ind: '+49', drapeau: 'https://flagcdn.com/w320/de.png', pays: 'Allemagne' },
  { ind: '+971', drapeau: 'https://flagcdn.com/w320/ae.png', pays: 'Émirats Arabes Unis' },
  { ind: '+966', drapeau: 'https://flagcdn.com/w320/sa.png', pays: 'Arabie Saoudite' },
  { ind: '+90', drapeau: 'https://flagcdn.com/w320/tr.png', pays: 'Turquie' },
  { ind: '+81', drapeau: 'https://flagcdn.com/w320/jp.png', pays: 'Japon' },
  { ind: '+86', drapeau: 'https://flagcdn.com/w320/cn.png', pays: 'Chine' },
  { ind: '+55', drapeau: 'https://flagcdn.com/w320/br.png', pays: 'Brésil' },
  { ind: '+91', drapeau: 'https://flagcdn.com/w320/in.png', pays: 'Inde' },
  { ind: '+61', drapeau: 'https://flagcdn.com/w320/au.png', pays: 'Australie' },
];

/**
 * Liste des pays/destinations eSIM - 11 destinations principales
 */
export const PAYS: Pays[] = [
  { id: 1, nom: 'Émirats Arabes Unis', code: 'AE', drapeau: 'https://flagcdn.com/w320/ae.png', continent: 'Asie' },
  { id: 2, nom: 'France', code: 'FR', drapeau: 'https://flagcdn.com/w320/fr.png', continent: 'Europe' },
  { id: 3, nom: 'Maroc', code: 'MA', drapeau: 'https://flagcdn.com/w320/ma.png', continent: 'Afrique' },
  { id: 4, nom: 'États-Unis', code: 'US', drapeau: 'https://flagcdn.com/w320/us.png', continent: 'Amerique du Nord' },
  { id: 5, nom: 'Espagne', code: 'ES', drapeau: 'https://flagcdn.com/w320/es.png', continent: 'Europe' },
  { id: 6, nom: 'Italie', code: 'IT', drapeau: 'https://flagcdn.com/w320/it.png', continent: 'Europe' },
  { id: 7, nom: 'Arabie Saoudite', code: 'SA', drapeau: 'https://flagcdn.com/w320/sa.png', continent: 'Asie' },
  { id: 8, nom: 'Turquie', code: 'TR', drapeau: 'https://flagcdn.com/w320/tr.png', continent: 'Europe' },
  { id: 9, nom: 'Chine', code: 'CN', drapeau: 'https://flagcdn.com/w320/cn.png', continent: 'Asie' },
  { id: 10, nom: 'Afrique du Sud', code: 'ZA', drapeau: 'https://flagcdn.com/w320/za.png', continent: 'Afrique' },
  { id: 11, nom: 'Royaume-Uni', code: 'GB', drapeau: 'https://flagcdn.com/w320/gb.png', continent: 'Europe' },
];

/**
 * Continents disponibles
 */
export const CONTINENTS = [
  'Tous',
  'Europe',
  'Afrique',
  'Asie',
  'Amerique du Nord',
  'Amerique du Sud',
  'Oceanie',
];

/**
 * Méthodes de paiement disponibles
 */
export const PAYMENT_METHODS = [
  { id: 'paytech', name: 'PayTech (Orange Money, Wave, Free Money)', icon: '💳' },
  { id: 'orange_money', name: 'Orange Money', icon: '🟠' },
  { id: 'wave', name: 'Wave', icon: '🌊' },
  { id: 'free_money', name: 'Free Money', icon: '🔵' },
  { id: 'visa', name: 'Carte Visa', icon: '💳' },
  { id: 'mastercard', name: 'Mastercard', icon: '💳' },
];
