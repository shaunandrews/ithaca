<template>
    <div class="tool">
        <div class="title">{{ title }}</div>
        <div class="description">{{ description }}</div>
        <div class="uid">{{ uid }}</div>
        <div class="inputs nodes hstack">
            <div 
                v-for="input in inputs" 
                :key="input" 
                class="node vstack"
                :data-node-id="getNodeId(uid, input, 'input')"
                :class="{
                    'dragging': isDraggingFrom(uid, input, 'input'),
                    'hovered': isHovered(uid, input, 'input'),
                    'valid-target': isValidTarget(uid, input, 'input'),
                    'invalid-target': isInvalidTarget(uid, input, 'input'),
                    'connected': isConnected(uid, input, 'input')
                }"
                @mousedown="onNodeMouseDown($event, uid, input, 'input')"
                @mouseenter="onNodeMouseEnter(uid, input, 'input')"
                @mouseleave="onNodeMouseLeave"
                @mouseup="onNodeMouseUp($event, uid, input, 'input')"
            >
                <div class="node-name">{{ input }}</div>
                <CircleArrowDown v-if="!isConnected(uid, input, 'input')" :size="16" stroke-width="1.5" class="node-icon" />
                <div v-else class="node-icon connected-circle"></div>
            </div>
        </div>
        <div class="outputs nodes hstack">
            <div 
                v-for="output in outputs" 
                :key="output" 
                class="node vstack"
                :data-node-id="getNodeId(uid, output, 'output')"
                :class="{
                    'dragging': isDraggingFrom(uid, output, 'output'),
                    'hovered': isHovered(uid, output, 'output'),
                    'valid-target': isValidTarget(uid, output, 'output'),
                    'invalid-target': isInvalidTarget(uid, output, 'output'),
                    'connected': isConnected(uid, output, 'output')
                }"
                @mousedown="onNodeMouseDown($event, uid, output, 'output')"
                @mouseenter="onNodeMouseEnter(uid, output, 'output')"
                @mouseleave="onNodeMouseLeave"
                @mouseup="onNodeMouseUp($event, uid, output, 'output')"
            >
                <CircleArrowDown v-if="!isConnected(uid, output, 'output')" :size="16" stroke-width="1.5" class="node-icon" />
                <div v-else class="node-icon connected-circle"></div>
                <div class="node-name">{{ output }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { CircleArrowUp, CircleArrowDown } from 'lucide-vue-next';

    const props = defineProps({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        uid: {
            type: String,
            required: true
        },
        inputs: {
            type: Array,
            default: () => []
        },
        outputs: {
            type: Array,
            default: () => []
        },
        // Connection system props
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
        hoveredNode: {
            type: Object,
            default: null
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

    const emit = defineEmits([
        'node-mousedown',
        'node-mouseenter',
        'node-mouseleave',
        'node-mouseup'
    ]);

    // Node identification
    const getNodeId = (toolUid, portName, portType) => `${toolUid}-${portType}-${portName}`;

    // Node state helpers
    const isDraggingFrom = (toolUid, portName, portType) => {
        if (!props.dragStartNode) return false;
        return props.dragStartNode.toolUid === toolUid && 
               props.dragStartNode.portName === portName && 
               props.dragStartNode.portType === portType;
    };

    const isHovered = (toolUid, portName, portType) => {
        if (!props.hoveredNode) return false;
        return props.hoveredNode.toolUid === toolUid && 
               props.hoveredNode.portName === portName && 
               props.hoveredNode.portType === portType;
    };

    const isValidTarget = (toolUid, portName, portType) => {
        if (!props.isDragging || !props.dragStartNode || !props.isConnectionValid) return false;
        return props.hoveredNode && 
               props.hoveredNode.toolUid === toolUid && 
               props.hoveredNode.portName === portName && 
               props.hoveredNode.portType === portType;
    };

    const isInvalidTarget = (toolUid, portName, portType) => {
        if (!props.isDragging || !props.dragStartNode || !props.isConnectionInvalid) return false;
        return props.hoveredNode && 
               props.hoveredNode.toolUid === toolUid && 
               props.hoveredNode.portName === portName && 
               props.hoveredNode.portType === portType;
    };

    // Check if a node is connected
    const isConnected = (toolUid, portName, portType) => {
        const nodeId = getNodeId(toolUid, portName, portType);
        return props.connections.some(connection => 
            connection.from.id === nodeId || connection.to.id === nodeId
        );
    };

    // Event handlers
    const onNodeMouseDown = (event, toolUid, portName, portType) => {
        event.preventDefault();
        event.stopPropagation();
        
        const node = {
            id: getNodeId(toolUid, portName, portType),
            toolUid,
            portName,
            portType
        };
        
        emit('node-mousedown', { node, event });
    };

    const onNodeMouseEnter = (toolUid, portName, portType) => {
        const node = {
            id: getNodeId(toolUid, portName, portType),
            toolUid,
            portName,
            portType
        };
        
        emit('node-mouseenter', node);
    };

    const onNodeMouseLeave = () => {
        emit('node-mouseleave');
    };

    const onNodeMouseUp = (event, toolUid, portName, portType) => {
        event.preventDefault();
        event.stopPropagation();
        
        const node = {
            id: getNodeId(toolUid, portName, portType),
            toolUid,
            portName,
            portType
        };
        
        emit('node-mouseup', { node, event });
    };
</script>

<style scoped>
    .tool {
        background-color: var(--color-surface);
        border: 1px solid var(--color-surface-tint-dark);
        /* box-shadow: var(--shadow-1); */
        color: var(--color-surface-fg);
        border-radius: var(--radius);
        padding: var(--space-m);
        position: relative;
    }

    .title {
        font-weight: var(--font-weight-semibold);
    }

    .uid {
        font-size: var(--font-size-s);
        color: var(--color-surface-fg-tertiary);
    }

    .nodes {
        position: absolute;
        left: 0;
        width: 100%;
        padding: 0 var(--space-xs);
        gap: var(--space-l);
    }

    .inputs {
        top: calc(var(--space-xl) * -1);
        
    }

    .outputs {
        bottom: calc(var(--space-xl) * -1);
    }

    .node {
        cursor: grab;
    }

    .node-icon {
        color: var(--color-chrome-fg-secondary);
        background-color: var(--color-chrome);
        border-radius: var(--radius-circle);
        transition: var(--transition-quick);
    }

    .node-name {
        font-size: var(--font-size-s);
        color: var(--color-chrome-fg-secondary);
        transition: var(--transition-quick);
    }

    .node:hover .node-icon {
        background-color: var(--color-accent);
        color: var(--color-accent-fg);
        transform: scale(1.3);
    }

    .node:hover .node-name {
        color: var(--color-accent);
    }

    .inputs .node:hover .node-name {
        transform: translateY(calc(var(--space-xxs) * -1));
    }

    .outputs .node:hover .node-name {
        transform: translateY(var(--space-xxs));
    }

    /* Connection system styles */
    .node.dragging {
        opacity: 0.5;
    }

    .node.dragging .node-icon {
        background-color: var(--color-accent);
        color: var(--color-accent-fg);
        transform: scale(1.5);
    }

    .node.valid-target .node-icon {
        background-color: var(--color-success);
        color: var(--color-success-fg);
        transform: scale(1.4);
        box-shadow: 0 0 8px rgba(var(--color-success-rgb), 0.4);
    }

    .node.invalid-target .node-icon {
        background-color: var(--color-error);
        color: var(--color-error-fg);
        transform: scale(1.4);
        box-shadow: 0 0 8px rgba(var(--color-error-rgb), 0.4);
    }

    .node.hovered .node-icon {
        background-color: var(--color-accent);
        color: var(--color-accent-fg);
        transform: scale(1.3);
    }

    .node.connected .node-icon {
        background-color: var(--color-highlight);
        color: var(--color-highlight-fg);
        transform: scale(1.2);
    }

    .connected-circle {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        flex-shrink: 0;
    }
</style> 