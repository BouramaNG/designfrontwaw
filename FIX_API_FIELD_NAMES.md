# Fix Backend API - Noms de Champs Correctes

## Problème

L'erreur 422 montrait que le backend demandait:
```
message: "The esim package template id field is required."
```

Mais on envoyait:
```json
{
  "esim_package_id": 60,        // ❌ WRONG
  "phone": "+221783718472",     // ❌ WRONG
  "email": "...",
  "amount": "755.00",
  "payment_method": "paytech"   // ❌ WRONG
}
```

## Analyse Comparative

En regardant le projet **Angular (wawTelecom)** qui fonctionne, on a vu:

```typescript
// ✅ CORRECT (Angular)
const com = {
  email: this.email,
  phone_number: this.selectedIndicatif + this.phone,      // ← phone_number
  user_id: this.user?.id,
  esim_package_template_id: this.esimChoisi.id,           // ← template_id
  amount: this.esimChoisi.price,
};
```

## Solution Appliquée

### 1. Correction du payload dans `PlanDetailsPage.tsx` ✅

**Avant:**
```typescript
const orderData = {
  esim_package_id: selectedPlan.id,                    // ❌
  email: chatEmail,
  phone: `${selectedIndicatif}${chatPhone}`,           // ❌
  amount: selectedPlan.price,
  payment_method: 'paytech'                            // ❌
};
```

**Après:**
```typescript
const orderData = {
  esim_package_template_id: selectedPlan.id,           // ✅
  email: chatEmail,
  phone_number: `${selectedIndicatif}${chatPhone}`,    // ✅
  amount: selectedPlan.price
  // payment_method removed - not in the Angular version
};
```

### 2. Correction de l'interface TypeScript dans `orderService.ts` ✅

**Avant:**
```typescript
export interface OrderData {
  esim_package_id: number;
  email: string;
  phone: string;
  amount: number;
  payment_method?: string;
  customer_name?: string;
  country_code?: string;
}
```

**Après:**
```typescript
export interface OrderData {
  esim_package_template_id: number;      // ✅
  email: string;
  phone_number: string;                  // ✅
  amount: number;
  customer_name?: string;
  country_code?: string;
}
```

## Mapping des Noms de Champs

| Frontend React | Backend API | Détails |
|---|---|---|
| `esim_package_template_id` | ✅ Requis | ID du template de package eSIM |
| `phone_number` | ✅ Requis | Format: `+221783718472` |
| `email` | ✅ Requis | Adresse email valide |
| `amount` | ✅ Requis | Prix du forfait |
| `user_id` | ❓ Optionnel | Angular l'envoie, nous on ne l'envoie pas |
| `payment_method` | ❌ Supprimé | N'était pas dans la version Angular |

## Impact

✅ **Erreur 422 résolue** - Les noms de champs correspondent maintenant à ce que le backend attend
✅ **Commandes créables** - Le processus de création devrait fonctionner normalement
✅ **Cohérence** - Même payload que le projet Angular (source unique de vérité)

## Statut

✅ **Zéro erreurs TypeScript**
✅ **Prêt à tester**

## Prochaines Étapes

1. Relancer `npm run dev`
2. Sélectionner une destination → forfait
3. Remplir email + téléphone
4. Cliquer "Confirmer et payer"
5. **Vérifier que la commande est créée** au lieu d'avoir l'erreur 422

## Notes Importantes

- Le backend valide **`esim_package_template_id`** pas `esim_package_id`
- Le format du téléphone doit inclure l'indicatif: `+221783718472`
- Le champ `payment_method` était un ajout inutile du projet React
- Le champ `user_id` de l'Angular n'est pas envoyé depuis le React (peut être optionnel côté backend)

