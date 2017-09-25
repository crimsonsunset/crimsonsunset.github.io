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
			return sample(funIcons);
		},
		getActiveStatus(){
			return (!this.settingsObj.isLoaded) ? 'is-active' : '';
		},
		getToken(key) {return tokens[key]},
		getIntroSteps(that) {
			return introSteps
		},


		//testers
		isURL(str) {
			const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
			const regex = new RegExp(expression);
			return str.match(regex);
		},

		//general use functions
		emitEvent(event, payload) {
			// console.log('about to emiz', event, payload)
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
		getPageInfo() {
			let routeArr = this.getRouteName().split(' | ');
			let [routeBase, routeHash] = routeArr;

			//if routehash is empty string, its the first time on resume page
			// routeHash = (routeHash == '') ? 'Experience' : routeHash;

			// if (routeHash == '') {
			// 	routeHash = 'Experience';
			//
			// 	this.$router.push(`/${routeBase}#${routeHash}`)
			// }

			const ret = (routeHash) ? pageInfoObj[routeBase][routeHash] : pageInfoObj[routeBase];
			// console.log('ret', routeBase, routeHash)
			// console.log(ret)
			return ret;

		},
		getRouteName(e) {
			const {$route} = this;
			let routeName = $route.path.substring(1);

			if (routeName == '') {
				routeName = 'Welcome!'
			} else if(routeName.includes('Resume')) {
				const hash = $route.hash.substring(1);
				routeName += ` | ${hash}`
			}
			return routeName;
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

const funIcons = [
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
];
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
const pageInfoObj = {
	'Welcome!': 'This is a landing page featuring a typer component. It lists out some information about who I am, and what interests me.',
	'Resume': {
		Experience: `Information about Jobs I've held, and the responsibilities therein. Click on a card to learn more.`,
		Projects: `Information about projects I've worked on, and specific technologies used in each. Click on a card to learn more.`,
		Skills: `A listing of Technologies I'm familiar with, showcased in a interactive masonry grid list component. Click on a tile to learn more about that technology.`,
		References: `A listing of recommendations I've received from my Peers. Click on a listing to read the content.`,
		Education: `A parallax-style view of the schools I've attended. Click on the school icon for a surprise.`
	},
	'About': 'A step-list component that has even more information regarding my background. The content here is meant to be only semi-serious =)',
	'Contact': 'A form that will allow you to contact me directly',
	'Documentation': 'Here you will find Swagger-style API documentation for the Express server that powers this website.'
}
