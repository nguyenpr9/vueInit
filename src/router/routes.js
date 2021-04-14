import store from '@state/store'
import { AuthService } from '@services/auth.service'
export default [
  {
    path: '/',
    name: 'home',
    meta: {
      authRequired: true,
    },
    component: () => lazyLoadView(import('@views/home.vue')),
  },
  {
    path: '/login',
    name: 'login',
    component: () => lazyLoadView(import('@views/login.vue')),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'home' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => lazyLoadView(import('@views/profile.vue')),
    meta: {
      authRequired: true,
      tmp: {},
      beforeResolve(routeTo, routeFrom, next) {
        AuthService.getMe()
          .then((user) => {
            routeTo.meta.tmp.user = user
            next()
          })
          .catch(() => {
            next({ name: '404', params: { resource: 'User' } })
          })
      },
    },
    props: (route) => ({ user: route.meta.tmp.user }),
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        store.dispatch('auth/logOut').then(() => next({ name: 'login' }))
      },
    },
  },
  {
    path: '/404',
    name: '404',
    component: require('@views/_404.vue').default,
    props: true,
  },
  {
    path: '*',
    redirect: '404',
  },
]
function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    loading: require('@views/_loading.vue').default,
    delay: 200,
  })

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children)
    },
  })
}
