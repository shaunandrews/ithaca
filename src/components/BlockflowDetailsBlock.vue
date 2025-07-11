<template>
    <div class="block-details">
        <div v-if="selectedBlock" class="block-details-header hstack">
            <h3 v-if="selectedBlock.title" class="block-title">{{ selectedBlock.title }}</h3>
            <Badge :variant="selectedBlock.type">{{ selectedBlock.type }}</Badge>
        </div>

        <div v-if="selectedBlock" class="block-details-content">
            <!-- Placeholder Block -->
            <template v-if="isPlaceholder">
                <div class="placeholder-info">
                    <p>This is a placeholder block. Select a block type to edit details here.</p>
                </div>
            </template>

            <!-- Rule Block -->
            <template v-else-if="isRule">
                <p class="text-description">{{ selectedBlock.description }}</p>
                <hr />

                <h4>Expression</h4>
                <RuleExpressionEditor
                    :initialVariable="selectedBlock.variable"
                    :initialCondition="selectedBlock.ruleType || 'equals'"
                    :initialValue="selectedBlock.value"
                    :showActions="false"
                    @update:variable="handleRuleVariableUpdate"
                    @update:condition="handleRuleConditionUpdate"
                    @update:value="handleRuleValueUpdate"
                />
                
                <div v-if="hasSteps" class="rule-steps">
                    <hr />

                    <h4>Steps in this rule</h4>
                    <div class="steps-list">
                        <div v-for="step in selectedBlock.steps" :key="step.uid" class="step-item">
                            <span class="step-title">{{ step.title }}</span>
                            <span class="step-type">{{ step.type }}</span>
                        </div>
                    </div>
                </div>
            </template>

            <!-- Expert Block -->
            <template v-else-if="isExpert">
                <div class="block-info">
                    <div class="expert-section">
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

                        <div v-if="hasExpertTools" class="expert-tools">
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
                </div>
            </template>

            <!-- Flow Block -->
            <template v-else-if="isFlow">
                <div class="block-info">
                    <div class="flow-rules">
                        <h4>Rules in this flow</h4>
                        <div class="rules-list">
                            <div v-for="(branch, branchIndex) in selectedBlock.branches" :key="`${branch.condition.variable}-${branch.condition.value}`" class="rule-item">
                                <div class="flow-rule-expression">
                                    <RuleExpressionEditor
                                        :initialVariable="branch.condition.variable"
                                        :initialCondition="branch.condition.type || 'equals'"
                                        :initialValue="branch.condition.value"
                                        :showActions="false"
                                        @update:variable="(value) => handleFlowRuleUpdate(branchIndex, 'variable', value)"
                                        @update:condition="(value) => handleFlowRuleUpdate(branchIndex, 'condition', value)"
                                        @update:value="(value) => handleFlowRuleUpdate(branchIndex, 'value', value)"
                                    />
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
            </template>

            <!-- Other Block Types -->
            <template v-else>
                <div class="block-info">
                    <!-- Generic block content would go here -->
                </div>
            </template>

            <!-- Common Inputs/Outputs Section -->
            <template v-if="hasInputs">
                <div class="block-inputs">
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
            </template>
            
            <template v-if="hasOutputs">
                <div class="block-outputs">
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
            </template>

            <!-- Common Delete Button -->
            <template v-if="showDeleteButton">
                <hr />
                <button 
                    class="delete-button"
                    @click="handleDeleteEvent"
                    :title="isRule ? 'Remove this rule (Delete key)' : 'Remove this event (Delete key)'"
                >
                    <SquareMinus size="16" stroke-width="1.5" /> Remove
                </button>
            </template>
        </div>

        <div v-else class="block-details-content no-block-selected">
            <p>Select a block to view details, or add a new block to the workflow.</p>

            <hr />

            <BlockflowLibrary />
        </div>
    </div>
</template>

<script setup>
    import { computed, ref } from 'vue';
    import { SquareMinus } from 'lucide-vue-next';
    import BlockflowVariable from './BlockflowVariable.vue';
    import Badge from './Badge.vue';
    import BlockflowLibrary from './BlockflowLibrary.vue';
    import InstructionsField from './InstructionsField.vue';
    import ToolListItem from './ToolListItem.vue';
    import RuleExpressionEditor from './RuleExpressionEditor.vue';
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

    // Block type computed properties for cleaner template logic
    const isPlaceholder = computed(() => {
        return props.selectedBlock?.type === 'placeholder';
    });

    const isRule = computed(() => {
        return props.selectedBlock?.type === 'rule';
    });

    const isExpert = computed(() => {
        return props.selectedBlock?.type === 'expert' && selectedExpert.value;
    });

    const isFlow = computed(() => {
        return props.selectedBlock?.type === 'flow' && 
               props.selectedBlock.branches && 
               props.selectedBlock.branches.length > 0;
    });

    // Feature-based computed properties
    const hasSteps = computed(() => {
        return props.selectedBlock?.steps && props.selectedBlock.steps.length > 0;
    });

    const hasInputs = computed(() => {
        return !isRule.value && 
               props.selectedBlock?.inputs && 
               props.selectedBlock.inputs.length > 0;
    });

    const hasOutputs = computed(() => {
        return !isRule.value && 
               props.selectedBlock?.outputs && 
               props.selectedBlock.outputs.length > 0;
    });

    const hasExpertTools = computed(() => {
        return selectedExpert.value?.tools && selectedExpert.value.tools.length > 0;
    });

    const showDeleteButton = computed(() => {
        return props.selectedBlock && 
               !isPlaceholder.value && 
               props.selectedBlock.type !== 'rule-placeholder';
    });

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
    const onInstructionsInput = () => {
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

    // Rule editing handlers (prototype - no real data persistence)
    const handleRuleVariableUpdate = (value) => {
        console.log('Rule variable updated:', value);
    };

    const handleRuleConditionUpdate = (value) => {
        console.log('Rule condition updated:', value);
    };

    const handleRuleValueUpdate = (value) => {
        console.log('Rule value updated:', value);
    };

    // Flow rule editing handlers (prototype - no real data persistence)
    const handleFlowRuleUpdate = (branchIndex, field, value) => {
        console.log(`Flow rule ${branchIndex} ${field} updated:`, value);
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
        justify-content: space-between;
        align-items: center;
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

    .flow-rule-expression {
        margin-bottom: var(--space-s);
        padding: var(--space-s);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-s);
        background-color: var(--color-surface-bg-subtle);
    }
</style>