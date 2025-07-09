<template>
    <div class="blockflow-variable-container" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" ref="containerRef">
        <span 
            class="blockflow-variable" 
            :class="[`blockflow-variable--${type}`, { 'blockflow-variable--clickable': clickable }]"
            @click="handleClick"
        >
            <slot>{{ value }}</slot>
        </span>
    </div>
    
    <!-- Teleported Tooltip -->
    <!-- <Teleport to="body">
        <div 
            v-if="showTooltip && tooltipPosition" 
            class="blockflow-variable-tooltip" 
            :class="`blockflow-variable-tooltip--${type}`"
            :style="tooltipStyle"
        >
            <div class="tooltip-header">
                <span class="tooltip-type">{{ getTypeLabel() }}</span>
                <span class="tooltip-name">{{ value || 'Variable' }}</span>
            </div>
            <div class="tooltip-description">
                {{ getDescription() }}
            </div>
            <div v-if="getExample()" class="tooltip-example">
                <span class="tooltip-example-label">Example:</span>
                <code class="tooltip-example-value">{{ getExample() }}</code>
            </div>
        </div>
    </Teleport> -->
</template>

<script setup>
    import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue';

    const props = defineProps({
        type: {
            type: String,
            default: 'context',
            validator: (value) => ['context', 'input', 'output', 'rule-variable', 'rule-value', 'variable'].includes(value)
        },
        value: {
            type: String,
            default: ''
        },
        clickable: {
            type: Boolean,
            default: false
        },
        description: {
            type: String,
            default: ''
        },
        example: {
            type: String,
            default: ''
        }
    });

    const emit = defineEmits(['click']);

    const showTooltip = ref(false);
    const containerRef = ref(null);
    const tooltipPosition = ref(null);

    const handleClick = (event) => {
        if (props.clickable) {
            emit('click', event);
        }
    };

    const updateTooltipPosition = async () => {
        if (!containerRef.value) return;
        
        await nextTick();
        
        const rect = containerRef.value.getBoundingClientRect();
        const tooltipWidth = 250; // Approximate tooltip width
        const tooltipHeight = 120; // Approximate tooltip height
        
        // Calculate position
        let left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
        let top = rect.bottom + 8;
        
        // Check if tooltip would go off screen
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Adjust horizontal position if needed
        if (left < 8) {
            left = 8;
        } else if (left + tooltipWidth > viewportWidth - 8) {
            left = viewportWidth - tooltipWidth - 8;
        }
        
        // Check if tooltip would go below viewport
        if (top + tooltipHeight > viewportHeight - 8) {
            // Position above the element instead
            top = rect.top - tooltipHeight - 8;
        }
        
        tooltipPosition.value = { left, top };
    };

    const tooltipStyle = computed(() => {
        if (!tooltipPosition.value) return {};
        
        return {
            position: 'fixed',
            left: `${tooltipPosition.value.left}px`,
            top: `${tooltipPosition.value.top}px`,
            zIndex: 1000
        };
    });

    const handleMouseEnter = async () => {
        showTooltip.value = true;
        await updateTooltipPosition();
    };

    const handleMouseLeave = () => {
        showTooltip.value = false;
        tooltipPosition.value = null;
    };

    const getTypeLabel = () => {
        const labels = {
            'context': 'Context Variable',
            'input': 'Input Variable',
            'output': 'Output Variable',
            'rule-variable': 'Rule Variable',
            'rule-value': 'Rule Value',
            'variable': 'Variable'
        };
        return labels[props.type] || 'Variable';
    };

    const getDescription = () => {
        if (props.description) {
            return props.description;
        }
        
        const descriptions = {
            'context': 'Available context data from the conversation or system',
            'input': 'User input or data passed to this step',
            'output': 'Data produced by this step that can be used elsewhere',
            'rule-variable': 'Variable used in conditional logic',
            'rule-value': 'Value to compare against in conditional logic',
            'variable': 'General variable data used throughout the flow'
        };
        return descriptions[props.type] || 'Variable data';
    };

    const getExample = () => {
        if (props.example) {
            return props.example;
        }
        
        const examples = {
            'context': 'user.name, conversation.id, timestamp',
            'input': 'message.text, form.email, file.content',
            'output': 'response.text, analysis.score, data.items',
            'rule-variable': 'user.role, message.sentiment, count',
            'rule-value': '"admin", "positive", 5',
            'variable': 'message, tag, response, email_address'
        };
        return examples[props.type] || '';
    };

    // Update position on window resize
    const handleResize = () => {
        if (showTooltip.value) {
            updateTooltipPosition();
        }
    };

    onMounted(() => {
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleResize);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleResize);
    });
