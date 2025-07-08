<template>
    <nav class="navigation-tabs">
        <ul ref="tabsContainer">
            <div 
                class="tab-indicator"
                :class="{ 'with-transition': enableTransitions }"
                :style="indicatorStyle"
            />
            <li 
                v-for="tab in tabs" 
                :key="tab.key"
                :class="{ active: isActiveTab(tab) }"
                ref="tabElements"
            >
                <a 
                    :href="tab.href || '#'"
                    @click="handleTabClick(tab, $event)"
                >
                    {{ tab.label }}
                </a>
            </li>
        </ul>
    </nav>
</template>

<script setup>
    import { ref, computed, onMounted, nextTick, watch } from 'vue';

    const props = defineProps({
        tabs: {
            type: Array,
            required: true
        },
        activeTab: {
            type: String,
            default: null
        },
        isActiveFunction: {
            type: Function,
            default: null
        },
        disableInitialTransition: {
            type: Boolean,
            default: false
        }
    });

    const emit = defineEmits(['tabClick']);

    const tabsContainer = ref(null);
    const tabElements = ref([]);
    const indicatorStyle = ref({
        opacity: 0,
        transform: 'translateX(0px)',
        width: '0px'
    });
    const enableTransitions = ref(!props.disableInitialTransition);

    function isActiveTab(tab) {
        if (props.isActiveFunction) {
            return props.isActiveFunction(tab.key);
        }
        return props.activeTab === tab.key;
    }

    function handleTabClick(tab, event) {
        if (!tab.href || tab.href === '#') {
            event.preventDefault();
        }
        emit('tabClick', tab);
    }

    function updateIndicator() {
        if (!tabElements.value || !tabsContainer.value) return;

        const activeTabIndex = props.tabs.findIndex(tab => isActiveTab(tab));
        
        if (activeTabIndex === -1) {
            indicatorStyle.value = {
                opacity: 0,
                transform: 'translateX(0px)',
                width: '0px'
            };
            return;
        }

        const activeElement = tabElements.value[activeTabIndex];
        if (!activeElement) return;

        const containerRect = tabsContainer.value.getBoundingClientRect();
        const activeRect = activeElement.getBoundingClientRect();

        const left = activeRect.left - containerRect.left;
        const width = activeRect.width;

        indicatorStyle.value = {
            opacity: 1,
            transform: `translateX(${left}px)`,
            width: `${width}px`
        };
    }

    // Watch for changes in active tab
    watch(
        () => props.tabs.map(tab => isActiveTab(tab)),
        () => {
            nextTick(() => {
                updateIndicator();
            });
        },
        { deep: true }
    );

    // Watch for changes in tabs array
    watch(
        () => props.tabs,
        () => {
            nextTick(() => {
                updateIndicator();
            });
        },
        { deep: true }
    );

    onMounted(() => {
        nextTick(() => {
            updateIndicator();
            
            // Enable transitions after initial positioning if they were disabled
            if (props.disableInitialTransition) {
                setTimeout(() => {
                    enableTransitions.value = true;
                }, 100);
            }
        });
    });
</script>

<style scoped>
    .navigation-tabs ul {
        display: flex;
        gap: var(--space-xxs);
        padding: 0;
        margin: 0;
        position: relative;
    }

    .navigation-tabs li {
        list-style: none;
        position: relative;
        z-index: 2;
    }

    .navigation-tabs li a {
        text-decoration: none;
        color: var(--color-chrome-fg-secondary);
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-medium);
        padding: var(--space-xxs) var(--space-xs);
        border-radius: var(--radius);
        display: block;
        cursor: pointer;
        transition: color 0.2s ease;
    }

    .navigation-tabs li.active a {
        color: var(--color-chrome-fg);
    }

    .navigation-tabs li:not(.active) a:hover {
        background-color: var(--color-surface-tint);
    }

    .tab-indicator {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background-color: var(--color-surface-tint-dark);
        border-radius: var(--radius);
        z-index: 1;
        pointer-events: none;
    }

    .tab-indicator.with-transition {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
</style> 