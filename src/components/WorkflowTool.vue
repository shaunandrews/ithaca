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
            >
                <div class="node-name">{{ input }}</div>
                <CircleArrowDown :size="16" stroke-width="1.5" class="node-icon" />
            </div>
        </div>
        <div class="outputs nodes hstack">
            <div 
                v-for="output in outputs" 
                :key="output" 
                class="node vstack"
            >
                <CircleArrowDown :size="16" stroke-width="1.5" class="node-icon" />
                <div class="node-name">{{ output }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { CircleArrowUp, CircleArrowDown } from 'lucide-vue-next';

    defineProps({
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
        }
    });
</script>

<style scoped>
    .tool {
        background-color: var(--color-surface);
        border: 1px solid var(--color-surface-tint-dark);
        box-shadow: var(--shadow-1);
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
</style> 