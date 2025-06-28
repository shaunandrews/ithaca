<template>
    <RouterLink :to="to" class="activity-list-item">
        <div class="customer">
            <img
                :src="gravatarUrl(item.customer)"
                alt="Gravatar"
                width="24"
                height="24"
                class="gravatar"
                :title="item.customer"
            />
        </div>
        <div class="event">{{ item.event }}</div>
        <div class="summary">{{ item.summary }}</div>
        <div class="datetime">{{ formatDate(item.datetime) }}</div>
        <div class="message-count">
            <MessagesSquare size="16" stroke-width="1.5" />
            {{ messageCount }}
        </div>
    </RouterLink>
</template>

<script setup>
    import CryptoJS from 'crypto-js';
    import { RouterLink } from 'vue-router';
    import { MessagesSquare } from 'lucide-vue-next';
    import { messages } from '@/data/messages.js';
    import { computed } from 'vue';

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

    const messageCount = computed(() => {
        return messages[props.item.id]?.length || 0;
    });

    function formatDate(datetime) {
        const now = new Date();
        const date = new Date(datetime);
        const diffMs = now - date;
        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);
        const diffWeeks = Math.floor(diffDays / 7);
        const diffMonths = Math.floor(diffDays / 30);
        const diffYears = Math.floor(diffDays / 365);

        if (diffSeconds < 60) {
            return 'now';
        } else if (diffMinutes < 60) {
            return `${diffMinutes} min`;
        } else if (diffHours < 24) {
            return `${diffHours} hr`;
        } else if (diffDays < 7) {
            return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
        } else if (diffWeeks < 4) {
            return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''}`;
        } else if (diffMonths < 12) {
            return `${diffMonths} month${diffMonths > 1 ? 's' : ''}`;
        } else {
            return `${diffYears} year${diffYears > 1 ? 's' : ''}`;
        }
    }

    function gravatarUrl(email) {
        if (!email) return '';
        const hash = CryptoJS.SHA256(email.trim().toLowerCase()).toString(
            CryptoJS.enc.Hex
        );
        return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
    }
</script>

<style scoped>
    .activity-list-item {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        background-color: var(--color-surface);
        padding: var(--space-m);
        min-height: 44px;
        border-bottom: 1px solid var(--color-surface-tint-light);
        cursor: pointer;
        text-decoration: none;
        width: 100%;
        min-width: 0;
    }

    .activity-list-item:last-child {
        border-bottom: none;
    }

    .activity-list-item:hover {
        background-color: var(--color-surface-tint);
    }

    .datetime {
        color: var(--color-chrome-fg-tertiary);
        flex: 0 0 auto;
    }

    .customer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .gravatar {
        border-radius: var(--radius);
        border: 1px solid var(--color-surface-tint);
        vertical-align: middle;
    }

    .event {
        flex: 0 0 auto;
    }

    .summary {
        color: var(--color-chrome-fg-secondary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1;
        min-width: 0;
    }

    .message-count {
        display: flex;
        align-items: center;
        gap: var(--space-xxs);
        color: var(--color-chrome-fg-tertiary);
        flex: 0 0 auto;
    }
</style>
