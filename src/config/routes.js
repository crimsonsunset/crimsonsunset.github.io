import * as Views from '../components/views'
import {mapValues} from 'lodash'

//add listener for location to each route
const decoratedViews = mapValues(Views, (e, i) => {
    return {
        ...e,
		beforeRouteEnter (to, from, next) {
			next((vm) => {
				if (vm.settingsObj.rememberLocation) {
					vm.$store.set('location', vm.$route.path)
				}
			});
		}
    };
});

export default [
    {
        path: '/',
        component: decoratedViews.Home,
        icon: 'home',
        label: 'Home'
    },
	{
		path: '/Resume',
		component: decoratedViews.Resume,
		icon: 'assignment',
		label: 'Resume'
	},
    {
        path: '/About',
        component: decoratedViews.About,
        icon: 'android',
        label: 'About',
    },
    {
        path: '/Contact',
        component: decoratedViews.Contact,
        icon: 'phone',
        label: 'Contact'
    },
	{
		path: '/Documentation',
		component: Views.Docs,
		icon: 'info',
		label: 'API Documentation'
	}
];