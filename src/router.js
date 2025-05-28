import { createRouter, createWebHistory } from 'vue-router';
import Assistants from './views/Assistants.vue';
import Tools from './views/Tools.vue';
import Assistant from './views/Assistant.vue';
import Workflows from './views/Workflows.vue';

const routes = [
  {
    path: '/',
    name: 'Assistants',
    component: Assistants,
  },
  {
    path: '/tools',
    name: 'Tools',
    component: Tools,
  },
  {
    path: '/assistant/:id',
    name: 'Assistant',
    component: Assistant,
    props: true,
  },
  {
    path: '/workflows',
    name: 'Workflows',
    component: Workflows,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 