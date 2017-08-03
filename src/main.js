import Vue from 'vue'
import App from './components/App.vue'
import Vuetify from 'vuetify'
import * as helpers from './helpers'
import 'vuetify/dist/vuetify.min.css'
import './styles/index.scss'

Vue.use(Vuetify);

const helpersMixin = Vue.mixin(helpers.default);
Vue.mixin(helpersMixin);

// console.log(helpers.default)


new Vue({
    el: '#app',
    render: (h) => {
        return h(App)
    }
});
