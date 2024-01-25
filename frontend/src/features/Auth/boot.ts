import { boot } from 'quasar/wrappers';
import { useUserStore } from './stores/user';

export default boot(async ({ router }) => {
  /**
   * Check for authentication before each route.
   */
  router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    if (
      !userStore.isAuthenticated &&
      to.name !== 'index' &&
      to.name !== 'auth-login' &&
      to.name !== 'auth-signup'
    ) {
      return next({
        name: 'auth-login',
        query: { next: to.fullPath },
      });
    }
    return next();
  });
});
