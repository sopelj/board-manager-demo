import type { HookContext } from '../../declarations';

export const afterBoardRemove = async (context: HookContext) => {
  if (context.id !== undefined) {
    await context.app.service('lists').remove(null, { query: { boardId: context.id.toString() } });
  }
};
