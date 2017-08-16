<template>

    <v-navigation-drawer
            class="pb-0"
            persistent
            absolute
            height="100%"
            clipped


            temporary
            light
            overflow
            absolute

            v-model="localDrawer"
            >
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
        <v-list class="pt-0">
            <v-divider></v-divider>
            <v-list-tile v-for="item in items" :key="item.label">
                <v-list-tile-action>
                    <v-icon
                            :class="[`${themeColor}--text`, 'text--lighten-1']"
                    >{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>
                        <router-link :to="item.path">{{item.label}}</router-link>
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-divider></v-divider>

            <v-subheader class="grey--text text--darken-1">Customize this App</v-subheader>
            <v-list class="px-3">

                <v-select
                        label="Select A Theme"
                        v-bind:items="colors"
                        @input="e => { this.$emit('updateConfigVal', 'themeColor', e) }"
                        item-text="color"
                        item-value="color"
                        max-height="auto"
                >
                    <template slot="item" scope="data">
                        <template>
                            <v-list-tile-content>
                                <v-btn fab
                                       class="dropdown-btn"
                                       v-bind:style="{'background-color': data.item.hexValue}">
                                </v-btn>
                            </v-list-tile-content>
                            <v-list-tile-content>
                                <v-list-tile-title v-text="data.item.color"></v-list-tile-title>
                            </v-list-tile-content>
                        </template>
                    </template>
                </v-select>

            </v-list>

            <div class="switch px-3">
                <v-switch
                        :color="themeColor"
                        label='Return To Top Button'
                          v-model="localTop"
                >

                </v-switch>
            </div>

        </v-list>
    </v-navigation-drawer>

</template>

<script>

    import {forEach, map, toArray} from 'lodash'
    import RouterLink from 'vue-router'
    import routes from '../config/routes'
//
//    console.log('items')
//    console.log(routes)

    export default {
        props: ['drawer', 'colors', 'toTop', 'themeColor'],
        data() {
            return {
                items: routes
            }
        },
        created: function () {
            // `this` points to the vm instance
            //            console.log('thiz create ',this)
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
            },
            localTop: {
                get() {
                    return this.toTop;
                },
                set(inVal) {
                    this.$emit('updateConfigVal', 'toTop', inVal);
                }
            }
        }
    }
</script>


<style lang="scss">

    .theme-select {
        margin-top: 60px !important;
    }

    .dropdown-btn {
        width: 36px;
    }

    .switch {
        margin-top: -30px;
    }

</style>
