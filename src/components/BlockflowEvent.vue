<template>
    <div
        class="event-item"
        :class="[type, { selected: selected }]"
        @click="type !== 'flow' ? handleClick($event) : null"
    >
        <div
            class="event-header hstack"
            @click="type === 'flow' ? handleClick($event) : null"
        >
            <div class="event-icon">
                <component :is="getIcon(type)" size="18" stroke-width="1.5" />
            </div>

            <div class="event-details vstack">
                <h3 class="event-title">{{ title }}</h3>
                <div
                    class="expert-description"
                    v-if="type === 'expert' && expertInfo"
                >
                    {{ expertInfo.description }}
                </div>
            </div>
        </div>
        <div
            class="rules vstack"
            v-if="type === 'flow'"
        >
            <div class="rules-list hstack">
                <slot name="rules" />
                <div class="rules-add-button" @click="handleAddRule">
                    <div class="plus-button">
                        <Plus size="16" stroke-width="2" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { FlaskConical, SquarePlay, Hammer, OctagonX, Milestone, CirclePause, Plus } from 'lucide-vue-next';
    import BlockflowVariable from './BlockflowVariable.vue';
    import { getExpertById } from '../data/workflows.js';

    const props = defineProps({
        uid: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
            validator: (value) => ['trigger', 'action', 'flow', 'expert', 'tool', 'exit', 'pause'].includes(value)
        },
        expertId: {
            type: Number,
            default: null
        },
        inputs: {
            type: Array
        },
        outputs: {
            type: Array
        },
        stepNumber: {
            type: Number,
            default: null
        },
        selected: {
            type: Boolean,
            default: false
        },
        branches: {
            type: Array,
            default: () => []
        }
    });

    const emit = defineEmits(['select', 'addRule']);

    // Get expert information for expert-type steps
    const expertInfo = computed(() => {
        if (props.type === 'expert' && props.expertId) {
            return getExpertById(props.expertId);
        }
        return null;
    });

    const getIcon = (type) => {
        switch (type) {
            case 'expert':
                return FlaskConical;
            case 'trigger':
                return SquarePlay;
            case 'tool':
                return Hammer;
            case 'exit':
                return OctagonX;
            case 'flow':
                return Milestone;
            case 'pause':
                return CirclePause;
            default:
                return null;
        }
    };

    const handleClick = (event) => {
        // Stop event propagation to prevent parent flow blocks from capturing the click
        event.stopPropagation();
        
        emit('select', {
            uid: props.uid,
            title: props.title,
            type: props.type,
            expertId: props.expertId,
            inputs: props.inputs || [],
            outputs: props.outputs || [],
            stepNumber: props.stepNumber,
            branches: props.branches || []
        });
    };

    const handleAddRule = (event) => {
        event.stopPropagation();
        emit('addRule', {
            uid: props.uid,
            title: props.title,
            type: props.type
        });
    };
</script>

<style scoped>
    .event-item {
        list-style: none;
        color: var(--color-surface-fg);
        background-color: var(--color-surface);
        border: 2px solid var(--color-surface-tint-dark);
        border-radius: var(--radius-l);
        width: fit-content;
        height: fit-content;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .event-item:hover {
        border-color: var(--color-accent);
    }

    .event-item.selected {
        border-color: var(--color-surface-fg);
    }

    .event-item.flow {
        background-color: transparent;
        border: none;
        outline: none;
        border-radius: 0;
    }

    .event-item.flow > .event-header {
        border-radius: var(--radius-l);
        background-color: var(--color-surface);
        border: 2px solid var(--color-surface-tint-dark);
        cursor: pointer;
        margin: 0 var(--space-xs);
    }

    .event-item.flow > .event-header:hover {
        border-color: var(--color-accent);
    }

    .event-item.flow.selected > .event-header {
        border-color: var(--color-surface-fg);
    }

    .event-header {
        align-items: center;
        gap: var(--space-s);
        padding: var(--space-s);
    }

    .event-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-surface-fg-secondary);
    }

    .event-details {
        gap: var(--space-xxs);
    }

    .event-title {
        flex-grow: 1;
        font-size: var(--font-size-m);
        font-weight: var(--font-weight-semibold);
    }

    .expert-description {
        font-size: var(--font-size-s);
        color: var(--color-surface-fg-secondary);
        max-width: 200px;
        line-height: var(--line-height-tight);
    }

    .rules {
        margin-top: var(--space-xs);
    }

    .rules-list {
        gap: var(--space-xs);
        overflow-x: auto;
        padding: 0 var(--space-xs);
    }

    .rules-add-button {
        cursor: pointer;
        padding: var(--space-xs);
        border-radius: var(--radius-m);
        background-color: transparent;
        border: 2px solid rgba(255, 166, 0, 0.4);
        /* background-color: rgba(255, 166, 0, 0.05); */
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        opacity: 0.6;
        min-width: 40px;
        height: 40px;
    }

    .rules-add-button:hover {
        background-color: rgba(255, 166, 0, 0.1);
        border-color: rgba(255, 166, 0, 0.5);
        opacity: 1;
    }

    .rules-add-button:hover .plus-button {
        color: rgba(255, 166, 0, 1);
    }

    .plus-button {
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(255, 166, 0, 0.5);
        transition: color 0.2s ease;
    }
</style>