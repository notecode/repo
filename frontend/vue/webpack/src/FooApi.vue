<template>
  <ul>
    <li v-for="item in prov">{{item.name}}</li>
  </ul>
</template>

<script>
import Vue from 'vue'
import api from './lib/api'

export default {
  data: function() {
    return {
      prov: []
    }
  },

  created () {
    // 以下三种用法等效
    // Vue.api.get();
    // this.$api.get();
    // api.get();

    var _this = this;
    api.get('region/get_region', {
      succ: function(json) {
        _this.prov = json.province;
      }
    });

    var data = {
      userName: 'test4',
      password: '123456'
    };
    api.post('user/login', data, {
      succ: function(json) {
      }
    });

    api.get_q('region/get_region', {foo: 'bar'}, {
      succ: function(json) {
      }
    })
  }
}
</script>

<style lang="scss" scoped>
li {
  list-style: none;
}
</style>
