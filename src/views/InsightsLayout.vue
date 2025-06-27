<template>
    <div class="insights-container">
        <header ref="headerRef">
            <div class="insights-header-start">
                <h2 class="insights-title">Insights</h2>
                <p class="insights-subtitle">
                    Analytics and performance data across your agents, experts,
                    and tools
                </p>
                <nav>
                    <ul>
                        <li :class="{ active: isActiveTab('topics') }">
                            <router-link to="/insights/topics"
                                >Topics</router-link
                            >
                        </li>
                        <li :class="{ active: isActiveTab('sentiment') }">
                            <router-link to="/insights/sentiment"
                                >Sentiment</router-link
                            >
                        </li>
                        <li :class="{ active: isActiveTab('performance') }">
                            <router-link to="/insights/performance"
                                >Performance</router-link
                            >
                        </li>
                        <li :class="{ active: isActiveTab('activity') }">
                            <router-link to="/insights/activity"
                                >Activity</router-link
                            >
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="insights-header-end">
                <select v-model="timeRange" @change="updateTimeRange">
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                </select>
            </div>
        </header>

        <div class="insights-content" :style="{ height: contentHeight }">
            <router-view />
        </div>
    </div>
</template>

<script setup>
    import { computed, ref, onMounted, onUnmounted, provide } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const headerRef = ref(null);
    const headerHeight = ref(0);
    const timeRange = ref('30d');

    const contentHeight = computed(() => {
        return headerHeight.value > 0
            ? `calc(100vh - ${headerHeight.value}px)`
            : '100%';
    });

    // Provide header height and time range to child components
    provide('headerHeight', headerHeight);
    provide('timeRange', timeRange);

    function updateHeaderHeight() {
        if (headerRef.value) {
            headerHeight.value = headerRef.value.offsetHeight;
        }
    }

    function updateTimeRange() {
        // Emit time range change to child components if needed
        // This can be used by child components to react to time range changes
    }

    function isActiveTab(tabName) {
        const currentPath = route.path;
        const expectedPath = `/insights/${tabName}`;
        const defaultPath = `/insights`;

        if (tabName === 'topics') {
            return currentPath === expectedPath || currentPath === defaultPath;
        }
        return currentPath === expectedPath;
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
    .insights-container {
        height: 100vh;
        display: flex;
        flex-direction: column;
    }

    .insights-content {
        flex: 1;
        overflow: hidden;
    }

    header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: var(--space-m);
        padding: var(--space-s) var(--space-m);
        background-color: var(--color-chrome-transparent);
        border-bottom: 1px solid var(--color-surface-tint);
        position: sticky;
        top: 0;
        backdrop-filter: blur(12px);
    }

    .insights-header-start {
        display: flex;
        flex-direction: column;
        gap: var(--space-xs);
    }

    .insights-header-end {
        display: flex;
        align-items: center;
        gap: var(--space-m);
    }

    header h2 {
        font-size: var(--font-size-xl);
        font-weight: 600;
        color: var(--color-surface-fg);
        margin: 0;
    }

    .insights-subtitle {
        color: var(--color-surface-fg-secondary);
        font-size: var(--font-size-s);
        margin: 0 0 var(--space-s) 0;
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

    .insights-header-end select {
        padding: var(--space-xs) var(--space-s);
        border: 1px solid var(--color-surface-tint);
        border-radius: var(--radius);
        background-color: var(--color-surface);
        color: var(--color-surface-fg);
    }

    @media (max-width: 768px) {
        header {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--space-s);
        }

        .insights-header-start {
            width: 100%;
        }

        .insights-header-end {
            width: 100%;
            justify-content: flex-end;
        }
    }
</style>
