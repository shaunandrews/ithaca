<template>
    <div class="agent-creation-content">
        <div class="creation-header">
            <ButtonBack />
            <h1>Create New Agent</h1>
        </div>
        
        <div class="creation-placeholder">
            <p>Agent creation form will be implemented here...</p>
        </div>
    </div>
</template>

<script setup>
    import ButtonBack from '@/components/ButtonBack.vue';
</script>

<style scoped>
    .agent-creation-content {
        display: flex;
        flex-direction: column;
        gap: var(--space-l);
        padding: var(--space-m);
    }

    .creation-header {
        display: flex;
        align-items: center;
        gap: var(--space-m);
    }

    .creation-header h1 {
        margin: 0;
        color: var(--color-surface-fg-primary);
    }

    .creation-placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--space-xl);
        background-color: var(--color-surface-tint);
        border-radius: var(--radius);
        border: 2px dashed var(--color-border);
        min-height: 200px;
    }

    .creation-placeholder p {
        color: var(--color-surface-fg-secondary);
        font-style: italic;
        margin: 0;
    }
</style> 