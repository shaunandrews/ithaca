<template>
    <div class="agent-activity">
        <div class="activity-content vstack">
            <header class="hstack">
                <h2>Conversations</h2>
                <select>
                    <option value="newest" selected>Newest</option>
                    <option value="oldest">Oldest</option>
                </select>
                <input type="search" v-model="search" placeholder="Search conversations" />
            </header>

            <div class="activity-list vstack">
                <ActivityListItem
                    v-for="conversation in agentConversations"
                    :key="conversation.id"
                    :item="conversation"
                    :to="`/agent/${agent.id}/activity/${conversation.id}`"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { agents } from '@/data/agents.js';
    import { conversations } from '@/data/conversations.js';
    import ActivityListItem from '@/components/ActivityListItem.vue';

    const route = useRoute();
    const agentId = computed(() => Number(route.params.id));
    const agent = computed(() => agents.find((a) => a.id === agentId.value));

    const agentConversations = computed(() => {
        if (!agent.value?.conversationIds) return [];

        return agent.value.conversationIds
            .map((id) => conversations.find((c) => c.id === id))
            .filter(Boolean)
            .sort((a, b) => new Date(b.datetime) - new Date(a.datetime)); // Sort by most recent first
    });
</script>

<style scoped>
    .agent-activity {
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .activity-content {
        height: 100%;
        overflow-y: auto;
    }

    header {
        gap: var(--space-s);
        justify-content: space-between;
        align-items: center;
        position: relative;
        padding: var(--space-m);
    }

    header > * {
        width: fit-content;
    }

    header h2 {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: var(--font-size-m);
        font-weight: var(--font-weight-semibold);
    }

    .activity-list {
        /* border: 1px solid var(--color-surface-tint-dark);
        border-radius: var(--radius-l); */
    }
</style>
