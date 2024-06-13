import { defineStore } from 'pinia';
import type { User } from '../types';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: <User | undefined>undefined,
    users: new Map([
      [
        '9d4dd4b8-47f9-4cfd-98f4-bba4fc27f545',
        {
          id: '9d4dd4b8-47f9-4cfd-98f4-bba4fc27f545',
          username: 'demo',
          displayName: 'Demo User',
          email: 'demo@example.com',
        },
      ],
      [
        'a41c6b62-54e5-4463-a4df-4b8b5eb8f50c',
        {
          id: 'a41c6b62-54e5-4463-a4df-4b8b5eb8f50c',
          username: 'demo2',
          displayName: 'Another Demo User',
          email: 'demo-2@example.com',
        },
      ],
    ]) as Map<string, User>,
  }),
  getters: {
    isAuthenticated: (state) => typeof state.user !== 'undefined',
    getUserByUsername: (state) => {
      return (username: string): User | undefined =>
        [...state.users.values()].find((val) => val.username === username);
    },
  },
});
