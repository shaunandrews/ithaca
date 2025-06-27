<template>
  <div class="insights-activity">
    <div class="insight-section">
      <h2>Activity Overview</h2>
      <p class="section-description">Usage patterns and activity metrics</p>
      
      <div class="activity-metrics">
        <div class="metric-card">
          <div class="metric-icon">💬</div>
          <div class="metric-content">
            <div class="metric-value">2,847</div>
            <div class="metric-label">Total Conversations</div>
            <div class="metric-change positive">+18% from last period</div>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon">👥</div>
          <div class="metric-content">
            <div class="metric-value">1,234</div>
            <div class="metric-label">Unique Users</div>
            <div class="metric-change positive">+12% from last period</div>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon">⏱️</div>
          <div class="metric-content">
            <div class="metric-value">4.2h</div>
            <div class="metric-label">Peak Hour Activity</div>
            <div class="metric-change neutral">Same as last period</div>
          </div>
        </div>
      </div>
    </div>

    <div class="insight-section">
      <h2>Hourly Activity Pattern</h2>
      <p class="section-description">Conversation volume throughout the day</p>
      
      <div class="activity-chart">
        <div class="chart-bar-container">
          <div class="chart-bar" style="height: 20%;" data-hour="0" data-value="12"></div>
          <div class="chart-bar" style="height: 15%;" data-hour="1" data-value="8"></div>
          <div class="chart-bar" style="height: 25%;" data-hour="2" data-value="15"></div>
          <div class="chart-bar" style="height: 45%;" data-hour="3" data-value="28"></div>
          <div class="chart-bar" style="height: 65%;" data-hour="4" data-value="42"></div>
          <div class="chart-bar" style="height: 85%;" data-hour="5" data-value="58"></div>
          <div class="chart-bar" style="height: 90%;" data-hour="6" data-value="62"></div>
          <div class="chart-bar" style="height: 95%;" data-hour="7" data-value="68"></div>
          <div class="chart-bar" style="height: 100%;" data-hour="8" data-value="73"></div>
          <div class="chart-bar" style="height: 98%;" data-hour="9" data-value="71"></div>
          <div class="chart-bar" style="height: 92%;" data-hour="10" data-value="65"></div>
          <div class="chart-bar" style="height: 88%;" data-hour="11" data-value="61"></div>
          <div class="chart-bar" style="height: 95%;" data-hour="12" data-value="68"></div>
          <div class="chart-bar" style="height: 100%;" data-hour="13" data-value="73"></div>
          <div class="chart-bar" style="height: 96%;" data-hour="14" data-value="69"></div>
          <div class="chart-bar" style="height: 90%;" data-hour="15" data-value="64"></div>
          <div class="chart-bar" style="height: 85%;" data-hour="16" data-value="58"></div>
          <div class="chart-bar" style="height: 78%;" data-hour="17" data-value="52"></div>
          <div class="chart-bar" style="height: 65%;" data-hour="18" data-value="42"></div>
          <div class="chart-bar" style="height: 50%;" data-hour="19" data-value="32"></div>
          <div class="chart-bar" style="height: 38%;" data-hour="20" data-value="24"></div>
          <div class="chart-bar" style="height: 30%;" data-hour="21" data-value="18"></div>
          <div class="chart-bar" style="height: 25%;" data-hour="22" data-value="15"></div>
          <div class="chart-bar" style="height: 18%;" data-hour="23" data-value="10"></div>
        </div>
        <div class="chart-labels">
          <span>12 AM</span>
          <span>6 AM</span>
          <span>12 PM</span>
          <span>6 PM</span>
          <span>11 PM</span>
        </div>
      </div>
    </div>

    <div class="insight-section">
      <h2>Most Active Agents</h2>
      <p class="section-description">Agents with the highest conversation volume</p>
      
      <div class="active-agents-list">
        <div class="agent-activity-item">
          <div class="agent-rank">1</div>
          <div class="agent-details">
            <span class="agent-name">Support Bot Alpha</span>
            <span class="agent-stats">1,247 conversations • 87% satisfaction</span>
          </div>
          <div class="activity-bar">
            <div class="activity-fill" style="width: 100%"></div>
          </div>
        </div>
        <div class="agent-activity-item">
          <div class="agent-rank">2</div>
          <div class="agent-details">
            <span class="agent-name">Sales Helper</span>
            <span class="agent-stats">892 conversations • 82% satisfaction</span>
          </div>
          <div class="activity-bar">
            <div class="activity-fill" style="width: 72%"></div>
          </div>
        </div>
        <div class="agent-activity-item">
          <div class="agent-rank">3</div>
          <div class="agent-details">
            <span class="agent-name">Knowledge Assistant</span>
            <span class="agent-stats">708 conversations • 91% satisfaction</span>
          </div>
          <div class="activity-bar">
            <div class="activity-fill" style="width: 57%"></div>
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
.insights-activity {
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

.activity-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-m);
}

