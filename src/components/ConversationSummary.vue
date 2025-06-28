<template>
    <div class="summary vstack">
        <!-- <div class="summary-header hstack">
            <h2 v-if="title">{{ title }}</h2>
        </div> -->
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
        padding: var(--space-s) var(--space-l);
        gap: var(--space-xs);
        border: 1.5px solid var(--color-surface-tint);
        border-radius: var(--radius-xl);
        background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 8px,
            var(--color-surface-tint-light) 8px,
            var(--color-surface-tint-light) 10px
        );
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
        line-height: var(--line-height-relaxed);
        text-shadow: 0 3px 1px var(--color-surface);
    }
</style>
