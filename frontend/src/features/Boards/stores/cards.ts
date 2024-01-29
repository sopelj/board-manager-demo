import { defineStore } from 'pinia';
import { Card } from '../types';

export const useCardStore = defineStore('cards', {
  state: () => ({
    cards: new Map([
      [
        1,
        {
          id: 1,
          listId: 1,
          content: 'My Card',
        },
      ],
      [
        2,
        {
          id: 2,
          listId: 1,
          content: 'Another card',
        },
      ],
    ]) as Map<number, Card>,
  }),
  getters: {
    getCardsByListId({ cards }): (id: number) => Card[] | undefined {
      return (id: number) => [...cards.values()].filter((l) => l.listId === id);
    },
    highestCardId({ cards }): number {
      return Math.max(...cards.keys());
    },
  },
  actions: {
    addCard(content: string, listId: number): Card {
      const cardId = this.highestCardId + 1;
      const newCard = {
        content,
        listId,
        id: cardId,
      };
      this.cards.set(cardId, newCard);
      return newCard;
    },
    deleteCardsByListId(listId: number) {
      this.$patch({
        cards: new Map([...this.cards].filter((m) => m[1].listId !== listId)),
      });
    },
  },
});
