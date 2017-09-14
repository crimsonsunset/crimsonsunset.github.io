<template>


    <transition

            name="custom-classes-transition"
            :enter-active-class="`animated ${settingsObj.animation}`"
    >


        <v-layout row wrap class="masonry-container" :style="{width: `${containerWidth}px`}">


            <v-flex xs12>


                <v-flex xs2>
                    <v-btn
                            :class="[`${settingsObj.themeColor}`, 'darken-2', `white--text`]"
                            @click.native="shuffleGrid"

                    >
                        Shuffle!
                    </v-btn>
                </v-flex>


                <isotope
                        class="masonry-grid"
                        :list="nameArr"
                        ref="grid"
                        :options='option'
                        @layout="'masonry'"
                        v-images-loaded:on.progress="layout"
                >


                    <v-flex
                            v-for="item in nameArr"
                            @click="selected=item"
                            :key="item"
                            transition="scale-transition"
                    >

                        <transition-group
                                :key="item"
                                name="custom-classes-transition"
                                :enter-active-class="`animated ${settingsObj.animation}`"
                        >

                            <v-layout
                                    :key="item"
                                    transition="scale-transition"
                                    row justify-center>


                                <v-card
                                        primary
                                        transition="scale-transition"
                                        class="skill-card"
                                        slot="activator"
                                        @click="(e)=>{skillClicked(item)}"
                                >

                                    <img
                                            class="skill-card__image" :src="getFileName(item)" :height="tileSize"
                                            :width="tileSize"/>

                                </v-card>


                            </v-layout>

                        </transition-group>
                    </v-flex>


                </isotope>


            </v-flex>


            <v-dialog
                    v-if="currSkill != 'NA'"
                    v-model="currSkill"
                    fullscreen
                    transition="dialog-bottom-transition"
            >
                <v-card>
                    <v-toolbar dark
                               :class="[`${settingsObj.themeColor}`, 'darken-4', `white--text`, 'close-bar']"
                    >
                        <v-spacer></v-spacer>
                        <v-toolbar-title>{{currSkill}} [more info]</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn icon @click.native="currSkill = 'NA'" dark>
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>

                    <v-container
                            class="infoCard"
                            fluid
                            grid-list-lg
                    >
                        <v-layout row wrap>

                            <v-flex xs10 offset-xs1>
                                <v-card
                                        :class="[`${settingsObj.themeColor}`, 'darken-2', `white--text`]"
                                >
                                    <v-container>
                                        <v-layout row>
                                            <v-flex
                                                    class="xs12"
                                            >
                                                <div>
                                                    <div class="headline"> {{pageInfo.name}}</div>
                                                    <div> {{pageInfo.definitionTxt}}</div>
                                                </div>
                                            </v-flex>
                                            <v-flex
                                                    v-if="pageInfo.imgSrc"
                                                    xs5>
                                                <v-card-media
                                                        :src="pageInfo.imgSrc"
                                                        height="125px"
                                                        contain
                                                ></v-card-media>
                                            </v-flex>
                                        </v-layout>

                                        <v-card-actions>
                                            <v-btn
                                                    @click="(e)=>{
                                                                	openLink(pageInfo.wikiLink)
                                                                }"
                                                    flat
                                                    class="white--text">More Info
                                            </v-btn>
                                            <v-btn
                                                    @click="(e)=>{
                                                                	openLink(pageInfo.jokeLink)
                                                                }"
                                                    flat
                                                    class="white--text">I'm Feeling Lucky
                                            </v-btn>
                                        </v-card-actions>

                                    </v-container>
                                </v-card>
                            </v-flex>


                        </v-layout>
                    </v-container>
                </v-card>

            </v-dialog>


        </v-layout>
    </transition>


</template>

<script>

	import axios from 'axios';
	import {random} from 'lodash';
	import isotope from 'vueisotope'
	import imagesLoaded from 'vue-images-loaded'

	export default {
		props: ['nameArr', 'settingsObj'],
		directives: {
			imagesLoaded
		},
		components: {isotope},
		mounted() {
			//math to calc correct tile/container size
			const DEFAULT_TILE_WIDTH = 200;
			const currWidth = window.innerWidth - 28; //account for padding
			let numTiles;

			if (currWidth < 600) {
				this.tileSize = currWidth / 3;
				numTiles = 2;
			} else {
				this.tileSize = DEFAULT_TILE_WIDTH;
				const offset = (currWidth > 1400) ? 2 : 1;
				numTiles = Math.floor(currWidth / DEFAULT_TILE_WIDTH) - offset
			}

			this.containerWidth = (this.tileSize * numTiles) + (numTiles * 42);
			//			console.log('numTiles: ', numTiles);
			//			console.log('currWidth: ', currWidth);
			//			console.log('this.containerWidth: ', this.containerWidth);
			//			console.log('this.tileSize: ', this.tileSize);

		},
		data() {
			return {
				layouts: [
					"masonry",
					"fitRows",
					"cellsByRow",
					"vertical",
					"packery",
					"masonryHorizontal",
					"fitColumns",
					"cellsByColumn",
					"horiz"
				],
				currSkill: 'NA',
				pageInfo: {},
				tileSize: '',
				containerWidth: '',
				option: {}
			}
		},
		computed: {},
		methods: {
			layout() {
				if (this.$refs.grid) {
					this.$refs.grid.layout('masonry');
				}

			},
			getFileName(item) {
				item = item.replace(' ', '_');
				return `../src/assets/skills/${item.toLowerCase()}.png`;
			},
			shuffleGrid() {
				this.$refs.grid.shuffle();
			},
			openLink(link) {
				window.open(link)
			},
			skillClicked(skill) {
				console.log('skill clickedzz', skill);
				const that = this;
				const sanitizedSkill = encodeURIComponent(skill.replace(' ', '_'));

				axios.get(`https://crimsonsunset-portfolio.herokuapp.com/scrape?endPath=${sanitizedSkill}`)
					.then(({data}) => {
						this.pageInfo = data;
						this.currSkill = skill;
					}).catch(() => {
					this.pageInfo = {
						name: sanitizedSkill,
						websiteUrl: 'https://www.google.com/',
						definitionTxt: 'no definition available',
						wikiLink: 'https://en.wikipedia.org',
						jokeLink: 'http://lmgtfy.com/?q=catch+block'
					}
				})

				//				this.pageInfo = {
				//					name: sanitizedSkill,
				//					websiteUrl : 'https://www.google.com/',
				//					definitionTxt : 'no definition available',
				//					wikiLink : 'https://en.wikipedia.org',
				//					jokeLink: 'http://lmgtfy.com/?q=catch+block'
				//				}


			}
		}


	}

</script>

<style lang="scss">

    .masonry-container {
        /*border: 2px solid blue;*/
        margin: 0 auto;
    }

    .masonry-grid {
        /*border: 2px solid red;*/
        text-align: center;
        margin: 0 auto;
        align-items: center;
        margin-bottom: 40px;
    }

    .dialog .container {
        min-height: 0px !important;
    }

    .skill-card {
        /*background: no-repeat center center fixed;*/
        /*height: 200px;*/
        /*width: 200px;*/
        /*border: 1px solid red;*/
        cursor: pointer;
        display: flex;
        padding: 10px;
        margin: 10px;
        flex-direction: column;
        &__title {
            padding: 0px;
            text-align: center;
            padding: 2px;
            //border: $bw solid red;
        }
        &__image {
            margin-top: 10px;
        }
    }

    .dialog__content {
        z-index: 300 !important;
    }


</style>
