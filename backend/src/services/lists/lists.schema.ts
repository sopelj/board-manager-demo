// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema';
import { Type, getValidator, querySyntax } from '@feathersjs/typebox';
import { ObjectIdSchema } from '@feathersjs/typebox';
import type { Static } from '@feathersjs/typebox';

import type { HookContext } from '../../declarations';
import { dataValidator, queryValidator } from '../../validators';
import type { ListService } from './lists.class';

// Main data model schema
export const listSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    name: Type.String({ minLength: 1 }),
    color: Type.String({ pattern: '#[a-f0-9]{6}' }),
    boardId: Type.String(),
    ownerId: Type.String(),
    created: Type.Number(),
  },
  { $id: 'List', additionalProperties: false },
);

export type List = Static<typeof listSchema>;
export const listValidator = getValidator(listSchema, dataValidator);
export const listResolver = resolve<List, HookContext<ListService>>({});

export const listExternalResolver = resolve<List, HookContext<ListService>>({});

// Schema for creating new entries
export const listDataSchema = Type.Pick(listSchema, ['name', 'color', 'boardId'], {
  $id: 'ListData',
});
export type ListData = Static<typeof listDataSchema>;
export const listDataValidator = getValidator(listDataSchema, dataValidator);
export const listDataResolver = resolve<List, HookContext<ListService>>({
  ownerId: async (_value, _list, context) => {
    // Associate the record with the id of the authenticated user
    // return context.params.user.id;
    return '9d4dd4b8-47f9-4cfd-98f4-bba4fc27f545'; // Test user ID from auth
  },
  created: async () => {
    return Date.now();
  },
});

// Schema for updating existing entries
export const listPatchSchema = Type.Partial(listSchema, {
  $id: 'ListPatch',
});
export type ListPatch = Static<typeof listPatchSchema>;
export const listPatchValidator = getValidator(listPatchSchema, dataValidator);
export const listPatchResolver = resolve<List, HookContext<ListService>>({});

// Schema for allowed query properties
export const listQueryProperties = Type.Pick(listSchema, ['_id', 'name', 'boardId', 'ownerId', 'created']);
export const listQuerySchema = Type.Intersect(
  [
    querySyntax(listQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false }),
  ],
  { additionalProperties: false },
);
export type ListQuery = Static<typeof listQuerySchema>;
export const listQueryValidator = getValidator(listQuerySchema, queryValidator);
export const listQueryResolver = resolve<ListQuery, HookContext<ListService>>({});
