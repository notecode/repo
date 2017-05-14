import Vue from 'vue';
import Demos from './Demos.vue';
import Toasted from 'vue-toasted';
import modal from './../vendor/vue-js-modal/index.js';
import vapi from './lib/vue-api'
import BootstrapVue from 'bootstrap-vue';

//import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'reset-css/reset.css'

Vue.use(BootstrapVue);
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

