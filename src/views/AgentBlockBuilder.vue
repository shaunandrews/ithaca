<template>
    <div class="agent-creation vstack" @keydown="handleKeydown">
        <div class="creation-header hstack">
            <button>Cancel</button>
            <h1>New Agent (Block Builder)</h1>
            <button class="primary">Save</button>
        </div>
        
        <div class="hstack">
            <div class="library">
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
            </div>
            <div class="flow-overview vstack">
                <BlockflowEvent
                    :stepNumber="1"
                    title="Receive message"
                    type="trigger"
                    description="A message from a customer, usually a chat (synchronous) or email (asynchronous)"
                    :outputs="['message']"
                    :selected="selectedBlock?.title === 'Receive message'"
                    @select="handleBlockSelect"
                />
                <BlockflowDivider />
                <BlockflowEvent
                    :stepNumber="2"
                    title="Gather context"
                    type="expert"
                    description="Gathers information about the customer"
                    :inputs="['message.author.id']"
                    :outputs="[
                        'context.customer_profile',
                        'context.purchase_history',
                        'context.support_history',
                        'context.customer_sites'
                    ]"
                    :selected="selectedBlock?.title === 'Gather context'"
                    @select="handleBlockSelect"
                />
                <BlockflowDivider />
                <BlockflowEvent
                    :stepNumber="3"
                    title="Interpret meaning"
                    type="expert"
                    description="Uses Natural Language Processing (NLP) to understand intent and needs."
                    :inputs="['message']"
                    :outputs="['context.needs', 'context.intent']"
                    :selected="selectedBlock?.title === 'Interpret meaning'"
                    @select="handleBlockSelect"
                />
                <BlockflowDivider />
                <BlockflowEvent
                    :stepNumber="4"
                    title="Assign tags"
                    type="expert"
                    description="Generate a tag or list of tags based on text. Optionally define a list of tags to choose from."
                    :inputs="['message']"
                    :outputs="['context.tags']"
                    :selected="selectedBlock?.title === 'Assign tags'"
                    @select="handleBlockSelect"
                />
                <BlockflowDivider />
                <BlockflowEvent
                    :stepNumber="5"
                    title="Analyze sentiment"
                    type="action"
                    description="Determines how the customer is feeling"
                    :selected="selectedBlock?.title === 'Analyze sentiment'"
                    @select="handleBlockSelect"
                />
                <BlockflowDivider />
                <BlockflowEvent
                    :stepNumber="6"
                    title="If/Else"
                    type="flow"
                    description="accepts inputs and allows rules to determine the next step"
                    :selected="selectedBlock?.title === 'If/Else'"
                    @select="handleBlockSelect"
                >
                    <template #rules>
                        <BlockflowRule ruleVariable="tag" ruleValue="billing">
                            <BlockflowEvent
                                title="Compose escalation"
                                type="expert"
                                description="Summarizes conversation and includes relevant links."
                                :inputs="['context']"
                                :outputs="['conversation_escalation_summary']"
                                :selected="selectedBlock?.title === 'Compose escalation'"
                                @select="handleBlockSelect"
                            />
                            <BlockflowEvent
                                title="Send email"
                                type="action"
                                description="Send an email"
                                :inputs="['email_address', 'email_subject', 'email_body']"
                                :selected="selectedBlock?.title === 'Send email'"
                                @select="handleBlockSelect"
                            />
                        </BlockflowRule>
                        <BlockflowRule ruleVariable="tag" ruleValue="legal">
                            <BlockflowEvent
                                title="Create Zendesk ticket"
                                type="action"
                                description="forward information to legal team via zendesk"
                                :selected="selectedBlock?.title === 'Create Zendesk ticket'"
                                @select="handleBlockSelect"
                            />
                            <BlockflowEvent
                                title="Respond to customer"
                                type="action"
                                description="respond to customer via original channel"
                                :selected="selectedBlock?.title === 'Respond to customer'"
                                @select="handleBlockSelect"
                            />
                            <BlockflowEvent
                                title="End flow"
                                type="action"
                                :selected="selectedBlock?.title === 'End flow'"
                                @select="handleBlockSelect"
                            >
                                <template #icon>
                                    <OctagonX size="16" stroke-width="1.5" />
                                </template>
                            </BlockflowEvent>
                        </BlockflowRule>
                        <BlockflowRule ruleVariable="sentiment" ruleValue="very angry">
                            <BlockflowEvent
                                title="Escalate to human"
                                type="action"
                                description="Contact a human and wait for guidance"
                                :selected="selectedBlock?.title === 'Escalate to human'"
                                @select="handleBlockSelect"
                            >
                                <template #icon>
                                    <OctagonPause size="16" stroke-width="1.5" />
                                </template>
                            </BlockflowEvent>
                        </BlockflowRule>
                    </template>
                </BlockflowEvent>
                <BlockflowDivider />
                <BlockflowEvent
                    :stepNumber="7"
                    title="Collect sources"
                    type="expert"
                    description="Collects information from available sources"
                    :inputs="['tags', 'context.customer_profile', 'context.purchase_history', 'context.support_history', 'context.customer_sites']"
                    :outputs="['context.sources']"
                    :selected="selectedBlock?.title === 'Collect sources'"
                    @select="handleBlockSelect"
                />
                <BlockflowDivider />
                <BlockflowEvent
                    :stepNumber="8"
                    title="Compose response"
                    type="expert"
                    description="Composes a response to a message based on the context."
                    :inputs="['context']"
                    :outputs="['response']"
                    :selected="selectedBlock?.title === 'Compose response'"
                    @select="handleBlockSelect"
                />
            </div>
            <BlockflowDetails 
                :contextVariables="[
                    'customer_profile',
                    'purchase_history',
                    'support_history',
                    'customer_sites',
                    'tags',
                    'sentiment',
                    'needs',
                    'intent',
                    'sources',
                    'response',
                    'conversation_escalation_summary'
                ]"
                :selectedBlock="selectedBlock"
            />
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { OctagonX, OctagonPause } from 'lucide-vue-next';
    import BlockflowEvent from '../components/BlockflowEvent.vue';
    import BlockflowRule from '../components/BlockflowRule.vue';
    import BlockflowDivider from '../components/BlockflowDivider.vue';
    import BlockflowDetails from '../components/BlockflowDetails.vue';

    const selectedBlock = ref(null);

    const handleBlockSelect = (blockData) => {
        selectedBlock.value = blockData;
    };

    const handleKeydown = (event) => {
        // Handle keyboard events if needed
    };
</script>

<style scoped>
    .agent-creation {
        height: 100%;
        position: relative;
    }

    .creation-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-m);
        padding: var(--space-s) var(--space-m);
        background-color: var(--color-chrome-transparent);
        border-bottom: 1px solid var(--color-surface-tint);
        position: sticky;
        top: 0;
        backdrop-filter: blur(12px);
        min-height: var(--toolbar-height);
        z-index: 1;
    }

    .creation-header h1 {
        font-size: var(--font-size-m);
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
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
        padding: var(--space-m);
        border-right: 1px solid var(--color-surface-tint);
        flex: 1;
        flex-wrap: wrap;
        align-items: center;
        box-shadow: inset 0 1px 12px 1px rgba(0, 0, 0, 0.03),
                    inset 0 1px 4px 0 rgba(0, 0, 0, 0.01);
        background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 9px,
            var(--color-surface-tint-light) 9px,
            var(--color-surface-tint-light) 10px
        );
    }
</style> 