<template>
    <div class="agents-content">
        <div class="agents-toolbar">
            <div class="toolbar-start">
                <input type="search" placeholder="Search agents" />
            </div>
            <div class="toolbar-end">
                <button @click="$router.push('/agents/new/visual')">New agent (n-2-n)</button>
            </div>
        </div>

        <AgentsSummary />

        <div class="agent-list">
            <AgentItem v-for="agent in agents" :key="agent.id" :agent="agent" />
        </div>
    </div>
</template>

<script setup>
    import { agents } from '@/data/agents.js';
    import AgentItem from '@/components/AgentItem.vue';
    import AgentsSummary from '@/components/AgentsSummary.vue';
</script>

<style scoped>
    .agents-content {
        display: flex;
        flex-direction: column;
        gap: var(--space-l);
        padding: var(--space-m);
    }

    .agents-toolbar {
        display: flex;
        justify-content: space-between;
        gap: var(--space-s);
    }

    .agent-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: var(--space-s);
    }
</style>
