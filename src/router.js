import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import MealSuggestion from './components/MealSuggestion.vue';

const routes = [
  { path: '/', 
    component: HomePage },
  {
    path: '/meal-suggestion',
    name: 'MealSuggestion',
    component: MealSuggestion,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
