import type { HookContext } from '../../declarations';

export const afterListRemove = async (context: HookContext) => {
  if (context.id !== undefined) {
    await context.app.service('cards').remove(null, { query: { listId: context.id.toString() } });
  }
};
