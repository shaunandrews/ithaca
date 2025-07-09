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

    .agent-tools {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-xs);
    }

    .tool-item {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        font-size: var(--font-size-s);
        color: var(--color-surface-fg-secondary);
        padding: var(--space-xxs) var(--space-xs);
        background-color: var(--color-surface-tint);
        border-radius: var(--radius);
    }

    .tool-icon {
        width: 20px;
        height: 20px;
    }
</style>
