<template>
  <div class="ithaca">
    <aside class="sidebar">
      <div class="sidebar-top">
        <h1 class="logo">
          <Landmark :size="24" />
          <span class="logo-text">Ithaca</span>
        </h1>
        <nav>
          <ul>
              <li class="nav-item" :class="{ active: $route.name === 'Agents' || $route.name === 'Agent' || $route.path.startsWith('/agent') }">
                <router-link to="/">Agents</router-link>
              </li>
              <li class="nav-item" :class="{ active: $route.name === 'Experts' }">
                <router-link to="/experts">Experts</router-link>
              </li>
              <li class="nav-item" :class="{ active: $route.name === 'Tools' }">
                <router-link to="/tools">Tools</router-link>
              </li>
          </ul>
        </nav>
      </div>
      <div class="sidebar-bottom">
        <div class="user">
          <img src="/images/avatar-shaunandrews.png" alt="Shaun Andrews" height="24" width="24" />
        </div>
      </div>
    </aside>

    <main>
      <router-view/>
    </main>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { Landmark } from 'lucide-vue-next';
const route = useRoute();
</script>

<style scoped>
.ithaca {
  height: 100dvh;
  display: flex;
}

.sidebar {
  width: 220px;
  padding: var(--space-m);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--space-m);
}

.sidebar-top {
  display: flex;
  flex-direction: column;
  gap: var(--space-m);
}

.sidebar-bottom {
  display: flex;
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

.sidebar nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
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