<template>
    <div class="details-panel">
        <header class="hstack">
            <h3>Message Details</h3>
            <button class="small" @click="$emit('close')"><XIcon /></button>
        </header>
        <div class="panel-content">
            <template v-if="selectedMessage.role === 'agent'">
                <div class="panel-section">
                    <div>
                        <Badge variant="agent">Agent</Badge>
                    </div>
                    <div class="thinking-time hstack">
                        <Hourglass height="16" width="16" />
                        <span
                            >Thought for
                            {{ selectedMessage.meta?.thinkingTime }}ms...</span
                        >
                    </div>
                    <div class="sources">
                        <h4>
                            Sources ({{
                                selectedMessage.meta?.sources?.length || 0
                            }})
                        </h4>
                        <p>
                            Judge the relevance of each source to the
                            conversation. Click a source to view the full
                            content.
                        </p>
                        <ul>
                            <SourceRating
                                v-for="source in selectedMessage.meta
                                    ?.sources || []"
                                :key="source.name"
                                :source="source"
                                @view-source="$emit('view-source', $event)"
                            />
                        </ul>
                    </div>
                    <div class="classifiers">
                        <h4>Classifiers</h4>
                        <p>
                            Confirm the agents response to each classifier, or
                            edit the value if it's incorrect.
                        </p>
                        <ul>
                            <ClassifierRating
                                v-for="classifier in selectedMessage.meta
                                    ?.classifiers || []"
                                :key="classifier.name"
                                :classifier="classifier"
                            />
                        </ul>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="panel-section">
                    <CustomerDetails />
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
    import { XIcon, Hourglass } from 'lucide-vue-next';
    import SourceRating from '@/components/SourceRating.vue';
    import ClassifierRating from '@/components/ClassifierRating.vue';
    import Badge from '@/components/Badge.vue';
    import CustomerDetails from '@/components/CustomerDetails.vue';

    defineProps({
        selectedMessage: {
            type: Object,
            required: true,
        },
    });

    defineEmits(['close', 'view-source']);
</script>

<style scoped>
    .details-panel {
        min-width: 420px;
        max-width: 420px;
        border-left: 1px solid var(--color-surface-tint);
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .details-panel header {
        padding: var(--space-m);
        justify-content: space-between;
        align-items: center;
        background-color: var(--color-chrome-transparent);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid var(--color-surface-tint);
        flex-shrink: 0;
    }

    .panel-content {
        padding: var(--space-m);
        overflow-y: auto;
        flex: 1;
    }

    .panel-section {
        display: flex;
        flex-direction: column;
        gap: var(--space-m);
    }

    .panel-section h4 {
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-medium);
        margin-bottom: var(--space-xxs);
    }

    .panel-section p {
        font-size: var(--font-size-s);
        color: var(--color-chrome-fg-secondary);
        line-height: var(--line-height-tight);
        margin-bottom: var(--space-s);
    }

    .thinking-time {
        color: var(--color-chrome-fg-secondary);
        font-size: var(--font-size-s);
        gap: var(--space-xxs);
        align-items: center;
    }

    .sources ul,
    .classifiers ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: var(--space-s);
    }
</style>
