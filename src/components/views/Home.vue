<template>
    <template>
        <v-expansion-panel class="info-accordion">
            <v-expansion-panel-content v-for="(item,i) in 50" :key="i">
                <div slot="header">Item</div>
                <v-card>
                    <v-card-text :class="[themeColor, 'lighten-2']">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </template>
    <v-fab-transition>
        <v-btn
                :class="['top-btn',themeColor, 'darken-2']"
                fab
                fixed
                bottom
                right
                v-show="toTop"
                @click.native="scrollToTop"
        >

            <v-icon>keyboard_arrow_up</v-icon>
        </v-btn>
    </v-fab-transition>
</template>

<script>

    export default {
        data() {
            return {

            }
        },

    }
</script>

<style lang="scss">

</style>
