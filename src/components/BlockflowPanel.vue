<template>
    <div class="blockflow-panel">
        <slot />
    </div>
</template>

<script setup>
// No props or logic needed for this wrapper component
</script>

<style scoped>
    .blockflow-panel {
        width: 320px;
        flex-shrink: 0;
        border-left: 1px solid var(--color-surface-tint);
    }
</style> 