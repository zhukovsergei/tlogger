import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  login: () => set({ isAuthenticated: true }),
  logout: () => {
    localStorage.removeItem('token');
    set({ isAuthenticated: false });
  },
  checkAuth: () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    set({ isAuthenticated: !!token });
  },
})); 