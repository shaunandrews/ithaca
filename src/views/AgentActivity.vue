<template>
  <div class="agent-activity vstack">
    <AgentSummary :agent="agent" />
    <h2>Conversations</h2>
    <div class="activity-list vstack">
      <ActivityListItem
        v-for="(item, idx) in agent.activity"
        :key="idx"
        :item="item"
        :to="`/agent/${agent.id}/activity/${item.id}`"
        />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { agents } from '@/data/agents.js';
import ActivityListItem from '@/components/ActivityListItem.vue';
import AgentSummary from '@/components/AgentSummary.vue';

const route = useRoute();
const agentId = computed(() => Number(route.params.id));
const agent = computed(() => agents.find(a => a.id === agentId.value));
</script>

<style scoped>
.agent-activity {
  padding: var(--space-m);
  gap: var(--space-l);
}

.activity-list {
  border: 0.5px solid var(--color-surface-tint-dark);
  border-radius: var(--radius-l);
  overflow: hidden;
}
</style> 