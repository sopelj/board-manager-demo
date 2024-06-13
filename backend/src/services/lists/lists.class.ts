// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers';
import { MongoDBService } from '@feathersjs/mongodb';
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb';

import type { Application } from '../../declarations';
import type { List, ListData, ListPatch, ListQuery } from './lists.schema';

export type { List, ListData, ListPatch, ListQuery };

export interface ListParams extends MongoDBAdapterParams<ListQuery> {}

// By default, calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class ListService<ServiceParams extends Params = ListParams> extends MongoDBService<
  List,
  ListData,
  ListParams,
  ListPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    multi: ['remove'],
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('lists')),
  };
};
