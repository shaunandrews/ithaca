<template>
    <div class="rule-placeholder" :class="{ selected: selected }" @click="handleClick">
        <RuleExpressionEditor
            :initialVariable="selectedVariable"
            :initialCondition="selectedCondition"
            :initialValue="selectedValue"
            :showActions="true"
            @update:variable="handleVariableUpdate"
            @update:condition="handleConditionUpdate"
            @update:value="handleValueUpdate"
            @confirm="handleConfirm"
            @cancel="handleRemove"
        />
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import RuleExpressionEditor from './RuleExpressionEditor.vue';

    const props = defineProps({
        uid: {
            type: String,
            required: true
        },
        selected: {
            type: Boolean,
            default: false
        },
        position: {
            type: Number,
            required: true
        },
        flowId: {
            type: String,
            default: null
        }
    });

    const emit = defineEmits(['confirm', 'remove', 'select']);

    const selectedVariable = ref('');
    const selectedCondition = ref('');
    const selectedValue = ref('');

    const handleVariableUpdate = (value) => {
        selectedVariable.value = value;
    };

    const handleConditionUpdate = (value) => {
        selectedCondition.value = value;
    };

    const handleValueUpdate = (value) => {
        selectedValue.value = value;
    };

    const handleConfirm = (ruleData) => {
        emit('confirm', {
            uid: props.uid,
            variable: ruleData.variable,
            condition: ruleData.condition,
            value: ruleData.value,
            position: props.position,
            flowId: props.flowId
        });
    };

    const handleRemove = () => {
        emit('remove', {
            uid: props.uid,
            position: props.position,
            flowId: props.flowId
        });
    };

    const handleClick = (event) => {
        event.stopPropagation();
        emit('select', {
            uid: props.uid,
            type: 'rule-placeholder',
            title: 'New Rule',
            description: 'Define a condition for this rule',
            position: props.position,
            flowId: props.flowId
        });
    };
</script>

<style scoped>
    .rule-placeholder {
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .rule-placeholder.selected {
        /* Selected state handled by RuleExpressionEditor */
    }
</style> 