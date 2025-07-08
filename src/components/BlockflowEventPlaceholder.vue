<template>
    <div class="event-placeholder" :class="{ selected: selected }" @click="handleClick">
        <div class="event-header hstack">
            <div class="event-title-container">
                <select v-model="selectedType" class="event-type-select" @change="handleTypeChange">
                    <option value="">Select event type...</option>
                    <option value="trigger">Trigger</option>
                    <option value="action">Action</option>
                    <option value="tool">Tool</option>
                    <option value="expert">Expert</option>
                    <option value="flow">Flow Control</option>
                    <option value="pause">Pause</option>
                    <option value="exit">Exit</option>
                </select>
            </div>
            <button class="add-btn" @click="handleConfirm" :disabled="!selectedType">
                <Check size="16" stroke-width="1.5" />
            </button>
            <button class="remove-btn" @click="handleRemove" title="Remove this placeholder">
                <X size="16" stroke-width="1.5" />
            </button>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
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
        branchId: {
            type: String,
            default: null
        }
    });

    const emit = defineEmits(['confirm', 'remove', 'select']);

    const selectedType = ref('');

    const handleTypeChange = () => {
        // Could emit type change if needed for live preview
    };

    const handleConfirm = () => {
        if (selectedType.value) {
            emit('confirm', {
                uid: props.uid,
                type: selectedType.value,
                position: props.position,
                branchId: props.branchId
            });
        }
    };

    const handleRemove = () => {
        emit('remove', {
            uid: props.uid,
            position: props.position,
            branchId: props.branchId
        });
    };

    const handleClick = (event) => {
        event.stopPropagation();
        emit('select', {
            uid: props.uid,
            type: 'placeholder',
            title: 'New Event',
            description: 'Select an event type to add to the workflow',
            position: props.position,
            branchId: props.branchId
        });
    };
</script>

<style scoped>
    .event-placeholder {
        list-style: none;
        color: var(--color-surface-fg);
        border: 2px solid var(--color-surface-tint);
        border-radius: var(--radius-l);
        width: fit-content;
        height: fit-content;
        cursor: pointer;
        transition: all 0.2s ease;
        min-width: 300px;
    }

    .event-placeholder:hover {
        border-color: var(--color-accent);
    }

    .event-placeholder.selected {
        border-color: var(--color-accent);
    }

    .event-header {
        align-items: center;
        gap: var(--space-s);
        padding: var(--space-s);
    }

    .event-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-surface-fg-secondary);
    }

    .event-title-container {
        flex-grow: 1;
    }

    .event-type-select {
        width: 100%;
        padding: var(--space-xs);
        border: 1px solid var(--color-surface-tint);
        border-radius: var(--radius-s);
        background-color: var(--color-surface);
        color: var(--color-surface-fg);
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-medium);
    }

    .event-type-select:focus {
        outline: none;
        border-color: var(--color-accent);
    }

    .event-content {
        border-top: 1px solid var(--color-surface-tint);
        background-color: var(--color-surface-tint-light);
        padding: var(--space-s);
    }

    .placeholder-actions {
        gap: var(--space-s);
        justify-content: flex-end;
    }

    .action-btn {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        padding: var(--space-xs) var(--space-s);
        border: 1px solid var(--color-surface-tint);
        border-radius: var(--radius-s);
        background-color: var(--color-surface);
        color: var(--color-surface-fg);
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-medium);
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .action-btn:hover:not(:disabled) {
        background-color: var(--color-accent);
        border-color: var(--color-accent);
        color: var(--color-accent-fg);
    }

    .action-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .action-btn.secondary {
        background-color: var(--color-surface-tint-light);
        color: var(--color-surface-fg-secondary);
    }

    .action-btn.secondary:hover {
        background-color: var(--color-surface-tint);
        border-color: var(--color-surface-tint);
        color: var(--color-surface-fg);
    }
</style> 