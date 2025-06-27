<template>
    <ul
        v-if="show && filtered.length"
        class="autocomplete-menu"
        :style="{ left: x + 'px', top: y + 'px' }"
    >
        <li
            v-for="tool in filtered"
            :key="tool.title"
            :class="{ selected: tool.title === selected }"
            @mousedown.prevent="$emit('select', tool)"
        >
            <span v-if="tool.icon" class="autocomplete-icon">
                <img
                    :src="tool.icon"
                    :alt="tool.title"
                    width="16"
                    height="16"
                />
            </span>
            <div class="vstack">
                <span class="autocomplete-title">{{ tool.title }}</span>
                <span class="autocomplete-desc">{{ tool.description }}</span>
            </div>
        </li>
    </ul>
</template>

<script setup>
    import { defineProps, defineEmits } from 'vue';

    const props = defineProps({
        show: Boolean,
        filtered: Array, // Array of tool objects
        selected: String, // title of selected tool
        x: Number,
        y: Number,
    });

    const emit = defineEmits(['select']);
</script>

<style scoped>
    .autocomplete-menu {
        position: fixed;
        z-index: 1100;
        background-color: var(--color-tooltip);
        backdrop-filter: blur(10px);
        color: var(--color-tooltip-fg);
        border-radius: var(--radius-s);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        padding: 0;
        margin: 0;
        list-style: none;
        min-width: 220px;
        max-width: 320px;
        max-height: 240px;
        overflow-y: auto;
    }

    .autocomplete-menu li {
        display: flex;
        align-items: flex-start;
        gap: var(--space-xs);
        padding: var(--space-xs) var(--space-s);
        cursor: pointer;
    }

    .autocomplete-menu li.selected,
    .autocomplete-menu li:hover {
        outline: 1px solid var(--color-accent);
    }

    .autocomplete-icon {
        flex-shrink: 0;
    }

    .autocomplete-title {
        font-weight: var(--font-weight-medium);
    }

    .autocomplete-desc {
        flex: 1;
        white-space: normal;
        font-size: var(--font-size-s);
        line-height: var(--line-height-tight);
        opacity: 0.7;
    }
</style>
