import api from './api'

export default {
  install: function(Vue, opt) {
    Vue.api = api;
    Vue.prototype.$api = api;
  },
}
