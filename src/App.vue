<template>
    <div class="ithaca" :class="{ 'sidebar-is-mini': isMini }">
        <Sidebar :mini="isMini" :is-mobile="isMobile" @toggle="toggleSidebar" />
        <main>
            <router-view />
        </main>
    </div>
</template>

<script setup>
    import { useSidebar } from './composables/useSidebar';
    import Sidebar from './components/Sidebar.vue';

    const { isMini, isMobile, toggleSidebar } = useSidebar();
</script>

<style scoped>
    .ithaca {
        height: 100dvh;
        display: flex;
        --sidebar-width: var(--sidebar-width-full);
    }

    .ithaca.sidebar-is-mini {
        --sidebar-width: var(--sidebar-width-mini);
    }

    main {
        flex: 1;
        max-width: calc(100dvw - var(--sidebar-width));
        overflow-x: auto;
    }

    /* Mobile responsive */
    @media (max-width: 768px) {
        .ithaca {
            position: relative;
        }

        main {
            max-width: 100dvw;
        }
    }
</style>
