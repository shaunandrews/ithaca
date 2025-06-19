<template>
  <aside class="sidebar">
    <div class="sidebar-top">
      <h1 class="logo">
        <Landmark :size="24" />
        <span class="logo-text">Ithaca</span>
      </h1>
      <nav>
        <ul>
          <NavItem 
            to="/" 
            label="Agents" 
            :active-routes="['Agents', 'Agent', '/agent']"
          />
          <NavItem 
            to="/experts" 
            label="Experts" 
            :active-routes="['Experts']"
          />
          <NavItem 
            to="/tools" 
            label="Tools" 
            :active-routes="['Tools']"
          />
        </ul>
      </nav>
    </div>
    <div class="sidebar-bottom">
      <div class="user">
        <img src="/images/avatar-shaunandrews.png" alt="Shaun Andrews" height="24" width="24" />
      </div>
    </div>
  </aside>
</template>

<script setup>
import { Landmark } from 'lucide-vue-next';
import NavItem from './NavItem.vue';
</script>

<style scoped>
.sidebar {
  min-width: 220px;
  border-right: 1px solid var(--color-surface-tint);
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

.user {
  background-color: var(--color-surface-tint);
  color: var(--color-chrome-fg);
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

.user img {
  height: 24px;
  width: 24px;
  border-radius: 50%;
}
</style> 