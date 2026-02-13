/**
 * Service Orders - Gestion des commandes et paiements
 * Basé sur wawTelecom/src/app/services/order.service.ts
 * Backend: https://esimwawtelecom.com/wawapi/api/
 */

import apiClient from './api';

export interface OrderData {
  esim_package_template_id: number;
  email: string;
  phone_number: string;
  amount: number;
  customer_name?: string;
  country_code?: string;
}

export interface Order {
  id: number;
  ref_command: string;
  esim_package_id: number;
  email: string;
  phone: string;
  amount: number;
  status: string;
  payment_status: string;
  created_at: string;
  updated_at: string;
  esim?: any;
  package?: any;
}

export interface PaymentResponse {
  success: boolean;
  payment_url?: string;
  redirect_url?: string;
  order_id?: number;
  ref_command?: string;
  message?: string;
}

export interface OrderStatus {
  order: Order;
  payment_status: string;
  esim_status?: string;
  activation_code?: string;
  qr_code?: string;
}

class OrderService {
  /**
   * Créer une nouvelle commande
   * Endpoint: POST /orders
   */
  async createOrder(orderData: OrderData): Promise<{
    success: boolean;
    order?: Order;
    order_id?: number;
    ref_command?: string;
    message?: string;
  }> {
    try {
      console.log('📦 [OrderService] Création commande:', orderData);

      const response = await apiClient.post<any>('/orders', orderData);

      console.log('✅ [OrderService] Réponse /orders:', response);

      return {
        success: true,
        order: response.order || response.data,
        order_id: response.order_id || response.order?.id,
        ref_command: response.ref_command || response.order?.ref_command,
        message: response.message
      };
    } catch (error: any) {
      console.error('❌ [OrderService] Erreur création commande:', error);
      console.error('❌ Détails:', error.response?.data);

      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la création de la commande'
      };
    }
  }

  /**
   * Initier le paiement pour une commande
   * Endpoint: POST /payments/initiate
   */
  async initiatePayment(orderId: number): Promise<PaymentResponse> {
    try {
      console.log('💳 [OrderService] Initiation paiement pour order:', orderId);

      const payload = { order_id: orderId };
      const response = await apiClient.post<any>('/payments/initiate', payload);

      console.log('✅ [OrderService] Réponse /payments/initiate:', response);

      return {
        success: true,
        payment_url: response.payment_url || response.redirect_url,
        redirect_url: response.redirect_url || response.payment_url,
        order_id: response.order_id || orderId,
        ref_command: response.ref_command,
        message: response.message
      };
    } catch (error: any) {
      console.error('❌ [OrderService] Erreur initiation paiement:', error);
      console.error('❌ Détails:', error.response?.data);

      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de l\'initiation du paiement'
      };
    }
  }

  /**
   * Vérifier le statut d'une commande
   * Endpoint: GET /orders/status/{ref_command}
   */
  async checkOrderStatus(refCommand: string): Promise<{
    success: boolean;
    data?: OrderStatus;
    message?: string;
  }> {
    try {
      console.log('🔍 [OrderService] Vérification statut:', refCommand);

      const response = await apiClient.get<any>(`/orders/status/${refCommand}`);

      console.log('✅ [OrderService] Statut commande:', response);

      return {
        success: true,
        data: response.data || response
      };
    } catch (error: any) {
      console.error('❌ [OrderService] Erreur vérification statut:', error);

      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la vérification du statut'
      };
    }
  }

  /**
   * Récupérer les commandes de l'utilisateur connecté
   * Endpoint: GET /user-profile/orders
   * Nécessite authentification
   */
  async getUserOrders(): Promise<Order[]> {
    try {
      const response = await apiClient.get<any>('/user-profile/orders');

      if (Array.isArray(response)) {
        return response;
      }

      if (response.data && Array.isArray(response.data)) {
        return response.data;
      }

      if (response.orders && Array.isArray(response.orders)) {
        return response.orders;
      }

      return [];
    } catch (error) {
      console.error('❌ [OrderService] Erreur récupération commandes:', error);
      return [];
    }
  }

  /**
   * Récupérer les détails d'une commande spécifique
   * Endpoint: GET /user-profile/orders/{id}
   * Nécessite authentification
   */
  async getOrderDetails(orderId: number): Promise<Order | null> {
    try {
      const response = await apiClient.get<any>(`/user-profile/orders/${orderId}`);

      return response.data || response.order || response;
    } catch (error) {
      console.error(`❌ [OrderService] Erreur récupération commande #${orderId}:`, error);
      return null;
    }
  }

  /**
   * Récupérer toutes les commandes (Admin)
   * Endpoint: GET /orders
   * Nécessite authentification admin
   */
  async getAllOrders(): Promise<Order[]> {
    try {
      const response = await apiClient.get<any>('/orders');

      if (Array.isArray(response)) {
        return response;
      }

      if (response.data && Array.isArray(response.data)) {
        return response.data;
      }

      return [];
    } catch (error) {
      console.error('❌ [OrderService] Erreur récupération toutes commandes:', error);
      return [];
    }
  }

  /**
   * Récupérer tous les paiements (Admin)
   * Endpoint: GET /payments
   * Nécessite authentification admin
   */
  async getAllPayments(): Promise<any[]> {
    try {
      const response = await apiClient.get<any>('/payments');

      if (Array.isArray(response)) {
        return response;
      }

      if (response.data && Array.isArray(response.data)) {
        return response.data;
      }

      return [];
    } catch (error) {
      console.error('❌ [OrderService] Erreur récupération paiements:', error);
      return [];
    }
  }
}

// Instance singleton
export const orderService = new OrderService();
export default orderService;
