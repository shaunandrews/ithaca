<template>
    <div 
        class="stack-item"
        @click="$router.push(to)"
    >
        <div class="hstack">
            <div class="hstack customer">
                <WidgetCustomer 
                    :email="item.customer" 
                    variant="avatar-only" 
                    size="xlarge"
                />

                <div class="vstack customer-info">
                    <h3 class="title">{{ item.event }}</h3>

                    <div class="feelings hstack">
                        <WidgetSentiment 
                            :sentiment="item.sentiment" 
                            variant="icon" 
                            icon-size="16" 
                            stroke-width="1.5" 
                        />
                        <div v-if="item.quote">"{{ item.quote }}"</div>
                    </div>
                </div>
            </div>

            <div class="hstack meta">
                <div class="message-count">
                    <MessagesSquare size="16" stroke-width="1.5" />
                    {{ messageCount }}
                </div>

                <div class="datetime">{{ formatAbsoluteTime(item.datetime) }}</div>
            </div>
        </div>
        <div class="stack-content">            
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
        border-radius: var(--radius);
        padding: var(--space-m);
        cursor: pointer;
        transition: all 150ms ease;
        box-shadow: var(--shadow-xs);
        display: flex;
        flex-direction: column;
        gap: var(--space-m);
    }

    .customer {
        flex: 1;
        gap: var(--space-m);
        align-items: center;
    }

    .customer-info {
        gap: var(--space-xxs);
    }

    .meta {
        gap: var(--space-m);
    }

    .feelings {
        gap: var(--space-xs);
    }
</style> 