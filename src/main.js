const { createApp } = require('vue');
const App = require('./App.vue');
const store = require('./components/store/index.js');
require('./assets/css/main.css');

createApp(App).use(store).mount('#app');

