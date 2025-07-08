<template>
    <div class="rule-item vstack">
        <div class="rule-condition">
            {{ ruleType }} <BlockflowVariable type="rule-variable" :value="ruleVariable" /> is <BlockflowVariable type="rule-value" :value="ruleValue" />
        </div>
        <div class="rule-action">
            <slot />
        </div>
    </div>
</template>

<script setup>
    import BlockflowVariable from './BlockflowVariable.vue';
    
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
        min-width: fit-content;
        gap: var(--space-s);
        border: 2px solid rgba(255, 166, 0, 0.5);
        padding: var(--space-s);
        border-radius: var(--radius-l);
        background-color: rgba(255, 166, 0, 0.05);
    }

    .rule-action {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style> 