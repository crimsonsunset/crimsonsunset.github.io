import * as Views from '../components/views'

export default [
    {
        path: '/',
        component: Views.Home,
        icon: 'home',
        label: 'Home'
    },
    {
        path: '/About',
        component: Views.About,
        icon: 'android',
        label: 'About'
    },
    {
        path: '/Contact',
        component: Views.Contact,
        icon: 'phone',
        label: 'Contact'
    },
    // {
    //     path: '/Projects',
    //     component: Views.Projects,
    //     icon: 'build',
    //     label: 'Projects'
    // },
    {
        path: '/Resume',
        component: Views.Resume,
        icon: 'assignment',
        label: 'Resume'
    }
];