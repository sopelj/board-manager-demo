// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema';
import { Type, getValidator, querySyntax } from '@feathersjs/typebox';
import { ObjectIdSchema } from '@feathersjs/typebox';
import type { Static } from '@feathersjs/typebox';

import type { HookContext } from '../../declarations';
import { dataValidator, queryValidator } from '../../validators';
import type { CardService } from './cards.class';
import { listSchema } from '../lists/lists.schema';

// Main data model schema
export const cardSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    content: Type.String(),
    listId: Type.String(),
  },
  { $id: 'Card', additionalProperties: false },
);
export type Card = Static<typeof cardSchema>;
export const cardValidator = getValidator(cardSchema, dataValidator);
export const cardResolver = resolve<Card, HookContext<CardService>>({});

export const cardExternalResolver = resolve<Card, HookContext<CardService>>({});

// Schema for creating new entries
export const cardDataSchema = Type.Pick(cardSchema, ['content', 'listId'], {
  $id: 'CardData',
});
export type CardData = Static<typeof cardDataSchema>;
export const cardDataValidator = getValidator(cardDataSchema, dataValidator);
export const cardDataResolver = resolve<Card, HookContext<CardService>>({});

// Schema for updating existing entries
export const cardPatchSchema = Type.Partial(cardSchema, {
  $id: 'CardPatch',
});
export type CardPatch = Static<typeof cardPatchSchema>;
export const cardPatchValidator = getValidator(cardPatchSchema, dataValidator);
export const cardPatchResolver = resolve<Card, HookContext<CardService>>({});

// Schema for allowed query properties
export const cardQueryProperties = Type.Pick(cardSchema, ['_id', 'content', 'listId']);
export const cardQuerySchema = Type.Intersect(
  [
    querySyntax(cardQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false }),
  ],
  { additionalProperties: false },
);
export type CardQuery = Static<typeof cardQuerySchema>;
export const cardQueryValidator = getValidator(cardQuerySchema, queryValidator);
export const cardQueryResolver = resolve<CardQuery, HookContext<CardService>>({});
