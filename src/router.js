import { createRouter, createWebHistory } from 'vue-router';
import InsightsLayout from './views/InsightsLayout.vue';
import InsightsTopics from './views/InsightsTopics.vue';
import InsightsSentiment from './views/InsightsSentiment.vue';
import InsightsPerformance from './views/InsightsPerformance.vue';
import InsightsActivity from './views/InsightsActivity.vue';
import Agents from './views/Agents.vue';
import Tools from './views/Tools.vue';
import AgentLayout from './views/AgentLayout.vue';
import AgentWorkbench from './views/AgentWorkbench.vue';
import AgentVersions from './views/AgentVersions.vue';
import AgentInsights from './views/AgentInsights.vue';
import AgentActivity from './views/AgentActivity.vue';
import Conversation from './views/Conversation.vue';
import Experts from './views/Experts.vue';
import ExpertLayout from './views/ExpertLayout.vue';
import ExpertActivity from './views/ExpertActivity.vue';
import ExpertWorkbench from './views/ExpertWorkbench.vue';
import ExpertInsights from './views/ExpertInsights.vue';
import ExpertVersions from './views/ExpertVersions.vue';
import AgentCreation from './views/AgentCreation.vue';

const routes = [
    {
        path: '/insights',
        component: InsightsLayout,
        children: [
            {
                path: '',
                name: 'InsightsTopicsDefault',
                component: InsightsTopics,
            },
            {
                path: 'topics',
                name: 'InsightsTopics',
                component: InsightsTopics,
            },
            {
                path: 'sentiment',
                name: 'InsightsSentiment',
                component: InsightsSentiment,
            },
            {
                path: 'performance',
                name: 'InsightsPerformance',
                component: InsightsPerformance,
            },
            {
                path: 'activity',
                name: 'InsightsActivity',
                component: InsightsActivity,
            },
        ],
    },
    {
        path: '/',
        name: 'Agents',
        component: Agents,
    },
    {
        path: '/agents/new',
        name: 'AgentCreation',
        component: AgentCreation,
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
                name: 'AgentActivityDefault',
                component: AgentActivity,
            },
            {
                path: 'workbench',
                name: 'AgentWorkbench',
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
    {
        path: '/expert/:id',
        component: ExpertLayout,
        children: [
            {
                path: '',
                name: 'ExpertActivityDefault',
                component: ExpertActivity,
            },
            {
                path: 'activity',
                name: 'ExpertActivity',
                component: ExpertActivity,
            },
            {
                path: 'workbench',
                name: 'ExpertWorkbench',
                component: ExpertWorkbench,
            },
            {
                path: 'insights',
                name: 'ExpertInsights',
                component: ExpertInsights,
            },
            {
                path: 'versions',
                name: 'ExpertVersions',
                component: ExpertVersions,
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
