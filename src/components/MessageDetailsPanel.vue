<template>
    <div class="conversation-details" ref="conversationDetails">
        <header class="hstack" :class="{ 'has-border': isScrolled }">
            <div class="hstack header-start">
                <h3>{{ conversation ? 'Conversation Details' : 'Message Details' }}</h3>
                <Badge v-if="selectedMessage" :variant="selectedMessage.role === 'agent' ? 'agent' : 'customer'">
                    {{ selectedMessage.role === 'agent' ? 'Agent' : 'Customer' }}
                </Badge>
                <Badge v-else-if="conversation" variant="conversation">
                    Conversation
                </Badge>
            </div>
            <button class="small" @click="$emit('close')"><XIcon size="18" stroke-width="1.5" /></button>
        </header>
        <div class="content vstack" ref="content">
            <template v-if="conversation">
                <div class="conversation-details">
                    <h4>
                        <MessageSquare strokeWidth="1.5" height="16" width="16" />
                        Event
                    </h4>
                    <p>{{ conversation.event }}</p>
                </div>
                
                <div class="conversation-details">
                    <h4>
                        <User strokeWidth="1.5" height="16" width="16" />
                        Customer
                    </h4>
                    <p>{{ conversation.customer }}</p>
                </div>
                
                <div class="conversation-details">
                    <h4>
                        <Calendar strokeWidth="1.5" height="16" width="16" />
                        Date & Time
                    </h4>
                    <p>{{ new Date(conversation.datetime).toLocaleString() }}</p>
                </div>
                
                <div class="conversation-details">
                    <h4>
                        <component :is="sentimentIcon" strokeWidth="1.5" height="16" width="16" />
                        Sentiment
                    </h4>
                    <p>{{ sentimentLabel }}</p>
                </div>
                
                <div v-if="conversation.tags && conversation.tags.length > 0" class="conversation-details">
                    <h4>
                        <Tags strokeWidth="1.5" height="16" width="16" />
                        Tags ({{ conversation.tags.length }})
                    </h4>
                    <div class="tags-list">
                        <span v-for="tag in conversation.tags" :key="tag" class="tag">
                            {{ tag }}
                        </span>
                    </div>
                </div>
                
                <div class="conversation-details">
                    <h4>
                        <Quote strokeWidth="1.5" height="16" width="16" />
                        Key Quote
                    </h4>
                    <p class="quote-text">"{{ conversation.quote }}"</p>
                </div>
            </template>
            <template v-else-if="selectedMessage && selectedMessage.role === 'agent'">
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
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
    import { XIcon, Hourglass, ListChecks, Book, Hammer, ChevronDown, MessageSquare, User, Calendar, Tags, Quote, Laugh, Smile, Meh, Annoyed, Frown, Angry, ThumbsUp, Undo2, Check } from 'lucide-vue-next';
    import SourceRating from '@/components/SourceRating.vue';
    import ClassifierRating from '@/components/ClassifierRating.vue';
    import Badge from '@/components/Badge.vue';
    import CustomerDetails from '@/components/CustomerDetails.vue';

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

    defineEmits(['close', 'view-source']);

    const content = ref(null);
    const conversationDetails = ref(null);
    const isScrolled = ref(false);
    const isThoughtsExpanded = ref(false);
    const rateAllTrigger = ref(0);
    const allSourcesRated = ref(false);
    const approveAllTrigger = ref(0);
    const allClassifiersApproved = ref(false);

    // Sentiment icon mapping for conversation details
    const sentimentIcon = computed(() => {
        if (!props.conversation) return Frown;
        
        const sentimentMap = {
            1: Laugh,    // laugh
            2: Smile,    // smile
            3: Meh,      // meh
            4: Annoyed,  // annoyed
            5: Frown,    // frown
            6: Angry     // angry
        };
        
        return sentimentMap[props.conversation.sentiment] || Frown;
    });

    const sentimentLabel = computed(() => {
        if (!props.conversation) return 'Unknown';
        
        const sentimentLabels = {
            1: 'Very Happy',
            2: 'Happy',
            3: 'Neutral',
            4: 'Annoyed',
            5: 'Unhappy',
            6: 'Angry'
        };
        
        return sentimentLabels[props.conversation.sentiment] || 'Unknown';
    });

    const handleScroll = () => {
        if (conversationDetails.value) {
            isScrolled.value = conversationDetails.value.scrollTop > 0;
        }
    };

    const toggleThoughts = () => {
        isThoughtsExpanded.value = !isThoughtsExpanded.value;
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

    // Reset state when selected message changes
    watch(() => props.selectedMessage, () => {
        allSourcesRated.value = false;
        rateAllTrigger.value = 0;
        allClassifiersApproved.value = false;
        approveAllTrigger.value = 0;
    });

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
    .conversation-details {
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
        border-bottom: 1px solid transparent;
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
        padding-top: 0;
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
        display: flex;
        align-items: center;
        gap: var(--space-xs);
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

    .conversation-details {
        border-radius: var(--radius-l);
        border: 1px solid var(--color-surface-tint);
        padding: var(--space-m);
    }

    .conversation-details h4 {
        margin-top: 0;
        margin-bottom: var(--space-s);
    }

    .conversation-details p {
        margin: 0;
        color: var(--color-chrome-fg);
    }

    .tags-list {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-xs);
    }

    .tag {
        background: var(--color-surface);
        padding: var(--space-xxs) var(--space-s);
        border-radius: var(--radius-s);
        font-size: var(--font-size-s);
        border: 1px solid var(--color-surface-tint);
    }

    .quote-text {
        font-style: italic;
        color: var(--color-chrome-fg) !important;
        background: var(--color-surface-tint);
        padding: var(--space-s);
        border-radius: var(--radius-s);
        border-left: 3px solid var(--color-accent);
    }

    .rate-all-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>
