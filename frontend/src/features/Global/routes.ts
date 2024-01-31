export default [
  {
    path: '/',
    component: () => import('./layouts/MainLayout.vue'),
    children: [
      {
        name: 'index',
        path: '',
        component: () => import('./components/IndexPage.vue'),
      },
    ],
  },
];
