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
                v-on:startTour="startTour()"
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

            <div
                    class="icon-holder"
            >
                <v-avatar
                        @click="openLink('https://github.com/crimsonsunset')"
                        :tile="false"
                        size="50px"
                        :class="['icon', 'social']"
                >

                    <img :src="iconGithub"/>

                </v-avatar>

                <v-avatar
                        @click="openLink('https://www.linkedin.com/in/josephsangiorgio/')"
                        :tile="true"
                        size="50px"
                        :class="['icon', 'social']"
                >

                    <img :src="iconLinkedin"/>

                </v-avatar>
            </div>

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
	import {introJs} from 'intro.js'

	const iconGithub = require('../assets/icons/github.svg');
	const iconLinkedin = require('../assets/icons/linkedin.svg');


	export default {
		components: {NavDrawer, NavBar},
		beforeCreate() {

			this.defaultSettings = {
				themeColor: 'red',
				animation: 'fadeInUp',
				showInfo: true,
				toTop: false,
				rememberSettings: false,
				rememberLocation: false,
			};
			this.settingsObj = (this.$store.get('settings') || {});

			//            console.log(this)
			//navigate to last page if you're on homePage
			const {rememberLocation} = this.settingsObj;
			if (rememberLocation) {
				//				console.log('about to', rememberLocation)
				this.$router.push(this.$store.get('location'));
			}
		},
		mounted() {
			if (!this.$store.get('tourFinished')) {
				this.startTour();
			}
		},
		data() {
			return {
				settingsObj: {
					...this.defaultSettings,
					...this.settingsObj,
				},
				iconGithub,
				iconLinkedin,
				drawer: false
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
			startTour() {
				console.log('about to start tour')

				//todo: remove
				this.$router.push('/');


				//since this app uses a UI toolkit, don't have direct access to all of the HTML.
				// Instead, have to inject tags by selecting, which is obviously less than ideal.
				const intro = introJs();
				const that = this;
				intro.setOptions({
					showBullets: false,
					showProgress: true,
					hidePrev: true,
					overlayOpacity: 0.4,
					steps: [
						{
							intro: "Welcome to My Portfolio Site!"
						},
						{
							element: $('.toolbar__side-icon'),
							intro: "Click here to access the menu.",
							highlightClass: 'tour__step--2h',
							beforeNextStep() {
								if (!that.drawer) {
									$('.toolbar__side-icon').click();
								}
							}
						},
						{
							element: $('#to-top'),
							intro: "Alter settings as you'd like!",
							tooltipClass: 'tour__step--3',
							highlightClass: 'tour__step--3h',
							beforeNextStep() {
								$('#to-top label').click()
							}

						},
						{
							element: $('#contact'),
							intro: "Click an item to navigate to the corresponding page",
							highlightClass: 'tour__step--4h',

						},
						{
							element: $('nav .info-btn'),
							intro: "Click on the info button for page-specific instructions",
							highlightClass: 'tour__step--5h',
							beforeNextStep() {
								$('#resume').click();
							}
						},
						{
							intro: "The Resume page has multiple sections",
							highlightClass: 'tour__step--6'
						},
						{
							element: $('.bottom-nav--active'),
							intro: "The bottom navigation bar will take you to the different sections",
							tooltipClass: 'tour__step--7',
							highlightClass: 'tour__step--7h',
						},
						{
							intro: "Restart this tour at any time from the menu. Enjoy!",
							tooltipClass: 'tour__step--8',
							beforeNextStep() {
								that.$store.set('tourFinished', true);
							}
						}
					]
				});

				//set up pre-step listeners that will interact with the app directly
				intro.onbeforechange(() => {
					const {_currentStep, _introItems} = intro;
					const {beforeNextStep} = _introItems[_currentStep];
					if (beforeNextStep) {
						beforeNextStep();
					}
				});

				intro.start();

			},
			toggleDrawer(state) {
				if (state != this.drawer) {
					this.drawer = state || !this.drawer;
				}
			},
			updateConfigVal(payload) {
				const firstKey = keys(payload)[0];

				if (firstKey != 0) {
					this.settingsObj[firstKey] = payload[firstKey];
				} else {
					this.settingsObj[payload] = !this.settingsObj[payload]
				}

				//settings that require further action after toggled
				const save = this.settingsObj[firstKey];

				(() => {
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
				})();

				if (this.settingsObj.rememberSettings) {
					this.toggleStoreVal('settings', true, this.settingsObj)
				}

			},
			toggleStoreVal(key, save, newVal) {
				if (save) {
					this.$store.set(key, newVal)
				} else {
					this.$store.remove(key)
				}
			}
		},
	}
</script>


<style lang="scss">

    $minHeight: 90vh !important;

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

        .icon-holder {
            margin-left: -10px;
        }
        .social {
            filter: invert(100%);
            height: 3vh !important;
            cursor: pointer;
        }
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

    //tour elem styling
    .introjs-helperNumberLayer {
    }

    .introjs-prevbutton {
        display: none;
    }

    .introjs-helperLayer {
        opacity: 0.4 !important;
    }

    .tour__step {
        &--2h ~ div {
            //the number badge
            span {
                top: 34px !important;
                left: 34px !important;
            }
        }
        &--3 {
            margin-top: -143px !important;
            &h ~ div {
                span {
                    left: 262px !important;
                    top: -13px !important;
                }
            }
        }
        &--4h {
            top: 155px !important;
            left: -5px !important;
            width: 303px !important;
            & ~ div {
                span {
                    left: 297px !important;
                    top: -43px !important;
                }
            }
        }

        &--5h {
            width: 50px !important;
            height: 44px !important;
            top: 5px !important;
            left: 409px !important;

            & ~ div {
                span {
                    top: 41px !important;
                    left: -11px !important;
                }
            }
        }
        &--7 {
            top: -100% !important;
            &h ~ div {
                span {
                    left: 382px !important;
                    top: -138px !important;
                }
            }
        }
        &--8 {
            .introjs-nextbutton {
                display: none;
            }
        }
    }


</style>
