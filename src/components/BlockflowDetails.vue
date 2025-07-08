<template>
    <div class="details">
        <div class="details-header">
            <nav class="details-nav hstack">
                <div 
                    class="details-nav-item" 
                    :class="{ active: activeTab === 'agent' }"
                    @click="activeTab = 'agent'"
                >
                    Agent
                </div>
                <div 
                    class="details-nav-item" 
                    :class="{ active: activeTab === 'block' }"
                    @click="activeTab = 'block'"
                >
                    Event
                </div>
                <div 
                    class="details-nav-item" 
                    :class="{ active: activeTab === 'preview' }"
                    @click="activeTab = 'preview'"
                >
                    Preview
                </div>
            </nav>
        </div>
        <div class="details-content">
            <div v-if="activeTab === 'agent'" class="agent-details">
                <div class="agent-details-header">
                    <h2>Agent details</h2>
                </div>

                <div class="agent-details-content">
                    <label>Name</label>
                    <input type="text" />
                    <label>Description</label>
                    <textarea />
                </div>

                <div class="prompt">
                    <label>Prompt</label>
                    <textarea></textarea>
                </div>

                <hr />

                <h4>Context</h4>
                <div class="context-variables">
                    <BlockflowVariable 
                        v-for="variable in contextVariables" 
                        :key="variable" 
                        type="context"
                        :value="variable"
                    />
                </div>

                <hr />

                <h4>Variables</h4>
                <div class="variables">
                    <BlockflowVariable 
                        v-for="variable in variables" 
                        :key="variable" 
                        type="variable"
                        :value="variable"
                    />
                </div>
            </div>

            <div v-if="activeTab === 'block'" class="block-details">
                <div class="block-details-header hstack">
                    <h2>{{ selectedBlock?.type === 'rule' ? 'Rule details' : 'Block details' }}</h2>
                    <button 
                        v-if="selectedBlock && selectedBlock.type !== 'placeholder' && selectedBlock.type !== 'rule'"
                        class="delete-button"
                        @click="handleDeleteEvent"
                        title="Delete this event (Delete key)"
                    >
                        <Trash2 size="16" stroke-width="1.5" />
                    </button>
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
                        <label>Type</label>
                        <input type="text" value="Event Placeholder" readonly />
                        
                        <label>Description</label>
                        <textarea readonly>This is a placeholder for a new event. Select an event type from the dropdown above to add it to the workflow.</textarea>
                        
                        <label>Position</label>
                        <input type="number" :value="selectedBlock.position" readonly />
                    </div>

                    <!-- Regular block details -->
                    <div v-else class="block-info">
                        <label>Title</label>
                        <input type="text" :value="selectedBlock.title" readonly />
                        
                        <label>Type</label>
                        <input type="text" :value="selectedBlock.type" readonly />
                        
                        <label>Description</label>
                        <textarea :value="selectedBlock.description" readonly />
                        
                        <label v-if="selectedBlock.stepNumber">Step Number</label>
                        <input v-if="selectedBlock.stepNumber" type="number" :value="selectedBlock.stepNumber" readonly />
                        
                        <!-- Show rules for flow events -->
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
                                    <!-- <div v-if="branch.steps && branch.steps.length > 0" class="rule-steps">
                                        <span class="steps-count">{{ branch.steps.length }} step{{ branch.steps.length === 1 ? '' : 's' }}</span>
                                        <div class="steps-preview">
                                            <div v-for="step in branch.steps" :key="step.uid" class="step-preview">
                                                <span class="step-title">{{ step.title }}</span>
                                                <span class="step-type">{{ step.type }}</span>
                                            </div>
                                        </div>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div v-if="selectedBlock.type !== 'rule' && selectedBlock.inputs && selectedBlock.inputs.length > 0" class="block-inputs">
                        <h4>Inputs</h4>
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
                        <div class="output-list">
                            <BlockflowVariable 
                                v-for="output in selectedBlock.outputs" 
                                :key="output" 
                                type="output"
                                :value="output"
                            />
                        </div>
                    </div>
                </div>
                <div v-else class="block-details-content">
                    <p>Select a block or rule to see more details</p>
                </div>
            </div>

            <div v-if="activeTab === 'preview'" class="preview-details">
                <div class="preview-details-header">
                    <h2>Agent preview</h2>
                </div>
                <div class="agent-preview vstack">
                    <div class="agent-preview-content vstack">
                        <button><Play size="16" stroke-width="1.5" /> Start preview</button>
                    </div>
                    <div class="agent-preview-footer hstack">
                        <input type="text" placeholder="Enter message" />
                        <button><Send size="16" stroke-width="1.5" /></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue';
    import { Play, Send, Trash2 } from 'lucide-vue-next';
    import BlockflowVariable from './BlockflowVariable.vue';

    const props = defineProps({
        contextVariables: {
            type: Array,
            default: () => []
        },
        variables: {
            type: Array,
            default: () => []
        },
        selectedBlock: {
            type: Object,
            default: null
        }
    });

    const emit = defineEmits(['deleteEvent']);

    const activeTab = ref('agent');

    // Automatically switch to block tab when a block is selected
    watch(() => props.selectedBlock, (newBlock) => {
        if (newBlock) {
            activeTab.value = 'block';
        } else {
            activeTab.value = 'agent';
        }
    });

    const handleDeleteEvent = () => {
        if (props.selectedBlock && props.selectedBlock.type !== 'placeholder' && props.selectedBlock.type !== 'rule') {
            emit('deleteEvent', props.selectedBlock);
        }
    };
