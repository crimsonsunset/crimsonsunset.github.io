import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/App.vue'
import Vuetify from 'vuetify'
import * as helpers from './helpers'
import 'vuetify/dist/vuetify.min.css'
import './styles/index.scss'

Vue.use(Vuetify);
// Vue.use(VueRouter);

const helpersMixin = Vue.mixin(helpers.default);
Vue.mixin(helpersMixin);

// console.log(helpers.default)

// const routes = [
//     { path: '/foo', component: Foo },
//     { path: '/bar', component: Bar }
// ]
//
// const router = new VueRouter({
//     routes // short for `routes: routes`
// })

new Vue({
    el: '#app',
    // router,
    render: (h) => {
        return h(App)
    }
});
