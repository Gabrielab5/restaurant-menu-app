import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import MealSuggestion from './components/MealSuggestion.vue';
import ShoppingCart from './components/ShoppingCart.vue';

const routes = [
  { path: '/', 
    component: HomePage },
  {
    path: '/meal-suggestion',
    name: 'MealSuggestion',
    component: MealSuggestion,
  },
  {
    path: '/shopping-cart',
    name: 'ShoppingCart',
    component: ShoppingCart,
  },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
