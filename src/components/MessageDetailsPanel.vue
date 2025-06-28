<template>
    <div class="details-panel">
        <header class="hstack" :class="{ 'has-border': isScrolled }">
            <div class="hstack header-start">
                <h3>Message Details</h3>
                <Badge :variant="selectedMessage.role === 'agent' ? 'agent' : 'customer'">
                    {{ selectedMessage.role === 'agent' ? 'Agent' : 'Customer' }}
                </Badge>
            </div>
            <button class="small" @click="$emit('close')"><XIcon /></button>
        </header>
        <div class="panel-content vstack" ref="panelContent">
            <template v-if="selectedMessage.role === 'agent'">
                <div class="thoughts vstack">
                    <div class="thought thinking-time hstack" @click="toggleThoughts" :class="{ 'is-expanded': isThoughtsExpanded }">
                        <Hourglass height="16" width="16" class="hourglass-icon" />
                        <ChevronDown height="16" width="16" class="chevron-icon" />
                        <span
                            >Thought for
                            {{ selectedMessage.meta?.thinkingTime }}ms...</span
                        >
                    </div>
                    <div class="thoughts-list vstack" v-show="isThoughtsExpanded">
                        <div class="thought hstack">
                            <ListChecks strokeWidth="1.5" height="16" width="16" />
                            Completed 7 classifiers
                        </div>
                        <div class="thought hstack">
                            <Book strokeWidth="1.5" height="16" width="16" />
                            Referenced 3 sources
                        </div>
                        <div class="thought hstack">
                            <Hammer strokeWidth="1.5" height="16" width="16" />
                            Used @persona tool
                        </div>
                    </div>
                </div>
                <div class="sources">
                    <h4>
                        Sources ({{
                            selectedMessage.meta?.sources?.length || 0
                        }})
                    </h4>
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
                    <ul>
                        <ClassifierRating
                            v-for="classifier in selectedMessage.meta
                                ?.classifiers || []"
                            :key="classifier.name"
                            :classifier="classifier"
                        />
                    </ul>
                </div>
            </template>
            <template v-else>
                <CustomerDetails />
            </template>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';
    import { XIcon, Hourglass, ListChecks, Book, Hammer, ChevronDown } from 'lucide-vue-next';
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

    const panelContent = ref(null);
    const isScrolled = ref(false);
    const isThoughtsExpanded = ref(false);

    const handleScroll = () => {
        if (panelContent.value) {
            isScrolled.value = panelContent.value.scrollTop > 0;
        }
    };

    const toggleThoughts = () => {
        isThoughtsExpanded.value = !isThoughtsExpanded.value;
    };

    onMounted(() => {
        if (panelContent.value) {
            panelContent.value.addEventListener('scroll', handleScroll);
        }
    });

    onUnmounted(() => {
        if (panelContent.value) {
            panelContent.value.removeEventListener('scroll', handleScroll);
        }
    });
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

    header {
        padding: var(--space-xs) var(--space-m);
        justify-content: space-between;
        align-items: center;
        background-color: var(--color-chrome-transparent);
        border-bottom: 1px solid transparent;
        backdrop-filter: blur(12px);
        flex-shrink: 0;
        transition: border-bottom-color 0.15s ease;
    }

    header.has-border {
        border-bottom-color: var(--color-surface-tint);
    }

    .panel-content {
        padding: var(--space-m);
        padding-top: 0;
        overflow-y: auto;
        flex: 1;
        gap: var(--space-l);
    }

    h3 {
        font-size: var(--font-size-m);
    }
    
    .header-start {
        gap: var(--space-s);
        align-items: center;
    }
    
    h4 {
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-medium);
        margin: var(--space-xs);
    }

    p {
        font-size: var(--font-size-s);
        color: var(--color-chrome-fg-secondary);
        line-height: var(--line-height-tight);
        margin-bottom: var(--space-s);
    }

    .thoughts {
        gap: var(--space-s);
        color: var(--color-chrome-fg-secondary);
        font-size: var(--font-size-s);
    }

    .thought {
        gap: var(--space-xs);
        align-items: center;
    }

    .thoughts-list {
        gap: var(--space-xs);
        margin-left: var(--space-l);
    }

    .thinking-time {
        cursor: pointer;
        width: fit-content;
        border-radius: var(--border-radius-s);
        transition: background-color 0.15s ease;
    }

    .hourglass-icon {
        transition: opacity 0.2s ease;
    }

    .chevron-icon {
        transition: opacity 0.2s ease, transform 0.2s ease;
        opacity: 0;
        position: absolute;
    }

    .thinking-time:hover .hourglass-icon,
    .thinking-time.is-expanded .hourglass-icon {
        opacity: 0;
    }

    .thinking-time:hover .chevron-icon,
    .thinking-time.is-expanded .chevron-icon {
        opacity: 1;
    }

    .thinking-time.is-expanded .chevron-icon {
        transform: rotate(180deg);
    }

    .sources,
    .classifiers {
        border-radius: var(--radius-l);
        border: 1px solid var(--color-surface-tint);
    }

    .sources ul,
    .classifiers ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
    }
</style>
