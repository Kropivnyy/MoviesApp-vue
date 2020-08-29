import Vue from 'vue';
import VueRouter from 'vue-router';
import LSHelper from '../utils/LSHelper';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "home-view" */ '../views/Home.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: { auth: true },
    component: () =>
      import(/* webpackChunkName: "dashboard-view" */ '../views/Dashboard.vue'),
  },
  {
    path: '/movie/:movieId',
    name: 'MovieDetails',
    meta: { auth: true },
    component: () =>
      import(
        /* webpackChunkName: "movie-details-view" */ '../views/MovieDetails.vue'
      ),
  },
  {
    path: '/movie/:movieId/actor/:actorId',
    name: 'Actor',
    meta: { auth: true },
    component: () =>
      import(/* webpackChunkName: "actor-view" */ '../views/Actor.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    meta: { login: true },
    component: () =>
      import(/* webpackChunkName: "login-view" */ '../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    meta: { login: true },
    component: () =>
      import(/* webpackChunkName: "register-view" */ '../views/Register.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const user = LSHelper.getFromLS('user');
  const requireAuth = to.matched.some(route => route?.meta?.auth);
  const requireLogin = to.matched.some(route => route?.meta?.login);

  if (!user && requireAuth) {
    next('/login');
  } else if (user && requireLogin) {
    next('/');
  } else {
    next();
  }
});

export default router;
