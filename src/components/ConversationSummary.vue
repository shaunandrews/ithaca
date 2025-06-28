<template>
    <div class="summary vstack">
        <div class="summary-header hstack">
            <BotMessageSquare class="summary-icon" stroke-width="1.5" />
            <h2 v-if="title">{{ title }}</h2>
        </div>
        <p>{{ summary }}</p>
    </div>
</template>

<script setup>
    import { BotMessageSquare } from 'lucide-vue-next';

    defineProps({
        summary: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: false,
        },
    });
</script>

<style scoped>
    .summary {
        padding: var(--space-l);
        padding-top: 0;
        gap: var(--space-xs);
    }

    .summary-header {
        gap: var(--space-xs);
    }

    .summary-icon {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
    }

    h2 {
        font-size: var(--font-size-m);
        font-weight: var(--font-weight-bold);
        line-height: 20px;
    }

    p {
        font-size: var(--font-size-m);
        color: var(--color-chrome-fg-secondary);
    }
</style>
