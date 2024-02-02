import type { HookContext } from '../../declarations';

export const afterBoardRemove = async (context: HookContext) => {
  if (context.result?._id) {
    await context.app.service('lists').remove(null, { query: { boardId: context.result._id.toString() } });
  }
};
