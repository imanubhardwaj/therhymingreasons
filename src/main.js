import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './firebase'
import './vuetify'
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false

Vue.use(VueAnalytics, {
  id: 'UA-143023853-1',
  router,
  autoTracking: {
    screenview: true
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
