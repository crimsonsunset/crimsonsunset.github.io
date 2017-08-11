<template>
    <v-app id="app"
           :class="[themeColor, 'lighten-4']"
    >
        <!--<v-parallax src="https://vuetifyjs.com/static/doc-images/parallax/material.jpg">-->
        <!--<v-container fluid>-->
            <nav-drawer
                    :colors='colors'
                    :drawer='drawer'
                    :toTop='toTop'
                    :themeColor='themeColor'
                    v-on:toggleDrawer="toggleDrawer"
                    v-on:updateConfigVal="updateConfigVal"
            ></nav-drawer>
            <nav-bar
                    :themeColor="themeColor"
                    v-on:toggleDrawer="toggleDrawer"
            ></nav-bar>

            <main>


                <transition>
                    <keep-alive>
                        <router-view
                                :themeColor="themeColor"
                                :toTop='toTop'
                        >

                            <!--<v-fab-transition>-->
                            <!--<v-btn-->
                            <!--:class="['top-btn',themeColor, 'darken-2']"-->
                            <!--fab-->
                            <!--fixed-->
                            <!--bottom-->
                            <!--right-->
                            <!--v-show="toTop"-->
                            <!--@click.native="scrollToTop"-->
                            <!--&gt;-->

                            <!--<v-icon>keyboard_arrow_up</v-icon>-->
                            <!--</v-btn>-->
                            <!--</v-fab-transition>-->
                        </router-view>
                    </keep-alive>
                </transition>


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

            </main>

        <!--</v-container>-->
        <v-footer
                :class="['pa-3',themeColor, 'darken-4']"
        >
            <v-spacer></v-spacer>
            <div>Joe Sangiorgio © {{ new Date().getFullYear() }}</div>
        </v-footer>
        <!--</v-parallax>-->
    </v-app>
</template>

<script>

    import {forEach, map, toArray} from 'lodash'
    import NavDrawer from './NavDrawer.vue'
    import NavBar from './NavBar.vue'
    import RouterView from 'vue-router'


    export default {
        components: {NavDrawer, NavBar},
        data() {
            return {
                drawer: false,
                right: null,
                themeColor: 'red',
                toTop: true,
            }
        },
        computed: {
            colors() {
                return this.getSassConfig('colors')
            },
        },
        methods: {
            toggleDrawer(state) {
                if (state != this.drawer) {
                    this.drawer = state || !this.drawer;
                }
            },
            updateConfigVal(val, e) {
                this[val] = e;
            },
        },

    }
</script>


<style lang="scss">

    $minHeight: 89vh !important;

    .info-accordion {
        background-color: white;
    }

    .top-btn {
        /*border: 1px solid orange;*/
        bottom: 50px !important;
    }

    .application {
        min-height: $minHeight;
    }

    .container {
        min-height: $minHeight;
    }


</style>
