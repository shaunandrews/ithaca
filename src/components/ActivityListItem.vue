<template>
  <div class="activity-list-item">
    <div class="activity-datetime">{{ formatDate(item.datetime) }}</div>
    <div class="activity-event">{{ item.event }}</div>
    <div class="activity-summary">{{ item.summary }}</div>
    <div v-if="item.customer" class="activity-customer">
      <img :src="gravatarUrl(item.customer)" alt="Gravatar" width="20" height="20" class="activity-gravatar" />
      <!-- {{ item.customer }} -->
    </div>
  </div>
</template>

<script setup>
import CryptoJS from 'crypto-js';

const props = defineProps({
  item: {
    type: Object,
    required: true
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
  padding: var(--space-s) var(--space-m);
  border-bottom: 1px solid var(--color-surface-tint);
}

.activity-list-item:hover {
  background-color: var(--color-surface-tint);
}

.activity-list-item > * {
  /* flex: 0 0 auto; */
}

.activity-datetime {
  font-size: var(--font-size-s);
  color: var(--color-chrome-fg-tertiary);
  width: 140px;
  text-align: right;
  flex: 0 0 auto;
}

.activity-customer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
}

.activity-gravatar {
  border-radius: var(--radius-s);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  vertical-align: middle;
}

.activity-event {
  flex: 0 0 auto;
}

.activity-summary {
  color: var(--color-chrome-fg-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style> 