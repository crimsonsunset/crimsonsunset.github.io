import Vue from 'vue'
import App from './components/App.vue'
// import App from './components/App/App.vue'
// import './components/App/app.scss'

new Vue({
    el: '#app',
    render: (h) => {
        return h(App)
    }
});
