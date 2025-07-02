# Connection System Documentation

## Overview

The connection system provides a beautiful and intuitive drag-and-drop interface for creating connections between workflow nodes. It supports visual feedback, connection validation, selection, and deletion.

## Architecture

### Core Components

1. **`useConnections` Composable** (`src/composables/useConnections.js`)
   - Central state management for all connection-related data
   - Handles drag state, connection validation, and CRUD operations
   - Provides keyboard shortcuts and event handlers

2. **`ConnectionCanvas` Component** (`src/components/ConnectionCanvas.vue`)
   - SVG overlay that renders all connections
   - Handles connection path generation with beautiful curves
   - Provides visual feedback during drag operations
   - Manages connection selection and hover states

3. **Enhanced `WorkflowTool` Component** (`src/components/WorkflowTool.vue`)
   - Input/output nodes with drag-and-drop functionality
   - Visual feedback for valid/invalid connection targets
   - Event emission for connection system integration

### Data Flow

```
User Interaction → WorkflowTool → useConnections → ConnectionCanvas → Visual Update
```

## Features

### 1. Drag-and-Drop Connections

- **Drag from outputs**: Users can drag from output nodes (bottom of tools)
- **Drop on inputs**: Connections can only be made to input nodes (top of tools)
- **Visual feedback**: Real-time preview of potential connections
- **Validation**: Prevents invalid connections (same tool, wrong direction, duplicates)

### 2. Connection Validation

The system prevents:
- Connecting a node to itself
- Connecting input to input or output to output
- Connecting input to output (wrong direction)
- Creating duplicate connections
- Connecting nodes from the same tool

### 3. Visual Feedback

- **Dragging state**: Animated dashed line follows cursor
- **Valid targets**: Green glow and scaling effect
- **Invalid targets**: Red glow and scaling effect
- **Hover effects**: Smooth transitions and visual emphasis
- **Selected connections**: Highlighted with accent color and shadow

### 4. Connection Management

- **Selection**: Click on connections to select them
- **Deletion**: Press Delete/Backspace to remove selected connections
- **Canvas click**: Deselect connections by clicking empty space
- **Escape key**: Cancel drag operations

### 5. Beautiful Rendering

- **Curved paths**: Smooth Bézier curves for natural flow
- **Directional arrows**: Clear indication of data flow
- **Responsive design**: Adapts to canvas size changes
- **Smooth animations**: CSS transitions for all state changes

## Implementation Details

### Connection Data Structure

```javascript
{
  id: "tool-uid-output-portName",
  from: {
    id: "tool-uid-output-portName",
    toolUid: "tool-uid",
    portName: "portName",
    portType: "output"
  },
  to: {
    id: "tool-uid-input-portName", 
    toolUid: "tool-uid",
    portName: "portName",
    portType: "input"
  },
  type: "default",
  selected: false
}
```

### Node Identification

Nodes are identified using the pattern: `${toolUid}-${portType}-${portName}`

Examples:
- `initial-message-tool-output-message`
- `classify-initial-message-tool-input-message`

### Path Generation

The system uses SVG Bézier curves for smooth, natural-looking connections:

```javascript
const createCurvedPath = (start, end) => {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const controlDistance = Math.min(distance * 0.4, 100);
  
  const control1 = { x: start.x + controlDistance, y: start.y };
  const control2 = { x: end.x - controlDistance, y: end.y };
  
  return `M ${start.x} ${start.y} C ${control1.x} ${control1.y}, ${control2.x} ${control2.y}, ${end.x} ${end.y}`;
};
```

## Usage

### Basic Integration

1. Import the connection system in your view:

```javascript
import { useConnections } from '../composables/useConnections.js';
import ConnectionCanvas from '../components/ConnectionCanvas.vue';

const {
  connections,
  isDragging,
  // ... other properties
} = useConnections();
```

2. Add the ConnectionCanvas to your template:

