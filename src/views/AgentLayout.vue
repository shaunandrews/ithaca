<template>
  <div class="agent-container">
    <header v-if="agent">
      <div class="agent-header-start">
        <h2 class="agent-title">{{ agent.title }}</h2>
        <nav>
          <ul>
            <li :class="{ active: isActiveTab('workbench') }">
              <router-link :to="`/agent/${agent.id}`">Workbench</router-link>
            </li>
            <li :class="{ active: isActiveTab('versions') }">
              <router-link :to="`/agent/${agent.id}/versions`">Versions</router-link>
            </li>
            <li :class="{ active: isActiveTab('insights') }">
              <router-link :to="`/agent/${agent.id}/insights`">Insights</router-link>
            </li>
            <li :class="{ active: isActiveTab('activity') }">
              <router-link :to="`/agent/${agent.id}/activity`">Activity</router-link>
            </li>
          </ul>
        </nav>
      </div>
      <div class="agent-header-end">
        <button class="primary">Save</button>
      </div>
    </header>

    <div v-else class="agent-not-found">
      <p>Agent not found.</p>
    </div>

    <router-view v-if="agent" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { agents } from '@/data/agents.js';

const route = useRoute();
const agentId = computed(() => Number(route.params.id));
const agent = computed(() => agents.find(a => a.id === agentId.value));

function isActiveTab(tabName) {
  const currentPath = route.path;
  const expectedPath = `/agent/${agentId.value}/${tabName}`;
  const defaultPath = `/agent/${agentId.value}`;
  
  if (tabName === 'workbench') {
    return currentPath === expectedPath || currentPath === defaultPath;
  }
  return currentPath === expectedPath;
}
</script>

<style scoped>
.agent-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-m);
  padding: var(--space-s) var(--space-m);
  border-bottom: 1px solid var(--color-surface-tint);
}

.agent-header-start,
.agent-header-end {
  display: flex;
  align-items: center;
  gap: var(--space-m);
}

header h2 {
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-semibold);
}

nav ul {
  display: flex;
  gap: var(--space-xs);
  padding: 0;
  margin: 0;
}

nav li {
  list-style: none;
  font-size: var(--font-size-s);
  padding: var(--space-xxs) var(--space-xs);
  border-radius: var(--radius);
  color: var(--color-chrome-fg-secondary);
}

nav li a {
  text-decoration: none;
  color: inherit;
}

nav li.active {
  color: var(--color-chrome-fg);
  font-weight: var(--font-weight-semibold);
  background-color: var(--color-surface-tint);
}

nav li:hover:not(.active) {
  background-color: var(--color-surface-tint-dark);
}

.agent-not-found {
  padding: var(--space-m);
  text-align: center;
}
</style> 