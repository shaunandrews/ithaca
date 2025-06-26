<template>
  <div class="summary">
    <p>{{ summary }}</p>
  </div>
</template>

<script setup>
defineProps({
  summary: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.summary {
  margin-bottom: var(--space-m);
}

.summary p {
  color: var(--color-chrome-fg-secondary);
  line-height: var(--line-height-tight);
}
</style> 