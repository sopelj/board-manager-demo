// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema';

import {
  boardDataValidator,
  boardPatchValidator,
  boardQueryValidator,
  boardResolver,
  boardExternalResolver,
  boardDataResolver,
  boardPatchResolver,
  boardQueryResolver,
} from './boards.schema';

import type { Application } from '../../declarations';
import { BoardService, getOptions } from './boards.class';
import { boardPath, boardMethods } from './boards.shared';
import { afterBoardRemove } from './boards.hooks';

export * from './boards.class';
export * from './boards.schema';

// A configure function that registers the service and its hooks via `app.configure`
export const board = (app: Application) => {
  // Register our service on the Feathers application
  app.use(boardPath, new BoardService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: boardMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
  });
  // Initialize hooks
  app.service(boardPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(boardExternalResolver), schemaHooks.resolveResult(boardResolver)],
    },
    before: {
      all: [schemaHooks.validateQuery(boardQueryValidator), schemaHooks.resolveQuery(boardQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(boardDataValidator), schemaHooks.resolveData(boardDataResolver)],
      patch: [schemaHooks.validateData(boardPatchValidator), schemaHooks.resolveData(boardPatchResolver)],
      remove: [],
    },
    after: {
      all: [],
      remove: [afterBoardRemove],
    },
    error: {
      all: [],
    },
  });
};

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [boardPath]: BoardService;
  }
}
