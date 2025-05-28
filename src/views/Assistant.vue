<template>
  <div class="assistant-container">
    <header v-if="assistant">
      <div class="assistant-header-start">
        <h2 class="assistant-title">{{ assistant.title }}</h2>
        <nav>
          <ul>
            <li :class="{ active: activeTab === 'instructions' }" @click="activeTab = 'instructions'">Instructions</li>
            <li :class="{ active: activeTab === 'details' }" @click="activeTab = 'details'">Details</li>
            <li :class="{ active: activeTab === 'activity' }" @click="activeTab = 'activity'">Activity</li>
          </ul>
        </nav>
      </div>
      <div class="assistant-header-end">
        <button class="primary">Save</button>
      </div>
    </header>

    <div v-else class="assistant-not-found">
      <p>Assistant not found.</p>
    </div>

    <div v-if="assistant && activeTab === 'instructions'" class="assistant-instructions hstack">
      <div class="assistant-config vstack">
        <div class="instructions">
          <div class="section-header">
            <h4 class="section-title">Instructions</h4>
            <p class="section-description">Tell your assistant what to do. Add tools by typing @tool.</p>
          </div>
          <div
            class="text-field"
            contenteditable="true"
            @input="onTextFieldInput"
            @keydown="onTextFieldKeydown"
          >
            <template v-for="(paragraph, pIdx) in parsedInstructions" :key="pIdx">
              <p>
                <template v-for="(part, idx) in paragraph" :key="idx">
                  <span v-if="part.type === 'text'">{{ part.value }}</span>
                  <span
                    v-else-if="part.type === 'tool'"
                    class="highlight-tool"
                    contenteditable="false"
                  >
                    @{{ part.title }}<template v-if="part.value">:<span class="tool-value">{{ part.value }}</span></template>
                  </span>
                </template>
              </p>
            </template>
            <teleport to="body">
              <ul
                v-if="autocomplete.show && autocomplete.filtered.length"
                class="autocomplete-menu"
                :style="{ left: autocomplete.x + 'px', top: autocomplete.y + 'px' }"
              >
                <li
                  v-for="tool in autocomplete.filtered"
                  :key="tool.title"
                  :class="{ selected: tool.title === autocomplete.selected }"
                  @mousedown.prevent="selectTool(tool)"
                >
                  <span v-if="tool.icon" class="autocomplete-icon"><img :src="tool.icon" :alt="tool.title" width="16" height="16" /></span>
                  <span class="autocomplete-title">{{ tool.title }}</span>
                  <span class="autocomplete-desc">{{ tool.description }}</span>
                </li>
              </ul>
            </teleport>
          </div>
        </div>

        <hr />

        <div class="tools">
          <div class="section-header">
            <h4 class="section-title">Tools</h4>
            <p class="section-description">Configure the tools available to your assistant.</p>
          </div>
          <div class="tools-list hstack">
            <ToolListItem
              v-for="(tool, idx) in assistant.tools"
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

      <AssistantPreview />
    </div>

    <div v-if="assistant && activeTab === 'details'" class="assistant-details">
      <h4>Description</h4>
      <p>{{ assistant.description }}</p>

      <h4>Status</h4>
      <p>Active</p>

      <h4>Version</h4>
      <p>1.1.3</p>

      <h4>Owner</h4>
      <div class="details-owner hstack">
        <img :src="`/images/${assistant.ownerIcon}`" :alt="assistant.owner" width="24" height="24" class="owner-icon" />
        <span class="owner-name">{{ assistant.owner }}</span>
      </div>
    </div>

    <div v-if="assistant && activeTab === 'activity'" class="assistant-activity vstack">
        <ActivityListItem v-for="(item, idx) in assistant.activity" :key="idx" :item="item" />
    </div>

    <Modal :isOpen="isToolModalOpen" @close="closeToolModal">
      <template v-if="selectedTool">
        <h2>{{ selectedTool.title }}</h2>
        <p>{{ selectedTool.description }}</p>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ToolListItem from '@/components/ToolListItem.vue';
import Modal from '@/components/modal/Modal.vue';
import { assistants } from '@/data/assistants.js';
import { Play, Command, CornerDownLeft, Send, Plus } from 'lucide-vue-next';
import { parseInstructions } from '@/data/parseInstructions.js';
import { tools } from '@/data/tools.js';
import CryptoJS from 'crypto-js';
import ActivityListItem from '@/components/ActivityListItem.vue';
import AssistantPreview from '@/components/AssistantPreview.vue';

