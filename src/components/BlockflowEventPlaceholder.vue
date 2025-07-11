<template>
    <div class="event-placeholder" :class="{ selected: selected }" @click="handleClick">
        <div class="event-header">
            <div class="event-options hstack">
                <button 
                    ref="expertBtn"
                    class="option-btn" 
                    @click="handleOptionClick('expert', $event)"
                >
                    <FlaskConical size="16" stroke-width="1.5" />
                    <span>Expert</span>
                </button>
                <button 
                    ref="toolBtn"
                    class="option-btn" 
                    @click="handleOptionClick('tool', $event)"
                >
                    <Hammer size="16" stroke-width="1.5" />
                    <span>Tool</span>
                </button>
                <button 
                    ref="flowBtn"
                    class="option-btn" 
                    @click="handleOptionClick('flow', $event)"
                >
                    <Milestone size="16" stroke-width="1.5" />
                    <span>Flow</span>
                </button>
            </div>
            <button class="remove-btn" @click="handleRemove" title="Remove this placeholder">
                <X size="16" stroke-width="1.5" />
            </button>
        </div>
        
        <!-- Expert Popover -->
        <Popover
            :show="showExpertPopover"
            :trigger="expertBtn"
            placement="bottom-start"
            @close="showExpertPopover = false"
        >
            <template #content>
                <div class="popover-list">
                    <div class="popover-header">
                        <h3>Choose Expert</h3>
                    </div>
                    <div class="popover-items">
                        <button 
                            v-for="expert in experts" 
                            :key="expert.id"
                            class="popover-item"
                            @click="handleExpertSelect(expert)"
                        >
                            <div class="item-content">
                                <div class="item-title">{{ expert.title }}</div>
                                <div class="item-description">{{ expert.description }}</div>
                            </div>
                        </button>
                    </div>
                </div>
            </template>
        </Popover>
        
        <!-- Tool Popover -->
        <Popover
            :show="showToolPopover"
            :trigger="toolBtn"
            placement="bottom-start"
            @close="showToolPopover = false"
        >
            <template #content>
                <div class="popover-list">
                    <div class="popover-header">
                        <h3>Choose Tool</h3>
                    </div>
                    <div class="popover-items">
                        <button 
                            v-for="tool in tools" 
                            :key="tool.id"
                            class="popover-item"
                            @click="handleToolSelect(tool)"
                        >
                            <div class="item-content">
                                <div class="item-title">{{ tool.title }}</div>
                                <div class="item-description">{{ tool.description }}</div>
                            </div>
                        </button>
                    </div>
                </div>
            </template>
        </Popover>
        
        <!-- Flow Popover -->
        <Popover
            :show="showFlowPopover"
            :trigger="flowBtn"
            placement="bottom-start"
            @close="showFlowPopover = false"
        >
            <template #content>
                <div class="popover-list">
                    <div class="popover-header">
                        <h3>Choose Flow Control</h3>
                    </div>
                    <div class="popover-items">
                        <button 
                            v-for="flowType in flowTypes" 
                            :key="flowType.id"
                            class="popover-item"
                            @click="handleFlowSelect(flowType)"
                        >
                            <div class="item-content">
                                <div class="item-title">{{ flowType.title }}</div>
                                <div class="item-description">{{ flowType.description }}</div>
                            </div>
                        </button>
                    </div>
                </div>
            </template>
        </Popover>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { X, FlaskConical, Hammer, Milestone } from 'lucide-vue-next';
    import Popover from './Popover.vue';
    import { experts } from '@/data/experts.js';
    import { tools } from '@/data/tools.js';

    const props = defineProps({
        uid: {
            type: String,
            required: true
        },
        selected: {
            type: Boolean,
            default: false
        },
        position: {
            type: Number,
            required: true
        },
        branchId: {
            type: String,
            default: null
        }
    });

    const emit = defineEmits(['confirm', 'remove', 'select']);

    const selectedType = ref('');
    const showExpertPopover = ref(false);
    const showToolPopover = ref(false);
    const showFlowPopover = ref(false);
    const expertBtn = ref(null);
    const toolBtn = ref(null);
    const flowBtn = ref(null);

    // Flow control types
    const flowTypes = [
        {
            id: 'if-else',
            title: 'If/Else',
            description: 'Branch the workflow based on a condition'
        },
        {
            id: 'while-loop',
            title: 'While Loop',
            description: 'Repeat actions while a condition is true'
        },
        {
            id: 'for-loop',
            title: 'For Loop',
            description: 'Repeat actions for a specific number of iterations'
        },
        {
            id: 'switch',
            title: 'Switch',
            description: 'Branch based on multiple possible values'
        },
        {
            id: 'try-catch',
            title: 'Try/Catch',
            description: 'Handle errors and exceptions gracefully'
        },
        {
            id: 'parallel',
            title: 'Parallel',
            description: 'Execute multiple branches simultaneously'
        }
    ];

    const handleOptionClick = (type, event) => {
        event.stopPropagation();
        
        if (type === 'expert') {
            showExpertPopover.value = true;
            showToolPopover.value = false;
            showFlowPopover.value = false;
        } else if (type === 'tool') {
            showToolPopover.value = true;
            showExpertPopover.value = false;
            showFlowPopover.value = false;
        } else if (type === 'flow') {
            showFlowPopover.value = true;
            showExpertPopover.value = false;
            showToolPopover.value = false;
        }
    };

    const handleExpertSelect = (expert) => {
        showExpertPopover.value = false;
        emit('confirm', {
            uid: props.uid,
            type: 'expert',
            expertId: expert.id,
            title: expert.title,
            description: expert.description,
            inputs: expert.inputs || [],
            outputs: expert.outputs || [],
            tools: expert.tools || [],
            position: props.position,
            branchId: props.branchId
        });
    };

    const handleToolSelect = (tool) => {
        showToolPopover.value = false;
        emit('confirm', {
            uid: props.uid,
            type: 'tool',
            toolId: tool.id,
            title: tool.title,
            description: tool.description,
            icon: tool.icon,
            value: tool.value,
            position: props.position,
            branchId: props.branchId
        });
    };

    const handleFlowSelect = (flowType) => {
        showFlowPopover.value = false;
        emit('confirm', {
            uid: props.uid,
            type: 'flow',
            flowType: flowType.id,
            title: flowType.title,
            description: flowType.description,
            position: props.position,
            branchId: props.branchId
        });
    };

    const handleOptionSelect = (type) => {
        emit('confirm', {
            uid: props.uid,
            type: type,
            position: props.position,
            branchId: props.branchId
        });
    };

    const handleTypeChange = () => {
        // Could emit type change if needed for live preview
    };

    const handleConfirm = () => {
        if (selectedType.value) {
            emit('confirm', {
                uid: props.uid,
                type: selectedType.value,
                position: props.position,
                branchId: props.branchId
            });
        }
    };

    const handleRemove = () => {
        emit('remove', {
            uid: props.uid,
            position: props.position,
            branchId: props.branchId
        });
    };

    const handleClick = (event) => {
        // Close popovers when clicking on the placeholder background
        if (event.target.classList.contains('event-placeholder') || event.target.classList.contains('event-header')) {
            showExpertPopover.value = false;
            showToolPopover.value = false;
            showFlowPopover.value = false;
        }
        
        event.stopPropagation();
        emit('select', {
            uid: props.uid,
            type: 'placeholder',
            title: 'New Event',
            description: 'Select an event type to add to the workflow',
            position: props.position,
            branchId: props.branchId
        });
    };
