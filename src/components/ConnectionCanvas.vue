<template>
    <svg 
        class="connection-canvas" 
        :width="canvasWidth" 
        :height="canvasHeight"
        @mousemove="onMouseMove"
        @mouseup="onMouseUp"
        @click="onCanvasClick"
    >
        <!-- Existing connections -->
        <g v-for="connection in connections" :key="connection.id">
            <path
                :d="getConnectionPath(connection)"
                :class="[
                    'connection-path',
                    { 
                        'selected': connection.selected,
                        'hovered': hoveredConnection === connection.id
                    }
                ]"
                @click.stop="selectConnection(connection.id)"
                @mouseenter="hoveredConnection = connection.id"
                @mouseleave="hoveredConnection = null"
            />
        </g>

        <!-- Dragging connection preview -->
        <g v-if="isDragging && dragStartNode">
            <path
                :d="getDragPath()"
                class="connection-path dragging"
                :class="{ 
                    'valid': isConnectionValid,
                    'invalid': isConnectionInvalid
                }"
            />
        </g>
    </svg>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    connections: {
        type: Array,
        default: () => []
    },
    isDragging: {
        type: Boolean,
        default: false
    },
    dragStartNode: {
        type: Object,
        default: null
    },
    dragEndPosition: {
        type: Object,
        default: () => ({ x: 0, y: 0 })
    },
    isConnectionValid: {
        type: Boolean,
        default: false
    },
    isConnectionInvalid: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update-drag', 'end-drag', 'select-connection', 'canvas-click']);

// Canvas dimensions
const canvasWidth = ref(0);
const canvasHeight = ref(0);
const hoveredConnection = ref(null);

// Get canvas dimensions from parent
const updateCanvasSize = () => {
    const canvas = document.querySelector('.canvas');
    if (canvas) {
        const rect = canvas.getBoundingClientRect();
        canvasWidth.value = rect.width;
        canvasHeight.value = rect.height;
    }
};

// Path generation utilities
const getNodePosition = (nodeId) => {
    const nodeElement = document.querySelector(`[data-node-id="${nodeId}"]`);
    if (!nodeElement) return null;
    
    // Find the node-icon element within the node
    const nodeIcon = nodeElement.querySelector('.node-icon');
    if (!nodeIcon) return null;
    
    const rect = nodeIcon.getBoundingClientRect();
    const canvas = document.querySelector('.canvas');
    const canvasRect = canvas.getBoundingClientRect();
    
    return {
        x: rect.left + rect.width / 2 - canvasRect.left,
        y: rect.top + rect.height / 2 - canvasRect.top
    };
};

const createCurvedPath = (start, end) => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const controlDistance = Math.min(distance * 0.4, 100);
    
    const control1 = {
        x: start.x + controlDistance,
        y: start.y
    };
    const control2 = {
        x: end.x - controlDistance,
        y: end.y
    };
    
    return `M ${start.x} ${start.y} C ${control1.x} ${control1.y}, ${control2.x} ${control2.y}, ${end.x} ${end.y}`;
};

const getConnectionPath = (connection) => {
    const fromPos = getNodePosition(connection.from.id);
    const toPos = getNodePosition(connection.to.id);
    
    if (!fromPos || !toPos) return '';
    
    return createCurvedPath(fromPos, toPos);
};

const getDragPath = () => {
    if (!props.dragStartNode) return '';
    
    const fromPos = getNodePosition(props.dragStartNode.id);
    if (!fromPos) return '';
    
    return createCurvedPath(fromPos, props.dragEndPosition);
};

// Event handlers
const onMouseMove = (event) => {
    if (props.isDragging) {
        emit('update-drag', event);
    }
};

const onMouseUp = (event) => {
    if (props.isDragging) {
        emit('end-drag', event);
    }
};

const onCanvasClick = (event) => {
    emit('canvas-click', event);
};

const selectConnection = (connectionId) => {
    emit('select-connection', connectionId);
};

// Lifecycle
onMounted(() => {
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
});

onUnmounted(() => {
    window.removeEventListener('resize', updateCanvasSize);
});
</script>

<style scoped>
.connection-canvas {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 10;
}

.connection-canvas * {
    pointer-events: all;
}

.connection-path {
    fill: none;
    stroke: var(--color-highlight);
    stroke-width: 2;
    
    transition: all var(--transition-quick);
    cursor: pointer;
}

.connection-path:hover {
    stroke: var(--color-accent);
    stroke-width: 3;
}

.connection-path.selected {
    stroke: var(--color-accent);
    stroke-width: 3;
    filter: drop-shadow(0 0 4px rgba(var(--color-accent-rgb), 0.3));
}

.connection-path.dragging {
    stroke-dasharray: 5, 5;
    animation: dash 1s linear infinite;
}

.connection-path.dragging.valid {
    stroke: var(--color-success);
}

.connection-path.dragging.invalid {
    stroke: var(--color-error);
}

.connection-arrow {
    fill: none;
    stroke: var(--color-highlight);
    stroke-width: 2;
    transition: all var(--transition-quick);
}

.connection-arrow.selected {
    stroke: var(--color-accent);
    stroke-width: 3;
}

.connection-arrow.dragging.valid {
    stroke: var(--color-success);
}

.connection-arrow.dragging.invalid {
    stroke: var(--color-error);
}

@keyframes dash {
    to {
        stroke-dashoffset: -10;
    }
}
</style> 