<template>

    <v-layout row wrap>
        <v-flex xs12 sm8 offset-sm2>
            GRIDDZZ

            <!--<div v-lazy:background-image="'https://www.fillmurray.com/600/400'"></div>-->

            <!--<img class="mini-cover" :src="'https://www.fillmurray.com/600/400'" width="100%" height="400">-->

            <div v-lazy:background-image="imgUrl"></div>

        </v-flex>
    </v-layout>


</template>

<script>

	import axios from 'axios';


	class GoogleImageSearch {

		searchImage(query) {
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

		googleGetMobile(images) {

			// Transforms DOM NodeList of images into Array.
			// Needed to use .map method
			images = Array.from(images.childNodes)

			// Maps Image Sources
			return images.map((imgDiv) => {
				console.log(imgDiv.getAttribute("href"));
				return imgDiv.childNodes[0].src
			})
		}

		googleGetDesktop(images) {

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
		props: ['themeColor', 'name', 'profileData'],
		mounted() {
			GoogleImageSearch.searchImage('javascript').then((data) => {
				console.log('sss', data)
                this.imgUrl = data[0]
			})
		},
		data() {
			return {
				imgUrl: ''
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
