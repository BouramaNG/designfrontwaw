# Fix PlanDetailsPage - Missing Variables & Functions

## Problèmes Résolus

### 1. ❌ `emailSubmitted is not defined` 
**Erreur:** `ReferenceError: emailSubmitted is not defined` à la ligne 701

**Cause:** La variable était utilisée dans le JSX mais jamais déclarée avec `useState`.

**Solution:** ✅ Ajouté `const [emailSubmitted, setEmailSubmitted] = useState(false);`

---

### 2. ❌ `phoneSubmitted` manquant
**Erreur:** Même problème que emailSubmitted

**Solution:** ✅ Ajouté `const [phoneSubmitted, setPhoneSubmitted] = useState(false);`

---

### 3. ❌ `canCheckout` non défini
**Erreur:** `Cannot find name 'canCheckout'` à la ligne 726

**Cause:** Variable utilisée pour afficher le bouton de paiement, mais jamais calculée

**Solution:** ✅ Ajouté:
```typescript
const canCheckout = emailSubmitted && phoneSubmitted && selectedPlanId !== null;
```

Le bouton de paiement ne s'affiche que si:
- L'email est valide ✓
- Le phone est valide ✓
- Un plan est sélectionné ✓

---

### 4. ❌ `handleChangePlan` non défini
**Erreur:** `Cannot find name 'handleChangePlan'` à la ligne 795

**Cause:** Logique conditionnelle utilisait cette fonction pour permettre à l'utilisateur de changer de plan après validation

**Solution:** ✅ Ajouté:
```typescript
const handleChangePlan = (id: number) => {
  // Même chose que handleSelectPlan - change le plan sélectionné
  setSelectedPlanId(id);
};
```

---

## Changements Détaillés

### Déclaration des États (ligne ~103-105)
```typescript
// Email & Phone submission tracking
const [emailSubmitted, setEmailSubmitted] = useState(false);
const [phoneSubmitted, setPhoneSubmitted] = useState(false);
```

### Calcul de `canCheckout` (ligne ~462)
```typescript
// Vérifier si l'utilisateur peut procéder au paiement
const canCheckout = emailSubmitted && phoneSubmitted && selectedPlanId !== null;
```

### Fonction `handleChangePlan` (ligne ~469-472)
```typescript
const handleChangePlan = (id: number) => {
  // Même chose que handleSelectPlan - change le plan sélectionné
  setSelectedPlanId(id);
};
```

### Input Email - Validation en temps réel (ligne ~1500)
```typescript
onChange={(e) => {
  setChatEmail(e.target.value);
  // Marquer email comme soumis si valide
  if (e.target.value.trim() && e.target.value.includes('@')) {
    setEmailSubmitted(true);
  } else {
    setEmailSubmitted(false);
  }
}}
```

**Logique:**
- Si l'email contient `@` et n'est pas vide → `emailSubmitted = true`
- Sinon → `emailSubmitted = false`

### Input Phone - Validation en temps réel (ligne ~1535)
```typescript
onChange={(e) => {
  setChatPhone(e.target.value);
  // Marquer phone comme soumis si valide
  if (e.target.value.trim() && e.target.value.length >= 8) {
    setPhoneSubmitted(true);
  } else {
    setPhoneSubmitted(false);
  }
}}
```

**Logique:**
- Si le numéro fait au moins 8 caractères et n'est pas vide → `phoneSubmitted = true`
- Sinon → `phoneSubmitted = false`

---

## Flux Utilisateur

1. **État initial:**
   - `emailSubmitted = false`
   - `phoneSubmitted = false`
   - `canCheckout = false`
   - Bouton paiement caché

2. **Utilisateur entre son email:**
   - Email est validé en temps réel
   - Si email valide → `emailSubmitted = true`
   - Indicateur visuel affiché

3. **Utilisateur entre son phone:**
   - Phone est validé en temps réel
   - Si phone valide → `phoneSubmitted = true`
   - Indicateur visuel affiché

4. **Utilisateur sélectionne un plan:**
   - Si `emailSubmitted && phoneSubmitted && selectedPlanId` → `canCheckout = true`
   - Bouton "Procéder au paiement" devient visible
   - Utilisateur peut aussi changer de plan via `handleChangePlan`

5. **Utilisateur clique sur le bouton:**
   - Exécute `handleCheckoutSubmit()`
   - Crée une commande
   - Initie le paiement Paytech

---

## Vérification

✅ Pas d'erreurs TypeScript  
✅ Toutes les variables sont définies  
✅ Validation des inputs en temps réel  
✅ Logique de flow utilisateur cohérente  
✅ CSP error reste (à gérer séparément si nécessaire)

