<template>
    <div>
        <VHeader/>
        <VBody/>
        <VFooter/>

        <!-- <Modal :showModal="showModal" :close="closeMe" /> -->
        <Modal :showModal.sync="showModal" />
        <button @click="showModal = true">Show Modal</button>
    </div>
</template>

<script>
import VHeader from './Header.vue';
import VFooter from './Footer.vue';
import VBody from './body/main.vue';
import Dlg from './dialog/SimpleDialog.vue';
import Modal from './dialog/Modal.vue';

export default {
    name: 'app',
    components: {
        VHeader,
        VBody,
        VFooter,
        Modal,
    },
    data: function () {
        return {
            showModal: false,
        };
    },
    methods: {
        closeMe: function() {
            this.showModal = false;
        }
    }
}

</script>

<style lang="scss">
</style>