```vue
<template>
  <div class="canvas">
    <ConnectionCanvas
      :connections="connections"
      :is-dragging="isDragging"
      @update-drag="updateDrag"
      @end-drag="endDrag"
      @select-connection="selectConnection"
    />
    <!-- Your workflow components -->
  </div>
</template>
```

3. Enhance your WorkflowTool components:

```vue
<WorkflowTool
  :is-dragging="isDragging"
  :drag-start-node="dragStartNode"
  :hovered-node="hoveredNode"
  @node-mousedown="onNodeMouseDown"
  @node-mouseenter="onNodeMouseEnter"
  @node-mouseleave="onNodeMouseLeave"
  @node-mouseup="onNodeMouseUp"
/>
```

### Event Handlers

```javascript
const onNodeMouseDown = ({ node, event }) => {
  if (node.portType === 'output') {
    startDrag(node, event);
  }
};

const onNodeMouseUp = ({ node, event }) => {
  if (isDragging.value && node.portType === 'input') {
    endDrag(node);
  } else {
    cancelDrag();
  }
};
```

## Styling

The system uses CSS custom properties for consistent theming:

```css
:root {
  --color-success: #00a32a;
  --color-success-fg: #ffffff;
  --color-success-rgb: 0, 163, 42;
  
  --color-error: #d63638;
  --color-error-fg: #ffffff;
  --color-error-rgb: 214, 54, 56;
  
  --color-accent-rgb: 6, 64, 224;
}
```

### Key CSS Classes

- `.connection-path`: Base connection line styling
- `.connection-path.selected`: Selected connection highlighting
- `.connection-path.dragging`: Animated dashed line during drag
- `.connection-path.dragging.valid`: Green color for valid targets
- `.connection-path.dragging.invalid`: Red color for invalid targets
- `.node.valid-target`: Green glow for valid drop targets
- `.node.invalid-target`: Red glow for invalid drop targets

## Keyboard Shortcuts

- **Delete/Backspace**: Remove selected connection
- **Escape**: Cancel drag operation or deselect connection

## Performance Considerations

- SVG rendering is optimized for smooth performance
- Event listeners are properly cleaned up on component unmount
- Canvas size updates are debounced to prevent excessive recalculations
- Connection paths are only recalculated when necessary

## Future Enhancements

### Planned Features

1. **Connection Types**: Different visual styles for different connection types
2. **Connection Labels**: Optional labels on connections
3. **Connection Routing**: Automatic path routing to avoid overlaps
4. **Undo/Redo**: Connection history management
5. **Bulk Operations**: Select multiple connections for batch operations
6. **Connection Validation Rules**: Custom validation logic per connection type
7. **Connection Animation**: Animated data flow visualization
8. **Connection Groups**: Group related connections visually

### Technical Improvements

1. **Virtual Scrolling**: For large workflows with many connections
2. **WebGL Rendering**: For extremely large connection graphs
3. **Connection Caching**: Cache calculated paths for better performance
4. **Touch Support**: Enhanced mobile/touch interaction
5. **Accessibility**: Screen reader support and keyboard navigation

## Troubleshooting

### Common Issues

1. **Connections not appearing**: Check that nodes have correct `data-node-id` attributes
2. **Drag not working**: Ensure output nodes have `@mousedown` handlers
3. **Invalid connections**: Verify connection validation logic in `useConnections`
4. **Performance issues**: Check for excessive re-renders or memory leaks

### Debug Mode

Enable debug logging by setting:

```javascript
const DEBUG_CONNECTIONS = true;
```

This will log connection events and state changes to the console.

## Best Practices

1. **Consistent Node IDs**: Always use the same pattern for node identification
2. **Event Cleanup**: Always remove global event listeners in `onUnmounted`
3. **Performance**: Avoid expensive calculations in render functions
4. **Accessibility**: Provide alternative ways to create connections
5. **Error Handling**: Gracefully handle edge cases and invalid states
6. **Testing**: Test with various screen sizes and interaction patterns 