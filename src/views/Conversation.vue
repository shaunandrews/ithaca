<template>
    <div class="conversation-view">
        <div v-if="conversation" class="columns hstack">
            <div
                class="conversation"
                :class="{ 'panel-open': selectedMessage }"
            >
                <header class="conversation-header hstack">
                    <ButtonBack
                        :to="`/agent/${agentId}/activity`"
                        text="All activity"
                    />
                    <h1>Conversation</h1>
                    <ConversationMeta
                        :conversation-id="conversation.id.toString()"
                        :zendesk-id="`ZD-${conversation.id + 10000}`"
                        :tags="conversation.tags"
                    />
                </header>

                <div class="conversation-main">
                    <ConversationSummary
                        :summary="conversation.summary"
                        :title="conversation.event"
                    />

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
                </div>
            </div>

            <MessageDetailsPanel
                v-if="selectedMessage"
                :selected-message="selectedMessage"
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
    import { computed, ref, onMounted, inject } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
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

    // Source modal state
    const isSourceModalOpen = ref(false);
    const selectedSource = ref(null);

    // Initialize selected message from URL query parameter
    onMounted(() => {
        const selectedParam = route.query.selected;
        if (selectedParam !== undefined && conversation.value) {
            const idx = Number(selectedParam);
            if (idx >= 0 && idx < conversationMessages.value.length) {
                selectedMessage.value = conversationMessages.value[idx];
                selectedIdx.value = idx;
            }
        }
    });

    function selectMessage(msg, idx) {
        if (selectedIdx.value === idx) {
            closePanel();
        } else {
            selectedMessage.value = msg;
            selectedIdx.value = idx;
            // Update URL to remember selection
            router.replace({
                ...route,
                query: { ...route.query, selected: idx.toString() },
            });
        }
    }

    function closePanel() {
        selectedMessage.value = null;
        selectedIdx.value = null;
        // Remove selected parameter from URL
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
        padding: var(--space-l);
        margin: 0 auto;
        max-width: 840px;
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
        border-bottom: 1px solid var(--color-surface-tint);
        margin: 0 auto;
        text-align: center;
        position: sticky;
        top: 0;
        width: 100%;
        background-color: var(--color-chrome-transparent);
        backdrop-filter: blur(12px);
        z-index: 100;
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
        gap: var(--space-s);
        margin: 0 auto;
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
</style>
