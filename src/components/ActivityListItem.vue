<template>
    <RouterLink :to="to" class="activity-list-item">
        <div class="customer">
            <img
                :src="gravatarUrl(item.customer)"
                alt="Gravatar"
                width="20"
                height="20"
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
        <div class="sentiment" :class="sentimentClass">
            <component :is="sentimentIcon" stroke-width="2" size="20" />
        </div>
    </RouterLink>
</template>

<script setup>
    import CryptoJS from 'crypto-js';
    import { RouterLink } from 'vue-router';
    import { MessagesSquare, Laugh, Smile, Meh, Annoyed, Frown, Angry } from 'lucide-vue-next';
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

    // Sentiment icon mapping
    const sentimentIcon = computed(() => {
        if (!props.item) return Frown;
        
        const sentimentMap = {
            1: Laugh,    // laugh
            2: Smile,    // smile
            3: Meh,      // meh
            4: Annoyed,  // annoyed
            5: Frown,    // frown
            6: Angry     // angry
        };
        
        return sentimentMap[props.item.sentiment] || Frown;
    });

    // Sentiment color class mapping
    const sentimentClass = computed(() => {
        if (!props.item) return 'sentiment-negative';
        
        const classMap = {
            1: 'sentiment-positive',    // laugh - green
            2: 'sentiment-positive',    // smile - green
            3: 'sentiment-neutral',     // meh - yellow
            4: 'sentiment-warning',     // annoyed - orange
            5: 'sentiment-negative',    // frown - red
            6: 'sentiment-negative'     // angry - red
        };
        
        return classMap[props.item.sentiment] || 'sentiment-negative';
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
        transform: scale(1.3) rotate(3deg);
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

    .sentiment.sentiment-positive {
        color: #22c55e; /* green */
    }

    .sentiment.sentiment-neutral {
        color: #eab308; /* yellow */
    }

    .sentiment.sentiment-warning {
        color: #f97316; /* orange */
    }

    .sentiment.sentiment-negative {
        color: #ef4444; /* red */
    }

    .message-count {
        display: flex;
        align-items: center;
        gap: var(--space-xxs);
        flex: 0 0 auto;
    }
</style>
