<template>
  <div class="conversation-view">
    <div class="conversation-header">
      <router-link :to="`/agent/${agentId}/activity`" class="back-link">
        <ArrowBigLeft /> All activity
      </router-link>
    </div>
    
    <div v-if="conversation">
      <div class="conversation-meta">
        <div class="meta-row">{{ formatDate(conversationItem.datetime) }}</div>
        <div class="meta-row">{{ conversationItem.event }}</div>
        <div class="meta-row">{{ conversationItem.customer }}</div>
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
import { ArrowBigLeft } from 'lucide-vue-next';

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

.conversation-meta {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  padding: var(--space-s);
  background-color: var(--color-surface-tint);
  border-radius: var(--radius);
  margin-bottom: var(--space-m);
}

.meta-row {
  font-size: var(--font-size-s);
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
