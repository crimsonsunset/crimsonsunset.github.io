<template>

    <v-layout row wrap>
        <v-flex xs12>
            <!--GRIDDZZ-->

            <!--<div v-lazy:background-image="'https://www.fillmurray.com/600/400'"></div>-->

            <!--<img class="mini-cover" :src="'https://www.fillmurray.com/600/400'" width="100%" height="400">-->

            <!--<div v-lazy:background-image="imgUrl"></div>-->

            <!--<isotope :list="nameArr" id="root_isotope" class="isoDefault" :options='option' >-->
            <!--<div v-for="item in nameArr" @click="selected=item"  :key="item">-->

            <!--<div class="skill-card">-->
            <!--<img v-lazy="imgUrl"/>-->
            <!--<h2> {{item}}</h2>-->
            <!--</div>-->

            <!--</div>-->
            <!--</isotope>-->
            <!--:class="[`${themeColor}&#45;&#45;text`, 'text&#45;&#45;lighten-2']"-->
            <v-btn
                    dark
                    @click.native="shuffleGrid"

            >
                Shuffle!
            </v-btn>


            <isotope
                    class="masonry-grid"
                    :list="nameArr"
                    ref="grid"
                    :options='option'
                    @layout="'masonry'"
                    v-images-loaded:on.progress="layout"
            >

                <div v-for="item in nameArr" @click="selected=item" :key="item">


                    <v-layout row justify-center>
                        <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
                            <v-card
                                    primary
                                    class="skill-card"
                                    @click="(e)=>{skillClicked(item)}"
                                    slot="activator">

                                <div

                                        @click="(e)=>{skillClicked(item)}"
                                        >

                                    <img
                                            class="skill-card__image" :src="getFileName(item)" height="200" width="200"/>
                                    <!--<h5 class="skill-card__title">{{item}}</h5>-->
                                </div>


                            </v-card>





                            <v-card>
                                <v-toolbar dark class="primary">
                                    <v-spacer></v-spacer>
                                    <v-toolbar-title>{{currSkill}}</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    <v-toolbar-items>
                                        <v-btn icon @click.native="dialog = false" dark>
                                            <v-icon>close</v-icon>
                                        </v-btn>
                                    </v-toolbar-items>
                                </v-toolbar>

                            </v-card>
                        </v-dialog>
                    </v-layout>

                    <!--<img :src="getRandomImageUrl()" alt="Not found">-->

                    <!--<div-->
                            <!--@click="(e)=>{skillClicked(item)}"-->
                            <!--class="skill-card card">-->

                        <!--<img-->
                                <!--class="skill-card__image" :src="getFileName(item)" height="200" width="200"/>-->
                        <!--&lt;!&ndash;<h5 class="skill-card__title">{{item}}</h5>&ndash;&gt;-->
                    <!--</div>-->




                    <!--<v-card class="skill-card">-->
                        <!--<v-card-media-->
                                <!--:src="getFileName(item)"-->
                                <!--height="200px"-->
                        <!--&gt;-->
                            <!--<v-container fill-height fluid>-->
                                <!--<v-layout fill-height>-->
                                    <!--<v-flex xs12 align-end flexbox>-->
                                        <!--<span class="headline white&#45;&#45;text" v-text="item"></span>-->
                                    <!--</v-flex>-->
                                <!--</v-layout>-->
                            <!--</v-container>-->
                        <!--</v-card-media>-->
                    <!--</v-card>-->




                </div>




                <!--<div v-for="element in list" :key="element.id"  @click="selected=element">-->
                <!--{{element.name}}-->
                <!--<br>-->
                <!--{{element.id}}-->
                <!--<img :src="element.src" alt="Not found">-->
                <!--</div>-->
            </isotope>

            <!--<v-btn primary dark @click.native="dialog = true">Open Dialog</v-btn>-->


            <!--<div class="containerz">-->
                <!--<img :src="getFileName('angular')" alt="Avatar" class="imagez">-->
                <!--<div class="overlayz">-->
                    <!--<div class="textz">Hello World</div>-->
                <!--</div>-->
            <!--</div>-->


        </v-flex>
    </v-layout>


</template>

<script>

	import axios from 'axios';
	import {random} from 'lodash';
	//	import isotopeLayout from 'isotope-layout'
	import isotope from 'vueisotope'
	import imagesLoaded from 'vue-images-loaded'
	//    import picture from '../'

	export default {
		props: ['nameArr'],
		directives: {
			imagesLoaded
		},
		components: {isotope},
		mounted() {

			//			console.log('this.profileData')
			//			console.log(this.skills)
			//			console.log(isotopeLayout)
			//			console.log(isotope)

			//			GoogleImageSearch.searchImage('javascript').then((data) => {
			//				console.log('sss', data)
			//                this.imgUrl = data[0]
			//			})
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
				dialog: false,
				currSkill: 'joe',
				option: {
					//					getSortData: {
					//						id: "id"
					//					},
					//					sortBy : "id"
				}
			}
		},
		computed: {},
		methods: {
			layout() {
				console.log('layzz', this.$refs)
				this.$refs.grid.layout('masonry');
			},
			getFileName(item) {
				item = item.replace(' ', '-')
				return `../src/assets/skills/${item.toLowerCase()}.png`
			},
			shuffleGrid() {
				this.$refs.grid.shuffle();
			},
			skillClicked(skill) {
				console.log('zz', skill);
				this.currSkill = skill;
//				this.dialog = true;
			}
		}


	}

</script>

<style lang="scss">

    .masonry-grid {
        border: 2px solid red;
        text-align: center;
        margin: 0 auto;
        align-items: center;
    }

    .skill-card {
        /*background: no-repeat center center fixed;*/
        /*height: 200px;*/
        /*width: 200px;*/
        /*border: 1px solid red;*/
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




</style>
