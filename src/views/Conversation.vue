<template>
  <div class="conversation-view">
    <div class="conversation-header">
      <router-link :to="`/agent/${agentId}/activity`" class="back-link">
        <ArrowBigLeft /> All activity
      </router-link>
      <h1>Conversation</h1>
    </div>

    <div v-if="conversation" class="conversation-container">
      <div class="conversation-main" :class="{ 'panel-open': selectedMessage }">
        <ConversationMeta conversation-id="3923" zendesk-id="123456" />
        
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
        <button class="close-btn" @click="closePanel"><XIcon /></button>
        <template v-if="selectedMessage.role === 'agent'">
          <div class="panel-section">
            <h3>Message Details</h3>
            <div class="author-role">Agent</div>
            <div class="thinking-time">Thought for {{ selectedMessage.meta?.thinkingTime }}ms...</div>
            <div class="sources">
              <div class="meta-title">Sources ({{ selectedMessage.meta?.sources?.length || 0 }})</div>
              <ul>
                <SourceRating v-for="source in selectedMessage.meta?.sources || []" :key="source.name" :source="source" />
              </ul>
            </div>
            <div class="classifiers">
              <div class="meta-title">Classifiers</div>
              <ul>
                <ClassifierRating v-for="classifier in selectedMessage.meta?.classifiers || []" :key="classifier.name" :classifier="classifier" />
              </ul>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="panel-section">
            <h3>Message Details</h3>
            <div class="author-role">Customer</div>
            <div class="meta-title">Personal Context</div>
            <div class="placeholder">(Personal context details will appear here.)</div>
            <div class="meta-title">Purchase History</div>
            <div class="placeholder">(Purchase history will appear here.)</div>
            <div class="meta-title">Support History</div>
            <div class="placeholder">(Support history will appear here.)</div>
          </div>
        </template>
      </div>
    </div>
    <div v-else>
      <p>Conversation not found.</p>
    </div>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { agents } from '@/data/agents.js';
  import { conversations } from '@/data/conversations.js';
  import { ArrowBigLeft, XIcon } from 'lucide-vue-next';
  import SourceRating from '@/components/SourceRating.vue';
  import ClassifierRating from '@/components/ClassifierRating.vue';
  import ConversationSummary from '@/components/ConversationSummary.vue';
  import ConversationMeta from '@/components/ConversationMeta.vue';
  import Message from '@/components/Message.vue';

  const route = useRoute();
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

  function selectMessage(msg, idx) {
    if (selectedIdx.value === idx) {
      closePanel();
    } else {
      selectedMessage.value = msg;
      selectedIdx.value = idx;
    }
  }

  function closePanel() {
    selectedMessage.value = null;
    selectedIdx.value = null;
  }
</script>

<style scoped>
  .conversation-view {
    padding: var(--space-m);
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
  }

  .conversation-header {
    margin-bottom: var(--space-s);
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

  .messages {
    display: flex;
    flex-direction: column;
    gap: var(--space-s);
  }

  .agent-meta-container {
    padding: var(--space-m) 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
    font-size: var(--font-size-s);
  }

  .thinking-time {
    color: var(--color-text-subtle);
  }

  .agent-meta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-xl);
    align-items: start;
  }

  .meta-title {
    font-weight: 500;
    margin-bottom: var(--space-xxs);
  }

  .meta-subtitle {
    color: var(--color-text-subtle);
    margin-bottom: var(--space-s);
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

  .item-details {
    display: flex;
    flex-direction: column;
  }

  .item-name {
    font-weight: 500;
  }

  .item-description {
    color: var(--color-text-subtle);
  }

  .item-actions {
    display: flex;
    gap: var(--space-xs);
  }

  .item-actions button {
    background: transparent;
    border: 1px solid var(--color-surface-tint);
    color: var(--color-text);
    padding: var(--space-xs);
    border-radius: var(--radius);
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .item-actions button:hover {
    background: var(--color-surface-tint);
  }

  .classifiers li .item-actions button {
    background: var(--color-surface-tint);
  }

  .classifiers li .item-actions button:hover {
    background: var(--color-surface);
  }

  .conversation-container {
    display: flex;
    flex-direction: row;
    gap: var(--space-m);
    position: relative;
  }

  .details-panel {
    width: 340px;
    background: var(--color-surface);
    border-left: 1px solid var(--color-surface-tint-dark);
    padding: var(--space-m);
    position: relative;
    box-shadow: -2px 0 8px rgba(0,0,0,0.04);
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
    z-index: 2;
  }

  .close-btn {
    position: absolute;
    top: var(--space-m);
    right: var(--space-m);
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: var(--color-text-subtle);
    z-index: 3;
  }
</style>
