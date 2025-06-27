<template>
  <RouterLink :to="to" class="activity-list-item">
    <div class="datetime">{{ formatDate(item.datetime) }}</div>
    <div class="event">{{ item.event }}</div>
    <div class="summary">{{ item.summary }}</div>
    <div v-if="item.customer" class="customer">
        <img :src="gravatarUrl(item.customer)" alt="Gravatar" width="28" height="28" class="gravatar" :title="item.customer" />
        <!-- {{ item.customer }} -->
    </div>
  </RouterLink>
</template>

<script setup>
import CryptoJS from 'crypto-js';
import { RouterLink } from 'vue-router';

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  to: {
    type: String,
    required: true,
  }
});

function formatDate(datetime) {
  const date = new Date(datetime);
  const month = date.toLocaleString(undefined, { month: 'short' });
  const day = date.getDate();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  return `${month} ${day} • ${hours}:${minutes} ${ampm}`;
}

function gravatarUrl(email) {
  if (!email) return '';
  const hash = CryptoJS.SHA256(email.trim().toLowerCase()).toString(CryptoJS.enc.Hex);
  return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
}
</script>

<style scoped>
.activity-list-item {
  display: flex;
  align-items: center;
  gap: var(--space-s);
  background-color: var(--color-surface);
  padding: var(--space-xs);
  min-height: 44px;
  border-bottom: 1px solid var(--color-surface-tint-dark);
  cursor: pointer;
  text-decoration: none;
  width: 100%;
  min-width: 0;
}

.activity-list-item:last-child {
  border-bottom: none;
}

.activity-list-item:hover {
  background-color: var(--color-surface-tint);
  border-color: transparent;
}

.datetime {
  font-size: var(--font-size-s);
  color: var(--color-chrome-fg-tertiary);
  width: 120px;
  text-align: right;
  flex: 0 0 auto;
}

.customer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.gravatar {
  border-radius: var(--radius-s);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  vertical-align: middle;
}

.event {
  flex: 0 0 auto;
}

.summary {
  color: var(--color-chrome-fg-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-width: 0;
}
</style> 