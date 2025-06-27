<template>
  <li class="classifier-rating hstack" :class="ratingClass" @dblclick="onDoubleClick">
    <div class="item-details vstack">
      <span class="item-name">{{ classifier.name }}</span>
      
      <!-- Edit mode inline input -->
      <template v-if="isEditing">
        <div class="edit-inline" @click.stop>
          <input 
            ref="editInput"
            v-model="editValue" 
            @keyup.enter="submitEdit"
            @keyup.escape="cancelEdit"
            class="edit-field-inline"
            :placeholder="classifier.description"
          />
        </div>
      </template>
      
      <!-- Normal description display -->
      <template v-else>
        <span class="item-description">
          <template v-if="displayDescription.isEdited">
            <span class="old-value">{{ displayDescription.oldValue }}</span>
            <span class="arrow"> → </span>
            <span class="new-value">{{ displayDescription.newValue }}</span>
          </template>
          <template v-else>
            {{ displayDescription.value }}
          </template>
        </span>
      </template>
    </div>
    
    <!-- Actions -->
    <div class="item-actions vstack" @click.stop>
      <!-- Edit mode buttons -->
      <template v-if="isEditing">
        <button @click="submitEdit" class="submit-btn">
          <CheckCheck :size="16" />
        </button>
        <button @click="cancelEdit" class="cancel-btn">
          <X :size="16" />
        </button>
      </template>
      
      <!-- Show undo button when edited -->
      <template v-else-if="rating === 'edited'">
        <button @click="undoEdit" class="undo-btn">
          <Undo2 :size="16" />
        </button>
      </template>
      
      <!-- Show check/edit buttons when not edited -->
      <template v-else>
        <button @click="toggleApproved" :class="['check-btn', { active: rating === 'approved' }]">
          <Check :size="16" />
        </button>
        <button v-if="rating !== 'approved'" @click="startEdit" class="edit-btn">
          <Pencil :size="16" />
        </button>
      </template>
    </div>
  </li>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue';
import { Check, Pencil, Undo2, X, CheckCheck } from 'lucide-vue-next';

const props = defineProps({
  classifier: {
    type: Object,
    required: true,
  },
});

const rating = ref('neutral'); // 'neutral', 'approved', 'edited'
const isEditing = ref(false);
const editValue = ref('');
const editedValue = ref('');
const editInput = ref(null);

const ratingClass = computed(() => {
  if (isEditing.value) {
    return 'rating-editing';
  }
  switch (rating.value) {
    case 'approved':
      return 'rating-approved';
    case 'edited':
      return 'rating-edited';
    default:
      return '';
  }
});

const displayDescription = computed(() => {
  if (rating.value === 'edited' && editedValue.value) {
    return {
      isEdited: true,
      oldValue: props.classifier.description,
      newValue: editedValue.value
    };
  }
  return {
    isEdited: false,
    value: props.classifier.description
  };
});

function toggleApproved() {
  rating.value = rating.value === 'approved' ? 'neutral' : 'approved';
}

async function startEdit() {
  isEditing.value = true;
  editValue.value = props.classifier.description;
  await nextTick();
  editInput.value?.focus();
  editInput.value?.select();
}

function submitEdit() {
  if (editValue.value.trim() && editValue.value !== props.classifier.description) {
    editedValue.value = editValue.value.trim();
    rating.value = 'edited';
  }
  isEditing.value = false;
  editValue.value = '';
}

function cancelEdit() {
  isEditing.value = false;
  editValue.value = '';
}

function undoEdit() {
  rating.value = 'neutral';
  editedValue.value = '';
}

function onDoubleClick() {
  if (rating.value === 'neutral' && !isEditing.value) {
    startEdit();
  }
}
</script>

<style scoped>
.classifier-rating {
  justify-content: space-between;
  align-items: center;
  background: var(--color-surface);
  border: 1px solid var(--color-surface-tint-dark);
  border-radius: var(--radius-l);
  padding: var(--space-xxs);
  padding-left: var(--space-m);
  gap: var(--space-s);
  min-height: 75px;
  transition: all 0.2s ease;
}

.classifier-rating.rating-approved {
  background: rgba(34, 197, 94, 0.1);
  border-color: rgba(34, 197, 94, 0.3);
}

.classifier-rating.rating-edited {
  background: rgba(251, 191, 36, 0.1);
  border-color: rgba(251, 191, 36, 0.3);
}

.classifier-rating.rating-editing {
  background: rgba(251, 191, 36, 0.1);
  border-color: rgba(251, 191, 36, 0.3);
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
  font-size: var(--font-size-s);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rating-edited .item-description {
  font-family: monospace;
}

.old-value {
  text-decoration: line-through;
  opacity: 0.7;
}

.arrow {
  color: var(--color-chrome-fg-secondary);
  margin: 0 var(--space-xxs);
}

.new-value {
  font-weight: var(--font-weight-medium);
}

.item-actions {
  gap: 2px;
}

.item-actions button {
  border: none;
}

.rating-approved .item-actions button.check-btn.active {
  background: transparent;
  color: rgb(34, 197, 94);
  transform: scale(1.1);
}

.undo-btn {
  background: transparent;
  color: rgb(251, 191, 36);
}

.undo-btn:hover {
  background: var(--color-surface-tint-dark);
  transform: scale(1.05);
}

.edit-inline {
  width: 100%;
}

.edit-field-inline {
  background: transparent;
  border: none;
  color: var(--color-chrome-fg-secondary);
  font-size: var(--font-size-s);
  font-family: inherit;
  padding: 0;
  width: 100%;
  outline: none;
}

.edit-field-inline::placeholder {
  color: var(--color-chrome-fg-secondary);
  opacity: 0.5;
}

.submit-btn {
  background: var(--color-primary);
  color: white;
}

.submit-btn:hover {
  background: var(--color-primary-dark);
}

.cancel-btn {
  background: var(--color-surface-tint);
  color: var(--color-text);
}

.cancel-btn:hover {
  background: var(--color-surface-tint-dark);
}
</style> 