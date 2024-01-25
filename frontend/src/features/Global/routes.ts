export default [
  {
    path: '/',
    component: () => import('../Global/layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('./pages/IndexPage.vue') }],
  },
];
