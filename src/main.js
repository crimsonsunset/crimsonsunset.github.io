import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/App.vue'
import Vuetify from 'vuetify'
import * as helpers from './helpers'
import 'vuetify/dist/vuetify.min.css'
import './styles/index.scss'

// import Home from './components/views/Home.vue'
// import About from './components/views/About.vue'
// import Contact from './components/views/Contact.vue'

Vue.use(Vuetify);
// Vue.use(VueRouter);

const helpersMixin = Vue.mixin(helpers.default);
Vue.mixin(helpersMixin);

// console.log(helpers.default)
//
// const routes = [
//     // { path: '/', component: Home },
//     { path: '/about', component: About },
//     { path: '/contact', component: Contact }
// ]
//
// // const routes = [
// //     {
// //         path: '/',
// //         components: {
// //             default: Home,
// //             a: C1,
// //             b: C2
// //         }
// //     },
// //     {
// //         path: '/other',
// //         components: {
// //             default: Baz,
// //             a: C1
// //         }
// //     }
// // ]
//
//
// const router = new VueRouter({
//     mode: 'history',
//     routes // short for `routes: routes`
// })

new Vue({
    el: '#app',
    // router,
    render: (h) => {
        return h(App)
    }
});
