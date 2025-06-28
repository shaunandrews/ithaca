<template>
    <aside class="sidebar" :class="{ 'sidebar-mini': mini }">
        <div class="sidebar-start">
            <h1 class="logo">
                <img
                    src="/images/logo.png"
                    alt="Ithaca"
                    height="56"
                    width="56"
                />
            </h1>
            <nav>
                <NavItem
                    to="/insights"
                    label="Insights"
                    :active-routes="[
                        'Insights',
                        'InsightsTopicsDefault',
                        'InsightsTopics',
                        'InsightsSentiment',
                        'InsightsPerformance',
                        'InsightsActivity',
                    ]"
                    icon="Microscope"
                    :mini="mini"
                />
                <NavItem
                    to="/"
                    label="Agents"
                    :active-routes="['Agents', 'Agent', '/agent']"
                    icon="Bot"
                    :mini="mini"
                />
                <NavItem
                    to="/experts"
                    label="Experts"
                    :active-routes="['Experts']"
                    icon="FlaskConical"
                    :mini="mini"
                />
                <NavItem
                    to="/tools"
                    label="Tools"
                    :active-routes="['Tools']"
                    icon="Hammer"
                    :mini="mini"
                />
            </nav>
        </div>
        <div class="sidebar-end">
            <div class="user">
                <img
                    src="/images/avatar-shaunandrews.png"
                    alt="Shaun Andrews"
                    height="32"
                    width="32"
                />
            </div>
            <button
                v-if="!isMobile || mini"
                class="sidebar-toggle"
                @click="emit('toggle')"
                :aria-label="mini ? 'Expand sidebar' : 'Collapse sidebar'"
            >
                <PanelLeft stroke-width="1.5" />
            </button>
        </div>
    </aside>
</template>

<script setup>
    import { defineProps, defineEmits } from 'vue';
    import { PanelLeft, PanelLeftOpen, Microscope } from 'lucide-vue-next';
    import NavItem from './NavItem.vue';

    const props = defineProps({
        mini: Boolean,
        isMobile: Boolean,
    });

    const emit = defineEmits(['toggle']);
</script>

<style scoped>
    .sidebar {
        width: var(--sidebar-width);
        min-width: var(--sidebar-width);
        border-right: 1px solid var(--color-surface-tint);
        padding: var(--space-s);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: var(--space-m);
        transition: all 0.2s ease-in-out;
    }

    .sidebar-start {
        display: flex;
        flex-direction: column;
        gap: var(--space-m);
    }

    .sidebar-end {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: var(--space-m);
    }

    .sidebar-mini .sidebar-end {
        flex-direction: column;
    }

    .logo {
        font-size: var(--font-size-l);
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        height: 56px;
        width: 56px;
        margin: 0 auto;
        transition: all 0.2s ease-in-out;
    }

    .logo img {
        height: 100%;
        width: 100%;
    }

    .sidebar-mini .logo {
        gap: 0;
        height: 32px;
        width: 32px;
    }

    nav {
        display: flex;
        flex-direction: column;
        gap: var(--space-xxs);
    }

    .user {
        background-color: var(--color-surface-tint);
        color: var(--color-chrome-fg);
        height: 32px;
        width: 32px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.1s ease-in-out;
    }

    .user img {
        height: 100%;
        width: 100%;
    }

    .sidebar-toggle {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        margin: 0;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius);
        transition: all 0.1s ease-in-out;
    }

    .sidebar-toggle:hover {
        background-color: var(--color-surface-tint);
    }
</style>
