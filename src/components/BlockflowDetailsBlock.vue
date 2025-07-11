<template>
    <div class="block-details">
        <div v-if="selectedBlock" class="block-details-header hstack">
            <div class="block-info-header">
                <h3 v-if="selectedBlock.title" class="block-title">{{ selectedBlock.title }}</h3>
                <Badge :variant="selectedBlock.type">{{ selectedBlock.type }}</Badge>
            </div>
        </div>

        <div v-if="selectedBlock" class="block-details-content">
            <!-- Rule details -->
            <div v-if="selectedBlock.type === 'rule'" class="rule-info">
                <label>Rule Type</label>
                <input type="text" :value="selectedBlock.ruleType" readonly />
                
                <label>Variable</label>
                <input type="text" :value="selectedBlock.variable" readonly />
                
                <label>Value</label>
                <input type="text" :value="selectedBlock.value" readonly />
                
                <label>Description</label>
                <textarea :value="selectedBlock.description" readonly />
                
                <div v-if="selectedBlock.steps && selectedBlock.steps.length > 0" class="rule-steps">
                    <h4>Steps in this rule</h4>
                    <div class="steps-list">
                        <div v-for="step in selectedBlock.steps" :key="step.uid" class="step-item">
                            <span class="step-title">{{ step.title }}</span>
                            <span class="step-type">{{ step.type }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Placeholder details -->
            <div v-else-if="selectedBlock.type === 'placeholder'" class="placeholder-info">
                <p>This is a placeholder block. Select a block type to edit details here.</p>
            </div>

            <div v-else class="block-info">
                <!-- Expert-specific section -->
                <div v-if="selectedBlock.type === 'expert' && selectedExpert" class="expert-section">
                    <div class="expert-description">{{ selectedExpert.description }}</div>
                    
                    <div class="expert-instructions">
                        <h4>Instructions</h4>
                        <p class="instructions-description">Configure what this expert should do. Add tools by typing @tool.</p>
                        <InstructionsField
                            :parsedInstructions="parsedInstructions"
                            :autocomplete="autocomplete"
                            :tools="availableTools"
                            @input="onInstructionsInput"
                            @keydown="onInstructionsKeydown"
                            @select-tool="selectTool"
                        />
                    </div>

                    <hr />

                    <div v-if="selectedExpert.tools && selectedExpert.tools.length > 0" class="expert-tools">
                        <h4>Available Tools</h4>
                        <p class="tools-description">Tools that this expert can use to perform its tasks.</p>
                        <div class="tools-list">
                            <ToolListItem
                                v-for="(tool, idx) in selectedExpert.tools"
                                :key="idx"
                                :icon="tool.icon"
                                :title="tool.title"
                                :subtitle="tool.subtitle || tool.description"
                            />
                        </div>
                    </div>

                    <hr />
                </div>
                
                <div v-if="selectedBlock.type === 'flow' && selectedBlock.branches && selectedBlock.branches.length > 0" class="flow-rules">
                    <h4>Rules in this flow</h4>
                    <div class="rules-list">
                        <div v-for="branch in selectedBlock.branches" :key="`${branch.condition.variable}-${branch.condition.value}`" class="rule-item">
                            <div class="rule-condition">
                                <span class="rule-type">{{ branch.condition.type || 'If' }}</span>
                                <span class="rule-variable">{{ branch.condition.variable }}</span>
                                <span class="rule-operator">is</span>
                                <span class="rule-value">{{ branch.condition.value }}</span>
                            </div>
                            <div v-if="branch.steps && branch.steps.length > 0" class="rule-steps">
                                <span class="steps-count">{{ branch.steps.length }} step{{ branch.steps.length === 1 ? '' : 's' }}</span>
                                <div class="steps-preview">
                                    <div v-for="step in branch.steps" :key="step.uid" class="step-preview">
                                        <span class="step-title">{{ step.title }}</span>
                                        <span class="step-type">{{ step.type }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div v-if="selectedBlock.type !== 'rule' && selectedBlock.inputs && selectedBlock.inputs.length > 0" class="block-inputs">
                <h4>Inputs</h4>
                <p>Data that the block will use to perform its action.</p>
                <div class="input-list">
                    <BlockflowVariable 
                        v-for="input in selectedBlock.inputs" 
                        :key="input" 
                        type="input"
                        :value="input"
                    />
                </div>
            </div>
            
            <div v-if="selectedBlock.type !== 'rule' && selectedBlock.outputs && selectedBlock.outputs.length > 0" class="block-outputs">
                <h4>Outputs</h4>
                <p>Data that the block will produce as a result of its action.</p>
                <div class="output-list">
                    <BlockflowVariable 
                        v-for="output in selectedBlock.outputs" 
                        :key="output" 
                        type="output"
                        :value="output"
                    />
                </div>
            </div>

            <hr />

            <button 
                v-if="selectedBlock && selectedBlock.type !== 'placeholder' && selectedBlock.type !== 'rule-placeholder'"
                class="delete-button"
                @click="handleDeleteEvent"
                :title="selectedBlock.type === 'rule' ? 'Remove this rule (Delete key)' : 'Remove this event (Delete key)'"
            >
                <SquareMinus size="16" stroke-width="1.5" /> Remove
            </button>
        </div>

        <div v-else class="block-details-content no-block-selected">
            <p>Select a block to view details, or add a new block to the workflow.</p>
            <BlockflowLibrary />
        </div>
    </div>
</template>

<script setup>
    import { computed, ref, watch } from 'vue';
    import { SquareMinus } from 'lucide-vue-next';
    import BlockflowVariable from './BlockflowVariable.vue';
    import Badge from './Badge.vue';
    import BlockflowLibrary from './BlockflowLibrary.vue';
    import InstructionsField from './InstructionsField.vue';
    import ToolListItem from './ToolListItem.vue';
    import { getExpertById } from '../data/workflows.js';
    import { parseInstructions } from '../data/parseInstructions.js';
    import { tools } from '../data/tools.js';

    const props = defineProps({
        selectedBlock: {
            type: Object,
            default: null
        }
    });

    const emit = defineEmits(['deleteEvent']);

    // Get expert information for expert-type steps
    const selectedExpert = computed(() => {
        if (props.selectedBlock?.type === 'expert' && props.selectedBlock.expertId) {
            return getExpertById(props.selectedBlock.expertId);
        }
        return null;
    });

    // Parse expert instructions for the InstructionsField
    const parsedInstructions = computed(() => {
        if (selectedExpert.value && selectedExpert.value.instructions) {
            return parseInstructions(selectedExpert.value.instructions);
        }
        return [];
    });

    // Available tools for the expert
    const availableTools = computed(() => {
        if (selectedExpert.value && selectedExpert.value.tools) {
            return selectedExpert.value.tools;
        }
        return tools; // Fallback to all tools
    });

    // Autocomplete state for InstructionsField
    const autocomplete = ref({
        show: false,
        x: 0,
        y: 0,
        query: '',
        filtered: [],
        caretNode: null,
        selected: ''
    });

    // Instructions field event handlers
    const onInstructionsInput = (e) => {
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
            const filtered = availableTools.value.filter((t) =>
                t.title.toLowerCase().startsWith(query.toLowerCase())
            );
            if (filtered.length > 0) {
                const rect = range.getBoundingClientRect();
                autocomplete.value = {
                    show: true,
                    x: rect.left + window.scrollX,
                    y: rect.bottom + window.scrollY,
                    query,
                    filtered,
                    caretNode: node,
                    atIdx,
                    caretPos,
                    selected: filtered[0]?.title || ''
                };
            } else {
                autocomplete.value.show = false;
            }
        } else {
            autocomplete.value.show = false;
        }
    };

    const onInstructionsKeydown = (e) => {
        if (autocomplete.value.show) {
            if (e.key === 'ArrowDown' || e.key === 'Tab') {
                e.preventDefault();
                const idx = autocomplete.value.filtered.findIndex(
                    (t) => t.title === autocomplete.value.selected
                );
                const nextIdx = (idx + 1) % autocomplete.value.filtered.length;
                autocomplete.value.selected = autocomplete.value.filtered[nextIdx].title;
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const idx = autocomplete.value.filtered.findIndex(
                    (t) => t.title === autocomplete.value.selected
                );
                const prevIdx = (idx - 1 + autocomplete.value.filtered.length) % autocomplete.value.filtered.length;
                autocomplete.value.selected = autocomplete.value.filtered[prevIdx].title;
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const tool = autocomplete.value.filtered.find(
                    (t) => t.title === autocomplete.value.selected
                ) || autocomplete.value.filtered[0];
                if (tool) selectTool(tool);
            } else if (e.key === 'Escape') {
                autocomplete.value.show = false;
            }
        }
    };

    const selectTool = (tool) => {
        if (!autocomplete.value.caretNode) return;
        const node = autocomplete.value.caretNode;
        const text = node.textContent;
        const atIdx = autocomplete.value.atIdx;
        const caretPos = autocomplete.value.caretPos;
        const before = text.slice(0, atIdx);
        const after = text.slice(caretPos);
        const parent = node.parentNode;
        
        // Replace the text node with before, span, after
        const beforeNode = document.createTextNode(before);
        const span = document.createElement('span');
        span.className = 'highlight-tool';
        span.setAttribute('contenteditable', 'false');
        span.textContent = `@${tool.title}`;
        if (tool.value) {
            const valueSpan = document.createElement('span');
            valueSpan.className = 'tool-value';
            valueSpan.textContent = `:${tool.value}`;
            span.appendChild(valueSpan);
        }
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
    };

    const handleDeleteEvent = () => {
        if (props.selectedBlock && props.selectedBlock.type !== 'placeholder' && props.selectedBlock.type !== 'rule-placeholder') {
            emit('deleteEvent', props.selectedBlock);
        }
    };
</script>

<style scoped>
    .block-info {
        display: flex;
        flex-direction: column;
        gap: var(--space-s);
        margin-bottom: var(--space-m);
    }

    .rule-info {
        display: flex;
        flex-direction: column;
        gap: var(--space-s);
        margin-bottom: var(--space-m);
    }

    .placeholder-info {
        display: flex;
        flex-direction: column;
        gap: var(--space-s);
        margin-bottom: var(--space-m);
    }

    .block-inputs,
    .block-outputs {
        margin-top: var(--space-m);
    }

    .block-inputs h4,
    .block-outputs h4 {
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-semibold);
        color: var(--color-surface-fg-secondary);
        margin-bottom: var(--space-xs);
    }

    .input-list,
    .output-list {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-xs);
    }

    .expert-description {
        font-size: var(--font-size-s);
        color: var(--color-surface-fg-secondary);
    }

    .block-details-header {
        margin-bottom: var(--space-m);
    }

    .block-info-header {
        display: flex;
        flex-direction: column;
        gap: var(--space-xs);
    }

    .block-title {
        font-size: var(--font-size-m);
        font-weight: var(--font-weight-semibold);
        color: var(--color-surface-fg);
        margin: 0;
    }
</style> 