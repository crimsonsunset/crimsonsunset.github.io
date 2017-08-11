<template>
    <v-app id="app"
           :class="[themeColor, 'lighten-4']"
    >
        <nav-drawer
                :colors='colors'
                :items='items'
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
            <v-container fluid>

                <!--<transition>-->
                    <!--<keep-alive>-->
                <!--<router-view>-->

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

                <!--</router-view>-->


                    <!--</keep-alive>-->
                <!--</transition>-->


            </v-container>
            <template>
                <v-footer
                        :class="['pa-3',themeColor, 'lighten-5']"
                >
                    <v-spacer></v-spacer>
                    <div>Joe Sangiorgio © {{ new Date().getFullYear() }}</div>
                </v-footer>
            </template>

        </main>
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
                items: [
                    {title: 'Home', icon: 'dashboard'},
                    {title: 'About', icon: 'question_answer'},
                    {title: 'Test', icon: 'question_answer'},
                    {title: 'Joe', icon: 'question_answer'}
                ],
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
            scrollToTop() {
                const scrollDuration = 1000;
                const scrollStep = -window.scrollY / (scrollDuration / 15),
                    scrollInterval = setInterval(function () {
                        if (window.scrollY != 0) {
                            window.scrollBy(0, scrollStep);
                        }
                        else clearInterval(scrollInterval);
                    }, 15);
            },
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
