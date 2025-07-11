<template>
    <div class="widget-customer" :class="[`variant-${variant}`, `size-${size}`]">
        <img
            v-if="showAvatar"
            :src="avatarUrl"
            :alt="avatarAlt"
            :width="avatarSize"
            :height="avatarSize"
            class="customer-avatar"
            :title="email"
        />
        <div v-if="showInfo" class="customer-info">
            <div v-if="showName" class="customer-name">{{ displayName }}</div>
            <div v-if="showEmail" class="customer-email">{{ email }}</div>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        email: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: false,
        },
        variant: {
            type: String,
            default: 'default',
            validator: (value) => ['default', 'compact', 'detailed', 'avatar-only'].includes(value),
        },
        size: {
            type: String,
            default: 'medium',
            validator: (value) => ['small', 'medium', 'large', 'xlarge'].includes(value),
        },
        showAvatar: {
            type: Boolean,
            default: true,
        },
        showName: {
            type: Boolean,
            default: true,
        },
        showEmail: {
            type: Boolean,
            default: true,
        },
    });

    const avatarUrl = computed(() => {
        if (!props.email) return '';
        // Simple hash function for Gravatar (using email as-is for demo)
        const hash = btoa(props.email.trim().toLowerCase()).replace(/[^a-zA-Z0-9]/g, '').substring(0, 32);
        return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
    });

    const avatarAlt = computed(() => {
        return props.name ? `${props.name} avatar` : 'Customer avatar';
    });

    const displayName = computed(() => {
        if (props.name) return props.name;
        // Extract name from email if no name provided
        const emailParts = props.email.split('@');
        return emailParts[0].replace(/[._]/g, ' ');
    });

    const avatarSize = computed(() => {
        const sizes = {
            small: 20,
            medium: 24,
            large: 40,
            xlarge: 64,
        };
        return sizes[props.size];
    });

    const showInfo = computed(() => {
        return props.variant !== 'avatar-only' && (props.showName || props.showEmail);
    });
</script>

<style scoped>
    .widget-customer {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
    }

    .customer-avatar {
        border-radius: var(--radius-s);
        vertical-align: middle;
        transition: transform 0.1s ease-in-out;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
        flex-shrink: 0;
    }

    .customer-info {
        display: flex;
        flex-direction: column;
        gap: var(--space-xxs);
        min-width: 0;
    }

    .customer-name {
        font-weight: var(--font-weight-medium);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .customer-email {
        color: var(--color-chrome-fg-secondary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    /* Variant styles */
    .variant-compact .customer-info {
        flex-direction: row;
        gap: var(--space-xs);
    }

    .variant-compact .customer-email {
        font-size: var(--font-size-s);
    }

    .variant-detailed .customer-info {
        gap: var(--space-xs);
    }

    .variant-detailed .customer-name {
        font-size: var(--font-size-m);
    }

    .variant-avatar-only .customer-info {
        display: none;
    }

    /* Size styles */
    .size-small .customer-avatar {
        width: 20px;
        height: 20px;
    }

    .size-small .customer-name {
        font-size: var(--font-size-s);
    }

    .size-small .customer-email {
        font-size: var(--font-size-xs);
    }

    .size-medium .customer-avatar {
        width: 24px;
        height: 24px;
    }

    .size-medium .customer-name {
        font-size: var(--font-size-s);
    }

    .size-medium .customer-email {
        font-size: var(--font-size-s);
    }

    .size-large .customer-avatar {
        width: 40px;
        height: 40px;
        border-radius: var(--radius-m);
        border: 2px solid var(--color-surface-tint);
    }

    .size-large .customer-name {
        font-size: var(--font-size-m);
    }

    .size-large .customer-email {
        font-size: var(--font-size-s);
    }

    .size-xlarge .customer-avatar {
        width: 64px;
        height: 64px;
        border-radius: var(--radius-l);
        border: 3px solid var(--color-surface-tint);
    }

    .size-xlarge .customer-name {
        font-size: var(--font-size-l);
    }

    .size-xlarge .customer-email {
        font-size: var(--font-size-m);
    }

    /* Hover effects */
    .widget-customer:hover .customer-avatar {
        transform: scale(1.05);
    }

    .size-large:hover .customer-avatar {
        transform: scale(1.1);
    }

    .size-xlarge:hover .customer-avatar {
        transform: scale(1.08);
    }
</style>
