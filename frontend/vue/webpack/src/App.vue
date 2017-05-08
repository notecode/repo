<template>
    <div>
        <VHeader/>
        <VFooter/>
    </div>
</template>

<script>
import VHeader from './Header.vue';
import VFooter from './Footer.vue';

export default {
    name: 'app',
    components: {
        VHeader,
        VFooter,
    },
    data: function () {
        return {msg: 'Hello, vue'};
    }
}

</script>

<style lang="scss">
</style>
