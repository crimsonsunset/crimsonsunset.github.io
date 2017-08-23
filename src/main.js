import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/App.vue'
import routes from './config/routes'
import Vuetify from 'vuetify'
import VueLazyload from 'vue-lazyload'
import * as helpers from './helpers'
import 'vuetify/dist/vuetify.min.css'
import './styles/index.scss'

// import 'vue2-animate/dist/vue2-animate.min.css'
import 'animate.css/animate.min.css'
// require('vue2-animate/dist/vue2-animate.min.css')

Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.use(VueLazyload, {
	preLoad: 1.3,
	error: 'https://www.fillmurray.com/100/100',
	loading: 'https://www.fillmurray.com/600/400',
	attempt: 1
});
// Vue.use(VueLazyload)

const helpersMixin = Vue.mixin(helpers.default);
Vue.mixin(helpersMixin);

const router = new VueRouter({
    mode: 'history',
    routes
})

new Vue({
    el: '#app',
    router,
    render: (h) => {
        return h(App)
    }
});
