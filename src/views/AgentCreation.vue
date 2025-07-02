<template>
    <div class="agent-creation vstack" @keydown="handleKeydown">
        <div class="creation-header hstack">
            <button>Cancel</button>
            <h1>New Agent</h1>
            <button class="primary">Save</button>
        </div>
        
        <div class="canvas">
            <!-- Connection Canvas Overlay -->
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

            <WorkflowStep title="Get customer message" icon="SquarePlay" step-type="run">
                <WorkflowTool
                    title="Customer message"
                    description="A message from a customer."
                    uid="initial-message-tool"
                    :inputs="['source']"
                    :outputs="['message']"
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
            </WorkflowStep>

            <WorkflowStep title="Classify message" icon="SquarePlay" step-type="run">
                <WorkflowTool
                    title="Classify message"
                    description="Classify a message into a set of tags."
                    uid="classify-initial-message-tool"
                    :inputs="['message', 'enabled']"
                    :outputs="['tags']"
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
            </WorkflowStep>

            <WorkflowStep title="Respond to message" icon="CopyCheck" step-type="first-match">
                <WorkflowTool
                    title="Domains expert"
                    description="Knows everything there is to know about web domains."
                    uid="domains-expert-reply"
                    :inputs="['message', 'tags']"
                    :outputs="['response']"
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
                <WorkflowTool
                    title="Plugins expert"
                    description="Knows everything there is to know about WordPress plugins."
                    uid="plugins-expert-reply"
                    :inputs="['message', 'tags']"
                    :outputs="['response']"
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
                <WorkflowTool
                    title="Gutenberg expert"
                    description="Knows everything there is to know about Gutenberg blocks."
                    uid="gutenberg-expert-reply"
                    :inputs="['message', 'tags']"
                    :outputs="['response']"
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
            </WorkflowStep>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, onUnmounted } from 'vue';
    import WorkflowTool from '../components/WorkflowTool.vue';
    import WorkflowStep from '../components/WorkflowStep.vue';
    import ConnectionCanvas from '../components/ConnectionCanvas.vue';
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
        addConnection,
        handleKeydown
    } = useConnections();

    // Node event handlers
    const onNodeMouseDown = ({ node, event }) => {
        // Only allow dragging from output nodes
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
            // Only allow dropping on input nodes
            if (node.portType === 'input') {
                endDrag(node);
            } else {
                cancelDrag();
            }
        }
    };

    // Canvas event handlers
    const onCanvasClick = (event) => {
        // Deselect connection when clicking on canvas
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
        
        // Add some sample connections for demonstration
        setTimeout(() => {
            const sampleConnections = [
                {
                    from: {
                        id: 'initial-message-tool-output-message',
                        toolUid: 'initial-message-tool',
                        portName: 'message',
                        portType: 'output'
                    },
                    to: {
                        id: 'classify-initial-message-tool-input-message',
                        toolUid: 'classify-initial-message-tool',
                        portName: 'message',
                        portType: 'input'
                    }
                },
                {
                    from: {
                        id: 'classify-initial-message-tool-output-tags',
                        toolUid: 'classify-initial-message-tool',
                        portName: 'tags',
                        portType: 'output'
                    },
                    to: {
                        id: 'domains-expert-reply-input-tags',
                        toolUid: 'domains-expert-reply',
                        portName: 'tags',
                        portType: 'input'
                    }
                }
            ];
            
            sampleConnections.forEach(conn => {
                addConnection(conn.from, conn.to);
            });
        }, 100);
    });

    onUnmounted(() => {
        document.removeEventListener('mousemove', onGlobalMouseMove);
        document.removeEventListener('mouseup', onGlobalMouseUp);
    });
</script>

<style scoped>
    .agent-creation {
        height: 100%;
        /* gap: var(--space-m); */
    }

    .creation-header {
        gap: var(--space-m);
        padding: var(--space-m);
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--color-surface-tint);
        position: relative;
    }

    .creation-header h1 {
        font-size: var(--font-size-m);
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }

    .canvas {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-xl);
        background-image: 
            radial-gradient(circle, var(--color-surface-tint-dark) 1px, transparent 1px);
        background-size: var(--space-l) var(--space-l);
        background-position: 0 0;
        background-color: rgba(0, 0, 0, 0.025);
        padding: var(--space-m);
        position: relative;
    }
</style> 