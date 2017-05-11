import Vue from 'vue';
import Demos from './Demos.vue';
import Toasted from 'vue-toasted';
import modal from './../vendor/vue-js-modal/index.js';

Vue.use(Toasted);
Vue.use(modal)

new Vue({
  el: '#app',
  template: '<Demos/>',
  components: {
    Demos,
  }
})

