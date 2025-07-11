<template>
    <div class="library">
        <div class="library-content vstack">
            <h3>Triggers</h3>
            <div class="library-blocks">
                <div class="library-item">Manual</div>
                <div class="library-item">Webhook</div>
                <div class="library-item">Scheduled</div>
                <div class="library-item">Chat message</div>
            </div>

            <h3>Flow</h3>
            <div class="library-blocks">
                <div class="library-item">If/Else</div>
                <div class="library-item">Loop</div>
                <div class="library-item">Switch</div>
                <div class="library-item">Filter</div>
                <div class="library-item">Merge</div>
                <div class="library-item">Wait</div>
            </div>
            
            <h3>Experts</h3>
            <div class="library-blocks">
                <Tooltip 
                    v-for="expert in experts" 
                    :key="expert.id"
                    :content="expert.description"
                    placement="bottom-start"
                >
                    <div class="library-item expert-item">
                        <div class="expert-title">{{ expert.title }}</div>
                    </div>
                </Tooltip>
            </div>
            
            <h3>Tools</h3>
            <div class="library-blocks">
                <Tooltip 
                    v-for="tool in tools" 
                    :key="tool.id"
                    :content="tool.description + (tool.value ? ' (' + tool.value + ')' : '')"
                    placement="bottom-start"
                >
                    <div class="library-item tool-item">
                        <div class="tool-header hstack">
                            <img v-if="tool.icon" :src="tool.icon" :alt="tool.title" class="tool-icon" />
                            <div class="tool-title">{{ tool.title }}</div>
                        </div>
                    </div>
                </Tooltip>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { experts } from '../data/experts.js';
    import { tools } from '../data/tools.js';
    import Tooltip from './Tooltip.vue';
</script>

<style scoped>
    .library-content {
        gap: var(--space-m);
    }

    .library-blocks {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-xs);
    }

    .library-item {
        padding: var(--space-xxs) var(--space-xs);
        line-height: var(--line-height-tight);
        border-radius: var(--radius-s);
        background-color: var(--color-surface-tint-light);
        border: 1px solid var(--color-surface-tint);
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .library-item:hover {
        background-color: var(--color-surface-tint);
        border-color: var(--color-primary);
    }

    .tool-header {
        gap: var(--space-xs);
        align-items: center;;
    }

    .tool-icon {
        width: 18px;
        height: 18px;
    }
</style> 