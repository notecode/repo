import Vue from 'vue';
import Demos from './Demos.vue';
import Toasted from 'vue-toasted';
import modal from './../vendor/vue-js-modal/index.js';
import vapi from './lib/vue-api'
 
Vue.use(Toasted)
Vue.use(modal)
Vue.use(vapi)

new Vue({
  el: '#app',
  template: '<Demos/>',
  components: {
    Demos,
  }
})

