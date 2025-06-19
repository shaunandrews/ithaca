<template>
  <div class="conversation-view">
    <header>
      <router-link :to="backLink" class="back-link">Back to Activity</router-link>
      <h2>Conversation Detail</h2>
    </header>
    <div v-if="conversation">
      <div class="conversation-meta">
        <div class="meta-row"><strong>Date:</strong> {{ formatDate(conversationItem.datetime) }}</div>
        <div class="meta-row"><strong>Event:</strong> {{ conversationItem.event }}</div>
        <div class="meta-row" v-if="conversationItem.customer"><strong>Customer:</strong> {{ conversationItem.customer }}</div>
      </div>
      <div class="messages">
        <div v-for="(msg, idx) in conversation.messages" :key="idx" :class="['message', msg.role]">
          <span class="role">{{ msg.role }}:</span>
          <span class="text">{{ msg.text }}</span>
        </div>
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

const route = useRoute();
const agentId = computed(() => Number(route.params.id));
const activityId = computed(() => Number(route.params.activityId));

const agent = computed(() => agents.find(a => a.id === agentId.value));
const conversationItem = computed(() => agent.value?.activity.find(a => a.id === activityId.value));
const conversation = computed(() => {
  const convId = conversationItem.value?.conversationId;
  return conversations.find(c => c.id === convId);
});

const backLink = computed(() => `/agent/${agentId.value}?tab=activity`);

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
header {
  display: flex;
  align-items: center;
  gap: var(--space-m);
}
.back-link {
  text-decoration: none;
  color: var(--color-accent-fg);
}
.messages {
  border-top: 1px solid var(--color-surface-tint);
  padding-top: var(--space-m);
  display: flex;
  flex-direction: column;
  gap: var(--space-s);
}
.message {
  padding: var(--space-xs) var(--space-s);
  background-color: var(--color-surface-tint);
  border-radius: var(--radius);
}
.message.agent {
  background-color: var(--color-accent);
  color: var(--color-accent-fg);
}
.role {
  font-weight: bold;
  margin-right: var(--space-xs);
}
</style>
