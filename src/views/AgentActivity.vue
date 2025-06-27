<template>
  <div class="agent-activity vstack">
    <AgentSummary :agent="agent" />
    <h2>Conversations</h2>
    <div class="activity-list vstack">
      <ActivityListItem
        v-for="conversation in agentConversations"
        :key="conversation.id"
        :item="conversation"
        :to="`/agent/${agent.id}/activity/${conversation.id}`"
        />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { agents } from '@/data/agents.js';
import { conversations } from '@/data/conversations.js';
import ActivityListItem from '@/components/ActivityListItem.vue';
import AgentSummary from '@/components/AgentSummary.vue';

const route = useRoute();
const agentId = computed(() => Number(route.params.id));
const agent = computed(() => agents.find(a => a.id === agentId.value));

const agentConversations = computed(() => {
  if (!agent.value?.conversationIds) return [];
  
  return agent.value.conversationIds
    .map(id => conversations.find(c => c.id === id))
    .filter(Boolean)
    .sort((a, b) => new Date(b.datetime) - new Date(a.datetime)); // Sort by most recent first
});
</script>

<style scoped>
.agent-activity {
  padding: var(--space-m);
  gap: var(--space-l);
}

.activity-list {
  border: 1px solid var(--color-surface-tint-dark);
  border-radius: var(--radius-l);
  overflow: hidden;
}
</style> 