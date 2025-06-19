<template>
  <div class="agents-toolbar">
    <div class="toolbar-start">
      <input type="search" placeholder="Search agents" />
    </div>
    <div class="toolbar-end">
      <button>New agent</button>
    </div>
  </div>

  <div class="agent-list">
    <div
      v-for="agent in agents"
      :key="agent.id"
      class="agent-item"
      @click="goToAgent(agent, $event)"
      style="user-select: none;"
    >
      <router-link :to="`/agent/${agent.id}`" class="agent-title">{{ agent.title }}</router-link>
      <div class="agent-description">{{ agent.description }}</div>
      <div class="agent-owner hstack">
        <img height="24" width="24" :src="`/images/${agent.ownerIcon}`" class="agent-owner-icon" />
        <span class="agent-owner-name">{{ agent.owner }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { agents } from '@/data/agents.js';

const router = useRouter();

function goToAgent(agent, event) {
  // Prevent navigation if the router-link was clicked
  if (
    event.target.closest('.agent-title')
  ) {
    return;
  }
  router.push(`/agent/${agent.id}`);
}
</script> 

<style scoped>
.agents-toolbar {
  display: flex;
  justify-content: space-between;
  gap: var(--space-s);
  padding: var(--space-s) var(--space-m);
}

.agent-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-s);
  padding: 0 var(--space-m);
}

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

.agent-tools {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.tool-item {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: var(--font-size-s);
  color: var(--color-surface-fg-secondary);
  padding: var(--space-xxs) var(--space-xs);
  background-color: var(--color-surface-tint);
  border-radius: var(--radius);
}

.tool-icon {
  width: 20px;
  height: 20px;
}
</style>