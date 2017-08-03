import Vue from 'vue'
import App from './components/App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);

new Vue({
    el: '#app',
    render: (h) => {
        return h(App)
    }
});
