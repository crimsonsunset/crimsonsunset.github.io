
<template>
    <v-app
            id="app"
            standalone
    >

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
                            transition="scale-transition"
                            :themeColor="themeColor"
                            :toTop='toTop'>

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
                        dark
                        @click.native="scrollToTop"
                >

                    <v-icon>keyboard_arrow_up</v-icon>
                </v-btn>
            </v-fab-transition>

        </main>

        <!--</v-container>-->


        <v-footer
                fixed
                :class="['pa-3',themeColor, 'darken-4', 'footer']"
        >
            <v-spacer></v-spacer>
            <div>Joe Sangiorgio © {{ new Date().getFullYear() }}</div>
        </v-footer>


        <!--<v-footer :absolute="footer.fixed">-->
            <!--<span>© {{ new Date().getFullYear() }}</span>-->
        <!--</v-footer>-->

    </v-app>
</template>

<script>

    import {forEach, map, toArray, keys} from 'lodash'
    import NavDrawer from './NavDrawer.vue'
    import NavBar from './NavBar.vue'
    import RouterView from 'vue-router'


    export default {
        components: {NavDrawer, NavBar},
        data() {
            return {
                drawer: false,
                right: null,
                themeColor: 'indigo',
                toTop: true
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
            updateConfigVal(payload) {
                const firstKey = keys(payload)[0];
                if (firstKey != 0) {
                    this[firstKey] = payload[firstKey];
                } else {
                    this[payload] = !this[payload]
                }
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

    .footer {
        color: white;
    }


</style>
