<template>
    <div class="agent-insights">
        <AgentSummary :agent="agent" />
        <p>
            Insights about the agent's performance, activity, history, and more.
        </p>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { agents } from '@/data/agents.js';
    import AgentSummary from '@/components/AgentSummary.vue';

    const route = useRoute();
    const agentId = computed(() => Number(route.params.id));
    const agent = computed(() => agents.find((a) => a.id === agentId.value));
</script>

<style scoped>
    .agent-insights {
        padding: var(--space-m);
        display: flex;
        flex-direction: column;
        gap: var(--space-l);
    }
</style>
