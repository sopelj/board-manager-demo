// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema';
import { Type, getValidator, querySyntax } from '@feathersjs/typebox';
import { ObjectIdSchema } from '@feathersjs/typebox';
import type { Static } from '@feathersjs/typebox';

import type { HookContext } from '../../declarations';
import { dataValidator, queryValidator } from '../../validators';
import type { BoardService } from './boards.class';
import { userSchema } from '../users/users.schema';

// Main data model schema
export const boardSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    name: Type.String({ minLength: 1 }),
    backgroundUrl: Type.String({ minLength: 1 }),
    ownerId: Type.String(),
    owner: Type.Ref(userSchema),
    created: Type.Number(),
  },
  { $id: 'Board', additionalProperties: false },
);
export type Board = Static<typeof boardSchema>;
export const boardValidator = getValidator(boardSchema, dataValidator);
export const boardResolver = resolve<Board, HookContext<BoardService>>({
  owner: virtual(async (board, context) => {
    return context.app.service('users').get(board.ownerId);
  }),
});

export const boardExternalResolver = resolve<Board, HookContext<BoardService>>({});

// Schema for creating new entries
export const boardDataSchema = Type.Pick(boardSchema, ['name', 'backgroundUrl'], {
  $id: 'BoardData',
});
export type BoardData = Static<typeof boardDataSchema>;
export const boardDataValidator = getValidator(boardDataSchema, dataValidator);
export const boardDataResolver = resolve<Board, HookContext<BoardService>>({
  ownerId: async (_value, _board, context) => {
    // Associate the record with the id of the authenticated user
    return context.params.user._id;
  },
  created: async () => {
    return Date.now();
  },
});

// Schema for updating existing entries
export const boardPatchSchema = Type.Partial(boardSchema, {
  $id: 'BoardPatch',
});
export type BoardPatch = Static<typeof boardPatchSchema>;
export const boardPatchValidator = getValidator(boardPatchSchema, dataValidator);
export const boardPatchResolver = resolve<Board, HookContext<BoardService>>({});

// Schema for allowed query properties
export const boardQueryProperties = Type.Pick(boardSchema, ['_id', 'name', 'ownerId', 'created']);
export const boardQuerySchema = Type.Intersect(
  [
    querySyntax(boardQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false }),
  ],
  { additionalProperties: false },
);
export type BoardQuery = Static<typeof boardQuerySchema>;
export const boardQueryValidator = getValidator(boardQuerySchema, queryValidator);
export const boardQueryResolver = resolve<BoardQuery, HookContext<BoardService>>({});
