<template>
    <div class="conversation-meta">
        <div class="conversation-link">
            <a href="#"> #{{ conversationId }} </a>
        </div>
        <div class="conversation-zendesk">
            <a href="#">Zendesk #{{ zendeskId }}</a>
        </div>
        <div
            v-if="tags && tags.length > 0"
            class="conversation-tags"
            ref="tagsContainer"
        >
            <a href="#" @click.prevent="toggleTagsPopover">
                {{ tags.length }} tag{{ tags.length === 1 ? '' : 's' }}
            </a>
            <div v-if="showTagsPopover" class="tags-popover">
                <div class="tags-list vstack">
                    <div v-for="tag in tags" :key="tag" class="tag-item">
                        {{ tag }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';

    defineProps({
        conversationId: {
            type: String,
            required: true,
        },
        zendeskId: {
            type: String,
            required: true,
        },
        tags: {
            type: Array,
            default: () => [],
        },
    });

    const showTagsPopover = ref(false);
    const tagsContainer = ref(null);

    function toggleTagsPopover() {
        showTagsPopover.value = !showTagsPopover.value;
    }

    function handleClickOutside(event) {
        if (
            tagsContainer.value &&
            !tagsContainer.value.contains(event.target)
        ) {
            showTagsPopover.value = false;
        }
    }

    onMounted(() => {
        document.addEventListener('click', handleClickOutside);
    });

    onUnmounted(() => {
        document.removeEventListener('click', handleClickOutside);
    });
</script>

<style scoped>
    .conversation-meta {
        display: flex;
        gap: var(--space-m);
        font-size: var(--font-size-s);
        align-items: center;
        flex-wrap: wrap;
    }

    .conversation-link a,
    .conversation-zendesk a,
    .conversation-tags a {
        color: var(--color-text-subtle);
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: var(--space-xs);
    }

    .conversation-link a:hover,
    .conversation-zendesk a:hover,
    .conversation-tags a:hover {
        color: var(--color-text);
        text-decoration: underline;
    }

    .conversation-tags {
        position: relative;
    }

    .tags-popover {
        position: absolute;
        top: 100%;
        left: 0;
        background: var(--color-tooltip);
        backdrop-filter: blur(12px);
        color: var(--color-tooltip-fg);
        border-radius: var(--radius-m);
        z-index: 1000;
        width: 180px;
    }

    .tags-list {
        gap: var(--space-xs);
        padding: var(--space-s);
        max-height: 280px;
        overflow-y: auto;
    }
</style>
