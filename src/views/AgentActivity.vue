<template>
    <div class="agent-activity">
        <div class="activity-content vstack">
            <div class="activity-list vstack">
                <div class="list-header">
                    <input
                        type="search"
                        v-model="search"
                        placeholder="Search conversations"
                    />
                    
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

                    <div class="view-toggle hstack">
                        <button 
                            :class="{ small: true, active: viewMode === 'list' }"
                            @click="viewMode = 'list'"
                            title="List View"
                        >
                            <Rows4 />
                        </button>
                        <button 
                            :class="{ small: true, active: viewMode === 'stack' }"
                            @click="viewMode = 'stack'"
                            title="Stack View"
                        >
                            <Rows2 />
                        </button>
                    </div>
                </div>

                <!-- List View -->
                <div v-if="viewMode === 'list'" class="list-view">
                    <ActivityListItem
                        v-for="conversation in sortedConversations"
                        :key="conversation.id"
                        :item="conversation"
                        :to="`/agent/${agent.id}/activity/${conversation.id}`"
                    />
                </div>

                <!-- Stack View -->
                <div v-else class="stack-view vstack">
                    <ActivityStackItem
                        v-for="conversation in sortedConversations"
                        :key="conversation.id"
                        :item="conversation"
                        :to="`/agent/${agent.id}/activity/${conversation.id}`"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed, ref, watch, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { Rows4, Rows2 } from 'lucide-vue-next';
    import { agents } from '@/data/agents.js';
    import { conversations } from '@/data/conversations.js';
    import { messages } from '@/data/messages.js';
    import { useConversationMemory } from '@/composables/useConversationMemory.js';
    import ActivityListItem from '@/components/ActivityListItem.vue';
    import ActivityStackItem from '@/components/ActivityStackItem.vue';

    const route = useRoute();
    const router = useRouter();
    const agentId = computed(() => Number(route.params.id));
    const agent = computed(() => agents.find((a) => a.id === agentId.value));
    const { getLastConversation, hasStoredConversation } = useConversationMemory();

    const search = ref('');
    
    // Initialize viewMode from localStorage with fallback to 'list'
    const ACTIVITY_VIEW_MODE_KEY = 'ithaca-activity-view-mode';
    const viewMode = ref(localStorage.getItem(ACTIVITY_VIEW_MODE_KEY) || 'list');

    const sortKey = ref('datetime');
    const sortAsc = ref(false); // newest first by default

    // Persist viewMode changes to localStorage
    watch(viewMode, (newValue) => {
        localStorage.setItem(ACTIVITY_VIEW_MODE_KEY, newValue);
    });

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

    // Check if we should redirect to a stored conversation when component mounts
    onMounted(() => {
        // Only redirect if:
        // 1. We're on the exact activity page (not in a conversation)
        // 2. There's a stored conversation for this agent
        // 3. The stored conversation exists in the agent's conversation list
        if (route.path === `/agent/${agentId.value}/activity` && hasStoredConversation(agentId.value)) {
            const lastConversationId = getLastConversation(agentId.value);
            const conversationExists = agentConversations.value.some(c => c.id === lastConversationId);
            
            if (conversationExists) {
                // Use replace instead of push to avoid adding to history
                router.replace(`/agent/${agentId.value}/activity/${lastConversationId}`);
            }
        }
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

    .stack-view {
        gap: var(--space-m);
        padding: var(--space-m);
    }
</style>
