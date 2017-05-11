<template>
  <div>
    <h1>demos</h1>
    <button @click="showToast">Toast</button>
    <button @click="showError">Error Toast</button>
    <button @click="showModal">Show Modal</button>
    <foo />
  </div>
</template>

<script>

import foo from './FooModal.vue';

export default {
  created: function() {
  },
  components: {
    foo
  },
  methods: {
    showToast: function() {
      this.$toasted.show('hello billo', {duration: 1000});
    },
    showError: function() {
      this.$toasted.error('error', {duration: 1000});
    },
    showModal: function() {
      this.$modal.show('hello-world');
    }
  }
}
</script>

<style scoped>
</style>
