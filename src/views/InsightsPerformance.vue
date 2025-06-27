<template>
    <div class="insights-performance">
        <div class="insight-section">
            <h2>Key Performance Metrics</h2>
            <p class="section-description">
                Overall system performance indicators
            </p>

            <div class="performance-metrics">
                <div class="metric-card">
                    <div class="metric-header">
                        <span class="metric-title">Response Time</span>
                        <span class="metric-trend positive">↗ +5%</span>
                    </div>
                    <div class="metric-value">1.2s</div>
                    <div class="metric-subtitle">Average</div>
                </div>
                <div class="metric-card">
                    <div class="metric-header">
                        <span class="metric-title">Resolution Rate</span>
                        <span class="metric-trend positive">↗ +12%</span>
                    </div>
                    <div class="metric-value">84%</div>
                    <div class="metric-subtitle">First Contact</div>
                </div>
                <div class="metric-card">
                    <div class="metric-header">
                        <span class="metric-title">Accuracy Score</span>
                        <span class="metric-trend neutral">→ 0%</span>
                    </div>
                    <div class="metric-value">92.5%</div>
                    <div class="metric-subtitle">Overall</div>
                </div>
                <div class="metric-card">
                    <div class="metric-header">
                        <span class="metric-title">User Satisfaction</span>
                        <span class="metric-trend positive">↗ +8%</span>
                    </div>
                    <div class="metric-value">4.6/5</div>
                    <div class="metric-subtitle">Average Rating</div>
                </div>
            </div>
        </div>

        <div class="insight-section">
            <h2>Agent Performance Comparison</h2>
            <p class="section-description">
                Compare key metrics across different agents
            </p>

            <div class="performance-table">
                <div class="table-header">
                    <div class="header-cell agent-col">Agent</div>
                    <div class="header-cell">Conversations</div>
                    <div class="header-cell">Avg. Response</div>
                    <div class="header-cell">Resolution %</div>
                    <div class="header-cell">Rating</div>
                </div>
                <div class="table-row">
                    <div class="cell agent-cell">
                        <span class="agent-name">Support Bot Alpha</span>
                    </div>
                    <div class="cell">342</div>
                    <div class="cell">0.8s</div>
                    <div class="cell performance-good">87%</div>
                    <div class="cell">4.7/5</div>
                </div>
                <div class="table-row">
                    <div class="cell agent-cell">
                        <span class="agent-name">Knowledge Assistant</span>
                    </div>
                    <div class="cell">189</div>
                    <div class="cell">1.1s</div>
                    <div class="cell performance-good">91%</div>
                    <div class="cell">4.8/5</div>
                </div>
                <div class="table-row">
                    <div class="cell agent-cell">
                        <span class="agent-name">Sales Helper</span>
                    </div>
                    <div class="cell">267</div>
                    <div class="cell">1.5s</div>
                    <div class="cell performance-fair">76%</div>
                    <div class="cell">4.2/5</div>
                </div>
            </div>
        </div>

        <div class="insight-section">
            <h2>Performance Trends</h2>
            <p class="section-description">
                How key metrics have evolved over time
            </p>

            <div class="chart-placeholder">
                <p>Performance trend charts will be displayed here</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { inject, ref } from 'vue';

    const timeRange = inject('timeRange', ref('30d'));
</script>

<style scoped>
    .insights-performance {
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

    .performance-metrics {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: var(--space-m);
    }

    .metric-card {
        padding: var(--space-m);
        background: var(--color-surface-secondary);
        border: 1px solid var(--color-surface-tint);
        border-radius: var(--radius);
        transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
    }

    .metric-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .metric-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-s);
    }

    .metric-title {
        font-size: var(--font-size-s);
        color: var(--color-surface-fg-secondary);
        font-weight: 500;
    }

    .metric-trend {
        font-size: var(--font-size-s);
        font-weight: 600;
    }

    .metric-trend.positive {
        color: var(--color-success);
    }

    .metric-trend.neutral {
        color: var(--color-surface-fg-secondary);
    }

    .metric-trend.negative {
        color: var(--color-error);
    }

    .metric-value {
        font-size: var(--font-size-xxl);
        font-weight: 600;
        color: var(--color-surface-fg);
        margin-bottom: var(--space-xs);
    }

    .metric-subtitle {
        font-size: var(--font-size-s);
        color: var(--color-surface-fg-secondary);
    }

    .performance-table {
        background: var(--color-surface-secondary);
        border-radius: var(--radius);
        overflow: hidden;
    }

    .table-header,
    .table-row {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
        gap: var(--space-s);
        align-items: center;
    }

    .table-header {
        background: var(--color-surface-tint);
        padding: var(--space-s) var(--space-m);
        font-weight: 600;
        font-size: var(--font-size-s);
        color: var(--color-surface-fg);
    }

    .table-row {
        padding: var(--space-s) var(--space-m);
        border-bottom: 1px solid var(--color-surface-tint);
        transition: background-color 0.2s ease;
    }

    .table-row:hover {
        background: var(--color-surface-tint);
    }

    .table-row:last-child {
        border-bottom: none;
    }

    .cell {
        font-size: var(--font-size-s);
        color: var(--color-surface-fg);
    }

    .agent-cell {
        font-weight: 500;
    }

    .performance-good {
        color: var(--color-success);
        font-weight: 600;
    }

    .performance-fair {
        color: var(--color-warning);
        font-weight: 600;
    }

    .performance-poor {
        color: var(--color-error);
        font-weight: 600;
    }

    .chart-placeholder {
        padding: var(--space-xl) var(--space-m);
        text-align: center;
        background: var(--color-surface-secondary);
        border-radius: var(--radius);
        border: 2px dashed var(--color-surface-tint);
    }

    .chart-placeholder p {
        color: var(--color-surface-fg-secondary);
        font-style: italic;
    }

    @media (max-width: 768px) {
        .performance-metrics {
            grid-template-columns: 1fr;
        }

        .table-header,
        .table-row {
            grid-template-columns: 1fr;
            gap: var(--space-xs);
        }

        .table-header {
            display: none;
        }

        .table-row {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: var(--space-m);
        }

        .cell::before {
            content: attr(data-label) ': ';
            font-weight: 600;
            color: var(--color-surface-fg-secondary);
        }
    }
</style>
