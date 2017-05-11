<template>
  <div :class="containerClass">
    <div :class="{modal: true, in: showModal}" :style="{ display: showModal ? 'block' : 'none' }">
      <div class="modal-dialog">
        <div class="modal-content">
          <div v-if="this.$slots.header || closeAction" class="modal-header">
            <button class="close" @click="closeAction">x</button>
            <slot name="header"></slot>
          </div>
          <div v-if="this.$slots.body" class="modal-body">
            <slot name="body"></slot>
          </div>
          <div v-if="this.$slots.footer" class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
    <div :class="{'modal-backdrop': showModal, in: showModal}"></div>
  </div>
</template>

<script>
  export default {
    props: {
        showModal: {
            type: Boolean,
            default: false, 
        },
        //close: Function,
        containerClass: String,
    },
    data: function() {
        return {};
    },
    methods: {
        closeAction: function() {
            //this.close();
            this.showModal = false;
            //this.$emit('update:showModal', false);
        }
    }
  }
</script>

<style scoped>

</style>
