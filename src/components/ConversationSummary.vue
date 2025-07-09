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
        border-radius: var(--radius-xl);
        cursor: pointer;
        color: var(--color-chrome-fg);
        transition: border-color 0.15s ease, background-color 0.15s ease;
    }

    .summary.selected {
        border-color: var(--color-accent);
        color: var(--color-chrome-fg);
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
