<template>
    <div class="conversation-view">
        <div v-if="conversation" class="columns hstack">
            <!-- Activity List Panel (left side) -->
            <div class="activity-panel" v-if="showActivityList">
                <div class="activity-header">
                    <h3>Activity</h3>
                    <input
                        type="search"
                        v-model="activitySearch"
                        placeholder="Search conversations"
                        class="activity-search"
                    />
                </div>
                <div class="activity-list">
                    <ActivityListItem
                        v-for="conv in filteredAgentConversations"
                        :key="conv.id"
                        :item="conv"
                        :to="`/agent/${agentId}/activity/${conv.id}`"
                        :class="{ active: conv.id === activityId }"
                    />
                </div>
            </div>

            <div
                class="conversation panel-open"
                ref="conversationContainer"
            >
                <header
                    class="conversation-header hstack"
                    :class="{ 'has-border': isScrolled }"
                >
                    <ButtonBack
                        :to="`/agent/${agentId}/activity`"
                        :agent-id="agentId"
                        :clear-memory="true"
                        text="All activity"
                    />
                    <h1>{{ conversation.event }}</h1>
                    <div class="header-end hstack">
                        <ConversationMeta
                            :conversation-id="conversation.id.toString()"
                            :zendesk-id="`ZD-${conversation.id + 10000}`"
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
                                v-for="(msg, idx) in conversationMessages"
                                :key="idx"
                                :message="msg"
                                :index="idx"
                                :datetime="conversation.datetime"
                                :customer="conversation.customer"
                                :is-selected="selectedIdx === idx"
                                @select="selectMessage"
                            />
                        </div>

                        <ConversationOverview
                            v-if="showOverview"
                            :messages="conversationMessages"
                            :selected-idx="selectedIdx"
                            @select="
                                (idx) =>
                                    selectMessage(
                                        conversationMessages[idx],
                                        idx
                                    )
                            "
                            class="sticky-overview"
                        />
                    </div>
                </div>
            </div>

            <Panel v-if="conversation" resizable>
                <ConversationDetails
                    :selected-message="selectedMessage"
                    :conversation="conversation"
                    @view-source="openSourceModal"
                />
            </Panel>
        </div>

        <div v-else class="empty vstack">
            <h1>Conversation not found.</h1>
            <p>Uh oh, I wasn't able to find that conversation.</p>
            <p>
                Try going back to the
                <ButtonBack
                    :to="`/agent/${agentId}/activity`"
                    :agent-id="agentId"
                    :clear-memory="true"
                    text="activity page"
                />
                and selecting a different conversation.
            </p>
        </div>

        <!-- Source Modal -->
        <Modal :is-open="isSourceModalOpen" @close="closeSourceModal">
            <div class="source-modal-content">
                <h2>{{ selectedSource?.name }}</h2>
                <p class="source-description">
                    {{ selectedSource?.description }}
                </p>

                <div class="source-details">
                    <h3>Full Content</h3>
                    <div class="source-content">
                        <p>
                            <strong>Document Type:</strong>
                            {{
                                selectedSource?.type || 'Knowledge Base Article'
                            }}
                        </p>
                        <p>
                            <strong>Last Updated:</strong>
                            {{
                                selectedSource?.lastUpdated || 'March 15, 2024'
                            }}
                        </p>
                        <p>
                            <strong>Relevance Score:</strong>
                            {{ selectedSource?.score || '0.92' }}
                        </p>

                        <div class="content-section">
                            <h4>Summary</h4>
                            <p>
                                {{
                                    selectedSource?.fullContent ||
                                    "This is a comprehensive guide covering the topic mentioned in the source description. The content provides detailed steps, examples, and best practices that were used to generate the agent's response. This source was automatically selected based on its high relevance score and comprehensive coverage of the user's inquiry."
                                }}
                            </p>
                        </div>

                        <div class="content-section">
                            <h4>Key Points</h4>
                            <ul>
                                <li>
                                    Primary solution approach based on user
                                    context
                                </li>
                                <li>
                                    Alternative methods when primary approach
                                    fails
                                </li>
                                <li>
                                    Common troubleshooting steps and gotchas
                                </li>
                                <li>
                                    Related resources and documentation links
                                </li>
                            </ul>
                        </div>

                        <div class="content-section">
                            <h4>Related Sources</h4>
                            <div class="related-sources">
                                <span class="tag">WordPress Hosting</span>
                                <span class="tag">Domain Management</span>
                                <span class="tag">Site Profiler</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script setup>
    import { computed, ref, onMounted, onUnmounted, inject, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import {
        Laugh,
        Smile,
        Meh,
        Annoyed,
        Frown,
        Angry,
        ListOrdered,
    } from 'lucide-vue-next';
    import { agents } from '@/data/agents.js';
    import { conversations } from '@/data/conversations.js';
    import { messages } from '@/data/messages.js';
    import { useConversationMemory } from '@/composables/useConversationMemory.js';
    import ConversationMeta from '@/components/ConversationMeta.vue';
    import Message from '@/components/Message.vue';
    import ConversationOverview from '@/components/ConversationOverview.vue';
    import Modal from '@/components/Modal.vue';
    import ButtonBack from '@/components/ButtonBack.vue';
    import Panel from '@/components/Panel.vue';
    import ConversationDetails from '@/components/ConversationDetails.vue';
    import ActivityListItem from '@/components/ActivityListItem.vue';

    const route = useRoute();
    const router = useRouter();
    const agentId = computed(() => Number(route.params.id));
    const activityId = computed(() => Number(route.params.activityId));
    const { rememberConversation } = useConversationMemory();

    // Inject header height from parent
    const headerHeight = inject('headerHeight', ref(0));

    const agent = computed(() => agents.find((a) => a.id === agentId.value));
    const conversation = computed(() => {
        // The activityId now directly corresponds to the conversation id
        return conversations.find((c) => c.id === activityId.value);
    });
    const conversationMessages = computed(
        () => messages[activityId.value] || []
    );

    // Activity list state
    const activitySearch = ref('');
    const showActivityList = ref(true);

    // Get agent conversations for the activity list
    const agentConversations = computed(() => {
        if (!agent.value?.conversationIds) return [];
        return agent.value.conversationIds
            .map((id) => conversations.find((c) => c.id === id))
            .filter(Boolean);
    });

    // Filter conversations based on search
    const filteredAgentConversations = computed(() => {
        if (!activitySearch.value) return agentConversations.value;
        const query = activitySearch.value.toLowerCase();
        return agentConversations.value.filter((c) => {
            const searchable = [
                c.event,
                c.summary,
                c.customer,
                c.datetime,
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();
            return searchable.includes(query);
        });
    });

    // Check if we should show the activity list based on screen size
    const checkScreenSize = () => {
        showActivityList.value = window.innerWidth >= 1200; // Show on large screens
    };

    const selectedMessage = ref(null);
    const selectedIdx = ref(null);

    // Source modal state
    const isSourceModalOpen = ref(false);
    const selectedSource = ref(null);

    // Tags popover state
    const showTagsPopover = ref(false);
    const tagsContainer = ref(null);

    // Scroll state for header border
    const isScrolled = ref(false);
    const conversationContainer = ref(null);

    // Overview toggle state
    const showOverview = ref(false);

    // Sentiment icon mapping
    const sentimentIcon = computed(() => {
        if (!conversation.value) return Frown;

        const sentimentMap = {
            1: Laugh, // laugh
            2: Smile, // smile
            3: Meh, // meh
            4: Annoyed, // annoyed
            5: Frown, // frown
            6: Angry, // angry
        };

        return sentimentMap[conversation.value.sentiment] || Frown;
    });

    // Initialize selected message from URL query parameter
    onMounted(() => {
        // Remember this conversation for the current agent
        if (agentId.value && activityId.value) {
            rememberConversation(agentId.value, activityId.value);
        }

        const selectedParam = route.query.selected;
        const summarySelectedParam = route.query.summarySelected;

        if (selectedParam !== undefined && conversation.value) {
            const idx = Number(selectedParam);
            if (idx >= 0 && idx < conversationMessages.value.length) {
                selectedMessage.value = conversationMessages.value[idx];
                selectedIdx.value = idx;
            }
        }
        // Default to showing conversation summary if no specific message is selected
        // Note: We don't need to set isConversationSummarySelected since the panel
        // now shows the conversation summary by default when no message is selected

        // Add click outside listener for tags popover
        document.addEventListener('click', handleClickOutside);

        // Add scroll listener for header border
        if (conversationContainer.value) {
            conversationContainer.value.addEventListener(
                'scroll',
                handleScroll
            );
        }

        // Check screen size and add resize listener
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
    });

    // Watch for changes in agentId or activityId to update memory
    watch([agentId, activityId], ([newAgentId, newActivityId]) => {
        if (newAgentId && newActivityId) {
            rememberConversation(newAgentId, newActivityId);
        }
    });

    onUnmounted(() => {
        document.removeEventListener('click', handleClickOutside);
        window.removeEventListener('resize', checkScreenSize);

        // Remove scroll listener
        if (conversationContainer.value) {
            conversationContainer.value.removeEventListener(
                'scroll',
                handleScroll
            );
        }
    });

    function selectMessage(msg, idx) {
        if (selectedIdx.value === idx) {
            // If clicking the same message, deselect it to show conversation summary
            selectedMessage.value = null;
            selectedIdx.value = null;
            // Update URL to remove selection
            const newQuery = { ...route.query };
            delete newQuery.selected;
            router.replace({
                ...route,
                query: newQuery,
            });
        } else {
            // Select the message
            selectedMessage.value = msg;
            selectedIdx.value = idx;
            // Update URL to remember selection
            router.replace({
                ...route,
                query: {
                    ...route.query,
                    selected: idx.toString(),
                },
            });
        }
    }

    function selectConversationSummary() {
        // Clear any selected message to show conversation summary
        selectedMessage.value = null;
        selectedIdx.value = null;
        // Update URL to remove message selection
        const newQuery = { ...route.query };
        delete newQuery.selected;
        router.replace({
            ...route,
            query: newQuery,
        });
    }

    function openSourceModal(source) {
        selectedSource.value = source;
        isSourceModalOpen.value = true;
    }

    function closeSourceModal() {
        isSourceModalOpen.value = false;
        selectedSource.value = null;
    }

    function toggleTagsPopover() {
        showTagsPopover.value = !showTagsPopover.value;
    }

    function handleClickOutside(event) {
        if (
            tagsContainer.value &&
            !tagsContainer.value.contains(event.target)
        ) {
            showTagsPopover.value = false;
        }
    }

    function handleScroll() {
        if (conversationContainer.value) {
            isScrolled.value = conversationContainer.value.scrollTop > 0;
        }
    }

    function toggleOverview() {
        showOverview.value = !showOverview.value;
    }
</script>

<style scoped>
    .conversation-view {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .columns {
        height: 100%;
        flex: 1;
        overflow: hidden;
    }

    .conversation {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        /* box-shadow: inset 0 1px 12px 1px rgba(0, 0, 0, 0.03),
                    inset 0 1px 4px 0 rgba(0, 0, 0, 0.01);
        background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 1px,
            var(--color-surface-tint-light) 1px,
            var(--color-surface-tint-light) 8px
        );
        background-attachment: fixed; */
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

    .empty {
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        padding: var(--space-l);
        font-size: var(--font-size-m);
    }

    .conversation-header {
        padding: var(--space-m);
        gap: var(--space-xs);
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid transparent;
        margin: 0 auto;
        text-align: center;
        position: sticky;
        top: 0;
        width: 100%;
        z-index: 100;
        min-height: var(--toolbar-height);
        transition: border-bottom-color 0.15s ease;
    }

    .conversation-header.has-border {
        background-color: var(--color-chrome-transparent);
        backdrop-filter: blur(12px);
        border-bottom-color: var(--color-surface-tint);
    }

    .header-end {
        gap: var(--space-xxs)
    }

    h1 {
        font-size: var(--font-size-m);
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }

    .messages {
        display: flex;
        flex-direction: column;
        gap: var(--space-m);
        margin: 0 auto;
        max-width: 840px;
    }

    .source-modal-content {
        max-width: 600px;
        width: 100%;
    }

    .source-modal-content h2 {
        margin-top: 0;
        margin-bottom: var(--space-s);
    }

    .source-description {
        color: var(--color-text-subtle);
        margin-bottom: var(--space-l);
    }

    .source-details {
        display: flex;
        flex-direction: column;
        gap: var(--space-m);
    }

    .source-content {
        display: flex;
        flex-direction: column;
        gap: var(--space-m);
    }

    .content-section {
        padding: var(--space-m);
        background: var(--color-surface-tint);
        border-radius: var(--radius-m);
    }

    .content-section h4 {
        margin-top: 0;
        margin-bottom: var(--space-s);
    }

    .content-section ul {
        margin: 0;
        padding-left: var(--space-l);
    }

    .related-sources {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-xs);
    }

    /* Activity Panel Styles */
    .activity-panel {
        width: 320px;
        background: var(--color-surface);
        border-right: 1px solid var(--color-surface-tint);
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .activity-header {
        padding: var(--space-m);
        border-bottom: 1px solid var(--color-surface-tint);
        background: var(--color-chrome);
    }

    .activity-header h3 {
        margin: 0 0 var(--space-s) 0;
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

    .activity-list {
        flex: 1;
        overflow-y: auto;
        padding: var(--space-s);
    }

    .activity-list :deep(.activity-list-item) {
        display: flex;
        align-items: center;
        gap: var(--space-s);
        padding: var(--space-s);
        border-radius: var(--radius-s);
        text-decoration: none;
        color: inherit;
        margin-bottom: var(--space-xs);
        transition: background-color 0.15s ease;
    }

    .activity-list :deep(.activity-list-item:hover) {
        background: var(--color-surface-tint);
    }

    .activity-list :deep(.activity-list-item.active) {
        background: var(--color-primary-subtle);
        color: var(--color-primary);
    }

    .activity-list :deep(.activity-list-item.active:hover) {
        background: var(--color-primary-subtle);
    }

    .activity-list :deep(.customer) {
        flex-shrink: 0;
    }

    .activity-list :deep(.event) {
        flex: 1;
        min-width: 0;
        font-weight: var(--font-weight-medium);
        font-size: var(--font-size-s);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .activity-list :deep(.summary) {
        display: none; /* Hide summary in compact view */
    }

    .activity-list :deep(.datetime) {
        flex-shrink: 0;
        font-size: var(--font-size-xs);
        color: var(--color-text-subtle);
    }

    .activity-list :deep(.message-count) {
        flex-shrink: 0;
        font-size: var(--font-size-xs);
        color: var(--color-text-subtle);
        display: flex;
        align-items: center;
        gap: var(--space-xxs);
    }

    .activity-list :deep(.sentiment) {
        flex-shrink: 0;
    }

    /* Hide activity panel on smaller screens */
    @media (max-width: 1199px) {
        .activity-panel {
            display: none;
        }
    }
</style>
