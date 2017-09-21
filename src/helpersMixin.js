import {get, sortBy, sample} from 'lodash'
import tokens from './config/tokens.json'

export default {
	methods: {
		//getters [mainly config]
		getSassConfig(key) {
			const fullConfig = JSON.parse(JSON.parse(window.getComputedStyle(
				document.getElementById('sassData'), '::before'
			).content));
			return get(fullConfig, [key]) || {}
		},
		getAnimationNames() {
			return animationNames;
		},
		getFunIcon() {
			return sample([
				'android',
				'bug_report',
				'favorite',
				'important_devices',
				'language',
				'thumb_up',
				'trending_up',
				'games',
				'ring_volume',
				'vpn_key',
				'monetization_on',
				'insert_emoticon',
				'toys',
				'videogame_asset',
				'directions_run',
				'local_drink',
				'local_hotel',
				'local_pizza',
				'airline_seat_legroom_reduced',
				'fitness_center',
				'ac_unit',
				'star',
			]);
		},
		getActiveStatus(){
			return (!this.settingsObj.isLoaded) ? 'is-active' : '';
		},
		getToken(key) {return tokens[key]},
		getIntroSteps() {
			return {
				steps: [
					{
						intro: "Hello world!"
					},
					{
						element: document.querySelector('#step1'),
						intro: "This is a tooltip."
					},
					{
						element: document.querySelectorAll('#step2')[0],
						intro: "Ok, wasn't that fun?",
						position: 'right'
					},
					{
						element: '#step3',
						intro: 'More features, more fun.',
						position: 'left'
					},
					{
						element: '#step4',
						intro: "Another step.",
						position: 'bottom'
					},
					{
						element: '#step5',
						intro: 'Get it, use it.'
					}
				]
			}
		},


		//testers
		isURL(str) {
			const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
			const regex = new RegExp(expression);
			return str.match(regex);
		},

		//general use functions
		emitEvent(event, payload) {
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
		openLink(link, stay){
			if (stay) {
				this.$router.push(link)
			} else {
				window.open(link)
			}
		}
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