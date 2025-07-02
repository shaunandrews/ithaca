<template>
    <div class="connection-test">
        <h2>Connection System Test</h2>
        
        <div class="test-controls">
            <button @click="addSampleConnection">Add Sample Connection</button>
            <button @click="clearConnections">Clear All</button>
            <button @click="toggleDebug">Toggle Debug</button>
        </div>

        <div class="test-info">
            <p><strong>Connections:</strong> {{ connections.length }}</p>
            <p><strong>Dragging:</strong> {{ isDragging ? 'Yes' : 'No' }}</p>
            <p><strong>Selected:</strong> {{ selectedConnection ? selectedConnection.id : 'None' }}</p>
        </div>

        <div class="test-canvas">
            <ConnectionCanvas
                :connections="connections"
                :is-dragging="isDragging"
                :drag-start-node="dragStartNode"
                :drag-end-position="dragEndPosition"
                :is-connection-valid="isConnectionValid"
                :is-connection-invalid="isConnectionInvalid"
                @update-drag="updateDrag"
                @end-drag="endDrag"
                @select-connection="selectConnection"
                @canvas-click="onCanvasClick"
            />

            <!-- Test Tools -->
            <div class="test-tools">
                <div class="test-tool" style="position: absolute; top: 100px; left: 50px;">
                    <WorkflowTool
                        title="Source Tool"
                        description="Test source tool"
                        uid="source-tool"
                        :inputs="['input1', 'input2']"
                        :outputs="['output1', 'output2']"
                        :connections="connections"
                        :is-dragging="isDragging"
                        :drag-start-node="dragStartNode"
                        :hovered-node="hoveredNode"
                        :is-connection-valid="isConnectionValid"
                        :is-connection-invalid="isConnectionInvalid"
                        @node-mousedown="onNodeMouseDown"
                        @node-mouseenter="onNodeMouseEnter"
                        @node-mouseleave="onNodeMouseLeave"
                        @node-mouseup="onNodeMouseUp"
                    />
                </div>

                <div class="test-tool" style="position: absolute; top: 100px; right: 50px;">
                    <WorkflowTool
                        title="Target Tool"
                        description="Test target tool"
                        uid="target-tool"
                        :inputs="['input1', 'input2']"
                        :outputs="['output1', 'output2']"
                        :connections="connections"
                        :is-dragging="isDragging"
                        :drag-start-node="dragStartNode"
                        :hovered-node="hoveredNode"
                        :is-connection-valid="isConnectionValid"
                        :is-connection-invalid="isConnectionInvalid"
                        @node-mousedown="onNodeMouseDown"
                        @node-mouseenter="onNodeMouseEnter"
                        @node-mouseleave="onNodeMouseLeave"
                        @node-mouseup="onNodeMouseUp"
                    />
                </div>

                <div class="test-tool" style="position: absolute; bottom: 100px; left: 50%; transform: translateX(-50%);">
                    <WorkflowTool
                        title="Middle Tool"
                        description="Test middle tool"
                        uid="middle-tool"
                        :inputs="['input1']"
                        :outputs="['output1']"
                        :connections="connections"
                        :is-dragging="isDragging"
                        :drag-start-node="dragStartNode"
                        :hovered-node="hoveredNode"
                        :is-connection-valid="isConnectionValid"
                        :is-connection-invalid="isConnectionInvalid"
                        @node-mousedown="onNodeMouseDown"
                        @node-mouseenter="onNodeMouseEnter"
                        @node-mouseleave="onNodeMouseLeave"
                        @node-mouseup="onNodeMouseUp"
                    />
                </div>
            </div>
        </div>

        <div class="debug-info" v-if="debugMode">
            <h3>Debug Information</h3>
            <pre>{{ debugInfo }}</pre>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import WorkflowTool from './WorkflowTool.vue';
import ConnectionCanvas from './ConnectionCanvas.vue';
import { useConnections } from '../composables/useConnections.js';

