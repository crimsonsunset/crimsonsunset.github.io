<template>
    <!--<h2> Resume</h2>-->

    <section>

        <!--<v-btn-->
        <!--flat dark-->
        <!--:class="[`${'black'}&#45;&#45;text`, 'text&#45;&#45;lighten-2']"-->
        <!--@click.native="(e)=>{-->
        <!--test(e);-->
        <!--//                	GoogleImageSearch.searchImage('dog').then((e)=>{-->
        <!--//                		console.log('sss', e)-->
        <!--//                	})-->
        <!--}"-->
        <!--&gt;-->
        <!--<span>zff</span>-->
        <!--</v-btn>-->

        <v-container fluid class="mt-5 resume-view">

            <v-layout row wrap>
                <v-flex xs12 sm8 offset-sm2>
                    <v-card
                            v-for="(item,i) in profileData.experience"
                            flat light
                            :class="['mb-3',`${themeColor}--text`, `${themeColor} lighten-4`, 'text--darken-3', 'elevation-2']"
                            :key="item.company"
                            :value="currNavItem === item.name"
                            :data-company="item.company"
                            @click="(e)=>{
                                   	//toggleResumeCard(e.target.parentElement.dataset.company);
                                   }"
                    >

                        <v-card-title primary-title>

                                <div class="headline full-width">{{item.title}}</div>

                                <v-layout fluid class="full-width grey--text">
                                    <v-flex xs8 >
                                        <div
                                                >{{item.company}}
                                        </div>
                                    </v-flex>

                                    <v-flex xs4>
                                        <div
                                                class="text-align--right">{{item.timeFrame}}
                                        </div>
                                    </v-flex>
                                </v-layout>

                        </v-card-title>
                        <v-card-actions>

                            <v-spacer></v-spacer>
                            <v-btn
                                    icon
                                    :id="`${item.company}`"
                                    @click.native="(e)=>{
                                   	toggleResumeCard(e.target.parentElement.id);
                                   }"
                            >
                                <v-icon>{{ (expandedItem == item.company) ? 'keyboard_arrow_down' : 'keyboard_arrow_up'
                                    }}
                                </v-icon>
                            </v-btn>
                        </v-card-actions>
                        <v-slide-y-transition>
                            <v-card-text v-show="expandedItem == item.company">

                                <ul>
                                    <li
                                            v-for="(descItem,i2) in item.descArr"
                                            flat
                                            light
                                            :class="['mb-2',`${themeColor}--text`, 'text--darken-4']"
                                            :key="descItem"
                                    >
                                        {{descItem}}
                                    </li>
                                </ul>
                            </v-card-text>
                        </v-slide-y-transition>

                    </v-card>

                </v-flex>
            </v-layout>

        </v-container>

        <v-flex
                fixed
                bottom
                row xs12 class="resume-view__nav">


            <v-card class="resume-view__nav">
                <v-bottom-nav
                        value="true" class="white">
                    <v-btn
                            v-for="(item,i) in navItems"
                            flat light
                            :class="[`${themeColor}--text`, 'text--lighten-2']"
                            :key="item.name"
                            :id="`${item.name}`"
                            @click.native="(e)=>{toggleResumeNavItem(e.target.parentElement.id)}"
                            :value="currNavItem === item.name"
                    >
                        <span>{{item.name}}</span>
                        <v-icon>{{item.icon}}</v-icon>
                    </v-btn>

                </v-bottom-nav>
            </v-card>
        </v-flex>

    </section>

</template>

<script>

	import axios from 'axios'
	import {profileData} from '../../config/joeInfo.json'

	class GoogleImageSearch {

		static searchImage(query) {
			query = encodeURIComponent(query)

			return new Promise((resolve, reject) => {

				// Fetches Items from Google Image Search URL
				fetch("https://cors-anywhere.herokuapp.com/https://www.google.com/search?source=lnms&sa=X&gbv=1&tbm=isch&q=" + query)
					.then(res => res.text())
					.then(res => {

						// Transforms HTML string into DOM object
						let parser = new DOMParser()
						parser = parser.parseFromString(res, "text/html")

						// Gets DOM element with image results
						let images = parser.getElementById("ires").childNodes[0]

						if (images.nodeName === "DIV") {

							resolve(this.googleGetMobile(images))
						} else if (images.nodeName === "TABLE") {

							resolve(this.googleGetDesktop(images))
						} else {

							reject("Unknown System")
						}

					})
					.catch(err => reject(err))
			})
		}

		static googleGetMobile(images) {

			// Transforms DOM NodeList of images into Array.
			// Needed to use .map method
			images = Array.from(images.childNodes)

			// Maps Image Sources
			return images.map((imgDiv) => {
				console.log(imgDiv.getAttribute("href"));
				return imgDiv.childNodes[0].src
			})
		}

		static googleGetDesktop(images) {

			// NodeList of table rows
			images = images.childNodes[0].childNodes

			// Empty List of image URLs
			let imgSrc = []

			// Traverses table node for images
			images.forEach((tRow) => {
				tRow = tRow.childNodes
				tRow.forEach((tCol) => {
					let aLink = tCol.childNodes[0].childNodes[0]
					imgSrc.push(aLink.src)
				})
			})

			return imgSrc
		}

	}

	export default {
		props: ['themeColor', 'toTop'],
		mounted() {
			let {experience} = profileData;
			experience = experience.map((e, i) => {

				const splitDescription = (description) => {
					let descArr = description.split('•').slice(1)
					//					descArr = descArr.map((e) => `•${e}`).slice(1);
					return descArr
				};

				e.descArr = splitDescription(e.description);
				return e;
			});
			profileData.experience = experience;
			this.profileData = profileData;


		},
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
			toggleResumeNavItem(itemName) {
				this.currNavItem = itemName;
			},
			toggleResumeCard(itemName) {

				if (itemName == this.expandedItem) {
					this.expandedItem = '';
				} else {
					this.expandedItem = itemName;
				}
			},
			test(itemName) {
				GoogleImageSearch.searchImage('javascript').then((e) => {
					console.log('d', e)
				})
			}
		}

	}


	//
	// Copyright (c) 2017 by Fedir Bobylev. All Rights Reserved.
	//


</script>

<style lang="scss">

    $resumeHeight: 88vh !important;
    $bw: 2px;

    .border {
        border: $bw solid green;
    }

    .resume-view {
        //border: $bw solid red;
        //min-height: $resumeHeight;

        &__nav {
            margin-top: -3vh;
            //border: $bw solid red;
        }

    }

    .resume-nav {

        color: black
    }


</style>
