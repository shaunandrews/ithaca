<template>
    <div class="summary">
        <h2 v-if="title">{{ title }}</h2>
        <p>{{ summary }}</p>
    </div>
</template>

<script setup>
    defineProps({
        summary: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: false,
        },
    });
</script>

<style scoped>
    .summary {
        margin-bottom: var(--space-m);
    }

    h2 {
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-medium);
        margin-bottom: var(--space-xxs);
    }

    p {
        font-size: var(--font-size-s);
        color: var(--color-chrome-fg-secondary);
        line-height: var(--line-height-tight);
    }
</style>
