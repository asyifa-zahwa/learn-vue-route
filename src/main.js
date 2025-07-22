import { createApp } from 'vue'
//import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import About from './components/About.vue'
import ProductDetail from './components/ProductDetail.vue'
import NotFound from './components/NotFound.vue'
import ProductSearch from './components/ProductSearch.vue'
// import UserOrder from './components/UserOrder.vue'
// import User from './components/User.vue'
// import UserProfile from './components/UserProfile.vue'
// import UserWishlist from './components/UserWishlist.vue'
// import UserHeader from './components/UserHeader.vue'
// import UserOrderFooter from './components/UserOrderFooter.vue'
// import UserWishlistFooter from './components/UserWishlistFooter.vue'
// import UserProfileFooter from './components/UserProfileFooter.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
        path: '/',
        name: 'Home',
        component: Home,
        props: {
            title: 'Home' // Pass props to Home component
        }
    },
    {
        path: '/about',
        name: 'About',
        component: About,
        sensitive: true, // Case-sensitive route
    },
    {
        path: '/products/search',
        name: 'ProductSearch',
        component: ProductSearch,
        props: (route) => ({ search: route.query.search }), // Pass query params as
    },
    {
        path: '/products/search/:query',
        name: 'ProductSearchQuery',
        redirect: to => {
            return { name: 'ProductSearch', query: { search: to.params.query } };
        },
    },
    {
        path: '/products/:id(\\d+)?',
        name: 'ProductDetail',
        component: ProductDetail,
        props: true, // Enable route params as props
    },
    {
        path: '/users',
        name: 'User',
        component : () => import('./components/User.vue'),
        children: [
            {
                path: '',
                components: {
                    header: () => import('./components/UserHeader.vue'),
                    default: () => import('./components/UserProfile.vue'),
                    footer: () => import('./components/UserProfileFooter.vue'),
                },
            },
            {
                path: 'profile',
                name: 'UserProfile',
                components: {
                    header: () => import('./components/UserHeader.vue'),
                    default: () => import('./components/UserProfile.vue'),
                    footer: () => import('./components/UserProfileFooter.vue'),
                },
            },
            {
                path: 'wishlist',
                name: 'UserWishlist',
                components: {
                    header: () => import('./components/UserHeader.vue'),
                    default: () => import('./components/UserWishlist.vue'),
                    footer: () => import('./components/UserWishlistFooter.vue'),
                },
            },
            {   
                path: 'orders',
                name: 'UserOrder',
                components: {
                    header: () => import('./components/UserHeader.vue'),
                    default: () => import('./components/UserOrder.vue'),
                    footer: () => import('./components/UserOrderFooter.vue'),
                },
            },
        ],
    },
    {
        path: '/home',
        redirect: '/',
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        beforeEnter: (to, from, next) => {
            console.warn(`Route not found: ${to.fullPath}`);
            next();
        }
    },
  ],
});
router.beforeEach((to, from, next) => {
    // Example of a global guard
    console.log(`Navigating from ${from.fullPath} to ${to.fullPath}`);
    next();
});
router.afterEach((to, from) => {
    // Example of an after hook
    console.log(`Navigation completed from ${from.fullPath} to ${to.fullPath}`);
});
router.onError((error) => {
    console.error('Router error:', error);
    // Handle the error, e.g., show a notification or redirect to an error page
    router.push({ name: 'NotFound' });
});
createApp(App).use(router).mount('#app')
