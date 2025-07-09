<template>
    <div class="unified-activity-view">
        <!-- Activity List Panel -->
        <div class="activity-panel" :class="{ 'has-conversation': hasActiveConversation }">
            <div class="activity-header">
                <h3>{{ agent?.name || 'Agent' }} Activity</h3>
                <input
                    type="search"
                    v-model="search"
                    placeholder="Search conversations"
                    class="activity-search"
                />
                
                <!-- Sorting and View Controls -->
                <div class="activity-controls hstack">
                    <div class="sort-controls">
                        <select v-model="sortKey" class="sort-select">
                            <option value="datetime">Time</option>
                            <option value="customer">Customer</option>
                            <option value="event">Event</option>
                            <option value="sentiment">Mood</option>
                            <option value="messages">Messages</option>
                        </select>
                        <button 
                            class="sort-direction small"
                            @click="toggleSortDirection"
                            :title="sortAsc ? 'Sort Ascending' : 'Sort Descending'"
                        >
                            <ArrowUp v-if="sortAsc" size="16" />
                            <ArrowDown v-else size="16" />
                        </button>
                    </div>
                    
                    <div class="view-toggle hstack">
                        <button 
                            :class="{ small: true, active: viewMode === 'list' }"
                            @click="viewMode = 'list'"
                            title="List View"
                        >
                            <Rows4 size="16" />
                        </button>
                        <button 
                            :class="{ small: true, active: viewMode === 'stack' }"
                            @click="viewMode = 'stack'"
                            title="Stack View"
                        >
                            <Rows2 size="16" />
                        </button>
                    </div>
                </div>
            </div>

            <!-- Activity List Content -->
            <div class="activity-content">
                <!-- List View -->
                <div v-if="viewMode === 'list'" class="list-view">
                    <router-link
                        v-for="conversation in sortedConversations"
                        :key="conversation.id"
                        :to="`/agent/${agentId}/activity/${conversation.id}`"
                        class="activity-list-item"
                        :class="{ active: conversation.id === activeConversationId }"
                    >
                        <div class="activity-item-content">
                            <div class="customer">
                                <WidgetCustomer 
                                    :email="conversation.customer" 
                                    variant="avatar-only" 
                                    size="small"
                                />
                            </div>
                            <div class="event">{{ conversation.event }}</div>
                            <div class="summary" v-if="!hasActiveConversation">{{ conversation.summary }}</div>
                            <div class="datetime">{{ formatRelativeTime(conversation.datetime) }}</div>
                            <div class="message-count">
                                <MessagesSquare size="16" stroke-width="1.5" />
                                {{ getMessageCount(conversation.id) }}
                            </div>
                            <div class="sentiment">
                                <WidgetSentiment 
                                    :sentiment="conversation.sentiment" 
                                    variant="icon" 
                                    icon-size="20" 
                                    stroke-width="2" 
                                />
                            </div>
                        </div>
                    </router-link>
                </div>

                <!-- Stack View -->
                <div v-else class="stack-view vstack">
                    <router-link
                        v-for="conversation in sortedConversations"
                        :key="conversation.id"
                        :to="`/agent/${agentId}/activity/${conversation.id}`"
                        class="activity-stack-item"
                        :class="{ active: conversation.id === activeConversationId }"
                    >
                        <div class="stack-item-content">
                            <div class="stack-header">
                                <div class="customer">
                                    <WidgetCustomer 
                                        :email="conversation.customer" 
                                        variant="avatar-only" 
                                        size="small"
                                    />
                                </div>
                                <div class="event">{{ conversation.event }}</div>
                                <div class="datetime">{{ formatRelativeTime(conversation.datetime) }}</div>
                            </div>
                            <div class="summary" v-if="!hasActiveConversation || !hasActiveConversation">{{ conversation.summary }}</div>
                            <div class="stack-footer">
                                <div class="message-count">
                                    <MessagesSquare size="16" stroke-width="1.5" />
                                    {{ getMessageCount(conversation.id) }}
                                </div>
                                <div class="sentiment">
                                    <WidgetSentiment 
                                        :sentiment="conversation.sentiment" 
                                        variant="icon" 
                                        icon-size="20" 
                                        stroke-width="2" 
                                    />
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>

        <!-- Conversation Panel (shows when conversation is selected) -->
        <Transition name="conversation-panel">
            <div v-if="hasActiveConversation && activeConversation" class="conversation-panel">
                <div class="conversation-container" ref="conversationContainer">
                    <header class="conversation-header hstack" :class="{ 'has-border': isScrolled }">
                        <ButtonBack
                            :to="`/agent/${agentId}/activity`"
                            :agent-id="agentId"
                            :clear-memory="true"
                            text="Back to list"
                        />
                        <h1>{{ activeConversation.event }}</h1>
                        <div class="header-end hstack">
                            <ConversationMeta
                                :conversation-id="activeConversation.id.toString()"
                                :zendesk-id="`ZD-${activeConversation.id + 10000}`"
                            />
                            <button
                                class="small"
                                @click="toggleOverview"
                                :class="{ active: showOverview }"
                                title="Toggle message overview"
                            >
                                <ListOrdered size="16" stroke-width="1.5" />
                            </button>
                        </div>
                    </header>

                    <div class="conversation-main vstack">
                        <div class="conversation-content hstack">
                            <div class="messages">
                                <Message
                                    v-for="(msg, idx) in activeConversationMessages"
                                    :key="idx"
                                    :message="msg"
                                    :index="idx"
                                    :datetime="activeConversation.datetime"
                                    :customer="activeConversation.customer"
                                    :is-selected="selectedMessageIdx === idx"
                                    @select="selectMessage"
                                />
                            </div>

                            <ConversationOverview
                                v-if="showOverview"
                                :messages="activeConversationMessages"
                                :selected-idx="selectedMessageIdx"
                                @select="(idx) => selectMessage(activeConversationMessages[idx], idx)"
                                class="sticky-overview"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- Details Panel (shows when conversation is selected) -->
        <Transition name="details-panel">
            <Panel v-if="hasActiveConversation && activeConversation" class="details-panel">
                <ConversationDetails
                    :selected-message="selectedMessage"
                    :conversation="activeConversation"
                    @view-source="openSourceModal"
                />
            </Panel>
        </Transition>

        <!-- Empty State (shows when no conversations exist) -->
        <div v-if="!hasActiveConversation && agentConversations.length === 0" class="empty-state vstack">
            <h2>No conversations yet</h2>
            <p>This agent hasn't had any conversations yet. Once they start helping customers, you'll see the activity here.</p>
        </div>

        <!-- Source Modal -->
        <Modal :is-open="isSourceModalOpen" @close="closeSourceModal">
            <div class="source-modal-content">
                <h2>{{ selectedSource?.name }}</h2>
                <p class="source-description">{{ selectedSource?.description }}</p>
                <!-- ...rest of modal content... -->
            </div>
        </Modal>
    </div>
