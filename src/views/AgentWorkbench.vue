<template>
    <div class="agent-workbench hstack">
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
                    :expertId="step.expertId"
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
                    :inputs="step.inputs || []"
                    :outputs="step.outputs || []"
                    :branches="step.branches || []"
                    :selected="selectedBlock?.uid === step.uid"
                    @select="handleBlockSelect"
                    @addRule="handleAddRule"
                >
                    <template #rules>
                        <BlockflowRule 
                            v-for="(branch, branchIndex) in step.branches" 
                            :key="`${step.uid}-${branch.condition.variable}-${branch.condition.value}`"
                            :ruleVariable="branch.condition.variable"
                            :ruleValue="branch.condition.value"
                            :steps="branch.steps"
                            :selected="(selectedBlock?.type === 'rule' && selectedBlock?.variable === branch.condition.variable && selectedBlock?.value === branch.condition.value) || (selectedBlock?.type === 'flow' && selectedBlock?.uid === step.uid)"
                            @select="handleBlockSelect"
                        >
                            <template v-for="(branchStep, stepIndex) in branch.steps" :key="branchStep.uid">
                                <BlockflowEvent
                                    :uid="branchStep.uid"
                                    :title="branchStep.title"
                                    :type="branchStep.type"
                                    :expertId="branchStep.expertId"
                                    :inputs="branchStep.inputs || []"
                                    :outputs="branchStep.outputs || []"
                                    :selected="selectedBlock?.uid === branchStep.uid"
                                    @select="handleBlockSelect"
                                >
                                </BlockflowEvent>
                                
                                <!-- Placeholder after this branch step (but not at the end) -->
                                <template v-for="placeholder in placeholders.filter(p => p.branchId === `${step.uid}|${branchIndex}` && p.position === stepIndex + 1 && p.position < branch.steps.length)" :key="placeholder.uid">
                                    <BlockflowDivider 
                                        :position="stepIndex + 1" 
                                        :branchId="`${step.uid}|${branchIndex}`"
                                        @addEvent="handleDividerClick" 
                                    />
                                    <BlockflowEventPlaceholder
                                        :uid="placeholder.uid"
                                        :position="placeholder.position"
                                        :branchId="placeholder.branchId"
                                        :selected="selectedBlock?.uid === placeholder.uid"
                                        @confirm="handlePlaceholderConfirm"
                                        @remove="handlePlaceholderRemove"
                                        @select="handlePlaceholderSelect"
                                    />
                                    <BlockflowDivider 
                                        :position="placeholder.position + 1" 
                                        :branchId="`${step.uid}|${branchIndex}`"
                                        @addEvent="handleDividerClick" 
                                    />
                                </template>
                                
                                <BlockflowDivider 
                                    v-if="stepIndex < branch.steps.length - 1 && branchStep.type !== 'exit' && !placeholders.some(p => p.branchId === `${step.uid}|${branchIndex}` && p.position === stepIndex + 1)"
                                    :position="stepIndex + 1"
                                    :branchId="`${step.uid}|${branchIndex}`"
                                    @addEvent="handleDividerClick"
                                />
                            </template>
                            
                            <!-- Final placeholder at end of branch -->
                            <template v-for="placeholder in placeholders.filter(p => p.branchId === `${step.uid}|${branchIndex}` && p.position === branch.steps.length)" :key="placeholder.uid">
                                <BlockflowDivider 
                                    :position="branch.steps.length" 
                                    :branchId="`${step.uid}|${branchIndex}`"
                                    @addEvent="handleDividerClick" 
                                />
                                <BlockflowEventPlaceholder
                                    :uid="placeholder.uid"
                                    :position="placeholder.position"
                                    :branchId="placeholder.branchId"
                                    :selected="selectedBlock?.uid === placeholder.uid"
                                    @confirm="handlePlaceholderConfirm"
                                    @remove="handlePlaceholderRemove"
                                    @select="handlePlaceholderSelect"
                                />
                                <BlockflowDivider 
                                    :position="placeholder.position + 1" 
                                    :branchId="`${step.uid}|${branchIndex}`"
                                    @addEvent="handleDividerClick" 
                                />
                            </template>
                            
                            <BlockflowDivider 
                                v-if="(branch.steps.length === 0 || (branch.steps.length > 0 && branch.steps[branch.steps.length - 1].type !== 'exit')) && !placeholders.some(p => p.branchId === `${step.uid}|${branchIndex}` && p.position === branch.steps.length)"
                                :position="branch.steps.length"
                                :branchId="`${step.uid}|${branchIndex}`"
                                @addEvent="handleDividerClick"
                            />
                        </BlockflowRule>
                        
                        <!-- Rule placeholders -->
                        <BlockflowRulePlaceholder
                            v-for="placeholder in rulePlaceholders.filter(p => p.flowId === step.uid)"
                            :key="placeholder.uid"
                            :uid="placeholder.uid"
                            :position="placeholder.position"
                            :flowId="placeholder.flowId"
                            :selected="selectedBlock?.uid === placeholder.uid"
                            @confirm="handleRulePlaceholderConfirm"
                            @remove="handleRulePlaceholderRemove"
                            @select="handleBlockSelect"
                        />
                    </template>
                </BlockflowEvent>
                
                <!-- Placeholder after this step -->
                <template v-for="placeholder in placeholders.filter(p => p.position === index + 1)" :key="placeholder.uid">
                    <BlockflowDivider :position="index + 1" @addEvent="handleDividerClick" />
                    <BlockflowEventPlaceholder
                        :uid="placeholder.uid"
                        :position="placeholder.position"
                        :selected="selectedBlock?.uid === placeholder.uid"
                        @confirm="handlePlaceholderConfirm"
                        @remove="handlePlaceholderRemove"
                        @select="handlePlaceholderSelect"
                    />
                    <BlockflowDivider :position="placeholder.position + 1" @addEvent="handleDividerClick" />
                </template>
                
                <!-- Divider between main steps -->
                <BlockflowDivider 
                    v-if="index < workflow.steps.length - 1 && step.type !== 'exit' && !placeholders.some(p => p.position === index + 1)"
                    :position="index + 1"
                    @addEvent="handleDividerClick"
                />
            </template>
            
            <!-- Final divider at the end -->
            <template v-for="placeholder in placeholders.filter(p => p.position === workflow.steps.length)" :key="placeholder.uid">
                <BlockflowDivider :position="workflow.steps.length" @addEvent="handleDividerClick" />
                <BlockflowEventPlaceholder
                    :uid="placeholder.uid"
                    :position="placeholder.position"
                    :selected="selectedBlock?.uid === placeholder.uid"
                    @confirm="handlePlaceholderConfirm"
                    @remove="handlePlaceholderRemove"
                    @select="handlePlaceholderSelect"
                />
                <BlockflowDivider :position="placeholder.position + 1" @addEvent="handleDividerClick" />
            </template>
            
            <BlockflowDivider 
                v-if="!placeholders.some(p => p.position === workflow.steps.length) && (workflow.steps.length === 0 || workflow.steps[workflow.steps.length - 1].type !== 'exit')"
                :position="workflow.steps.length"
                @addEvent="handleDividerClick"
            />
        </div>
        <BlockflowPanel>
            <BlockflowDetails 
                :agent="agent"
                :contextVariables="workflow.contextVariables"
                :variables="workflow.variables"
                :selectedBlock="selectedBlock"
                @deleteEvent="showDeleteDialog"
            />
        </BlockflowPanel>
        
        <!-- Delete Confirmation Dialog -->
        <Dialog
            :isOpen="deleteDialogOpen"
            :title="eventToDelete?.type === 'rule' ? 'Delete Rule' : 'Delete Event'"
            :description="eventToDelete?.type === 'rule' 
                ? `Are you sure you want to delete the rule &quot;${eventToDelete?.ruleType} ${eventToDelete?.variable} is ${eventToDelete?.value}&quot;? This action cannot be undone.`
                : `Are you sure you want to delete &quot;${eventToDelete?.title}&quot;? This action cannot be undone.`"
            :actions="[
                { key: 'cancel', label: 'Cancel', variant: 'secondary' },
                { key: 'confirm', label: 'Delete', variant: 'destructive' }
            ]"
            @action="handleDeleteDialogAction"
        />
    </div>
