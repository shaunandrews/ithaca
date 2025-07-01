<template>
    <div class="agent-creation vstack">
        <div class="creation-header hstack">
            <button>Cancel</button>
            <h1>New Agent</h1>
            <button class="primary">Save</button>
        </div>
        
        <div class="canvas">
            <WorkflowStep title="Get customer message" icon="SquarePlay" step-type="run">
                <WorkflowTool
                    title="Customer message"
                    description="A message from a customer."
                    uid="initial-message-tool"
                    :inputs="['source']"
                    :outputs="['message']"
                />
            </WorkflowStep>

            <WorkflowStep title="Classify message" icon="SquarePlay" step-type="run">
                <WorkflowTool
                    title="Classify message"
                    description="Classify a message into a set of tags."
                    uid="classify-initial-message-tool"
                    :inputs="['message', 'enabled']"
                    :outputs="['tags']"
                />
            </WorkflowStep>

            <WorkflowStep title="Respond to message" icon="CopyCheck" step-type="first-match">
                <WorkflowTool
                    title="Domains expert"
                    description="Knows everything there is to know about web domains."
                    uid="domains-expert-reply"
                    :inputs="['message', 'tags']"
                    :outputs="['response']"
                />
                <WorkflowTool
                    title="Plugins expert"
                    description="Knows everything there is to know about WordPress plugins."
                    uid="plugins-expert-reply"
                    :inputs="['message', 'tags']"
                    :outputs="['response']"
                />
                <WorkflowTool
                    title="Gutenberg expert"
                    description="Knows everything there is to know about Gutenberg blocks."
                    uid="gutenberg-expert-reply"
                    :inputs="['message', 'tags']"
                    :outputs="['response']"
                />
            </WorkflowStep>
        </div>
    </div>
</template>

<script setup>
    import WorkflowTool from '../components/WorkflowTool.vue';
    import WorkflowStep from '../components/WorkflowStep.vue';
</script>

<style scoped>
    .agent-creation {
        height: 100%;
        /* gap: var(--space-m); */
    }

    .creation-header {
        gap: var(--space-m);
        padding: var(--space-m);
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--color-surface-tint);
        position: relative;
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
        gap: var(--space-xl);
        background-image: 
            radial-gradient(circle, var(--color-surface-tint-dark) 1px, transparent 1px);
        background-size: var(--space-l) var(--space-l);
        background-position: 0 0;
        background-color: rgba(0, 0, 0, 0.025);
        padding: var(--space-m);
        position: relative;
    }
</style> 