<template>
  <div class="summary">
    <h2>AI Summary</h2>
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

.summary h2 {
  margin-bottom: var(--space-s);
}

.summary p {
  color: var(--color-text-subtle);
  line-height: 1.5;
}
</style> 