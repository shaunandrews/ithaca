<template>
    <button @click="handleClick" class="back-link">
        <ArrowLeft stroke-width="1.5" height="18" width="18" /> {{ text }}
    </button>
</template>

<script setup>
    import { ArrowLeft } from 'lucide-vue-next';
    import { useRouter } from 'vue-router';
    import { useConversationMemory } from '@/composables/useConversationMemory.js';

    const props = defineProps({
        to: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            default: 'Back',
        },
        clearMemory: {
            type: Boolean,
            default: false,
        },
        agentId: {
            type: Number,
            required: false,
        },
    });

    const router = useRouter();
    const { clearConversation } = useConversationMemory();

    function handleClick() {
        if (props.clearMemory && props.agentId) {
            clearConversation(props.agentId);
        }
        router.push(props.to);
    }
</script>
