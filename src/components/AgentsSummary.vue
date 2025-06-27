<template>
  <div class="agents-summary vstack">
    <div class="summary-header">
      <h3>All Agents Performance</h3>
      <p>Summary of performance metrics across {{ totalAgents }} active agents</p>
    </div>
    
    <div class="stats hstack">
      <div class="stat vstack">
        <div class="stat-primary hstack">
          <label>Total conversations</label>
          <div class="stat-primary-value">{{ totalConversations.toLocaleString() }}</div>  
        </div>
        
        <div class="stat-secondary hstack">
          <label>Avg. response time</label>
          <div class="stat-secondary-value">{{ formatResponseTime(avgResponseTime) }}</div>
        </div>
        <div class="stat-secondary hstack">
          <label>Avg. uptime</label>
          <div class="stat-secondary-value">{{ avgUptime }}%</div>
        </div>
      </div>

      <div class="stat vstack">
        <div class="stat-primary hstack">
          <label>Avg. resolution rate</label>
          <div class="stat-primary-value">{{ avgResolutionRate }}%</div>
        </div>
        <div class="stat-secondary hstack">
          <label>Avg. first contact resolution</label>
          <div class="stat-secondary-value">{{ avgFirstContactResolution }}%</div>
        </div>
        <div class="stat-secondary hstack">
          <label>Avg. flag rate</label>
          <div class="stat-secondary-value">{{ avgFlagRate }}%</div>
        </div>
      </div>

      <div class="stat vstack">
        <div class="stat-primary hstack">
          <label>Avg. quality score</label>
          <div class="stat-primary-value">{{ avgQualityScore }}/5</div>
        </div>
        <div class="stat-secondary hstack">
          <label>Avg. satisfaction rating</label>
          <div class="stat-secondary-value">{{ avgSatisfactionRating }}/5</div>
        </div>
        <div class="stat-secondary hstack">
          <label>Avg. correction rate</label>
          <div class="stat-secondary-value">{{ avgCorrectionRate }}%</div>
        </div>
      </div>
    </div>
    
    <div class="insights hstack">
      <div class="insight-card vstack">
        <h4>Top Performer</h4>
        <div class="insight-content">
          <div class="agent-name">{{ topPerformer?.title }}</div>
          <div class="metric">{{ topPerformer?.stats?.qualityScore }}/5 quality score</div>
        </div>
      </div>
      
      <div class="insight-card vstack">
        <h4>Most Active</h4>
        <div class="insight-content">
          <div class="agent-name">{{ mostActive?.title }}</div>
          <div class="metric">{{ mostActive?.stats?.totalConversations?.toLocaleString() }} conversations</div>
        </div>
      </div>
      
      <div class="insight-card vstack">
        <h4>Fastest Response</h4>
        <div class="insight-content">
          <div class="agent-name">{{ fastestResponse?.title }}</div>
          <div class="metric">{{ formatResponseTime(fastestResponse?.stats?.avgResponseTime) }} avg</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import { agents } from '@/data/agents.js';

  const totalAgents = computed(() => agents.length);

  const totalConversations = computed(() => {
    return agents.reduce((sum, agent) => sum + (agent.stats?.totalConversations || 0), 0);
  });

  const avgQualityScore = computed(() => {
    const total = agents.reduce((sum, agent) => sum + (agent.stats?.qualityScore || 0), 0);
    return (total / agents.length).toFixed(1);
  });

  const avgResolutionRate = computed(() => {
    const total = agents.reduce((sum, agent) => sum + (agent.stats?.resolutionRate || 0), 0);
    return (total / agents.length).toFixed(1);
  });

  const avgFlagRate = computed(() => {
    const total = agents.reduce((sum, agent) => sum + (agent.stats?.flagRate || 0), 0);
    return (total / agents.length).toFixed(1);
  });

  const avgCorrectionRate = computed(() => {
    const total = agents.reduce((sum, agent) => sum + (agent.stats?.correctionPercentage || 0), 0);
    return (total / agents.length).toFixed(1);
  });

  const avgResponseTime = computed(() => {
    const total = agents.reduce((sum, agent) => sum + (agent.stats?.avgResponseTime || 0), 0);
    return Math.round(total / agents.length);
  });

  const avgSatisfactionRating = computed(() => {
    const total = agents.reduce((sum, agent) => sum + (agent.stats?.satisfactionRating || 0), 0);
    return (total / agents.length).toFixed(1);
  });

  const avgFirstContactResolution = computed(() => {
    const total = agents.reduce((sum, agent) => sum + (agent.stats?.firstContactResolution || 0), 0);
    return (total / agents.length).toFixed(1);
  });

  const avgUptime = computed(() => {
    const total = agents.reduce((sum, agent) => sum + (agent.stats?.uptime || 0), 0);
    return (total / agents.length).toFixed(1);
  });

  const topPerformer = computed(() => {
    return agents.reduce((best, agent) => {
      const bestScore = best?.stats?.qualityScore || 0;
      const agentScore = agent.stats?.qualityScore || 0;
      return agentScore > bestScore ? agent : best;
    }, null);
  });

  const mostActive = computed(() => {
    return agents.reduce((most, agent) => {
      const mostConversations = most?.stats?.totalConversations || 0;
      const agentConversations = agent.stats?.totalConversations || 0;
      return agentConversations > mostConversations ? agent : most;
    }, null);
  });

  const fastestResponse = computed(() => {
    return agents.reduce((fastest, agent) => {
      const fastestTime = fastest?.stats?.avgResponseTime || Infinity;
      const agentTime = agent.stats?.avgResponseTime || Infinity;
      return agentTime < fastestTime ? agent : fastest;
    }, null);
  });

  function formatResponseTime(seconds) {
    if (!seconds) return 'N/A';
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (remainingSeconds === 0) return `${minutes}m`;
    return `${minutes}m ${remainingSeconds}s`;
  }
