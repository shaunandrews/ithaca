<template>
  <div class="assistant-preview">
    <div class="section-header">
      <h4 class="section-title">Preview</h4>
      <p class="section-description">See how this assistant behaves and chat with it.</p>
    </div>
    <div class="preview-start" v-if="!started">
      <button @click="startPreview"><Play :size="18" />Start preview <span class="shortcut"><Command :size="12" /> <CornerDownLeft :size="12" /></span></button>
    </div>
    <ol class="events" v-else>
      <li v-for="(event, idx) in revealedEvents" :key="idx">
        <template v-if="event.state === 'loading'">
          <span class="spinner"></span> {{ event.loading }}
        </template>
        <template v-else-if="event.state === 'done'">
          <Check :size="18" class="done-icon" /> {{ event.done }}
          <ul v-if="event.details">
            <li v-for="(detail, dIdx) in event.details" :key="dIdx">{{ detail }}</li>
          </ul>
        </template>
        <template v-else-if="event.state === 'question'">
          <span class="bot-question">{{ event.question }}</span>
        </template>
        <template v-else-if="event.user">
          <span class="user-message">{{ event.message }}</span>
        </template>
      </li>
    </ol>
    <div class="preview-chat hstack">
      <input
        type="text"
        placeholder="Ask me anything..."
        v-model="userInput"
        :disabled="!waitingForInput"
        @keydown="onInputKeydown"
      />
      <button @click="sendUserInput" :disabled="!waitingForInput || !userInput.trim()"><Send :size="18" /></button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import { Play, Command, CornerDownLeft, Send, Check } from 'lucide-vue-next';

const props = defineProps({
  assistant: {
    type: Object,
    required: true,
  },
});

const started = ref(false);
const currentStep = ref(-1);
const revealedEvents = ref([]);
const userInput = ref('');
const chatHistory = ref([]); // For user messages
const waitingForInput = ref(false);

function startPreview() {
  if (!Array.isArray(props.assistant?.previewEvents) || props.assistant.previewEvents.length === 0) return;
  started.value = true;
  currentStep.value = 0;
  revealedEvents.value = [];
  chatHistory.value = [];
  userInput.value = '';
  waitingForInput.value = false;
  nextTick(() => runStep());
}

function runStep() {
  if (currentStep.value >= props.assistant.previewEvents.length) return;
  const event = props.assistant.previewEvents[currentStep.value];
  if (event.question) {
    revealedEvents.value.push({ ...event, state: 'question' });
    waitingForInput.value = true;
    userInput.value = '';
    return; // Wait for user input
  } else {
    // Push loading event
    revealedEvents.value.push({ ...event, state: 'loading' });
    waitingForInput.value = false;
    const thisEventIdx = revealedEvents.value.length - 1;
    setTimeout(() => {
      // Mark only this event as done
      revealedEvents.value[thisEventIdx].state = 'done';
      currentStep.value++;
      runStep();
    }, event.delay);
  }
}

function sendUserInput() {
  if (!waitingForInput.value || !userInput.value.trim()) return;
  // Add user message to chat history and event list
  chatHistory.value.push(userInput.value);
  revealedEvents.value.push({ user: true, message: userInput.value });
  waitingForInput.value = false;
  currentStep.value++;
  userInput.value = '';
  nextTick(() => runStep());
}

function onInputKeydown(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendUserInput();
  }
}

// Reset preview if assistant changes
watch(
  () => props.assistant,
  () => {
    started.value = false;
    currentStep.value = -1;
    revealedEvents.value = [];
    chatHistory.value = [];
    userInput.value = '';
    waitingForInput.value = false;
  }
);
</script>

<style scoped>
.assistant-preview {
  width: 40%;
  border-left: 1px solid var(--color-surface-tint);
  padding: var(--space-m);
  display: flex;
  flex-direction: column;
  gap: var(--space-s);
}

.preview-start {
  flex: 1;
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-s);
  align-items: center;
  justify-content: center;
  text-align: center;
}

.section-header {
  margin-bottom: var(--space-xs);
  user-select: none;
}

.section-title {
  font-size: var(--font-size-s);
  color: var(--color-surface-fg-tertiary);
}

.section-description {
  font-size: var(--font-size-s);
  color: var(--color-surface-fg-tertiary);
}

.preview-chat.hstack {
  display: flex;
  flex-direction: row;
  gap: var(--space-xs);
}

.events {
  list-style: none;
  padding: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-s);
  justify-content: flex-end;
  align-items: flex-end;
}

.spinner {
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 2px solid var(--color-surface-fg-tertiary);
  border-top: 2px solid transparent;
  border-radius: 50%;
  margin-right: 0.5em;
  animation: spin 0.8s linear infinite;
  vertical-align: middle;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.done-icon {
  color: var(--color-success, #2ecc40);
  vertical-align: middle;
  margin-right: 0.5em;
}

.bot-question {
  display: block;
  padding: var(--space-s) var(--space-m);
  background-color: var(--color-surface-tint);
  border-radius: var(--radius);
}

.user-message {
  text-align: right;
  display: inline-block;
  padding: var(--space-s) var(--space-m);
  background-color: var(--color-accent);
  border-radius: var(--radius);
  color: var(--color-accent-fg);
}
</style> 