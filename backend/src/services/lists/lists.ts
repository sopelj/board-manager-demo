// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema';

import {
  listDataValidator,
  listPatchValidator,
  listQueryValidator,
  listResolver,
  listExternalResolver,
  listDataResolver,
  listPatchResolver,
  listQueryResolver,
} from './lists.schema';

import type { Application } from '../../declarations';
import { ListService, getOptions } from './lists.class';
import { listPath, listMethods } from './lists.shared';
import { afterListRemove } from './lists.hooks';

export * from './lists.class';
export * from './lists.schema';

// A configure function that registers the service and its hooks via `app.configure`
export const list = (app: Application) => {
  // Register our service on the Feathers application
  app.use(listPath, new ListService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: listMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
  });
  // Initialize hooks
  app.service(listPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(listExternalResolver), schemaHooks.resolveResult(listResolver)],
    },
    before: {
      all: [schemaHooks.validateQuery(listQueryValidator), schemaHooks.resolveQuery(listQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(listDataValidator), schemaHooks.resolveData(listDataResolver)],
      patch: [schemaHooks.validateData(listPatchValidator), schemaHooks.resolveData(listPatchResolver)],
      remove: [],
    },
    after: {
      all: [],
      remove: [afterListRemove],
    },
    error: {
      all: [],
    },
  });
};

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [listPath]: ListService;
  }
}