.metric-card {
  display: flex;
  align-items: center;
  gap: var(--space-m);
  padding: var(--space-m);
  background: var(--color-surface-secondary);
  border-radius: var(--radius);
  border: 1px solid var(--color-surface-tint);
  transition: transform 0.2s ease;
}

.metric-card:hover {
  transform: translateY(-2px);
}

.metric-icon {
  font-size: 2rem;
  opacity: 0.8;
}

.metric-content {
  flex: 1;
}

.metric-value {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-surface-fg);
  margin-bottom: var(--space-xs);
}

.metric-label {
  font-size: var(--font-size-s);
  color: var(--color-surface-fg-secondary);
  margin-bottom: var(--space-xs);
}

.metric-change {
  font-size: var(--font-size-xs);
  font-weight: 500;
}

.metric-change.positive {
  color: var(--color-success);
}

.metric-change.neutral {
  color: var(--color-surface-fg-secondary);
}

.metric-change.negative {
  color: var(--color-error);
}

.activity-chart {
  background: var(--color-surface-secondary);
  border-radius: var(--radius);
  padding: var(--space-m);
}

.chart-bar-container {
  display: flex;
  align-items: end;
  justify-content: space-between;
  height: 120px;
  margin-bottom: var(--space-s);
  gap: 2px;
}

.chart-bar {
  flex: 1;
  background: var(--color-accent);
  border-radius: 2px 2px 0 0;
  min-height: 4px;
  transition: background-color 0.2s ease;
  cursor: pointer;
  position: relative;
}

.chart-bar:hover {
  background: var(--color-accent-hover);
}

.chart-bar::after {
  content: attr(data-value);
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  font-size: var(--font-size-xs);
  color: var(--color-surface-fg);
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.chart-bar:hover::after {
  opacity: 1;
}

.chart-labels {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-s);
  color: var(--color-surface-fg-secondary);
}

.active-agents-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-s);
}

.agent-activity-item {
  display: flex;
  align-items: center;
  gap: var(--space-m);
  padding: var(--space-s);
  background: var(--color-surface-secondary);
  border-radius: var(--radius);
  transition: background-color 0.2s ease;
}

.agent-activity-item:hover {
  background: var(--color-surface-tint);
}

.agent-rank {
  font-size: var(--font-size-l);
  font-weight: 600;
  color: var(--color-accent);
  min-width: 1.5rem;
  text-align: center;
}

.agent-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.agent-name {
  font-weight: 500;
  color: var(--color-surface-fg);
}

.agent-stats {
  font-size: var(--font-size-s);
  color: var(--color-surface-fg-secondary);
}

.activity-bar {
  width: 100px;
  height: 8px;
  background: var(--color-surface-tint);
  border-radius: 4px;
  overflow: hidden;
}

.activity-fill {
  height: 100%;
  background: var(--color-accent);
  border-radius: 4px;
  transition: width 0.3s ease;
}

@media (max-width: 768px) {
  .activity-metrics {
    grid-template-columns: 1fr;
  }
  
  .chart-bar-container {
    height: 80px;
  }
  
  .chart-labels span:nth-child(2),
  .chart-labels span:nth-child(4) {
    display: none;
  }
  
  .agent-activity-item {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-s);
  }
  
  .activity-bar {
    width: 100%;
  }
}
</style> 