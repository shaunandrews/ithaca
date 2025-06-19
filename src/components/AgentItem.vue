<template>
  <div
    class="agent-item"
    @click="handleClick"
    style="user-select: none;"
  >
    <router-link :to="`/agent/${agent.id}`" class="agent-title">{{ agent.title }}</router-link>
    <div class="agent-description">{{ agent.description }}</div>
    <div class="agent-owner hstack">
      <img height="24" width="24" :src="`/images/${agent.ownerIcon}`" class="agent-owner-icon" />
      <span class="agent-owner-name">{{ agent.owner }}</span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  agent: {
    type: Object,
    required: true
  }
});

const router = useRouter();

function handleClick(event) {
  // Prevent navigation if the router-link was clicked
  if (event.target.closest('.agent-title')) {
    return;
  }
  router.push(`/agent/${props.agent.id}`);
}
</script>

<style scoped>
.agent-item {
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border-radius: var(--radius);
  padding: var(--space-m);
  border: 1px solid var(--color-surface-tint-dark);
  cursor: pointer;
}

.agent-item:hover {
  background-color: var(--color-surface-tint);
}

.agent-title {
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-bold);
  text-decoration: none;
  color: var(--color-surface-fg);
}

.agent-description {
  color: var(--color-surface-fg-secondary);
  line-height: 1.5em;
  min-height: 3em; /* Always at least 2 lines tall */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.agent-owner {
  font-size: var(--font-size-s);
  padding-top: var(--space-xs);
  gap: var(--space-xs);
  align-items: center;
  color: var(--color-surface-fg-tertiary);
}

.agent-owner-icon {
  height: 16px;
  width: 16px;
  border-radius: var(--radius-s);
}
</style> 