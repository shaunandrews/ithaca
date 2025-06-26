<template>
  <div class="conversation-view">
    <div class="conversation-header hstack">
      <router-link :to="`/agent/${agentId}/activity`" class="back-link">
        <ArrowLeft stroke-width="1.5" height="18" width="18" /> All activity
      </router-link>
      <h1>Conversation</h1>
      <ConversationMeta conversation-id="3923" zendesk-id="123456" />
    </div>

    <div v-if="conversation" class="hstack">
      <div class="conversation-main" :class="{ 'panel-open': selectedMessage }">
        <ConversationSummary summary="The customer does not know who hosts their website. We have little information about them, so the assistant responded with instructions for using the WordPress.com Site Profiler tool." />
        
        <div class="messages">
          <Message
            v-for="(msg, idx) in conversation.messages"
            :key="idx"
            :message="msg"
            :index="idx"
            :datetime="conversationItem.datetime"
            :customer="conversationItem.customer"
            :is-selected="selectedIdx === idx"
            @select="selectMessage"
          />
        </div>
      </div>

      <div v-if="selectedMessage" class="details-panel">
        <header class="hstack">
          <h3>Message Details</h3>
          <button class="small" @click="closePanel"><XIcon /></button>
        </header>
        <template v-if="selectedMessage.role === 'agent'">
          <div class="panel-section">
            <Badge variant="agent">Agent</Badge>
            <div class="thinking-time hstack">
              <Hourglass height="16" width="16" />
              <span>Thought for {{ selectedMessage.meta?.thinkingTime }}ms...</span>
            </div>
            <div class="sources">
              <h4>Sources ({{ selectedMessage.meta?.sources?.length || 0 }})</h4>
              <p>Judge the relevance of each source to the conversation. Click a source to view the full content.</p>
              <ul>
                <SourceRating 
                  v-for="source in selectedMessage.meta?.sources || []" 
                  :key="source.name" 
                  :source="source" 
                  @view-source="openSourceModal"
                />
              </ul>
            </div>
            <div class="classifiers">
              <h4>Classifiers</h4>
              <p>Confirm the agents response to each classifier, or edit the value if it's incorrect.</p>
              <ul>
                <ClassifierRating v-for="classifier in selectedMessage.meta?.classifiers || []" :key="classifier.name" :classifier="classifier" />
              </ul>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="panel-section">
            <Badge variant="customer">Customer</Badge>
            <h4>Personal Context</h4>
            <div class="placeholder">(Personal context details will appear here.)</div>
            <h4>Purchase History</h4>
            <div class="placeholder">(Purchase history will appear here.)</div>
            <h4>Support History</h4>
            <div class="placeholder">(Support history will appear here.)</div>
          </div>
        </template>
      </div>
    </div>

    <div v-else>
      <p>Conversation not found.</p>
    </div>

    <!-- Source Modal -->
    <Modal :is-open="isSourceModalOpen" @close="closeSourceModal">
      <div class="source-modal-content">
        <h2>{{ selectedSource?.name }}</h2>
        <p class="source-description">{{ selectedSource?.description }}</p>
        
        <div class="source-details">
          <h3>Full Content</h3>
          <div class="source-content">
            <p><strong>Document Type:</strong> {{ selectedSource?.type || 'Knowledge Base Article' }}</p>
            <p><strong>Last Updated:</strong> {{ selectedSource?.lastUpdated || 'March 15, 2024' }}</p>
            <p><strong>Relevance Score:</strong> {{ selectedSource?.score || '0.92' }}</p>
            
            <div class="content-section">
              <h4>Summary</h4>
              <p>{{ selectedSource?.fullContent || 'This is a comprehensive guide covering the topic mentioned in the source description. The content provides detailed steps, examples, and best practices that were used to generate the agent\'s response. This source was automatically selected based on its high relevance score and comprehensive coverage of the user\'s inquiry.' }}</p>
            </div>
            
            <div class="content-section">
              <h4>Key Points</h4>
              <ul>
                <li>Primary solution approach based on user context</li>
                <li>Alternative methods when primary approach fails</li>
                <li>Common troubleshooting steps and gotchas</li>
                <li>Related resources and documentation links</li>
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
  import { computed, ref, watch, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { agents } from '@/data/agents.js';
  import { conversations } from '@/data/conversations.js';
  import { ArrowLeft, XIcon, Hourglass } from 'lucide-vue-next';
  import SourceRating from '@/components/SourceRating.vue';
  import ClassifierRating from '@/components/ClassifierRating.vue';
  import ConversationSummary from '@/components/ConversationSummary.vue';
  import ConversationMeta from '@/components/ConversationMeta.vue';
  import Message from '@/components/Message.vue';
  import Badge from '@/components/Badge.vue';
  import Modal from '@/components/Modal.vue';

  const route = useRoute();
  const router = useRouter();
  const agentId = computed(() => Number(route.params.id));
  const activityId = computed(() => Number(route.params.activityId));

  const agent = computed(() => agents.find(a => a.id === agentId.value));
  const conversationItem = computed(() => agent.value?.activity.find(a => a.id === activityId.value));
  const conversation = computed(() => {
    const convId = conversationItem.value?.conversationId;
    return conversations.find(c => c.id === convId);
  });

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
      if (idx >= 0 && idx < conversation.value.messages.length) {
        selectedMessage.value = conversation.value.messages[idx];
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
        query: { ...route.query, selected: idx.toString() }
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
      query: newQuery
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
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .conversation-header {
    gap: var(--space-s);
    padding: var(--space-xxs) var(--space-m) var(--space-xxs) var(--space-s);
    border-bottom: 0.5px solid var(--color-surface-tint);
    align-items: center;
    justify-content: space-between;
  }

  .back-link {
    text-decoration: none;
    font-size: var(--font-size-s);
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
  }

  .back-link:hover {
    text-decoration: underline;
  }

  .conversation-header h1 {
    font-size: var(--font-size-m);
    font-weight: var(--font-weight-semibold);
  }

  .messages {
    display: flex;
    flex-direction: column;
    gap: var(--space-s);
    max-width: 840px;
    margin: 0 auto;
  }

  .thinking-time {
    color: var(--color-text-subtle);
  }

  .meta-title {
    font-weight: 500;
    margin-bottom: var(--space-xxs);
  }

  .sources ul,
  .classifiers ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-s);
  }

  .classifiers li {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .conversation-main {
    padding: var(--space-m);
    max-width: 840px;
    margin: 0 auto;
  }

  .details-panel {
    min-width: 420px;
    max-width: 420px;
    border-left: 0.5px solid var(--color-surface-tint);
    padding: var(--space-m);
    display: flex;
    flex-direction: column;
  }

  .details-panel header {
    justify-content: space-between;
    align-items: center;
  }

  .panel-section {
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
  }

  .panel-section h4 {
    font-size: var(--font-size-s);
    font-weight: var(--font-weight-medium);
    margin-bottom: var(--space-xxs);
  }

  .panel-section p {
    font-size: var(--font-size-s);
    color: var(--color-chrome-fg-secondary);
    line-height: var(--line-height-tight);
    margin-bottom: var(--space-s);
  }

  .thinking-time {
    color: var(--color-chrome-fg-secondary);
    font-size: var(--font-size-s);
    gap: var(--space-xxs);
    align-items: center;
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
