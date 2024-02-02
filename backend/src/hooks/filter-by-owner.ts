// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext } from '../declarations';

export const filterByOwner = async (context: HookContext) => {
  if (context.params.user) {
    context.params.query.ownerId = context.params.user._id;
  }
};