</script>

<style scoped>
    .event-placeholder {
        list-style: none;
        color: var(--color-surface-fg);
        border: 2px solid var(--color-surface-tint);
        border-radius: var(--radius-l);
        width: fit-content;
        height: fit-content;
        cursor: pointer;
        transition: all 0.2s ease;
        min-width: 300px;
    }

    .event-placeholder:hover {
        border-color: var(--color-accent);
    }

    .event-placeholder.selected {
        border-color: var(--color-surface-fg);
    }

    .event-header {
        align-items: center;
        gap: var(--space-s);
        padding: var(--space-s);
        display: flex;
        justify-content: space-between;
    }

    .event-options {
        gap: var(--space-xs);
    }

    .option-btn {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        padding: var(--space-xs) var(--space-s);
        border: 1px solid var(--color-surface-tint);
        border-radius: var(--radius-s);
        background-color: var(--color-surface);
        color: var(--color-surface-fg);
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-medium);
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .option-btn:hover {
        background-color: var(--color-accent);
        border-color: var(--color-accent);
        color: var(--color-accent-fg);
    }

    .remove-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--space-xs);
        border: 1px solid var(--color-surface-tint);
        border-radius: var(--radius-s);
        background-color: var(--color-surface);
        color: var(--color-surface-fg-secondary);
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .remove-btn:hover {
        background-color: var(--color-error);
        border-color: var(--color-error);
        color: var(--color-error-fg);
    }

    .event-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-surface-fg-secondary);
    }

    .event-content {
        border-top: 1px solid var(--color-surface-tint);
        background-color: var(--color-surface-tint-light);
        padding: var(--space-s);
    }

    .placeholder-actions {
        gap: var(--space-s);
        justify-content: flex-end;
    }

    .popover-list {
        min-width: 300px;
        max-width: 400px;
    }

    .popover-header {
        padding: var(--space-s);
        border-bottom: 1px solid var(--color-surface-tint);
    }

    .popover-header h3 {
        margin: 0;
        font-size: var(--font-size-m);
        font-weight: var(--font-weight-medium);
        color: var(--color-surface-fg);
    }

    .popover-items {
        max-height: 300px;
        overflow-y: auto;
    }

    .popover-item {
        width: 100%;
        padding: var(--space-s);
        border: none;
        background: none;
        text-align: left;
        cursor: pointer;
        transition: background-color 0.2s ease;
        border-bottom: 1px solid var(--color-surface-tint);
    }

    .popover-item:last-child {
        border-bottom: none;
    }

    .popover-item:hover {
        background-color: var(--color-surface-tint-light);
    }

    .item-content {
        display: flex;
        flex-direction: column;
        gap: var(--space-xs);
    }

    .item-title {
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-medium);
        color: var(--color-surface-fg);
    }

    .item-description {
        font-size: var(--font-size-xs);
        color: var(--color-surface-fg-secondary);
        line-height: var(--line-height-compact);
    }
</style> 