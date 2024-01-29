import type { Board } from '../types';
import { uid } from 'quasar';
import { defineStore } from 'pinia';
import { useUserStore } from '@/features/Auth/stores/user';

export const defaultBackgroundUrl =
  'https://images.unsplash.com/photo-1544604860-206456f08229?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80';

export const useBoardStore = defineStore('boards', {
  state: () => ({
    boards: new Map([
      [
        'f950e33f-2cd9-48e7-bd3f-e1a0c2072466',
        {
          id: 'f950e33f-2cd9-48e7-bd3f-e1a0c2072466',
          name: 'My board',
          backgroundUrl: defaultBackgroundUrl,
          ownerId: 'a41c6b62-54e5-4463-a4df-4b8b5eb8f50c',
          created: new Date(2023, 4, 1),
        },
      ],
      [
        '2e653d6f-292c-4d3a-95f3-a104d12aabd3',
        {
          id: '2e653d6f-292c-4d3a-95f3-a104d12aabd3',
          name: 'Another board',
          backgroundUrl: defaultBackgroundUrl,
          ownerId: '9d4dd4b8-47f9-4cfd-98f4-bba4fc27f545',
          created: new Date(2024, 0, 5),
        },
      ],
    ]) as Map<string, Board>,
  }),
  actions: {
    addBoard(name: string, backgroundUrl: string): Board {
      const userStore = useUserStore();
      if (!userStore.user) {
        throw Error('User must be logged in.');
      }
      const newBoard = {
        name,
        backgroundUrl,
        id: uid(),
        ownerId: userStore.user.id,
        created: new Date(),
      };
      this.boards.set(newBoard.id, newBoard);
      return newBoard;
    },
  },
});
