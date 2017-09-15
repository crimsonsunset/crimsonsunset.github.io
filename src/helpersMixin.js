import {get, sortBy} from 'lodash'
import tokens from './config/tokens.json'

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
		isURL(str) {
			const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
			const regex = new RegExp(expression);
			return str.match(regex);
		},
		getToken(key) {return tokens[key]},
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
	},
}

const animationNames = sortBy([
	"bounce",
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
	"slideOutUp"]);