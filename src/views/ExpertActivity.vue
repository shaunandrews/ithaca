<template>
  <div class="expert-activity">
    <div class="activity-header">
      <h3>Recent Activity</h3>
      <div class="activity-filters">
        <select>
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </div>
    </div>

    <div class="activity-list">
      <div class="activity-item" v-for="activity in recentActivity" :key="activity.id">
        <div class="activity-icon">
          <img :src="`/images/${activity.agent.icon}`" :alt="activity.agent.title" />
        </div>
        <div class="activity-content">
          <div class="activity-title">
            Used by {{ activity.agent.title }}
          </div>
          <div class="activity-description">
            {{ activity.description }}
          </div>
          <div class="activity-meta">
            <span class="activity-time">{{ activity.time }}</span>
            <span class="activity-status" :class="activity.status">{{ activity.status }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="recentActivity.length === 0" class="empty-state">
      <p>No recent activity for this expert.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { experts } from '@/data/experts.js';

const route = useRoute();
const expertId = computed(() => Number(route.params.id));
const expert = computed(() => experts.find(e => e.id === expertId.value));

// Mock data for recent activity
const recentActivity = computed(() => {
  if (!expert.value) return [];
  
  // This would normally come from an API
  return [
    {
      id: 1,
      agent: { title: 'Customer Support Bot', icon: 'icon-teamhal.png' },
      description: 'Retrieved billing information for customer #12345',
      time: '2 hours ago',
      status: 'success'
    },
    {
      id: 2,
      agent: { title: 'Technical Assistant', icon: 'icon-teamlighthouse.png' },
      description: 'Found HTML block for navigation menu',
      time: '5 hours ago',
      status: 'success'
    },
    {
      id: 3,
      agent: { title: 'Customer Support Bot', icon: 'icon-teamhal.png' },
      description: 'Failed to retrieve billing data - timeout',
      time: '1 day ago',
      status: 'error'
    }
  ].filter(() => Math.random() > 0.3); // Randomly show/hide items for demo
});
</script>

<style scoped>
.expert-activity {
  padding: var(--space-m);
  height: 100%;
  overflow-y: auto;
}

.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-m);
}

.activity-header h3 {
  font-size: var(--font-size-l);
  font-weight: var(--font-weight-semibold);
  margin: 0;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-s);
}

.activity-item {
  display: flex;
  gap: var(--space-s);
  padding: var(--space-s);
  background: var(--color-surface);
  border: 1px solid var(--color-surface-tint);
  border-radius: var(--radius);
}

.activity-icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.activity-icon img {
  width: 100%;
  height: 100%;
  border-radius: var(--radius);
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--space-xxs);
}

.activity-description {
  color: var(--color-surface-fg-secondary);
  font-size: var(--font-size-s);
  margin-bottom: var(--space-xs);
}

.activity-meta {
  display: flex;
  gap: var(--space-s);
  font-size: var(--font-size-xs);
  color: var(--color-surface-fg-secondary);
}

.activity-status {
  padding: 2px 8px;
  border-radius: var(--radius-small);
  font-weight: var(--font-weight-medium);
}

.activity-status.success {
  background: var(--color-green-100);
  color: var(--color-green-900);
}

.activity-status.error {
  background: var(--color-red-100);
  color: var(--color-red-900);
}

.empty-state {
  text-align: center;
  padding: var(--space-xl);
  color: var(--color-surface-fg-secondary);
}

select {
  padding: var(--space-xxs) var(--space-xs);
  border: 1px solid var(--color-surface-tint);
  border-radius: var(--radius);
  background: var(--color-surface);
  color: var(--color-surface-fg);
}
</style> 