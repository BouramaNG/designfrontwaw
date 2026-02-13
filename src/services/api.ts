/**
 * Configuration API Base
 * Backend Laravel partagé : https://esimwawtelecom.com/wawapi/api/
 * Utilisé par : wawTelecom, wawTravel, waw-admin-dashboard, wawtelecom_refonte
 */

import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

// URL de base de l'API
export const API_BASE_URL = 'https://esimwawtelecom.com/wawapi/api';

// Instance Axios configurée
class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Intercepteur pour ajouter le token JWT
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Intercepteur de réponse pour gérer les erreurs
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expiré ou invalide
          this.clearToken();
          // Rediriger vers login si nécessaire
          // window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Récupérer le token JWT du localStorage
  private getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Sauvegarder le token
  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  // Supprimer le token
  clearToken(): void {
    localStorage.removeItem('auth_token');
  }

  // Méthodes HTTP
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  // Instance axios brute pour cas spéciaux
  getAxiosInstance(): AxiosInstance {
    return this.client;
  }
}

// Instance singleton
export const apiClient = new ApiClient();
export default apiClient;
