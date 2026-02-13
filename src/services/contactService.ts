/**
 * Service de contact - Appel API public-contact (backend waw1/waw)
 * Même contrat que wawTelecom Angular.
 */

import { apiClient } from './api';

export type ContactType = 'sales' | 'support' | 'general';

export interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  company?: string;
  contact_type: ContactType;
  service?: string;
  message: string;
  source_page?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data?: {
    id: number;
    contact_type: string;
    created_at: string;
  };
  errors?: Record<string, string[]>;
}

const PUBLIC_CONTACT_URL = 'public-contact';

/**
 * Envoyer une demande de contact (sans auth).
 * Backend: POST /api/public-contact
 */
export async function sendPublicContact(data: ContactRequest): Promise<ContactResponse> {
  const response = await apiClient.post<ContactResponse>(PUBLIC_CONTACT_URL, data);
  return response;
}
