<template>
    <div class="agent-container">
        <header v-if="agent" ref="headerRef">
            <div class="agent-header-start">
                <select
                    v-model.number="selectedAgentId"
                    @change="goToAgent"
                >
                    <button>
                        <selectedcontent />
                    </button>
                    <option v-for="a in agents" :key="a.id" :value="a.id">
                        {{ a.title }}
                    </option>
                </select>
                <nav>
                    <ul>
                        <li :class="{ active: isActiveTab('activity') }">
                            <router-link :to="`/agent/${agent.id}/activity`"
                                >Activity</router-link
                            >
                        </li>
                        <li :class="{ active: isActiveTab('insights') }">
                            <router-link :to="`/agent/${agent.id}/insights`"
                                >Insights</router-link
                            >
                        </li>
                        <li :class="{ active: isActiveTab('workbench') }">
                            <router-link :to="`/agent/${agent.id}/workbench`"
                                >Workbench</router-link
                            >
                        </li>
                        <li :class="{ active: isActiveTab('versions') }">
                            <router-link :to="`/agent/${agent.id}/versions`"
                                >Versions</router-link
                            >
                        </li>
                    </ul>
                </nav>
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

    const route = useRoute();
    const router = useRouter();
    const agentId = computed(() => Number(route.params.id));
    const agent = computed(() => agents.find((a) => a.id === agentId.value));

    const selectedAgentId = ref(agentId.value);
    watch(agentId, (newVal) => {
        selectedAgentId.value = newVal;
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

    nav ul {
        display: flex;
        gap: var(--space-xxs);
        padding: 0;
        margin: 0;
    }

    nav li {
        list-style: none;
    }

    nav li a {
        text-decoration: none;
        color: var(--color-chrome-fg-secondary);
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-medium);
        padding: var(--space-xxs) var(--space-xs);
        border-radius: var(--radius);
        display: block;
    }

    nav li.active a {
        color: var(--color-chrome-fg);
        background-color: var(--color-surface-tint-dark);
    }

    nav li a:hover:not(.active) {
        background-color: var(--color-surface-tint);
    }

    .agent-not-found {
        padding: var(--space-m);
        text-align: center;
    }
</style>
