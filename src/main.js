import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dragAndDrop from '@/directives/drag-and-drop.directive'

Vue.config.productionTip = false

Vue.directive('dragAndDrop', dragAndDrop);

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
