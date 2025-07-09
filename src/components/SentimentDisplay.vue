<template>
    <div class="sentiment-display" :class="sentimentClass">
        <component 
            v-if="showIcon" 
            :is="sentimentIcon" 
            :stroke-width="strokeWidth" 
            :size="iconSize" 
        />
        <span v-if="showText" class="sentiment-text">
            {{ sentimentText }}
        </span>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { Laugh, Smile, Meh, Annoyed, Frown, Angry } from 'lucide-vue-next';

const props = defineProps({
    sentiment: {
        type: Number,
        required: true
    },
    variant: {
        type: String,
        default: 'icon', // 'icon', 'text', 'both'
        validator: (value) => ['icon', 'text', 'both'].includes(value)
    },
    iconSize: {
        type: String,
        default: '20'
    },
    strokeWidth: {
        type: String,
        default: '2'
    }
});

const sentimentConfig = {
    1: { icon: Laugh, text: 'laugh', class: 'sentiment-positive' },
    2: { icon: Smile, text: 'smile', class: 'sentiment-positive' },
    3: { icon: Meh, text: 'meh', class: 'sentiment-neutral' },
    4: { icon: Annoyed, text: 'annoyed', class: 'sentiment-warning' },
    5: { icon: Frown, text: 'frown', class: 'sentiment-negative' },
    6: { icon: Angry, text: 'angry', class: 'sentiment-negative' }
};

const sentimentData = computed(() => sentimentConfig[props.sentiment] || sentimentConfig[5]);

const sentimentIcon = computed(() => sentimentData.value.icon);
const sentimentText = computed(() => sentimentData.value.text);
const sentimentClass = computed(() => sentimentData.value.class);

const showIcon = computed(() => props.variant === 'icon' || props.variant === 'both');
const showText = computed(() => props.variant === 'text' || props.variant === 'both');
</script>

<style scoped>
.sentiment-display {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
}

.sentiment-text {
    font-weight: var(--font-weight-medium);
    text-transform: capitalize;
    padding: var(--space-xs) var(--space-s);
    border-radius: 6px;
}

/* Icon-only styles */
.sentiment-display:not(:has(.sentiment-text)) {
    justify-content: center;
}

.sentiment-positive {
    color: #22c55e; /* green */
}

.sentiment-neutral {
    color: #eab308; /* yellow */
}

.sentiment-warning {
    color: #f97316; /* orange */
}

.sentiment-negative {
    color: #ef4444; /* red */
}

/* Text variant styles */
.sentiment-display.sentiment-positive .sentiment-text {
    background: var(--color-success-bg);
    color: var(--color-success-fg);
}

.sentiment-display.sentiment-neutral .sentiment-text {
    background: var(--color-warning-bg);
    color: var(--color-warning-fg);
}

.sentiment-display.sentiment-warning .sentiment-text,
.sentiment-display.sentiment-negative .sentiment-text {
    background: var(--color-danger-bg);
    color: var(--color-danger-fg);
}
</style> 