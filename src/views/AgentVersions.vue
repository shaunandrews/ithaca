<template>
    <div class="agent-versions">
        <h4>Description</h4>
        <p>{{ agent.description }}</p>

        <h4>Status</h4>
        <p>Active</p>

        <h4>Version</h4>
        <p>1.1.3</p>

        <h4>Owner</h4>
        <div class="details-owner hstack">
            <img
                :src="`/images/${agent.ownerIcon}`"
                :alt="agent.owner"
                width="24"
                height="24"
                class="owner-icon"
            />
            <span class="owner-name">{{ agent.owner }}</span>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { agents } from '@/data/agents.js';

    const route = useRoute();
    const agentId = computed(() => Number(route.params.id));
    const agent = computed(() => agents.find((a) => a.id === agentId.value));
</script>

<style scoped>
    .agent-versions {
        padding: var(--space-m);
    }

    .agent-versions h4 {
        font-size: var(--font-size-s);
        color: var(--color-surface-fg-tertiary);
        margin-bottom: var(--space-xs);
    }

    .agent-versions p {
        margin-bottom: var(--space-m);
    }

    .details-owner {
        gap: var(--space-xs);
        align-items: center;
    }

    .owner-icon {
        border-radius: var(--radius);
    }

    .owner-name {
        font-size: var(--font-size-s);
    }
</style>
