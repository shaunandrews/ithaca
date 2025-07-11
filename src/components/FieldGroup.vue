<template>
    <div class="field-group">
        <label class="text-label" :for="fieldId">{{ label }}</label>
        <input 
            v-if="type === 'input'"
            :id="fieldId"
            :type="inputType"
            :value="modelValue"
            :placeholder="placeholder"
            @input="$emit('update:modelValue', $event.target.value)"
        />
        <textarea 
            v-else-if="type === 'textarea'"
            :id="fieldId"
            :value="modelValue"
            :placeholder="placeholder"
            :rows="rows"
            @input="$emit('update:modelValue', $event.target.value)"
        ></textarea>
        <p v-if="description" class="text-description">{{ description }}</p>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    modelValue: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'input',
        validator: (value) => ['input', 'textarea'].includes(value)
    },
    inputType: {
        type: String,
        default: 'text'
    },
    placeholder: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    rows: {
        type: Number,
        default: 3
    },
    id: {
        type: String,
        default: null
    }
});

const emit = defineEmits(['update:modelValue']);

const fieldId = computed(() => {
    return props.id || `field-${Math.random().toString(36).substr(2, 9)}`;
});
</script>

<style scoped>
.field-group {
    margin-bottom: var(--space-m);
}

.field-group label {
    display: block;
    margin-bottom: var(--space-xs);
}

.field-group input,
.field-group textarea {
    margin-bottom: var(--space-xs);
}

.field-group .text-description {
    margin-top: var(--space-xs);
    margin-bottom: 0;
}
</style>
