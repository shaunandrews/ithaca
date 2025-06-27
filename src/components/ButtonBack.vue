<template>
    <router-link :to="to" class="back-link">
        <ArrowLeft stroke-width="1.5" height="18" width="18" /> {{ text }}
    </router-link>
</template>

<script setup>
    import { ArrowLeft } from 'lucide-vue-next';

    defineProps({
        to: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            default: 'Back',
        },
    });
</script>

<style scoped>
    .back-link {
        text-decoration: none;
        font-size: var(--font-size-s);
        display: inline-flex;
        align-items: center;
        gap: var(--space-xs);
    }

    .back-link:hover {
        text-decoration: underline;
    }
</style>
