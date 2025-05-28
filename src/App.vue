<template>
  <div>
    <header>
      <h1>Ithaca</h1>
      <nav>
        <ul>
          <li class="nav-item" v-if="isAssistantRoute">
            <router-link to="/">Go home</router-link>
          </li>
          <template v-else>
            <li class="nav-item" :class="{ active: $route.name === 'Assistants' }">
              <router-link to="/">Assistants</router-link>
            </li>
            <li class="nav-item" :class="{ active: $route.name === 'Tools' }">
              <router-link to="/tools">Tools</router-link>
            </li>
          </template>
        </ul>
      </nav>
    </header>

    <main>
      <router-view/>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const isAssistantRoute = computed(() => route.name === 'Assistant');
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  gap: var(--space-m);
  padding: var(--space-s) var(--space-m);
  border-bottom: 1px solid var(--color-surface-tint);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: var(--space-s);
}

main {
  padding: var(--space-m);
  display: flex;
  flex-direction: column;
  gap: var(--space-m);
}
</style>