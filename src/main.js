import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { useCartStore } from './store';

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);

const cartStore = useCartStore();
cartStore.fetchMenu(); // Preload menu data

app.mount('#app');
