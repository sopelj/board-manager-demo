import type { List } from '../types';

import { defineStore } from 'pinia';
import { uid } from 'quasar';

import { useUserStore } from '@/features/Auth/stores/user';
import { useCardStore } from '@/features/Boards/stores/cards';

export const defaultColor = '#e0e0e0';

export const useListStore = defineStore('lists', {
  state: () => ({
    lists: new Map([
      [
        'a625a033-cb6e-4e58-9335-8bc4cbd89c20',
        {
          id: 'a625a033-cb6e-4e58-9335-8bc4cbd89c20',
          name: 'My board',
          color: '#186df5',
          boardId: 'f950e33f-2cd9-48e7-bd3f-e1a0c2072466',
          ownerId: 'a41c6b62-54e5-4463-a4df-4b8b5eb8f50c',
          created: new Date(2023, 4, 1),
        },
      ],
      [
        '3daf8998-5764-4ba4-bfe2-c0ab0765b617',
        {
          id: '3daf8998-5764-4ba4-bfe2-c0ab0765b617',
          name: 'Another board',
          color: '#9e45d1',
          boardId: 'f950e33f-2cd9-48e7-bd3f-e1a0c2072466',
          ownerId: '9d4dd4b8-47f9-4cfd-98f4-bba4fc27f545',
          created: new Date(2024, 0, 5),
        },
      ],
    ]) as Map<string, List>,
  }),
  getters: {
    getListsByBoardId({ lists }): (id: string) => List[] {
      return (id: string) =>
        [...lists.values()].filter((l) => l.boardId === id);
    },
  },
  actions: {
    addList(name: string, color: string, boardId: string): List {
      const userStore = useUserStore();
      if (!userStore.user) {
        throw Error('User must be logged in.');
      }
      const newList = {
        name,
        color,
        boardId,
        id: uid(),
        ownerId: userStore.user.id,
        created: new Date(),
      };
      this.lists.set(newList.id, newList);
      return newList;
    },
    deleteList(id: string) {
      const cardStore = useCardStore();
      this.lists.delete(id);
      cardStore.deleteCardsByListId(id);
    },
  },
});
