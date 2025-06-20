import { createRouter, createWebHistory } from 'vue-router';
import Agents from './views/Agents.vue';
import Tools from './views/Tools.vue';
import AgentLayout from './views/AgentLayout.vue';
import AgentWorkbench from './views/AgentWorkbench.vue';
import AgentVersions from './views/AgentVersions.vue';
import AgentInsights from './views/AgentInsights.vue';
import AgentActivity from './views/AgentActivity.vue';
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
    component: AgentLayout,
    children: [
      {
        path: '',
        name: 'AgentWorkbench',
        component: AgentWorkbench,
      },
      {
        path: 'workbench',
        name: 'AgentWorkbenchAlt',
        component: AgentWorkbench,
      },
      {
        path: 'versions',
        name: 'AgentVersions',
        component: AgentVersions,
      },
      {
        path: 'insights',
        name: 'AgentInsights',
        component: AgentInsights,
      },
      {
        path: 'activity',
        name: 'AgentActivity',
        component: AgentActivity,
      },
      {
        path: 'activity/:activityId',
        name: 'Conversation',
        component: Conversation,
        props: true,
      },
    ],
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