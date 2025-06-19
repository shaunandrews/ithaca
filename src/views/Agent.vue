<template>
  <div class="agent-container">
    <header v-if="agent">
      <div class="agent-header-start">
        <h2 class="agent-title">{{ agent.title }}</h2>
        <nav>
          <ul>
            <li :class="{ active: activeTab === 'workbench' }" @click="activeTab = 'workbench'">Workbench</li>
            <li :class="{ active: activeTab === 'versions' }" @click="activeTab = 'versions'">Versions</li>
            <li :class="{ active: activeTab === 'insights' }" @click="activeTab = 'insights'">Insights</li>
            <li :class="{ active: activeTab === 'activity' }" @click="activeTab = 'activity'">Activity</li>
          </ul>
        </nav>
      </div>
      <div class="agent-header-end">
        <button class="primary">Save</button>
      </div>
    </header>

    <div v-else class="agent-not-found">
      <p>Agent not found.</p>
    </div>

    <div v-if="agent && activeTab === 'workbench'" class="agent-workbench hstack">
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

    <div v-if="agent && activeTab === 'versions'" class="agent-versions">
      <h4>Description</h4>
      <p>{{ agent.description }}</p>

      <h4>Status</h4>
      <p>Active</p>

      <h4>Version</h4>
      <p>1.1.3</p>

      <h4>Owner</h4>
      <div class="details-owner hstack">
        <img :src="`/images/${agent.ownerIcon}`" :alt="agent.owner" width="24" height="24" class="owner-icon" />
        <span class="owner-name">{{ agent.owner }}</span>
      </div>
    </div>

    <div v-if="agent && activeTab === 'insights'" class="agent-insights">
      <p>Insights coming soon.</p>
    </div>

    <div v-if="agent && activeTab === 'activity'" class="agent-activity vstack">
        <ActivityListItem
          v-for="(item, idx) in agent.activity"
          :key="idx"
          :item="item"
          :to="`/agent/${agent.id}/activity/${item.id}`"
        />
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
import Modal from '@/components/Modal.vue';
import { agents } from '@/data/agents.js';
import { Plus } from 'lucide-vue-next';
import { parseInstructions } from '@/data/parseInstructions.js';
import { tools } from '@/data/tools.js';
import ActivityListItem from '@/components/ActivityListItem.vue';
import AgentPreview from '@/components/AgentPreview.vue';
import InstructionsField from '@/components/InstructionsField.vue';

const route = useRoute();
const router = useRouter();
const agentId = computed(() => Number(route.params.id));
const agent = computed(() => agents.find(a => a.id === agentId.value));
const activeTab = ref(route.query.tab || 'workbench');

const parsedInstructions = computed(() =>
  agent.value ? parseInstructions(agent.value.instructions) : []
);

const autocomplete = ref({ show: false, x: 0, y: 0, query: '', filtered: tools, caretNode: null });

const trigger = ref(agent.value ? agent.value.trigger : 'on-demand');

// Modal state for tool details
const isToolModalOpen = ref(false);
const selectedTool = ref(null);

watch(trigger, (newVal) => {
  if (agent.value) agent.value.trigger = newVal;
});

watch(agent, (newAgent) => {
  if (newAgent) trigger.value = newAgent.trigger;
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

<style scoped>
.agent-container {
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

.agent-header-start,
.agent-header-end {
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

.agent-versions {
  padding: var(--space-m);
}

.agent-versions h4 {
  font-size: var(--font-size-s);
  color: var(--color-surface-fg-tertiary);
}

.agent-activity {
  margin: var(--space-m);
  border: 1px solid var(--color-surface-tint);
  border-radius: var(--radius-m);
  overflow: hidden;
}

.agent-insights {
  padding: var(--space-m);
}
</style>
