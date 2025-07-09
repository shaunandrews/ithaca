<template>
    <div class="dropdown" :class="{ 'is-open': isOpen, 'mini': mini }">
        <!-- Trigger button -->
        <button 
            ref="triggerRef"
            class="dropdown-trigger"
            @click="toggleDropdown"
            :aria-expanded="isOpen"
            :aria-haspopup="true"
            :aria-controls="isOpen ? dropdownId : undefined"
        >
            <div class="dropdown-trigger-content">
                <slot name="trigger" :is-open="isOpen">
                    <!-- Default trigger content -->
                    <span class="dropdown-label">{{ label }}</span>
                </slot>
            </div>
            <ChevronDownIcon 
                v-if="!mini"
                class="dropdown-chevron" 
                stroke-width="1.5" 
                width="12" 
                height="12" 
                :class="{ 'rotated': isOpen }" 
            />
        </button>

        <!-- Dropdown content -->
        <Popover 
            :trigger="triggerRef"
            :show="isOpen"
            :placement="placement"
            @close="closeDropdown"
            :ariaLabelledBy="dropdownId"
        >
            <template #content>
                <div class="dropdown-content" role="listbox" :id="dropdownId">
                    <slot name="content" :close="closeDropdown">
                        <!-- Default content for simple dropdowns -->
                        <div
                            v-for="option in options"
                            :key="option.value"
                            class="dropdown-option"
                            :class="{ 'selected': option.value === selectedValue }"
                            @click="selectOption(option)"
                            role="option"
                            :aria-selected="option.value === selectedValue"
                            tabindex="0"
                            @keydown.enter="selectOption(option)"
                            @keydown.space.prevent="selectOption(option)"
                        >
                            {{ option.label }}
                        </div>
                    </slot>
                </div>
            </template>
        </Popover>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { ChevronDownIcon } from 'lucide-vue-next';
    import Popover from './Popover.vue';

    const props = defineProps({
        label: {
            type: String,
            default: ''
        },
        options: {
            type: Array,
            default: () => []
        },
        selectedValue: {
            type: [String, Number],
            default: null
        },
        placement: {
            type: String,
            default: 'bottom-start'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        mini: {
            type: Boolean,
            default: false
        }
    });

    const emit = defineEmits(['select', 'open', 'close']);

    const isOpen = ref(false);
    const triggerRef = ref(null);
    const dropdownId = computed(() => `dropdown-${Math.random().toString(36).substr(2, 9)}`);

    const toggleDropdown = () => {
        if (props.disabled) return;
        
        if (isOpen.value) {
            closeDropdown();
        } else {
            openDropdown();
        }
    };

    const openDropdown = () => {
        isOpen.value = true;
        emit('open');
    };

    const closeDropdown = () => {
        isOpen.value = false;
        emit('close');
    };

    const selectOption = (option) => {
        emit('select', option);
        closeDropdown();
    };
</script>

<style scoped>
    .dropdown {
        position: relative;
        display: inline-block;
        width: 100%;
    }

    .dropdown-trigger {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-xxs);
        padding: var(--space-xxs) var(--space-xs);
        background: var(--color-surface);
        border: 1px solid var(--color-surface-tint-dark);
        border-radius: var(--radius);
        cursor: pointer;
        transition: var(--transition-quick);
        color: var(--color-surface-fg);
        font-size: var(--font-size-s);
        width: 100%;
        text-align: left;
    }

    .dropdown-trigger:hover {
        background: var(--color-surface-tint);
    }

    .dropdown-trigger:focus {
        background: var(--color-surface-tint);
        outline: 2px solid var(--color-accent);
    }

    .dropdown-trigger:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .dropdown.mini .dropdown-trigger {
        padding: var(--space-xxs);
        justify-content: center;
        border: transparent;
    }

    .dropdown-trigger-content {
        display: flex;
        align-items: center;
        gap: var(--space-xxs);
        flex: 1;
    }

    .dropdown-label {
        flex: 1;
        font-weight: 500;
    }

    .dropdown-chevron {
        transition: var(--transition-quick);
        color: var(--color-surface-fg-secondary);
        flex-shrink: 0;
    }

    .dropdown-chevron.rotated {
        transform: rotate(180deg);
    }

    .dropdown-content {
        background: var(--color-surface);
        border: 1px solid var(--color-surface-tint-dark);
        border-radius: var(--radius);
        font-size: var(--font-size-s);
        color: var(--color-surface-fg);
        min-width: 150px;
        max-height: 300px;
        overflow-y: auto;
        padding: 0;
    }

    .dropdown-option {
        width: 100%;
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        padding: var(--space-xs);
        padding-right: var(--space-m);
        background: transparent;
        border: none;
        border-top: 1px solid var(--color-surface-tint-light);
        cursor: pointer;
        transition: var(--transition-quick);
        color: var(--color-surface-fg);
        font-size: var(--font-size-s);
        text-align: left;
    }

    .dropdown-option:first-child {
        border-top: none;
    }

    .dropdown-option:hover {
        background: var(--color-surface-tint-light);
    }

    .dropdown-option:focus {
        outline: none;
        border-radius: var(--radius-s);
        margin: 1px;
        box-shadow: inset 0 0 0 2px var(--color-accent);
    }

    .dropdown-option.selected {
        background: var(--color-primary-subtle);
        color: var(--color-primary);
    }
</style> 