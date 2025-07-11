<template>
    <div class="panel" :style="{ width: currentWidth + 'px' }">
        <div 
            v-if="resizable"
            class="resize-handle"
            :class="{ 'is-hovering': isHovering }"
            @mousedown="startResize"
            @mouseenter="isHovering = true"
            @mouseleave="isHovering = false"
        ></div>
        <div
            v-if="resizable"
            class="resize-knob"
            :class="{ 'is-dragging': isResizing, 'is-hovering': isHovering }"
        ></div>
        <slot />
    </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';

const props = defineProps({
    resizable: {
        type: Boolean,
        default: false
    },
    defaultWidth: {
        type: Number,
        default: 320
    },
    minWidth: {
        type: Number,
        default: 240
    },
    maxWidth: {
        type: Number,
        default: 600
    }
});

const currentWidth = ref(props.defaultWidth);
const isResizing = ref(false);
const isHovering = ref(false);
const startX = ref(0);
const startWidth = ref(0);

const startResize = (e) => {
    isResizing.value = true;
    startX.value = e.clientX;
    startWidth.value = currentWidth.value;
    
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
};

const handleResize = (e) => {
    if (!isResizing.value) return;
    
    const deltaX = startX.value - e.clientX;
    const newWidth = Math.max(
        props.minWidth,
        Math.min(props.maxWidth, startWidth.value + deltaX)
    );
    
    currentWidth.value = newWidth;
};

const stopResize = () => {
    isResizing.value = false;
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', stopResize);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
};

onUnmounted(() => {
    if (isResizing.value) {
        stopResize();
    }
});
</script>

<style scoped>
    .panel {
        position: relative;
        flex-shrink: 0;
        border-left: 1px solid var(--color-surface-tint);
    }

    .resize-handle {
        position: absolute;
        left: -2px;
        top: 0;
        width: 4px;
        height: 100%;
        cursor: ew-resize;
        background: transparent;
        z-index: 10000;
        transition: var(--transition-quick);
    }

    .resize-handle:hover {
        background: var(--color-accent);
        opacity: 0.5;
    }

    .resize-handle:active {
        background: var(--color-accent);
        opacity: 0.6;
    }

    .resize-knob {
        position: absolute;
        left: -4px;
        top: calc(50% - var(--toolbar-height));
        z-index: 10001;
        width: 8px;
        height: 32px;
        background: var(--color-chrome);
        border: 1px solid var(--color-surface-tint-dark);
        border-radius: 4px;
        transition: var(--transition-quick);
        pointer-events: none;
    }

    .resize-knob.is-hovering {
        border-color: var(--color-surface-fg-secondary)
    }

    .resize-knob.is-dragging {
        background: var(--color-accent);
        border-color: var(--color-accent-fg);
    }
</style> 