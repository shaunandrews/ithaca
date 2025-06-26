<template>
  <div class="badge" :class="badgeClass">
    <slot />
  </div>
</template>

<script setup>
  import { computed } from 'vue';

  const props = defineProps({
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'agent', 'customer'].includes(value)
    }
  });

  const badgeClass = computed(() => {
    return `badge--${props.variant}`;
  });
</script>

<style scoped>
  .badge {
    display: inline-flex;
    align-items: center;
    padding: var(--space-xxs) var(--space-xs);
    border-radius: 4px;
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    text-transform: uppercase;
    letter-spacing: 0.025em;
  }

  .badge--default {
    background-color: var(--color-surface-subtle);
    color: var(--color-text-subtle);
  }

  .badge--agent {
    background-color: rgba(59, 130, 246, 0.1);
    color: rgb(59, 130, 246);
  }

  .badge--customer {
    background-color: rgba(16, 185, 129, 0.1);
    color: rgb(16, 185, 129);
  }
</style> 