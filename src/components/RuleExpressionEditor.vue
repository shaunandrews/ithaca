<template>
    <div class="rule-expression-editor vstack" :class="{ 'with-actions': showActions }">
        <div class="group hstack">
            <span class="rule-type">If</span>
            <Dropdown 
                :label="selectedVariable ? getVariableLabel(selectedVariable) : 'Select variable...'"
                :options="variableOptions"
                :selectedValue="selectedVariable"
                @select="handleVariableSelect"
                class="variable-dropdown"
            />
        </div>
        <Dropdown 
            :label="selectedCondition ? getConditionLabel(selectedCondition) : 'Select condition...'"
            :options="conditionOptions"
            :selectedValue="selectedCondition"
            @select="handleConditionSelect"
            class="condition-dropdown"
        />
        <Dropdown 
            v-if="needsValue"
            :label="selectedValue ? getValueLabel(selectedValue) : 'Select value...'"
            :options="valueOptions"
            :selectedValue="selectedValue"
            @select="handleValueSelect"
            class="value-dropdown"
        />
    
        <div v-if="showActions" class="rule-actions hstack">
            <button class="add-btn" @click="handleConfirm" :disabled="!isValid">
                <Check size="16" stroke-width="1.5" />
            </button>
            <button class="remove-btn" @click="handleCancel">
                <X size="16" stroke-width="1.5" />
            </button>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, watch } from 'vue';
    import { X, Check, Equal, ChevronRight, ChevronLeft, SquareCheck, SquareDashed, Fullscreen } from 'lucide-vue-next';
    import Dropdown from './Dropdown.vue';
    import { getConditionLabel, CONDITIONS } from '../utils/ruleConditions.js';

    const props = defineProps({
        initialVariable: {
            type: String,
            default: ''
        },
        initialCondition: {
            type: String,
            default: ''
        },
        initialValue: {
            type: String,
            default: ''
        },
        showActions: {
            type: Boolean,
            default: false
        }
    });

    const emit = defineEmits(['update:variable', 'update:condition', 'update:value', 'confirm', 'cancel']);

    const selectedVariable = ref(props.initialVariable);
    const selectedCondition = ref(props.initialCondition);
    const selectedValue = ref(props.initialValue);

    // Variable options - these would typically come from props or a store
    const variableOptions = ref([
        { value: 'user.email', label: 'User Email' },
        { value: 'user.name', label: 'User Name' },
        { value: 'user.role', label: 'User Role' },
        { value: 'session.id', label: 'Session ID' },
        { value: 'request.method', label: 'Request Method' },
        { value: 'response.status', label: 'Response Status' },
        { value: 'tag', label: 'Tag' },
        { value: 'priority', label: 'Priority' }
    ]);

    // Condition options with icons based on defined conditions
    const conditionOptions = ref([
        { ...CONDITIONS.EQUALS, icon: Equal },
        { ...CONDITIONS.CONTAINS, icon: Fullscreen },
        { ...CONDITIONS.GREATER_THAN, icon: ChevronRight },
        { ...CONDITIONS.LESS_THAN, icon: ChevronLeft },
        { ...CONDITIONS.EXISTS, icon: SquareCheck },
        { ...CONDITIONS.EMPTY, icon: SquareDashed }
    ]);

    // Value options - these would be dynamic based on the selected variable
    const valueOptions = computed(() => {
        if (selectedVariable.value === 'user.role') {
            return [
                { value: 'admin', label: 'Admin' },
                { value: 'user', label: 'User' },
                { value: 'guest', label: 'Guest' }
            ];
        }
        if (selectedVariable.value === 'request.method') {
            return [
                { value: 'GET', label: 'GET' },
                { value: 'POST', label: 'POST' },
                { value: 'PUT', label: 'PUT' },
                { value: 'DELETE', label: 'DELETE' }
            ];
        }
        if (selectedVariable.value === 'priority') {
            return [
                { value: 'high', label: 'High' },
                { value: 'medium', label: 'Medium' },
                { value: 'low', label: 'Low' }
            ];
        }
        return [
            { value: 'custom', label: 'Enter custom value...' }
        ];
    });

    const needsValue = computed(() => {
        return ['equals', 'contains', 'greater_than', 'less_than'].includes(selectedCondition.value);
    });

    const isValid = computed(() => {
        if (!selectedVariable.value || !selectedCondition.value) return false;
        if (needsValue.value && !selectedValue.value) return false;
        return true;
    });

    const getVariableLabel = (value) => {
        const option = variableOptions.value.find(opt => opt.value === value);
        return option ? option.label : value;
    };

    // getConditionLabel imported from utils

    const getValueLabel = (value) => {
        const option = valueOptions.value.find(opt => opt.value === value);
        return option ? option.label : value;
    };

    const handleVariableSelect = (option) => {
        selectedVariable.value = option.value;
        emit('update:variable', option.value);
    };

    const handleConditionSelect = (option) => {
        selectedCondition.value = option.value;
        // Reset value if condition doesn't need one
        if (!needsValue.value) {
            selectedValue.value = '';
            emit('update:value', '');
        }
        emit('update:condition', option.value);
    };

    const handleValueSelect = (option) => {
        selectedValue.value = option.value;
        emit('update:value', option.value);
    };

    const handleConfirm = () => {
        if (isValid.value) {
            emit('confirm', {
                variable: selectedVariable.value,
                condition: selectedCondition.value,
                value: selectedValue.value
            });
        }
    };

    const handleCancel = () => {
        emit('cancel');
    };

    // Watch for prop changes to update internal state
    watch(() => props.initialVariable, (newValue) => {
        selectedVariable.value = newValue;
    });

    watch(() => props.initialCondition, (newValue) => {
        selectedCondition.value = newValue;
    });

    watch(() => props.initialValue, (newValue) => {
        selectedValue.value = newValue;
    });
</script>

<style scoped>
    .rule-expression-editor {
        gap: var(--space-s);
        width: fit-content;
        min-width: 240px;
    }

    .rule-expression-editor.with-actions {
        color: var(--color-surface-fg);
        border: 2px solid rgba(255, 166, 0, 0.4);
        border-radius: var(--radius-m);
        padding: var(--space-s);
        transition: all 0.2s ease;
        background-color: rgba(255, 166, 0, 0.05);
    }

    .rule-expression-editor.with-actions:hover {
        border-color: rgba(255, 166, 0, 0.6);
        background-color: rgba(255, 166, 0, 0.1);
    }

    .group { 
        align-items: center;
        gap: var(--space-s);
    }

    .rule-actions {
        align-items: center;
        gap: var(--space-xs);
        flex-direction: row-reverse;
    }

    .add-btn {
        background: var(--color-primary);
        color: var(--color-primary-fg);
        border: none;
        border-radius: var(--radius-s);
        padding: var(--space-xs);
        cursor: pointer;
        display: flex;
        align-items: center;
        transition: background-color 0.2s ease;
    }

    .add-btn:hover:not(:disabled) {
        background: var(--color-primary-hover);
    }

    .add-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .remove-btn {
        background: var(--color-surface-bg);
        color: var(--color-surface-fg);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-s);
        padding: var(--space-xs);
        cursor: pointer;
        display: flex;
        align-items: center;
        transition: all 0.2s ease;
    }

    .remove-btn:hover {
        background: var(--color-surface-bg-hover);
        border-color: var(--color-border-hover);
    }
</style>