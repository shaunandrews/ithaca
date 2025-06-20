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
            @click="onToolClick(part)"
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
    </teleport>
  </div>
</template>

<script setup>
import { ref, watch, computed, toRefs } from 'vue';
import AutocompleteMenu from './AutocompleteMenu.vue';

const props = defineProps({
  modelValue: String,
  parsedInstructions: Array,
  autocomplete: Object,
  tools: Array
});
const emit = defineEmits(['update:modelValue', 'input', 'keydown', 'select-tool', 'autocomplete-change', 'tool-click']);

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

function onToolClick(part) {
  emit('tool-click', part);
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
</style> 