</template>

<script setup>
    import { computed, ref, watch, onMounted, onUnmounted, inject } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { 
        Rows4, 
        Rows2, 
        ArrowUp, 
        ArrowDown, 
        ListOrdered,
        MessagesSquare
    } from 'lucide-vue-next';
    import { agents } from '@/data/agents.js';
    import { conversations } from '@/data/conversations.js';
    import { messages } from '@/data/messages.js';
    import { useConversationMemory } from '@/composables/useConversationMemory.js';
    import { useActivityUtils } from '@/composables/useActivityUtils.js';
    import ConversationMeta from '@/components/ConversationMeta.vue';
    import Message from '@/components/Message.vue';
    import ConversationOverview from '@/components/ConversationOverview.vue';
    import Modal from '@/components/Modal.vue';
    import ButtonBack from '@/components/ButtonBack.vue';
    import Panel from '@/components/Panel.vue';
    import ConversationDetails from '@/components/ConversationDetails.vue';
    import WidgetCustomer from '@/components/WidgetCustomer.vue';
    import WidgetSentiment from '@/components/WidgetSentiment.vue';

    const route = useRoute();
    const router = useRouter();
    const agentId = computed(() => Number(route.params.id));
    const activeConversationId = computed(() => Number(route.params.activityId));
    const agent = computed(() => agents.find((a) => a.id === agentId.value));
    const { getLastConversation, hasStoredConversation, rememberConversation } = useConversationMemory();
    const { getMessageCount, formatRelativeTime } = useActivityUtils();

    // Inject header height from parent
    const headerHeight = inject('headerHeight', ref(0));

    // Activity list state
    const search = ref('');
    const sortKey = ref('datetime');
    const sortAsc = ref(false); // newest first by default
    
    // Initialize viewMode from localStorage
    const ACTIVITY_VIEW_MODE_KEY = 'ithaca-activity-view-mode';
    const viewMode = ref(localStorage.getItem(ACTIVITY_VIEW_MODE_KEY) || 'list');

    // Conversation state
    const selectedMessage = ref(null);
    const selectedMessageIdx = ref(null);
    const showOverview = ref(false);
    const isScrolled = ref(false);
    const conversationContainer = ref(null);

    // Modal state
    const isSourceModalOpen = ref(false);
    const selectedSource = ref(null);

    // Computed properties
    const hasActiveConversation = computed(() => !!activeConversationId.value);
    
    const activeConversation = computed(() => {
        if (!activeConversationId.value) return null;
        return conversations.find((c) => c.id === activeConversationId.value);
    });

    const activeConversationMessages = computed(() => {
        if (!activeConversationId.value) return [];
        return messages[activeConversationId.value] || [];
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

    // Persist viewMode changes to localStorage
    watch(viewMode, (newValue) => {
        localStorage.setItem(ACTIVITY_VIEW_MODE_KEY, newValue);
    });

    // Watch for changes in activeConversationId to update memory
    watch([agentId, activeConversationId], ([newAgentId, newConversationId]) => {
        if (newAgentId && newConversationId) {
            rememberConversation(newAgentId, newConversationId);
        }
    });

    // Functions
    function toggleSortDirection() {
        sortAsc.value = !sortAsc.value;
    }

    function selectMessage(msg, idx) {
        if (selectedMessageIdx.value === idx) {
            selectedMessage.value = null;
            selectedMessageIdx.value = null;
            const newQuery = { ...route.query };
            delete newQuery.selected;
            router.replace({ ...route, query: newQuery });
        } else {
            selectedMessage.value = msg;
            selectedMessageIdx.value = idx;
            router.replace({
                ...route,
                query: { ...route.query, selected: idx.toString() },
            });
        }
    }

    function toggleOverview() {
        showOverview.value = !showOverview.value;
    }

    function openSourceModal(source) {
        selectedSource.value = source;
        isSourceModalOpen.value = true;
    }

    function closeSourceModal() {
        isSourceModalOpen.value = false;
        selectedSource.value = null;
    }

    function handleScroll() {
        if (conversationContainer.value) {
            isScrolled.value = conversationContainer.value.scrollTop > 0;
        }
    }

    onMounted(() => {
        // Handle conversation memory and redirection
        if (activeConversationId.value) {
            rememberConversation(agentId.value, activeConversationId.value);
            
            // Initialize selected message from URL query
            const selectedParam = route.query.selected;
            if (selectedParam !== undefined && activeConversation.value) {
                const idx = Number(selectedParam);
                if (idx >= 0 && idx < activeConversationMessages.value.length) {
                    selectedMessage.value = activeConversationMessages.value[idx];
                    selectedMessageIdx.value = idx;
                }
            }
        } else if (route.path === `/agent/${agentId.value}/activity` && hasStoredConversation(agentId.value)) {
            // Redirect to last conversation if available
            const lastConversationId = getLastConversation(agentId.value);
            const conversationExists = agentConversations.value.some(c => c.id === lastConversationId);
            
            if (conversationExists) {
                router.replace(`/agent/${agentId.value}/activity/${lastConversationId}`);
            }
        }

        // Add scroll listener if conversation is active
        if (conversationContainer.value) {
            conversationContainer.value.addEventListener('scroll', handleScroll);
        }
    });

    onUnmounted(() => {
        if (conversationContainer.value) {
            conversationContainer.value.removeEventListener('scroll', handleScroll);
        }
    });
</script>

<style scoped>
    .unified-activity-view {
        height: 100%;
        display: flex;
        overflow: hidden;
    }

    /* Activity Panel Styles */
    .activity-panel {
        width: 100%;
        background: var(--color-surface);
        border-right: 1px solid var(--color-surface-tint);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                    border-right-color 0.3s ease;
    }

    .activity-panel.has-conversation {
        width: 380px;
        min-width: 380px;
        max-width: 380px;
        border-right-color: var(--color-primary-subtle);
    }

    .activity-header {
        padding: var(--space-m);
        border-bottom: 1px solid var(--color-surface-tint);
        background: var(--color-chrome);
        display: flex;
        flex-direction: column;
        gap: var(--space-s);
    }

    .activity-header h3 {
        margin: 0;
        font-size: var(--font-size-m);
        font-weight: var(--font-weight-semibold);
    }

    .activity-search {
        width: 100%;
        padding: var(--space-xs);
        border: 1px solid var(--color-surface-tint);
        border-radius: var(--radius-s);
        background: var(--color-surface);
        font-size: var(--font-size-s);
    }

    .activity-search:focus {
        outline: none;
        border-color: var(--color-primary);
    }

    .activity-controls {
        justify-content: space-between;
        align-items: center;
        gap: var(--space-s);
    }

    .sort-controls {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
    }

    .sort-select {
        padding: var(--space-xxs) var(--space-xs);
        border: 1px solid var(--color-surface-tint);
        border-radius: var(--radius-s);
        background: var(--color-surface);
        font-size: var(--font-size-xs);
    }

    .sort-direction {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--space-xxs);
    }

    .view-toggle {
        gap: var(--space-xxs);
    }

    .activity-content {
        flex: 1;
        overflow-y: auto;
    }

    .list-view {
        display: flex;
        flex-direction: column;
    }

    .activity-list-item {
        display: flex;
        align-items: center;
        padding: var(--space-s);
        border-bottom: 1px solid var(--color-surface-tint);
        transition: all 0.2s ease;
        text-decoration: none;
        color: inherit;
        position: relative;
    }

    .activity-list-item:hover {
        background: var(--color-surface-tint);
        transform: translateX(2px);
    }

    .activity-list-item.active {
        background: var(--color-primary-subtle);
        color: var(--color-primary);
        border-left: 3px solid var(--color-primary);
        padding-left: calc(var(--space-s) - 3px);
    }

    .activity-list-item.active:hover {
        background: var(--color-primary-subtle);
        transform: none;
    }

    .activity-list-item.active::after {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-left: 8px solid var(--color-primary);
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
    }

    .activity-item-content {
        display: flex;
        align-items: center;
        gap: var(--space-s);
        width: 100%;
    }

    .activity-item-content .customer {
        flex-shrink: 0;
    }

    .activity-item-content .event {
        flex: 1;
        min-width: 0;
        font-weight: var(--font-weight-medium);
        font-size: var(--font-size-s);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .activity-item-content .summary {
        flex: 2;
        min-width: 0;
        font-size: var(--font-size-xs);
        color: var(--color-text-subtle);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: opacity 0.3s ease;
    }

    .activity-panel.has-conversation .activity-item-content .summary {
        opacity: 0;
        width: 0;
        overflow: hidden;
    }

    .activity-item-content .datetime {
        flex-shrink: 0;
        font-size: var(--font-size-xs);
        color: var(--color-text-subtle);
    }

    .activity-item-content .message-count {
        flex-shrink: 0;
        font-size: var(--font-size-xs);
        color: var(--color-text-subtle);
        display: flex;
        align-items: center;
        gap: var(--space-xxs);
    }

    .activity-item-content .sentiment {
        flex-shrink: 0;
    }

    .stack-view {
        gap: var(--space-m);
        padding: var(--space-m);
    }

    .activity-stack-item {
        display: block;
        padding: var(--space-m);
        border: 1px solid var(--color-surface-tint);
        border-radius: var(--radius-m);
        transition: all 0.2s ease;
        text-decoration: none;
        color: inherit;
        background: var(--color-surface);
        position: relative;
    }

    .activity-stack-item:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-m);
    }

    .activity-stack-item.active {
        background: var(--color-primary-subtle);
        color: var(--color-primary);
        border: 2px solid var(--color-primary);
        transform: translateY(-1px);
        box-shadow: var(--shadow-l);
    }

    .activity-stack-item.active:hover {
        transform: translateY(-1px);
    }

    .activity-stack-item.active::before {
        content: '';
        position: absolute;
        top: var(--space-s);
        right: var(--space-s);
        width: 12px;
        height: 12px;
        background: var(--color-primary);
        border-radius: 50%;
    }

    .stack-item-content {
        display: flex;
        flex-direction: column;
        gap: var(--space-s);
    }

    .stack-header {
        display: flex;
        align-items: center;
        gap: var(--space-s);
    }

    .stack-header .customer {
        flex-shrink: 0;
    }

    .stack-header .event {
        flex: 1;
        font-weight: var(--font-weight-medium);
        font-size: var(--font-size-s);
    }

    .stack-header .datetime {
        flex-shrink: 0;
        font-size: var(--font-size-xs);
        color: var(--color-text-subtle);
    }

    .stack-item-content .summary {
        font-size: var(--font-size-xs);
        color: var(--color-text-subtle);
        line-height: 1.4;
        transition: opacity 0.3s ease;
    }

    .activity-panel.has-conversation .stack-item-content .summary {
        opacity: 0.7;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .stack-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .stack-footer .message-count {
        font-size: var(--font-size-xs);
        color: var(--color-text-subtle);
        display: flex;
        align-items: center;
        gap: var(--space-xxs);
    }

    .stack-footer .sentiment {
        flex-shrink: 0;
    }

    /* Conversation Panel Styles */
    .conversation-panel {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        min-width: 0;
    }

    .conversation-panel-enter-active {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .conversation-panel-leave-active {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .conversation-panel-enter-from {
        opacity: 0;
        transform: translateX(30px);
    }

    .conversation-panel-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }

    .conversation-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
    }

    .conversation-header {
        padding: var(--space-m);
        gap: var(--space-xs);
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid transparent;
        position: sticky;
        top: 0;
        width: 100%;
        z-index: 100;
        min-height: var(--toolbar-height);
        transition: border-bottom-color 0.15s ease;
        background: var(--color-surface);
    }

    .conversation-header.has-border {
        background-color: var(--color-chrome-transparent);
        backdrop-filter: blur(12px);
        border-bottom-color: var(--color-surface-tint);
    }

    .conversation-header h1 {
        font-size: var(--font-size-m);
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        margin: 0;
    }

    .header-end {
        gap: var(--space-xxs);
    }

    .conversation-main {
        padding: var(--space-s);
        padding-top: 0;
        gap: var(--space-m);
    }

    .conversation-content {
        display: flex;
        gap: var(--space-m);
    }

    .messages {
        display: flex;
        flex-direction: column;
        gap: var(--space-m);
        margin: 0 auto;
        max-width: 840px;
    }

    /* Details Panel Styles */
    .details-panel {
        width: 320px;
        border-left: 1px solid var(--color-surface-tint);
    }

    .details-panel-enter-active {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        transition-delay: 0.1s;
    }

    .details-panel-leave-active {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .details-panel-enter-from {
        opacity: 0;
        transform: translateX(30px);
    }

    .details-panel-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }

    /* Empty State Styles */
    .empty-state {
        flex: 1;
        justify-content: center;
        align-items: center;
        padding: var(--space-l);
        text-align: center;
    }

    .empty-state h2 {
        margin: 0 0 var(--space-s) 0;
        font-size: var(--font-size-l);
    }

    .empty-state p {
        margin: 0;
        color: var(--color-text-subtle);
        max-width: 400px;
    }

    /* Responsive Design */
    @media (max-width: 1399px) {
        .activity-panel.has-conversation {
            width: 320px;
            min-width: 320px;
            max-width: 320px;
        }
    }

    @media (max-width: 1199px) {
        .activity-panel.has-conversation {
            width: 280px;
            min-width: 280px;
            max-width: 280px;
        }
    }

    @media (max-width: 999px) {
        .activity-panel.has-conversation {
            display: none;
        }
        
        .details-panel {
            width: 280px;
        }
    }

    @media (max-width: 768px) {
        .details-panel {
            display: none;
        }
    }
</style>
