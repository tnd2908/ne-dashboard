import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types/types';

interface AuthState {
  user: User | null;
  isAuth: boolean;
  setAuth: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuth: false,
      setAuth: (user) => set({ user, isAuth: true }),
      logout: () => {
        set({ user: null, isAuth: false });
        localStorage.removeItem('user_session');
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);