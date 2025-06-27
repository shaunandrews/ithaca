<template>
  <div class="insights-toolbar">
    <div class="toolbar-start">
      <h1>Insights</h1>
      <p>Analytics and performance data across your agents, experts, and tools</p>
    </div>
    <div class="toolbar-end">
      <select v-model="timeRange">
        <option value="7d">Last 7 days</option>
        <option value="30d">Last 30 days</option>
        <option value="90d">Last 90 days</option>
      </select>
    </div>
  </div>

  <div class="insights-grid">
    <div class="insight-card">
      <h3>Agent Performance</h3>
      <div class="metric">
        <span class="metric-value">94.2%</span>
        <span class="metric-label">Success Rate</span>
      </div>
      <p class="metric-description">Average success rate across all agents</p>
    </div>

    <div class="insight-card">
      <h3>Expert Activity</h3>
      <div class="metric">
        <span class="metric-value">127</span>
        <span class="metric-label">Interactions</span>
      </div>
      <p class="metric-description">Total expert consultations</p>
    </div>

    <div class="insight-card">
      <h3>Tool Usage</h3>
      <div class="metric">
        <span class="metric-value">15</span>
        <span class="metric-label">Active Tools</span>
      </div>
      <p class="metric-description">Tools used in the selected period</p>
    </div>

    <div class="insight-card">
      <h3>Response Time</h3>
      <div class="metric">
        <span class="metric-value">1.2s</span>
        <span class="metric-label">Average</span>
      </div>
      <p class="metric-description">Mean response time across all interactions</p>
    </div>

    <div class="insight-card chart-card">
      <h3>Activity Trends</h3>
      <div class="chart-placeholder">
        <p>Chart visualization would go here</p>
        <span class="chart-note">Interactive charts showing usage patterns over time</span>
      </div>
    </div>

    <div class="insight-card chart-card">
      <h3>Top Performing Agents</h3>
      <div class="chart-placeholder">
        <p>Ranking visualization would go here</p>
        <span class="chart-note">Leaderboard of most effective agents</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const timeRange = ref('30d');
</script>

<style scoped>
.insights-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-s);
  padding: var(--space-s) var(--space-m);
  border-bottom: 1px solid var(--color-surface-tint);
  margin-bottom: var(--space-m);
}

.toolbar-start h1 {
  margin: 0 0 var(--space-xs) 0;
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-surface-fg);
}

.toolbar-start p {
  margin: 0;
  color: var(--color-surface-fg-secondary);
  font-size: var(--font-size-s);
}

.toolbar-end select {
  padding: var(--space-xs) var(--space-s);
  border: 1px solid var(--color-surface-tint);
  border-radius: var(--radius);
  background-color: var(--color-surface);
  color: var(--color-surface-fg);
}

.insights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-m);
  padding: 0 var(--space-m);
}

.insight-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-surface-tint);
  border-radius: var(--radius);
  padding: var(--space-m);
  transition: all 0.2s ease-in-out;
}

.insight-card:hover {
  border-color: var(--color-surface-tint-hover);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.insight-card h3 {
  margin: 0 0 var(--space-m) 0;
  font-size: var(--font-size-m);
  font-weight: 500;
  color: var(--color-surface-fg);
}

.metric {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  margin-bottom: var(--space-s);
}

.metric-value {
  font-size: var(--font-size-xxl);
  font-weight: 600;
  color: var(--color-surface-fg);
}

.metric-label {
  font-size: var(--font-size-s);
  color: var(--color-surface-fg-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.metric-description {
  margin: 0;
  font-size: var(--font-size-s);
  color: var(--color-surface-fg-secondary);
}

.chart-card {
  grid-column: span 2;
  min-height: 200px;
}

.chart-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
  background-color: var(--color-surface-tint);
  border-radius: var(--radius);
  border: 2px dashed var(--color-surface-tint-hover);
}

.chart-placeholder p {
  margin: 0 0 var(--space-xs) 0;
  color: var(--color-surface-fg-secondary);
  font-weight: 500;
}

.chart-note {
  font-size: var(--font-size-s);
  color: var(--color-surface-fg-tertiary);
  text-align: center;
}

@media (max-width: 768px) {
  .chart-card {
    grid-column: span 1;
  }
}
</style> 