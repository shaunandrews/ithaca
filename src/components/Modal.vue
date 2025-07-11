<template>
    <div v-if="isOpen" class="modal-scrim" @click.self="handleClose">
        <div class="modal-content">
            <button class="modal-close" @click="handleClose"><XIcon /></button>
            <slot />
        </div>
    </div>
</template>

<script setup>
    import { defineProps, defineEmits } from 'vue';
    import { XIcon } from 'lucide-vue-next';

    const props = defineProps({
        isOpen: {
            type: Boolean,
            required: true,
        },
    });

    const emit = defineEmits(['close']);

    function handleClose() {
        emit('close');
    }
</script>

<style scoped>
    .modal-scrim {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

    .modal-content {
        background: var(--color-surface);
        color: var(--color-surface-fg);
        border-radius: 8px;
        padding: 2rem;
        position: relative;
        min-width: 300px;
        max-width: 90vw;
        max-height: 90vh;
        box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);
        overflow: auto;
    }

    .modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: transparent;
        border: none;
        font-size: var(--font-size-l);
        cursor: pointer;
    }
</style>
