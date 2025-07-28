import type { ESIMPlan, ESIMOrder, CustomerInfo, ActivationInfo, OrderResponse, ApiResponse, PaymentMethod } from '../types/esim';

// Configuration de l'API
const API_BASE_URL = import.meta.env?.VITE_API_URL || 'https://api.wawtelecom.com';
const API_VERSION = 'v1';

class ESIMApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_BASE_URL}/${API_VERSION}`;
  }

  // Simuler un délai d'API
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Générer un ID unique
  private generateId(): string {
    return `esim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Plans eSIM disponibles
  async getAvailablePlans(): Promise<ApiResponse<ESIMPlan[]>> {
    try {
      await this.delay(800); // Simulation de latence réseau

      const plans: ESIMPlan[] = [
        {
          id: 'umrah-sa-1gb',
          name: 'Forfait Umrah',
          country: 'Arabie Saoudite',
          region: 'Moyen-Orient',
          data: '1GB',
          dataGB: 1,
          duration: 7,
          price: 2999,
          currency: 'FCFA',
          coverage: ['Arabie Saoudite', 'La Mecque', 'Médine'],
          features: [
            'Activation instantanée',
            'Valable 7 jours',
            'Support 24/7',
            'Pas de frais d\'itinérance'
          ],
          popular: true
        },
        {
          id: 'europe-5gb',
          name: 'Europe Voyage',
          country: 'Europe',
          region: 'Europe',
          data: '5GB',
          dataGB: 5,
          duration: 30,
          price: 8500,
          currency: 'FCFA',
          coverage: ['France', 'Allemagne', 'Espagne', 'Italie', 'Belgique'],
          features: [
            '5G disponible',
            'Valable 30 jours',
            'Rechargeable',
            'Partage de connexion'
          ]
        },
        {
          id: 'usa-3gb',
          name: 'USA Business',
          country: 'États-Unis',
          region: 'Amérique du Nord',
          data: '3GB',
          dataGB: 3,
          duration: 14,
          price: 12500,
          currency: 'FCFA',
          coverage: ['États-Unis', 'Porto Rico'],
          features: [
            'Réseau 5G',
            'Valable 14 jours',
            'Appels locaux inclus',
            'SMS inclus'
          ]
        },
        {
          id: 'africa-2gb',
          name: 'Afrique Connect',
          country: 'Afrique',
          region: 'Afrique',
          data: '2GB',
          dataGB: 2,
          duration: 30,
          price: 6500,
          currency: 'FCFA',
          coverage: ['Maroc', 'Tunisie', 'Côte d\'Ivoire', 'Ghana', 'Nigeria'],
          features: [
            'Couverture multi-pays',
            'Valable 30 jours',
            'Support en français',
            'Activation immédiate'
          ]
        },
        {
          id: 'global-10gb',
          name: 'Global Premium',
          country: 'Mondial',
          region: 'Mondial',
          data: '10GB',
          dataGB: 10,
          duration: 30,
          price: 25000,
          currency: 'FCFA',
          coverage: ['Plus de 150 pays'],
          features: [
            'Couverture mondiale',
            'Valable 30 jours',
            'Priority support',
            'Rechargeable',
            'Hotspot inclus'
          ],
          discount: 15,
          originalPrice: 29500
        },
        {
          id: 'asia-4gb',
          name: 'Asie Voyage',
          country: 'Asie',
          region: 'Asie',
          data: '4GB',
          dataGB: 4,
          duration: 21,
          price: 15500,
          currency: 'FCFA',
          coverage: ['Japon', 'Corée du Sud', 'Singapour', 'Thaïlande', 'Malaisie'],
          features: [
            'Réseau haute vitesse',
            'Valable 21 jours',
            'Support multilingue',
            'Apps sociales illimitées'
          ]
        }
      ];

      return {
        success: true,
        data: plans,
        message: 'Plans récupérés avec succès'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erreur lors de la récupération des plans'
      };
    }
  }

  // Méthodes de paiement disponibles
  async getPaymentMethods(): Promise<ApiResponse<PaymentMethod[]>> {
    try {
      await this.delay(500);

      const methods: PaymentMethod[] = [
        {
          id: 'orange_money',
          name: 'Orange Money',
          type: 'mobile_money',
          provider: 'Orange',
          icon: '🟠',
          supported: true
        },
        {
          id: 'wave',
          name: 'Wave',
          type: 'mobile_money',
          provider: 'Wave',
          icon: '🌊',
          supported: true
        },
        {
          id: 'free_money',
          name: 'Free Money',
          type: 'mobile_money',
          provider: 'Free',
          icon: '🔵',
          supported: true
        },
        {
          id: 'visa_card',
          name: 'Carte Visa',
          type: 'card',
          provider: 'Visa',
          icon: '💳',
          supported: true,
          fees: 2.5
        },
        {
          id: 'mastercard',
          name: 'Mastercard',
          type: 'card',
          provider: 'Mastercard',
          icon: '💳',
          supported: true,
          fees: 2.5
        },
        {
          id: 'bank_transfer',
          name: 'Virement bancaire',
          type: 'bank_transfer',
          provider: 'Bank',
          icon: '🏦',
          supported: true
        }
      ];

      return {
        success: true,
        data: methods
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erreur lors de la récupération des méthodes de paiement'
      };
    }
  }

  // Créer une commande eSIM
  async createOrder(
    planId: string,
    customerInfo: CustomerInfo,
    activationInfo: ActivationInfo,
    paymentMethodId: string
  ): Promise<OrderResponse> {
    try {
      await this.delay(1500); // Simulation du processus de commande

      // Récupérer le plan
      const plansResponse = await this.getAvailablePlans();
      if (!plansResponse.success || !plansResponse.data) {
        throw new Error('Plan non trouvé');
      }

      const plan = plansResponse.data.find(p => p.id === planId);
      if (!plan) {
        throw new Error('Plan non trouvé');
      }

      // Créer la commande
      const order: ESIMOrder = {
        id: this.generateId(),
        planId,
        plan,
        customerInfo,
        activationInfo,
        status: 'pending',
        paymentStatus: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        totalAmount: plan.price,
        activationCode: `WAW${Math.random().toString(36).substr(2, 8).toUpperCase()}`
      };

      // Simuler le processus de paiement
      if (paymentMethodId === 'orange_money' || paymentMethodId === 'wave') {
        // Simulation paiement mobile money réussi
        order.paymentStatus = 'completed';
        order.status = 'paid';
        order.qrCode = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="white"/><text x="100" y="100" text-anchor="middle" font-family="Arial" font-size="12" fill="black">QR Code eSIM</text><text x="100" y="120" text-anchor="middle" font-family="Arial" font-size="10" fill="black">${order.activationCode}</text></svg>`;
      } else {
        // Simulation paiement par carte - nécessite redirection
        return {
          success: true,
          order,
          paymentUrl: `https://payment.wawtelecom.com/checkout/${order.id}`
        };
      }

      // Sauvegarder la commande (simulation)
      localStorage.setItem(`esim_order_${order.id}`, JSON.stringify(order));

      return {
        success: true,
        order
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur lors de la création de la commande'
      };
    }
  }

  // Récupérer une commande
  async getOrder(orderId: string): Promise<ApiResponse<ESIMOrder>> {
    try {
      await this.delay(300);

      const orderData = localStorage.getItem(`esim_order_${orderId}`);
      if (!orderData) {
        return {
          success: false,
          error: 'Commande non trouvée'
        };
      }

      const order: ESIMOrder = JSON.parse(orderData);

      return {
        success: true,
        data: order
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erreur lors de la récupération de la commande'
      };
    }
  }

  // Activer une eSIM
  async activateESIM(orderId: string, deviceInfo: any): Promise<ApiResponse<ESIMOrder>> {
    try {
      await this.delay(2000); // Simulation du processus d'activation

      const orderResponse = await this.getOrder(orderId);
      if (!orderResponse.success || !orderResponse.data) {
        throw new Error('Commande non trouvée');
      }

      const order = orderResponse.data;

      if (order.status !== 'paid') {
        throw new Error('La commande doit être payée avant activation');
      }

      // Mettre à jour le statut
      order.status = 'activated';
      order.activatedAt = new Date();
      order.expiresAt = new Date(Date.now() + order.plan.duration * 24 * 60 * 60 * 1000);
      order.updatedAt = new Date();

      // Sauvegarder
      localStorage.setItem(`esim_order_${order.id}`, JSON.stringify(order));

      return {
        success: true,
        data: order,
        message: 'eSIM activée avec succès'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur lors de l\'activation'
      };
    }
  }

  // Vérifier le statut d'une commande
  async checkOrderStatus(orderId: string): Promise<ApiResponse<{ status: string; paymentStatus: string }>> {
    try {
      await this.delay(200);

      const orderResponse = await this.getOrder(orderId);
      if (!orderResponse.success || !orderResponse.data) {
        throw new Error('Commande non trouvée');
      }

      const order = orderResponse.data;

      return {
        success: true,
        data: {
          status: order.status,
          paymentStatus: order.paymentStatus
        }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erreur lors de la vérification du statut'
      };
    }
  }
}

// Instance singleton
export const esimApi = new ESIMApiService();
export default esimApi;
