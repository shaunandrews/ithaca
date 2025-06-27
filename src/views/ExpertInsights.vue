<template>
    <div class="expert-insights">
        <div class="insights-header">
            <h3>Performance Insights</h3>
            <div class="date-range">
                <select v-model="selectedRange">
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                </select>
            </div>
        </div>

        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-label">Total Calls</div>
                <div class="metric-value">{{ metrics.totalCalls }}</div>
                <div class="metric-change positive">+12% from last period</div>
            </div>

            <div class="metric-card">
                <div class="metric-label">Success Rate</div>
                <div class="metric-value">{{ metrics.successRate }}%</div>
                <div class="metric-change positive">+3% from last period</div>
            </div>

            <div class="metric-card">
                <div class="metric-label">Avg Response Time</div>
                <div class="metric-value">{{ metrics.avgResponseTime }}s</div>
                <div class="metric-change negative">+0.5s from last period</div>
            </div>

            <div class="metric-card">
                <div class="metric-label">Error Rate</div>
                <div class="metric-value">{{ metrics.errorRate }}%</div>
                <div class="metric-change positive">-2% from last period</div>
            </div>
        </div>

        <div class="insights-section">
            <h4>Usage by Agent</h4>
            <div class="usage-list">
                <div
                    class="usage-item"
                    v-for="agent in agentUsage"
                    :key="agent.id"
                >
                    <div class="usage-agent">
                        <img
                            :src="`/images/${agent.icon}`"
                            :alt="agent.name"
                            class="agent-icon"
                        />
                        <span>{{ agent.name }}</span>
                    </div>
                    <div class="usage-stats">
                        <span class="usage-count">{{ agent.calls }} calls</span>
                        <div class="usage-bar">
                            <div
                                class="usage-fill"
                                :style="{ width: `${agent.percentage}%` }"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="insights-section">
            <h4>Common Error Patterns</h4>
            <div class="error-list">
                <div
                    class="error-item"
                    v-for="error in commonErrors"
                    :key="error.id"
                >
                    <div class="error-type">{{ error.type }}</div>
                    <div class="error-details">
                        <div class="error-message">{{ error.message }}</div>
                        <div class="error-count">
                            {{ error.count }} occurrences
                        </div>
                    </div>
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

    const selectedRange = ref('30d');

    // Mock metrics data
    const metrics = ref({
        totalCalls: 1847,
        successRate: 94.3,
        avgResponseTime: 2.1,
        errorRate: 5.7,
    });

    // Mock agent usage data
    const agentUsage = ref([
        {
            id: 1,
            name: 'Customer Support Bot',
            icon: 'icon-teamhal.png',
            calls: 892,
            percentage: 48,
        },
        {
            id: 2,
            name: 'Technical Assistant',
            icon: 'icon-teamlighthouse.png',
            calls: 623,
            percentage: 34,
        },
        {
            id: 3,
            name: 'Sales Agent',
            icon: 'icon-wordpress.png',
            calls: 332,
            percentage: 18,
        },
    ]);

    // Mock error data
    const commonErrors = ref([
        {
            id: 1,
            type: 'Timeout',
            message: 'API response timeout exceeded',
            count: 45,
        },
        {
            id: 2,
            type: 'Authentication',
            message: 'Invalid credentials for external service',
            count: 23,
        },
        {
            id: 3,
            type: 'Rate Limit',
            message: 'API rate limit exceeded',
            count: 12,
        },
    ]);
</script>

<style scoped>
    .expert-insights {
        padding: var(--space-m);
        height: 100%;
        overflow-y: auto;
    }

    .insights-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-m);
    }

    .insights-header h3 {
        font-size: var(--font-size-l);
        font-weight: var(--font-weight-semibold);
        margin: 0;
    }

    .date-range select {
        padding: var(--space-xxs) var(--space-xs);
        border: 1px solid var(--color-surface-tint);
        border-radius: var(--radius);
        background: var(--color-surface);
        color: var(--color-surface-fg);
    }

    .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: var(--space-s);
        margin-bottom: var(--space-xl);
    }

    .metric-card {
        background: var(--color-surface);
        border: 1px solid var(--color-surface-tint);
        border-radius: var(--radius);
        padding: var(--space-m);
    }

    .metric-label {
        font-size: var(--font-size-s);
        color: var(--color-surface-fg-secondary);
        margin-bottom: var(--space-xs);
    }

    .metric-value {
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-bold);
        margin-bottom: var(--space-xs);
    }

    .metric-change {
        font-size: var(--font-size-xs);
    }

    .metric-change.positive {
        color: var(--color-green-700);
    }

    .metric-change.negative {
        color: var(--color-red-700);
    }

    .insights-section {
        margin-bottom: var(--space-xl);
    }

    .insights-section h4 {
        font-size: var(--font-size-m);
        font-weight: var(--font-weight-semibold);
        margin: 0 0 var(--space-m) 0;
    }

    .usage-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-s);
    }

    .usage-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-s);
        background: var(--color-surface);
        border: 1px solid var(--color-surface-tint);
        border-radius: var(--radius);
    }

    .usage-agent {
        display: flex;
        align-items: center;
        gap: var(--space-s);
        font-weight: var(--font-weight-medium);
    }

    .agent-icon {
        width: 24px;
        height: 24px;
        border-radius: var(--radius-small);
    }

    .usage-stats {
        display: flex;
        align-items: center;
        gap: var(--space-s);
    }

    .usage-count {
        font-size: var(--font-size-s);
        color: var(--color-surface-fg-secondary);
    }

    .usage-bar {
        width: 100px;
        height: 8px;
        background: var(--color-surface-tint);
        border-radius: 4px;
        overflow: hidden;
    }

    .usage-fill {
        height: 100%;
        background: var(--color-primary);
        transition: width 0.3s ease;
    }

    .error-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-s);
    }

    .error-item {
        padding: var(--space-s);
        background: var(--color-surface);
        border: 1px solid var(--color-surface-tint);
        border-radius: var(--radius);
    }

    .error-type {
        font-weight: var(--font-weight-medium);
        color: var(--color-red-700);
        margin-bottom: var(--space-xs);
    }

    .error-details {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .error-message {
        font-size: var(--font-size-s);
        color: var(--color-surface-fg-secondary);
    }

    .error-count {
        font-size: var(--font-size-xs);
        color: var(--color-surface-fg-secondary);
        white-space: nowrap;
    }
</style>
