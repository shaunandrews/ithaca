<template>
  <div
    class="text-field"
    contenteditable="true"
    @input="onTextFieldInput"
    @keydown="onTextFieldKeydown"
    ref="fieldRef"
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
</template>

<script setup>
import { ref, watch, computed, toRefs } from 'vue';

const props = defineProps({
  modelValue: String,
  parsedInstructions: Array,
  autocomplete: Object,
  tools: Array
});
const emit = defineEmits(['update:modelValue', 'input', 'keydown', 'select-tool', 'autocomplete-change']);

const fieldRef = ref(null);

function onTextFieldInput(e) {
  emit('input', e);
  emit('update:modelValue', e.target.innerText);
}

function onTextFieldKeydown(e) {
  emit('keydown', e);
}

function selectTool(tool) {
  emit('select-tool', tool);
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