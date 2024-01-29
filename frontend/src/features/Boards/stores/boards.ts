import type { Board } from '../types';
import { defineStore } from 'pinia';
import { useUserStore } from '@/features/Auth/stores/user';

export const defaultBackgroundUrl =
  'https://images.unsplash.com/photo-1544604860-206456f08229?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80';

export const useBoardStore = defineStore('boards', {
  state: () => ({
    boards: <Board[]>[
      {
        id: 1,
        name: 'My board',
        backgroundUrl: defaultBackgroundUrl,
        ownerId: 2,
        created: new Date(2023, 4, 1),
      },
      {
        id: 2,
        name: 'Another board',
        backgroundUrl: defaultBackgroundUrl,
        ownerId: 1,
        created: new Date(2024, 0, 5),
      },
    ],
  }),
  getters: {
    getBoardById({ boards }): (id: number) => Board | undefined {
      return (id: number) => boards.find((b) => b.id === id);
    },
    highestBoardId({ boards }): number {
      return Math.max(...boards.map((b) => b.id));
    },
  },
  actions: {
    addBoard(name: string, backgroundUrl: string): Board {
      const userStore = useUserStore();
      if (!userStore.user) {
        throw Error('User must be logged in.');
      }
      const newBoard = {
        name,
        backgroundUrl,
        id: this.highestBoardId + 1,
        ownerId: userStore.user.id,
        created: new Date(),
      };
      this.boards.push(newBoard);
      return newBoard;
    },
  },
});
