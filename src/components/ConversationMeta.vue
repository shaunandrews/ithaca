<template>
    <div class="conversation-meta">
        <div class="conversation-zendesk">
            <a href="#">Zendesk #{{ zendeskId }}</a>
        </div>

        <div class="conversation-link">
            <button 
                ref="linkButtonRef"
                class="small" 
                :class="{ 'popover-open': showPopover }"
                @click="togglePopover"
                :aria-expanded="showPopover"
                aria-haspopup="true"
            >
                <Link size="16" stroke-width="1.5" />
            </button>
        </div>

        <Popover
            :show="showPopover"
            :trigger="linkButtonRef"
            placement="bottom-end"
            @close="showPopover = false"
        >
            <template #content>
                <div class="popover-menu">
                    <button 
                        class="popover-item"
                        @click="copyToClipboard"
                    >
                        Copy Link
                    </button>
                    <button 
                        class="popover-item"
                        @click="openInNewTab"
                    >
                        Open in New Tab
                    </button>
                </div>
            </template>
        </Popover>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { Link } from 'lucide-vue-next';
    import Popover from './Popover.vue';

    const props = defineProps({
        conversationId: {
            type: String,
            required: true,
        },
        zendeskId: {
            type: String,
            required: true,
        },
    });

    const showPopover = ref(false);
    const linkButtonRef = ref(null);

    const conversationUrl = computed(() => {
        return `${window.location.origin}/conversation/${props.conversationId}`;
    });

    function togglePopover() {
        showPopover.value = !showPopover.value;
    }

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(conversationUrl.value);
            showPopover.value = false;
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
        }
    }

    function openInNewTab() {
        window.open(conversationUrl.value, '_blank');
        showPopover.value = false;
    }
</script>

<style scoped>
    .conversation-meta {
        display: flex;
        gap: var(--space-xs);
        font-size: var(--font-size-s);
        align-items: center;
        flex-wrap: wrap;
    }

    .conversation-link a,
    .conversation-zendesk a {
        color: var(--color-text-subtle);
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: var(--space-xs);
    }

    .conversation-link a:hover,
    .conversation-zendesk a:hover {
        color: var(--color-text);
        text-decoration: underline;
    }

    .popover-menu {
        display: flex;
        flex-direction: column;
        min-width: 140px;
        padding: var(--space-xxs);
    }

    .popover-item {
        border: none;
        width: 100%;
        font-weight: var(--font-weight-normal);
        justify-content: start;
    }

    .conversation-link button.popover-open {
        background: var(--color-surface-fg);
        color: var(--color-surface);
    }
</style>
