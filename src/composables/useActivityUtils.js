import { computed } from 'vue';
import CryptoJS from 'crypto-js';
import { messages } from '@/data/messages.js';

export function useActivityUtils() {
    /**
     * Get message count for a conversation
     */
    function getMessageCount(itemId) {
        return computed(() => messages[itemId]?.length || 0);
    }

    /**
     * Format datetime for relative display (e.g., "2 hr", "3 days")
     */
    function formatRelativeTime(datetime) {
        const now = new Date();
        const date = new Date(datetime);
        const diffMs = now - date;
        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);
        const diffWeeks = Math.floor(diffDays / 7);
        const diffMonths = Math.floor(diffDays / 30);
        const diffYears = Math.floor(diffDays / 365);

        if (diffSeconds < 60) {
            return 'now';
        } else if (diffMinutes < 60) {
            return `${diffMinutes} min`;
        } else if (diffHours < 24) {
            return `${diffHours} hr`;
        } else if (diffDays < 7) {
            return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
        } else if (diffWeeks < 4) {
            return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''}`;
        } else if (diffMonths < 12) {
            return `${diffMonths} month${diffMonths > 1 ? 's' : ''}`;
        } else {
            return `${diffYears} year${diffYears > 1 ? 's' : ''}`;
        }
    }

    /**
     * Format datetime for absolute display (e.g., "Dec 25, 3:45 PM")
     */
    function formatAbsoluteTime(datetime) {
        return new Date(datetime).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        });
    }

    /**
     * Generate Gravatar URL from email
     */
    function getGravatarUrl(email) {
        if (!email) return '';
        const hash = CryptoJS.SHA256(email.trim().toLowerCase()).toString(CryptoJS.enc.Hex);
        return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
    }

    return {
        getMessageCount,
        formatRelativeTime,
        formatAbsoluteTime,
        getGravatarUrl
    };
} 