</script>

<style scoped>
    .blockflow-variable-container {
        display: inline-block;
    }

    .blockflow-variable {
        padding: 0 var(--space-xxs);
        border-radius: var(--radius-s);
        width: fit-content;
        font-family: var(--font-monospace);
        font-size: var(--font-size-s);
        border-bottom: 1px dashed transparent;
        transition: all 0.2s ease;
    }

    .blockflow-variable--clickable {
        cursor: pointer;
    }

    .blockflow-variable--clickable:hover {
        opacity: 0.8;
    }

    /* Context variables - accent color */
    .blockflow-variable--context {
        font-weight: var(--font-weight-semibold);
        color: var(--color-accent);
        background-color: var(--color-accent-tint);
        border-bottom-color: var(--color-accent);
    }

    /* Input variables - highlight color */
    .blockflow-variable--input {
        font-weight: var(--font-weight-medium);
        color: var(--color-highlight);
        background-color: var(--color-highlight-tint);
        border-bottom-color: var(--color-highlight);
    }

    /* Output variables - accent color */
    .blockflow-variable--output {
        font-weight: var(--font-weight-semibold);
        color: var(--color-accent);
        background-color: var(--color-accent-tint);
        border-bottom-color: var(--color-accent);
    }

    /* Rule variables - highlight color */
    .blockflow-variable--rule-variable {
        font-weight: var(--font-weight-medium);
        color: var(--color-highlight);
        background-color: var(--color-highlight-tint);
        border-bottom-color: var(--color-highlight);
    }

    /* Rule values - surface tint color */
    .blockflow-variable--rule-value {
        font-weight: var(--font-weight-normal);
        background-color: var(--color-surface-tint);
        border-bottom-color: var(--color-accent);
        color: var(--color-surface-fg-secondary);
    }

    /* Variables - neutral color */
    .blockflow-variable--variable {
        font-weight: var(--font-weight-medium);
        color: var(--color-surface-fg);
        background-color: var(--color-surface-tint-light);
        border-bottom-color: var(--color-surface-fg-tertiary);
    }

    /* Tooltip styles */
    .blockflow-variable-tooltip {
        background: var(--color-tooltip);
        backdrop-filter: blur(4px);
        border-radius: var(--radius-m);
        padding: var(--space-s);
        min-width: 200px;
        max-width: 300px;
        box-shadow: var(--shadow-3);
        font-family: var(--font-system);
        font-size: var(--font-size-s);
        line-height: var(--line-height-normal);
        color: var(--color-tooltip-fg);
        pointer-events: none;
    }

    .tooltip-header {
        display: flex;
        flex-direction: column;
        gap: var(--space-xxs);
        margin-bottom: var(--space-xs);
    }

    .tooltip-type {
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-medium);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        opacity: 0.7;
    }

    .tooltip-name {
        font-family: var(--font-monospace);
        font-weight: var(--font-weight-semibold);
        color: var(--color-accent);
    }

    .tooltip-description {
        margin-bottom: var(--space-xs);
        color: rgba(255, 255, 255, 0.8);
        font-size: var(--font-size-s);
    }

    .tooltip-example {
        display: flex;
        flex-direction: column;
        gap: var(--space-xxs);
    }

    .tooltip-example-label {
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-medium);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        opacity: 0.7;
    }

    .tooltip-example-value {
        font-family: var(--font-monospace);
        font-size: var(--font-size-xs);
        background: rgba(255, 255, 255, 0.1);
        padding: var(--space-xxs) var(--space-xs);
        border-radius: var(--radius-s);
        color: var(--color-tooltip-fg);
    }

    /* Type-specific tooltip styling */
    .blockflow-variable-tooltip--context .tooltip-name {
        color: var(--color-accent);
    }

    .blockflow-variable-tooltip--input .tooltip-name {
        color: var(--color-highlight);
    }

    .blockflow-variable-tooltip--output .tooltip-name {
        color: var(--color-accent);
    }

    .blockflow-variable-tooltip--rule-variable .tooltip-name {
        color: var(--color-highlight);
    }

    .blockflow-variable-tooltip--rule-value .tooltip-name {
        color: rgba(255, 255, 255, 0.7);
    }

    .blockflow-variable-tooltip--variable .tooltip-name {
        color: rgba(255, 255, 255, 0.9);
    }
</style> 