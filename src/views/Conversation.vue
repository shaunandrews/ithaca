<template>
  <div class="conversation-view">
    <div class="conversation-header">
      <router-link :to="`/agent/${agentId}/activity`" class="back-link">
        <ArrowBigLeft /> All activity
      </router-link>
    </div>
    
    <div v-if="conversation">
      <div class="customer">
        <div class="customer-avatar">
          <img src="/images/avatar-apeatling.png" alt="Customer avatar" height="32" width="32" />
        </div>
        <div class="customer-name">{{ conversationItem.customer }}</div>
      </div>
      <div class="messages">
        <template v-for="(msg, idx) in conversation.messages" :key="idx">
          <div v-if="msg.role === 'agent' && msg.meta" class="agent-meta-container">
            <div class="thinking-time">Thought for {{ msg.meta.thinkingTime }}ms...</div>
            <div class="agent-meta">
              <div class="sources">
                <div class="meta-title">{{ msg.meta.sources.length }} sources used</div>
                <ul>
                  <SourceRating v-for="source in msg.meta.sources" :key="source.name" :source="source" />
                </ul>
              </div>
              <div class="classifiers">
                <div class="meta-title">Classifiers</div>
                <ul>
                  <ClassifierRating v-for="classifier in msg.meta.classifiers" :key="classifier.name" :classifier="classifier" />
                </ul>
              </div>
            </div>
          </div>
          <div :class="['message', msg.role]">
            <div class="meta-row">{{ formatDate(conversationItem.datetime) }}</div>
            <span class="role">{{ msg.role }}</span>
            <span class="text">{{ msg.text }}</span>
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
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { agents } from '@/data/agents.js';
import { conversations } from '@/data/conversations.js';
import { ArrowBigLeft } from 'lucide-vue-next';
import SourceRating from '@/components/SourceRating.vue';
import ClassifierRating from '@/components/ClassifierRating.vue';

const route = useRoute();
const agentId = computed(() => Number(route.params.id));
const activityId = computed(() => Number(route.params.activityId));

const agent = computed(() => agents.find(a => a.id === agentId.value));
const conversationItem = computed(() => agent.value?.activity.find(a => a.id === activityId.value));
const conversation = computed(() => {
  const convId = conversationItem.value?.conversationId;
  return conversations.find(c => c.id === convId);
});

function formatDate(datetime) {
  const date = new Date(datetime);
  return date.toLocaleString();
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

.message {
  padding: var(--space-s);
  border-radius: var(--radius);
  border: 0.5px solid var(--color-surface-tint-dark);
}

.message.agent {
  background-color: var(--color-accent);
  color: var(--color-accent-fg);
}

.role {
  font-weight: bold;
  margin-right: var(--space-xs);
  text-transform: capitalize;
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
</style>
