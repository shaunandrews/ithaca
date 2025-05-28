<template>
  <div class="assistant-container">
    <header v-if="assistant">
      <h2 class="assistant-title">{{ assistant.title }}</h2>
      <span class="separator">/</span>
      <nav>
        <ul>
          <li :class="{ active: activeTab === 'details' }" @click="activeTab = 'details'">Details</li>
          <li :class="{ active: activeTab === 'activity' }" @click="activeTab = 'activity'">Activity</li>
        </ul>
      </nav>
    </header>

    <div v-else>
      <p>Assistant not found.</p>
    </div>

    <div v-if="assistant && activeTab === 'details'" class="assistant-details hstack">
      <div class="assistant-config vstack">
        <div class="instructions">
          <h4>Instructions</h4>
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
                    :title="part.value ? part.value : undefined"
                    @mouseenter="event => showPopover(event, part.title)"
                    @mouseleave="hidePopover"
                  >
                    @{{ part.title }}<template v-if="part.value">: {{ part.value }}</template>
                  </span>
                </template>
              </p>
            </template>
            <div
              v-if="popover.show"
              class="tool-popover"
              :style="{ left: popover.x + 'px', top: popover.y + 'px' }"
            >
              {{ popover.text }}
            </div>
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
          </div>
        </div>

        <div class="tools">
          <h4>Tools</h4>
          <div class="tools-list hstack">
            <ToolListItem
              v-for="(tool, idx) in assistant.tools"
              :key="idx"
              :icon="tool.icon"
              :title="tool.title"
              :subtitle="tool.subtitle"
            />
          </div>
        </div>

        <div class="trigger">
          <h4>Trigger</h4>
          <select :value="assistant.trigger">
            <option value="on-demand">On-demand</option>
            <option value="scheduled">Scheduled</option>
            <option value="email-message">Email</option>
            <option value="chat-message">Chat</option>
            <option value="slack-message">Slack</option>
          </select>
        </div>
      </div>

      <div class="assistant-preview">
        <h4>Preview</h4>
        <div class="preview-start">
          <button><PlayIcon />Start preview</button>
          <p>Preview your assistant's behavior and chat with it to test it out.</p>
        </div>
      </div>
    </div>

    <div v-if="assistant && activeTab === 'activity'" class="assistant-activity">
      <ol>
        <li v-for="(item, idx) in assistant.activity" :key="idx">
          <span class="activity-datetime">{{ formatDate(item.datetime) }}</span>
          &bull;
          <span class="activity-event">{{ item.event }}</span>
          &mdash;
          <span class="activity-summary">{{ item.summary }}</span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import ToolListItem from '@/components/ToolListItem.vue';
import { assistants } from '@/data/assistants.js';
import { PlayIcon } from 'lucide-vue-next';
import { parseInstructions } from '@/data/parseInstructions.js';
import { tools } from '@/data/tools.js';

const route = useRoute();
const assistantId = computed(() => Number(route.params.id));
const assistant = computed(() => assistants.find(a => a.id === assistantId.value));
const activeTab = ref('details');

const parsedInstructions = computed(() =>
  assistant.value ? parseInstructions(assistant.value.instructions) : []
);

const getToolDescription = (title) => {
  const tool = tools.find(t => t.title === title);
  return tool ? tool.description : '';
};

const popover = ref({ show: false, text: '', x: 0, y: 0 });

const autocomplete = ref({ show: false, x: 0, y: 0, query: '', filtered: tools, caretNode: null });

function showPopover(event, title) {
  popover.value = {
    show: true,
    text: getToolDescription(title),
    x: event.clientX + 10,
    y: event.clientY + 10,
  };
}
function hidePopover() {
  popover.value.show = false;
}

function formatDate(datetime) {
  const date = new Date(datetime);
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

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
  span.addEventListener('mouseenter', event => showPopover(event, tool.title));
  span.addEventListener('mouseleave', hidePopover);
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
</script>

<style>
.text-field:focus {
  outline: none;
}

.text-field p {
  margin-bottom: var(--space-s);
}

.text-field p:last-child {
  margin-bottom: 0;
}

.highlight-tool {
  color: var(--color-accent);
  
  /* background-color: var(--color-accent); */
  /* color: var(--color-accent-fg); */
  font-size: var(--font-size-s);
  font-weight: var(--font-weight-medium);
  border-radius: 3px;
  cursor: pointer;
  border: 0.5px solid transparent;
  border-color: var(--color-accent);
  white-space: nowrap;
  /* padding: var(--space-xxs); */
  padding: 2px 3px;
}

.highlight-tool:hover {
  color: var(--color-accent-fg);
  background-color: var(--color-accent);
  /* color: rgb(255, 50, 180); */
  /* background-color: rgba(255, 50, 180, 0.1); */
  /* border-color: rgba(255, 50, 180, 0.2); */
}

.tool-popover {
  position: fixed;
  z-index: 1000;
  background: var(--color-surface);
  color: var(--color-chrome-fg);
  border: 1px solid var(--color-surface-tint);
  border-radius: var(--radius-s);
  padding: var(--space-xs) var(--space-s);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  pointer-events: none;
  font-size: var(--font-size-s);
  max-width: 260px;
  white-space: normal;
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
  gap: var(--space-m);
  padding: var(--space-s) var(--space-m);
  border-bottom: 1px solid var(--color-surface-tint);
}

header h2 {
  font-size: var(--font-size-m);
}

nav ul {
  display: flex;
  gap: var(--space-s);
  padding: 0;
  margin: 0;
}

nav li {
  list-style: none;
  cursor: pointer;
  padding: var(--space-xxs) var(--space-xs);
  border-radius: var(--radius);
  color: var(--color-chrome-fg-secondary);
}

nav li.active {
  font-weight: var(--font-weight-bold);
  color: var(--color-chrome-fg);
}

nav li:hover {
  background-color: var(--color-surface-tint);
}

.assistant-details {
  flex: 1;
}

.assistant-config {
  gap: var(--space-m);
  width: 60%;
  padding: var(--space-m);
}

h4 {
  font-size: var(--font-size-s);
  margin-bottom: var(--space-xs);
}

.tools-list {
  gap: var(--space-xs);
  flex-wrap: wrap;
}

.assistant-preview {
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

.assistant-activity ol {
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-s);
}

.assistant-activity li {
  list-style: none;
}

</style>