<template>
  <div class="conversation-view">
    <div class="conversation-header">
      <router-link :to="`/agent/${agentId}/activity`" class="back-link">
        <ArrowBigLeft /> All activity
      </router-link>
      <h1>Conversation</h1>
    </div>

    <div v-if="conversation">
      <div class="conversation-meta">
        <div class="conversation-link"><a href="#"><Link class="link-icon" />#3923</a></div>
        <div class="conversation-zendesk"><a href="#">Zendesk #123456</a></div>
      </div>
      
      <div class="summary">
        <h2>AI Summary</h2>
        <p>The customer does not know who hosts their website. We have little information about them, so the assistant responded with instructions for using the WordPress.com Site Profiler tool.</p>
      </div>

      <div class="customer">
        <div class="customer-avatar">
          <img :src="gravatarUrl(conversationItem.customer)" alt="Customer avatar" height="32" width="32" />
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
          <div :class="['message', msg.role]" :id="`message-${idx}`">
            <div class="meta-row">
              <a :href="`#message-${idx}`" class="message-link">{{ formatDate(conversationItem.datetime) }}</a>
            </div>
            <div v-if="msg.role === 'user'" class="user-info">
              <img :src="gravatarUrl(conversationItem.customer)" alt="User avatar" height="24" width="24" class="user-avatar" />
              <span class="user-email">{{ conversationItem.customer }}</span>
            </div>
            <span v-else class="role">{{ msg.role }}</span>
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
import { ArrowBigLeft, Link } from 'lucide-vue-next';
import SourceRating from '@/components/SourceRating.vue';
import ClassifierRating from '@/components/ClassifierRating.vue';
import CryptoJS from 'crypto-js';

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

function gravatarUrl(email) {
  if (!email) return '';
  const hash = CryptoJS.SHA256(email.trim().toLowerCase()).toString(CryptoJS.enc.Hex);
  return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
}
</script>

<style scoped>
* {
  outline: 1px dashed rgba(255, 0, 0, 0.1);
}

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

.user-info {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  margin-bottom: var(--space-xs);
}

.user-avatar {
  border-radius: 50%;
}

.user-email {
  font-weight: 500;
  color: var(--color-text);
}

.message-link {
  color: var(--color-text-subtle);
  text-decoration: none;
  font-size: var(--font-size-s);
}

.message-link:hover {
  color: var(--color-text);
  text-decoration: underline;
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
