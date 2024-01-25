import { defineStore } from 'pinia';
import type { User } from '../types';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: <User | undefined>undefined,
    users: <{ [key: number]: User }>{
      1: {
        id: 1,
        username: 'demo',
        displayName: 'Demo User',
        email: 'demo@example.com',
      },
      2: {
        id: 1,
        username: 'demo2',
        displayName: 'Another Demo User',
        email: 'demo-2@example.com',
      },
    },
  }),
  getters: {
    isAuthenticated: (state) => typeof state.user !== 'undefined',
    getUserById: (state) => {
      return (id: number): User | undefined => state.users[id];
    },
    getUserByUsername: (state) => {
      return (username: string): User | undefined =>
        Object.values(state.users).find((val) => val.username === username);
    },
  },
});
