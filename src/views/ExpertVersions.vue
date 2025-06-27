<template>
    <div class="expert-versions">
        <div class="versions-header">
            <h3>Version History</h3>
            <button class="primary">Publish New Version</button>
        </div>

        <div class="current-version">
            <div class="version-label">Current Version</div>
            <div class="version-card active">
                <div class="version-header">
                    <div class="version-info">
                        <h4>Version {{ currentVersion.number }}</h4>
                        <div class="version-meta">
                            <span class="version-date"
                                >Published {{ currentVersion.date }}</span
                            >
                            <span class="version-author"
                                >by {{ currentVersion.author }}</span
                            >
                        </div>
                    </div>
                    <div class="version-stats">
                        <span class="stat-badge success">Live</span>
                        <span class="stat-badge"
                            >{{ currentVersion.calls }} calls</span
                        >
                    </div>
                </div>
                <div class="version-description">
                    {{ currentVersion.description }}
                </div>
            </div>
        </div>

        <div class="versions-list">
            <h4>Previous Versions</h4>
            <div
                class="version-card"
                v-for="version in previousVersions"
                :key="version.id"
            >
                <div class="version-header">
                    <div class="version-info">
                        <h4>Version {{ version.number }}</h4>
                        <div class="version-meta">
                            <span class="version-date"
                                >Published {{ version.date }}</span
                            >
                            <span class="version-author"
                                >by {{ version.author }}</span
                            >
                        </div>
                    </div>
                    <div class="version-actions">
                        <button class="secondary" @click="viewChanges(version)">
                            View Changes
                        </button>
                        <button class="secondary" @click="rollback(version)">
                            Rollback
                        </button>
                    </div>
                </div>
                <div class="version-description">
                    {{ version.description }}
                </div>
                <div class="version-changes" v-if="version.showChanges">
                    <h5>Changes in this version:</h5>
                    <ul>
                        <li v-for="(change, idx) in version.changes" :key="idx">
                            {{ change }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { experts } from '@/data/experts.js';

    const route = useRoute();
    const expertId = computed(() => Number(route.params.id));
    const expert = computed(() => experts.find((e) => e.id === expertId.value));

    // Mock current version data
    const currentVersion = ref({
        id: 4,
        number: '1.3.0',
        date: 'Dec 10, 2023',
        author: 'Shaun Andrews',
        description:
            'Added caching support and improved error handling for timeout scenarios',
        calls: 847,
    });

    // Mock previous versions data
    const previousVersions = ref([
        {
            id: 3,
            number: '1.2.1',
            date: 'Dec 5, 2023',
            author: 'Andy Peatling',
            description:
                'Fixed issue with billing lookup returning incorrect data for certain account types',
            showChanges: false,
            changes: [
                'Fixed billing data parsing for enterprise accounts',
                'Added validation for account ID format',
                'Improved error messages for failed lookups',
            ],
        },
        {
            id: 2,
            number: '1.2.0',
            date: 'Nov 28, 2023',
            author: 'Shaun Andrews',
            description:
                'Added support for multiple Zendesk instances and improved performance',
            showChanges: false,
            changes: [
                'Added multi-instance Zendesk support',
                'Optimized API calls to reduce response time by 40%',
                'Added configuration for custom field mapping',
            ],
        },
        {
            id: 1,
            number: '1.1.0',
            date: 'Nov 15, 2023',
            author: 'Andy Peatling',
            description:
                'Initial version with basic billing lookup functionality',
            showChanges: false,
            changes: [
                'Basic billing information retrieval',
                'Support for standard account types',
                'Integration with Zendesk API v2',
            ],
        },
    ]);

    function viewChanges(version) {
        version.showChanges = !version.showChanges;
    }

    function rollback(version) {
        if (
            confirm(
                `Are you sure you want to rollback to version ${version.number}?`
            )
        ) {
            // Handle rollback logic
            console.log('Rolling back to version:', version.number);
        }
    }
</script>

<style scoped>
    .expert-versions {
        padding: var(--space-m);
        height: 100%;
        overflow-y: auto;
    }

    .versions-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-m);
    }

    .versions-header h3 {
        font-size: var(--font-size-l);
        font-weight: var(--font-weight-semibold);
        margin: 0;
    }

    .current-version {
        margin-bottom: var(--space-xl);
    }

    .version-label {
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-medium);
        color: var(--color-surface-fg-secondary);
        margin-bottom: var(--space-s);
    }

    .version-card {
        background: var(--color-surface);
        border: 1px solid var(--color-surface-tint);
        border-radius: var(--radius);
        padding: var(--space-m);
        margin-bottom: var(--space-s);
    }

    .version-card.active {
        border-color: var(--color-primary);
        background: var(--color-surface);
    }

    .version-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: var(--space-s);
    }

    .version-info h4 {
        font-size: var(--font-size-m);
        font-weight: var(--font-weight-semibold);
        margin: 0 0 var(--space-xs) 0;
    }

    .version-meta {
        display: flex;
        gap: var(--space-s);
        font-size: var(--font-size-s);
        color: var(--color-surface-fg-secondary);
    }

    .version-stats {
        display: flex;
        gap: var(--space-xs);
    }

    .stat-badge {
        padding: var(--space-xxs) var(--space-xs);
        border-radius: var(--radius-small);
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-medium);
        background: var(--color-surface-tint);
        color: var(--color-surface-fg-secondary);
    }

    .stat-badge.success {
        background: var(--color-green-100);
        color: var(--color-green-900);
    }

    .version-description {
        color: var(--color-surface-fg-secondary);
        line-height: 1.5;
    }

    .version-actions {
        display: flex;
        gap: var(--space-xs);
    }

    .version-actions button {
        padding: var(--space-xxs) var(--space-xs);
        font-size: var(--font-size-s);
    }

    button.secondary {
        background: transparent;
        border: 1px solid var(--color-surface-tint);
        color: var(--color-surface-fg);
        cursor: pointer;
        border-radius: var(--radius);
    }

    button.secondary:hover {
        background: var(--color-surface-tint);
    }

    .versions-list h4 {
        font-size: var(--font-size-m);
        font-weight: var(--font-weight-semibold);
        margin: 0 0 var(--space-m) 0;
    }

    .version-changes {
        margin-top: var(--space-m);
        padding-top: var(--space-m);
        border-top: 1px solid var(--color-surface-tint);
    }

    .version-changes h5 {
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-medium);
        margin: 0 0 var(--space-s) 0;
    }

    .version-changes ul {
        margin: 0;
        padding-left: var(--space-m);
    }

    .version-changes li {
        font-size: var(--font-size-s);
        color: var(--color-surface-fg-secondary);
        margin-bottom: var(--space-xs);
    }
</style>
