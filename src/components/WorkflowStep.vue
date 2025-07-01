<template>
    <div class="step">
        <header class="hstack">
            <div class="title">{{ title }}</div>
            <div class="type hstack">
                <component :is="iconMap[icon]" :size="16" />
                {{ selectedType }}
            </div>
        </header>

        <!-- <select class="type" v-model="selectedType">
            <option value="run">Run</option>
            <option value="first-match">First match</option>
            <option value="all-matches">All matches</option>
        </select> -->

        <div class="tools hstack">
            <slot></slot>
            <button><Hammer size="16" stroke-width="1.5" />Add</button>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { CopyCheck, Hammer, SquarePlay } from 'lucide-vue-next';

    const props = defineProps({
        title: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            default: 'SquarePlay'
        },
        stepType: {
            type: String,
            default: 'run'
        }
    });

    const selectedType = ref(props.stepType);

    const iconMap = {
        SquarePlay,
        CopyCheck
    };
</script>

<style scoped>
.step {
    background-color: var(--color-chrome);
    border: 1px solid var(--color-surface-tint-dark);
    box-shadow: var(--shadow-3);
    border-radius: var(--radius-l);
    width: fit-content;
    overflow: hidden;
}

header {
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-chrome);
    border-bottom: 1px solid var(--color-surface-tint);
    padding: var(--space-xs) var(--space-m);
    font-size: var(--font-size-s);
}

.title {
    font-weight: var(--font-weight-medium);
}

.type {
    align-items: center;
    gap: var(--space-xxs);
    color: var(--color-surface-fg-secondary);
}

.tools {
    margin: var(--space-xl) 0;
    gap: var(--space-m);
    padding: var(--space-xs) var(--space-m);
}
</style> 