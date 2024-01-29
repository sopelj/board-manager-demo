import { defineStore } from 'pinia';
import { useUserStore } from '@/features/Auth/stores/user';
import { List } from '../types';
import { useCardStore } from '@/features/Boards/stores/cards';

export const defaultColor = '#e0e0e0';

export const useListStore = defineStore('lists', {
  state: () => ({
    lists: new Map([
      [
        1,
        {
          id: 1,
          name: 'My board',
          color: '#186df5',
          boardId: 1,
          ownerId: 2,
          created: new Date(2023, 4, 1),
        },
      ],
      [
        2,
        {
          id: 2,
          name: 'Another board',
          color: '#9e45d1',
          boardId: 1,
          ownerId: 1,
          created: new Date(2024, 0, 5),
        },
      ],
    ]) as Map<number, List>,
  }),
  getters: {
    getListsByBoardId({ lists }): (id: number) => List[] {
      return (id: number) =>
        [...lists.values()].filter((l) => l.boardId === id);
    },
    highestListId({ lists }): number {
      return Math.max(...lists.keys());
    },
  },
  actions: {
    addList(name: string, color: string, boardId: number): List {
      const userStore = useUserStore();
      if (!userStore.user) {
        throw Error('User must be logged in.');
      }
      const newList = {
        name,
        color,
        boardId,
        id: this.highestListId + 1,
        ownerId: userStore.user.id,
        created: new Date(),
      };
      this.lists.set(newList.id, newList);
      return newList;
    },
    deleteList(id: number) {
      const cardStore = useCardStore();
      this.lists.delete(id);
      cardStore.deleteCardsByListId(id);
    },
  },
});
