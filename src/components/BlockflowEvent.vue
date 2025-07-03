<template>
    <div class="event-item" :class="[type, { selected: selected }]" @click="type !== 'flow' ? handleClick($event) : null">
        <div class="event-header hstack" @click="type === 'flow' ? handleClick($event) : null">
            <div v-if="stepNumber" class="step-number">{{ stepNumber }}</div>
            <!-- <ChevronRight size="16" stroke-width="1.5" /> -->
            <div class="event-info">
                <h3 class="event-title">{{ title }}</h3>
                <!-- <p v-if="description" class="event-description">{{ description }}</p> -->
            </div>
            <span class="event-type">{{ type }}</span>
            <slot name="icon" />
        </div>
        <div class="event-content">
            <div v-if="inputs || outputs" class="event-variables hstack">
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
    import { ChevronRight, ChevronDown } from 'lucide-vue-next';
    import BlockflowVariable from './BlockflowVariable.vue';

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
            validator: (value) => ['trigger', 'action', 'flow'].includes(value)
        },
        description: {
            type: String,
            required: true
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
        }
    });

    const emit = defineEmits(['select']);

    const handleClick = (event) => {
        // Stop event propagation to prevent parent flow blocks from capturing the click
        event.stopPropagation();
        
        emit('select', {
            uid: props.uid,
            title: props.title,
            type: props.type,
            description: props.description,
            inputs: props.inputs || [],
            outputs: props.outputs || [],
            stepNumber: props.stepNumber
        });
    };
</script>

<style scoped>
    .event-item {
        list-style: none;
        color: var(--color-surface-fg);
        background-color: var(--color-surface);
        border: 1px solid var(--color-surface-tint-dark);
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
        outline: 1px solid var(--color-surface-fg);
    }

    .event-item.flow {
        background-color: transparent;
        border-color: transparent;
        outline: none;
        border-radius: 0;
    }

    .event-item.flow:hover .event-header {
        border-color: orange;
    }

    .event-item.flow > .event-header {
        border-radius: var(--radius-l);
        background-color: var(--color-surface);
        border: 1px solid var(--color-surface-tint-dark);
        cursor: pointer;
    }

    .event-item.flow > .event-header:hover {
        border-color: var(--color-accent);
    }

    .event-item.flow.selected > .event-header {
        border-color: var(--color-surface-fg);
        outline: 1px solid var(--color-surface-fg);
    }

    .event-header {
        align-items: center;
        gap: var(--space-s);
        padding: var(--space-s);
    }
    
    .step-number {
        color: var(--color-surface-fg-tertiary);
    }

    .event-info {
        flex: 1;
    }
    
    .event-title {
        font-size: var(--font-size-m);
        font-weight: var(--font-weight-semibold);
    }

    .event-description {
        font-size: var(--font-size-s);
        color: var(--color-surface-fg-tertiary);
        line-height: var(--line-height-tight);
    }

    .event-type {
        color: var(--color-surface-fg-tertiary);
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



    .rules {
        padding: var(--space-xs);
        padding-bottom: 0;
    }

    .rules-list {
        gap: var(--space-xs);
    }
</style>