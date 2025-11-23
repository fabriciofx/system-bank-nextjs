import { clearAuthTokens, setAuthTokens } from '../actions/authAction';
import type { AuthTokens } from '../models/Auth';
import type { Credentials } from '../models/Credentials';
import api from './api';

export async function login(credentials: Credentials): Promise<boolean> {
  try {
    const response = await api.post<AuthTokens>('/token/', credentials);
    if (response.data.access) {
      setAuthTokens({
        access: response.data.access,
        refresh: response.data.refresh
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    throw error;
  }
}

export async function logout(): Promise<void> {
  clearAuthTokens();
}
