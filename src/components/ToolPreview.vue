<template>
    <div
        v-if="tool"
        class="tool-preview"
        :style="{ left: `${x}px`, top: `${y}px` }"
    >
        <div class="tool-preview-header">
            <img v-if="tool.icon" :src="tool.icon" class="tool-icon" />
            <h5 class="tool-title">{{ tool.title }}</h5>
        </div>
        <p class="tool-description text-description">{{ tool.description }}</p>
    </div>
</template>

<script setup>
    defineProps({
        tool: Object,
        x: Number,
        y: Number,
    });
</script>

<style scoped>
    .tool-preview {
        position: absolute;
        background-color: var(--color-surface);
        border: 1px solid var(--color-surface-tint);
        border-radius: var(--radius-m);
        padding: var(--space-s);
        width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        z-index: 1000;
        pointer-events: none;
        user-select: none;
    }
    .tool-preview-header {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        margin-bottom: var(--space-xs);
    }
    .tool-icon {
        width: 20px;
        height: 20px;
    }
    .tool-title {
        font-weight: var(--font-weight-semibold);
        font-size: var(--font-size-s);
    }
    .tool-description {
        /* Uses .text-description utility class */
        margin: 0;
    }
</style>
