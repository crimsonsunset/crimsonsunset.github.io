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

//use our main framework libraries
Vue.use(Vuetify);
Vue.use(VueRouter);

//import global functions to all components
const helpersMixin = Vue.mixin(helpers.default);
Vue.mixin(helpersMixin);

//set up the environment variables
const {environment} = build.info;
const localhostBase = 'http://localhost:3000/api/v0/';
const remoteBase = 'https://resume.joesangiorgio.com/api/v0/';

// Use localhost in development (Vite dev server), remote in production
const isDev = import.meta.env.DEV;
const apiBase = isDev ? localhostBase : remoteBase;

console.log('🔧 Environment:', {isDev, apiBase, viteMode: import.meta.env.MODE});

Object.defineProperty(Vue.prototype, '$env', {value: environment});
Object.defineProperty(Vue.prototype, '$endpoints', {
	value: {
		base: `${apiBase}`,
		info: `${apiBase}info/`,
		scrape: `${apiBase}scrape/`
	}
});

//add a localStorage store
Object.defineProperty(Vue.prototype, '$store', {value: store});

const router = new VueRouter({
	mode: 'history',
	routes
});

//stamp the build
printBuildInfo();

//cute aliases [mainly for tour feature]
window.$ = document.querySelector.bind(document);
window.$all = document.querySelectorAll.bind(document);

const main = new Vue({
	el: '#app',
	router,
	render: (h) => {
		return h(App)
	}
});
