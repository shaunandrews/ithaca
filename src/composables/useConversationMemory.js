import { ref, computed } from 'vue';

// Global state to store last viewed conversation per agent
const lastViewedConversations = ref(new Map());

export function useConversationMemory() {
    /**
     * Store the last viewed conversation for an agent
     * @param {number} agentId - The agent ID
     * @param {number} conversationId - The conversation ID
     */
    function rememberConversation(agentId, conversationId) {
        if (agentId && conversationId) {
            lastViewedConversations.value.set(agentId, conversationId);
        }
    }

    /**
     * Get the last viewed conversation for an agent
     * @param {number} agentId - The agent ID
     * @returns {number|null} The conversation ID or null if none stored
     */
    function getLastConversation(agentId) {
        return lastViewedConversations.value.get(agentId) || null;
    }

    /**
     * Clear the stored conversation for an agent
     * @param {number} agentId - The agent ID
     */
    function clearConversation(agentId) {
        if (agentId) {
            lastViewedConversations.value.delete(agentId);
        }
    }

    /**
     * Check if there's a stored conversation for an agent
     * @param {number} agentId - The agent ID
     * @returns {boolean} True if there's a stored conversation
     */
    function hasStoredConversation(agentId) {
        return lastViewedConversations.value.has(agentId);
    }

    return {
        rememberConversation,
        getLastConversation,
        clearConversation,
        hasStoredConversation
    };
}
