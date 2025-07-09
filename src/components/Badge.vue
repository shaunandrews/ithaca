<template>
    <div class="badge" :class="badgeClass">
        <slot />
    </div>
</template>

<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        variant: {
            type: String,
            default: 'default',
            validator: (value) =>
                ['default', 'agent', 'customer', 'conversation', 'trigger', 'expert', 'control-flow', 'flow', 'tool', 'exit', 'pause', 'rule', 'placeholder'].includes(value),
        },
    });

    const badgeClass = computed(() => {
        return `badge--${props.variant}`;
    });
</script>

<style scoped>
    .badge {
        display: inline-flex;
        width: fit-content;
        align-items: center;
        padding: var(--space-xxs) var(--space-xs);
        border-radius: var(--radius-xl);
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-medium);
        text-transform: uppercase;
        letter-spacing: 0.025em;
    }

    .badge--default {
        background-color: var(--color-surface-subtle);
        color: var(--color-text-subtle);
    }

    .badge--agent {
        background-color: rgba(221, 15, 183, 0.1);
        border: 1px solid rgba(221, 15, 183, 0.2);
        color: rgb(221, 15, 183);
    }

    .badge--customer {
        background-color: rgba(16, 185, 129, 0.1);
        border: 1px solid rgba(16, 185, 129, 0.2);
        color: rgb(16, 185, 129);
    }

    .badge--conversation {
        background-color: rgba(59, 130, 246, 0.1);
        border: 1px solid rgba(59, 130, 246, 0.2);
        color: rgb(59, 130, 246);
    }

    .badge--trigger {
        background-color: rgba(34, 197, 94, 0.1);
        border: 1px solid rgba(34, 197, 94, 0.2);
        color: rgb(34, 197, 94);
    }

    .badge--expert {
        background-color: rgba(147, 51, 234, 0.1);
        border: 1px solid rgba(147, 51, 234, 0.2);
        color: rgb(147, 51, 234);
    }

    .badge--control-flow,
    .badge--flow {
        background-color: rgba(59, 130, 246, 0.1);
        border: 1px solid rgba(59, 130, 246, 0.2);
        color: rgb(59, 130, 246);
    }

    .badge--tool {
        background-color: rgba(249, 115, 22, 0.1);
        border: 1px solid rgba(249, 115, 22, 0.2);
        color: rgb(249, 115, 22);
    }

    .badge--exit {
        background-color: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.2);
        color: rgb(239, 68, 68);
    }

    .badge--pause {
        background-color: rgba(245, 158, 11, 0.1);
        border: 1px solid rgba(245, 158, 11, 0.2);
        color: rgb(245, 158, 11);
    }

    .badge--rule {
        background-color: rgba(20, 184, 166, 0.1);
        border: 1px solid rgba(20, 184, 166, 0.2);
        color: rgb(20, 184, 166);
    }

    .badge--placeholder {
        background-color: rgba(107, 114, 128, 0.1);
        border: 1px solid rgba(107, 114, 128, 0.2);
        color: rgb(107, 114, 128);
    }
</style>
