# 🚀 Intégration Backend - Guide Rapide

## ✅ Ce qui est FAIT (Services API créés)

### 1. Configuration API
- ✅ `src/services/api.ts` - Client API avec axios + intercepteurs JWT
- ✅ Base URL: `https://esimwawtelecom.com/wawapi/api/`
- ✅ Gestion automatique des tokens
- ✅ Intercepteurs d'erreurs (401, etc.)

### 2. Services Backend
- ✅ `src/services/esimService.ts` - Packages eSIM
- ✅ `src/services/orderService.ts` - Commandes & Paiements
- ✅ `src/utils/constants.ts` - Pays, indicatifs, méthodes paiement

---

## 📦 ÉTAPE 1 : Installer axios

```bash
cd C:\Users\USER\Documents\waw_project\wawtelecom_refonte
npm install axios
```

---

## 🔧 ÉTAPE 2 : Adapter ESimPage.tsx

### Fichier : `src/pages/ESimPage.tsx`

**Remplacer les lignes 25-155** (fake data) par :

```typescript
import { esimService, type ESimPackage } from '../services/esimService';
import { PAYS, CONTINENTS } from '../utils/constants';

// Dans le composant ESimPage :
const [plans, setPlans] = useState<ESimPackage[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

// Charger les vraies données depuis le backend
useEffect(() => {
  const fetchPlans = async () => {
    setLoading(true);
    try {
      const data = await esimService.listEsimPackages();
      setPlans(data);
      setError(null);
    } catch (err) {
      console.error('Erreur chargement packages:', err);
      setError('Erreur lors du chargement des packages eSIM');
    } finally {
      setLoading(false);
    }
  };

  fetchPlans();
}, []);

// Utiliser PAYS depuis constants au lieu de la liste hardcodée
const destinations = PAYS;
```

**Adapter le filtrage :**

```typescript
// Filtrer par continent
const filteredPlans = plans.filter(plan => {
  // Filtre continent
  if (activeContinent !== 'Tous') {
    const country = PAYS.find(p => p.code === plan.country_code);
    if (!country || country.continent !== activeContinent) {
      return false;
    }
  }

  // Filtre recherche
  if (destSearch) {
    const searchLower = destSearch.toLowerCase();
    return (
      plan.country_name?.toLowerCase().includes(searchLower) ||
      plan.country_code?.toLowerCase().includes(searchLower)
    );
  }

  return true;
});
```

**Afficher le loading :**

```typescript
{loading && (
  <div className="text-center py-12">
    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
    <p className="mt-4 text-gray-600">Chargement des packages eSIM...</p>
  </div>
)}

{error && (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
    {error}
  </div>
)}
```

---

## 💳 ÉTAPE 3 : Adapter CheckoutPage.tsx

### Fichier : `src/pages/CheckoutPage.tsx`

**Importer les services :**

```typescript
import { orderService, type OrderData } from '../services/orderService';
import { esimService } from '../services/esimService';
import { INDICATIFS } from '../utils/constants';
```

**Créer la fonction de paiement :**

```typescript
const [processing, setProcessing] = useState(false);
const [error, setError] = useState<string | null>(null);

const handleCheckout = async () => {
  setProcessing(true);
  setError(null);

  try {
    // 1. Créer la commande
    const orderData: OrderData = {
      esim_package_id: selectedPlan.id,
      email: customerInfo.email,
      phone: `${customerInfo.phonePrefix}${customerInfo.phone}`,
      amount: selectedPlan.price,
      payment_method: 'paytech', // ou customerInfo.paymentMethod
      customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
      country_code: selectedPlan.country_code
    };

    console.log('📦 Création commande:', orderData);

    const orderResponse = await orderService.createOrder(orderData);

    if (!orderResponse.success) {
      throw new Error(orderResponse.message || 'Erreur création commande');
    }

    console.log('✅ Commande créée:', orderResponse);

    // 2. Initier le paiement
    if (orderResponse.order_id) {
      const paymentResponse = await orderService.initiatePayment(orderResponse.order_id);

      if (!paymentResponse.success) {
        throw new Error(paymentResponse.message || 'Erreur initiation paiement');
      }

      console.log('✅ Paiement initié:', paymentResponse);

      // 3. Rediriger vers PayTech
      if (paymentResponse.payment_url) {
        window.location.href = paymentResponse.payment_url;
      } else {
        // Si pas de payment_url, rediriger vers confirmation
        onNavigate?.('confirmation', orderResponse.ref_command);
      }
    }
  } catch (err: any) {
    console.error('❌ Erreur checkout:', err);
    setError(err.message || 'Une erreur est survenue lors du paiement');
  } finally {
    setProcessing(false);
  }
};
```

**Afficher le bouton de paiement :**

