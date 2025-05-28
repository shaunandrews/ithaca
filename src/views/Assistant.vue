<template>
  <header v-if="assistant">
    <h2 class="assistant-title">{{ assistant.title }}</h2>
    <span class="separator">/</span>
    <nav>
      <ul>
        <li :class="{ active: activeTab === 'details' }" @click="activeTab = 'details'">Details</li>
        <li :class="{ active: activeTab === 'activity' }" @click="activeTab = 'activity'">Activity</li>
      </ul>
    </nav>
  </header>

  <div v-else>
    <p>Assistant not found.</p>
  </div>

  <div v-if="assistant && activeTab === 'details'" class="assistant-details hstack">
    <div class="assistant-config vstack">
      <div class="instructions">
        <h4>Instructions</h4>
        <div class="text-field" contenteditable="true">
          <template v-for="(paragraph, pIdx) in parsedInstructions" :key="pIdx">
            <p>
              <template v-for="(part, idx) in paragraph" :key="idx">
                <span v-if="part.type === 'text'">{{ part.value }}</span>
                <span
                  v-else-if="part.type === 'tool'"
                  class="highlight-tool"
                  contenteditable="false"
                  :title="part.value ? part.value : undefined"
                >
                  @{{ part.title }}<template v-if="part.value">: {{ part.value }}</template>
                </span>
              </template>
            </p>
          </template>
        </div>
      </div>

      <div class="tools-list hstack">
        <h4>Tools</h4>
        <ToolListItem
          v-for="(tool, idx) in assistant.tools"
          :key="idx"
          :icon="tool.icon"
          :title="tool.title"
          :subtitle="tool.subtitle"
        />
      </div>

      <div class="trigger">
        <h4>Trigger</h4>
        <select :value="assistant.trigger">
          <option value="on-demand">On-demand</option>
          <option value="scheduled">Scheduled</option>
          <option value="email-message">Email</option>
          <option value="chat-message">Chat</option>
          <option value="slack-message">Slack</option>
        </select>
      </div>
    </div>

    <div class="assistant-preview">
      <h4>Preview</h4>
      <div class="preview-canvas">
        <button><PlayIcon />Start preview</button>
        <p>Preview your assistant's behavior and chat with it to test it out.</p>
      </div>
    </div>
  </div>

  <div v-if="assistant && activeTab === 'activity'" class="assistant-activity">
    <ol>
      <li v-for="(item, idx) in assistant.activity" :key="idx">
        <span class="activity-datetime">{{ formatDate(item.datetime) }}</span>
        &bull;
        <span class="activity-event">{{ item.event }}</span>
        &mdash;
        <span class="activity-summary">{{ item.summary }}</span>
      </li>
    </ol>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import ToolListItem from '@/components/ToolListItem.vue';
import { assistants } from '@/data/assistants.js';
import { PlayIcon } from 'lucide-vue-next';
import { parseInstructions } from '@/data/parseInstructions.js';

const route = useRoute();
const assistantId = computed(() => Number(route.params.id));
const assistant = computed(() => assistants.find(a => a.id === assistantId.value));
const activeTab = ref('details');

const parsedInstructions = computed(() =>
  assistant.value ? parseInstructions(assistant.value.instructions) : []
);

function formatDate(datetime) {
  const date = new Date(datetime);
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
</script>

<style>
.text-field {
  padding: var(--space-s) var(--space-m);
  border-radius: var(--radius);
  border: 1px solid var(--color-surface-tint);
  background-color: var(--color-surface);
}

.text-field:focus {
  outline: none;
  border-color: var(--color-accent);
}

.text-field p {
  margin-bottom: var(--space-s);
}

.text-field p:last-child {
  margin-bottom: 0;
}

.highlight-tool {
  color: rgb(255, 50, 180);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-s);
  cursor: pointer;
  border: 1px solid transparent;
  white-space: nowrap;

}

.highlight-tool:hover {
  background-color: rgba(255, 50, 180, 0.1);
  border-color: rgba(255, 50, 180, 0.2);
}
</style>

<style scoped>
header {
  display: flex;
  align-items: center;
  gap: var(--space-m);
}

header h2 {
  font-size: var(--font-size-m);
}

nav ul {
  display: flex;
  gap: var(--space-s);
  padding: 0;
  margin: 0;
}

nav li {
  list-style: none;
  cursor: pointer;
  padding: var(--space-xxs) var(--space-xs);
  border-radius: var(--radius);
  color: var(--color-chrome-fg-secondary);
}

nav li.active {
  font-weight: var(--font-weight-bold);
  color: var(--color-chrome-fg);
}

nav li:hover {
  background-color: var(--color-surface-tint);
}

.assistant-details {
  gap: var(--space-l);
}

.assistant-config {
  gap: var(--space-m);
  width: 60%;
}

h4 {
  font-size: var(--font-size-s);
  margin-bottom: var(--space-xs);
}

.tools-list {
  gap: var(--space-xs);
  flex-wrap: wrap;
}

.preview-canvas {
  border: 1px solid var(--color-surface-tint);
  border-radius: var(--radius);
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-s);
  align-items: center;
  justify-content: center;
  text-align: center;
}

.assistant-activity ol {
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-s);
}

.assistant-activity li {
  list-style: none;
}

</style>