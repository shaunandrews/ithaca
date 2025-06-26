<template>
  <li class="source-rating hstack" :class="ratingClass" @click="$emit('view-source', source)">
    <div class="item-details vstack">
      <span class="item-name">{{ source.name }}</span>
      <span class="item-description">{{ source.description }}</span>
    </div>
    <div class="item-actions vstack" @click.stop>
      <button @click="toggleCorrect" :class="['thumbsup', { active: rating === 'correct' }]">
        <ThumbsUp :size="16" />
      </button>
      <button @click="toggleIncorrect" :class="['thumbsdown', { active: rating === 'incorrect' }]">
        <ThumbsDown :size="16" />
      </button>
    </div>
  </li>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ThumbsUp, ThumbsDown } from 'lucide-vue-next';

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
  align-items: center;
  background: var(--color-surface);
  border: 0.5px solid var(--color-surface-tint-dark);
  border-radius: var(--radius-l);
  padding: var(--space-xxs);
  padding-left: var(--space-m);
  gap: var(--space-s);
  cursor: pointer;
  min-height: 75px;
  transition: all 0.2s ease;
}

.source-rating:hover {
  background: var(--color-surface-tint);
}

.source-rating.rating-correct {
  background: rgba(34, 197, 94, 0.1);
  border-color: rgba(34, 197, 94, 0.3);
}

.source-rating.rating-correct:hover {
  background: rgba(34, 197, 94, 0.15);
}

.source-rating.rating-incorrect {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.3);
}

.source-rating.rating-incorrect:hover {
  background: rgba(239, 68, 68, 0.15);
}

.item-details {
  flex: 1;
  min-width: 0;
}

.item-name {
  font-weight: var(--font-weight-semibold);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-description {
  color: var(--color-chrome-fg-secondary);
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