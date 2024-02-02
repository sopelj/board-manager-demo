// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema';

import {
  cardDataValidator,
  cardPatchValidator,
  cardQueryValidator,
  cardResolver,
  cardExternalResolver,
  cardDataResolver,
  cardPatchResolver,
  cardQueryResolver,
} from './cards.schema';

import type { Application } from '../../declarations';
import { CardService, getOptions } from './cards.class';
import { cardPath, cardMethods } from './cards.shared';

export * from './cards.class';
export * from './cards.schema';

// A configure function that registers the service and its hooks via `app.configure`
export const card = (app: Application) => {
  // Register our service on the Feathers application
  app.use(cardPath, new CardService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: cardMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
  });
  // Initialize hooks
  app.service(cardPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(cardExternalResolver), schemaHooks.resolveResult(cardResolver)],
    },
    before: {
      all: [schemaHooks.validateQuery(cardQueryValidator), schemaHooks.resolveQuery(cardQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(cardDataValidator), schemaHooks.resolveData(cardDataResolver)],
      patch: [schemaHooks.validateData(cardPatchValidator), schemaHooks.resolveData(cardPatchResolver)],
      remove: [],
    },
    after: {
      all: [],
    },
    error: {
      all: [],
    },
  });
};

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [cardPath]: CardService;
  }
}
