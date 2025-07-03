<template>
    <div class="agent-creation vstack" @keydown="handleKeydown">
        <div class="creation-header hstack">
            <button>Cancel</button>
            <h1>New Agent (Block Builder)</h1>
            <button class="primary">Save</button>
        </div>
        
        <div class="hstack">
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
            </div>
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
            <div class="flow-overview">
                <ol class="vstack">
                    <li>
                        <h3>Receive message</h3>
                        <div class="event-type">trigger</div>
                        <div class="event-description">a message from a customer, usually a chat (synchronous) or email (asynchronous)</div>
                        <div class="event-outputs vstack">
                            <div class="output-item">message</div>
                        </div>
                    </li>
                    <li>
                        <h3>Gather context</h3>
                        <div class="event-type">action</div>
                        <div class="event-description">gathers information about the customer</div>
                        <div class="event-inputs vstack">
                            <div class="input-item">message.author.id</div>
                        </div>
                        <div class="event-outputs vstack">
                            <div class="output-item">context.customer.profile</div>
                            <div class="output-item">context.customer.purchase_history</div>
                            <div class="output-item">context.customer.support_history</div>
                            <div class="output-item">context.customer.sites</div>
                        </div>
                    </li>
                    <li>
                        <h3>Interpret meaning</h3>
                        <div class="event-type">action</div>
                        <div class="event-description">uses Natural Language Processing to understand needs</div>
                        <div class="event-inputs vstack">
                            <div class="input-item">message</div>
                        </div>
                        <div class="event-outputs vstack">
                            <div class="output-item">context.customer.needs</div>
                        </div>
                    </li>
                    <li>
                        <h3>Assign tags</h3>
                        <div class="event-type">action</div>
                        <div class="event-description">Generate a tag or list of tags based on text. Optionally define a list of tags to choose from.</div>
                        <div class="event-inputs vstack">
                            <div class="input-item">message</div>
                        </div>
                        <div class="event-outputs vstack">
                            <div class="output-item">tag</div>
                        </div>
                    </li>
                    <li>
                        <h3>Analyze sentiment</h3>
                        <div class="event-type">action</div>
                        <div class="event-description">determines how the customer is feeling</div>
                    </li>
                    <li>
                        <h3>If/Else</h3>
                        <div class="event-type">flow</div>
                        <div class="event-description">accepts inputs and allows rules to determine the next step</div>
                        <div class="rules vstack">
                            <div class="rule-item">
                                <div class="rule-condition">If <span class="input-item">tag</span> is "billing"</div>
                                <div class="rule-action">
                                    <ol>
                                        <li>
                                            <h4>Send email</h4>
                                            <div class="event-description">forward information to billing team via email</div>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                            <div class="rule-item">
                                <div class="rule-condition">If <span class="input-item">tag</span> is "legal"</div>
                                <div class="rule-action">
                                    <ol>
                                        <li>
                                            <h4>Create Zendesk ticket</h4>
                                            <div class="event-description">forward information to legal team via zendesk</div>
                                        </li>
                                        <li>
                                            <h4>Respond to customer</h4>
                                            <div class="event-description">respond to customer via original channel</div>
                                        </li>
                                        <li>
                                            <OctagonX size="16" stroke-width="1.5" />
                                            <h4>End flow</h4>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                            <div class="rule-item">
                                <div class="rule-condition">If <span class="input-item">sentiment</span> is "very angry"</div>
                                <div class="rule-action">
                                    <ol>
                                        <li>
                                            <OctagonPause size="16" stroke-width="1.5" />
                                            <h4>Escalate to human</h4>
                                            <div class="event-description">Contact a human and wait for guidance</div>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </li>
                </ol>
            </div>
            <div class="canvas">
                <div class="block">
                    <div class="block-header">
                        <h2>Get customer message</h2>
                        <div class="block-type">Trigger</div>
                    </div>
                    <div class="block-content">
                        A message from the customer.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { OctagonX, OctagonPause } from 'lucide-vue-next';
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

    .canvas {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-xl);
        background-image: 
            radial-gradient(circle, var(--color-surface-tint-dark) 1px, transparent 1px);
        background-size: var(--space-l) var(--space-l);
        background-position: 0 0;
        background-color: rgba(0, 0, 0, 0.025);
        padding: var(--space-m);
        position: relative;
    }

    .agent-details {
        padding: var(--space-m);
        border-right: 1px solid var(--color-surface-tint);
    }

    .library {
        padding: var(--space-m);
        border-right: 1px solid var(--color-surface-tint);
    }

    .flow-overview {
        padding: var(--space-m);
        border-right: 1px solid var(--color-surface-tint);
    }

    .flow-overview ol {
        gap: var(--space-l);
        padding: 0;
    }

    li {
        list-style: none;
        background-color: var(--color-surface);
        border: 1px solid var(--color-surface-tint);
        padding: var(--space-m);
        border-radius: var(--radius-l);
        display: flex;
        flex-direction: column;
        gap: var(--space-s);
    }

    .event-type {
        color: var(--color-chrome-fg-secondary);
        font-size: var(--font-size-s);
    }

    .event-inputs,
    .event-outputs {
        gap: var(--space-xs);
    }

    .input-item,
    .output-item {
        padding: 0 var(--space-xxs);
        border-radius: var(--radius-s);
        width: fit-content;
        font-family: var(--font-monospace);
        font-size: var(--font-size-s);
        border-bottom: 1px dashed transparent;
        width: fit-content;
    }

    .input-item {
        font-weight: var(--font-weight-medium);
        color: var(--color-highlight);
        background-color: var(--color-highlight-tint);
        border-bottom-color: var(--color-highlight);
    }

    .output-item {
        font-weight: var(--font-weight-semibold);
        color: var(--color-accent);
        background-color: var(--color-accent-tint);
        border-bottom-color: var(--color-accent);
    }

    .rules {
        gap: var(--space-s);
    }

    .rule-item {
        display: flex;
        flex-direction: column;
        gap: var(--space-s);
    }
    .rule-action {
        padding-left: var(--space-m);
    }
</style> 