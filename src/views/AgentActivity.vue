<template>
  <div class="agent-activity vstack">
    <ActivityListItem
      v-for="(item, idx) in agent.activity"
      :key="idx"
      :item="item"
      :to="`/agent/${agent.id}/activity/${item.id}`"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { agents } from '@/data/agents.js';
import ActivityListItem from '@/components/ActivityListItem.vue';

const route = useRoute();
const agentId = computed(() => Number(route.params.id));
const agent = computed(() => agents.find(a => a.id === agentId.value));
</script>

<style scoped>
.agent-activity {
  margin: var(--space-m);
  border: 1px solid var(--color-surface-tint);
  border-radius: var(--radius-m);
  overflow: hidden;
}
</style> 