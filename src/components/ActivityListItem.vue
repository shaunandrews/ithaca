<template>
    <RouterLink :to="to" class="activity-list-item">
        <div class="customer">
            <img
                :src="getGravatarUrl(item.customer)"
                alt="Gravatar"
                width="20"
                height="20"
                class="gravatar"
                :title="item.customer"
            />
        </div>
        <div class="event">{{ item.event }}</div>
        <div class="summary">{{ item.summary }}</div>
        <div class="datetime">{{ formatRelativeTime(item.datetime) }}</div>
        <div class="message-count">
            <MessagesSquare size="16" stroke-width="1.5" />
            {{ messageCount }}
        </div>
        <div class="sentiment">
            <SentimentDisplay 
                :sentiment="item.sentiment" 
                variant="icon" 
                icon-size="20" 
                stroke-width="2" 
            />
        </div>
    </RouterLink>
</template>

<script setup>
    import { RouterLink } from 'vue-router';
    import { MessagesSquare } from 'lucide-vue-next';
    import { useActivityUtils } from '@/composables/useActivityUtils.js';
    import SentimentDisplay from '@/components/SentimentDisplay.vue';

    const props = defineProps({
        item: {
            type: Object,
            required: true,
        },
        to: {
            type: String,
            required: true,
        },
    });

    const { getMessageCount, formatRelativeTime, getGravatarUrl } = useActivityUtils();
    const messageCount = getMessageCount(props.item.id);
</script>

<style scoped>
    .activity-list-item {
        display: flex;
        align-items: center;
        gap: var(--space-s);
        color: var(--color-chrome-fg-tertiary);
        padding: var(--space-s) var(--space-l) var(--space-s) var(--space-m);
        min-height: 44px;
        border-top: 1px solid var(--color-surface-tint);
        cursor: pointer;
        text-decoration: none;
        width: 100%;
        min-width: 0;
    }

    .activity-list-item:last-child {
        border-bottom: 1px solid var(--color-surface-tint);
    }

    .activity-list-item:hover {
        background-color: var(--color-surface-tint-light);
        color: var(--color-chrome-fg-secondary);
    }

    .datetime {
        flex: 0 0 auto;
    }

    .customer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .gravatar {
        border-radius: var(--radius-s);
        vertical-align: middle;
        margin-right: var(--space-xxs);
        transition: transform 0.1s ease-in-out;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
    }

    .activity-list-item:hover .gravatar {
        transform: scale(1.1) rotate(3deg);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }

    .event {
        flex: 0 0 auto;
        font-weight: var(--font-weight-semibold);
        color: var(--color-accent);
    }

    .activity-list-item:hover .event {
        text-decoration: underline;
    }

    .summary {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1;
        min-width: 0;
    }

    .sentiment {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
    }

    .message-count {
        display: flex;
        align-items: center;
        gap: var(--space-xxs);
        flex: 0 0 auto;
    }
</style>
