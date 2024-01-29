import { defineStore } from 'pinia';
import { Card } from '../types';
import { uid } from 'quasar';

export const useCardStore = defineStore('cards', {
  state: () => ({
    cards: new Map([
      [
        '0e539885-2961-47ad-bf63-3b26476397fd',
        {
          id: '0e539885-2961-47ad-bf63-3b26476397fd',
          listId: 'a625a033-cb6e-4e58-9335-8bc4cbd89c20',
          content: 'My Card',
        },
      ],
      [
        '021511fa-cdf0-46c0-9eb3-453384b0892c',
        {
          id: '021511fa-cdf0-46c0-9eb3-453384b0892c',
          listId: 'a625a033-cb6e-4e58-9335-8bc4cbd89c20',
          content: 'Another card',
        },
      ],
    ]) as Map<string, Card>,
  }),
  getters: {
    getCardsByListId({ cards }): (id: string) => Card[] {
      return (id: string) => [...cards.values()].filter((l) => l.listId === id);
    },
  },
  actions: {
    addCard(content: string, listId: string): Card {
      const newCard = {
        content,
        listId,
        id: uid(),
      };
      this.cards.set(newCard.id, newCard);
      return newCard;
    },
    deleteCardsByListId(listId: string) {
      this.$patch({
        cards: new Map([...this.cards].filter((m) => m[1].listId !== listId)),
      });
    },
  },
});
