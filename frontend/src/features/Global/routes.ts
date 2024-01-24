export default [
  {
    path: '/',
    component: () => import('../Global/layouts/MainLayout.vue'),
    children: [
      {
        name: 'index',
        path: '',
        component: () => import('./pages/IndexPage.vue'),
      },
    ],
  },
];
