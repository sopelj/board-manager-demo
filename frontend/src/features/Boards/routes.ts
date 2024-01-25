export default [
  {
    path: '/boards',
    component: () => import('../Global/layouts/MainLayout.vue'),
    children: [
      {
        name: 'board',
        path: ':id',
        component: () => import('./pages/BoardPage.vue'),
      },
    ],
  },
];
