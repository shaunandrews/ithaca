<template>
  <div class="ithaca">
    <header>
      <div class="header-start">
        <h1 class="logo">
          <Landmark :size="24" />
          <span v-if="!isAssistantRoute" class="logo-text">Ithaca</span>
        </h1>
        <nav>
          <ul>
            <li v-if="isAssistantRoute" class="nav-item">
              <router-link to="/">Go home</router-link>
            </li>
            <template v-else>
              <li class="nav-item" :class="{ active: $route.name === 'Assistants' }">
                <router-link to="/">Assistants</router-link>
              </li>
              <li class="nav-item" :class="{ active: $route.name === 'Experts' }">
                <router-link to="/experts">Experts</router-link>
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
          <!-- <p class="user-initials">SA</p> -->
          <img src="/images/avatar-shaunandrews.png" alt="Shaun Andrews" height="24" width="24" />
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
import { Landmark } from 'lucide-vue-next';
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
}

.header-start,
.header-end {
  flex: 1;
  display: flex;
  align-items: center;
  gap: var(--space-s);
}

.header-end {
  justify-content: flex-end;
}

.logo {
  font-size: var(--font-size-l);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.logo-text {
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-bold);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: var(--space-xs);
}

.nav-item a {
  cursor: pointer;
  font-size: var(--font-size-s);
  padding: var(--space-xxs) var(--space-xs);
  border-radius: var(--radius);
  color: var(--color-chrome-fg-secondary);
  text-decoration: none;
}

.nav-item.active a {
  font-weight: var(--font-weight-semibold);
  color: var(--color-chrome-fg);
  background-color: var(--color-surface-tint);
}

.nav-item:not(.active) a:hover {
  background-color: var(--color-surface-tint-dark);
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
  transition: transform 0.1s ease-in-out;
}

.user:hover {
  transform: scale(1.1);
}

.user-initials {
  font-size: var(--font-size-xs);
  font-weight: 900;
}

.user img {
  height: 24px;
  width: 24px;
  border-radius: 50%;
}

main {
  flex: 1;
}
</style>