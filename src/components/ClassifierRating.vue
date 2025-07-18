<template>
    <li
        class="classifier-rating hstack"
        :class="ratingClass"
        @dblclick="onDoubleClick"
    >
        <component 
            :is="rating === 'neutral' ? CircleDashed : CircleSlash" 
            :size="12"
            stroke-width="1.5"
            class="bullet"
        />
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
                        <span class="old-value">{{
                            displayDescription.oldValue
                        }}</span>
                        <span class="arrow"> → </span>
                        <span class="new-value">{{
                            displayDescription.newValue
                        }}</span>
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
                <button @click="submitEdit" class="small submit-btn">
                    <CheckCheck :size="16" stroke-width="1.5" />
                </button>
                <button @click="cancelEdit" class="small cancel-btn">
                    <X :size="16" stroke-width="1.5" />
                </button>
            </template>

            <!-- Show undo button when edited -->
            <template v-else-if="rating === 'edited'">
                <button @click="undoEdit" class="small undo-btn">
                    <Undo2 :size="16" stroke-width="1.5" />
                </button>
            </template>

            <!-- Show check/edit buttons when not edited -->
            <template v-else>
                <button
                    @click="toggleApproved"
                    :class="['small check-btn', { active: rating === 'approved' }]"
                >
                    <Check :size="16" stroke-width="1.5" />
                </button>
                <button
                    v-if="rating !== 'approved'"
                    @click="startEdit"
                    class="small edit-btn"
                >
                    <Pencil :size="16" stroke-width="1.5" />
                </button>
            </template>
        </div>
    </li>
</template>

<script setup>
    import { ref, computed, nextTick, watch } from 'vue';
    import { Check, Pencil, Undo2, X, CheckCheck, CircleDashed, CircleSlash } from 'lucide-vue-next';

    const props = defineProps({
        classifier: {
            type: Object,
            required: true,
        },
        approveAllTrigger: {
            type: Number,
            default: 0,
        },
    });

    const rating = ref('neutral'); // 'neutral', 'approved', 'edited'
    const isEditing = ref(false);
    const editValue = ref('');
    const editedValue = ref('');
    const editInput = ref(null);
    const wasAutoApproved = ref(false); // Track if this was approved by "approve all" button

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
                newValue: editedValue.value,
            };
        }
        return {
            isEdited: false,
            value: props.classifier.description,
        };
    });

    function toggleApproved() {
        rating.value = rating.value === 'approved' ? 'neutral' : 'approved';
        wasAutoApproved.value = false; // Manual action, clear auto-approved flag
    }

    async function startEdit() {
        isEditing.value = true;
        editValue.value = props.classifier.description;
        await nextTick();
        editInput.value?.focus();
        editInput.value?.select();
    }

    function submitEdit() {
        if (
            editValue.value.trim() &&
            editValue.value !== props.classifier.description
        ) {
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

    // Watch for approve all trigger
    watch(() => props.approveAllTrigger, (newValue, oldValue) => {
        if (newValue > oldValue) {
            // Positive change: approve, but only if currently neutral
            if (rating.value === 'neutral') {
                rating.value = 'approved';
                wasAutoApproved.value = true;
            }
        } else if (newValue < oldValue) {
            // Negative change: reset to neutral, but only if it was auto-approved
            if (wasAutoApproved.value && rating.value === 'approved') {
                rating.value = 'neutral';
                wasAutoApproved.value = false;
            }
        }
    });
</script>

<style scoped>
    .classifier-rating {
        justify-content: space-between;
        align-items: center;
        padding: var(--space-xxs);
        padding-left: var(--space-m);
        gap: var(--space-s);
        min-height: 75px;
        border-top: 1px solid var(--color-surface-tint);
        transition: all 0.2s ease;
    }

    .classifier-rating.rating-approved {
        background: rgba(34, 197, 94, 0.1);
    }

    .classifier-rating.rating-edited {
        background: rgba(251, 191, 36, 0.1);
    }

    .classifier-rating.rating-editing {
        background: rgba(251, 191, 36, 0.1);
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
        color: rgb(34, 197, 94);
        transform: scale(1.1);
    }

    .undo-btn {
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
        background: var(--color-accent);
        color: var(--color-accent-fg);
    }
</style>