// Connection system
const {
    connections,
    isDragging,
    dragStartNode,
    dragEndPosition,
    selectedConnection,
    hoveredNode,
    isConnectionValid,
    isConnectionInvalid,
    startDrag,
    updateDrag,
    endDrag,
    cancelDrag,
    setHoveredNode,
    clearHoveredNode,
    selectConnection,
    addConnection
} = useConnections();

// Test state
const debugMode = ref(false);

// Debug information
const debugInfo = computed(() => ({
    connections: connections.value,
    isDragging: isDragging.value,
    dragStartNode: dragStartNode.value,
    dragEndPosition: dragEndPosition.value,
    selectedConnection: selectedConnection.value,
    hoveredNode: hoveredNode.value,
    isConnectionValid: isConnectionValid.value,
    isConnectionInvalid: isConnectionInvalid.value
}));

// Test functions
const addSampleConnection = () => {
    const sampleConnection = {
        from: {
            id: 'source-tool-output-output1',
            toolUid: 'source-tool',
            portName: 'output1',
            portType: 'output'
        },
        to: {
            id: 'target-tool-input-input1',
            toolUid: 'target-tool',
            portName: 'input1',
            portType: 'input'
        }
    };
    
    addConnection(sampleConnection.from, sampleConnection.to);
};

const clearConnections = () => {
    connections.value.length = 0;
    selectConnection(null);
};

const toggleDebug = () => {
    debugMode.value = !debugMode.value;
};

// Node event handlers
const onNodeMouseDown = ({ node, event }) => {
    if (node.portType === 'output') {
        startDrag(node, event);
    }
};

const onNodeMouseEnter = (node) => {
    setHoveredNode(node);
};

const onNodeMouseLeave = () => {
    clearHoveredNode();
};

const onNodeMouseUp = ({ node, event }) => {
    if (isDragging.value) {
        if (node.portType === 'input') {
            endDrag(node);
        } else {
            cancelDrag();
        }
    }
};

// Canvas event handlers
const onCanvasClick = (event) => {
    if (selectedConnection.value) {
        selectConnection(null);
    }
};

// Global event handlers
const onGlobalMouseMove = (event) => {
    if (isDragging.value) {
        updateDrag(event);
    }
};

const onGlobalMouseUp = (event) => {
    if (isDragging.value) {
        cancelDrag();
    }
};

// Lifecycle
onMounted(() => {
    document.addEventListener('mousemove', onGlobalMouseMove);
    document.addEventListener('mouseup', onGlobalMouseUp);
});

onUnmounted(() => {
    document.removeEventListener('mousemove', onGlobalMouseMove);
    document.removeEventListener('mouseup', onGlobalMouseUp);
});
</script>

<style scoped>
.connection-test {
    padding: var(--space-m);
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.test-controls {
    display: flex;
    gap: var(--space-s);
    margin-bottom: var(--space-m);
}

.test-controls button {
    padding: var(--space-xs) var(--space-s);
    border: 1px solid var(--color-surface-tint);
    border-radius: var(--radius);
    background: var(--color-surface);
    cursor: pointer;
    transition: var(--transition-quick);
}

.test-controls button:hover {
    background: var(--color-surface-tint);
}

.test-info {
    display: flex;
    gap: var(--space-m);
    margin-bottom: var(--space-m);
    font-size: var(--font-size-s);
}

.test-canvas {
    flex: 1;
    position: relative;
    background-image: 
        radial-gradient(circle, var(--color-surface-tint-dark) 1px, transparent 1px);
    background-size: var(--space-l) var(--space-l);
    background-position: 0 0;
    background-color: rgba(0, 0, 0, 0.025);
    border-radius: var(--radius);
    overflow: hidden;
}

.test-tools {
    position: relative;
    width: 100%;
    height: 100%;
}

.debug-info {
    margin-top: var(--space-m);
    padding: var(--space-s);
    background: var(--color-chrome);
    border: 1px solid var(--color-surface-tint);
    border-radius: var(--radius);
    font-size: var(--font-size-s);
    max-height: 200px;
    overflow-y: auto;
}

.debug-info pre {
    margin: 0;
    white-space: pre-wrap;
    word-break: break-all;
}
</style> 