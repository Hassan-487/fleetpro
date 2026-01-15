import apiClient, { setToken, removeToken, getToken } from './apiClient';
import { AUTH_API } from '@/api/auth.api';

// Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface LoginResponse {
  user: AuthUser;
  token: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

// Auth Service
export const authService = {
  /**
   * Login with email and password
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // TODO: Replace with real API when backend is ready
    // PENDING BACKEND - Currently using mock response
    
    // Mock validation for demo
    if (credentials.email === 'admin@demo.com' && credentials.password === 'admin123') {
      const mockResponse: LoginResponse = {
        user: {
          id: '1',
          email: credentials.email,
          name: 'John Administrator',
          role: 'admin',
        },
        token: 'mock_jwt_token_' + Date.now(),
      };
      setToken(mockResponse.token);
      return mockResponse;
    }
    
    // When backend is ready, use this:
    // const response = await apiClient.post<LoginResponse>(AUTH_API.LOGIN, credentials);
    // setToken(response.data.token);
    // return response.data;
    
    throw new Error('Invalid credentials');
  },

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    try {
      // TODO: Call backend logout endpoint when ready
      // await apiClient.post(AUTH_API.LOGOUT);
    } finally {
      removeToken();
    }
  },

  /**
   * Get current user profile
   */
  async getProfile(): Promise<AuthUser> {
    // TODO: Replace with real API when backend is ready
    // PENDING BACKEND - Currently using mock response
    
    const token = getToken();
    if (token) {
      return {
        id: '1',
        email: 'admin@demo.com',
        name: 'John Administrator',
        role: 'admin',
      };
    }
    
    // When backend is ready, use this:
    // const response = await apiClient.get<AuthUser>(AUTH_API.PROFILE);
    // return response.data;
    
    throw new Error('Not authenticated');
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!getToken();
  },

  /**
   * Register new user
   */
  async register(data: RegisterData): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(AUTH_API.REGISTER, data);
    setToken(response.data.token);
    return response.data;
  },

  /**
   * Request password reset
   */
  async forgotPassword(email: string): Promise<void> {
    await apiClient.post(AUTH_API.FORGOT_PASSWORD, { email });
  },

  /**
   * Reset password with token
   */
  async resetPassword(token: string, password: string): Promise<void> {
    await apiClient.post(AUTH_API.RESET_PASSWORD, { token, password });
  },
};
