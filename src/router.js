import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import ShoppingCart from './components/ShoppingCart.vue';

const routes = [
  {
    path: '/Alchemy-Restaurant',  // Main route
    name: 'Alchemy-Restaurant',
    component: App, // The main route now points to App.vue
  },
  {
    path: '/Alchemy-Restaurant/shopping-cart',
    name: '/Alchemy-Restaurant/ShoppingCart',
    component: ShoppingCart, // Route for the cart
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
