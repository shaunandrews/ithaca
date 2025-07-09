<template>
    <RouterLink :to="to" class="activity-list-item">
        <div class="customer">
            <WidgetCustomer 
                :email="item.customer" 
                variant="avatar-only" 
                size="small"
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
            <WidgetSentiment 
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
    import WidgetSentiment from '@/components/WidgetSentiment.vue';
    import WidgetCustomer from '@/components/WidgetCustomer.vue';

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

    const { getMessageCount, formatRelativeTime } = useActivityUtils();
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
