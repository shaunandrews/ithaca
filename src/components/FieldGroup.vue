<template>
    <div class="field-group">
        <label class="text-label" :for="fieldId">{{ label }}</label>
        <input 
            v-if="type === 'input'"
            :id="fieldId"
            :type="inputType"
            :value="modelValue"
            :placeholder="placeholder"
            :min="min"
            :max="max"
            :step="step"
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
        <select
            v-else-if="type === 'select'"
            :id="fieldId"
            :value="modelValue"
            @change="$emit('update:modelValue', $event.target.value)"
        >
            <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
            <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
            >
                {{ option.label }}
            </option>
        </select>
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
        type: [String, Number],
        default: ''
    },
    type: {
        type: String,
        default: 'input',
        validator: (value) => ['input', 'textarea', 'select'].includes(value)
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
    },
    options: {
        type: Array,
        default: () => []
    },
    min: {
        type: [Number, String],
        default: undefined
    },
    max: {
        type: [Number, String],
        default: undefined
    },
    step: {
        type: [Number, String],
        default: undefined
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
.field-group textarea,
.field-group select {
    margin-bottom: var(--space-xs);
}

.field-group .text-description {
    margin-top: var(--space-xs);
    margin-bottom: 0;
}
</style>
