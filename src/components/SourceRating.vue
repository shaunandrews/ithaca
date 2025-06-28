<template>
    <li
        class="source-rating hstack"
        :class="ratingClass"
        @click="$emit('view-source', source)"
    >
        <component 
            :is="rating === 'neutral' ? CircleDashed : CircleSlash" 
            :size="12"
            stroke-width="2.5"
            class="bullet"
        />
        <div class="item-details vstack">
            <span class="item-name">{{ source.name }}</span>
            <span class="item-description">{{ source.description }}</span>
        </div>
        <div class="item-actions vstack" @click.stop>
            <button
                @click="toggleCorrect"
                :class="['thumbsup small', { active: rating === 'correct' }]"
            >
                <ThumbsUp :size="16" />
            </button>
            <button
                @click="toggleIncorrect"
                :class="['thumbsdown small', { active: rating === 'incorrect' }]"
            >
                <ThumbsDown :size="16" />
            </button>
        </div>
    </li>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { ThumbsUp, ThumbsDown, CircleDashed, CircleSlash } from 'lucide-vue-next';

    defineProps({
        source: {
            type: Object,
            required: true,
        },
    });

    defineEmits(['view-source']);

    const rating = ref('neutral'); // 'correct', 'incorrect', or 'neutral'

    const ratingClass = computed(() => {
        switch (rating.value) {
            case 'correct':
                return 'rating-correct';
            case 'incorrect':
                return 'rating-incorrect';
            default:
                return '';
        }
    });

    function toggleCorrect() {
        rating.value = rating.value === 'correct' ? 'neutral' : 'correct';
    }

    function toggleIncorrect() {
        rating.value = rating.value === 'incorrect' ? 'neutral' : 'incorrect';
    }
</script>

<style scoped>
    .source-rating {
        justify-content: space-between;
        padding: var(--space-xs) var(--space-xs);
        gap: var(--space-xs);
        border-top: 1px solid var(--color-surface-tint);
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .bullet {
        color: var(--color-accent);
        height: 24px;
    }

    .source-rating.rating-correct {
        background: rgba(34, 197, 94, 0.1);
    }

    .source-rating.rating-incorrect {
        background: rgba(239, 68, 68, 0.1);
    }

    .item-details {
        flex: 1;
        min-width: 0;
    }

    .item-name {
        color: var(--color-accent);
        font-weight: var(--font-weight-medium);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .source-rating:hover .item-name {
        text-decoration: underline;
    }

    .item-description {
        color: var(--color-chrome-fg-secondary);
        font-size: var(--font-size-s);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .item-actions {
        gap: 2px;
    }

    .item-actions button {
        border: none;
        transition: all 0.2s ease;
    }

    .item-actions button:hover {
        background: var(--color-surface-tint);
    }

    .item-actions button.active {
        background: var(--color-surface-tint);
        color: var(--color-text);
    }

    .rating-correct .item-actions button,
    .rating-incorrect .item-actions button {
        background: none;
    }

    .rating-correct .item-actions button.active {
        color: rgb(34, 197, 94);
        transform: scale(1.2) rotate(8deg);
    }

    .rating-incorrect .item-actions button.active {
        color: rgb(239, 68, 68);
        transform: scale(1.2) rotate(-8deg);
    }

    .rating-correct .item-actions button.thumbsdown,
    .rating-incorrect .item-actions button.thumbsup {
        opacity: 0.2;
        transform: scale(0.9);
    }
</style>
