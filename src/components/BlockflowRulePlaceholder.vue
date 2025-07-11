<template>
    <div class="rule-placeholder vstack" :class="{ selected: selected }" @click="handleClick">
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
    
        <div class="rule-actions hstack">
            <button class="add-btn" @click="handleConfirm" :disabled="!isValid">
                <Check size="16" stroke-width="1.5" />
            </button>
            <button class="remove-btn" @click="handleRemove" title="Remove this placeholder">
                <X size="16" stroke-width="1.5" />
            </button>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { X, Check, Equal, ChevronRight, ChevronLeft, SquareCheck, SquareDashed, Fullscreen } from 'lucide-vue-next';
    import Dropdown from './Dropdown.vue';

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

    // Condition options
    const conditionOptions = ref([
        { value: 'equals', label: 'equals', icon: Equal },
        { value: 'contains', label: 'contains', icon: Fullscreen },
        { value: 'greater_than', label: 'greater than', icon: ChevronRight },
        { value: 'less_than', label: 'less than', icon: ChevronLeft },
        { value: 'exists', label: 'exists', icon: SquareCheck },
        { value: 'empty', label: 'is empty', icon: SquareDashed }
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

    const getConditionLabel = (value) => {
        const option = conditionOptions.value.find(opt => opt.value === value);
        return option ? option.label : value;
    };

    const getValueLabel = (value) => {
        const option = valueOptions.value.find(opt => opt.value === value);
        return option ? option.label : value;
    };

    const handleVariableSelect = (option) => {
        selectedVariable.value = option.value;
    };

    const handleConditionSelect = (option) => {
        selectedCondition.value = option.value;
        // Reset value if condition doesn't need one
        if (!needsValue.value) {
            selectedValue.value = '';
        }
    };

    const handleValueSelect = (option) => {
        selectedValue.value = option.value;
    };

    const handleConfirm = () => {
        if (isValid.value) {
            emit('confirm', {
                uid: props.uid,
                variable: selectedVariable.value,
                condition: selectedCondition.value,
                value: selectedValue.value,
                position: props.position,
                flowId: props.flowId
            });
        }
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
        color: var(--color-surface-fg);
        border: 2px solid rgba(255, 166, 0, 0.4);
        border-radius: var(--radius-m);
        padding: var(--space-s);
        gap: var(--space-s);
        width: fit-content;
        height: fit-content;
        cursor: pointer;
        transition: all 0.2s ease;
        min-width: 240px;
    }

    .rule-placeholder:hover {
        border-color: rgba(255, 166, 0, 0.6);
        background-color: rgba(255, 166, 0, 0.05);
    }

    .rule-placeholder.selected {
        border-color: rgba(255, 166, 0, 0.8);
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
</style> 