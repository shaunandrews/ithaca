<template>
    <div class="nav-item" :class="{ active: isActive, 'nav-item--mini': mini }">
        <router-link :to="to" :title="mini ? label : ''">
            <component
                v-if="icon"
                :is="iconComponent"
                class="nav-icon"
                :stroke-width="1.5"
            />
            <span v-show="!mini">{{ label }}</span>
        </router-link>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import * as LucideIcons from 'lucide-vue-next';

    const props = defineProps({
        to: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        activeRoutes: {
            type: Array,
            default: () => [],
        },
        icon: {
            type: String,
            default: null,
        },
        mini: {
            type: Boolean,
            default: false,
        },
    });

    const route = useRoute();

    const iconComponent = computed(() => {
        if (!props.icon) return null;
        return LucideIcons[props.icon] || null;
    });

    const isActive = computed(() => {
        if (props.activeRoutes.length > 0) {
            return props.activeRoutes.some((activeRoute) => {
                if (typeof activeRoute === 'string') {
                    return (
                        route.name === activeRoute ||
                        route.path.startsWith(activeRoute)
                    );
                }
                return route.name === activeRoute;
            });
        }
        return route.name === props.label || route.path === props.to;
    });
</script>

<style scoped>
    .nav-item a {
        cursor: pointer;
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-medium);
        padding: var(--space-xs);
        border-radius: var(--radius);
        color: var(--color-chrome-fg-secondary);
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        transition: all 0.15s ease-in-out;
    }

    .nav-item a:has(span:only-child) {
        justify-content: center;
    }

    .nav-icon {
        width: 18px;
        height: 18px;
        flex-shrink: 0;
    }

    .nav-item.active a {
        color: var(--color-chrome-fg);
        background-color: var(--color-surface-tint-dark);
    }

    .nav-item:not(.active) a:hover {
        color: var(--color-chrome-fg);
        background-color: var(--color-surface-tint);
    }

    /* Mini state styling */
    .nav-item--mini a {
        width: 32px;
        height: 32px;
        padding: var(--space-xxs);
        justify-content: center;
        gap: 0;
    }

    .nav-item--mini .nav-icon {
        width: 20px;
        height: 20px;
    }
</style>
