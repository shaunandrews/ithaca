<template>
    <div class="organization-switcher">
        <select 
            v-model="selectedOrganization"
            @change="handleOrganizationChange"
        >
            <button>
                <selectedContent></selectedContent>
            </button>
            <option 
                v-for="org in organizations" 
                :key="org.id" 
                :value="org.id"
            >
                <div class="organization-option hstack">
                    <span class="organization-logo">
                        <img 
                            :src="org.logo" 
                            :alt="org.name"
                            height="32"
                            width="32"
                        />
                    </span>
                    <span>{{ org.name }}</span>
                </div>
            </option>
        </select>
    </div>
</template>

<script setup>
    import { defineEmits, ref } from 'vue';

    const emit = defineEmits(['organization-change']);

    const organizations = [
        { id: 'automattic', name: 'Automattic', logo: '/images/logo-automattic.png' },
        { id: 'wordpress', name: 'WordPress', logo: '/images/logo-wordpress.png' },
        { id: 'day-one', name: 'Day One', logo: '/images/logo-day-one.png' }
    ];

    const selectedOrganization = ref('automattic');
    const selectedOrganizationData = ref(organizations.find(org => org.id === selectedOrganization.value) || organizations[0]);

    const handleOrganizationChange = () => {
        const org = organizations.find(org => org.id === selectedOrganization.value);
        if (org) {
            selectedOrganizationData.value = org;
            emit('organization-change', org.id);
        }
    };
</script>

<style scoped>
    .organization-switcher {
        width: 100%;
        flex: 1;
    }

    .organization-switcher select {
        width: 100%;
        padding-left: var(--space-xxs);
    }

    .organization-switcher option {
        
    }

    .organization-option {
        align-items: center;
        gap: var(--space-xs);
    }

    .organization-logo {
        border-radius: var(--radius-s);
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ffffff;
        height: 32px;
        width: 32px;
    }

    .organization-logo img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
</style> 