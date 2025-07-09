<template>
    <div class="agent-details">
        <h3 v-if="agent" class="agent-title">{{ agent.title }}</h3>
        <p v-if="agent">{{ agent.description }}</p>
        
        <dl>
            <dt>Created</dt>
            <dd>{{ agent.createdAt }}</dd>
            <dt>Updated</dt>
            <dd>{{ agent.updatedAt }}</dd>
            <dt>Version</dt>
            <dd>{{ agent.version }}</dd>
            <dt>Status</dt>
            <dd>{{ agent.status }}</dd>
            <dt>Owner</dt>
            <dd>{{ agent.owner }}</dd>
        </dl>
        
        <hr />

        <div class="prompt">
            <label>Base prompt</label>
            <textarea></textarea>
        </div>


        <hr />

        <div>
            <label>Greeting</label>
            <textarea></textarea>
            <small>This is the greeting message that will be sent when they start a conversation with the agent. Often used for previewing and testing agents.</small>
        </div>
        <hr />

        <h4>Global context</h4>
        <p>Data that is available to all blocks in the workflow.</p>
        <div class="context-variables">
            <BlockflowVariable 
                v-for="variable in contextVariables" 
                :key="variable" 
                type="context"
                :value="variable"
            />
        </div>

        <hr />

        <h4>Variables</h4>
        <p>Data that is used in the workflow, but not available to all blocks.</p>
        <div class="variables">
            <BlockflowVariable 
                v-for="variable in variables" 
                :key="variable" 
                type="variable"
                :value="variable"
            />
        </div>
    </div>
</template>

<script setup>
    import BlockflowVariable from './BlockflowVariable.vue';

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
        }
    });
</script>

<style scoped>
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

    /* Definition list styles */
    dl {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: var(--space-xs) var(--space-m);
        margin: var(--space-m) 0;
    }

    dt {
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-semibold);
        color: var(--color-surface-fg-secondary);
        text-align: right;
        padding-right: var(--space-xs);
    }

    dd {
        font-size: var(--font-size-s);
        color: var(--color-surface-fg);
        margin: 0;
    }
</style> 