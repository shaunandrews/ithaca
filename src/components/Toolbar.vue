<template>
    <div class="toolbar" :class="{ 'toolbar-sticky': sticky }">
        <div class="toolbar-start">
            <slot name="start" />
        </div>
        <div class="toolbar-end">
            <slot name="end" />
        </div>
    </div>
</template>

<script setup>
defineProps({
    sticky: {
        type: Boolean,
        default: false
    }
});
</script>

<style scoped>
.toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-m);
    padding: var(--space-s) var(--space-m);
    background-color: var(--color-chrome-transparent);
    border-bottom: 1px solid var(--color-surface-tint);
    min-height: var(--toolbar-height);
    transition: border-bottom-color 0.15s ease;
}

.toolbar-sticky {
    position: sticky;
    top: 0;
    backdrop-filter: blur(12px);
    z-index: 100;
}

.toolbar-start,
.toolbar-end {
    display: flex;
    align-items: center;
    gap: var(--space-m);
}

.toolbar-start {
    flex: 1;
}

.toolbar-end {
    flex-shrink: 0;
}

/* Simple toolbar variant (non-sticky) */
.toolbar:not(.toolbar-sticky) {
    background-color: transparent;
    border-bottom: none;
    padding: 0;
    gap: var(--space-s);
}

.toolbar:not(.toolbar-sticky) .toolbar-start,
.toolbar:not(.toolbar-sticky) .toolbar-end {
    gap: var(--space-s);
}
</style>
