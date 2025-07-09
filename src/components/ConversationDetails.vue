<template>
    <div class="conversation-details-sidebar" ref="conversationDetails">
        <header class="hstack" :class="{ 'has-border': isScrolled }">
            <NavigationTabs 
                :tabs="tabs" 
                :active-tab="activeTab" 
                @tab-click="handleTabClick"
            />
        </header>
        <div class="content vstack" ref="content">
            <template v-if="activeTab === 'conversation'">
                <h4>Summary</h4>
                <p>{{ conversation.summary }}</p>
                
                <hr />

                <p>"{{ conversation.quote }}"</p>
                <WidgetCustomer 
                    :email="conversation.customer" 
                    variant="compact" 
                    size="medium"
                />
                <WidgetSentiment :sentiment="conversation.sentiment" variant="both" />

                <h4>Topic</h4>
                <p>{{ conversation.event }}</p>

                <p>{{ new Date(conversation.datetime).toLocaleString() }}</p>
                
                
                <template v-if="conversation.tags && conversation.tags.length > 0">
                    <h4>
                        Tags ({{ conversation.tags.length }})
                    </h4>
                    <div class="tags-list hstack">
                        <span v-for="tag in conversation.tags" :key="tag" class="tag">
                            {{ tag }}
                        </span>
                    </div>
                </template>
            </template>
            
            <template v-else-if="activeTab === 'message'">
                <template v-if="!selectedMessage">
                    <div class="empty-message">
                        <p>Select a message to see details</p>
                    </div>
                </template>
                <template v-else-if="selectedMessage.role === 'agent'">
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
                        <div class="sources-header hstack">
                            <h4>
                                <Book strokeWidth="1.5" height="16" width="16" />
                                Sources ({{
                                    selectedMessage.meta?.sources?.length || 0
                                }})
                            </h4>
                            <button 
                                class="rate-all-button small" 
                                @click="rateAllSources"
                                :disabled="!selectedMessage.meta?.sources?.length"
                            >
                                <component :is="allSourcesRated ? Undo2 : ThumbsUp" strokeWidth="1.5" height="16" width="16" />
                                {{ allSourcesRated ? 'Reset' : 'All' }}
                            </button>
                        </div>
                        <ul>
                            <SourceRating
                                v-for="source in selectedMessage.meta
                                    ?.sources || []"
                                :key="source.name"
                                :source="source"
                                :rate-all-trigger="rateAllTrigger"
                                @view-source="$emit('view-source', $event)"
                            />
                        </ul>
                    </div>
                    <div class="classifiers">
                        <div class="classifiers-header hstack">
                            <h4>
                                <ListChecks strokeWidth="1.5" height="16" width="16" />
                                Classifiers ({{
                                    selectedMessage.meta?.classifiers?.length || 0
                                }})
                            </h4>
                            <button 
                                class="rate-all-button small" 
                                @click="approveAllClassifiers"
                                :disabled="!selectedMessage.meta?.classifiers?.length"
                            >
                                <component :is="allClassifiersApproved ? Undo2 : Check" strokeWidth="1.5" height="16" width="16" />
                                {{ allClassifiersApproved ? 'Reset' : 'All' }}
                            </button>
                        </div>
                        <ul>
                            <ClassifierRating
                                v-for="classifier in selectedMessage.meta
                                    ?.classifiers || []"
                                :key="classifier.name"
                                :classifier="classifier"
                                :approve-all-trigger="approveAllTrigger"
                            />
                        </ul>
                    </div>
                </template>
                <template v-else>
                    <CustomerDetails />
                </template>
            </template>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
    import { Hourglass, ListChecks, Book, Hammer, ChevronDown, MessageSquare, User, Calendar, Tags, Quote, ThumbsUp, Undo2, Check } from 'lucide-vue-next';
    import SourceRating from '@/components/SourceRating.vue';
    import ClassifierRating from '@/components/ClassifierRating.vue';
    import Badge from '@/components/Badge.vue';
    import CustomerDetails from '@/components/CustomerDetails.vue';
    import NavigationTabs from '@/components/NavigationTabs.vue';
    import WidgetSentiment from '@/components/WidgetSentiment.vue';
    import WidgetCustomer from '@/components/WidgetCustomer.vue';

    const props = defineProps({
        selectedMessage: {
            type: Object,
            required: false,
        },
        conversation: {
            type: Object,
            required: false,
        },
    });

    defineEmits(['view-source']);

    const content = ref(null);
    const conversationDetails = ref(null);
    const isScrolled = ref(false);
    const isThoughtsExpanded = ref(false);
    const rateAllTrigger = ref(0);
    const allSourcesRated = ref(false);
    const approveAllTrigger = ref(0);
    const allClassifiersApproved = ref(false);
    const activeTab = ref('conversation');

    // Define tabs
    const tabs = computed(() => [
        { key: 'conversation', label: 'Conversation' },
        { key: 'message', label: 'Message' }
    ]);

    // Auto-switch to message tab when a message is selected
    watch(() => props.selectedMessage, (newMessage) => {
        if (newMessage) {
            activeTab.value = 'message';
        } else {
            // Reset to conversation tab when no message is selected
            activeTab.value = 'conversation';
        }
        // Reset rating states when message changes
        allSourcesRated.value = false;
        rateAllTrigger.value = 0;
        allClassifiersApproved.value = false;
        approveAllTrigger.value = 0;
    });

    const handleScroll = () => {
        if (conversationDetails.value) {
            isScrolled.value = conversationDetails.value.scrollTop > 0;
        }
    };

    const toggleThoughts = () => {
        isThoughtsExpanded.value = !isThoughtsExpanded.value;
    };

    const handleTabClick = (tab) => {
        activeTab.value = tab.key;
    };

    const rateAllSources = () => {
        // Toggle between rating all and undoing all
        if (props.selectedMessage?.meta?.sources?.length) {
            if (allSourcesRated.value) {
                // Undo all ratings (set to neutral)
                rateAllTrigger.value--;
                allSourcesRated.value = false;
            } else {
                // Rate all sources (set to correct)
                rateAllTrigger.value++;
                allSourcesRated.value = true;
            }
        }
    };

    const approveAllClassifiers = () => {
        // Toggle between approving all and undoing all
        if (props.selectedMessage?.meta?.classifiers?.length) {
            if (allClassifiersApproved.value) {
                // Undo all approvals (set to neutral)
                approveAllTrigger.value--;
                allClassifiersApproved.value = false;
            } else {
                // Approve all classifiers (set to approved)
                approveAllTrigger.value++;
                allClassifiersApproved.value = true;
            }
        }
    };

    onMounted(() => {
        if (conversationDetails.value) {
            conversationDetails.value.addEventListener('scroll', handleScroll);
        }
    });

    onUnmounted(() => {
        if (conversationDetails.value) {
            conversationDetails.value.removeEventListener('scroll', handleScroll);
        }
    });
