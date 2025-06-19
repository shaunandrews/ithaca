<template>
  <div class="experts-toolbar">
    <div class="toolbar-start">
      <input type="search" placeholder="Search experts" />
    </div>
    <div class="toolbar-end">
      <button>New expert</button>
    </div>
  </div>

  <div class="expert-list">
    <div
      v-for="expert in experts"
      :key="expert.id"
      class="expert-item"
    >
      <div class="expert-header">
        <div class="expert-title">{{ expert.title }}</div>
        <div class="expert-usage">{{ expert.usage }}</div>
      </div>
      <div class="expert-description">{{ expert.description }}</div>
      <div class="expert-tools">
        <ToolListItem
          v-for="(tool, idx) in expert.tools"
          :key="idx"
          :icon="tool.icon"
          :title="tool.title"
          :subtitle="tool.subtitle"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ToolListItem from '@/components/ToolListItem.vue';
import { experts } from '@/data/experts.js';
</script>

<style scoped>
.experts-toolbar {
  display: flex;
  justify-content: space-between;
  gap: var(--space-s);
  padding: var(--space-s) var(--space-m);
}

.expert-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-s);
  padding: 0 var(--space-m);
}

.expert-item {
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border-radius: var(--radius);
  padding: var(--space-m);
  border: 1px solid var(--color-surface-tint-dark);
}

.expert-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-xs);
}

.expert-title {
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-bold);
}

.expert-usage {
  font-size: var(--font-size-s);
  color: var(--color-surface-fg-secondary);
}

.expert-description {
  color: var(--color-surface-fg-secondary);
  line-height: 1.5em;
  min-height: 3em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.expert-tools {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  padding-top: var(--space-s);
}
</style>
