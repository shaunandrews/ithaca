<template>
  <div class="expert-container">
    <header v-if="expert">
      <div class="expert-header-start">
        <h2 class="expert-title">{{ expert.title }}</h2>
        <nav>
          <ul>
            <li :class="{ active: isActiveTab('activity') }">
              <router-link :to="`/expert/${expert.id}/activity`">Activity</router-link>
            </li>
            <li :class="{ active: isActiveTab('configuration') }">
              <router-link :to="`/expert/${expert.id}/configuration`">Configuration</router-link>
            </li>
            <li :class="{ active: isActiveTab('insights') }">
              <router-link :to="`/expert/${expert.id}/insights`">Insights</router-link>
            </li>
            <li :class="{ active: isActiveTab('versions') }">
              <router-link :to="`/expert/${expert.id}/versions`">Versions</router-link>
            </li>
          </ul>
        </nav>
      </div>
      <div class="expert-header-end">
        <button class="primary">Save</button>
      </div>
    </header>

    <div v-else class="expert-not-found">
      <p>Expert not found.</p>
    </div>

    <router-view v-if="expert" />
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { experts } from '@/data/experts.js';

  const route = useRoute();
  const expertId = computed(() => Number(route.params.id));
  const expert = computed(() => experts.find(e => e.id === expertId.value));

  function isActiveTab(tabName) {
    const currentPath = route.path;
    const expectedPath = `/expert/${expertId.value}/${tabName}`;
    const defaultPath = `/expert/${expertId.value}`;
    
    if (tabName === 'activity') {
      return currentPath === expectedPath || currentPath === defaultPath || currentPath.startsWith(`/expert/${expertId.value}/activity`);
    }
    return currentPath === expectedPath;
  }
</script>

<style scoped>
.expert-container {
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
  background-color: var(--color-chrome-transparent);
  border-bottom: 1px solid var(--color-surface-tint);
  position: sticky;
  top: 0;
  backdrop-filter: blur(12px);
}

.expert-header-start,
.expert-header-end {
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
  gap: var(--space-xxs);
  padding: 0;
  margin: 0;
}

nav li {
  list-style: none;
}

nav li a {
  text-decoration: none;
  color: var(--color-chrome-fg-secondary);
  font-size: var(--font-size-s);
  font-weight: var(--font-weight-medium);
  padding: var(--space-xxs) var(--space-xs);
  border-radius: var(--radius);
  display: block;
}

nav li.active a {
  color: var(--color-chrome-fg);
  background-color: var(--color-surface-tint-dark);
}

nav li a:hover:not(.active) {
  background-color: var(--color-surface-tint);
}

.expert-not-found {
  padding: var(--space-m);
  text-align: center;
}
</style> 