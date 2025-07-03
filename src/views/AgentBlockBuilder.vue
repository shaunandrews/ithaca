<template>
    <div class="agent-creation vstack" @keydown="handleKeydown">
        <div class="creation-header hstack">
            <button>Cancel</button>
            <h1>New Agent (Block Builder)</h1>
            <button class="primary">Save</button>
        </div>
        
        <div class="hstack">
            <div class="library" style="display: none;">
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
            <div class="flow-overview vstack" @click="handleFlowBackgroundClick">
                <BlockflowEvent
                    uid="receive-message"
                    :stepNumber="1"
                    title="Receive message"
                    type="trigger"
                    description="A message from a customer, usually a chat (synchronous) or email (asynchronous)"
                    :outputs="['message']"
                    :selected="selectedBlock?.uid === 'receive-message'"
                    @select="handleBlockSelect"
                />
                <BlockflowDivider />
                <BlockflowEvent
                    uid="gather-context"
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
                    :selected="selectedBlock?.uid === 'gather-context'"
                    @select="handleBlockSelect"
                />
                <BlockflowDivider />
                <BlockflowEvent
                    uid="interpret-meaning"
                    :stepNumber="3"
                    title="Interpret meaning"
                    type="expert"
                    description="Uses Natural Language Processing (NLP) to understand intent and needs."
                    :inputs="['message']"
                    :outputs="['context.needs', 'context.intent']"
                    :selected="selectedBlock?.uid === 'interpret-meaning'"
                    @select="handleBlockSelect"
                />
                <BlockflowDivider />
                <BlockflowEvent
                    uid="assign-tags"
                    :stepNumber="4"
                    title="Assign tags"
                    type="expert"
                    description="Generate a tag or list of tags based on text. Optionally define a list of tags to choose from."
                    :inputs="['message']"
                    :outputs="['context.tags']"
                    :selected="selectedBlock?.uid === 'assign-tags'"
                    @select="handleBlockSelect"
                />
                <BlockflowDivider />
                <BlockflowEvent
                    uid="analyze-sentiment"
                    :stepNumber="5"
                    title="Analyze sentiment"
                    type="expert"
                    description="Determines how the customer is feeling"
                    :inputs="['message']"
                    :outputs="['context.sentiment']"
                    :selected="selectedBlock?.uid === 'analyze-sentiment'"
                    @select="handleBlockSelect"
                />
                <BlockflowDivider />
                <BlockflowEvent
                    uid="if-else"
                    :stepNumber="6"
                    title="If/Else"
                    type="flow"
                    description="accepts inputs and allows rules to determine the next step"
                    :selected="selectedBlock?.uid === 'if-else'"
                    @select="handleBlockSelect"
                >
                    <template #rules>
                        <BlockflowRule ruleVariable="tag" ruleValue="billing">
                            <BlockflowEvent
                                uid="compose-escalation-billing"
                                title="Compose escalation"
                                type="expert"
                                description="Summarizes conversation and includes relevant links."
                                :inputs="['message', 'context']"
                                :outputs="['conversation_escalation_summary']"
                                :selected="selectedBlock?.uid === 'compose-escalation-billing'"
                                @select="handleBlockSelect"
                            />
                            <BlockflowDivider />
                            <BlockflowEvent
                                uid="send-email-billing"
                                title="Send email"
                                type="tool"
                                description="Send an email"
                                :inputs="['email_address', 'email_subject', 'email_body']"
                                :selected="selectedBlock?.uid === 'send-email-billing'"
                                @select="handleBlockSelect"
                            />
                            <BlockflowDivider />
                        </BlockflowRule>
                        <BlockflowRule ruleVariable="tag" ruleValue="legal">
                            <BlockflowEvent
                                uid="create-zendesk-legal"
                                title="Create Zendesk ticket"
                                type="tool"
                                description="forward information to legal team via zendesk"
                                :selected="selectedBlock?.uid === 'create-zendesk-legal'"
                                @select="handleBlockSelect"
                            />
                            <BlockflowDivider />
                            <BlockflowEvent
                                uid="send-response-legal"
                                title="Send response"
                                type="tool"
                                description="respond to customer via original channel"
                                :selected="selectedBlock?.uid === 'send-response-legal'"
                                @select="handleBlockSelect"
                            />
                            <BlockflowDivider />
                            <BlockflowEvent
                                uid="end-flow-legal"
                                title="End flow"
                                type="exit"
                                :selected="selectedBlock?.uid === 'end-flow-legal'"
                                @select="handleBlockSelect"
                            >
                                <template #icon>
                                    <OctagonX size="16" stroke-width="1.5" />
                                </template>
                            </BlockflowEvent>
                        </BlockflowRule>
                        <BlockflowRule ruleVariable="context.sentiment" ruleValue="very angry">
                            <BlockflowEvent
                                uid="escalate-to-human"
                                title="Escalate to human"
                                type="tool"
                                description="Contact a human and wait for guidance"
                                :selected="selectedBlock?.uid === 'escalate-to-human'"
                                @select="handleBlockSelect"
                            >
                                <template #icon>
                                    <OctagonPause size="16" stroke-width="1.5" />
                                </template>
                            </BlockflowEvent>
                            <BlockflowDivider />
                        </BlockflowRule>
                    </template>
                </BlockflowEvent>
                <BlockflowDivider />
                <BlockflowEvent
                    uid="gather-sources"
                    :stepNumber="7"
                    title="Gather sources"
                    type="expert"
                    description="Collects information from available sources"
                    :inputs="['tags', 'context.customer_profile', 'context.purchase_history', 'context.support_history', 'context.customer_sites']"
                    :outputs="['context.sources']"
                    :selected="selectedBlock?.uid === 'gather-sources'"
                    @select="handleBlockSelect"
                />
                <BlockflowDivider />
                <BlockflowEvent
                    uid="compose-response"
                    :stepNumber="8"
                    title="Compose response"
                    type="expert"
                    description="Composes a response to a message based on the context."
                    :inputs="['message','context']"
                    :outputs="['response']"
                    :selected="selectedBlock?.uid === 'compose-response'"
                    @select="handleBlockSelect"
                />
                <BlockflowDivider />
                <BlockflowEvent
                    uid="send-response"
                    :stepNumber="9"
                    title="Send response"
                    type="tool"
                    description="Sends a response to a message"
                    :inputs="['message','response']"
                    :selected="selectedBlock?.uid === 'send-response'"
                    @select="handleBlockSelect"
                />
                <BlockflowDivider />
                <BlockflowEvent
                    uid="end-flow"
                    :stepNumber="10"
                    title="End flow"
                    type="action"
                    :selected="selectedBlock?.uid === 'end-flow'"
                    @select="handleBlockSelect"
                />
            </div>
            <BlockflowPanel>
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
                    :variables="[
                        'message',
                        'tag',
                        'email_address',
                        'email_subject',
                        'email_body'
                    ]"
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
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { OctagonX, OctagonPause, Play, Send } from 'lucide-vue-next';
    import BlockflowEvent from '../components/BlockflowEvent.vue';
    import BlockflowRule from '../components/BlockflowRule.vue';
    import BlockflowDivider from '../components/BlockflowDivider.vue';
    import BlockflowDetails from '../components/BlockflowDetails.vue';
    import BlockflowPanel from '../components/BlockflowPanel.vue';

    const selectedBlock = ref(null);

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
        flex: 1;
        flex-wrap: wrap;
        align-items: center;
        /* box-shadow: inset 0 1px 12px 1px rgba(0, 0, 0, 0.03),
                    inset 0 1px 4px 0 rgba(0, 0, 0, 0.01); */
        background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 9px,
            var(--color-surface-tint-light) 9px,
            var(--color-surface-tint-light) 10px
        );
        background-attachment: fixed;
    }

    .agent-preview {
        height: 100%;
    }

    .agent-preview-content {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .agent-preview-footer {
        border-top: 1px solid var(--color-surface-tint);
        padding: var(--space-m);
        gap: var(--space-xs);
    }
</style> 