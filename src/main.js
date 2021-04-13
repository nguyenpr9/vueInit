import Vue from 'vue'
import router from '@router'
import store from '@state/store'
import BootstrapVue from 'bootstrap-vue'
import vco from 'v-click-outside'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import App from './app.vue'
import i18n from './i18n.js'
import './validators/index'
Vue.component('VObserver', ValidationObserver)
Vue.component('VProvider', ValidationProvider)

Vue.use(vco)
Vue.use(BootstrapVue)
// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'

// If running inside Cypress...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Ensure tests fail when Vue emits an error.
  Vue.config.errorHandler = window.Cypress.cy.onUncaughtException
}

const app = new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app')

// If running e2e tests...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Attach the app to the window, which can be useful
  // for manually setting state in Cypress commands
  // such as `cy.logIn()`.
  window.__app__ = app
}
