<template>
    <div class="rule-placeholder" :class="{ selected: selected }" @click="handleClick">
        <div class="rule-header hstack">
            <div class="rule-title-container">
                <select v-model="selectedCondition" class="rule-condition-select" @change="handleConditionChange">
                    <option value="">Select condition...</option>
                    <option value="equals">Equals</option>
                    <option value="contains">Contains</option>
                    <option value="greater_than">Greater Than</option>
                    <option value="less_than">Less Than</option>
                    <option value="exists">Exists</option>
                    <option value="empty">Is Empty</option>
                </select>
            </div>
            <button class="add-btn" @click="handleConfirm" :disabled="!selectedCondition">
                <Check size="16" stroke-width="1.5" />
            </button>
            <button class="remove-btn" @click="handleRemove" title="Remove this placeholder">
                <X size="16" stroke-width="1.5" />
            </button>
        </div>
        <div v-if="selectedCondition" class="rule-content">
            <div class="rule-fields hstack">
                <div class="field-group">
                    <label>Variable</label>
                    <input 
                        v-model="variableName" 
                        type="text" 
                        placeholder="e.g., user.email"
                        class="rule-input"
                    />
                </div>
                <div v-if="needsValue" class="field-group">
                    <label>Value</label>
                    <input 
                        v-model="expectedValue" 
                        type="text" 
                        placeholder="Expected value"
                        class="rule-input"
                    />
                </div>
                <div class="field-group">
                    <label>Then</label>
                    <select v-model="thenAction" class="rule-action-select">
                        <option value="">Select action...</option>
                        <option value="continue">Continue</option>
                        <option value="branch">Branch</option>
                        <option value="exit">Exit</option>
                        <option value="pause">Pause</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { X, Check } from 'lucide-vue-next';

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

    const selectedCondition = ref('');
    const variableName = ref('');
    const expectedValue = ref('');
    const thenAction = ref('');

    const needsValue = computed(() => {
        return ['equals', 'contains', 'greater_than', 'less_than'].includes(selectedCondition.value);
    });

    const handleConditionChange = () => {
        // Reset dependent fields when condition changes
        if (!needsValue.value) {
            expectedValue.value = '';
        }
    };

    const handleConfirm = () => {
        if (selectedCondition.value && variableName.value && thenAction.value) {
            emit('confirm', {
                uid: props.uid,
                condition: selectedCondition.value,
                variable: variableName.value,
                value: expectedValue.value,
                action: thenAction.value,
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
            description: 'Define a condition and action for this rule',
            position: props.position,
            flowId: props.flowId
        });
    };
</script>

<style scoped>
    .rule-placeholder {
        list-style: none;
        color: var(--color-surface-fg);
        border: 2px solid rgba(255, 166, 0, 0.4);
        border-radius: var(--radius-m);
        width: fit-content;
        height: fit-content;
        cursor: pointer;
        transition: all 0.2s ease;
        min-width: 280px;
        background-color: var(--color-surface);
    }

    .rule-placeholder:hover {
        border-color: rgba(255, 166, 0, 0.6);
        background-color: rgba(255, 166, 0, 0.05);
    }

    .rule-placeholder.selected {
        border-color: rgba(255, 166, 0, 0.8);
        background-color: rgba(255, 166, 0, 0.1);
    }

    .rule-header {
        align-items: center;
        gap: var(--space-s);
        padding: var(--space-s);
    }

    .rule-title-container {
        flex-grow: 1;
    }

    .rule-condition-select {
        width: 100%;
        padding: var(--space-xs);
        border: 1px solid var(--color-surface-tint);
        border-radius: var(--radius-s);
        background-color: var(--color-surface);
        color: var(--color-surface-fg);
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-medium);
    }

    .rule-condition-select:focus {
        outline: none;
        border-color: rgba(255, 166, 0, 0.6);
    }

    .rule-content {
        border-top: 1px solid rgba(255, 166, 0, 0.2);
        background-color: rgba(255, 166, 0, 0.05);
        padding: var(--space-s);
    }

    .rule-fields {
        gap: var(--space-s);
        align-items: flex-end;
    }

    .field-group {
        display: flex;
        flex-direction: column;
        gap: var(--space-xs);
        min-width: 0;
        flex: 1;
    }

    .field-group label {
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-semibold);
        color: var(--color-surface-fg-secondary);
    }

    .rule-input,
    .rule-action-select {
        padding: var(--space-xs);
        border: 1px solid var(--color-surface-tint);
        border-radius: var(--radius-s);
        background-color: var(--color-surface);
        color: var(--color-surface-fg);
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-medium);
    }

    .rule-input:focus,
    .rule-action-select:focus {
        outline: none;
        border-color: rgba(255, 166, 0, 0.6);
    }

    .add-btn,
    .remove-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--space-xs);
        border: 1px solid var(--color-surface-tint);
        border-radius: var(--radius-s);
        background-color: var(--color-surface);
        color: var(--color-surface-fg);
        cursor: pointer;
        transition: all 0.2s ease;
        width: 32px;
        height: 32px;
    }

    .add-btn:hover:not(:disabled) {
        background-color: var(--color-accent);
        border-color: var(--color-accent);
        color: var(--color-accent-fg);
    }

    .add-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .remove-btn:hover {
        background-color: var(--color-error);
        border-color: var(--color-error);
        color: var(--color-error-fg);
    }
</style> 