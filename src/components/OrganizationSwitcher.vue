<template>
    <div class="organization-switcher" :class="{'mini': mini}">
        <Dropdown
            :selected-value="selectedOrganization"
            placement="bottom-start"
            :mini="mini"
            @select="selectOrganization"
        >
            <template #trigger="{ isOpen }">
                <span class="organization-logo">
                    <img 
                        :src="selectedOrganizationData.logo" 
                        :alt="selectedOrganizationData.name"
                        height="32"
                        width="32"
                    />
                </span>
                <span v-if="!mini" class="organization-name">{{ selectedOrganizationData.name }}</span>
            </template>
            
            <template #content="{ close }">
                <ul class="organization-list" role="listbox">
                    <li
                        v-for="org in organizations"
                        :key="org.id"
                        class="organization-option"
                        :class="{ 'selected': org.id === selectedOrganization }"
                        @click="selectOrganization(org); close()"
                        role="option"
                        :aria-selected="org.id === selectedOrganization"
                        tabindex="0"
                        @keydown.enter="selectOrganization(org); close()"
                        @keydown.space.prevent="selectOrganization(org); close()"
                    >
                        <span class="organization-logo">
                            <img 
                                :src="org.logo" 
                                :alt="org.name"
                                height="32"
                                width="32"
                            />
                        </span>
                        <span class="organization-name">{{ org.name }}</span>
                        <CheckIcon v-if="org.id === selectedOrganization" class="selected-icon" />
                    </li>
                </ul>
            </template>
        </Dropdown>
    </div>
</template>

<script setup>
    import { defineEmits, defineProps, ref } from 'vue';
    import { CheckIcon } from 'lucide-vue-next';
    import Dropdown from './Dropdown.vue';

    const props = defineProps({
        mini: {
            type: Boolean,
            default: false
        }
    });

    const emit = defineEmits(['organization-change']);

    const organizations = [
        { id: 'automattic', name: 'Automattic', logo: '/images/logo-automattic.png' },
        { id: 'wordpress', name: 'WordPress', logo: '/images/logo-wordpress.png' },
        { id: 'day-one', name: 'Day One', logo: '/images/logo-day-one.png' }
    ];

    const selectedOrganization = ref('automattic');
    const selectedOrganizationData = ref(organizations.find(org => org.id === selectedOrganization.value) || organizations[0]);

    const selectOrganization = (org) => {
        selectedOrganization.value = org.id;
        selectedOrganizationData.value = org;
        emit('organization-change', org.id);
    };
</script>

<style scoped>
    .organization-logo {
        border-radius: var(--radius-s);
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ffffff;
        height: 18px;
        width: 18px;
        flex-shrink: 0;
    }

    .organization-switcher .organization-logo:first-of-type {
        margin-left: -2px;
        margin-right: var(--space-xxs);
    }

    .organization-switcher.mini .organization-logo:first-of-type {
        margin-left: 3px;
        margin-right: 0;
    }

    .organization-logo img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    .organization-list {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .organization-option {
        display: flex;
        align-items: center;
        gap: var(--space-s);
        padding: var(--space-s);
        cursor: pointer;
        transition: background-color 0.15s ease;
        border: none;
        background: none;
        width: 100%;
        text-align: left;
    }

    .organization-option:hover {
        background-color: var(--color-surface-hover);
    }

    .organization-option:focus {
        outline: none;
        background-color: var(--color-surface-hover);
    }

    .organization-option.selected {
        background-color: var(--color-primary-surface);
        color: var(--color-primary);
    }

    .organization-name {
        flex: 1;
        font-weight: var(--font-weight-medium);
    }

    .selected-icon {
        width: 16px;
        height: 16px;
        color: var(--color-primary);
    }
</style> 