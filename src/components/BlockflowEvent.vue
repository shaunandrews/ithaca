<template>
    <div class="event-item" :class="[type, { selected: selected }]" @click="type !== 'flow' ? handleClick($event) : null">
        <div class="event-header hstack" @click="type === 'flow' ? handleClick($event) : null">
            <div class="event-icon">
                <component :is="getIcon(type)" size="18" stroke-width="1.5" />
            </div>
            <h3 class="event-title">{{ title }}</h3>
        </div>
        <div class="event-content">
            <div v-if="type !== 'flow' && ((inputs && inputs.length > 0) || (outputs && outputs.length > 0))" class="event-variables hstack">
                <div v-if="inputs && inputs.length > 0" class="event-inputs vstack">
                    <h4>Inputs</h4>
                    <BlockflowVariable v-for="input in inputs" :key="input" type="input" :value="input" />
                </div>
                
                <div v-if="outputs && outputs.length > 0" class="event-outputs vstack">
                    <h4>Outputs</h4>
                    <BlockflowVariable v-for="output in outputs" :key="output" type="output" :value="output" />
                </div>
            </div>
            
            <div v-if="type === 'flow'" class="rules vstack">
                <div class="rules-list hstack">
                    <slot name="rules" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { FlaskConical, SquarePlay, Hammer, OctagonX, Milestone, CirclePause } from 'lucide-vue-next';
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

    const emit = defineEmits(['select']);

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
    
    .event-title {
        flex-grow: 1;
        font-size: var(--font-size-m);
        font-weight: var(--font-weight-semibold);
    }

    .event-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-surface-fg-secondary);
    }

    .event-variables {
        gap: var(--space-s);
        padding: var(--space-s);
        border-top: 1px solid var(--color-surface-tint-dark);
        background-color: var(--color-surface-tint-light);
    }

    .event-inputs,
    .event-outputs {
        gap: var(--space-xs);
    }

    .event-expert {
        padding: var(--space-s);
        border-top: 1px solid var(--color-surface-tint-dark);
        background-color: var(--color-surface-tint-light);
        display: flex;
        flex-direction: column;
        gap: var(--space-xs);
    }

    .expert-title {
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-semibold);
        color: var(--color-accent);
    }

    .expert-description {
        font-size: var(--font-size-xs);
        color: var(--color-surface-fg-secondary);
        line-height: 1.4;
    }

    .rules {
        margin-top: var(--space-xs);
    }

    .rules-list {
        align-items: flex-start;
        gap: var(--space-s);
    }
</style>