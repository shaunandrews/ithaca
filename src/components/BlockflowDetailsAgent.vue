<template>
    <div class="agent-details">
        <header>
            <h3 v-if="agent" class="agent-title">{{ agent.title }}</h3>
            <p v-if="agent" class="text-description">{{ agent.description }}</p>
        </header>

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

        <FieldGroup 
            label="Base prompt"
            type="textarea"
            :rows="4"
            v-model="basePrompt"
        />

        <FieldGroup 
            label="Greeting"
            type="textarea"
            :rows="3"
            v-model="greeting"
            description="This is the greeting message that will be sent when they start a conversation with the agent. Often used for previewing and testing agents."
        />

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
    import { ref } from 'vue';
    import BlockflowVariable from './BlockflowVariable.vue';
    import FieldGroup from './FieldGroup.vue';

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

    // Reactive data for form fields
    const basePrompt = ref(props.agent?.basePrompt || '');
    const greeting = ref(props.agent?.greeting || '');
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