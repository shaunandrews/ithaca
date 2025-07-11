<template>
    <div class="rule-item vstack" :class="{ selected: selected }" @click="handleClick">
        <div class="rule-condition">
            {{ ruleType }} <BlockflowVariable type="rule-variable" :value="ruleVariable" /> {{ getConditionLabel(ruleCondition) }} <BlockflowVariable type="rule-value" :value="ruleValue" />
        </div>
        <div class="rule-action">
            <slot />
        </div>
    </div>
</template>

<script setup>
    import BlockflowVariable from './BlockflowVariable.vue';
    import { getConditionLabel } from '../utils/ruleConditions.js';
    
    const props = defineProps({
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
        },
        ruleCondition: {
            type: String,
            default: 'equals'
        },
        selected: {
            type: Boolean,
            default: false
        },
        steps: {
            type: Array,
            default: () => []
        }
    });

    const emit = defineEmits(['select']);

    // getConditionLabel imported from utils

    const handleClick = (event) => {
        // Stop event propagation to prevent parent elements from capturing the click
        event.stopPropagation();
        
        emit('select', {
            type: 'rule',
            ruleType: props.ruleType,
            variable: props.ruleVariable,
            value: props.ruleValue,
            steps: props.steps || [],
            title: `${props.ruleType} statement`,
            description: `Rule that executes when ${props.ruleVariable} ${getConditionLabel(props.ruleCondition)} ${props.ruleValue}`,
            ruleCondition: props.ruleCondition
        });
    };
</script>

<style scoped>
    .rule-item {
        min-width: fit-content;
        gap: var(--space-s);
        border: 2px solid rgba(255, 166, 0, 0.2);
        padding: var(--space-s);
        border-radius: var(--radius-l);
        background-color: rgba(255, 166, 0, 0.05);
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .rule-item:hover {
        border-color: rgba(255, 166, 0, 0.5);
    }

    .rule-item.selected {
        border-color: rgba(255, 166, 0, 0.8);
        background-color: rgba(255, 166, 0, 0.1);
    }

    .rule-action {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style> 