</script>

<style scoped>
    .conversation-details-sidebar {
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        height: 100%;
    }

    header {
        padding: var(--space-s) var(--space-m);
        min-height: var(--toolbar-height);
        justify-content: space-between;
        align-items: center;
        background-color: var(--color-chrome-transparent);
        border-bottom: 1px solid var(--color-surface-tint);
        backdrop-filter: blur(12px);
        flex-shrink: 0;
        position: sticky;
        top: 0;
        z-index: 100;
        transition: border-bottom-color 0.15s ease;
    }

    header.has-border {
        border-bottom-color: var(--color-surface-tint);
    }

    .content {
        padding: var(--space-m);
        flex: 1;
        gap: var(--space-l);
    }
    
    .header-start {
        gap: var(--space-s);
        align-items: center;
    }

    .thoughts {
        gap: var(--space-s);
        color: var(--color-chrome-fg-secondary);
        font-size: var(--font-size-s);
        position: relative;
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

    .sources-header,
    .classifiers-header {
        justify-content: space-between;
        align-items: center;
        padding-right: var(--space-xxs);
    }

    .sources ul,
    .classifiers ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
    }

    .rate-all-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .tags-list {
        gap: var(--space-xs);
        flex-wrap: wrap;
        width: 100%;
    }

    .tag {
        width: fit-content;
        font-size: var(--font-size-s);
        padding: var(--space-xxs) var(--space-xs);
        background-color: var(--color-surface-tint);
        border-radius: var(--radius);
    }

    .empty-message {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 200px;
        color: var(--color-chrome-fg-secondary);
        font-style: italic;
    }

    .empty-message p {
        margin: 0;
        text-align: center;
    }
</style>
