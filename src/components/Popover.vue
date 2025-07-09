<template>
    <Teleport to="body">
        <div 
            v-if="show"
            ref="popoverRef"
            class="popover"
            :style="popoverStyle"
            :data-placement="placement"
            role="tooltip"
            :aria-labelledby="ariaLabelledBy"
            :aria-describedby="ariaDescribedBy"
        >
            <div class="popover-content">
                <slot name="content" />
            </div>
        </div>
    </Teleport>
</template>

<script setup>
    import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';
    import { usePopoverPosition } from '@/composables/usePopoverPosition';

    const props = defineProps({
        trigger: {
            type: Object,
            required: false,
            default: null
        },
        show: {
            type: Boolean,
            default: false
        },
        placement: {
            type: String,
            default: 'bottom',
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
        closeOnClickOutside: {
            type: Boolean,
            default: true
        },
        closeOnEscape: {
            type: Boolean,
            default: true
        },
        ariaLabelledBy: {
            type: String,
            default: null
        },
        ariaDescribedBy: {
            type: String,
            default: null
        }
    });

    const emit = defineEmits(['close']);

    const popoverRef = ref(null);
    
    const { position, placement, show: showPositioning, hide: hidePositioning } = usePopoverPosition(
        () => props.trigger,
        popoverRef,
        {
            preferredPlacement: props.placement,
            offset: props.offset
        }
    );

    const popoverStyle = computed(() => ({
        position: 'absolute',
        left: `${position.value.x}px`,
        top: `${position.value.y}px`,
        zIndex: 1000
    }));

    function handleClickOutside(event) {
        if (!props.closeOnClickOutside || !props.show) return;
        
        if (popoverRef.value && !popoverRef.value.contains(event.target) && 
            (!props.trigger || !props.trigger.contains(event.target))) {
            emit('close');
        }
    }

    function handleEscapeKey(event) {
        if (props.closeOnEscape && event.key === 'Escape' && props.show) {
            emit('close');
        }
    }

    watch(() => props.show, async (newShow) => {
        if (newShow && props.trigger) {
            await nextTick();
            showPositioning();
        } else {
            hidePositioning();
        }
    });

    // Watch for trigger changes to update positioning
    watch(() => props.trigger, async (newTrigger) => {
        if (props.show && newTrigger) {
            await nextTick();
            showPositioning();
        }
    });

    onMounted(() => {
        document.addEventListener('click', handleClickOutside, true);
        document.addEventListener('keydown', handleEscapeKey);
    });

    onUnmounted(() => {
        document.removeEventListener('click', handleClickOutside, true);
        document.removeEventListener('keydown', handleEscapeKey);
    });
</script>

<style scoped>
    .popover {
        background: var(--color-surface);
        color: var(--color-surface-fg);
        border: 1px solid var(--color-surface-tint);
        border-radius: var(--radius-s);
        max-width: 300px;
        min-width: 100px;
        opacity: 0;
        transform: scale(0.95);
        transition: opacity 0.15s ease, transform 0.15s ease;
        animation: popover-enter 0.15s ease forwards;
    }

    @keyframes popover-enter {
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