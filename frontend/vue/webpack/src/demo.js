import Vue from 'vue';
import Demos from './Demos.vue';
import Toasted from 'vue-toasted';
import vmodal from 'vue-js-modal'

Vue.use(Toasted);
Vue.use(vmodal)

new Vue({
  el: '#app',
  template: '<Demos/>',
  components: {
    Demos,
  }
})

