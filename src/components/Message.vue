<template>
  <div
    :class="['message vstack', message.role, { selected: isSelected }]"
    :id="`message-${index}`"
  >
    <div 
      class="text"
      @click="handleTextClick"
      tabindex="0"
    >
        <div v-if="message.role === 'user'" class="author">
            <img :src="gravatarUrl(customer)" alt="User avatar" height="32" width="32" class="avatar" />
            <span class="email">{{ customer }}</span>
        </div>
        <div class="content">{{ message.text }}</div>
        <div v-if="message.role === 'agent'" class="meta">
            <!-- <div class="meta-item timestamp">{{ formatDate(datetime) }}</div> -->
            <div class="agent-info">
                <div class="meta-item agent-name">WP.com Support Chat</div>
                <div class="meta-item agent-version">v1.02</div>
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
    </div>
  </div>
</template>

<script setup>
    import CryptoJS from 'crypto-js';
    import { Copy, Link } from 'lucide-vue-next';

    const props = defineProps({
    message: {
        type: Object,
        required: true
    },
    index: {
        type: Number,
        required: true
    },
    datetime: {
        type: String,
        required: true
    },
    customer: {
        type: String,
        required: true
    },
    isSelected: {
        type: Boolean,
        default: false
    }
    });

    const emit = defineEmits(['select']);

    function formatDate(datetime) {
    const date = new Date(datetime);
    return date.toLocaleString();
    }

    function gravatarUrl(email) {
    if (!email) return '';
    const hash = CryptoJS.SHA256(email.trim().toLowerCase()).toString(CryptoJS.enc.Hex);
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
        border-radius: var(--radius-xl);
        border: 1px solid transparent;
        line-height: var(--line-height-relaxed);
        transition: all 0.1s ease-in-out;
        cursor: pointer;
    }

    .message.user .text {
        background: var(--color-surface-tint);
        color: var(--color-surface-fg);
        width: fit-content;
    }

    .message.agent .text {
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

    .author {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        margin-bottom: var(--space-xs);
        font-weight: var(--font-weight-medium);
        margin-top: var(--space-xxs);
    }

    .avatar {
        border-radius: var(--radius);
        border: 1px solid var(--color-surface-tint-dark);
    }
</style> 