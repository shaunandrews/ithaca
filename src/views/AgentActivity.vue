<template>
    <div class="agent-activity">
        <div class="activity-content vstack">
            <header class="hstack">
                <h2>Conversations</h2>
                <select>
                    <option value="newest" selected>Newest</option>
                    <option value="oldest">Oldest</option>
                </select>
                <input
                    type="search"
                    v-model="search"
                    placeholder="Search conversations"
                />
            </header>

            <div class="activity-list vstack">
                <div class="list-header">
                    <div class="customer" @click="toggleSort('customer')">
                        Customer
                    </div>
                    <div class="event" @click="toggleSort('event')">Event</div>
                    <div class="summary" @click="toggleSort('summary')">
                        Summary
                    </div>
                    <div class="datetime" @click="toggleSort('datetime')">
                        Time
                    </div>
                    <div class="message-count" @click="toggleSort('messages')">
                        Msgs
                    </div>
                    <div class="sentiment" @click="toggleSort('sentiment')">
                        Mood
                    </div>
                </div>

                <ActivityListItem
                    v-for="conversation in sortedConversations"
                    :key="conversation.id"
                    :item="conversation"
                    :to="`/agent/${agent.id}/activity/${conversation.id}`"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { agents } from '@/data/agents.js';
    import { conversations } from '@/data/conversations.js';
    import { messages } from '@/data/messages.js';
    import ActivityListItem from '@/components/ActivityListItem.vue';

    const route = useRoute();
    const agentId = computed(() => Number(route.params.id));
    const agent = computed(() => agents.find((a) => a.id === agentId.value));

    const search = ref('');

    const sortKey = ref('datetime');
    const sortAsc = ref(false); // newest first by default

    const agentConversations = computed(() => {
        if (!agent.value?.conversationIds) return [];

        return agent.value.conversationIds
            .map((id) => conversations.find((c) => c.id === id))
            .filter(Boolean);
    });

    const sentimentNames = {
        1: 'laugh',
        2: 'smile',
        3: 'meh',
        4: 'annoyed',
        5: 'frown',
        6: 'angry',
    };

    const filteredConversations = computed(() => {
        if (!search.value) return agentConversations.value;
        const query = search.value.toLowerCase();
        return agentConversations.value.filter((c) => {
            const messageCount = messages[c.id]?.length || 0;
            const searchable = [
                c.event,
                c.summary,
                c.customer,
                c.datetime,
                String(messageCount),
                sentimentNames[c.sentiment],
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();
            return searchable.includes(query);
        });
    });

    const sortedConversations = computed(() => {
        const list = [...filteredConversations.value];
        list.sort((a, b) => {
            let valA, valB;
            switch (sortKey.value) {
                case 'customer':
                    valA = a.customer;
                    valB = b.customer;
                    break;
                case 'event':
                    valA = a.event;
                    valB = b.event;
                    break;
                case 'summary':
                    valA = a.summary;
                    valB = b.summary;
                    break;
                case 'messages':
                    valA = messages[a.id]?.length || 0;
                    valB = messages[b.id]?.length || 0;
                    break;
                case 'sentiment':
                    valA = a.sentiment;
                    valB = b.sentiment;
                    break;
                case 'datetime':
                default:
                    valA = new Date(a.datetime);
                    valB = new Date(b.datetime);
            }

            if (valA < valB) return sortAsc.value ? -1 : 1;
            if (valA > valB) return sortAsc.value ? 1 : -1;
            return 0;
        });
        return list;
    });

    function toggleSort(key) {
        if (sortKey.value === key) {
            sortAsc.value = !sortAsc.value;
        } else {
            sortKey.value = key;
            sortAsc.value = true;
        }
    }
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
        padding: var(--space-s) var(--space-m);
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

    .list-header {
        display: flex;
        align-items: center;
        gap: var(--space-s);
        padding: var(--space-s) var(--space-l) var(--space-s) var(--space-m);
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-semibold);
        color: var(--color-chrome-fg-tertiary);
        border-top: 1px solid var(--color-surface-tint);
    }

    .list-header > div {
        cursor: pointer;
    }

    .list-header .customer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .list-header .summary {
        flex: 1;
        min-width: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
