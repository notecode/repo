<template>
  <div>
    <h1>demos</h1>
    <button @click="showToast">Toast</button>
    <button @click="showError">Error Toast</button>
    <button @click="showModal">Show Modal</button>
    <foo />
    <fooApi />
  </div>
</template>

<script>

import Vue from 'vue';
import foo from './FooModal.vue';
import fooApi from './FooApi.vue';

export default {
  created: function() {
  },
  components: {
    foo,
    fooApi,
  },
  methods: {
    showToast: function() {
      this.$toasted.show('hello billo', {duration: 1000});
    },
    showError: function() {
      Vue.toasted.error('error', {duration: 1000});
    },
    showModal: function() {
      this.$modal.show('hello');
    }
  }
}
</script>

<style scoped>
</style>
