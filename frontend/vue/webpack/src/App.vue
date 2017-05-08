<template>
    <div>
        <VHeader/>
        <VBody/>
        <VFooter/>
    </div>
</template>

<script>
import VHeader from './Header.vue';
import VFooter from './Footer.vue';
import VBody from './Body.vue';

export default {
    name: 'app',
    components: {
        VHeader,
        VBody,
        VFooter,
    },
    data: function () {
        return {msg: 'Hello, vue'};
    }
}

</script>

<style lang="scss">
</style>
