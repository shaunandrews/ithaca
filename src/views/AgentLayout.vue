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
    import { useConversationMemory } from '@/composables/useConversationMemory.js';
    import NavigationTabs from '@/components/NavigationTabs.vue';
    import Dropdown from '@/components/Dropdown.vue';

    const route = useRoute();
    const router = useRouter();
    const agentId = computed(() => Number(route.params.id));
    const agent = computed(() => agents.find((a) => a.id === agentId.value));
    const { getLastConversation, hasStoredConversation } = useConversationMemory();

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

    const tabs = computed(() => {
        const lastConversationId = getLastConversation(agentId.value);
        const activityHref = lastConversationId 
            ? `/agent/${agentId.value}/activity/${lastConversationId}`
            : `/agent/${agentId.value}/activity`;

        return [
            { key: 'activity', label: 'Activity', href: activityHref },
            { key: 'insights', label: 'Insights', href: `/agent/${agentId.value}/insights` },
            { key: 'workbench', label: 'Workbench', href: `/agent/${agentId.value}/workbench` },
            { key: 'versions', label: 'Versions', href: `/agent/${agentId.value}/versions` }
        ];
    });

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
            // Check if the new agent has a stored conversation
            const lastConversationId = getLastConversation(selectedAgentId.value);
            const activityPath = lastConversationId 
                ? `/agent/${selectedAgentId.value}/activity/${lastConversationId}`
                : `/agent/${selectedAgentId.value}/activity`;
            router.push(activityPath);
        } else {
            // Otherwise, just replace the agent ID in the current path
            let newPath = route.path.replace(
                `/agent/${agentId.value}`,
                `/agent/${selectedAgentId.value}`
            );
            
            // If we're going to the activity tab and there's a stored conversation, include it
            if (newPath === `/agent/${selectedAgentId.value}/activity` || newPath === `/agent/${selectedAgentId.value}`) {
                const lastConversationId = getLastConversation(selectedAgentId.value);
                if (lastConversationId) {
                    newPath = `/agent/${selectedAgentId.value}/activity/${lastConversationId}`;
                }
            }
            
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
