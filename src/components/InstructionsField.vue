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
            @mouseenter="showToolPreview($event, part)"
            @mouseleave="hideToolPreview"
          >
            @{{ part.title }}<template v-if="part.value">:<span class="tool-value">{{ part.value }}</span></template>
          </span>
        </template>
      </p>
    </template>
    <teleport to="body">
      <AutocompleteMenu
        :show="autocomplete.show"
        :filtered="autocomplete.filtered"
        :selected="autocomplete.selected"
        :x="autocomplete.x"
        :y="autocomplete.y"
        @select="selectTool"
      />
      <ToolPreview
        v-if="toolPreview.show"
        :tool="toolPreview.tool"
        :x="toolPreview.x"
        :y="toolPreview.y"
      />
    </teleport>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue';
import AutocompleteMenu from './AutocompleteMenu.vue';
import ToolPreview from './ToolPreview.vue';

const props = defineProps({
  modelValue: String,
  parsedInstructions: Array,
  autocomplete: Object,
  tools: Array
});
const emit = defineEmits(['update:modelValue', 'input', 'keydown', 'select-tool', 'autocomplete-change']);

const fieldRef = ref(null);

const toolPreview = ref({ show: false, tool: null, x: 0, y: 0 });

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

function showToolPreview(event, part) {
  const tool = props.tools.find(t => t.title === part.title);
  if (tool) {
    const rect = event.target.getBoundingClientRect();
    toolPreview.value = {
      show: true,
      tool: tool,
      x: rect.left,
      y: rect.bottom + 8
    };
  }
}

function hideToolPreview() {
  toolPreview.value.show = false;
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
  border: 1px solid var(--color-highlight);
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
</style> 