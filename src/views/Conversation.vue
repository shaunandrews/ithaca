<template>
  <div class="conversation-view">
    <div class="conversation-header hstack">
      <router-link :to="`/agent/${agentId}/activity`" class="back-link">
        <ArrowBigLeft /> All activity
      </router-link>
      <h1>Conversation</h1>
      <ConversationMeta conversation-id="3923" zendesk-id="123456" />
    </div>

    <div v-if="conversation" class="conversation-container">
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

  .conversation-container {
    display: flex;
    flex-direction: row;
    gap: var(--space-m);
  }

  .details-panel {
    width: 340px;
    border-left: 0.5px solid var(--color-surface-tint);
    padding: var(--space-m);
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
  }
</style>
