<template>
  <div class="agent-workbench hstack">
    <div class="agent-config vstack">
      <div class="instructions">
        <div class="section-header">
          <h4 class="section-title">Instructions</h4>
          <p class="section-description">Tell your agent what to do. Add tools by typing @tool.</p>
        </div>
        <InstructionsField
          :parsedInstructions="parsedInstructions"
          :autocomplete="autocomplete"
          :tools="tools"
          @input="onTextFieldInput"
          @keydown="onTextFieldKeydown"
          @select-tool="selectTool"
        />
      </div>

      <hr />

      <div class="tools">
        <div class="section-header">
          <h4 class="section-title">Tools</h4>
          <p class="section-description">Configure the tools available to your agent.</p>
        </div>
        <div class="tools-list hstack">
          <ToolListItem
            v-for="(tool, idx) in agent.tools"
            :key="idx"
            :icon="tool.icon"
            :title="tool.title"
            :subtitle="tool.subtitle"
            @click="openToolModal(tool)"
          />
          <button class="add-tool"><Plus :size="18" /></button>
        </div>
      </div>
    </div>

    <AgentPreview :agent="agent" />
  </div>

  <Modal :isOpen="isToolModalOpen" @close="closeToolModal">
    <template v-if="selectedTool">
      <h2>{{ selectedTool.title }}</h2>
      <p>{{ selectedTool.description }}</p>
    </template>
  </Modal>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import ToolListItem from '@/components/ToolListItem.vue';
import Modal from '@/components/Modal.vue';
import { agents } from '@/data/agents.js';
import { Plus } from 'lucide-vue-next';
import { parseInstructions } from '@/data/parseInstructions.js';
import { tools } from '@/data/tools.js';
import AgentPreview from '@/components/AgentPreview.vue';
import InstructionsField from '@/components/InstructionsField.vue';

const route = useRoute();
const agentId = computed(() => Number(route.params.id));
const agent = computed(() => agents.find(a => a.id === agentId.value));

const parsedInstructions = computed(() =>
  agent.value ? parseInstructions(agent.value.instructions) : []
);

const autocomplete = ref({ show: false, x: 0, y: 0, query: '', filtered: tools, caretNode: null });

// Modal state for tool details
const isToolModalOpen = ref(false);
const selectedTool = ref(null);

function onTextFieldInput(e) {
  const sel = window.getSelection();
  if (!sel.rangeCount) return;
  const range = sel.getRangeAt(0);
  const node = range.startContainer;
  const text = node.textContent;
  const caretPos = range.startOffset;
  const before = text.slice(0, caretPos);
  const atIdx = before.lastIndexOf('@');
  if (atIdx !== -1 && (atIdx === 0 || /\s/.test(before[atIdx - 1]))) {
    const query = before.slice(atIdx + 1);
    const filtered = tools.filter(t => t.title.toLowerCase().startsWith(query.toLowerCase()));
    const rect = range.getBoundingClientRect();
    autocomplete.value = {
      show: true,
      x: rect.left + window.scrollX,
      y: rect.bottom + window.scrollY,
      query,
      filtered,
      caretNode: node,
      atIdx,
      caretPos
    };
  } else {
    autocomplete.value.show = false;
  }
}

function selectTool(tool) {
  if (!autocomplete.value.caretNode) return;
  const node = autocomplete.value.caretNode;
  const text = node.textContent;
  const atIdx = autocomplete.value.atIdx;
  const caretPos = autocomplete.value.caretPos;
  // Replace @query with a highlight-tool span
  const after = text.slice(caretPos);
  const before = text.slice(0, atIdx);
  const parent = node.parentNode;
  // Remove the text node and insert before, span, after
  const beforeNode = document.createTextNode(before);
  const span = document.createElement('span');
  span.className = 'highlight-tool';
  span.setAttribute('contenteditable', 'false');
  span.textContent = `@${tool.title}`;
  const afterNode = document.createTextNode(after);
  parent.replaceChild(afterNode, node);
  parent.insertBefore(span, afterNode);
  parent.insertBefore(beforeNode, span);
  // Move caret after the inserted span
  const range = document.createRange();
  range.setStartAfter(span);
  range.collapse(true);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
  autocomplete.value.show = false;
}

function onTextFieldKeydown(e) {
  if (autocomplete.value.show) {
    if (e.key === 'ArrowDown' || e.key === 'Tab') {
      e.preventDefault();
      const idx = autocomplete.value.filtered.findIndex(t => t.title === autocomplete.value.selected);
      const nextIdx = (idx + 1) % autocomplete.value.filtered.length;
      autocomplete.value.selected = autocomplete.value.filtered[nextIdx].title;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const idx = autocomplete.value.filtered.findIndex(t => t.title === autocomplete.value.selected);
      const prevIdx = (idx - 1 + autocomplete.value.filtered.length) % autocomplete.value.filtered.length;
      autocomplete.value.selected = autocomplete.value.filtered[prevIdx].title;
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const tool = autocomplete.value.filtered.find(t => t.title === autocomplete.value.selected) || autocomplete.value.filtered[0];
      if (tool) selectTool(tool);
    } else if (e.key === 'Escape') {
      autocomplete.value.show = false;
    }
  }
}

function openToolModal(tool) {
  selectedTool.value = tool;
  isToolModalOpen.value = true;
}

function closeToolModal() {
  isToolModalOpen.value = false;
  selectedTool.value = null;
}
</script>

<style scoped>
.agent-workbench {
  flex: 1;
}

hr {
  border: 0;
  height: 1px;
  background-color: var(--color-surface-tint);
  margin: 0 calc(-1 * var(--space-m));
}

.agent-config {
  gap: var(--space-m);
  width: 60%;
  padding: var(--space-m);
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

.instructions {
  flex: 1;
}

.tools-list {
  gap: var(--space-xs);
  flex-wrap: wrap;
}
</style> 