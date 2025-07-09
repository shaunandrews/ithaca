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
                :title="selectedBlock.type === 'rule' ? 'Delete this rule (Delete key)' : 'Delete this event (Delete key)'"
            >
                <Trash2 size="16" stroke-width="1.5" /> Delete
            </button>
        </div>

        <div v-else class="block-details-content no-block-selected">
            <p>Select a block to view details, or add a new block to the workflow.</p>
            <BlockflowLibrary />
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { Trash2 } from 'lucide-vue-next';
    import BlockflowVariable from './BlockflowVariable.vue';
    import Badge from './Badge.vue';
    import BlockflowLibrary from './BlockflowLibrary.vue';
    import { getExpertById } from '../data/workflows.js';

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