import { ref, computed, watch } from 'vue';

export function useConnections() {
    // Connection state
    const connections = ref([]);
    const isDragging = ref(false);
    const dragStartNode = ref(null);
    const dragEndPosition = ref({ x: 0, y: 0 });
    const selectedConnection = ref(null);
    const hoveredNode = ref(null);

    // Connection data structure
    const createConnection = (fromNode, toNode) => ({
        id: `${fromNode.id}-${toNode.id}`,
        from: fromNode,
        to: toNode,
        type: 'default', // Can be extended for different connection types
        selected: false
    });

    // Node identification
    const getNodeId = (toolUid, portName, portType) => `${toolUid}-${portType}-${portName}`;

    // Connection validation
    const canConnect = (fromNode, toNode) => {
        if (!fromNode || !toNode) return false;
        if (fromNode.toolUid === toNode.toolUid) return false; // Can't connect to same tool
        if (fromNode.portType === toNode.portType) return false; // Can't connect input to input or output to output
        if (fromNode.portType === 'input' && toNode.portType === 'output') return false; // Can't connect input to output (wrong direction)
        
        // Check if connection already exists
        const existingConnection = connections.value.find(
            conn => conn.from.id === fromNode.id && conn.to.id === toNode.id
        );
        if (existingConnection) return false;

        return true;
    };

    // Connection management
    const addConnection = (fromNode, toNode) => {
        if (!canConnect(fromNode, toNode)) return false;
        
        const connection = createConnection(fromNode, toNode);
        connections.value.push(connection);
        return connection;
    };

    const removeConnection = (connectionId) => {
        const index = connections.value.findIndex(conn => conn.id === connectionId);
        if (index !== -1) {
            connections.value.splice(index, 1);
        }
    };

    const selectConnection = (connectionId) => {
        // Deselect all connections first
        connections.value.forEach(conn => conn.selected = false);
        
        if (connectionId) {
            const connection = connections.value.find(conn => conn.id === connectionId);
            if (connection) {
                connection.selected = true;
                selectedConnection.value = connection;
            }
        } else {
            selectedConnection.value = null;
        }
    };

    // Drag state management
    const startDrag = (node, event) => {
        isDragging.value = true;
        dragStartNode.value = node;
        dragEndPosition.value = { x: event.clientX, y: event.clientY };
    };

    const updateDrag = (event) => {
        if (isDragging.value) {
            dragEndPosition.value = { x: event.clientX, y: event.clientY };
        }
    };

    const endDrag = (targetNode) => {
        if (isDragging.value && dragStartNode.value && targetNode) {
            if (canConnect(dragStartNode.value, targetNode)) {
                addConnection(dragStartNode.value, targetNode);
            }
        }
        
        isDragging.value = false;
        dragStartNode.value = null;
        dragEndPosition.value = { x: 0, y: 0 };
    };

    const cancelDrag = () => {
        isDragging.value = false;
        dragStartNode.value = null;
        dragEndPosition.value = { x: 0, y: 0 };
    };

    // Node hover management
    const setHoveredNode = (node) => {
        hoveredNode.value = node;
    };

    const clearHoveredNode = () => {
        hoveredNode.value = null;
    };

    // Computed properties
    const isConnectionValid = computed(() => {
        if (!isDragging.value || !dragStartNode.value || !hoveredNode.value) return false;
        return canConnect(dragStartNode.value, hoveredNode.value);
    });

    const isConnectionInvalid = computed(() => {
        if (!isDragging.value || !dragStartNode.value || !hoveredNode.value) return false;
        return !canConnect(dragStartNode.value, hoveredNode.value);
    });

    // Keyboard shortcuts
    const handleKeydown = (event) => {
        if (event.key === 'Delete' || event.key === 'Backspace') {
            if (selectedConnection.value) {
                removeConnection(selectedConnection.value.id);
                selectedConnection.value = null;
            }
        }
        if (event.key === 'Escape') {
            cancelDrag();
            selectConnection(null);
        }
    };

    return {
        // State
        connections,
        isDragging,
        dragStartNode,
        dragEndPosition,
        selectedConnection,
        hoveredNode,
        
        // Computed
        isConnectionValid,
        isConnectionInvalid,
        
        // Methods
        getNodeId,
        canConnect,
        addConnection,
        removeConnection,
        selectConnection,
        startDrag,
        updateDrag,
        endDrag,
        cancelDrag,
        setHoveredNode,
        clearHoveredNode,
        handleKeydown
    };
} 