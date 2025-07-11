import { ref, onMounted, onUnmounted } from 'vue';

export function usePopoverPosition(triggerRef, popoverRef, options = {}) {
    const position = ref({ x: 0, y: 0 });
    const placement = ref(options.preferredPlacement || 'bottom');
    const isVisible = ref(false);

    const OFFSET = options.offset || 8;
    const ARROW_SIZE = options.arrowSize || 8;

    function calculatePosition() {
        const triggerElement = typeof triggerRef === 'function' ? triggerRef() : triggerRef.value;
        if (!triggerElement || !popoverRef.value) return;

        const triggerRect = triggerElement.getBoundingClientRect();
        const popoverRect = popoverRef.value.getBoundingClientRect();
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight,
            scrollX: window.scrollX,
            scrollY: window.scrollY
        };

        let x = 0;
        let y = 0;
        let finalPlacement = placement.value;

        // Parse placement to get main direction and alignment
        const [mainDirection, alignment] = placement.value.split('-');

        switch (mainDirection) {
            case 'top':
                y = triggerRect.top - popoverRect.height - OFFSET;
                
                // Handle horizontal alignment
                if (alignment === 'start') {
                    x = triggerRect.left;
                } else if (alignment === 'end') {
                    x = triggerRect.right - popoverRect.width;
                } else {
                    x = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
                }
                
                // Check if we need to flip to bottom
                if (y < 0) {
                    finalPlacement = alignment ? `bottom-${alignment}` : 'bottom';
                    y = triggerRect.bottom + OFFSET;
                }
                break;

            case 'bottom':
                y = triggerRect.bottom + OFFSET;
                
                // Handle horizontal alignment
                if (alignment === 'start') {
                    x = triggerRect.left;
                } else if (alignment === 'end') {
                    x = triggerRect.right - popoverRect.width;
                } else {
                    x = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
                }
                
                // Check if we need to flip to top
                if (y + popoverRect.height > viewport.height) {
                    finalPlacement = alignment ? `top-${alignment}` : 'top';
                    y = triggerRect.top - popoverRect.height - OFFSET;
                }
                break;

            case 'left':
                x = triggerRect.left - popoverRect.width - OFFSET;
                
                // Handle vertical alignment
                if (alignment === 'start') {
                    y = triggerRect.top;
                } else if (alignment === 'end') {
                    y = triggerRect.bottom - popoverRect.height;
                } else {
                    y = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
                }
                
                // Check if we need to flip to right
                if (x < 0) {
                    finalPlacement = alignment ? `right-${alignment}` : 'right';
                    x = triggerRect.right + OFFSET;
                }
                break;

            case 'right':
                x = triggerRect.right + OFFSET;
                
                // Handle vertical alignment
                if (alignment === 'start') {
                    y = triggerRect.top;
                } else if (alignment === 'end') {
                    y = triggerRect.bottom - popoverRect.height;
                } else {
                    y = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
                }
                
                // Check if we need to flip to left
                if (x + popoverRect.width > viewport.width) {
                    finalPlacement = alignment ? `left-${alignment}` : 'left';
                    x = triggerRect.left - popoverRect.width - OFFSET;
                }
                break;
        }

        // Constrain to viewport bounds while preserving alignment intent
        const [mainDir, align] = finalPlacement.split('-');
        
        // For end alignments, try to preserve right-edge alignment
        if (align === 'end' && (mainDir === 'top' || mainDir === 'bottom')) {
            // Only constrain if absolutely necessary (tooltip would go off-screen)
            if (x + popoverRect.width > viewport.width - OFFSET) {
                x = viewport.width - popoverRect.width - OFFSET;
            }
            // Don't constrain left edge for end alignments unless really necessary
            if (x < OFFSET) {
                x = OFFSET;
            }
        } else if (align === 'start' && (mainDir === 'top' || mainDir === 'bottom')) {
            // For start alignments, try to preserve left-edge alignment  
            if (x < OFFSET) {
                x = OFFSET;
            }
            if (x + popoverRect.width > viewport.width - OFFSET) {
                x = viewport.width - popoverRect.width - OFFSET;
            }
        } else {
            // Default constraining for center and vertical alignments
            x = Math.max(OFFSET, Math.min(x, viewport.width - popoverRect.width - OFFSET));
        }
        
        y = Math.max(OFFSET, Math.min(y, viewport.height - popoverRect.height - OFFSET));

        position.value = {
            x: x + viewport.scrollX,
            y: y + viewport.scrollY
        };
        
        placement.value = finalPlacement;
    }

    function handleResize() {
        if (isVisible.value) {
            calculatePosition();
        }
    }

    function handleScroll() {
        if (isVisible.value) {
            calculatePosition();
        }
    }

    function show() {
        isVisible.value = true;
        calculatePosition();
    }

    function hide() {
        isVisible.value = false;
    }

    onMounted(() => {
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll, true);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll, true);
    });

    return {
        position,
        placement,
        isVisible,
        show,
        hide,
        calculatePosition
    };
}