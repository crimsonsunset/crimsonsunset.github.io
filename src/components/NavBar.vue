<template>

    <!--<div> {{message}}</div>-->

    <v-toolbar :class="[themeColor, 'darken-4']" dark>
        <v-toolbar-side-icon @click.stop="test"></v-toolbar-side-icon>
        <v-toolbar-title>{{themeColor}}</v-toolbar-title>
    </v-toolbar>

</template>

<script>

    import {forEach, map, toArray} from 'lodash'

    export default {
        props: ['themeColor'],
        data() {
            return {}
        },
        methods: {
            test(e) {
                this.$emit('toggleDrawer');
            }
        }
    }
</script>


<style lang="scss">

</style>
