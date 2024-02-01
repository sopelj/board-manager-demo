// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers';
import type { ClientApplication } from '../../client';
import type { Card, CardData, CardPatch, CardQuery, CardService } from './cards.class';

export type { Card, CardData, CardPatch, CardQuery };

export type CardClientService = Pick<CardService<Params<CardQuery>>, (typeof cardMethods)[number]>;

export const cardPath = 'cards';

export const cardMethods = ['find', 'get', 'create', 'patch', 'remove'] as const;

export const cardClient = (client: ClientApplication) => {
  const connection = client.get('connection');

  client.use(cardPath, connection.service(cardPath), {
    methods: cardMethods,
  });
};

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [cardPath]: CardClientService;
  }
}
