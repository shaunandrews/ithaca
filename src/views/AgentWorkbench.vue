<template>
    <div class="agent-workbench hstack" @keydown="handleKeydown">
        <!-- <div class="library">
            <div class="library-header">
                <h2>Library</h2>
            </div>
            <div class="library-content vstack">
                <h3>Triggers</h3>
                <div class="library-blocks">
                    <div class="library-item">Manual</div>
                    <div class="library-item">Webhook</div>
                    <div class="library-item">Scheduled</div>
                    <div class="library-item">Chat message</div>
                </div>
                <h3>Actions</h3>
                <div class="library-blocks">
                    <div class="library-item">Gather context</div>
                    <div class="library-item">Assign tags</div>
                    <div class="library-item">Analyze sentiment</div>
                    <div class="library-item">Send email</div>
                    <div class="library-item">Create Zendesk ticket</div>
                    <div class="library-item">HTTP request</div>
                </div>
                
                <h3>Flow</h3>
                <div class="library-blocks">
                    <div class="library-item">If/Else</div>
                    <div class="library-item">Loop</div>
                    <div class="library-item">Switch</div>
                    <div class="library-item">Filter</div>
                    <div class="library-item">Merge</div>
                    <div class="library-item">Wait</div>
                </div>
                
            </div>
        </div> -->
        <div class="flow-overview vstack" @click="handleFlowBackgroundClick">
            <template v-for="(step, index) in workflow.steps" :key="step.uid">
                <!-- Regular step -->
                <BlockflowEvent
                    v-if="step.type !== 'control-flow'"
                    :uid="step.uid"
                    :stepNumber="step.stepNumber"
                    :title="step.title"
                    :type="step.type"
                    :description="step.description"
                    :inputs="step.inputs || []"
                    :outputs="step.outputs || []"
                    :selected="selectedBlock?.uid === step.uid"
                    @select="handleBlockSelect"
                />
                
                <!-- Control flow step (if-else, etc.) -->
                <BlockflowEvent
                    v-else
                    :uid="step.uid"
                    :stepNumber="step.stepNumber"
                    :title="step.title"
                    :type="'flow'"
                    :description="step.description"
                    :inputs="step.inputs || []"
                    :outputs="step.outputs || []"
                    :selected="selectedBlock?.uid === step.uid"
                    @select="handleBlockSelect"
                >
                    <template #rules>
                        <BlockflowRule 
                            v-for="branch in step.branches" 
                            :key="`${step.uid}-${branch.condition.variable}-${branch.condition.value}`"
                            :ruleVariable="branch.condition.variable"
                            :ruleValue="branch.condition.value"
                        >
                            <template v-for="(branchStep, branchIndex) in branch.steps" :key="branchStep.uid">
                                <BlockflowEvent
                                    :uid="branchStep.uid"
                                    :title="branchStep.title"
                                    :type="branchStep.type"
                                    :description="branchStep.description"
                                    :inputs="branchStep.inputs || []"
                                    :outputs="branchStep.outputs || []"
                                    :selected="selectedBlock?.uid === branchStep.uid"
                                    @select="handleBlockSelect"
                                >
                                </BlockflowEvent>
                                <BlockflowDivider v-if="branchIndex < branch.steps.length - 1" />
                            </template>
                            <BlockflowDivider v-if="branch.steps.length > 0" />
                        </BlockflowRule>
                    </template>
                </BlockflowEvent>
                
                <!-- Divider between main steps -->
                <BlockflowDivider v-if="index < workflow.steps.length - 1" />
            </template>
        </div>
        <BlockflowPanel>
            <BlockflowDetails 
                :contextVariables="workflow.contextVariables"
                :variables="workflow.variables"
                :selectedBlock="selectedBlock"
            />
        </BlockflowPanel>
        <BlockflowPanel>
            <div class="agent-preview vstack">
                <div class="agent-preview-content vstack">
                    <button><Play size="16" stroke-width="1.5" /> Start preview</button>
                </div>
                <div class="agent-preview-footer hstack">
                    <input type="text" placeholder="Enter message" />
                    <button><Send size="16" stroke-width="1.5" /></button>
                </div>
            </div>
        </BlockflowPanel>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { OctagonX, OctagonPause, Play, Send } from 'lucide-vue-next';
    import BlockflowEvent from '../components/BlockflowEvent.vue';
    import BlockflowRule from '../components/BlockflowRule.vue';
    import BlockflowDivider from '../components/BlockflowDivider.vue';
    import BlockflowDetails from '../components/BlockflowDetails.vue';
    import BlockflowPanel from '../components/BlockflowPanel.vue';
    import { sampleAgentWorkflow } from '../data/workflows.js';
    import { agents } from '@/data/agents.js';

    const route = useRoute();
    const agentId = computed(() => Number(route.params.id));
    const agent = computed(() => agents.find((a) => a.id === agentId.value));

    const selectedBlock = ref(null);
    
    // Use agent-specific workflow if available, otherwise use sample workflow
    const workflow = ref(agent.value?.workflow || sampleAgentWorkflow);

    const handleBlockSelect = (blockData) => {
        selectedBlock.value = blockData;
    };

    const handleFlowBackgroundClick = (event) => {
        // Only deselect if clicking directly on the flow-overview container
        if (event.target.classList.contains('flow-overview')) {
            selectedBlock.value = null;
        }
    };

    const handleKeydown = (event) => {
        // Handle keyboard events if needed
    };
</script>

<style scoped>
    .agent-workbench {
        height: 100%;
        overflow: hidden;
    }
    
    .library {
        width: 260px;
        flex-shrink: 0;
        padding: var(--space-m);
        border-right: 1px solid var(--color-surface-tint);
    }

    .library h3 { 
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-semibold);
        color: var(--color-surface-fg-tertiary);
    }

    .library-content {
        gap: var(--space-m);
    }

    .library-blocks {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-xs);
    }

    .library-item {
        padding: var(--space-xxs) var(--space-s);
        border-radius: var(--radius-s);
        background-color: var(--color-surface-tint-light);
        border: 1px solid var(--color-surface-tint);
    }

    .flow-overview {
        height: 100%;
        min-width: 800px;
        overflow-y: auto;
        /* flex: 1; */
        align-items: center;
        box-shadow: inset 0 1px 12px 1px rgba(0, 0, 0, 0.03),
                    inset 0 1px 4px 0 rgba(0, 0, 0, 0.01);
        background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 1px,
            var(--color-surface-tint-light) 1px,
            var(--color-surface-tint-light) 8px
        );
        background-attachment: fixed;
        /* background-color: var(--color-surface-tint-dark); */
    }

    .flow-overview > * {
        flex-shrink: 0;
    }

    .agent-preview-footer {
        border-top: 1px solid var(--color-surface-tint);
        padding: var(--space-m);
        gap: var(--space-xs);
    }
</style> 