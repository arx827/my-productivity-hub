import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  user: { id: string; name: string; email: string } | null;
  isAuthenticated: boolean;
  login: (accessToken: string, user: { id: string; name: string; email: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem('accessToken'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null,
  isAuthenticated: !!localStorage.getItem('accessToken'),
  login: (accessToken, user) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(user));
    set({ accessToken, user, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    set({ accessToken: null, user: null, isAuthenticated: false });
  },
}));