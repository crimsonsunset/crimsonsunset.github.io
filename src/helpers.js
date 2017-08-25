import {get, sortBy} from 'lodash'

export default {
	methods: {
		getSassConfig(key) {
			const fullConfig = JSON.parse(JSON.parse(window.getComputedStyle(
				document.getElementById('sassData'), '::before'
			).content));
			return get(fullConfig, [key]) || {}
		},
		getAnimationNames() {
			return animationNames;
		},
		emitEvent(event, payload) {
			console.log('emitz', event, payload)
			this.$emit(event, payload);
		},
		scrollToTop() {
			const scrollDuration = 500;
			const scrollStep = -window.scrollY / (scrollDuration / 15),
				scrollInterval = setInterval(function () {
					if (window.scrollY != 0) {
						window.scrollBy(0, scrollStep);
					}
					else clearInterval(scrollInterval);
				}, 15);
		},
		GoogleImageSearch: {

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
			},

			googleGetMobile(images) {

				// Transforms DOM NodeList of images into Array.
				// Needed to use .map method
				images = Array.from(images.childNodes)

				// Maps Image Sources
				return images.map((imgDiv) => {
					console.log(imgDiv.getAttribute("href"));
					return imgDiv.childNodes[0].src
				})
			},

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
	}
}

const animationNames = sortBy(["bounce",
	"flash",
	"pulse",
	"rubberBand",
	"shake",
	"headShake",
	"swing",
	"tada",
	"wobble",
	"jello",
	"bounceIn",
	"bounceInDown",
	"bounceInLeft",
	"bounceInRight",
	"bounceInUp",
	"bounceOut",
	"bounceOutDown",
	"bounceOutLeft",
	"bounceOutRight",
	"bounceOutUp",
	"fadeIn",
	"fadeInDown",
	"fadeInDownBig",
	"fadeInLeft",
	"fadeInLeftBig",
	"fadeInRight",
	"fadeInRightBig",
	"fadeInUp",
	"fadeInUpBig",
	"fadeOut",
	"fadeOutDown",
	"fadeOutDownBig",
	"fadeOutLeft",
	"fadeOutLeftBig",
	"fadeOutRight",
	"fadeOutRightBig",
	"fadeOutUp",
	"fadeOutUpBig",
	"flipInX",
	"flipInY",
	"flipOutX",
	"flipOutY",
	"lightSpeedIn",
	"lightSpeedOut",
	"rotateIn",
	"rotateInDownLeft",
	"rotateInDownRight",
	"rotateInUpLeft",
	"rotateInUpRight",
	"rotateOut",
	"rotateOutDownLeft",
	"rotateOutDownRight",
	"rotateOutUpLeft",
	"rotateOutUpRight",
	"hinge",
	"jackInTheBox",
	"rollIn",
	"rollOut",
	"zoomIn",
	"zoomInDown",
	"zoomInLeft",
	"zoomInRight",
	"zoomInUp",
	"zoomOut",
	"zoomOutDown",
	"zoomOutLeft",
	"zoomOutRight",
	"zoomOutUp",
	"slideInDown",
	"slideInLeft",
	"slideInRight",
	"slideInUp",
	"slideOutDown",
	"slideOutLeft",
	"slideOutRight",
	"slideOutUp"])