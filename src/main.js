import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Ensure correct path to your router.js file

const app = createApp(App);
app.use(router);
app.mount('#app');