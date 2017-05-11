<template>
  <modal :showModal.sync="showModal">
    <h1 slot="header">Simple Dialog</h1>
    <span slot="body">
      Hello <strong>simple!</strong>
    </span>
  </modal>
</template>

<script>
  import Modal from './Modal.vue'
  export default {
    props: ['showModal'],
    components: { Modal }
  }
</script>

<style scoped>

</style>
