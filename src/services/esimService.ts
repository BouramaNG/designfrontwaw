/**
 * Service eSIM - Gestion des packages et destinations
 * Basé sur wawTelecom/src/app/services/esim.service.ts
 * Backend: https://esimwawtelecom.com/wawapi/api/
 */

import apiClient from './api';

export interface ESimPackage {
  id: number;
  country_code: string;
  country_name: string;
  continent: string;
  data_amount: number;
  validity_days: number;
  price: number;
  currency: string;
  operator?: string;
  network_type?: string;
  features?: string[];
  is_active: boolean;
  stock_available?: number;
  flag_url?: string;
}

export interface Destination {
  id: number;
  nom: string;
  code: string;
  drapeau: string;
  continent: string;
}

class ESimService {
  /**
   * Liste tous les packages eSIM disponibles
   * Route publique - pas besoin d'authentification
   * Endpoint: GET /esim-packages
   */
  async listEsimPackages(): Promise<ESimPackage[]> {
    try {
      const response = await apiClient.get<any>('/esim-packages');

      // L'API peut retourner directement un tableau ou un objet avec data
      if (Array.isArray(response)) {
        return response;
      }

      if (response.data && Array.isArray(response.data)) {
        return response.data;
      }

      if (response.packages && Array.isArray(response.packages)) {
        return response.packages;
      }

      return [];
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des packages eSIM:', error);
      return [];
    }
  }

  /**
   * Récupère les packages d'un pays spécifique avec prix
   * Endpoint: GET /esim-packages/{countryCode}/with-price
   */
  async getPackagesWithPrice(countryCode: string): Promise<ESimPackage[]> {
    try {
      const response = await apiClient.get<any>(`/esim-packages/${countryCode}/with-price`);

      if (response.packages && Array.isArray(response.packages)) {
        return response.packages;
      }

      if (response.data?.packages && Array.isArray(response.data.packages)) {
        return response.data.packages;
      }

      if (Array.isArray(response)) {
        return response;
      }

      if (response.data && Array.isArray(response.data)) {
        return response.data;
      }

      return [];
    } catch (error) {
      console.error(`❌ Erreur packages pour ${countryCode}:`, error);
      return [];
    }
  }

  /**
   * Récupère les détails d'un package spécifique
   * Endpoint: GET /esim-packages/{id}
   */
  async getPackageById(packageId: number): Promise<ESimPackage | null> {
    try {
      const response = await apiClient.get<any>(`/esim-packages/${packageId}`);

      if (response.data) {
        return response.data;
      }

      return response;
    } catch (error) {
      console.error(`❌ Erreur package #${packageId}:`, error);
      return null;
    }
  }

  /**
   * Récupère les destinations disponibles
   * Endpoint: GET /esim-purchase/destinations
   */
  async getAvailableDestinations(): Promise<Destination[]> {
    try {
      const response = await apiClient.get<any>('/esim-purchase/destinations');

      if (Array.isArray(response)) {
        return response;
      }

      if (response.data && Array.isArray(response.data)) {
        return response.data;
      }

      if (response.destinations && Array.isArray(response.destinations)) {
        return response.destinations;
      }

      return [];
    } catch (error) {
      console.error('❌ Erreur destinations:', error);
      // Retourner les destinations par défaut si l'API échoue
      return this.getDefaultDestinations();
    }
  }

  /**
   * Vérifie la disponibilité d'un package
   * Endpoint: POST /esim-purchase/check-availability
   */
  async checkAvailability(packageId: number): Promise<{
    available: boolean;
    stock?: number;
    message?: string;
  }> {
    try {
      const response = await apiClient.post<any>('/esim-purchase/check-availability', {
        package_id: packageId
      });

      return {
        available: response.available || false,
        stock: response.stock,
        message: response.message
      };
    } catch (error) {
      console.error('❌ Erreur vérification disponibilité:', error);
      return {
        available: false,
        message: 'Erreur lors de la vérification'
      };
    }
  }

  /**
   * Destinations par défaut (fallback)
   * Copiées de wawTelecom e-sim.component.ts ligne 55-200
   */
  private getDefaultDestinations(): Destination[] {
    return [
      { id: 1, nom: "France", code: "FR", drapeau: "https://flagcdn.com/w320/fr.png", continent: "Europe" },
      { id: 2, nom: "Maroc", code: "MA", drapeau: "https://flagcdn.com/w320/ma.png", continent: "Afrique" },
      { id: 3, nom: "États-Unis", code: "US", drapeau: "https://flagcdn.com/w320/us.png", continent: "Amerique du Nord" },
      { id: 4, nom: "Espagne", code: "ES", drapeau: "https://flagcdn.com/w320/es.png", continent: "Europe" },
      { id: 5, nom: "Italie", code: "IT", drapeau: "https://flagcdn.com/w320/it.png", continent: "Europe" },
      { id: 6, nom: "Allemagne", code: "DE", drapeau: "https://flagcdn.com/w320/de.png", continent: "Europe" },
      { id: 7, nom: "Royaume-Uni", code: "GB", drapeau: "https://flagcdn.com/w320/gb.png", continent: "Europe" },
      { id: 8, nom: "Canada", code: "CA", drapeau: "https://flagcdn.com/w320/ca.png", continent: "Amerique du Nord" },
      { id: 9, nom: "Arabie Saoudite", code: "SA", drapeau: "https://flagcdn.com/w320/sa.png", continent: "Asie" },
      { id: 10, nom: "Turquie", code: "TR", drapeau: "https://flagcdn.com/w320/tr.png", continent: "Europe" },
      { id: 11, nom: "Émirats Arabes Unis", code: "AE", drapeau: "https://flagcdn.com/w320/ae.png", continent: "Asie" },
      { id: 12, nom: "Sénégal", code: "SN", drapeau: "https://flagcdn.com/w320/sn.png", continent: "Afrique" },
      { id: 13, nom: "Côte d'Ivoire", code: "CI", drapeau: "https://flagcdn.com/w320/ci.png", continent: "Afrique" },
      { id: 14, nom: "Japon", code: "JP", drapeau: "https://flagcdn.com/w320/jp.png", continent: "Asie" },
      { id: 15, nom: "Chine", code: "CN", drapeau: "https://flagcdn.com/w320/cn.png", continent: "Asie" },
      { id: 16, nom: "Brésil", code: "BR", drapeau: "https://flagcdn.com/w320/br.png", continent: "Amerique du Sud" },
      { id: 17, nom: "Inde", code: "IN", drapeau: "https://flagcdn.com/w320/in.png", continent: "Asie" },
      { id: 18, nom: "Australie", code: "AU", drapeau: "https://flagcdn.com/w320/au.png", continent: "Oceanie" },
      { id: 19, nom: "Mexique", code: "MX", drapeau: "https://flagcdn.com/w320/mx.png", continent: "Amerique du Nord" },
      { id: 20, nom: "Thaïlande", code: "TH", drapeau: "https://flagcdn.com/w320/th.png", continent: "Asie" }
    ];
  }
}

// Instance singleton
export const esimService = new ESimService();
export default esimService;
