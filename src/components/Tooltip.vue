<template>
    <div 
        ref="triggerRef"
        @mouseenter="showTooltip"
        @mouseleave="hideTooltip"
        @focus="showTooltip"
        @blur="hideTooltip"
    >
        <slot />
    </div>
    
    <Teleport to="body">
        <div
            v-if="isVisible"
            ref="tooltipRef"
            class="tooltip"
            :style="tooltipStyle"
            :data-placement="actualPlacement"
            role="tooltip"
        >
            <div class="tooltip-content">
                <slot name="content">{{ content }}</slot>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
    import { ref, computed, nextTick, useSlots } from 'vue';
    import { usePopoverPosition } from '@/composables/usePopoverPosition';

    const $slots = useSlots();

    const props = defineProps({
        content: {
            type: String,
            default: ''
        },
        placement: {
            type: String,
            default: 'top',
            validator: (value) => [
                'top', 'top-start', 'top-end',
                'bottom', 'bottom-start', 'bottom-end',
                'left', 'left-start', 'left-end',
                'right', 'right-start', 'right-end'
            ].includes(value)
        },
        offset: {
            type: Number,
            default: 8
        },
        delay: {
            type: Number,
            default: 500
        }
    });

    const triggerRef = ref(null);
    const tooltipRef = ref(null);
    const isVisible = ref(false);
    let showTimeout = null;
    let hideTimeout = null;

    const { position, placement: actualPlacement, show: showPositioning, hide: hidePositioning } = usePopoverPosition(
        triggerRef,
        tooltipRef,
        {
            preferredPlacement: props.placement,
            offset: props.offset
        }
    );

    const tooltipStyle = computed(() => ({
        position: 'absolute',
        left: `${position.value.x}px`,
        top: `${position.value.y}px`,
        zIndex: 999999
    }));

    const showTooltip = () => {
        if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
        }

        if (!props.content && !$slots.content) return;

        showTimeout = setTimeout(async () => {
            isVisible.value = true;
            await nextTick();
            showPositioning();
        }, props.delay);
    };

    const hideTooltip = () => {
        if (showTimeout) {
            clearTimeout(showTimeout);
            showTimeout = null;
        }

        hideTimeout = setTimeout(() => {
            isVisible.value = false;
            hidePositioning();
        }, 100);
    };
</script>

<style scoped>
    .tooltip {
        pointer-events: none;
        animation: tooltip-fade-in 0.1s ease-in-out;
    }

    .tooltip-content {
        background: var(--color-tooltip);
        color: var(--color-tooltip-fg);
        padding: var(--space-xs) var(--space-s);
        border-radius: var(--radius-s);
        font-size: var(--font-size-s);
        backdrop-filter: blur(10px);
        max-width: 250px;
        word-wrap: break-word;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    @keyframes tooltip-fade-in {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
</style>
