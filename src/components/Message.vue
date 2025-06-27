<template>
  <div
    :class="['message vstack', message.role, { selected: isSelected }]"
    :id="`message-${index}`"
    @click="$emit('select', message, index)"
    tabindex="0"
    style="cursor: pointer;"
  >
    <div class="text">
        <div v-if="message.role === 'user'" class="author">
            <img :src="gravatarUrl(customer)" alt="User avatar" height="32" width="32" class="avatar" />
            <span class="email">{{ customer }}</span>
        </div>
        <div class="content">{{ message.text }}</div>
    </div>
    <div class="meta">
        <div class="meta-item timestamp">{{ formatDate(datetime) }}</div>
        <div v-if="message.role === 'agent'" class="agent-info">
            <div class="meta-item agent-name">WP.com Support Chat</div>
            <div class="meta-item agent-version">v1.02</div>
            <div class="meta-item agent-actions">
                <a>Regenerate</a>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
    import CryptoJS from 'crypto-js';

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
</script>

<style scoped>
    .message {
        gap: var(--space-xxs);
        cursor: default;
        display: flex;
        flex-direction: column;
    }

    .text {
        padding: var(--space-s) var(--space-m);
        border-radius: var(--radius-l);
        border: 1px solid var(--color-surface-tint-dark);
        transition: all 0.1s ease-in-out;
    }

    .message.user .text {
        max-width: 600px;
        background: var(--color-surface-tint);
        color: var(--color-surface-fg);
    }

    .message.agent .text {
        background: var(--color-surface);
        color: var(--color-surface-fg);
    }

    .message.selected .text {
        border-color: var(--color-accent);
        box-shadow: 0 0 0 0.5px var(--color-accent);
    }

    .meta {
        display: flex;
        align-items: start;
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-medium);
        text-transform: uppercase;
        padding: 0 var(--space-xs);
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

    .author {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        margin-bottom: var(--space-xs);
        font-weight: var(--font-weight-semibold);
    }

    .avatar {
        border-radius: var(--radius-s);
        border: 1px solid var(--color-surface-tint-dark);
    }
</style> 