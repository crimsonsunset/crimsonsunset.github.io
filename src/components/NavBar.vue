<template>

    <!--<div> {{message}}</div>-->

    <v-toolbar
            fixed
            :class="[themeColor, 'darken-4']" dark>
        <v-toolbar-side-icon @click.stop="()=>emitEvent('toggleDrawer')"></v-toolbar-side-icon>
        <!--<v-toolbar-title>{{'sddd'}}</v-toolbar-title>-->
        <v-toolbar-title>{{this.getRouteName()}}</v-toolbar-title>
    </v-toolbar>

</template>

<script>

    export default {
        props: ['themeColor'],
        data() {
            return {}
        },
        methods: {
            getRouteName(e) {
                const routeName = this.$route.fullPath.substring(1);
                return (routeName != '') ? routeName : 'Welcome!';
            }
        }
    }
</script>


<style lang="scss">

    nav{
        z-index: 100 !important;
    }

</style>
