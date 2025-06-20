# Composables

This directory contains Vue 3 composables for reusable logic across the application.

## useSidebar

Manages the sidebar state and responsive behavior.

### Features

- **State Management**: Tracks whether the sidebar is in mini or full mode
- **Local Storage Persistence**: Remembers user preference across sessions
- **Responsive Behavior**: Auto-collapses on mobile devices (< 768px)
- **CSS Variable Integration**: Uses design system variables for consistent widths

### Usage

```javascript
import { useSidebar } from '@/composables/useSidebar';

const { isMini, isMobile, sidebarWidth, toggleSidebar } = useSidebar();
```

### API

- `isMini`: Reactive boolean indicating if sidebar is collapsed
- `isMobile`: Reactive boolean indicating if screen is mobile size
- `sidebarWidth`: Computed CSS variable string for current width
- `toggleSidebar()`: Function to toggle between mini and full modes

### CSS Variables Used

- `--sidebar-width`: Full sidebar width (220px)
- `--sidebar-width-mini`: Mini sidebar width (60px)

### Responsive Behavior

- **Desktop**: User can toggle between mini and full modes
- **Mobile**: Auto-collapses to mini mode, prevents expansion
- **Breakpoint**: 768px 