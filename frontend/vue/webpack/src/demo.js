import Vue from 'vue';
import Demos from './Demos.vue';
import Toasted from 'vue-toasted';

console.log('init');
Vue.use(Toasted);

new Vue({
  el: '#app',
  template: '<Demos/>',
  components: {
    Demos,
  }
})

