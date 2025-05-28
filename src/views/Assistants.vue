<template>
  <div class="assistants-toolbar">
    <input type="search" placeholder="Search assistants" />
    <button>New assistant</button>
  </div>

  <div class="assistant-list">
    <div v-for="assistant in assistants" :key="assistant.id" class="assistant-item">
      <router-link :to="`/assistant/${assistant.id}`" class="assistant-title">{{ assistant.title }}</router-link>
      <div class="assistant-description">{{ assistant.description }}</div>
      <div class="assistant-owner">{{ assistant.owner }}</div>
      <!-- <div class="assistant-tools">
        <ToolListItem
          v-for="(tool, idx) in assistant.tools"
          :key="idx"
          :icon="tool.icon"
          :title="tool.title"
          :subtitle="tool.subtitle"
        />
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import ToolListItem from '@/components/ToolListItem.vue';
import { assistants } from '@/data/assistants.js';
</script> 

<style scoped>
.assistants-toolbar {
  display: flex;
  justify-content: space-between;
  gap: var(--space-s);
}

.assistant-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-s);
}

.assistant-item {
  background: var(--color-surface);
  border-radius: var(--radius);
  padding: var(--space-m);
  border: 1px solid var(--color-surface-tint);
}

.assistant-title {
  font-weight: var(--font-weight-medium);
}

.assistant-description {
  color: var(--color-surface-fg-secondary);
  line-height: var(--line-height-tight);
}

.assistant-tools {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.tool-item {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: var(--font-size-s);
  color: var(--color-surface-fg-secondary);
  padding: var(--space-xxs) var(--space-xs);
  background-color: var(--color-surface-tint);
  border-radius: var(--radius);
}

.tool-icon {
  width: 20px;
  height: 20px;
}
</style>