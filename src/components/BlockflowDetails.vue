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
                <div class="block-details-header">
                    <h2>Block details</h2>
                </div>
                <div v-if="selectedBlock" class="block-details-content">
                    <div class="block-info">
                        <label>Title</label>
                        <input type="text" :value="selectedBlock.title" readonly />
                        
                        <label>Type</label>
                        <input type="text" :value="selectedBlock.type" readonly />
                        
                        <label>Description</label>
                        <textarea :value="selectedBlock.description" readonly />
                        
                        <label v-if="selectedBlock.stepNumber">Step Number</label>
                        <input v-if="selectedBlock.stepNumber" type="number" :value="selectedBlock.stepNumber" readonly />
                    </div>
                    
                    <div v-if="selectedBlock.inputs && selectedBlock.inputs.length > 0" class="block-inputs">
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
                    
                    <div v-if="selectedBlock.outputs && selectedBlock.outputs.length > 0" class="block-outputs">
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
                    <p>Select a block to see more details</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue';
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

    const activeTab = ref('agent');

    // Automatically switch to block tab when a block is selected
    watch(() => props.selectedBlock, (newBlock) => {
        if (newBlock) {
            activeTab.value = 'block';
        } else {
            activeTab.value = 'agent';
        }
    });
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

    .block-info label {
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-semibold);
        color: var(--color-surface-fg-secondary);
    }

    .block-info input,
    .block-info textarea {
        padding: var(--space-xs);
        border: 1px solid var(--color-surface-tint);
        border-radius: var(--radius-s);
        background-color: var(--color-surface-tint-light);
        font-size: var(--font-size-s);
        color: var(--color-surface-fg);
    }

    .block-info textarea {
        min-height: 60px;
        resize: vertical;
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
</style> 