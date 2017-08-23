<template>

            <v-layout row wrap>
                <v-flex xs12 sm8 offset-sm2>
                    <v-card
                            v-for="(item,i) in profileData[this.name]"
                            flat light
                            :class="['mb-3',`${themeColor}--text`, `${themeColor} lighten-4`, 'text--darken-3', 'elevation-2']"
                            :key="item[item.key]"
                            :value="name === item.name"
                            :data-key="item[item.key]"
                            @click="(e)=>{
                                   	//toggleResumeCard(e.target.parentElement.dataset.company);
                                   }"
                    >

                        <v-card-title primary-title>

                                <div class="headline full-width">{{item.title}}</div>

                                <v-layout fluid class="full-width grey--text">
                                    <v-flex
                                            v-if="item.company"
                                            xs8 >
                                        <div
                                                >{{item.company}}
                                        </div>
                                    </v-flex>

                                    <v-flex
                                            v-if="item.timeFrame"
                                            xs4>
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
                                    :id="`${item[item.key]}`"
                                    @click.native="(e)=>{
                                   	toggleResumeCard(e.target.parentElement.id);
                                   }"
                            >
                                <v-icon>{{ (expandedItem == item[item.key]) ? 'keyboard_arrow_down' : 'keyboard_arrow_up'
                                    }}
                                </v-icon>
                            </v-btn>
                        </v-card-actions>
                        <v-slide-y-transition>
                            <v-card-text v-show="expandedItem == item[item.key]">

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


</template>

<script>

	import axios from 'axios'
//	import {profileData} from '../config/joeInfo.json'

//	class GoogleImageSearch {
//
//		static searchImage(query) {
//			query = encodeURIComponent(query)
//
//			return new Promise((resolve, reject) => {
//
//				// Fetches Items from Google Image Search URL
//				fetch("https://cors-anywhere.herokuapp.com/https://www.google.com/search?source=lnms&sa=X&gbv=1&tbm=isch&q=" + query)
//					.then(res => res.text())
//					.then(res => {
//
//						// Transforms HTML string into DOM object
//						let parser = new DOMParser()
//						parser = parser.parseFromString(res, "text/html")
//
//						// Gets DOM element with image results
//						let images = parser.getElementById("ires").childNodes[0]
//
//						if (images.nodeName === "DIV") {
//
//							resolve(this.googleGetMobile(images))
//						} else if (images.nodeName === "TABLE") {
//
//							resolve(this.googleGetDesktop(images))
//						} else {
//
//							reject("Unknown System")
//						}
//
//					})
//					.catch(err => reject(err))
//			})
//		}
//
//		static googleGetMobile(images) {
//
//			// Transforms DOM NodeList of images into Array.
//			// Needed to use .map method
//			images = Array.from(images.childNodes)
//
//			// Maps Image Sources
//			return images.map((imgDiv) => {
//				console.log(imgDiv.getAttribute("href"));
//				return imgDiv.childNodes[0].src
//			})
//		}
//
//		static googleGetDesktop(images) {
//
//			// NodeList of table rows
//			images = images.childNodes[0].childNodes
//
//			// Empty List of image URLs
//			let imgSrc = []
//
//			// Traverses table node for images
//			images.forEach((tRow) => {
//				tRow = tRow.childNodes
//				tRow.forEach((tCol) => {
//					let aLink = tCol.childNodes[0].childNodes[0]
//					imgSrc.push(aLink.src)
//				})
//			})
//
//			return imgSrc
//		}
//
//	}

	export default {
		props: ['themeColor', 'name', 'profileData'],
		mounted() {
			console.log(this)
		},
        data() {
			return {
				expandedItem: ''
			}
		},
		computed: {},
		methods: {
			toggleResumeCard(itemName) {
				console.log('toggz', itemName)
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

</script>

<style lang="scss">


</style>
