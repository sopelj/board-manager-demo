// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers';
import type { ClientApplication } from '../../client';
import type { Board, BoardData, BoardPatch, BoardQuery, BoardService } from './boards.class';

export type { Board, BoardData, BoardPatch, BoardQuery };

export type BoardClientService = Pick<BoardService<Params<BoardQuery>>, (typeof boardMethods)[number]>;

export const boardPath = 'boards';

export const boardMethods = ['find', 'get', 'create', 'patch', 'remove'] as const;

export const boardClient = (client: ClientApplication) => {
  const connection = client.get('connection');

  client.use(boardPath, connection.service(boardPath), {
    methods: boardMethods,
  });
};

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [boardPath]: BoardClientService;
  }
}
