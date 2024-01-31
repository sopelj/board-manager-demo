export default [
  {
    path: '/auth',
    component: () => import('../Global/layouts/MainLayout.vue'),
    children: [
      {
        name: 'auth-login',
        path: '/login',
        component: () => import('./components/LoginPage.vue'),
      },
      {
        name: 'auth-signup',
        path: '/signup',
        component: () => import('./components/SignupPage.vue'),
      },
    ],
  },
];
