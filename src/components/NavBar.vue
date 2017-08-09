<template>

    <!--<div> {{message}}</div>-->

        <v-toolbar fixed :class="[themeColor, 'darken-4']" dark>
            <v-toolbar-side-icon @click="e => { this.$emit('toggleDrawer'); }"></v-toolbar-side-icon>
            <v-toolbar-title>{{themeColor}}</v-toolbar-title>
        </v-toolbar>

</template>

<script>

    import {forEach, map, toArray} from 'lodash'

    export default {
        props: ['themeColor'],
        data() {
            return {
            }
        },
        methods: {
        }
    }
</script>


<style lang="scss">

</style>
