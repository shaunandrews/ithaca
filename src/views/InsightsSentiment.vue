<template>
    <div class="insights-sentiment">
        <div class="insight-section">
            <h2>Sentiment Overview</h2>
            <p class="section-description">
                Emotional tone analysis across all conversations
            </p>

            <div class="sentiment-metrics">
                <div class="metric-card positive">
                    <div class="metric-icon">😊</div>
                    <div class="metric-content">
                        <span class="metric-value">72%</span>
                        <span class="metric-label">Positive</span>
                    </div>
                </div>
                <div class="metric-card neutral">
                    <div class="metric-icon">😐</div>
                    <div class="metric-content">
                        <span class="metric-value">21%</span>
                        <span class="metric-label">Neutral</span>
                    </div>
                </div>
                <div class="metric-card negative">
                    <div class="metric-icon">😞</div>
                    <div class="metric-content">
                        <span class="metric-value">7%</span>
                        <span class="metric-label">Negative</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="insight-section">
            <h2>Sentiment Trends</h2>
            <p class="section-description">
                How customer sentiment has changed over time
            </p>

            <div class="chart-placeholder">
                <p>Sentiment trend chart will be displayed here</p>
            </div>
        </div>

        <div class="insight-section">
            <h2>Sentiment by Agent</h2>
            <p class="section-description">
                Compare sentiment scores across different agents
            </p>

            <div class="agent-sentiment-list">
                <div class="agent-sentiment-item">
                    <div class="agent-info">
                        <span class="agent-name">Support Bot Alpha</span>
                        <span class="agent-conversations"
                            >124 conversations</span
                        >
                    </div>
                    <div class="sentiment-score positive">
                        <span class="score">8.2</span>
                        <span class="score-label">Avg. Score</span>
                    </div>
                </div>
                <div class="agent-sentiment-item">
                    <div class="agent-info">
                        <span class="agent-name">Knowledge Assistant</span>
                        <span class="agent-conversations"
                            >89 conversations</span
                        >
                    </div>
                    <div class="sentiment-score positive">
                        <span class="score">7.9</span>
                        <span class="score-label">Avg. Score</span>
                    </div>
                </div>
                <div class="agent-sentiment-item">
                    <div class="agent-info">
                        <span class="agent-name">Sales Helper</span>
                        <span class="agent-conversations"
                            >156 conversations</span
                        >
                    </div>
                    <div class="sentiment-score neutral">
                        <span class="score">6.4</span>
                        <span class="score-label">Avg. Score</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { inject, ref } from 'vue';

    const timeRange = inject('timeRange', ref('30d'));
</script>

<style scoped>
    .insights-sentiment {
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

    .sentiment-metrics {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: var(--space-m);
    }

    .metric-card {
        display: flex;
        align-items: center;
        gap: var(--space-m);
        padding: var(--space-m);
        border-radius: var(--radius);
        border: 2px solid;
    }

    .metric-card.positive {
        background: var(--color-success-bg);
        border-color: var(--color-success);
    }

    .metric-card.neutral {
        background: var(--color-surface-secondary);
        border-color: var(--color-surface-tint);
    }

    .metric-card.negative {
        background: var(--color-error-bg);
        border-color: var(--color-error);
    }

    .metric-icon {
        font-size: 2rem;
    }

    .metric-content {
        display: flex;
        flex-direction: column;
    }

    .metric-value {
        font-size: var(--font-size-xl);
        font-weight: 600;
        color: var(--color-surface-fg);
    }

    .metric-label {
        font-size: var(--font-size-s);
        color: var(--color-surface-fg-secondary);
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

    .agent-sentiment-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-s);
    }

    .agent-sentiment-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-s);
        background: var(--color-surface-secondary);
        border-radius: var(--radius);
        transition: background-color 0.2s ease;
    }

    .agent-sentiment-item:hover {
        background: var(--color-surface-tint);
    }

    .agent-info {
        display: flex;
        flex-direction: column;
        gap: var(--space-xs);
    }

    .agent-name {
        font-weight: 500;
        color: var(--color-surface-fg);
    }

    .agent-conversations {
        font-size: var(--font-size-s);
        color: var(--color-surface-fg-secondary);
    }

    .sentiment-score {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-xs);
        padding: var(--space-xs) var(--space-s);
        border-radius: var(--radius);
    }

    .sentiment-score.positive {
        background: var(--color-success-bg);
        color: var(--color-success);
    }

    .sentiment-score.neutral {
        background: var(--color-surface-tint);
        color: var(--color-surface-fg);
    }

    .sentiment-score.negative {
        background: var(--color-error-bg);
        color: var(--color-error);
    }

    .score {
        font-size: var(--font-size-l);
        font-weight: 600;
    }

    .score-label {
        font-size: var(--font-size-xs);
        opacity: 0.8;
    }

    @media (max-width: 768px) {
        .sentiment-metrics {
            grid-template-columns: 1fr;
        }

        .agent-sentiment-item {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--space-s);
        }

        .sentiment-score {
            align-self: flex-end;
        }
    }
</style>
