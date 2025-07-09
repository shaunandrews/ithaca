<template>
    <div class="agent-versions">
        <div class="versions-content vstack">
            <div class="versions-header">
                <h4>Agent Versions</h4>
                <p class="versions-description">
                    Version history and changelog for {{ agent.title }}
                </p>
            </div>

            <div class="versions-list">
                <div 
                    v-for="version in versions" 
                    :key="version.version"
                    class="version-item"
                    :class="{ 'current-version': version.isCurrent }"
                >
                    <div class="version-header">
                        <div class="version-badge">
                            <span class="version-number">{{ version.version }}</span>
                            <span v-if="version.isCurrent" class="current-label">Current</span>
                        </div>
                        <div class="version-meta">
                            <span class="version-date">{{ formatDate(version.releaseDate) }}</span>
                            <div class="version-author">
                                <img
                                    :src="`/images/${version.authorIcon}`"
                                    :alt="version.author"
                                    width="20"
                                    height="20"
                                    class="author-avatar"
                                />
                                <span class="author-name">{{ version.author }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="version-content">
                        <h5 class="change-title">{{ version.changeDescription }}</h5>
                        <ul class="changes-list">
                            <li v-for="change in version.changes" :key="change" class="change-item">
                                {{ change }}
                            </li>
                        </ul>
                    </div>

                    <div class="version-actions">
                        <button 
                            class="action-button secondary"
                            @click="openDiffModal(version)"
                        >
                            View Diff
                        </button>
                        <button 
                            class="action-button primary"
                            @click="openInWorkbench(version)"
                        >
                            Open in Workbench
                        </button>
                    </div>
                </div>
            </div>

            <div class="versions-footer">
                <p class="footer-text">
                    Showing {{ versions.length }} version{{ versions.length !== 1 ? 's' : '' }}
                </p>
            </div>
        </div>

        <Modal :isOpen="isModalOpen" @close="closeModal">
            <div class="diff-modal">
                <h3 class="diff-title">
                    Changes in {{ selectedVersion?.version }}
                </h3>
                <p class="diff-description">
                    {{ selectedVersion?.changeDescription }}
                </p>
                
                <div class="diff-content">
                    <div class="diff-section">
                        <h4>Instructions</h4>
                        <div class="diff-view">
                            <div class="diff-side">
                                <h5>Previous Version</h5>
                                <pre class="diff-code previous">{{ getPreviousInstructions() }}</pre>
                            </div>
                            <div class="diff-side">
                                <h5>Current Version</h5>
                                <pre class="diff-code current">{{ getCurrentInstructions() }}</pre>
                            </div>
                        </div>
                    </div>

                    <div class="diff-section">
                        <h4>Configuration Changes</h4>
                        <div class="config-changes">
                            <div 
                                v-for="change in selectedVersion?.changes" 
                                :key="change"
                                class="config-change"
                            >
                                <span class="change-indicator">+</span>
                                {{ change }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-actions">
                    <button 
                        class="action-button secondary"
                        @click="closeModal"
                    >
                        Close
                    </button>
                    <button 
                        class="action-button primary"
                        @click="openInWorkbench(selectedVersion)"
                    >
                        Open in Workbench
                    </button>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script setup>
    import { computed, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { agents } from '@/data/agents.js';
    import { agentVersions } from '@/data/agentVersions.js';
    import Modal from '@/components/Modal.vue';

    const route = useRoute();
    const router = useRouter();
    const agentId = computed(() => Number(route.params.id));
    const agent = computed(() => agents.find((a) => a.id === agentId.value));
    const versions = computed(() => agentVersions[agentId.value] || []);

    const isModalOpen = ref(false);
    const selectedVersion = ref(null);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const openDiffModal = (version) => {
        selectedVersion.value = version;
        isModalOpen.value = true;
    };

    const closeModal = () => {
        isModalOpen.value = false;
        selectedVersion.value = null;
    };

    const openInWorkbench = (version) => {
        closeModal();
        router.push(`/agent/${agentId.value}/workbench?version=${version.version}`);
    };

    const getPreviousInstructions = () => {
        if (!selectedVersion.value) return '';
        
        // Mock previous version instructions - in real app this would come from version data
        const baseInstructions = agent.value?.instructions || '';
        const lines = baseInstructions.split('\n');
        // Remove some lines to show a diff
        return lines.slice(0, -2).join('\n');
    };

    const getCurrentInstructions = () => {
        if (!selectedVersion.value) return '';
        
        // Mock current version instructions - in real app this would come from version data
        const baseInstructions = agent.value?.instructions || '';
        const lines = baseInstructions.split('\n');
        // Add some lines to show a diff
        return lines.concat([
            '        Enhanced error handling and context awareness.',
            '        Improved user profile analysis for better personalization.'
        ]).join('\n');
    };
</script>

<style scoped>
    .agent-versions {
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .versions-content {
        height: 100%;
        overflow-y: auto;
        padding: var(--space-m);
    }

    .versions-header {
        margin-bottom: var(--space-l);
    }

    .versions-header h4 {
        font-size: var(--font-size-m);
        color: var(--color-surface-fg-primary);
        margin-bottom: var(--space-xs);
    }

    .versions-description {
        color: var(--color-surface-fg-secondary);
        font-size: var(--font-size-s);
        margin: 0;
    }

    .versions-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-m);
    }

    .version-item {
        border: 1px solid var(--color-surface-border);
        border-radius: var(--radius-m);
        padding: var(--space-m);
        background: var(--color-surface-bg);
        transition: all var(--transition-short);
    }

    .version-item:hover {
        border-color: var(--color-surface-border-hover);
        box-shadow: var(--shadow-s);
    }

    .current-version {
        border-color: var(--color-primary);
        background: var(--color-primary-bg);
    }

    .version-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: var(--space-m);
    }

    .version-badge {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
    }

    .version-number {
        font-family: var(--font-family-mono);
        font-size: var(--font-size-m);
        font-weight: var(--font-weight-medium);
        color: var(--color-surface-fg-primary);
    }

    .current-label {
        background: var(--color-primary);
        color: var(--color-primary-fg);
        padding: var(--space-3xs) var(--space-xs);
        border-radius: var(--radius-s);
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-medium);
    }

    .version-meta {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: var(--space-xs);
    }

    .version-date {
        color: var(--color-surface-fg-tertiary);
        font-size: var(--font-size-xs);
    }

    .version-author {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
    }

    .author-avatar {
        border-radius: var(--radius-s);
        flex-shrink: 0;
    }

    .author-name {
        color: var(--color-surface-fg-secondary);
        font-size: var(--font-size-xs);
    }

    .version-content {
        padding-top: var(--space-s);
        border-top: 1px solid var(--color-surface-border-subtle);
        margin-bottom: var(--space-m);
    }

    .change-title {
        color: var(--color-surface-fg-primary);
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-medium);
        margin-bottom: var(--space-s);
    }

    .changes-list {
        margin: 0;
        padding-left: var(--space-m);
        list-style: none;
    }

    .change-item {
        position: relative;
        color: var(--color-surface-fg-secondary);
        font-size: var(--font-size-s);
        line-height: 1.5;
        margin-bottom: var(--space-xs);
    }

    .change-item::before {
        content: '•';
        color: var(--color-primary);
        position: absolute;
        left: calc(-1 * var(--space-m));
        font-weight: var(--font-weight-bold);
    }

    .change-item:last-child {
        margin-bottom: 0;
    }

    .version-actions {
        display: flex;
        gap: var(--space-s);
        padding-top: var(--space-m);
        border-top: 1px solid var(--color-surface-border-subtle);
    }

    .action-button {
        padding: var(--space-xs) var(--space-s);
        border-radius: var(--radius-s);
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-medium);
        cursor: pointer;
        transition: all var(--transition-short);
        border: 1px solid transparent;
    }

    .action-button.primary {
        background: var(--color-primary);
        color: var(--color-primary-fg);
    }

    .action-button.primary:hover {
        background: var(--color-primary-hover);
    }

    .action-button.secondary {
        background: var(--color-surface-bg);
        color: var(--color-surface-fg-secondary);
        border-color: var(--color-surface-border);
    }

    .action-button.secondary:hover {
        background: var(--color-surface-bg-hover);
        border-color: var(--color-surface-border-hover);
    }

    .versions-footer {
        margin-top: var(--space-l);
        padding-top: var(--space-m);
        border-top: 1px solid var(--color-surface-border-subtle);
    }

    .footer-text {
        color: var(--color-surface-fg-tertiary);
        font-size: var(--font-size-xs);
        margin: 0;
        text-align: center;
    }

    /* Modal Styles */
    .diff-modal {
        min-width: 800px;
        max-width: 90vw;
    }

    .diff-title {
        color: var(--color-surface-fg-primary);
        font-size: var(--font-size-l);
        margin-bottom: var(--space-xs);
    }

    .diff-description {
        color: var(--color-surface-fg-secondary);
        font-size: var(--font-size-s);
        margin-bottom: var(--space-l);
    }

    .diff-content {
        display: flex;
        flex-direction: column;
        gap: var(--space-l);
    }

    .diff-section h4 {
        color: var(--color-surface-fg-primary);
        font-size: var(--font-size-m);
        margin-bottom: var(--space-m);
    }

    .diff-view {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-m);
    }

    .diff-side h5 {
        color: var(--color-surface-fg-secondary);
        font-size: var(--font-size-s);
        margin-bottom: var(--space-s);
    }

    .diff-code {
        background: var(--color-surface-bg-subtle);
        border: 1px solid var(--color-surface-border);
        border-radius: var(--radius-s);
        padding: var(--space-s);
        font-family: var(--font-family-mono);
        font-size: var(--font-size-xs);
        line-height: 1.4;
        max-height: 200px;
        overflow-y: auto;
        white-space: pre-wrap;
        word-wrap: break-word;
    }

    .diff-code.previous {
        background: #fdf2f2;
        border-color: #fca5a5;
    }

    .diff-code.current {
        background: #f0fdf4;
        border-color: #86efac;
    }

    .config-changes {
        display: flex;
        flex-direction: column;
        gap: var(--space-xs);
    }

    .config-change {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        padding: var(--space-xs);
        background: var(--color-surface-bg-subtle);
        border-radius: var(--radius-s);
        font-size: var(--font-size-s);
    }

    .change-indicator {
        color: var(--color-success);
        font-weight: var(--font-weight-bold);
        font-family: var(--font-family-mono);
    }

    .modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: var(--space-s);
        margin-top: var(--space-l);
        padding-top: var(--space-m);
        border-top: 1px solid var(--color-surface-border-subtle);
    }

    @media (max-width: 768px) {
        .version-header {
            flex-direction: column;
            gap: var(--space-s);
        }

        .version-meta {
            align-items: flex-start;
        }

        .version-badge {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--space-xs);
        }

        .version-actions {
            flex-direction: column;
        }

        .diff-modal {
            min-width: auto;
            max-width: 95vw;
        }

        .diff-view {
            grid-template-columns: 1fr;
        }
    }
</style>
