<template>
    <div class="conversation-meta">
        <div class="conversation-link">
            <button class="small"><Link size="16" stroke-width="1.5" /></button>
        </div>
        <!-- <div class="conversation-zendesk">
            <a href="#">Zendesk #{{ zendeskId }}</a>
        </div> -->
    </div>
</template>

<script setup>
    import { Link } from 'lucide-vue-next';

    defineProps({
        conversationId: {
            type: String,
            required: true,
        },
        zendeskId: {
            type: String,
            required: true,
        },
    });
</script>

<style scoped>
    .conversation-meta {
        display: flex;
        gap: var(--space-m);
        font-size: var(--font-size-s);
        align-items: center;
        flex-wrap: wrap;
    }

    .conversation-link a,
    .conversation-zendesk a {
        color: var(--color-text-subtle);
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: var(--space-xs);
    }

    .conversation-link a:hover,
    .conversation-zendesk a:hover {
        color: var(--color-text);
        text-decoration: underline;
    }
</style>