</script>

<style scoped>
    .details {
        height: 100%;
        overflow-y: auto;
    }

    .details-header {
        position: sticky;
        top: 0;
        z-index: 100;
        padding: var(--space-xs) var(--space-m);
        backdrop-filter: blur(20px);
        background-color: var(--color-chrome-transparent);
        border-bottom: 1px solid var(--color-surface-tint);
    }

    .details-nav {
        background-color: var(--color-surface-tint-light);
        border-radius: var(--radius);
        border: 1px solid var(--color-surface-tint);
        gap: 2px;
        padding: 2px;
    }

    .details-nav-item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--space-xxs) var(--space-s);
        border-radius: var(--radius-s);
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-semibold);
        color: var(--color-surface-fg-tertiary);
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .details-nav-item:hover {
        background-color: var(--color-surface-tint);
    }

    .details-nav-item.active {  
        background-color: var(--color-surface-fg);
        color: var(--color-surface);
    }

    .details-content {
        padding: var(--space-m);
    }

    .block-details-content {
        padding: var(--space-m);
    }

    .block-details-header {
        justify-content: space-between;
        align-items: center;
        padding: var(--space-m) var(--space-m) 0 var(--space-m);
    }

    .block-details-header h2 {
        margin: 0;
    }

    .delete-button {
        padding: var(--space-xs);
        border: 1px solid var(--color-surface-tint);
        border-radius: var(--radius-s);
        background-color: var(--color-surface-tint-light);
        color: var(--color-surface-fg-tertiary);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
    }

    .delete-button:hover {
        background-color: var(--color-surface-tint);
        color: var(--color-surface-fg-secondary);
        border-color: var(--color-surface-tint-dark);
    }

    .context-variables {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-xs);
        margin-top: var(--space-s);
    }

    .variables {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-xs);
        margin-top: var(--space-s);
    }

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

    .block-info label,
    .rule-info label,
    .placeholder-info label {
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-semibold);
        color: var(--color-surface-fg-secondary);
    }

    .block-info input,
    .block-info textarea,
    .rule-info input,
    .rule-info textarea,
    .placeholder-info input,
    .placeholder-info textarea {
        padding: var(--space-xs);
        border: 1px solid var(--color-surface-tint);
        border-radius: var(--radius-s);
        background-color: var(--color-surface-tint-light);
        font-size: var(--font-size-s);
        color: var(--color-surface-fg);
    }

    .block-info textarea,
    .rule-info textarea,
    .placeholder-info textarea {
        min-height: 60px;
        resize: vertical;
    }

    .rule-steps {
        margin-top: var(--space-m);
    }

    .rule-steps h4 {
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-semibold);
        color: var(--color-surface-fg-secondary);
        margin-bottom: var(--space-xs);
    }

    .steps-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-xs);
    }

    .step-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-xs);
        border: 1px solid var(--color-surface-tint);
        border-radius: var(--radius-s);
        background-color: var(--color-surface-tint-light);
    }

    .step-title {
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-medium);
        color: var(--color-surface-fg);
    }

    .step-type {
        font-size: var(--font-size-xs);
        color: var(--color-surface-fg-tertiary);
        text-transform: capitalize;
    }

    .flow-rules {
        margin-top: var(--space-m);
    }

    .flow-rules h4 {
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-semibold);
        color: var(--color-surface-fg-secondary);
        margin-bottom: var(--space-xs);
    }

    .flow-rules .rules-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-s);
    }

    .flow-rules .rule-item {
        padding: var(--space-s);
        border: 1px solid var(--color-surface-tint);
        border-radius: var(--radius-s);
        background-color: var(--color-surface-tint-light);
    }

    .rule-condition {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        margin-bottom: var(--space-xs);
    }

    .rule-type {
        font-weight: var(--font-weight-medium);
        color: var(--color-surface-fg);
    }

    .rule-variable {
        font-weight: var(--font-weight-medium);
        color: var(--color-surface-fg);
        background-color: var(--color-surface-tint);
        padding: 2px 6px;
        border-radius: var(--radius-xs);
        font-size: var(--font-size-xs);
    }

    .rule-operator {
        font-size: var(--font-size-s);
        color: var(--color-surface-fg-tertiary);
    }

    .rule-value {
        font-weight: var(--font-weight-medium);
        color: var(--color-surface-fg);
        background-color: var(--color-surface-tint);
        padding: 2px 6px;
        border-radius: var(--radius-xs);
        font-size: var(--font-size-xs);
    }

    .rule-steps {
        margin-top: var(--space-xs);
    }

    .steps-count {
        font-size: var(--font-size-xs);
        color: var(--color-surface-fg-tertiary);
        margin-bottom: var(--space-xs);
        display: block;
    }

    .steps-preview {
        display: flex;
        flex-direction: column;
        gap: var(--space-xxs);
    }

    .step-preview {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-xxs) var(--space-xs);
        background-color: var(--color-surface);
        border-radius: var(--radius-xs);
        font-size: var(--font-size-xs);
    }

    .step-preview .step-title {
        font-weight: var(--font-weight-medium);
        color: var(--color-surface-fg);
    }

    .step-preview .step-type {
        color: var(--color-surface-fg-tertiary);
        text-transform: capitalize;
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

    .agent-preview {
        height: 100%;
        gap: var(--space-m);
    }

    .agent-preview-content {
        flex: 1;
        justify-content: center;
        align-items: center;
    }

    .agent-preview-footer {
        border-top: 1px solid var(--color-surface-tint);
        padding-top: var(--space-m);
        gap: var(--space-xs);
    }

    .agent-preview-footer input {
        flex: 1;
        padding: var(--space-xs);
        border: 1px solid var(--color-surface-tint);
        border-radius: var(--radius-s);
        background-color: var(--color-surface-tint-light);
        font-size: var(--font-size-s);
        color: var(--color-surface-fg);
    }

    .agent-preview-footer button {
        padding: var(--space-xs);
        border: 1px solid var(--color-surface-tint);
        border-radius: var(--radius-s);
        background-color: var(--color-surface-tint-light);
        color: var(--color-surface-fg);
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: var(--space-xs);
    }

    .agent-preview-content button {
        padding: var(--space-s) var(--space-m);
        border: 1px solid var(--color-surface-tint);
        border-radius: var(--radius-s);
        background-color: var(--color-surface-tint-light);
        color: var(--color-surface-fg);
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        font-size: var(--font-size-s);
    }

    .agent-preview-content button:hover,
    .agent-preview-footer button:hover {
        background-color: var(--color-surface-tint);
    }
</style> 