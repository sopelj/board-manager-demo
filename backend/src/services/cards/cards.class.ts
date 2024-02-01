// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers';
import { MongoDBService } from '@feathersjs/mongodb';
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb';

import type { Application } from '../../declarations';
import type { Card, CardData, CardPatch, CardQuery } from './cards.schema';

export type { Card, CardData, CardPatch, CardQuery };

export interface CardParams extends MongoDBAdapterParams<CardQuery> {}

// By default, calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class CardService<ServiceParams extends Params = CardParams> extends MongoDBService<
  Card,
  CardData,
  CardParams,
  CardPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    multi: ['remove'],
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('cards')),
  };
};
