<template>
    <v-app

            id="app"
            standalone
            :class="[`${settingsObj.themeColor}`, 'lighten-5']"
    >

        <nav-drawer
                :colors='colors'
                :animations='animations'

                :drawer='drawer'
                :settingsObj='settingsObj'

                v-on:toggleDrawer="toggleDrawer"
                v-on:updateConfigVal="updateConfigVal"
        ></nav-drawer>


        <nav-bar
                :settingsObj='settingsObj'
                v-on:toggleDrawer="toggleDrawer"
        ></nav-bar>


        <main>

            <!--:leave-active-class="`animated ${animation}`"-->
            <transition
                    name="custom-classes-transition"
                    :enter-active-class="`animated ${settingsObj.animation}`"
            >
                <keep-alive>
                    <router-view
                            :settingsObj='settingsObj'
                    >

                    </router-view>
                </keep-alive>
            </transition>


            <v-fab-transition>
                <v-btn
                        :class="['top-btn',settingsObj.themeColor, 'darken-2']"
                        fab
                        fixed
                        bottom
                        right
                        v-show="settingsObj.toTop"
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
                :class="['pa-3',settingsObj.themeColor, 'darken-4', 'footer']"
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
				settingsObj:{
					themeColor: 'red',
					animation: 'fadeInUp',
					toTop: true
                },


//				themeColor: 'red',
//				animation: 'fadeInUp',
//				toTop: true


				drawer: false,
			}
		},
		computed: {
			colors() {
				return this.getSassConfig('colors')
			},
			animations() {
				return this.getAnimationNames()
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

				console.log(payload, firstKey)

				if (firstKey != 0) {
					this.settingsObj[firstKey] = payload[firstKey];
				} else {
					this.settingsObj[payload] = !this.settingsObj[payload]
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
        bottom: 60px !important;
    }

    .application {
        min-height: $minHeight;
    }

    .container {
        min-height: $minHeight;
    }

    .footer {
        color: white;
        height: 5vh;
    }

    .full-width {
        width: 100%;
    }

    .text-align {
        &--right {
            text-align: right;
        }
        &--center {
            text-align: center;
        }
    }


</style>
