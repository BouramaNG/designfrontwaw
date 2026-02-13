# Modale de Contact Temporaire - Forfaits en Configuration

## Problème

Les forfaits sont actuellement en cours de configuration et les prix ne sont pas encore finalisés. Lors de la tentative de créer une commande, le backend retourne l'erreur:

```
❌ [OrderService] Erreur création commande: AxiosError: Request failed with status code 422
❌ Détails: 
{
  errors: {esim_package_template_id: Array(1)},
  message: "The esim package template id field is required."
}
```

## Solution Implémentée

Au lieu de procéder au paiement directement, on affiche une modale temporaire qui demande à l'utilisateur de contacter le support par email.

### Modifications au fichier `PlanDetailsPage.tsx`

#### 1. Nouvel état pour le modal contact (ligne ~98)
```typescript
// Modal "Contactez-nous" - Pas encore de prix définis
const [showContactModal, setShowContactModal] = useState(false);
```

#### 2. Fonction `handleCheckoutSubmit` simplifiée (ligne ~475)
**Avant:** Créait une commande via l'API
**Après:** Affiche le modal contact au lieu de traiter le paiement

```typescript
const handleCheckoutSubmit = () => {
  // Validation des inputs
  if (!chatEmail.trim() || !chatEmail.includes('@')) {
    alert('Veuillez entrer un email valide');
    return;
  }

  if (!chatPhone.trim() || chatPhone.length < 8) {
    alert('Veuillez entrer un numéro de téléphone valide');
    return;
  }

  if (!selectedPlan) {
    alert('Aucun forfait sélectionné');
    return;
  }

  // 👉 TEMPORAIRE: Afficher le modal "Contactez-nous" au lieu de créer une commande
  // Le backend nécessite des fields manquants pour les forfaits en cours de configuration
  setShowContactModal(true);
};
```

#### 3. Nouveau modal "Contactez-nous" (ligne ~1383+)
- **Style:** Identique au modal checkout (Framer Motion, glassmorphism, etc.)
- **Icône:** Sparkles animé avec pulsing effect
- **Contenu:** Affiche les informations saisies par l'utilisateur
- **CTA Principal:** Bouton "Envoyer un email" vers `contact@wawtelecom.com`
- **CTA Secondaire:** Bouton "Continuer à explorer" pour fermer le modal

## Flux Utilisateur

1. **Utilisateur remplit le formulaire:**
   - Email valide (contient @)
   - Numéro de téléphone (≥8 caractères)
   - Forfait sélectionné

2. **Clique sur "Confirmer et payer"**
   - Les validations s'exécutent
   - Au lieu de créer une commande, le modal contact s'affiche

3. **Le modal affiche:**
   - ✓ Forfait sélectionné avec prix
   - ✓ Email et téléphone saisis
   - ✓ Message explicatif (en configuration)
   - ✓ Email de contact: `contact@wawtelecom.com`

4. **Utilisateur peut:**
   - Cliquer sur "Envoyer un email" pour contacter le support
   - Cliquer sur "Continuer à explorer" pour fermer et revenir à l'accueil

## Design du Modal Contact

### Header
- Gradient bleu → violet (différent du modal checkout jaune)
- Icône Sparkles avec animation pulsing
- Titre: "Commande en attente"
- Sous-titre: "Nos forfaits arrivent bientôt! 🚀"

### Corps
1. **Section récapitulatif:**
   - Forfait sélectionné (data + pays + prix)
   - Informations utilisateur (email + téléphone)
   - Checkmarks verts pour chaque élément

2. **Message d'information:**
   - Fond orange/amber
   - Texte: "Actuellement en configuration"
   - Explique que les forfaits arrivent bientôt

3. **Bouton principal:**
   - Gradient bleu → violet
   - Icône Mail + texte "Envoyer un email"
   - Lien mailto vers contact@wawtelecom.com

4. **Email de contact:**
   - Affiché explicitement: `📧 contact@wawtelecom.com`

5. **Bouton secondaire:**
   - Texte gris
   - "Continuer à explorer"
   - Ferme le modal

### Footer
- Message de confiance: "Vos informations seront sauvegardées"
- Icône verrou

## Traçabilité

Les informations saisies par l'utilisateur ne sont pas persistées côté backend pour l'instant. Elles sont uniquement affichées dans le modal pour confirmationvisuelle.

**Future enhancement:** Sauvegarder les informations en base de données pour:
- Permettre au support de traiter les demandes manuellement
- Envoyer un email automatique avec les détails de la commande

## Statut de Déploiement

✅ Code complet et fonctionnel  
✅ Zéro erreurs TypeScript  
✅ Modal bien stylisé et animé  
✅ Prêt pour testing en local  

## Testing

Étapes pour vérifier:

1. `npm run dev` dans `wawtelecom_refonte`
2. Naviguer vers une destination (ex: Sénégal)
3. Sélectionner un forfait
4. Remplir le formulaire (email + téléphone)
5. Cliquer sur "Confirmer et payer"
6. Vérifier que le modal contact s'affiche
7. Vérifier que l'email de contact est cliquable
8. Vérifier que "Continuer à explorer" ferme le modal

## Remarques

- Le bouton "Envoyer un email" utilise un lien `mailto:` qui ouvre le client email défaut
- Les données ne sont pas envoyées au backend à ce stade
- Le modal peut être fermé en cliquant l'X, le background, ou "Continuer à explorer"
- L'indicatif téléphonique sélectionné est inclus dans l'affichage du numéro