</template>

<script setup>
    import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
    import BlockflowEvent from '../components/BlockflowEvent.vue';
    import BlockflowRule from '../components/BlockflowRule.vue';
    import BlockflowDivider from '../components/BlockflowDivider.vue';
    import BlockflowEventPlaceholder from '../components/BlockflowEventPlaceholder.vue';
    import BlockflowRulePlaceholder from '../components/BlockflowRulePlaceholder.vue';
    import BlockflowDetails from '../components/BlockflowDetails.vue';
    import BlockflowPanel from '../components/BlockflowPanel.vue';
    import Dialog from '../components/Dialog.vue';
    import { 
        sampleAgentWorkflow, 
        tumblrEmailTriageWorkflow, 
        bigSkyWorkflow, 
        agentDaveWorkflow, 
        bloggerWorkflow, 
        wpForumsWorkflow, 
        jetpackChatWorkflow,
        getWorkflowById 
    } from '../data/workflows.js';
    import { agents } from '@/data/agents.js';

    const route = useRoute();
    const agentId = computed(() => Number(route.params.id));
    const agent = computed(() => agents.find((a) => a.id === agentId.value));

    // Function to get workflow by agent ID
    const getWorkflowByAgentId = (agentId) => {
        const workflowMapping = {
            1: sampleAgentWorkflow,           // WP.com Support Chat
            2: tumblrEmailTriageWorkflow,     // Tumblr Email Triage
            4: bigSkyWorkflow,                // Big Sky
            6: agentDaveWorkflow,             // Agent Dave
            7: bloggerWorkflow,               // Blogger
            8: wpForumsWorkflow,              // WP.com Forums
            9: jetpackChatWorkflow            // Jetpack Chat
        };
        
        return workflowMapping[agentId] || sampleAgentWorkflow;
    };

    const selectedBlock = ref(null);
    
    // Use agent-specific workflow based on agent ID
    const workflow = ref(getWorkflowByAgentId(agentId.value));
    
    // Watch for agent ID changes and update workflow
    watch(agentId, (newAgentId) => {
        workflow.value = getWorkflowByAgentId(newAgentId);
        // Reset state when switching agents
        selectedBlock.value = null;
        placeholders.value = [];
        rulePlaceholders.value = [];
    });
    
    // Track placeholder events
    const placeholders = ref([]);
    
    // Track rule placeholders
    const rulePlaceholders = ref([]);
    
    // Delete dialog state
    const deleteDialogOpen = ref(false);
    const eventToDelete = ref(null);

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
        // Handle delete key press
        if (event.key === 'Delete' || event.key === 'Backspace') {
            // Only handle if not typing in an input field
            if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
                if (selectedBlock.value && selectedBlock.value.type !== 'placeholder' && selectedBlock.value.type !== 'rule-placeholder') {
                    event.preventDefault();
                    showDeleteDialog(selectedBlock.value);
                }
            }
        }
    };

    // Set up document-level keyboard event listeners
    onMounted(() => {
        document.addEventListener('keydown', handleKeydown);
    });

    onUnmounted(() => {
        document.removeEventListener('keydown', handleKeydown);
    });

    const showDeleteDialog = (blockData) => {
        if (!blockData || blockData.type === 'placeholder' || blockData.type === 'rule-placeholder') {
            return;
        }
        
        eventToDelete.value = blockData;
        deleteDialogOpen.value = true;
    };

    const handleDeleteDialogAction = (action) => {
        if (action === 'confirm') {
            handleDeleteEvent(eventToDelete.value);
        }
        
        // Close dialog and reset state
        deleteDialogOpen.value = false;
        eventToDelete.value = null;
    };

    const handleDeleteEvent = (blockData) => {
        if (!blockData || blockData.type === 'placeholder' || blockData.type === 'rule-placeholder') {
            return;
        }

        // Handle rule deletion
        if (blockData.type === 'rule') {
            // Find the flow step that contains this rule
            const flowStep = workflow.value.steps.find(step => {
                return step.branches && step.branches.some(branch => 
                    branch.condition.variable === blockData.variable && 
                    branch.condition.value === blockData.value
                );
            });
            
            if (flowStep && flowStep.branches) {
                // Find and remove the rule branch
                const branchIndex = flowStep.branches.findIndex(branch => 
                    branch.condition.variable === blockData.variable && 
                    branch.condition.value === blockData.value
                );
                
                if (branchIndex !== -1) {
                    flowStep.branches.splice(branchIndex, 1);
                }
            }
        } else {
            // Handle regular event deletion
            // Find and remove the event from the workflow
            if (blockData.branchId) {
                // Delete from a specific branch
                const [stepUid, branchIndex] = blockData.branchId.split('|');
                const flowStep = workflow.value.steps.find(s => s.uid === stepUid);
                
                if (flowStep && flowStep.branches && flowStep.branches[branchIndex]) {
                    const branchSteps = flowStep.branches[branchIndex].steps;
                    const stepIndex = branchSteps.findIndex(s => s.uid === blockData.uid);
                    if (stepIndex !== -1) {
                        branchSteps.splice(stepIndex, 1);
                    }
                }
            } else {
                // Delete from main workflow
                const stepIndex = workflow.value.steps.findIndex(s => s.uid === blockData.uid);
                if (stepIndex !== -1) {
                    workflow.value.steps.splice(stepIndex, 1);
                }
            }
        }

        // Recalculate step numbers
        recalculateStepNumbers();
        
        // Clear selection
        selectedBlock.value = null;
    };

    const handleDividerClick = (data) => {
        // Generate a unique ID for the placeholder
        const placeholderUid = `placeholder_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // Add a placeholder at the specified position
        placeholders.value.push({
            uid: placeholderUid,
            position: data.position,
            branchId: data.branchId || null, // For rule branch placeholders
            type: 'placeholder'
        });
        
        // Select the new placeholder
        selectedBlock.value = {
            uid: placeholderUid,
            type: 'placeholder',
            title: 'New Event',
            description: 'Select an event type to add to the workflow',
            position: data.position,
            branchId: data.branchId || null
        };
    };

    const handleAddRule = (data) => {
        // Generate a unique ID for the rule placeholder
        const placeholderUid = `rule_placeholder_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // Add a rule placeholder for this flow event
        rulePlaceholders.value.push({
            uid: placeholderUid,
            flowId: data.uid,
            position: 0, // Rules are added at the end
            type: 'rule-placeholder'
        });
        
        // Select the new rule placeholder
        selectedBlock.value = {
            uid: placeholderUid,
            type: 'rule-placeholder',
            title: 'New Rule',
            description: 'Define a condition and action for this rule',
            flowId: data.uid,
            position: 0
        };
    };

    const handlePlaceholderConfirm = (data) => {
        // Remove the placeholder
        placeholders.value = placeholders.value.filter(p => p.uid !== data.uid);
        
        // Create a new step
        const newStep = {
            uid: `step_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type: data.type,
            title: getDefaultTitle(data.type),
            description: getDefaultDescription(data.type),
            inputs: [],
            outputs: [],
            stepNumber: null // Will be recalculated
        };
        
        // Insert the new step at the specified position
        if (data.branchId) {
            // Insert into a specific branch
            const [stepUid, branchIndex] = data.branchId.split('|');
            const flowStep = workflow.value.steps.find(s => s.uid === stepUid);
            
            if (flowStep && flowStep.branches && flowStep.branches[branchIndex]) {
                flowStep.branches[branchIndex].steps.splice(data.position, 0, newStep);
            }
        } else {
            // Insert into main workflow
            workflow.value.steps.splice(data.position, 0, newStep);
        }
        
        // Recalculate step numbers
        recalculateStepNumbers();
        
        // Select the new step
        selectedBlock.value = {
            uid: newStep.uid,
            title: newStep.title,
            type: newStep.type,
            description: newStep.description,
            inputs: newStep.inputs,
            outputs: newStep.outputs,
            stepNumber: newStep.stepNumber,
            branchId: data.branchId
        };
    };

    const handlePlaceholderRemove = (data) => {
        // Remove the placeholder
        placeholders.value = placeholders.value.filter(p => p.uid !== data.uid);
        
        // Clear selection if this placeholder was selected
        if (selectedBlock.value?.uid === data.uid) {
            selectedBlock.value = null;
        }
    };

    const handleRulePlaceholderConfirm = (data) => {
        // Remove the placeholder
        rulePlaceholders.value = rulePlaceholders.value.filter(p => p.uid !== data.uid);
        
        // Find the flow step and add the new rule
        const flowStep = workflow.value.steps.find(s => s.uid === data.flowId);
        if (flowStep) {
            if (!flowStep.branches) {
                flowStep.branches = [];
            }
            
            // Add the new rule branch
            flowStep.branches.push({
                condition: {
                    type: 'If',
                    variable: data.variable,
                    value: data.value,
                    operator: data.condition
                },
                steps: []
            });
        }
        
        // Clear selection
        selectedBlock.value = null;
    };

    const handleRulePlaceholderRemove = (data) => {
        // Remove the rule placeholder
        rulePlaceholders.value = rulePlaceholders.value.filter(p => p.uid !== data.uid);
        
        // Clear selection if this placeholder was selected
        if (selectedBlock.value?.uid === data.uid) {
            selectedBlock.value = null;
        }
    };

    const handlePlaceholderSelect = (data) => {
        selectedBlock.value = data;
    };

    const getDefaultTitle = (type) => {
        const titles = {
            trigger: 'New Trigger',
            action: 'New Action',
            tool: 'New Tool',
            expert: 'New Expert',
            flow: 'New Flow Control',
            pause: 'New Pause',
            exit: 'New Exit'
        };
        return titles[type] || 'New Event';
    };

    const getDefaultDescription = (type) => {
        const descriptions = {
            trigger: 'Configure when this workflow should start',
            action: 'Perform an action in the workflow',
            tool: 'Use a tool to process data',
            expert: 'Consult with an expert AI',
            flow: 'Control the flow of the workflow',
            pause: 'Pause the workflow execution',
            exit: 'Exit the workflow'
        };
        return descriptions[type] || 'Configure this event';
    };

    const recalculateStepNumbers = () => {
        let stepNumber = 1;
        workflow.value.steps.forEach(step => {
            if (step.type !== 'exit') {
                step.stepNumber = stepNumber++;
            }
        });
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
        flex: 1;
        padding: var(--space-m) 0;
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
</style> 