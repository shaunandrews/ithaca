<template>
    <div 
        class="stack-item"
        @click="$router.push(to)"
    >
        <div class="hstack customer">
            <WidgetCustomer 
                :email="item.customer" 
                variant="compact" 
                size="medium"
            />
        </div>
        <div class="event-type">{{ item.event }}</div>

        <WidgetSentiment 
            :sentiment="item.sentiment" 
            variant="both" 
            icon-size="16" 
            stroke-width="1.5" 
        />

        <div class="message-count">
            <MessagesSquare size="16" stroke-width="1.5" />
            {{ messageCount }}
                </div>

        <div class="datetime">{{ formatAbsoluteTime(item.datetime) }}</div>

        <div class="stack-content">
            <div v-if="item.quote" class="quote">
                "{{ item.quote }}"
            </div>
            
            <div class="stack-summary">
                {{ item.summary }}
            </div>
            
            <div v-if="item.tags && item.tags.length" class="tags">
                <span 
                    v-for="tag in item.tags" 
                    :key="tag" 
                    class="tag"
                >
                    {{ tag }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { MessagesSquare } from 'lucide-vue-next';
    import { useActivityUtils } from '@/composables/useActivityUtils.js';
    import WidgetSentiment from '@/components/WidgetSentiment.vue';
    import WidgetCustomer from '@/components/WidgetCustomer.vue';

    const props = defineProps({
        item: {
            type: Object,
            required: true
        },
        to: {
            type: String,
            required: true
        }
    });

    const { getMessageCount, formatAbsoluteTime } = useActivityUtils();
    const messageCount = getMessageCount(props.item.id);
</script>

<style scoped>
    .stack-item {
        background: var(--color-surface-primary);
        border: 1px solid var(--color-surface-tint);
        border-radius: 12px;
        padding: var(--space-l);
        cursor: pointer;
        transition: all 150ms ease;
        box-shadow: var(--shadow-xs);
        display: flex;
        flex-direction: column;
        gap: var(--space-m);
    }

    .stack-item:hover {
        border-color: var(--color-surface-tint-strong);
        box-shadow: var(--shadow-s);
        transform: translateY(-1px);
    }

    .customer {
        gap: var(--space-xs);
        align-items: center;
    }

    .gravatar {
        border-radius: var(--radius-s);
        box-shadow: 0 0 0 1px var(--color-surface-tint-dark);
        transition: transform 0.1s ease-in-out;
    }

    .stack-item:hover .gravatar {
        transform: scale(1.05) rotate(2deg);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }

    .customer-name {
        font-size: var(--font-size-m);
        font-weight: var(--font-weight-semibold);
        color: var(--color-chrome-fg-primary);
    }

    .event-type {
        font-size: var(--font-size-s);
        color: var(--color-chrome-fg-secondary);
        padding: var(--space-xs) var(--space-s);
        background: var(--color-surface-secondary);
        border-radius: 6px;
        width: fit-content;
    }

    .message-count {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        font-weight: var(--font-weight-medium);
        font-size: var(--font-size-s);
        color: var(--color-chrome-fg-secondary);
    }

    .datetime {
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
        font-size: var(--font-size-s);
        color: var(--color-chrome-fg-secondary);
    }

    .stack-content {
        display: flex;
        flex-direction: column;
        gap: var(--space-s);
    }

    .quote {
        font-style: italic;
        color: var(--color-chrome-fg-secondary);
        font-size: var(--font-size-s);
        padding: var(--space-s);
        background: var(--color-surface-secondary);
        border-radius: 8px;
        border-left: 3px solid var(--color-accent);
    }

    .stack-summary {
        font-size: var(--font-size-m);
        line-height: 1.5;
        color: var(--color-chrome-fg-primary);
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-xs);
        margin-top: var(--space-xs);
    }

    .tag {
        font-size: var(--font-size-xs);
        padding: var(--space-xs) var(--space-s);
        background: var(--color-surface-tint);
        color: var(--color-chrome-fg-tertiary);
        border-radius: 4px;
        font-weight: var(--font-weight-medium);
        border: 1px solid var(--color-surface-tint-dark);
    }

    .tag:hover {
        background: var(--color-surface-tint-strong);
        color: var(--color-chrome-fg-secondary);
    }
</style> 