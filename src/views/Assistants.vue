<template>
  <div class="assistants-toolbar">
    <div class="toolbar-start">
      <input type="search" placeholder="Search assistants" />
    </div>
    <div class="toolbar-end">
      <button>New assistant</button>
    </div>
  </div>

  <div class="assistant-list">
    <div
      v-for="assistant in assistants"
      :key="assistant.id"
      class="assistant-item"
      @click="goToAssistant(assistant, $event)"
      style="user-select: none;"
    >
      <router-link :to="`/assistant/${assistant.id}`" class="assistant-title">{{ assistant.title }}</router-link>
      <div class="assistant-description">{{ assistant.description }}</div>
      <div class="assistant-owner hstack">
        <img height="24" width="24" :src="`/images/${assistant.ownerIcon}`" class="assistant-owner-icon" />
        <span class="assistant-owner-name">{{ assistant.owner }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { assistants } from '@/data/assistants.js';

const router = useRouter();

function goToAssistant(assistant, event) {
  // Prevent navigation if the router-link was clicked
  if (
    event.target.closest('.assistant-title')
  ) {
    return;
  }
  router.push(`/assistant/${assistant.id}`);
}
</script> 

<style scoped>
.assistants-toolbar {
  display: flex;
  justify-content: space-between;
  gap: var(--space-s);
  padding: var(--space-s) var(--space-m);
}

.assistant-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-s);
  padding: 0 var(--space-m);
}

.assistant-item {
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border-radius: var(--radius);
  padding: var(--space-m);
  border: 1px solid var(--color-surface-tint-dark);
  cursor: pointer;
}

.assistant-item:hover {
  background-color: var(--color-surface-tint);
}

.assistant-title {
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-bold);
  text-decoration: none;
  color: var(--color-surface-fg);
}

.assistant-description {
  color: var(--color-surface-fg-secondary);
  line-height: 1.5em;
  min-height: 3em; /* Always at least 2 lines tall */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.assistant-owner {
  font-size: var(--font-size-s);
  padding-top: var(--space-xs);
  gap: var(--space-xs);
  align-items: center;
  color: var(--color-surface-fg-tertiary);
}

.assistant-owner-icon {
  height: 16px;
  width: 16px;
  border-radius: var(--radius-s);
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