<template>
    <div class="new-agent-content">
        <div class="new-agent-header">
            <div class="header-nav">
                <button @click="$router.back()" class="btn-back">
                    ← Back to agents
                </button>
            </div>
            <h1>Create new agent</h1>
            <p class="header-description">
                Configure your agent with a name, description, model, and custom prompt.
            </p>
        </div>

        <div class="new-agent-form">
            <div class="form-section">
                <h2>Basic Information</h2>
                <FieldGroup 
                    label="Agent Name" 
                    required
                    type="input"
                    v-model="formData.name"
                    placeholder="Enter agent name"
                />
                <div v-if="errors.name" class="error-message">{{ errors.name }}</div>

                <FieldGroup 
                    label="Description" 
                    required
                    type="textarea"
                    v-model="formData.description"
                    placeholder="Describe what this agent does"
                    :rows="3"
                />
                <div v-if="errors.description" class="error-message">{{ errors.description }}</div>
            </div>

            <div class="form-section">
                <h2>Model Configuration</h2>
                <div class="field-group">
                    <label class="text-label">Model</label>
                    <Dropdown
                        :label="selectedModelLabel"
                        :options="modelOptions"
                        :selectedValue="formData.model"
                        @select="handleModelSelect"
                    />
                    <div v-if="errors.model" class="error-message">{{ errors.model }}</div>
                </div>

                <div class="field-group">
                    <label class="text-label">Language</label>
                    <Dropdown
                        :label="selectedLanguageLabel"
                        :options="languageOptions"
                        :selectedValue="formData.language"
                        @select="handleLanguageSelect"
                    />
                </div>

                <div class="field-group">
                    <label class="text-label">Temperature</label>
                    <div class="temperature-container">
                        <input 
                            type="range"
                            class="temperature-slider"
                            v-model="formData.temperature"
                            min="0"
                            max="2"
                            step="0.1"
                        />
                        <span class="temperature-value">{{ formData.temperature }}</span>
                    </div>
                    <p class="text-description">Controls randomness: 0 is focused, 2 is creative</p>
                </div>
            </div>

            <div class="form-section">
                <h2>Instructions & Behavior</h2>
                <FieldGroup 
                    label="Custom instructions"
                    type="textarea"
                    :rows="6"
                    v-model="formData.instructions"
                    placeholder="Enter custom instructions for the agent"
                    description="Provide specific instructions on how the agent should behave, what it should focus on, and any constraints."
                />

                <FieldGroup 
                    label="Greeting"
                    type="textarea"
                    :rows="3"
                    v-model="formData.greeting"
                    placeholder="Enter a greeting message"
                    description="This is the greeting message that will be sent when they start a conversation with the agent."
                />
            </div>

            <div class="form-actions">
                <button 
                    type="button" 
                    @click="$router.back()"
                    class="btn-cancel"
                >
                    Cancel
                </button>
                <button 
                    type="button" 
                    @click="createAgent"
                    class="btn-create"
                    :disabled="!isFormValid || isCreating"
                >
                    {{ isCreating ? 'Creating...' : 'Create Agent' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import FieldGroup from '@/components/FieldGroup.vue';
import Dropdown from '@/components/Dropdown.vue';
import { agents } from '@/data/agents.js';

const router = useRouter();

// Model and language options (same as BlockflowDetailsAgent)
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

const formData = ref({
    name: '',
    description: '',
    model: '',
    language: 'en',
    temperature: 0.7,
    instructions: '',
    greeting: ''
});

const errors = ref({
    name: '',
    description: '',
    model: ''
});

const isCreating = ref(false);

// Computed properties for dropdown labels
const selectedModelLabel = computed(() => {
    const option = modelOptions.find(opt => opt.value === formData.value.model);
    return option ? option.label : 'Select model';
});

const selectedLanguageLabel = computed(() => {
    const option = languageOptions.find(opt => opt.value === formData.value.language);
    return option ? option.label : 'Select language';
});

const isFormValid = computed(() => {
    return formData.value.name.trim() && 
           formData.value.description.trim() && 
           formData.value.model &&
           !Object.values(errors.value).some(error => error);
});

// Dropdown handlers
const handleModelSelect = (option) => {
    formData.value.model = option.value;
    // Clear model error when a model is selected
    if (errors.value.model) {
        errors.value.model = '';
    }
};

const handleLanguageSelect = (option) => {
    formData.value.language = option.value;
};

function validateForm() {
    errors.value = {
        name: '',
        description: '',
        model: ''
    };

    if (!formData.value.name.trim()) {
        errors.value.name = 'Agent name is required';
    }

    if (!formData.value.description.trim()) {
        errors.value.description = 'Description is required';
    }

    if (!formData.value.model) {
        errors.value.model = 'Please select a model';
    }

    return Object.values(errors.value).every(error => !error);
}

async function createAgent() {
    if (!validateForm()) {
        return;
    }

    isCreating.value = true;

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Generate a unique ID using timestamp to avoid conflicts
        const newAgentId = Date.now();
        
        const newAgent = {
            id: newAgentId,
            title: formData.value.name,
            description: formData.value.description,
            model: formData.value.model,
            language: formData.value.language,
            temperature: formData.value.temperature,
            instructions: formData.value.instructions,
            greeting: formData.value.greeting,
            owner: 'You',
            ownerIcon: 'avatar-shaunandrews.png',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            version: '1.0.0',
            status: 'draft',
            tags: [],
            tools: [],
            workflow: {
                id: `agent-${newAgentId}-workflow`,
                name: formData.value.name,
                description: `Workflow for ${formData.value.name}`,
                steps: [
                    {
                        uid: 'start',
                        stepNumber: 1,
                        title: 'Start',
                        type: 'trigger',
                        inputs: [],
                        outputs: ['message']
                    }
                ],
                variables: ['message'],
                contextVariables: []
            },
            stats: {
                totalConversations: 0,
                qualityScore: 0,
                flagRate: 0,
                correctionPercentage: 0,
                avgResponseTime: 0,
                escalationRate: 0,
                agentVersion: '1.0.0',
                satisfactionRating: 0,
                resolutionRate: 0,
                firstContactResolution: 0,
                uptime: 0,
                commonFeedbackThemes: []
            }
        };

        // In a real app, this would be an API call
        agents.push(newAgent);

        // Navigate to the new agent's workbench with a blank flow
        router.push(`/agent/${newAgentId}/workbench`);
    } catch (error) {
        console.error('Error creating agent:', error);
        // Handle error (show notification, etc.)
    } finally {
        isCreating.value = false;
    }
}
</script>

<style scoped>
.new-agent-content {
    max-width: 800px;
    margin: 0 auto;
    padding: var(--space-l);
}

.new-agent-header {
    margin-bottom: var(--space-xl);
}

.header-nav {
    margin-bottom: var(--space-m);
}

.btn-back {
    background: none;
    border: none;
    color: var(--color-accent);
    cursor: pointer;
    font-size: 14px;
    padding: var(--space-xs) 0;
}

.btn-back:hover {
    text-decoration: underline;
}

.new-agent-header h1 {
    font-size: 32px;
    font-weight: 600;
    margin: 0 0 var(--space-s) 0;
    color: var(--color-surface-fg);
}

.header-description {
    color: var(--color-surface-fg-secondary);
    font-size: 16px;
    margin: 0;
}

.new-agent-form {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
}

.form-section {
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
}

.form-section h2 {
    font-size: 20px;
    font-weight: 600;
    margin: 0;
    color: var(--color-surface-fg);
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

.text-description {
    font-size: 12px;
    color: var(--color-surface-fg-secondary);
    margin-top: var(--space-xs);
    margin-bottom: 0;
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

.error-message {
    color: var(--color-error);
    font-size: 12px;
    margin-top: var(--space-xs);
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-s);
    margin-top: var(--space-l);
    padding-top: var(--space-l);
    border-top: 1px solid var(--color-surface-tint-dark);
}

.btn-cancel,
.btn-create {
    padding: var(--space-s) var(--space-m);
    border-radius: var(--radius);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-cancel {
    background: none;
    border: 1px solid var(--color-surface-tint-dark);
    color: var(--color-surface-fg);
}

.btn-cancel:hover {
    background: var(--color-surface-tint);
}

.btn-create {
    background: var(--color-accent);
    border: 1px solid var(--color-accent);
    color: white;
}

.btn-create:hover:not(:disabled) {
    background: var(--color-accent-dark);
    border-color: var(--color-accent-dark);
}

.btn-create:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>