```typescript
<button
  onClick={handleCheckout}
  disabled={processing || !customerInfo.email || !customerInfo.phone}
  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all ${
    processing || !customerInfo.email || !customerInfo.phone
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:shadow-xl'
  }`}
>
  {processing ? (
    <span className="flex items-center justify-center">
      <svg className="animate-spin -ml-1 mr-3 h-5 w-5" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      Traitement en cours...
    </span>
  ) : (
    `Payer ${selectedPlan.price.toLocaleString('fr-FR')} FCFA`
  )}
</button>

{error && (
  <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
    ⚠️ {error}
  </div>
)}
```

**Utiliser INDICATIFS depuis constants :**

```typescript
import { INDICATIFS } from '../utils/constants';

// Dans le select d'indicatif
{INDICATIFS.map((ind) => (
  <option key={ind.ind} value={ind.ind}>
    {ind.ind} {ind.pays}
  </option>
))}
```

---

## ✅ ÉTAPE 4 : Adapter ConfirmationPage.tsx

### Fichier : `src/pages/ConfirmationPage.tsx`

**Récupérer la vraie commande :**

```typescript
import { orderService, type OrderStatus } from '../services/orderService';
import { useEffect, useState } from 'react';

const ConfirmationPage = () => {
  const [orderData, setOrderData] = useState<OrderStatus | null>(null);
  const [loading, setLoading] = useState(true);

  // Récupérer ref_command depuis l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const refCommand = urlParams.get('ref_command') || urlParams.get('ref');

  useEffect(() => {
    const fetchOrder = async () => {
      if (!refCommand) {
        console.error('Pas de ref_command dans l\'URL');
        setLoading(false);
        return;
      }

      try {
        const response = await orderService.checkOrderStatus(refCommand);

        if (response.success && response.data) {
          setOrderData(response.data);
        } else {
          console.error('Commande non trouvée');
        }
      } catch (err) {
        console.error('Erreur récupération commande:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [refCommand]);

  if (loading) {
    return <div className="text-center py-12">Chargement...</div>;
  }

  if (!orderData) {
    return <div className="text-center py-12">Commande introuvable</div>;
  }

  // Afficher les vraies données
  return (
    <div>
      <h1>Commande #{orderData.order.ref_command}</h1>
      <p>Statut: {orderData.payment_status}</p>
      {orderData.activation_code && (
        <div>
          <p>Code d'activation: {orderData.activation_code}</p>
          {orderData.qr_code && (
            <img src={orderData.qr_code} alt="QR Code eSIM" />
          )}
        </div>
      )}
    </div>
  );
};
```

---

## 🧪 ÉTAPE 5 : Tester

### 1. Installer axios
```bash
npm install axios
```

### 2. Lancer le dev server
```bash
npm run dev
```

### 3. Tester le flow complet
1. ✅ Page eSIM affiche les vrais packages depuis backend
2. ✅ Filtrage par pays/continent fonctionne
3. ✅ Clic sur un package → Checkout
4. ✅ Remplir email/téléphone → Payer
5. ✅ Redirection vers PayTech
6. ✅ Retour sur confirmation avec vraie commande

---

## 📝 Notes Importantes

### URLs de retour PayTech
Configurer dans le backend Laravel (`waw1/waw`) :
- **Success URL**: `https://votre-domaine.com/confirmation?ref_command={ref}`
- **Cancel URL**: `https://votre-domaine.com/checkout?error=cancelled`

### Variables d'environnement (optionnel)
Créer `.env` :
```
VITE_API_URL=https://esimwawtelecom.com/wawapi/api
```

Et utiliser dans `api.ts` :
```typescript
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://esimwawtelecom.com/wawapi/api';
```

---

## ⚡ Résumé - Ce qui reste à faire

| Tâche | Temps estimé | Fichiers |
|-------|--------------|----------|
| Installer axios | 1 min | package.json |
| Adapter ESimPage.tsx | 15 min | src/pages/ESimPage.tsx |
| Adapter CheckoutPage.tsx | 20 min | src/pages/CheckoutPage.tsx |
| Adapter ConfirmationPage.tsx | 15 min | src/pages/ConfirmationPage.tsx |
| Tests | 30 min | - |
| **TOTAL** | **~1h30** | |

---

## 🎯 Commandes Rapides

```bash
# Installer les dépendances
cd C:\Users\USER\Documents\waw_project\wawtelecom_refonte
npm install axios

# Lancer le projet
npm run dev

# Build production
npm run build
```

---

**TOUS LES SERVICES SONT PRÊTS !** 🎉

Il ne reste plus qu'à :
1. Installer axios
2. Adapter les 3 pages React (copier-coller le code ci-dessus)
3. Tester !

C'est parti ! 🚀
