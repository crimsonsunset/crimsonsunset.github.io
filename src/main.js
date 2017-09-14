import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/App.vue'
import routes from './config/routes'
import Vuetify from 'vuetify'
import 'babel-polyfill'
import * as helpers from './helpers'
import 'vuetify/dist/vuetify.min.css'
import './styles/index.scss'
import 'animate.css/animate.min.css'

Vue.use(Vuetify);
Vue.use(VueRouter);

const helpersMixin = Vue.mixin(helpers.default);
Vue.mixin(helpersMixin);

const router = new VueRouter({
	mode: 'history',
	routes
});

new Vue({
    el: '#app',
    router,
    render: (h) => {
        return h(App)
    }
});
