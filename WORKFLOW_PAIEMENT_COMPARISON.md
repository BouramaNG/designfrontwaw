# Comparaison des Workflows de Paiement

## Workflow Global

Les deux projets (wawTelecom Angular et wawtelecom_refonte React) suivent **le même workflow** avec quelques différences de style:

```
User remplit email + téléphone
         ↓
Sélectionne forfait
         ↓
Clique "Valider/Payer"
         ↓
[1] POST /orders → Créer la commande
         ↓
[2] Confirmation utilisateur (Swal/Modal)
         ↓
[3] POST /payments/initiate → Initier paiement Paytech
         ↓
[4] Redirection vers Paytech (redirect_url ou payment_url)
         ↓
Utilisateur paie sur Paytech
         ↓
Paytech redirige vers l'app
```

## Détails par Étape

### **Étape 1: Créer la Commande**

**wawTelecom (Angular):**
```typescript
const com = {
  email: this.email,
  phone_number: this.selectedIndicatif + this.phone,
  user_id: this.user?.id,                           // ← Angular envoie l'user_id
  esim_package_template_id: this.esimChoisi.id,
  amount: this.esimChoisi.price,
};
console.log('[FRONT][Checkout] Commande à envoyer', com);
this.orderService.commande(com).subscribe({
  next: (response: any) => {
    this.comande = response;
    this.idOrder = this.comande.order.id;
    // ...continue to step 2
  },
  error: (error) => {
    // Handle error - show Swal message
  }
});
```

**wawtelecom_refonte (React):**
```typescript
const orderData = {
  esim_package_template_id: selectedPlan.id,
  email: chatEmail,
  phone_number: `${selectedIndicatif}${chatPhone}`,
  amount: selectedPlan.price
  // ← React n'envoie PAS user_id
};
console.log('📦 Création commande:', orderData);
const orderResponse = await orderService.createOrder(orderData);

if (!orderResponse.success || !orderResponse.order_id) {
  // Si erreur, afficher le modal contact
  setShowContactModal(true);
  setProcessing(false);
  return;
}
```

**Différences:**
- ✅ Angular envoie `user_id` - React ne l'envoie pas (peut être un problème?)
- ✅ React gère les erreurs 422 avec un modal contact au lieu d'une alerte
- ✅ React utilise `async/await` vs Angular `subscribe`

### **Étape 2: Confirmation Utilisateur**

**wawTelecom (Angular):**
```typescript
Swal.fire({
  title: "Commande envoyée",
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: "Confirmer Achat",
}).then((result) => {
  if (result.isConfirmed) {
    // Continue to step 3
  } else if (result.isDenied) {
    Swal.fire("Commande non confirmée", "", "info");
  }
});
```

**wawtelecom_refonte (React):**
```typescript
// ❌ PAS DE MODALE DE CONFIRMATION!
// Le paiement est initié DIRECTEMENT sans demander confirmation à l'utilisateur
// On passe directement à l'étape 3
```

**⚠️ DIFFÉRENCE IMPORTANTE:**
- Angular affiche une modale "Confirmer Achat" avant d'initier le paiement
- React passe DIRECTEMENT au paiement sans confirmation

### **Étape 3: Initier le Paiement**

**wawTelecom (Angular):**
```typescript
this.orderService.payer(this.idOrder).subscribe({
  next: (reponse: any) => {
    console.log('[FRONT][Checkout] Paiement initié', reponse);
    this.showMessage("success", "Félicitations", `${reponse.message}`);
    window.open(reponse.redirect_url, "_self");  // ← open()
  },
  error: (error) => {
    Swal.fire({
      icon: "error",
      title: "Erreur de paiement",
      text: error.error?.error || "Une erreur est survenue lors du paiement",
    });
  }
});
```

**wawtelecom_refonte (React):**
```typescript
const paymentResponse = await orderService.initiatePayment(orderResponse.order_id);

if (!paymentResponse.success || !paymentResponse.payment_url) {
  throw new Error(paymentResponse.message || 'Erreur initiation paiement');
}

console.log('✅ Paiement initié, redirection vers:', paymentResponse.payment_url);
window.location.href = paymentResponse.payment_url;  // ← window.location.href
```

**Différences:**
- Angular: `window.open(reponse.redirect_url, "_self")`
- React: `window.location.href = paymentResponse.payment_url`
- Les deux font la même chose (redirection)

### **Étape 4: Redirection vers Paytech**

Les deux redirigent vers le `redirect_url` retourné par le backend.

```
Frontend → Paytech (ouverture du formulaire de paiement)
Utilisateur paie
Paytech → Frontend (callback/redirection)
```

## Réponses Attendues du Backend

### `/orders` (POST)
```json
{
  "success": true,
  "order": {
    "id": 123,
    "email": "...",
    "phone_number": "...",
    "esim_package_template_id": 60,
    "amount": 755.00,
    ...
  }
}
```

### `/payments/initiate` (POST)
```json
{
  "success": true,
  "message": "Payment initiated",
  "redirect_url": "https://paytech.sn/...",
  "payment_url": "https://paytech.sn/..."  // ou redirect_url
}
```

## Problèmes Identifiés dans wawtelecom_refonte

### 1. ❌ **Pas de user_id envoyé**
- Angular envoie `user_id: this.user?.id`
- React n'envoie pas cet champ
- **Impact:** Le backend peut ne pas associer la commande à l'utilisateur

### 2. ❌ **Pas de modale de confirmation**
- Angular affiche "Commande envoyée - Confirmer Achat?"
- React passe directement au paiement
- **Impact:** L'utilisateur n'a pas le choix de confirmer/annuler avant le paiement

### 3. ⚠️ **Gestion d'erreur différente**
- Angular: Swal alerts directs
- React: Modal contact
- **Impact:** UX différente mais fonctionnelle

## Recommandations

### Pour que wawtelecom_refonte soit identique à wawTelecom:

1. **Ajouter user_id au payload:**
```typescript
const orderData = {
  esim_package_template_id: selectedPlan.id,
  email: chatEmail,
  phone_number: `${selectedIndicatif}${chatPhone}`,
  amount: selectedPlan.price,
  user_id: getCurrentUserId()  // ← À ajouter
};
```

2. **Ajouter une modale de confirmation:**
```typescript
// Avant initiatePayment():
const confirmed = await showConfirmationModal();
if (!confirmed) {
  return; // Utilisateur a annulé
}
```

3. **Utiliser la même clé de réponse:**
- Backend retourne soit `redirect_url` soit `payment_url`
- Vérifier laquelle est correcte et l'utiliser

## Statut Actuel

### ✅ Ce qui marche:
- Création de commande avec les bons fields
- Initiation du paiement
- Redirection vers Paytech

### ⚠️ À améliorer:
- Ajouter `user_id` pour tracker correctement l'utilisateur
- Ajouter modale de confirmation avant paiement
- Tester si `payment_url` vs `redirect_url` fonctionne bien

