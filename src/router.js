import { createRouter, createWebHistory } from 'vue-router';
import Agents from './views/Agents.vue';
import Tools from './views/Tools.vue';
import Agent from './views/Agent.vue';
import Conversation from './views/Conversation.vue';
import Experts from './views/Experts.vue';

const routes = [
  {
    path: '/',
    name: 'Agents',
    component: Agents,
  },
  {
    path: '/tools',
    name: 'Tools',
    component: Tools,
  },
  {
    path: '/agent/:id',
    name: 'Agent',
    component: Agent,
    props: true,
  },
  {
    path: '/agent/:id/activity/:activityId',
    name: 'Conversation',
    component: Conversation,
    props: true,
  },
  {
    path: '/experts',
    name: 'Experts',
    component: Experts,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 