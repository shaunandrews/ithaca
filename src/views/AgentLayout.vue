<template>
    <div class="agent-container">
        <header v-if="agent" ref="headerRef">
            <div class="agent-header-start">
                <div class="agent-selector">
                    <Dropdown
                        :selected-value="selectedAgentId"
                        :options="agentOptions"
                        :label="agent.title"
                        @select="selectAgent"
                    />
                </div>
                <NavigationTabs
                    :tabs="tabs"
                    :is-active-function="isActiveTab"
                    :disable-initial-transition="true"
                    @tab-click="handleTabClick"
                />
            </div>
            <div class="agent-header-end"></div>
        </header>

        <div v-else class="agent-not-found">
            <p>Agent not found.</p>
        </div>

        <div class="agent-content" :style="{ height: contentHeight }">
            <router-view v-if="agent" />
        </div>
    </div>
</template>

<script setup>
    import { computed, ref, onMounted, onUnmounted, provide, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { agents } from '@/data/agents.js';
    import NavigationTabs from '@/components/NavigationTabs.vue';
    import Dropdown from '@/components/Dropdown.vue';

    const route = useRoute();
    const router = useRouter();
    const agentId = computed(() => Number(route.params.id));
    const agent = computed(() => agents.find((a) => a.id === agentId.value));

    const selectedAgentId = ref(agentId.value);
    watch(agentId, (newVal) => {
        selectedAgentId.value = newVal;
    });

    const agentOptions = computed(() => 
        agents.map(agent => ({
            value: agent.id,
            label: agent.title
        }))
    );

    const tabs = computed(() => [
        { key: 'activity', label: 'Activity', href: `/agent/${agentId.value}/activity` },
        { key: 'insights', label: 'Insights', href: `/agent/${agentId.value}/insights` },
        { key: 'workbench', label: 'Workbench', href: `/agent/${agentId.value}/workbench` },
        { key: 'versions', label: 'Versions', href: `/agent/${agentId.value}/versions` }
    ]);

    const headerRef = ref(null);
    const headerHeight = ref(0);

    const contentHeight = computed(() => {
        return headerHeight.value > 0
            ? `calc(100vh - ${headerHeight.value}px)`
            : '100%';
    });

    // Provide header height to child components
    provide('headerHeight', headerHeight);

    function updateHeaderHeight() {
        if (headerRef.value) {
            headerHeight.value = headerRef.value.offsetHeight;
        }
    }

    function selectAgent(option) {
        selectedAgentId.value = option.value;
        goToAgent();
    }

    function goToAgent() {
        // Check if we're currently viewing a conversation (has activityId parameter)
        const isViewingConversation = route.params.activityId !== undefined;
        
        if (isViewingConversation) {
            // If viewing a conversation, redirect to the activity screen for the new agent
            router.push(`/agent/${selectedAgentId.value}/activity`);
        } else {
            // Otherwise, just replace the agent ID in the current path
            const newPath = route.path.replace(
                `/agent/${agentId.value}`,
                `/agent/${selectedAgentId.value}`
            );
            router.push(newPath);
        }
    }

    function isActiveTab(tabName) {
        const currentPath = route.path;
        const expectedPath = `/agent/${agentId.value}/${tabName}`;
        const defaultPath = `/agent/${agentId.value}`;

        if (tabName === 'activity') {
            return (
                currentPath === expectedPath ||
                currentPath === defaultPath ||
                currentPath.startsWith(`/agent/${agentId.value}/activity`)
            );
        }
        if (tabName === 'workbench') {
            return currentPath === expectedPath;
        }
        return currentPath === expectedPath;
    }

    function handleTabClick(tab) {
        router.push(tab.href);
    }

    onMounted(() => {
        updateHeaderHeight();
        window.addEventListener('resize', updateHeaderHeight);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', updateHeaderHeight);
    });
</script>

<style scoped>
    .agent-container {
        height: 100vh;
        display: flex;
        flex-direction: column;
    }

    .agent-content {
        flex: 1;
        overflow: hidden;
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
        min-height: var(--toolbar-height);
    }

    .agent-header-start,
    .agent-header-end {
        display: flex;
        align-items: center;
        gap: var(--space-m);
    }

    .agent-selector {
        min-width: 200px;
    }

    .agent-not-found {
        padding: var(--space-m);
        text-align: center;
    }
</style>
