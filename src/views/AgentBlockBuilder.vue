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
                <div class="library-content">
                    <p>A list of things to add to the canvas.</p>
                    <h3>Triggers</h3>
                    <div class="library-item">Manual</div>
                    <div class="library-item">Webhook</div>
                    <div class="library-item">Scheduled</div>
                    <div class="library-item">Chat message</div>
                    <h3>Actions</h3>
                    <div class="library-item">Gather context</div>
                    <div class="library-item">Assign tags</div>
                    <div class="library-item">Analyze sentiment</div>
                    <div class="library-item">Send email</div>
                    <div class="library-item">Create Zendesk ticket</div>
                    <div class="library-item">HTTP request</div>
                    
                    <h3>Flow</h3>
                    <div class="library-item">If/Else</div>
                    <div class="library-item">Loop</div>
                    <div class="library-item">Switch</div>
                    <div class="library-item">Filter</div>
                    <div class="library-item">Merge</div>
                    <div class="library-item">Wait</div>
                    
                </div>
            </div>
            <div class="flow-overview vstack">
                <BlockflowEvent
                    :stepNumber="1"
                    title="Receive message"
                    type="trigger"
                    description="A message from a customer, usually a chat (synchronous) or email (asynchronous)"
                    :outputs="['message']"
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
                />
                <BlockflowDivider />
                <BlockflowEvent
                    :stepNumber="3"
                    title="Interpret meaning"
                    type="expert"
                    description="Uses Natural Language Processing (NLP) to understand intent and needs."
                    :inputs="['message']"
                    :outputs="['context.needs', 'context.intent']"
                />
                <BlockflowDivider />
                <BlockflowEvent
                    :stepNumber="4"
                    title="Assign tags"
                    type="expert"
                    description="Generate a tag or list of tags based on text. Optionally define a list of tags to choose from."
                    :inputs="['message']"
                    :outputs="['context.tags']"
                />
                <BlockflowDivider />
                <BlockflowEvent
                    :stepNumber="5"
                    title="Analyze sentiment"
                    type="action"
                    description="Determines how the customer is feeling"
                />
                <BlockflowDivider />
                <BlockflowEvent
                    :stepNumber="6"
                    title="If/Else"
                    type="flow"
                    description="accepts inputs and allows rules to determine the next step"
                >
                    <template #rules>
                        <BlockflowRule ruleVariable="tag" ruleValue="billing">
                            <BlockflowEvent
                                title="Compose escalation"
                                type="expert"
                                description="Summarizes conversation and includes relevant links."
                                :inputs="['context']"
                                :outputs="['conversation_escalation_summary']"
                            />
                            <BlockflowEvent
                                title="Send email"
                                type="action"
                                description="Send an email"
                                :inputs="['email_address', 'email_subject', 'email_body']"
                            />
                        </BlockflowRule>
                        <BlockflowRule ruleVariable="tag" ruleValue="legal">
                            <BlockflowEvent
                                title="Create Zendesk ticket"
                                type="action"
                                description="forward information to legal team via zendesk"
                            />
                            <BlockflowEvent
                                title="Respond to customer"
                                type="action"
                                description="respond to customer via original channel"
                            />
                            <BlockflowEvent
                                title="End flow"
                                type="action"
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
                />
                <BlockflowDivider />
                <BlockflowEvent
                    :stepNumber="8"
                    title="Compose response"
                    type="expert"
                    description="Composes a response to a message based on the context."
                    :inputs="['context']"
                    :outputs="['response']"
                />
            </div>
            <div class="details">
                <nav class="details-nav hstack">
                    <div class="details-nav-item active">Agent</div>
                    <div class="details-nav-item">Event</div>
                </nav>
                <div class="details-content">
                    <div class="agent-details">
                        <div class="agent-details-header">
                            <h2>Agent details</h2>
                        </div>
                        <div class="agent-details-content">
                            <label>Name</label>
                            <input type="text" />
                            <label>Description</label>
                            <textarea />
                            <label>Icon</label>
                            <input type="file" />
                        </div>
                        <h4>Context</h4>
                        <div class="context-variables">
                            <div class="context-variable">customer_profile</div>
                            <div class="context-variable">purchase_history</div>
                            <div class="context-variable">support_history</div>
                            <div class="context-variable">customer_sites</div>
                            <div class="context-variable">tags</div>
                            <div class="context-variable">sentiment</div>
                            <div class="context-variable">needs</div>
                            <div class="context-variable">intent</div>
                            <div class="context-variable">sources</div>
                            <div class="context-variable">response</div>
                            <div class="context-variable">conversation_escalation_summary</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { OctagonX, OctagonPause } from 'lucide-vue-next';
    import BlockflowEvent from '../components/BlockflowEvent.vue';
    import BlockflowRule from '../components/BlockflowRule.vue';
    import BlockflowDivider from '../components/BlockflowDivider.vue';
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

    .details {
        padding: var(--space-m);
        width: 320px;
    }

    .details-nav {
        background-color: var(--color-surface-tint-light);
        border-radius: var(--radius);
        border: 1px solid var(--color-surface-tint);
        gap: var(--space-m);
        padding: 1px;
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
    }

    .details-nav-item.active {  
        background-color: var(--color-surface-fg);
        color: var(--color-surface);
    }

    .library {
        padding: var(--space-m);
        border-right: 1px solid var(--color-surface-tint);
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

    .context-variables {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-xs);
        margin-top: var(--space-s);
    }

    .context-variable {
        padding: 0 var(--space-xxs);
        border-radius: var(--radius-s);
        width: fit-content;
        font-family: var(--font-monospace);
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-semibold);
        color: var(--color-accent);
        background-color: var(--color-accent-tint);
        border-bottom: 1px dashed var(--color-accent);
    }
</style> 