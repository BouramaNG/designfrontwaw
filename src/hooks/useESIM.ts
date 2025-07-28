import { useState, useEffect, useCallback } from 'react';
import type { ESIMPlan, ESIMOrder, CustomerInfo, ActivationInfo, PaymentMethod, CartItem } from '../types/esim';
import { esimApi } from '../services/esimApi';

interface UseESIMReturn {
  // State
  plans: ESIMPlan[];
  paymentMethods: PaymentMethod[];
  cart: CartItem[];
  currentOrder: ESIMOrder | null;
  loading: boolean;
  error: string | null;

  // Actions
  loadPlans: () => Promise<void>;
  loadPaymentMethods: () => Promise<void>;
  addToCart: (planId: string) => void;
  removeFromCart: (planId: string) => void;
  clearCart: () => void;
  createOrder: (customerInfo: CustomerInfo, activationInfo: ActivationInfo, paymentMethodId: string) => Promise<boolean>;
  getOrder: (orderId: string) => Promise<ESIMOrder | null>;
  activateESIM: (orderId: string, deviceInfo: any) => Promise<boolean>;

  // Computed
  cartTotal: number;
  cartItemsCount: number;
}

export const useESIM = (): UseESIMReturn => {
  const [plans, setPlans] = useState<ESIMPlan[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentOrder, setCurrentOrder] = useState<ESIMOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Charger les plans eSIM
  const loadPlans = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await esimApi.getAvailablePlans();
      if (response.success && response.data) {
        setPlans(response.data);
      } else {
        setError(response.error || 'Erreur lors du chargement des plans');
      }
    } catch (err) {
      setError('Erreur réseau lors du chargement des plans');
    } finally {
      setLoading(false);
    }
  }, []);

  // Charger les méthodes de paiement
  const loadPaymentMethods = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await esimApi.getPaymentMethods();
      if (response.success && response.data) {
        setPaymentMethods(response.data);
      } else {
        setError(response.error || 'Erreur lors du chargement des méthodes de paiement');
      }
    } catch (err) {
      setError('Erreur réseau lors du chargement des méthodes de paiement');
    } finally {
      setLoading(false);
    }
  }, []);

  // Ajouter un plan au panier
  const addToCart = useCallback((planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (!plan) return;

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.planId === planId);

      if (existingItem) {
        // Augmenter la quantité si le plan est déjà dans le panier
        return prevCart.map(item =>
          item.planId === planId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Ajouter le nouveau plan au panier
        return [...prevCart, { planId, plan, quantity: 1 }];
      }
    });
  }, [plans]);

  // Retirer un plan du panier
  const removeFromCart = useCallback((planId: string) => {
    setCart(prevCart => {
      return prevCart.reduce((acc, item) => {
        if (item.planId === planId) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
          // Si quantity === 1, on ne l'ajoute pas à acc (suppression)
        } else {
          acc.push(item);
        }
        return acc;
      }, [] as CartItem[]);
    });
  }, []);

  // Vider le panier
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Créer une commande
  const createOrder = useCallback(async (
    customerInfo: CustomerInfo,
    activationInfo: ActivationInfo,
    paymentMethodId: string
  ): Promise<boolean> => {
    if (cart.length === 0) {
      setError('Le panier est vide');
      return false;
    }

    // Pour l'instant, on prend seulement le premier item du panier
    const firstItem = cart[0];

    setLoading(true);
    setError(null);

    try {
      const response = await esimApi.createOrder(
        firstItem.planId,
        customerInfo,
        activationInfo,
        paymentMethodId
      );

      if (response.success && response.order) {
        setCurrentOrder(response.order);

        // Si le paiement nécessite une redirection
        if (response.paymentUrl) {
          window.open(response.paymentUrl, '_blank');
        }

        // Vider le panier après création de la commande
        clearCart();
        return true;
      } else {
        setError(response.error || 'Erreur lors de la création de la commande');
        return false;
      }
    } catch (err) {
      setError('Erreur réseau lors de la création de la commande');
      return false;
    } finally {
      setLoading(false);
    }
  }, [cart, clearCart]);

  // Récupérer une commande
  const getOrder = useCallback(async (orderId: string): Promise<ESIMOrder | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await esimApi.getOrder(orderId);
      if (response.success && response.data) {
        setCurrentOrder(response.data);
        return response.data;
      } else {
        setError(response.error || 'Commande non trouvée');
        return null;
      }
    } catch (err) {
      setError('Erreur réseau lors de la récupération de la commande');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Activer une eSIM
  const activateESIM = useCallback(async (orderId: string, deviceInfo: any): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await esimApi.activateESIM(orderId, deviceInfo);
      if (response.success && response.data) {
        setCurrentOrder(response.data);
        return true;
      } else {
        setError(response.error || 'Erreur lors de l\'activation');
        return false;
      }
    } catch (err) {
      setError('Erreur réseau lors de l\'activation');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Calculs dérivés
  const cartTotal = cart.reduce((total, item) => total + (item.plan.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Charger les données initiales
  useEffect(() => {
    loadPlans();
    loadPaymentMethods();
  }, [loadPlans, loadPaymentMethods]);

  // Sauvegarder le panier dans localStorage
  useEffect(() => {
    localStorage.setItem('esim_cart', JSON.stringify(cart));
  }, [cart]);

  // Charger le panier depuis localStorage au démarrage
  useEffect(() => {
    const savedCart = localStorage.getItem('esim_cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (err) {
        console.error('Erreur lors du chargement du panier:', err);
      }
    }
  }, []);

  return {
    // State
    plans,
    paymentMethods,
    cart,
    currentOrder,
    loading,
    error,

    // Actions
    loadPlans,
    loadPaymentMethods,
    addToCart,
    removeFromCart,
    clearCart,
    createOrder,
    getOrder,
    activateESIM,

    // Computed
    cartTotal,
    cartItemsCount,
  };
};
