<template>
  <li class="source-rating">
    <div class="item-details">
      <span class="item-name">{{ source.name }}</span>
      <span class="item-description">{{ source.description }}</span>
    </div>
    <div class="item-actions">
      <button><ThumbsUp :size="16" /></button>
      <button><ThumbsDown :size="16" /></button>
    </div>
  </li>
</template>

<script setup>
import { ThumbsUp, ThumbsDown } from 'lucide-vue-next';

defineProps({
  source: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.source-rating {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-details {
  display: flex;
  flex-direction: column;
}

.item-name {
  font-weight: 500;
}

.item-description {
  color: var(--color-text-subtle);
}

.item-actions {
  display: flex;
  gap: var(--space-xs);
}

.item-actions button {
  background: transparent;
  border: 1px solid var(--color-surface-tint);
  color: var(--color-text);
  padding: var(--space-xs);
  border-radius: var(--radius);
  cursor: pointer;
  display: flex;
  align-items: center;
}

.item-actions button:hover {
  background: var(--color-surface-tint);
}
</style> 