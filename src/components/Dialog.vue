<template>
    <div v-if="isOpen" class="dialog-scrim">
        <div class="dialog-content">
            <div class="dialog-header">
                <h2 class="dialog-title">{{ title }}</h2>
                <p v-if="description" class="dialog-description">{{ description }}</p>
            </div>
            
            <div class="dialog-body">
                <slot />
            </div>
            
            <div class="dialog-actions">
                <button 
                    v-for="action in actions" 
                    :key="action.key"
                    :class="['dialog-action', action.variant || 'secondary']"
                    @click="handleAction(action)"
                >
                    {{ action.label }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { defineProps, defineEmits } from 'vue';

    const props = defineProps({
        isOpen: {
            type: Boolean,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: '',
        },
        actions: {
            type: Array,
            required: true,
            // Expected format: [{ key: 'confirm', label: 'Confirm', variant: 'primary' }]
        },
    });

    const emit = defineEmits(['action']);

    function handleAction(action) {
        emit('action', action.key);
    }
</script>

<style scoped>
    .dialog-scrim {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

    .dialog-content {
        background: var(--color-surface);
        color: var(--color-surface-fg);
        border-radius: 8px;
        position: relative;
        min-width: 400px;
        max-width: 90vw;
        max-height: 90vh;
        box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }

    .dialog-header {
        padding: 1.5rem 2rem 1rem;
        border-bottom: 1px solid var(--color-border);
    }

    .dialog-title {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--color-surface-fg);
    }

    .dialog-description {
        margin: 0.5rem 0 0;
        color: var(--color-surface-fg-muted);
        line-height: 1.5;
    }

    .dialog-body {
        flex: 1;
        padding: 1rem 2rem;
        overflow: auto;
    }

    .dialog-actions {
        padding: 1rem 2rem 1.5rem;
        border-top: 1px solid var(--color-border);
        display: flex;
        gap: 0.75rem;
        justify-content: flex-end;
    }

    .dialog-action {
        padding: 0.5rem 1rem;
        border-radius: 4px;
        border: 1px solid var(--color-border);
        background: var(--color-surface);
        color: var(--color-surface-fg);
        cursor: pointer;
        font-size: 0.875rem;
        font-weight: 500;
        transition: all 0.2s ease;
    }

    .dialog-action:hover {
        background: var(--color-surface-hover);
    }

    .dialog-action.primary {
        background: var(--color-primary);
        color: var(--color-primary-fg);
        border-color: var(--color-primary);
    }

    .dialog-action.primary:hover {
        background: var(--color-primary-hover);
    }

    .dialog-action.destructive {
        background: var(--color-destructive);
        color: var(--color-destructive-fg);
        border-color: var(--color-destructive);
    }

    .dialog-action.destructive:hover {
        background: var(--color-destructive-hover);
    }
</style> 