</script>

<style scoped>
  .agents-summary {
    gap: var(--space-l);
    background-color: var(--color-surface);
    border: 1px solid var(--color-surface-tint-dark);
    border-radius: var(--radius-l);
    padding: var(--space-m);
  }

  .summary-header h3 {
    font-size: var(--font-size-l);
    font-weight: var(--font-weight-semibold);
    margin: 0;
  }

  .summary-header p {
    color: var(--color-chrome-fg-secondary);
    margin: var(--space-xxs) 0 0 0;
  }

  .stats {
    gap: var(--space-m);
  }

  .stat {
    flex: 1;
    background-color: var(--color-surface-tint);
    border: 1px solid var(--color-surface-tint-dark);
    border-radius: var(--radius-l);
    padding: var(--space-s) var(--space-m);
  }

  .stat-primary {
    justify-content: space-between;
    margin-bottom: var(--space-xs);
  }

  .stat-primary label {
    font-size: var(--font-size-m);
    font-weight: var(--font-weight-semibold);
  }

  .stat-primary-value {
    font-size: var(--font-size-l);
    font-weight: var(--font-weight-bold);
  }

  .stat-secondary {
    font-size: var(--font-size-s);
    padding: var(--space-xxs) 0;
    justify-content: space-between;
  }

  .stat-secondary label {
    color: var(--color-chrome-fg-secondary);
  }

  .stat-secondary-value {
    font-weight: var(--font-weight-semibold);
    color: var(--color-chrome-fg-secondary);
  }

  .insights {
    gap: var(--space-m);
  }

  .insight-card {
    flex: 1;
    background-color: var(--color-surface-tint);
    border: 1px solid var(--color-surface-tint-dark);
    border-radius: var(--radius-l);
    padding: var(--space-s) var(--space-m);
    gap: var(--space-xs);
  }

  .insight-card h4 {
    font-size: var(--font-size-s);
    color: var(--color-chrome-fg-secondary);
    font-weight: var(--font-weight-medium);
    margin: 0;
  }

  .insight-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-xxs);
  }

  .agent-name {
    font-weight: var(--font-weight-semibold);
  }

  .metric {
    font-size: var(--font-size-s);
    color: var(--color-chrome-fg-secondary);
  }
</style> 