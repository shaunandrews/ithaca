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
        gap: var(--space-m);
        padding: var(--space-m);
    }

    .creation-header {
        gap: var(--space-m);
        align-items: center;
        justify-content: space-between;
        position: relative;
    }

    .creation-header h1 {
        font-size: var(--font-size-m);
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }

    .canvas {
        display: flex;
        flex-direction: column;
        gap: var(--space-xl);
        border-radius: var(--radius);
        border: 1px solid var(--color-surface-tint);
        /* background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><circle cx='0' cy='0' r='1' fill='%23555' /></svg>");
        background-size: var(--space-m) var(--space-m);
        background-position: 0 0, var(--space-m) var(--space-m); */
        background-image: 
            radial-gradient(circle, var(--color-surface-tint-dark) 1px, transparent 1px);
        background-size: var(--space-m) var(--space-m);
        background-position: 0 0;
        padding: var(--space-m);
        position: relative;
    }

    /* This hides the dots on the edge of the canvas, which look awkward. */
    /* .canvas:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: calc(100% - 1px);
        border-radius: var(--radius);
        border: 1px solid var(--color-chrome);
        pointer-events: none;
    } */
</style> 