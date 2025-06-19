<template>
  <div class="tools-toolbar">
    <div class="toolbar-start">
      <input type="search" placeholder="Search tools" v-model="query" />
    </div>
  </div>

  <div class="tools-list">
    <ToolListItem
      v-for="tool in filteredTools"
      :key="tool.title"
      :icon="tool.icon"
      :title="tool.title"
      :subtitle="tool.description"
      class="tool-list-item"
      @click="openToolModal(tool)"
    />
  </div>

  <Modal :isOpen="isToolModalOpen" @close="closeToolModal">
    <template v-if="selectedTool">
      <h2>{{ selectedTool.title }}</h2>
      <p>{{ selectedTool.description }}</p>
      <hr />
      <h3>Integration Details</h3>
      <p class="placeholder">Details about integrating {{ selectedTool.title }}.</p>
      <h3>Usage Stats</h3>
      <p class="placeholder">Usage statistics placeholder.</p>
      <h3>Linked Agents and Experts</h3>
      <p class="placeholder">Linked items placeholder.</p>
    </template>
  </Modal>
</template>

<script setup>
import { ref, computed } from 'vue';
import { tools } from '@/data/tools.js';
import ToolListItem from '@/components/ToolListItem.vue';
import Modal from '@/components/Modal.vue';

const query = ref('');
const selectedTool = ref(null);
const isToolModalOpen = ref(false);

function openToolModal(tool) {
  selectedTool.value = tool;
  isToolModalOpen.value = true;
}
function closeToolModal() {
  isToolModalOpen.value = false;
  selectedTool.value = null;
}

const filteredTools = computed(() => {
  if (!query.value) return tools;
  return tools.filter(t =>
    t.title.toLowerCase().includes(query.value.toLowerCase())
  );
});
</script>

<style scoped>
.tools-toolbar {
  display: flex;
  justify-content: space-between;
  gap: var(--space-s);
  padding: var(--space-s) var(--space-m);
}

.tools-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--space-s);
  padding: 0 var(--space-m);
}

.tool-list-item {
  cursor: pointer;
}

.placeholder {
  color: var(--color-surface-fg-secondary);
}
</style>
