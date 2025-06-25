<template>
  <div
    :class="['message', message.role, { selected: isSelected }]"
    :id="`message-${index}`"
    @click="$emit('select', message, index)"
    tabindex="0"
    style="cursor: pointer;"
  >
    <div class="meta-row">
      <a :href="`#message-${index}`" class="message-link">{{ formatDate(datetime) }}</a>
    </div>
    <div v-if="message.role === 'user'" class="user-info">
      <img :src="gravatarUrl(customer)" alt="User avatar" height="24" width="24" class="user-avatar" />
      <span class="user-email">{{ customer }}</span>
    </div>
    <span class="text">{{ message.text }}</span>
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
        padding: var(--space-s);
        border-radius: var(--radius);
        background-color: var(--color-surface);
        border: 0.5px solid var(--color-surface-tint-dark);
        max-width: 840px;
    }

    .message.agent {
        /* background-color: var(--color-accent);
        color: var(--color-accent-fg); */
    }

    .message.selected {
        border-color: var(--color-accent);
        box-shadow: 0 0 0 1.5px var(--color-accent);
    }

    .user-info {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        margin-bottom: var(--space-xs);
    }

    .user-avatar {
        border-radius: 50%;
    }

    .user-email {
        font-weight: 500;
        color: var(--color-text);
    }

    .message-link {
    color: var(--color-text-subtle);
    text-decoration: none;
    font-size: var(--font-size-s);
    }

    .message-link:hover {
    color: var(--color-text);
    text-decoration: underline;
    }
</style> 