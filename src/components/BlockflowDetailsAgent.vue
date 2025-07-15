<template>
    <div class="agent-details">
        <div class="editable-field" :class="{ 'editing': isEditingName }">
            <div v-if="!isEditingName" class="field-display">
                <h3 class="agent-title">{{ agentName || 'Untitled Agent' }}</h3>
                <button class="edit-button" @click="startEditingName">
                    <PencilIcon size="14" />
                </button>
            </div>
            <div v-else class="field-edit">
                <input 
                    ref="nameInput"
                    type="text"
                    class="inline-input"
                    v-model="agentName"
                    @keyup.enter="stopEditingName"
                    @keyup.escape="cancelEditingName"
                    placeholder="Enter agent name"
                />
                <button class="save-button" @click="stopEditingName">
                    <CheckIcon size="14" />
                </button>
                <button class="cancel-button" @click="cancelEditingName">
                    <XIcon size="14" />
                </button>
            </div>
        </div>

        <div class="editable-field" :class="{ 'editing': isEditingDescription }">
            <div v-if="!isEditingDescription" class="field-display">
                <p class="text-description">{{ agentDescription || 'No description' }}</p>
                <button class="edit-button" @click="startEditingDescription">
                    <PencilIcon size="14" />
                </button>
            </div>
            <div v-else class="field-edit">
                <textarea 
                    ref="descriptionInput"
                    class="inline-textarea"
                    v-model="agentDescription"
                    @keyup.escape="cancelEditingDescription"
                    placeholder="Describe what this agent does"
                    :rows="2"
                ></textarea>
                <div class="edit-actions">
                    <button class="save-button" @click="stopEditingDescription">
                        <CheckIcon size="14" />
                    </button>
                    <button class="cancel-button" @click="cancelEditingDescription">
                        <XIcon size="14" />
                    </button>
                </div>
            </div>
        </div>

        <hr />

        <div class="field-group">
            <label class="text-label">Model</label>
            <Dropdown
                :label="selectedModelLabel"
                :options="modelOptions"
                :selectedValue="selectedModel"
                @select="handleModelSelect"
            />
        </div>

        <div class="field-group">
            <label class="text-label">Language</label>
            <Dropdown
                :label="selectedLanguageLabel"
                :options="languageOptions"
                :selectedValue="selectedLanguage"
                @select="handleLanguageSelect"
            />
        </div>

        <div class="field-group">
            <label class="text-label">Temperature</label>
            <div class="temperature-container">
                <input 
                    type="range"
                    class="temperature-slider"
                    v-model="temperature"
                    min="0"
                    max="2"
                    step="0.1"
                />
                <span class="temperature-value">{{ temperature }}</span>
            </div>
            <p class="text-description">Controls randomness: 0 is focused, 2 is creative</p>
        </div>

        <hr />

        <FieldGroup 
            label="Custom instructions"
            type="textarea"
            :rows="6"
            v-model="customInstructions"
            placeholder="Enter custom instructions for the agent"
            description="Provide specific instructions on how the agent should behave, what it should focus on, and any constraints."
        />

        <FieldGroup 
            label="Greeting"
            type="textarea"
            :rows="3"
            v-model="greeting"
            description="This is the greeting message that will be sent when they start a conversation with the agent. Often used for previewing and testing agents."
        />

        <hr />

        <details open>
            <summary class="metadata-summary">Metadata</summary>
            <dl>
                <dt>Created</dt>
                <dd>{{ formatDate(agent?.createdAt) }}</dd>
                <dt>Updated</dt>
                <dd>{{ formatDate(agent?.updatedAt) }}</dd>
                <dt>Version</dt>
                <dd>{{ agent?.version }}</dd>
                <dt>Status</dt>
                <dd>{{ agent?.status }}</dd>
                <dt>Owner</dt>
                <dd>{{ agent?.owner }}</dd>
            </dl>
        </details>

        <hr />

        <h4>Global context</h4>
        <div class="context-variables">
            <BlockflowVariable 
                v-for="variable in contextVariables" 
                :key="variable" 
                type="context"
                :value="variable"
            />
        </div>

        <hr />

        <h4>Variables</h4>
        <div class="variables">
            <BlockflowVariable 
                v-for="variable in variables" 
                :key="variable" 
                type="variable"
                :value="variable"
            />
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, watch, nextTick } from 'vue';
    import { PencilIcon, CheckIcon, XIcon } from 'lucide-vue-next';
    import BlockflowVariable from './BlockflowVariable.vue';
    import FieldGroup from './FieldGroup.vue';
    import Dropdown from './Dropdown.vue';

    const props = defineProps({
        agent: {
            type: Object,
            default: null
        },
        contextVariables: {
            type: Array,
            default: () => []
        },
        variables: {
            type: Array,
            default: () => []
        }
    });

    // Model and language options
    const modelOptions = [
        { value: 'gpt-4', label: 'GPT-4' },
        { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
        { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
        { value: 'claude-3-opus', label: 'Claude 3 Opus' },
        { value: 'claude-3-sonnet', label: 'Claude 3 Sonnet' },
        { value: 'claude-3-haiku', label: 'Claude 3 Haiku' },
        { value: 'gemini-pro', label: 'Gemini Pro' },
        { value: 'gemini-pro-vision', label: 'Gemini Pro Vision' },
        { value: 'llama-2-70b', label: 'Llama 2 70B' },
        { value: 'mixtral-8x7b', label: 'Mixtral 8x7B' }
    ];

    const languageOptions = [
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Spanish' },
        { value: 'fr', label: 'French' },
        { value: 'de', label: 'German' },
        { value: 'it', label: 'Italian' },
        { value: 'pt', label: 'Portuguese' },
        { value: 'nl', label: 'Dutch' },
        { value: 'ru', label: 'Russian' },
        { value: 'ja', label: 'Japanese' },
        { value: 'ko', label: 'Korean' },
        { value: 'zh', label: 'Chinese' },
        { value: 'ar', label: 'Arabic' },
        { value: 'hi', label: 'Hindi' },
        { value: 'tr', label: 'Turkish' },
        { value: 'pl', label: 'Polish' },
        { value: 'sv', label: 'Swedish' },
        { value: 'da', label: 'Danish' },
        { value: 'no', label: 'Norwegian' },
        { value: 'fi', label: 'Finnish' }
    ];

    // Reactive data for form fields
    const agentName = ref(props.agent?.title || '');
    const agentDescription = ref(props.agent?.description || '');
    const selectedModel = ref(props.agent?.model || 'gpt-4');
    const selectedLanguage = ref(props.agent?.language || 'en');
    const temperature = ref(props.agent?.temperature || 0.7);
    const customInstructions = ref(props.agent?.instructions || '');
    const greeting = ref(props.agent?.greeting || '');

    // Edit state
    const isEditingName = ref(false);
    const isEditingDescription = ref(false);
    const originalName = ref('');
    const originalDescription = ref('');
    const nameInput = ref(null);
    const descriptionInput = ref(null);

    // Computed properties for dropdown labels
    const selectedModelLabel = computed(() => {
        const option = modelOptions.find(opt => opt.value === selectedModel.value);
        return option ? option.label : 'Select model';
    });

    const selectedLanguageLabel = computed(() => {
        const option = languageOptions.find(opt => opt.value === selectedLanguage.value);
        return option ? option.label : 'Select language';
    });

    // Edit functions
    const startEditingName = async () => {
        originalName.value = agentName.value;
        isEditingName.value = true;
        await nextTick();
        nameInput.value?.focus();
        nameInput.value?.select();
    };

    const stopEditingName = () => {
        isEditingName.value = false;
    };

    const cancelEditingName = () => {
        agentName.value = originalName.value;
        isEditingName.value = false;
    };

    const startEditingDescription = async () => {
        originalDescription.value = agentDescription.value;
        isEditingDescription.value = true;
        await nextTick();
        descriptionInput.value?.focus();
        descriptionInput.value?.select();
    };

    const stopEditingDescription = () => {
        isEditingDescription.value = false;
    };

    const cancelEditingDescription = () => {
        agentDescription.value = originalDescription.value;
        isEditingDescription.value = false;
    };

    // Dropdown handlers
    const handleModelSelect = (option) => {
        selectedModel.value = option.value;
    };

    const handleLanguageSelect = (option) => {
        selectedLanguage.value = option.value;
    };

    // Helper function to format dates
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    // Watch for agent prop changes and update form fields
    watch(() => props.agent, (newAgent) => {
        if (newAgent) {
            agentName.value = newAgent.title || '';
            agentDescription.value = newAgent.description || '';
            selectedModel.value = newAgent.model || 'gpt-4';
            selectedLanguage.value = newAgent.language || 'en';
            temperature.value = newAgent.temperature || 0.7;
            customInstructions.value = newAgent.instructions || '';
            greeting.value = newAgent.greeting || '';
        }
    }, { immediate: true });
</script>

<style scoped>
    .agent-details {
        height: 100%;
        overflow-y: auto;
    }

    /* Editable fields */
    .editable-field {
        margin-bottom: var(--space-m);
        position: relative;
    }

    .field-display {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
    }

    .field-display .agent-title {
        margin: 0;
        flex: 1;
    }

    .field-display .text-description {
        margin: 0;
        flex: 1;
    }

    .edit-button {
        opacity: 0;
        transition: opacity var(--transition-quick);
        background: transparent;
        border: none;
        padding: var(--space-xxs);
        color: var(--color-surface-fg-secondary);
        cursor: pointer;
        border-radius: var(--radius-s);
    }

    .editable-field:hover .edit-button,
    .editable-field.editing .edit-button {
        opacity: 1;
    }

    .edit-button:hover {
        background: var(--color-surface-tint);
        color: var(--color-surface-fg);
    }

    .field-edit {
        display: flex;
        align-items: flex-start;
        gap: var(--space-xs);
    }

    .inline-input,
    .inline-textarea {
        flex: 1;
        font-size: inherit;
        font-family: inherit;
        padding: var(--space-xs);
        border: 1px solid var(--color-surface-tint-dark);
        border-radius: var(--radius-s);
        background: var(--color-surface);
        color: var(--color-surface-fg);
    }

    .inline-input {
        font-size: var(--font-size-l);
        font-weight: var(--font-weight-semibold);
    }

    .inline-textarea {
        resize: vertical;
        min-height: 60px;
    }

    .save-button,
    .cancel-button {
        background: transparent;
        border: none;
        padding: var(--space-xxs);
        cursor: pointer;
        border-radius: var(--radius-s);
        color: var(--color-surface-fg-secondary);
    }

    .save-button:hover {
        background: var(--color-success-subtle);
        color: var(--color-success);
    }

    .cancel-button:hover {
        background: var(--color-danger-subtle);
        color: var(--color-danger);
    }

    .edit-actions {
        display: flex;
        flex-direction: column;
        gap: var(--space-xxs);
    }

    /* Field group styles */
    .field-group {
        margin-bottom: var(--space-m);
    }

    .field-group .text-label {
        display: block;
        margin-bottom: var(--space-xs);
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-semibold);
        color: var(--color-surface-fg-secondary);
    }

    /* Temperature slider */
    .temperature-container {
        display: flex;
        align-items: center;
        gap: var(--space-m);
        margin-bottom: var(--space-xs);
    }

    .temperature-slider {
        flex: 1;
        height: 4px;
        -webkit-appearance: none;
        appearance: none;
        background: var(--color-surface-tint);
        border-radius: 2px;
        outline: none;
    }

    .temperature-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 16px;
        height: 16px;
        background: var(--color-accent);
        border-radius: 50%;
        cursor: pointer;
        transition: transform var(--transition-quick);
    }

    .temperature-slider::-moz-range-thumb {
        width: 16px;
        height: 16px;
        background: var(--color-accent);
        border-radius: 50%;
        cursor: pointer;
        border: none;
        transition: transform var(--transition-quick);
    }

    .temperature-slider:hover::-webkit-slider-thumb {
        transform: scale(1.2);
    }

    .temperature-slider:hover::-moz-range-thumb {
        transform: scale(1.2);
    }

    .temperature-value {
        min-width: 2.5em;
        text-align: right;
        font-weight: var(--font-weight-semibold);
        color: var(--color-surface-fg);
    }

    .context-variables {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-xs);
        margin-top: var(--space-s);
    }

    .variables {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-xs);
        margin-top: var(--space-s);
    }

    /* Metadata details */
    details {
        margin: var(--space-m) 0;
    }

    .metadata-summary {
        cursor: pointer;
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-semibold);
        color: var(--color-surface-fg-secondary);
        margin-bottom: var(--space-s);
        user-select: none;
    }

    .metadata-summary:hover {
        color: var(--color-surface-fg);
    }

    /* Definition list styles */
    dl {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: var(--space-xs) var(--space-m);
        margin: var(--space-m) 0;
        padding-left: var(--space-m);
    }

    dt {
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-semibold);
        color: var(--color-surface-fg-secondary);
        text-align: right;
        padding-right: var(--space-xs);
    }

    dd {
        font-size: var(--font-size-s);
        color: var(--color-surface-fg);
        margin: 0;
    }
</style> 