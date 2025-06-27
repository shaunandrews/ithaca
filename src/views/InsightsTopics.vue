<template>
    <div class="insights-topics">
        <div class="insight-section">
            <h2>Most Common Tags</h2>
            <p class="section-description">
                Top conversation tags across all interactions
            </p>

            <div class="tag-stats">
                <div
                    v-for="(tagStat, index) in topTags"
                    :key="tagStat.tag"
                    class="tag-stat-item"
                    :class="{ 'top-tag': index < 3 }"
                >
                    <div class="tag-rank">#{{ index + 1 }}</div>
                    <div class="tag-info">
                        <span class="tag-name">{{ tagStat.tag }}</span>
                        <div class="tag-bar">
                            <div
                                class="tag-bar-fill"
                                :style="{
                                    width:
                                        (tagStat.count / topTags[0].count) *
                                            100 +
                                        '%',
                                }"
                            ></div>
                        </div>
                    </div>
                    <div class="tag-count">{{ tagStat.count }}</div>
                </div>
            </div>

            <div class="tag-summary">
                <div class="summary-stat">
                    <span class="stat-label">Total unique tags:</span>
                    <span class="stat-value">{{ totalUniqueTags }}</span>
                </div>
                <div class="summary-stat">
                    <span class="stat-label">Total conversations:</span>
                    <span class="stat-value">{{
                        filteredConversations.length
                    }}</span>
                </div>
            </div>
        </div>

        <div class="insight-section">
            <h2>Tag Trends</h2>
            <p class="section-description">
                How conversation topics have evolved over time
            </p>

            <div class="trend-placeholder">
                <p>Tag trend visualization will be displayed here</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, inject } from 'vue';
    import { conversations } from '../data/conversations.js';

    const timeRange = inject('timeRange', ref('30d'));

    // Filter conversations based on time range
    const filteredConversations = computed(() => {
        // For demo purposes, since the data is from June 2024, let's use all conversations
        // In a real app, you'd want proper date filtering
        console.log('Total conversations:', conversations.length);
        console.log('First conversation date:', conversations[0]?.datetime);

        if (conversations.length === 0) {
            return [];
        }

        // For now, return all conversations to show the demo working
        // You can enable proper date filtering later
        return conversations;
    });

    // Calculate tag statistics
    const tagStats = computed(() => {
        const tagCounts = {};
        let totalTags = 0;

        filteredConversations.value.forEach((conversation) => {
            if (conversation.tags && Array.isArray(conversation.tags)) {
                conversation.tags.forEach((tag) => {
                    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
                    totalTags++;
                });
            }
        });

        console.log('Tag counts:', tagCounts);
        console.log('Total tags processed:', totalTags);

        return Object.entries(tagCounts)
            .map(([tag, count]) => ({ tag, count }))
            .sort((a, b) => b.count - a.count);
    });

    // Top 10 most common tags
    const topTags = computed(() => {
        return tagStats.value.slice(0, 10);
    });

    // Total unique tags
    const totalUniqueTags = computed(() => {
        return tagStats.value.length;
    });
</script>

<style scoped>
    .insights-topics {
        padding: var(--space-m);
        height: 100%;
        overflow-y: auto;
    }

    .insight-section {
        background: var(--color-surface);
        border: 1px solid var(--color-surface-tint);
        border-radius: var(--radius);
        padding: var(--space-m);
        margin-bottom: var(--space-m);
    }

    .insight-section h2 {
        margin: 0 0 var(--space-xs) 0;
        font-size: var(--font-size-l);
        font-weight: 600;
        color: var(--color-surface-fg);
    }

    .section-description {
        margin: 0 0 var(--space-m) 0;
        color: var(--color-surface-fg-secondary);
        font-size: var(--font-size-s);
    }

    .tag-stats {
        display: flex;
        flex-direction: column;
        gap: var(--space-s);
        margin-bottom: var(--space-m);
    }

    .tag-stat-item {
        display: flex;
        align-items: center;
        gap: var(--space-s);
        padding: var(--space-s);
        background: var(--color-surface-secondary);
        border-radius: var(--radius);
        transition: background-color 0.2s ease;
    }

    .tag-stat-item.top-tag {
        background: var(--color-accent-bg);
        border: 1px solid var(--color-accent);
    }

    .tag-stat-item:hover {
        background: var(--color-surface-tint);
    }

    .tag-stat-item.top-tag:hover {
        background: var(--color-accent-bg-hover);
    }

    .tag-rank {
        font-size: var(--font-size-s);
        font-weight: 600;
        color: var(--color-surface-fg-secondary);
        min-width: 2rem;
        text-align: center;
    }

    .top-tag .tag-rank {
        color: var(--color-accent);
    }

    .tag-info {
        flex: 1;
        min-width: 0;
    }

    .tag-name {
        display: block;
        font-weight: 500;
        color: var(--color-surface-fg);
        margin-bottom: var(--space-xs);
        word-break: break-word;
    }

    .tag-bar {
        height: 4px;
        background: var(--color-surface-tint);
        border-radius: 2px;
        overflow: hidden;
    }

    .tag-bar-fill {
        height: 100%;
        background: var(--color-accent);
        border-radius: 2px;
        transition: width 0.3s ease;
    }

    .tag-count {
        font-size: var(--font-size-s);
        font-weight: 600;
        color: var(--color-surface-fg);
        min-width: 2rem;
        text-align: right;
    }

    .tag-summary {
        display: flex;
        gap: var(--space-l);
        padding-top: var(--space-s);
        border-top: 1px solid var(--color-surface-tint);
    }

    .summary-stat {
        display: flex;
        flex-direction: column;
        gap: var(--space-xs);
    }

    .stat-label {
        font-size: var(--font-size-s);
        color: var(--color-surface-fg-secondary);
    }

    .stat-value {
        font-size: var(--font-size-l);
        font-weight: 600;
        color: var(--color-surface-fg);
    }

    .trend-placeholder {
        padding: var(--space-xl) var(--space-m);
        text-align: center;
        background: var(--color-surface-secondary);
        border-radius: var(--radius);
        border: 2px dashed var(--color-surface-tint);
    }

    .trend-placeholder p {
        color: var(--color-surface-fg-secondary);
        font-style: italic;
    }

    @media (max-width: 768px) {
        .tag-summary {
            flex-direction: column;
            gap: var(--space-s);
        }

        .tag-stat-item {
            flex-wrap: wrap;
        }

        .tag-info {
            min-width: 200px;
        }
    }
</style>
