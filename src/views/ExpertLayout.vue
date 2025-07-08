<template>
    <div class="expert-container">
        <header v-if="expert">
            <div class="expert-header-start">
                <h2 class="expert-title">{{ expert.title }}</h2>
                <NavigationTabs
                    :tabs="tabs"
                    :is-active-function="isActiveTab"
                    :disable-initial-transition="true"
                    @tab-click="handleTabClick"
                />
            </div>
            <div class="expert-header-end">
                <button class="primary">Save</button>
            </div>
        </header>

        <div v-else class="expert-not-found">
            <p>Expert not found.</p>
        </div>

        <router-view v-if="expert" />
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { experts } from '@/data/experts.js';
    import NavigationTabs from '@/components/NavigationTabs.vue';

    const route = useRoute();
    const router = useRouter();
    const expertId = computed(() => Number(route.params.id));
    const expert = computed(() => experts.find((e) => e.id === expertId.value));

    const tabs = computed(() => [
        { key: 'activity', label: 'Activity', href: `/expert/${expertId.value}/activity` },
        { key: 'workbench', label: 'Workbench', href: `/expert/${expertId.value}/workbench` },
        { key: 'insights', label: 'Insights', href: `/expert/${expertId.value}/insights` },
        { key: 'versions', label: 'Versions', href: `/expert/${expertId.value}/versions` }
    ]);

    function isActiveTab(tabName) {
        const currentPath = route.path;
        const expectedPath = `/expert/${expertId.value}/${tabName}`;
        const defaultPath = `/expert/${expertId.value}`;

        if (tabName === 'activity') {
            return (
                currentPath === expectedPath ||
                currentPath === defaultPath ||
                currentPath.startsWith(`/expert/${expertId.value}/activity`)
            );
        }
        return currentPath === expectedPath;
    }

    function handleTabClick(tab) {
        router.push(tab.href);
    }
</script>

<style scoped>
    .expert-container {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-m);
        padding: var(--space-s) var(--space-m);
        background-color: var(--color-chrome-transparent);
        border-bottom: 1px solid var(--color-surface-tint);
        position: sticky;
        top: 0;
        backdrop-filter: blur(12px);
    }

    .expert-header-start,
    .expert-header-end {
        display: flex;
        align-items: center;
        gap: var(--space-m);
    }

    header h2 {
        font-size: var(--font-size-m);
        font-weight: var(--font-weight-semibold);
    }



    .expert-not-found {
        padding: var(--space-m);
        text-align: center;
    }
</style>
