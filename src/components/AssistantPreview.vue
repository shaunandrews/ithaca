<template>
  <div class="assistant-preview">
    <div class="section-header">
      <h4 class="section-title">Preview</h4>
      <p class="section-description">See how this assistant behaves and chat with it.</p>
    </div>
    <div class="preview-start">
      <button><Play :size="18" />Start preview <span class="shortcut"><Command :size="12" /> <CornerDownLeft :size="12" /></span></button>
    </div>
    <div class="preview-chat hstack">
      <input type="text" placeholder="Ask me anything..." />
      <button><Send :size="18" /></button>
    </div>
  </div>
</template>

<script setup>
import { Play, Command, CornerDownLeft, Send } from 'lucide-vue-next';
</script>

<style scoped>
.assistant-preview {
  width: 40%;
  border-left: 1px solid var(--color-surface-tint);
  padding: var(--space-m);
  display: flex;
  flex-direction: column;
  gap: var(--space-s);
}

.preview-start {
  flex: 1;
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-s);
  align-items: center;
  justify-content: center;
  text-align: center;
}

.section-header {
  margin-bottom: var(--space-xs);
  user-select: none;
}

.section-title {
  font-size: var(--font-size-s);
  color: var(--color-surface-fg-tertiary);
}

.section-description {
  font-size: var(--font-size-s);
  color: var(--color-surface-fg-tertiary);
}

.preview-chat.hstack {
  display: flex;
  flex-direction: row;
  gap: var(--space-xs);
}
</style> 