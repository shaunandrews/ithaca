<template>
  <li class="nav-item" :class="{ active: isActive }">
    <router-link :to="to">{{ label }}</router-link>
  </li>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  to: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  activeRoutes: {
    type: Array,
    default: () => []
  }
});

const route = useRoute();

const isActive = computed(() => {
  if (props.activeRoutes.length > 0) {
    return props.activeRoutes.some(activeRoute => {
      if (typeof activeRoute === 'string') {
        return route.name === activeRoute || route.path.startsWith(activeRoute);
      }
      return route.name === activeRoute;
    });
  }
  return route.name === props.label || route.path === props.to;
});
</script>

<style scoped>
.nav-item a {
  cursor: pointer;
  font-size: var(--font-size-s);
  padding: var(--space-xxs) var(--space-xs);
  border-radius: var(--radius);
  color: var(--color-chrome-fg-secondary);
  text-decoration: none;
  display: block;
}

.nav-item.active a {
  font-weight: var(--font-weight-semibold);
  color: var(--color-chrome-fg);
  background-color: var(--color-surface-tint);
}

.nav-item:not(.active) a:hover {
  background-color: var(--color-surface-tint-dark);
}
</style> 