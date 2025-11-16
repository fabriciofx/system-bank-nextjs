'use client';

import { create } from 'zustand';
import type { AuthTokens } from '../models/Auth';

type Actions = {
  setAccess: (token: string) => void;
  setRefresh: (token: string) => void;
};

type AuthStore = AuthTokens & Actions;

export const useAuthStore = create<AuthStore>((set) => ({
  access: '',
  refresh: '',
  setAccess: (token: string) => {
    console.log('access: ', token);
    set({ access: token });
  },
  setRefresh: (token: string) => {
    console.log('access: ', token);
    set({ refresh: token });
  }
}));
