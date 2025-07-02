<template>
    <div class="overview">
        <div
            v-for="(msg, idx) in messages"
            :key="idx"
            class="overview-item"
            :class="{ selected: idx === selectedIdx }"
            @click="$emit('select', idx)"
        >
            <span class="idx">{{ idx + 1 }}</span>
            <span class="snippet">{{ truncate(msg.text) }}</span>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        messages: {
            type: Array,
            required: true,
        },
        selectedIdx: {
            type: Number,
            default: null,
        },
    });

    defineEmits(['select']);

    function truncate(text, length = 40) {
        if (!text) return '';
        return text.length > length ? text.slice(0, length) + '…' : text;
    }
</script>

<style scoped>
    .overview {
        flex: 0 0 200px;
        max-width: 200px;
        overflow-y: auto;
        border-right: 1px solid var(--color-surface-tint);
    }

    .overview-item {
        padding: var(--space-xs) var(--space-s);
        cursor: pointer;
        font-size: var(--font-size-s);
        color: var(--color-chrome-fg-tertiary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .overview-item:hover {
        color: var(--color-chrome-fg);
    }

    .overview-item.selected {
        background: var(--color-surface-tint-light);
        color: var(--color-chrome-fg);
        font-weight: var(--font-weight-medium);
    }

    .idx {
        margin-right: var(--space-xs);
        color: var(--color-chrome-fg-secondary);
    }
</style>
