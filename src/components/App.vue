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
                            :drawer='drawer'
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
		beforeCreate() {
			console.log('beforecreate', this.$store)

			this.defaultSettings = {
				themeColor: 'red',
				animation: 'fadeInUp',
				toTop: true,
				rememberSettings: false,
				rememberLocation: true,
			};

//			console.log((this.$store.get('settings')))
			this.settingsObj = (this.$store.get('settings') || {})
		},

		data() {
			return {
				settingsObj: {
					...this.defaultSettings,
					...this.settingsObj,
				},

				drawer: false
			}
		},
		computed: {
			colors() {
				console.log(this.settingsObj)
				return this.getSassConfig('colors')
			},
			animations() {
				return this.getAnimationNames()
			},

			//			settingsObj() {
			//				if (this.settingsObj) {
			//
			//				} else {
			//
			//				}
			//				return {
			//
			//				}
			//			}
		},
		methods: {
			toggleDrawer(state) {
				if (state != this.drawer) {
					this.drawer = state || !this.drawer;
				}
			}
			,
			updateConfigVal(payload) {
				const firstKey = keys(payload)[0];

				//				console.log('hey made it', payload)
				//				console.log(payload, firstKey)

				if (firstKey != 0) {
					this.settingsObj[firstKey] = payload[firstKey];
				} else {
					this.settingsObj[payload] = !this.settingsObj[payload]
				}

				//				console.log(this.settingsObj[payload])

				//settings that require further action after toggled
				const save = this.settingsObj[firstKey];
				switch (firstKey) {
					case 'rememberSettings':
						this.toggleStoreVal('settings', save, this.settingsObj);
						return;
					case 'rememberLocation':
						const {path} = this.$route;
						this.toggleStoreVal('location', save, path);
						return;
					default:
						return;
				}
			}
			,
			toggleStoreVal(key, save, newVal) {

				if (save) {
					this.$store.set(key, newVal)
				} else {
					this.$store.remove(key)
				}
			}
		}
		,

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
