<template>

    <v-navigation-drawer
            v-model="localDrawer"
            overflow>
        <v-toolbar class="transparent">
            <v-list class="pa-0">
                <v-list-tile avatar tag="div">
                    <v-list-tile-avatar>
                        <img src="https://s.gravatar.com/avatar/edebe1c8b202a4ffb065b200c8d12d57?s=80"/>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>Settings</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-toolbar>
        <v-list class="pt-0" dense>
            <v-divider></v-divider>
            <v-list-tile v-for="item in items" :key="item.title">
                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile>

                <v-select
                        label="Select A Theme"
                        v-bind:items="colors"
                        @input="e => { this.$emit('updateColor',e); }"
                        class="theme-select"
                        item-text="color"
                        item-value="color"
                        max-height="auto"
                >
                    <template slot="item" scope="data">
                        <template>
                            <v-list-tile-content>
                                <v-btn fab
                                       class="dropdown-fob"
                                       v-bind:style="{'background-color': data.item.hexValue}">
                                </v-btn>
                            </v-list-tile-content>
                            <v-list-tile-content>
                                <v-list-tile-title v-text="data.item.color"></v-list-tile-title>
                            </v-list-tile-content>
                        </template>
                    </template>
                </v-select>

            </v-list-tile>

        </v-list>
    </v-navigation-drawer>

</template>

<script>

    import {forEach, map, toArray} from 'lodash'

    export default {
        props: ['drawer', 'colors', 'items'],
        data() {
            return {
                //                localDrawer: this.drawer
            }
        },
        methods: {},
        computed: {
            localDrawer: {
                get() {
                    return this.drawer;
                },
                set(inVal) {
                    this.$emit('toggleDrawer', inVal);
                }
            }
        }
    }
</script>


<style lang="scss">

    .theme-select {
        margin-top: 60px !important;
    }

    .dropdown-fob {
        width: 36px;
    }

</style>
