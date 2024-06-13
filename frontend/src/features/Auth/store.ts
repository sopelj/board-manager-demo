import { defineStore } from 'pinia';
import { useAuth } from 'feathers-pinia';
import { useFeathers } from '@/feathers-client';

export const useAuthStore = defineStore('auth', () => {
  const { api } = useFeathers();

  const utils = useAuth({ api, servicePath: 'users' });

  utils.reAuthenticate();

  return { ...utils };
});
