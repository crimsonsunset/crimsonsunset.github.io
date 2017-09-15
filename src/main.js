import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/App.vue'
import routes from './config/routes'
import Vuetify from 'vuetify'
import 'babel-polyfill'
import * as helpers from './helpersMixin'
import {printBuildInfo} from './helpers'
import 'vuetify/dist/vuetify.min.css'
import './styles/index.scss'
import 'animate.css/animate.min.css'
import store from 'store'

Vue.use(Vuetify);
Vue.use(VueRouter);

const helpersMixin = Vue.mixin(helpers.default);
Vue.mixin(helpersMixin);
Object.defineProperty(Vue.prototype, '$store', {value: store});

//set up the environment variables
const {environment} = build.info;
Object.defineProperty(Vue.prototype, '$env', {value: environment});
Object.defineProperty(Vue.prototype, '$endpoints', {
	value: {
		info: (environment == "DEVELOPMENT")? 'http://localhost:3000/api/v1/info/': 'https://crimsonsunset-portfolio.herokuapp.com/api/v1/info/',
		scrape: (environment == "DEVELOPMENT")? 'http://localhost:3000/api/v1/scrape/': 'https://crimsonsunset-portfolio.herokuapp.com/api/v1/scrape/'
	}
});

const router = new VueRouter({
	mode: 'history',
	routes
});

//stamp the build
printBuildInfo();

// router.afterEach((to, from, next) => {
// 	console.log(to)
// 	console.log(this)
// 	// next();
// })

const main = new Vue({
	el: '#app',
	router,
	render: (h) => {
		return h(App)
	}
});