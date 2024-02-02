import type { HookContext } from '../../declarations';

export const afterListRemove = async (context: HookContext) => {
  if (context.result?._id) {
    await context.app.service('cards').remove(null, { query: { listId: context.result._id.toString() } });
  }
};
