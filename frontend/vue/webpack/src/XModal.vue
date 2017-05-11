<template>
  <modal :name="xname">
    <span @click="xclose" class="x">x</span>
    <slot/>
  </modal>
</template>

<script>

export default {
  props: {
    xname: {
      type: String,
      required: true,
    },
  },
  data: function() {
    return {
    }
  },
  methods: {
    xclose () {
      console.log('x');
      this.$modal.hide(this.xname);
    }
  }
}
</script>

<style lang="scss" scoped>
.x {
  display: inline-block;
  position: absolute;
  right: 9px;
  top: 2px;
  color: red;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    color: gray;
  }
}  
</style>
