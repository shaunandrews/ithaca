<template>
  <div class="agent-summary vstack">
    <div class="agent-info hstack">
      <p class="agent-description">{{ agent.description }}</p>
      <div class="agent-owner">
        <img :src="`/images/${agent.ownerIcon}`" :alt="agent.owner" class="owner-icon" />
        <span>{{ agent.owner }}</span>
      </div>
    </div>
    
    <div class="stats hstack">
      <div class="stat vstack">
        <div class="stat-primary hstack">
          <label>Conversations</label>
          <div class="stat-primary-value">{{ totalConversations.toLocaleString() }}</div>  
        </div>
        
        <div class="stat-secondary hstack">
          <label>Avg. response time</label>
          <div class="stat-secondary-value">{{ formatResponseTime(avgResponseTime) }}</div>
        </div>
        <div class="stat-secondary hstack">
          <label>Uptime</label>
          <div class="stat-secondary-value">{{ uptime }}%</div>
        </div>
      </div>

      <div class="stat vstack">
        <div class="stat-primary hstack">
          <label>Resolution rate</label>
          <div class="stat-primary-value">{{ resolutionRate }}%</div>
        </div>
        <div class="stat-secondary hstack">
          <label>First contact resolution</label>
          <div class="stat-secondary-value">{{ firstContactResolution }}%</div>
        </div>
        <!-- <div class="stat-secondary hstack">
          <label>Escalation rate</label>
          <div class="stat-secondary-value">{{ escalationRate }}%</div>
        </div> -->
        <div class="stat-secondary hstack">
          <label>Flag rate</label>
          <div class="stat-secondary-value">{{ flagRate }}%</div>
        </div>
      </div>

      <div class="stat vstack">
        <div class="stat-primary hstack">
          <label>Quality score</label>
          <div class="stat-primary-value">{{ qualityScore }}/5</div>
        </div>
        <div class="stat-secondary hstack">
          <label>Satisfaction rating</label>
          <div class="stat-secondary-value">{{ satisfactionRating }}/5</div>
        </div>
        <div class="stat-secondary hstack">
          <label>Correction rate</label>
          <div class="stat-secondary-value">{{ correctionPercentage }}%</div>
        </div>
      </div>
    </div>
    
    <div class="feedback-themes vstack">
      <h4>Common feedback themes</h4>
      <p>The most common things said while reviewing agent conversations.</p>
      <div class="themes-list">
        <div v-for="theme in commonFeedbackThemes" :key="theme" class="theme-item">
          {{ theme }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue';

  const props = defineProps({
    agent: {
      type: Object,
      required: true
    }
  });

  const totalConversations = computed(() => {
    return props.agent.stats?.totalConversations || 0;
  });

  const qualityScore = computed(() => {
    return props.agent.stats?.qualityScore || 0;
  });

  const escalationRate = computed(() => {
    return props.agent.stats?.escalationRate || 0;
  });

  const resolutionRate = computed(() => {
    return props.agent.stats?.resolutionRate || 0;
  });

  const flagRate = computed(() => {
    return props.agent.stats?.flagRate || 0;
  });

  const correctionPercentage = computed(() => {
    return props.agent.stats?.correctionPercentage || 0;
  });

  const avgResponseTime = computed(() => {
    return props.agent.stats?.avgResponseTime || 0;
  });

  const agentVersion = computed(() => {
    return props.agent.stats?.agentVersion || 'N/A';
  });

  const satisfactionRating = computed(() => {
    return props.agent.stats?.satisfactionRating || 0;
  });

  const firstContactResolution = computed(() => {
    return props.agent.stats?.firstContactResolution || 0;
  });

  const uptime = computed(() => {
    return props.agent.stats?.uptime || 0;
  });

  const commonFeedbackThemes = computed(() => {
    return props.agent.stats?.commonFeedbackThemes || [];
  });

  const performanceTrend = computed(() => {
    return props.agent.stats?.performanceTrend || 'stable';
  });

  const lastUpdated = computed(() => {
    return props.agent.stats?.lastUpdated || null;
  });

  const toolsCount = computed(() => props.agent.tools.length);

  const recentHighlights = computed(() => {
    return props.agent.activity
      .slice(0, 3)
      .map(item => ({
        ...item,
        id: item.id || Math.random()
      }));
  });

  function formatRelativeTime(datetime) {
    const now = new Date();
    const date = new Date(datetime);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  }

  function formatResponseTime(seconds) {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (remainingSeconds === 0) return `${minutes}m`;
    return `${minutes}m ${remainingSeconds}s`;
  }
</script>

<style scoped>
  .agent-summary {
    gap: var(--space-l);
  }

  .agent-info {
    justify-content: space-between;
  }

  .stats {
    gap: var(--space-m);
  }

  .stat {
    flex: 1;
    background-color: var(--color-surface);
    border: 1px solid var(--color-surface-tint-dark);
    border-radius: var(--radius-l);
    padding: var(--space-s) var(--space-m);
  }

  .stat-primary {
    justify-content: space-between;
  }

  .stat-primary label {
    font-size: var(--font-size-l);
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

  .agent-owner {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    font-size: var(--font-size-s);
    color: var(--color-chrome-fg-secondary);
  }

  .owner-icon {
    width: 16px;
    height: 16px;
    border-radius: var(--radius-s);
  }

  .agent-description {
    color: var(--color-chrome-fg-secondary);
  }

  .feedback-themes {
    gap: var(--space-xxs);
  }

  .feedback-themes h4 {
    font-size: var(--font-size-s);
    color: var(--color-chrome-fg-secondary);
    font-weight: var(--font-weight-medium);
  }

  .feedback-themes p {
    font-size: var(--font-size-s);
    color: var(--color-chrome-fg-secondary);
    margin-bottom: var(--space-xs);
  }

  .themes-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
  }

  .theme-item {
    padding: var(--space-xxs) var(--space-xs);
    border: 1px solid var(--color-surface-tint-dark);
    border-radius: var(--radius-s);
    font-size: var(--font-size-s);
    color: var(--color-chrome-fg-secondary);
  }
</style> 