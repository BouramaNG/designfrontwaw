export interface ESIMPlan {
  id: string;
  name: string;
  country: string;
  region: string;
  data: string;
  dataGB: number;
  duration: number; // in days
  price: number; // in FCFA
  currency: string;
  coverage: string[];
  features: string[];
  popular?: boolean;
  discount?: number;
  originalPrice?: number;
}

export interface ESIMOrder {
  id: string;
  planId: string;
  plan: ESIMPlan;
  customerInfo: CustomerInfo;
  activationInfo: ActivationInfo;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
  activatedAt?: Date;
  expiresAt?: Date;
  totalAmount: number;
  qrCode?: string;
  activationCode?: string;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  acceptTerms: boolean;
  marketingConsent?: boolean;
}

export interface ActivationInfo {
  deviceType: string;
  travelDate?: Date;
  notes?: string;
}

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'processing'
  | 'ready'
  | 'activated'
  | 'expired'
  | 'cancelled';

export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded';

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'mobile_money' | 'card' | 'bank_transfer';
  provider: string;
  icon: string;
  supported: boolean;
  fees?: number;
}

export interface CartItem {
  planId: string;
  plan: ESIMPlan;
  quantity: number;
}

export interface OrderResponse {
  success: boolean;
  order?: ESIMOrder;
  error?: string;
  paymentUrl?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
