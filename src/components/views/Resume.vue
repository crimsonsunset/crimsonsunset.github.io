<template>

    <section>

        <v-container fluid class="mt-3 resume-view">

            <div
                    ref="loader"
                    :class="['loader', `loader--${settingsObj.themeColor}`, 'loader-bar-ping-pong', `${getActiveStatus()}`]"
            >
            </div>

            <card-list
                    v-if="(currNavItem == 'Experience') "
                    :settingsObj='settingsObj'
                    :name="currNavItem.toLowerCase()"
            >

            </card-list>

            <card-list
                    v-if="(currNavItem == 'Projects') "
                    :settingsObj='settingsObj'
                    :name="currNavItem.toLowerCase()"
            >

            </card-list>

            <lazy-grid
                    :settingsObj='settingsObj'
                    v-if="(currNavItem == 'Skills') "
            >

            </lazy-grid>

            <detail-accordion
                    :settingsObj='settingsObj'
                    endpoint='references'
                    v-if="(currNavItem == 'References') "
            >

            </detail-accordion>

            <parallax-card-list
                    :settingsObj='settingsObj'
                    endpoint='education'
                    v-if="(currNavItem == 'Education') "
            >

            </parallax-card-list>

        </v-container>

        <v-flex
                fixed
                bottom
                row xs12 class="resume-view__nav">


            <v-card class="cardz">
                <v-bottom-nav
                        id="resume-nav"
                        :value="true"
                        class="white"
                        :active.sync="currNavItem"
                >


                    <v-btn
                            v-for="(item,i) in navItems"
                            flat light
                            :class="[`${settingsObj.themeColor}--text`, 'text--darken-2']"
                            :key="item.name"
                            :id="`${item.name}`"
                            @click="(e)=>{toggleResumeNavItem(e)}"
                            :value="item.name"
                    >
                        <span>{{item.name}}</span>
                        <v-icon :id="`icon-${item.name}`">{{item.icon}}</v-icon>
                    </v-btn>

                </v-bottom-nav>
            </v-card>
        </v-flex>

    </section>

</template>

<script>

	import {profileData} from '../../config/joeInfo.json'
	import CardList from '../CardList.vue';
	import LazyGrid from '../LazyGrid.vue';
	import DetailAccordion from '../DetailAccordion.vue';
	import ParallaxCardList from '../ParallaxCardList.vue';
	import {routeExporter} from '../../helpers'

	export default routeExporter({
		props: ['settingsObj'],
		components: {CardList, LazyGrid, DetailAccordion, ParallaxCardList},
		mounted() {
			const hash = this.$router.currentRoute.hash.substring(1);

			if (hash) {
				// console.log('hash exists', hash)
				this.currNavItem = hash;
			}
			// console.log('hash isz', hash)
			this.settingsObj.loaderRef = this.$refs.loader;
			this.$router.push(`/Resume#${this.currNavItem}`);
		},
		//		activated(e) {
		//			this.$router.push(`/Resume#${this.currNavItem}`);
		//		},

		data() {
			return {
				navItems: [
					{
						name: 'Experience',
						icon: 'laptop_mac',
					},
					{
						name: 'Projects',
						icon: 'build',
					},
					{
						name: 'Skills',
						icon: 'check_box',
					},
					{
						name: 'References',
						icon: 'group',
					},
					{
						name: 'Education',
						icon: 'school',
					},
				],
				profileData: {},
				expandedItem: '',
				currNavItem: 'Experience',
			}
		},
		computed: {},
		methods: {
			toggleResumeNavItem(e) {
				let itemName = (e.target.nodeName == 'DIV') ? e.target.parentElement.id : e.target.id;
				this.currNavItem = itemName;
				this.$router.push(`/Resume#${itemName}`);
				this.settingsObj.pagePrompt = this.getPageInfo();
				this.$forceUpdate();
			}
		}
	})

</script>

<style lang="scss">

    $resumeHeight: 88vh !important;
    $bw: 2px;
    @import "../../styles/colors";

    .border {
        border: $bw solid green;
    }

    .resume-view {

        &__nav {
            margin-top: -3vh;
        }

    }

    .resume-nav {

        color: black
    }

    @media only screen and (max-width: 400px) {

        .resume-view {
            &__nav {
                .btn__content span {
                    display: none;
                }
                .btn {
                    min-width: 10px !important;
                }
            }

        }
    }


</style>
