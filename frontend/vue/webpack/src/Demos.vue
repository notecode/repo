<template>
  <div>
    <h1>demos</h1>
    <button @click="showToast">Toast</button>
    <button @click="showError">Error Toast</button>
  </div>
</template>

<script>
export default {
  created: function() {
  },
  methods: {
    showToast: function() {
      this.$toasted.show('hello billo', {duration: 1000});
    },
    showError: function() {
      this.$toasted.error('error', {duration: 1000});
    }
  }
}
</script>

<style scoped>
</style>
