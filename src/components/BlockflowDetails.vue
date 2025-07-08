<template>
    <div class="details">
        <div class="details-header">
            <NavigationTabs
                :tabs="tabs"
                :active-tab="activeTab"
                @tab-click="handleTabClick"
            />
        </div>
        <div class="details-content">
            <!-- <h2>{{ tabTitle }}</h2> -->
            <div v-if="activeTab === 'agent'" class="agent-details">
                <h3 v-if="agent" class="agent-title">{{ agent.title }}</h3>
                <p v-if="agent">{{ agent.description }}</p>
                
                <dl>
                    <dt>Created</dt>
                    <dd>{{ agent.createdAt }}</dd>
                    <dt>Updated</dt>
                    <dd>{{ agent.updatedAt }}</dd>
                    <dt>Version</dt>
                    <dd>{{ agent.version }}</dd>
                    <dt>Status</dt>
                    <dd>{{ agent.status }}</dd>
                    <dt>Owner</dt>
                    <dd>{{ agent.owner }}</dd>
                </dl>
                
                <hr />

                <div class="prompt">
                    <label>Base prompt</label>
                    <textarea></textarea>
                </div>

                <hr />

                <h4>Global context</h4>
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
                <div v-if="selectedBlock" class="block-details-header hstack">
                    <div class="block-type">
                        {{ selectedBlock.type }}
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
                        <div v-if="selectedBlock.type === 'expert' && selectedExpert" class="expert-description">{{ selectedExpert.description }}</div>
                        
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

                    <button 
                        v-if="selectedBlock && selectedBlock.type !== 'placeholder' && selectedBlock.type !== 'rule'"
                        class="delete-button"
                        @click="handleDeleteEvent"
                        title="Delete this event (Delete key)"
                    >
                        <Trash2 size="16" stroke-width="1.5" /> Delete
                    </button>
                </div>

                <div v-else class="block-details-content">
                    <p>Select a block or rule to see more details</p>
                </div>
            </div>

            <div v-if="activeTab === 'preview'" class="preview-details">
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
    import { ref, watch, computed } from 'vue';
    import { Play, Send, Trash2 } from 'lucide-vue-next';
    import BlockflowVariable from './BlockflowVariable.vue';
    import NavigationTabs from './NavigationTabs.vue';
    import { getExpertById } from '../data/workflows.js';

    const props = defineProps({
        agent: {
            type: Object,
            default: null
        },
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

    const tabs = [
        { key: 'agent', label: 'Agent' },
        { key: 'block', label: 'Block' },
        { key: 'preview', label: 'Preview' }
    ];

    // Get expert information for expert-type steps
    const selectedExpert = computed(() => {
        if (props.selectedBlock?.type === 'expert' && props.selectedBlock.expertId) {
            return getExpertById(props.selectedBlock.expertId);
        }
        return null;
    });

    // Compute the title based on active tab and selected block
    const tabTitle = computed(() => {
        switch (activeTab.value) {
            case 'agent':
                return 'Agent details';
            case 'block':
                if (props.selectedBlock) {
                    if (props.selectedBlock.type === 'rule') {
                        return 'Conditional rule';
                    }
                    return props.selectedBlock.title || 'Block details';
                }
                return 'Block details';
            case 'preview':
                return 'Agent preview';
            default:
                return 'Details';
        }
    });

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

    const handleTabClick = (tab) => {
        activeTab.value = tab.key;
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

    .details-content {
        padding: var(--space-m);
    }

    .details-content h2 {
        font-size: var(--font-size-m);
        font-weight: var(--font-weight-semibold);
        color: var(--color-surface-fg);
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

    .expert-info {
        margin-top: var(--space-m);
        padding: var(--space-m);
        border: 1px solid var(--color-surface-tint);
        border-radius: var(--radius-s);
        background-color: var(--color-surface-tint-light);
    }

    .expert-details {
        display: flex;
        flex-direction: column;
        gap: var(--space-xxs);
    }

    .expert-title {
        font-size: var(--font-size-m);
        font-weight: var(--font-weight-semibold);
        color: var(--color-surface-fg);
    }

    .expert-description {
        font-size: var(--font-size-s);
        color: var(--color-surface-fg-secondary);
    }

    .info-group {
        display: flex;
        flex-direction: column;
        gap: var(--space-xs);
        margin-bottom: var(--space-m);
    }

    .info-group:last-child {
        margin-bottom: 0;
    }

    .info-group label {
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-semibold);
        color: var(--color-surface-fg-secondary);
    }

    .info-group small {
        font-size: var(--font-size-xs);
        color: var(--color-surface-fg-tertiary);
        margin-top: var(--space-xxs);
    }

    .tools-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-xs);
    }

    .tool-item {
        display: flex;
        flex-direction: column;
        gap: var(--space-xxs);
        padding: var(--space-xs);
        background-color: var(--color-surface);
        border: 1px solid var(--color-surface-tint);
        border-radius: var(--radius-xs);
    }

    .tool-title {
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-medium);
        color: var(--color-surface-fg);
    }

    .tool-subtitle {
        font-size: var(--font-size-xs);
        color: var(--color-surface-fg-tertiary);
    }

    .usage-badge {
        display: inline-block;
        padding: var(--space-xxs) var(--space-xs);
        border-radius: var(--radius-xs);
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-medium);
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .usage-high {
        background-color: var(--color-red-tint);
        color: var(--color-red-fg);
    }

    .usage-medium {
        background-color: var(--color-yellow-tint);
        color: var(--color-yellow-fg);
    }

    .usage-daily {
        background-color: var(--color-green-tint);
        color: var(--color-green-fg);
    }
</style> 