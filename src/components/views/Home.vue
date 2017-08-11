<template>
    <v-container fluid>
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




    </v-container>
</template>

<script>

    export default {
        props: ['themeColor', 'toTop'],
        data() {
            return {}
        },

    }
</script>

<style lang="scss">

</style>
