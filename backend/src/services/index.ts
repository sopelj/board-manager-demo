import { user } from './users/users';
import { card } from './cards/cards';
import { list } from './lists/lists';
import { board } from './boards/boards';
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations';

export const services = (app: Application) => {
  app.configure(user);
  app.configure(card);
  app.configure(list);
  app.configure(board);
};
