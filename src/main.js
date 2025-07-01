import { createApp } from 'vue';
import '@/assets/base.css';
import '@/assets/color.css';
import '@/assets/space.css';
import '@/assets/type.css';
import '@/assets/transition.css';
import '@/assets/shadow.css';

import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');
