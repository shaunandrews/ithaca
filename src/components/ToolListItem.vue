<template>
  <div class="tool-item">
    <div class="tool-icon" v-if="icon">
      <img :src="icon" :alt="title" height="20" width="20" />
    </div>
    <div class="tool-title">{{ title }}</div>
    <div v-if="subtitle" class="tool-subtitle">{{ subtitle }}</div>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: null
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: null
  }
});
</script>

<style scoped>
.tool-item {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: var(--font-size-s);
  color: var(--color-surface-fg);
  padding: var(--space-xxs) var(--space-xs);
  background-color: var(--color-surface-tint);
  border-radius: var(--radius);
}

.tool-icon {
  width: 20px;
  height: 20px;
}

.tool-title {
  font-weight: var(--font-weight-medium);
}

.tool-subtitle {
  color: var(--color-surface-fg-secondary);
}
</style> 