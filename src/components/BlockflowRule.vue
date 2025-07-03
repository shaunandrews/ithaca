<template>
    <div class="rule-item vstack">
        <div class="rule-condition">
            {{ ruleType }} <span class="rule-variable">{{ ruleVariable }}</span> is <span class="rule-value">{{ ruleValue }}</span>
        </div>
        <div class="rule-action">
            <slot />
        </div>
    </div>
</template>

<script setup>
    defineProps({
        ruleType: {
            type: String,
            default: 'If',
            validator: (value) => ['If', 'Else if', 'Else'].includes(value)
        },
        ruleVariable: {
            type: String,
            required: true
        },
        ruleValue: {
            type: String,
            required: true
        }
    });
</script>

<style scoped>
    .rule-item {
        gap: var(--space-s);
        border: 1px dashed rgba(255, 166, 0, 0.5);
        padding: var(--space-s);
        border-radius: var(--radius-l);
        background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 9px,
            rgba(255, 166, 0, 0.15) 9px,
            rgba(255, 166, 0, 0.15) 10px
        );
        background-color: var(--color-chrome);
        background-attachment: fixed;
    }

    .rule-action {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .rule-variable {
        padding: 0 var(--space-xxs);
        border-radius: var(--radius-s);
        width: fit-content;
        font-family: var(--font-monospace);
        font-size: var(--font-size-s);
        border-bottom: 1px dashed transparent;
    }

    .rule-variable {
        font-weight: var(--font-weight-medium);
        color: var(--color-highlight);
        background-color: var(--color-highlight-tint);
        border-bottom-color: var(--color-highlight);
    }

    .rule-value {
        font-weight: var(--font-weight-normal);
        background-color: var(--color-surface-tint);
        border-bottom-color: var(--color-accent);
        color: var(--color-surface-fg-secondary);
    }
</style> 