const route = useRoute();
const router = useRouter();
const assistantId = computed(() => Number(route.params.id));
const assistant = computed(() => assistants.find(a => a.id === assistantId.value));
const activeTab = ref(route.query.tab || 'instructions');

const parsedInstructions = computed(() =>
  assistant.value ? parseInstructions(assistant.value.instructions) : []
);

const autocomplete = ref({ show: false, x: 0, y: 0, query: '', filtered: tools, caretNode: null });

const trigger = ref(assistant.value ? assistant.value.trigger : 'on-demand');

// Modal state for tool details
const isToolModalOpen = ref(false);
const selectedTool = ref(null);

watch(trigger, (newVal) => {
  if (assistant.value) assistant.value.trigger = newVal;
});

watch(assistant, (newAssistant) => {
  if (newAssistant) trigger.value = newAssistant.trigger;
});

// Sync activeTab to URL query
watch(activeTab, (newTab) => {
  if (route.query.tab !== newTab) {
    router.replace({
      query: { ...route.query, tab: newTab },
    });
  }
});

// Sync URL query to activeTab
watch(() => route.query.tab, (newTab) => {
  if (newTab && newTab !== activeTab.value) {
    activeTab.value = newTab;
  }
});

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

<style>
.text-field:focus {
  outline: none;
  caret-color: var(--color-accent);
}

.text-field p {
  margin-bottom: var(--space-m);
}

.text-field p:last-child {
  margin-bottom: 0;
}

.highlight-tool {
  color: var(--color-highlight);
  font-size: var(--font-size-s);
  font-weight: var(--font-weight-semibold);
  border-radius: 3px;
  cursor: pointer;
  background-color: var(--color-highlight-tint);
  border: 0.5px solid var(--color-highlight);
  white-space: nowrap;
  padding: 2px 3px;
}

.tool-value {
  font-weight: var(--font-weight-normal);
  margin-left: 4px;
}

.highlight-tool:hover {
  color: var(--color-highlight-fg);
  background-color: var(--color-highlight);
}

.autocomplete-menu {
  position: fixed;
  z-index: 1100;
  background: var(--color-surface);
  border: 1px solid var(--color-surface-tint);
  border-radius: var(--radius-s);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 0;
  margin: 0;
  list-style: none;
  min-width: 220px;
  max-width: 320px;
  max-height: 240px;
  overflow-y: auto;
}
.autocomplete-menu li {
  display: flex;
  align-items: flex-start;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-s);
  cursor: pointer;
  font-size: var(--font-size-s);
}
.autocomplete-menu li.selected,
.autocomplete-menu li:hover {
  background: var(--color-surface-tint);
}
.autocomplete-icon {
  flex-shrink: 0;
  margin-right: var(--space-xs);
}
.autocomplete-title {
  font-weight: var(--font-weight-medium);
  margin-right: var(--space-xs);
}
.autocomplete-desc {
  color: var(--color-chrome-fg-secondary);
  font-size: var(--font-size-xs);
  flex: 1;
  white-space: normal;
}
</style>

<style scoped>
.assistant-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-m);
  background-color: var(--color-surface);
  padding: var(--space-s) var(--space-m);
  border-top: 1px solid var(--color-surface-tint);
  border-bottom: 1px solid var(--color-surface-tint);
}

.assistant-header-start,
.assistant-header-end {
  display: flex;
  align-items: center;
  gap: var(--space-m);
}

header h2 {
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-semibold);
}

nav ul {
  display: flex;
  gap: var(--space-xs);
  padding: 0;
  margin: 0;
}

nav li {
  list-style: none;
  cursor: pointer;
  font-size: var(--font-size-s);
  padding: var(--space-xxs) var(--space-xs);
  border-radius: var(--radius);
  color: var(--color-chrome-fg-secondary);
}

nav li.active {
  color: var(--color-chrome-fg);
  font-weight: var(--font-weight-semibold);
  background-color: var(--color-surface-tint);
}

nav li:hover:not(.active) {
  background-color: var(--color-surface-tint-dark);
}

.assistant-instructions {
  flex: 1;
}

hr {
  border: 0;
  height: 1px;
  background-color: var(--color-surface-tint);
  margin: 0 calc(-1 * var(--space-m));
}

.assistant-config {
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

.assistant-details {
  padding: var(--space-m);
}

.assistant-details h4 {
  font-size: var(--font-size-s);
  color: var(--color-surface-fg-tertiary);
}

.assistant-activity {
  margin: var(--space-m);
  border: 1px solid var(--color-surface-tint);
  border-radius: var(--radius-m);
  overflow: hidden;
}
</style>