<template>
    <div class="details">
        <div class="details-header hstack">
            <NavigationTabs
                :tabs="tabs"
                :active-tab="activeTab"
                @tab-click="handleTabClick"
            />
        </div>
        <div class="details-content">
            <BlockflowDetailsAgent 
                v-if="activeTab === 'agent'" 
                :agent="agent"
                :context-variables="contextVariables"
                :variables="variables"
            />

            <BlockflowDetailsBlock
                v-if="activeTab === 'block'"
                :selected-block="selectedBlock"
                @delete-event="handleDeleteEvent"
            />

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
    import { Play, Send } from 'lucide-vue-next';
    import BlockflowDetailsAgent from './BlockflowDetailsAgent.vue';
    import BlockflowDetailsBlock from './BlockflowDetailsBlock.vue';
    import NavigationTabs from './NavigationTabs.vue';

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

    const handleDeleteEvent = (block) => {
        emit('deleteEvent', block);
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
        padding: var(--space-s) var(--space-m);
        min-height: var(--toolbar-height);
        align-items: center;
        backdrop-filter: blur(20px);
        background-color: var(--color-chrome-transparent);
        border-bottom: 1px solid var(--color-surface-tint);
    }

    .details-content {
        padding: var(--space-m) var(--space-l);
    }

    .details-content h2 {
        font-size: var(--font-size-m);
        font-weight: var(--font-weight-semibold);
        color: var(--color-surface-fg);
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