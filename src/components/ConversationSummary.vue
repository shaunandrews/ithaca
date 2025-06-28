<template>
    <div class="summary vstack" :class="{ 'selected': isSelected }" @click="$emit('click')">
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
        isSelected: {
            type: Boolean,
            default: false,
        },
    });

    defineEmits(['click']);
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
        cursor: pointer;
        color: var(--color-chrome-fg-secondary);
        transition: border-color 0.15s ease, background-color 0.15s ease;
    }

    .summary:hover {
        color: var(--color-chrome-fg);
    }

    .summary.selected {
        border-color: var(--color-accent);
        color: var(--color-chrome-fg);
        background: repeating-linear-gradient(
            45deg,
            var(--color-surface-tint-light),
            var(--color-surface-tint-light) 8px,
            var(--color-surface-tint) 8px,
            var(--color-surface-tint) 10px
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
