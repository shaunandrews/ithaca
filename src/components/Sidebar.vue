<template>
<aside class="sidebar" :class="{ 'sidebar--mini': mini }">
    <div class="sidebar-top">
      <h1 class="logo">
        <img src="/images/logo.png" alt="Ithaca" height="56" width="56" />
      </h1>
      <nav>
        <NavItem 
          to="/" 
          label="Agents" 
          :active-routes="['Agents', 'Agent', '/agent']"
          icon="Bot"
          :mini="mini"
        />
        <NavItem 
          to="/experts" 
          label="Experts" 
          :active-routes="['Experts']"
          icon="FlaskRound"
          :mini="mini"
        />
        <NavItem 
          to="/tools" 
          label="Tools" 
          :active-routes="['Tools']"
          icon="Hammer"
          :mini="mini"
        />
      </nav>
    </div>
    <div class="sidebar-bottom">
      <div class="user">
        <img src="/images/avatar-shaunandrews.png" alt="Shaun Andrews" height="24" width="24" />
      </div>
      <button 
        v-if="!isMobile || mini"
        class="sidebar-toggle" 
        @click="emit('toggle')"
        :aria-label="mini ? 'Expand sidebar' : 'Collapse sidebar'"
      >
        <PanelLeft v-if="!mini" />
        <PanelLeftOpen v-else />
      </button>
    </div>
  </aside>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { PanelLeft, PanelLeftOpen } from 'lucide-vue-next';
import NavItem from './NavItem.vue';

const props = defineProps({
  mini: Boolean,
  isMobile: Boolean,
});

const emit = defineEmits(['toggle']);
</script>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  min-width: var(--sidebar-width);
  border-right: 0.5px solid var(--color-surface-tint);
  padding: var(--space-s);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--space-m);
  transition: all 0.2s ease-in-out;
}

.sidebar--mini {
  /* padding: var(--space-s); */
}

.sidebar-top {
  display: flex;
  flex-direction: column;
  gap: var(--space-m);
}

.sidebar-bottom {
  display: flex;
  flex-direction: column;
  gap: var(--space-m);
  /* align-items: center; */
  /* justify-content: space-between; */
}

.logo {
  font-size: var(--font-size-l);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  height: 56px;
  width: 56px;
  transition: all 0.2s ease-in-out;
}

.logo img {
  height: 100%;
  width: 100%;
}

.sidebar--mini .logo {
  gap: 0;
  height: 24px;
  width: 24px;
}

nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-xxs);
}

.sidebar-toggle:hover {
  background-color: var(--color-surface-tint);
}

.user {
  background-color: var(--color-surface-tint);
  color: var(--color-chrome-fg);
  height: 24px;
  width: 24px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.1s ease-in-out;
}

.user img {
  height: 100%;
  width: 100%;
}
</style> 