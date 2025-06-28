<template>
    <div class="conversation-view">
        <div v-if="conversation" class="columns hstack">
            <div
                class="conversation"
                :class="{ 'panel-open': selectedMessage }"
                ref="conversationContainer"
            >
                <header class="conversation-header hstack" :class="{ 'has-border': isScrolled }">
                    <ButtonBack
                        :to="`/agent/${agentId}/activity`"
                        text="All activity"
                    />
                    <h1>{{ conversation.event }}</h1>
                    <ConversationMeta
                        :conversation-id="conversation.id.toString()"
                        :zendesk-id="`ZD-${conversation.id + 10000}`"
                    />
                </header>

                <div class="conversation-main vstack">
                    <div class="messages ">
                        <ConversationSummary
                            :summary="conversation.summary"
                            :title="conversation.event"
                            @click="selectConversationSummary"
                            :is-selected="isConversationSummarySelected"
                        />

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

                    <div class="conversation-stats hstack">
                        <div class="stats-item quote"><component :is="sentimentIcon" stroke-width="1.5" size="18" /> "{{ conversation.quote }}"</div>
                        <div class="stats-item"><MessagesSquare size="18" stroke-width="1.5" /> {{ conversationMessages.length }} message{{ conversationMessages.length === 1 ? '' : 's' }}</div>
                        <div class="stats-item"><Timer size="18" stroke-width="1.5" /> 90 mins</div>
                        <div
                            v-if="conversation.tags && conversation.tags.length > 0"
                            class="stats-item tags-item"
                            ref="tagsContainer"
                            @click.prevent="toggleTagsPopover"
                        >
                            <Tags stroke-width="1.5" size="18" />
                            {{ conversation.tags.length }} tag{{ conversation.tags.length === 1 ? '' : 's' }}
                            <div v-if="showTagsPopover" class="tags-popover">
                                <div class="tags-list vstack">
                                    <div v-for="tag in conversation.tags" :key="tag" class="tag-item">
                                        {{ tag }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <MessageDetailsPanel
                v-if="selectedMessage || isConversationSummarySelected"
                :selected-message="selectedMessage"
                :conversation="isConversationSummarySelected ? conversation : null"
                @close="closePanel"
                @view-source="openSourceModal"
            />
        </div>

        <div v-else class="empty vstack">
            <h1>Conversation not found.</h1>
            <p>Uh oh, I wasn't able to find that conversation.</p>
            <p>
                Try going back to the
                <router-link :to="`/agent/${agentId}/activity`"
                    >activity page</router-link
                >
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
    import { computed, ref, onMounted, onUnmounted, inject } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { Laugh, Smile, Meh, Annoyed, Frown, Angry, Timer, Tags, MessagesSquare } from 'lucide-vue-next';
    import { agents } from '@/data/agents.js';
    import { conversations } from '@/data/conversations.js';
    import { messages } from '@/data/messages.js';
    import ConversationSummary from '@/components/ConversationSummary.vue';
    import ConversationMeta from '@/components/ConversationMeta.vue';
    import Message from '@/components/Message.vue';
    import Modal from '@/components/Modal.vue';
    import ButtonBack from '@/components/ButtonBack.vue';
    import MessageDetailsPanel from '@/components/MessageDetailsPanel.vue';

    const route = useRoute();
    const router = useRouter();
    const agentId = computed(() => Number(route.params.id));
    const activityId = computed(() => Number(route.params.activityId));

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

    const selectedMessage = ref(null);
    const selectedIdx = ref(null);
    const isConversationSummarySelected = ref(false);

    // Source modal state
    const isSourceModalOpen = ref(false);
    const selectedSource = ref(null);

    // Tags popover state
    const showTagsPopover = ref(false);
    const tagsContainer = ref(null);

    // Scroll state for header border
    const isScrolled = ref(false);
    const conversationContainer = ref(null);

    // Sentiment icon mapping
    const sentimentIcon = computed(() => {
        if (!conversation.value) return Frown;
        
        const sentimentMap = {
            1: Laugh,    // laugh
            2: Smile,    // smile
            3: Meh,      // meh
            4: Annoyed,  // annoyed
            5: Frown,    // frown
            6: Angry     // angry
        };
        
        return sentimentMap[conversation.value.sentiment] || Frown;
    });

    // Initialize selected message from URL query parameter
    onMounted(() => {
        const selectedParam = route.query.selected;
        const summarySelectedParam = route.query.summarySelected;
        
        if (summarySelectedParam === 'true') {
            isConversationSummarySelected.value = true;
        } else if (selectedParam !== undefined && conversation.value) {
            const idx = Number(selectedParam);
            if (idx >= 0 && idx < conversationMessages.value.length) {
                selectedMessage.value = conversationMessages.value[idx];
                selectedIdx.value = idx;
            }
        }
        
        // Add click outside listener for tags popover
        document.addEventListener('click', handleClickOutside);
        
        // Add scroll listener for header border
        if (conversationContainer.value) {
            conversationContainer.value.addEventListener('scroll', handleScroll);
        }
    });

    onUnmounted(() => {
        document.removeEventListener('click', handleClickOutside);
        
        // Remove scroll listener
        if (conversationContainer.value) {
            conversationContainer.value.removeEventListener('scroll', handleScroll);
        }
    });

    function selectMessage(msg, idx) {
        if (selectedIdx.value === idx) {
            closePanel();
        } else {
            // Close conversation summary selection if switching to message
            isConversationSummarySelected.value = false;
            selectedMessage.value = msg;
            selectedIdx.value = idx;
            // Update URL to remember selection
            router.replace({
                ...route,
                query: { ...route.query, selected: idx.toString(), summarySelected: undefined },
            });
        }
    }

    function selectConversationSummary() {
        if (isConversationSummarySelected.value) {
            closePanel();
        } else {
            // Close message selection if switching to conversation summary
            selectedMessage.value = null;
            selectedIdx.value = null;
            isConversationSummarySelected.value = true;
            // Update URL to remember selection
            router.replace({
                ...route,
                query: { ...route.query, summarySelected: 'true', selected: undefined },
            });
        }
    }

    function closePanel() {
        selectedMessage.value = null;
        selectedIdx.value = null;
        isConversationSummarySelected.value = false;
        // Remove selected parameters from URL
        const newQuery = { ...route.query };
        delete newQuery.selected;
        delete newQuery.summarySelected;
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
    }

    .conversation-main {
        padding: var(--space-s);
        padding-top: 0;
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
        background-color: var(--color-chrome-transparent);
        backdrop-filter: blur(12px);
        z-index: 100;
        min-height: var(--toolbar-height);
        transition: border-bottom-color 0.15s ease;
    }

    .conversation-header.has-border {
        border-bottom-color: var(--color-surface-tint);
    }

    .conversation-stats {
        font-size: var(--font-size-s);
        align-items: center;
        padding-right: var(--space-xs);
        border-radius: var(--radius-xl);
        border: 1px solid var(--color-surface-tint);
        background: var(--color-tooltip);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid rgba(0, 0, 0, 0.8);
        border-top: 1px solid rgba(255,255,255, 0.1);
        color: var(--color-tooltip-fg);
        position: sticky;
        bottom: var(--space-s);
        z-index: 100;
    }

    .stats-item {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        padding: var(--space-xs) var(--space-s);
        border-right: 1px solid var(--color-surface-tint);
    }

    .stats-item.quote {
        flex: 1;
    }

    .stats-item:last-child {
        border-right: none;
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

    .tag {
        background: var(--color-surface);
        padding: var(--space-xxs) var(--space-s);
        border-radius: var(--radius-s);
        font-size: var(--font-size-s);
        border: 1px solid var(--color-surface-tint);
    }

    .tags-item {
        position: relative;
    }

    .tags-item a {
        color: var(--color-tooltip-fg);
        text-decoration: none;
    }

    .tags-item a:hover {
        text-decoration: underline;
    }

    .tags-popover {
        position: absolute;
        bottom: 100%;
        right: calc(var(--space-xs) * -1);
        background: var(--color-tooltip);
        backdrop-filter: blur(12px);
        color: var(--color-tooltip-fg);
        border-radius: var(--radius-m);
        z-index: 1000;
        width: 180px;
        margin-bottom: var(--space-xxs);
    }

    .tags-list {
        gap: var(--space-xs);
        padding: var(--space-s);
        max-height: 280px;
        overflow-y: auto;
    }
</style>
