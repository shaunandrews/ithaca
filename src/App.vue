<template>
  <div class="ithaca">
    <header>
      <div class="header-start">
        <h1>Ithaca</h1>
        <nav>
          <ul>
            <li v-if="isAssistantRoute" class="nav-item">
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
      </div>
      <div class="header-end">
        <div class="user">
          <p class="user-initials">SA</p>
        </div>
      </div>
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
.ithaca {
  height: 100dvh;
  display: flex;
  flex-direction: column;
}

header {
  display: flex;
  align-items: center;
  gap: var(--space-m);
  padding: var(--space-s) var(--space-m);
  border-bottom: 1px solid var(--color-surface-tint);
}

.header-start,
.header-end {
  flex: 1;
  display: flex;
  align-items: center;
  gap: var(--space-m);
}

.header-end {
  justify-content: flex-end;
}

h1 {
  font-size: var(--font-size-l);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: var(--space-m);
}

.user {
  background-color: blue;
  color: white;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
}

.user-initials {
  font-size: var(--font-size-xs);
  font-weight: 900;
}

main {
  flex: 1;
}
</style>