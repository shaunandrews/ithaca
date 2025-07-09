<template>
    <div
        :class="['message vstack', message.role, { selected: isSelected }]"
        :id="`message-${index}`"
    >
        <div class="text" @click="handleTextClick" tabindex="0">
            <div v-if="message.role === 'user'" class="author">
                <img
                    :src="gravatarUrl(customer)"
                    alt="User avatar"
                    height="24"
                    width="24"
                    class="avatar"
                />
                <span class="email">{{ customer }}</span>
            </div>
            <div class="content" v-html="renderedContent"></div>
            
            <div v-if="message.role === 'agent'" class="meta">
                <!-- <div class="meta-item timestamp">{{ formatDate(datetime) }}</div> -->
                <div class="agent-info">
                    <div class="meta-item agent-name">WP.com Support Chat</div>
                    <div class="meta-item agent-version">v1.02</div>
                    <div class="meta-item sources-count">{{ message.meta?.sources?.length || 0 }} sources</div>
                    <div class="meta-item classifiers-count">{{ message.meta?.classifiers?.length || 0 }} classifiers</div>
                    <div class="meta-item agent-actions">
                        <button
                            class="action-button"
                            @click.stop="copyText"
                            title="Copy message text"
                        >
                            <Copy :size="14" />
                        </button>
                        <button
                            class="action-button"
                            @click.stop="copyLink"
                            title="Copy link to message"
                        >
                            <Link :size="14" />
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="message.role === 'agent' && message.suggestedReply" class="suggested-replies vstack">
                <h5>Suggested replies</h5>
                <div class="suggested-replies-list hstack">
                    <div
                        v-for="(reply, index) in message.suggestedReply"
                        :key="index"
                        class="suggested-reply-item"
                    >
                        {{ reply }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import CryptoJS from 'crypto-js';
    import { marked } from 'marked';
    import { Copy, Link } from 'lucide-vue-next';

    const props = defineProps({
        message: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
        datetime: {
            type: String,
            required: true,
        },
        customer: {
            type: String,
            required: true,
        },
        isSelected: {
            type: Boolean,
            default: false,
        },
    });

    const emit = defineEmits(['select']);

    // Configure marked options for security and styling
    marked.setOptions({
        breaks: true, // Convert line breaks to <br>
        gfm: true,    // GitHub Flavored Markdown
    });

    // Computed property to render markdown as HTML
    const renderedContent = computed(() => {
        return marked.parse(props.message.text);
    });

    function formatDate(datetime) {
        const date = new Date(datetime);
        return date.toLocaleString();
    }

    function gravatarUrl(email) {
        if (!email) return '';
        const hash = CryptoJS.SHA256(email.trim().toLowerCase()).toString(
            CryptoJS.enc.Hex
        );
        return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
    }

    function handleTextClick() {
        // Check if user has selected text - if so, don't trigger panel toggle
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) {
            return;
        }

        // No text selection, so trigger the panel toggle
        emit('select', props.message, props.index);
    }

    async function copyText() {
        try {
            await navigator.clipboard.writeText(props.message.text);
            // Could add a toast notification here if needed
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    }

    function copyLink() {
        try {
            const url = new URL(window.location);
            url.hash = `#message-${props.index}`;
            navigator.clipboard.writeText(url.toString());
            // Could add a toast notification here if needed
        } catch (err) {
            console.error('Failed to copy link:', err);
        }
    }
</script>

<style scoped>
    .text {
        padding: var(--space-m) var(--space-l);
        border-radius: var(--radius-l);
        border: 1px solid transparent;
        line-height: var(--line-height-relaxed);
        transition: all 0.15s ease-in-out;
        cursor: pointer;
        max-width: 840px;
    }

    .message.user .text {
        background: var(--color-surface-tint);
        color: var(--color-surface-fg);
        width: fit-content;
    }

    .message.agent .text {
        /* background: var(--color-surface); */
        color: var(--color-surface-fg);
    }

    .message.selected .text {
        border-color: var(--color-accent);
        box-shadow: 0 0 0 0.5px var(--color-accent);
    }

    .meta {
        margin-top: var(--space-xs);
        display: flex;
        align-items: center;
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-medium);
        text-transform: uppercase;
        color: var(--color-chrome-fg-tertiary);
        gap: var(--space-xs);
    }

    .meta .agent-info {
        display: contents;
    }

    .meta-item:not(:last-child):after {
        display: inline-block;
        content: '•';
        margin-left: var(--space-xs);
    }

    .meta-item.agent-actions:after {
        display: none;
    }

    .agent-actions {
        display: flex;
        gap: var(--space-xxs);
        align-items: center;
    }

    .action-button {
        background: none;
        border: none;
        padding: var(--space-xxs);
        border-radius: var(--radius-s);
        color: var(--color-chrome-fg-tertiary);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.1s ease-in-out;
    }

    .action-button:hover {
        background: var(--color-surface-tint);
        color: var(--color-chrome-fg-secondary);
    }

    .action-button:active {
        transform: scale(0.95);
    }

    .content :deep(h1),
    .content :deep(h2),
    .content :deep(h3),
    .content :deep(h4),
    .content :deep(h5),
    .content :deep(h6) {
        margin: var(--space-m) 0 var(--space-s) 0;
        font-weight: var(--font-weight-semibold);
        line-height: var(--line-height-compact);
    }

    .content :deep(h1) { font-size: var(--font-size-l); }
    .content :deep(h2) { font-size: var(--font-size-m); }
    .content :deep(h3) { font-size: var(--font-size-base); }
    .content :deep(h4) { font-size: var(--font-size-s); }

    .content :deep(h1):first-child,
    .content :deep(h2):first-child,
    .content :deep(h3):first-child {
        margin-top: 0;
    }

    .content :deep(p) {
        margin: var(--space-s) 0;
    }

    .content :deep(p):first-child {
        margin-top: 0;
    }

    .content :deep(p):last-child {
        margin-bottom: 0;
    }

    .content :deep(strong) {
        font-weight: var(--font-weight-semibold);
    }

    .content :deep(em) {
        font-style: italic;
    }

    .content :deep(ul),
    .content :deep(ol) {
        margin: var(--space-s) 0;
        padding-left: var(--space-l);
    }

    .content :deep(li) {
        margin: var(--space-xs) 0;
    }

    .content :deep(ul) {
        list-style-type: disc;
    }

    .content :deep(ol) {
        list-style-type: decimal;
    }

    .content :deep(blockquote) {
        margin: var(--space-m) 0;
        padding: var(--space-s) var(--space-m);
        border-left: 3px solid var(--color-accent);
        background: var(--color-surface-tint);
        border-radius: 0 var(--radius-s) var(--radius-s) 0;
        font-style: italic;
    }

    .content :deep(blockquote p) {
        margin: 0;
    }

    .content :deep(code) {
        background: var(--color-surface-tint);
        padding: var(--space-xxs) var(--space-xs);
        border-radius: var(--radius-s);
        font-family: var(--font-family-mono, 'SF Mono', Consolas, monospace);
        font-size: 0.9em;
        border: 1px solid var(--color-surface-tint);
    }

    .content :deep(pre) {
        background: var(--color-surface-tint);
        padding: var(--space-m);
        border-radius: var(--radius-m);
        margin: var(--space-m) 0;
        overflow-x: auto;
        border: 1px solid var(--color-surface-tint);
    }

    .content :deep(pre code) {
        background: none;
        padding: 0;
        border: none;
        border-radius: 0;
        font-size: var(--font-size-s);
    }

    .content :deep(a) {
        color: var(--color-accent);
        text-decoration: none;
    }

    .content :deep(a):hover {
        text-decoration: underline;
    }

    .author {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        margin-bottom: var(--space-xs);
        font-weight: var(--font-weight-medium);
        margin-top: var(--space-xxs);
        font-size: var(--font-size-m);
    }

    .avatar {
        border-radius: var(--radius);
        border: 1px solid var(--color-surface-tint-dark);
    }

    .suggested-replies {
        gap: var(--space-xs);
    }

    .suggested-replies h5 {
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-normal);
        color: var(--color-chrome-fg-tertiary);
    }

    .suggested-replies-list {
        gap: var(--space-xs);
    }

    .suggested-reply-item {
        font-size: var(--font-size-s);
        padding: var(--space-xxs) var(--space-xs);
        border-radius: var(--radius-s);
        border: 1px dashed var(--color-surface-tint-dark);
        color: var(--color-chrome-fg-secondary);
    }
</style>
