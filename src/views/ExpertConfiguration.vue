<template>
  <div class="expert-configuration">
    <div class="config-section">
      <h3>General Information</h3>
      <div class="form-group">
        <label>Expert Name</label>
        <input type="text" v-model="expertData.title" />
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea v-model="expertData.description" rows="3"></textarea>
      </div>
    </div>

    <div class="config-section">
      <h3>Tools Configuration</h3>
      <div class="tools-list">
        <div class="tool-item" v-for="(tool, index) in expertData.tools" :key="index">
          <ToolListItem
            :icon="tool.icon"
            :title="tool.title"
            :subtitle="tool.subtitle"
          />
          <button class="remove-tool" @click="removeTool(index)">Remove</button>
        </div>
      </div>
      <button class="add-tool-btn" @click="showAddToolModal = true">
        + Add Tool
      </button>
    </div>

    <div class="config-section">
      <h3>Advanced Settings</h3>
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="expertData.autoApprove" />
          Auto-approve responses
        </label>
      </div>
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="expertData.cachingEnabled" />
          Enable response caching
        </label>
      </div>
      <div class="form-group">
        <label>Response timeout (seconds)</label>
        <input type="number" v-model="expertData.timeout" min="1" max="300" />
      </div>
    </div>

    <!-- Add Tool Modal -->
    <Modal v-if="showAddToolModal" @close="showAddToolModal = false">
      <template #header>
        <h3>Add Tool to Expert</h3>
      </template>
      <template #body>
        <div class="available-tools">
          <div 
            class="tool-option" 
            v-for="tool in availableTools" 
            :key="tool.id"
            @click="addTool(tool)"
          >
            <ToolListItem
              :icon="tool.icon"
              :title="tool.title"
              :subtitle="tool.subtitle || tool.description"
            />
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { experts } from '@/data/experts.js';
import { tools } from '@/data/tools.js';
import ToolListItem from '@/components/ToolListItem.vue';
import Modal from '@/components/Modal.vue';

const route = useRoute();
const expertId = computed(() => Number(route.params.id));
const expert = computed(() => experts.find(e => e.id === expertId.value));

const showAddToolModal = ref(false);

// Create a reactive copy of the expert data for editing
const expertData = ref({
  title: expert.value?.title || '',
  description: expert.value?.description || '',
  tools: [...(expert.value?.tools || [])],
  autoApprove: false,
  cachingEnabled: true,
  timeout: 30
});

// Get tools that aren't already added to this expert
const availableTools = computed(() => {
  const currentToolIds = expertData.value.tools.map(t => t.title);
  return tools.filter(t => !currentToolIds.includes(t.title));
});

function removeTool(index) {
  expertData.value.tools.splice(index, 1);
}

function addTool(tool) {
  expertData.value.tools.push({
    ...tool,
    subtitle: tool.subtitle || tool.description
  });
  showAddToolModal.value = false;
}
</script>

<style scoped>
.expert-configuration {
  padding: var(--space-m);
  height: 100%;
  overflow-y: auto;
}

.config-section {
  margin-bottom: var(--space-xl);
}

.config-section h3 {
  font-size: var(--font-size-l);
  font-weight: var(--font-weight-semibold);
  margin: 0 0 var(--space-m) 0;
}

.form-group {
  margin-bottom: var(--space-m);
}

.form-group label {
  display: block;
  margin-bottom: var(--space-xs);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-s);
}

input[type="text"],
input[type="number"],
textarea,
select {
  width: 100%;
  padding: var(--space-xs);
  border: 1px solid var(--color-surface-tint);
  border-radius: var(--radius);
  background: var(--color-surface);
  color: var(--color-surface-fg);
  font-size: var(--font-size-s);
}

textarea {
  resize: vertical;
  min-height: 60px;
  font-family: inherit;
}

input[type="checkbox"] {
  margin-right: var(--space-xs);
}

.tools-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  margin-bottom: var(--space-s);
}

.tool-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-xs);
  background: var(--color-surface);
  border: 1px solid var(--color-surface-tint);
  border-radius: var(--radius);
}

.remove-tool {
  padding: var(--space-xxs) var(--space-xs);
  background: transparent;
  border: 1px solid var(--color-surface-tint);
  border-radius: var(--radius);
  color: var(--color-surface-fg-secondary);
  font-size: var(--font-size-xs);
  cursor: pointer;
}

.remove-tool:hover {
  background: var(--color-surface-tint);
  color: var(--color-surface-fg);
}

.add-tool-btn {
  width: 100%;
  padding: var(--space-xs);
  background: transparent;
  border: 1px dashed var(--color-surface-tint);
  border-radius: var(--radius);
  color: var(--color-surface-fg-secondary);
  cursor: pointer;
  font-size: var(--font-size-s);
}

.add-tool-btn:hover {
  background: var(--color-surface-tint);
  border-style: solid;
}

.available-tools {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  max-height: 400px;
  overflow-y: auto;
}

.tool-option {
  padding: var(--space-xs);
  background: var(--color-surface);
  border: 1px solid var(--color-surface-tint);
  border-radius: var(--radius);
  cursor: pointer;
}

.tool-option:hover {
  background: var(--color-surface-tint);
}
</style> 