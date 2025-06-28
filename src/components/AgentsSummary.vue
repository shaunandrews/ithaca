<template>
    <div class="agents-summary hstack">
        <div class="stat hstack">
            <div class="stat-value">
                <TrendingUp size="16" stroke-width="1.5" />
                {{ totalConversations.toLocaleString() }}
            </div>
            <label>Total conversations</label>
        </div>
        <div class="stat hstack">
            <div class="stat-value">
                <TrendingUp size="16" stroke-width="1.5" />
                {{ formatResponseTime(avgResponseTime) }}
            </div>
            <label>Avg. response time</label>
        </div>
        <div class="stat hstack">
            <div class="stat-value">
                <TrendingDown size="16" stroke-width="1.5" />
                {{ avgUptime }}%
            </div>
            <label>Avg. uptime</label>
        </div>
        <div class="stat hstack">
            <div class="stat-value">
                <TrendingUp size="16" stroke-width="1.5" />
                {{ avgResolutionRate }}%
            </div>
            <label>Avg. resolution rate</label>
        </div>
        <div class="stat hstack">
            <div class="stat-value">
                <TrendingUp size="16" stroke-width="1.5" />
                {{ avgFirstContactResolution }}%
            </div>
            <label>Avg. first contact resolution</label>
        </div>
        <div class="stat hstack">
            <div class="stat-value">
                <TrendingUp size="16" stroke-width="1.5" />
                {{ avgQualityScore }}/5
            </div>
            <label>Avg. quality score</label>
        </div>
        <div class="stat hstack">
            <div class="stat-value">
                <TrendingUp size="16" stroke-width="1.5" />
                {{ avgSatisfactionRating }}/5
            </div>
            <label>Avg. satisfaction rating</label>
        </div>
        <div class="stat hstack">
            <div class="stat-value">
                <TrendingUp size="16" stroke-width="1.5" />
                {{ avgCorrectionRate }}%
            </div>
            <label>Avg. correction rate</label>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { agents } from '@/data/agents.js';
    import { TrendingUp, TrendingDown } from 'lucide-vue-next';
    const totalAgents = computed(() => agents.length);

    const totalConversations = computed(() => {
        return agents.reduce(
            (sum, agent) => sum + (agent.stats?.totalConversations || 0),
            0
        );
    });

    const avgQualityScore = computed(() => {
        const total = agents.reduce(
            (sum, agent) => sum + (agent.stats?.qualityScore || 0),
            0
        );
        return (total / agents.length).toFixed(1);
    });

    const avgResolutionRate = computed(() => {
        const total = agents.reduce(
            (sum, agent) => sum + (agent.stats?.resolutionRate || 0),
            0
        );
        return (total / agents.length).toFixed(1);
    });

    const avgFlagRate = computed(() => {
        const total = agents.reduce(
            (sum, agent) => sum + (agent.stats?.flagRate || 0),
            0
        );
        return (total / agents.length).toFixed(1);
    });

    const avgCorrectionRate = computed(() => {
        const total = agents.reduce(
            (sum, agent) => sum + (agent.stats?.correctionPercentage || 0),
            0
        );
        return (total / agents.length).toFixed(1);
    });

    const avgResponseTime = computed(() => {
        const total = agents.reduce(
            (sum, agent) => sum + (agent.stats?.avgResponseTime || 0),
            0
        );
        return Math.round(total / agents.length);
    });

    const avgSatisfactionRating = computed(() => {
        const total = agents.reduce(
            (sum, agent) => sum + (agent.stats?.satisfactionRating || 0),
            0
        );
        return (total / agents.length).toFixed(1);
    });

    const avgFirstContactResolution = computed(() => {
        const total = agents.reduce(
            (sum, agent) => sum + (agent.stats?.firstContactResolution || 0),
            0
        );
        return (total / agents.length).toFixed(1);
    });

    const avgUptime = computed(() => {
        const total = agents.reduce(
            (sum, agent) => sum + (agent.stats?.uptime || 0),
            0
        );
        return (total / agents.length).toFixed(1);
    });

    const topPerformer = computed(() => {
        return agents.reduce((best, agent) => {
            const bestScore = best?.stats?.qualityScore || 0;
            const agentScore = agent.stats?.qualityScore || 0;
            return agentScore > bestScore ? agent : best;
        }, null);
    });

    const mostActive = computed(() => {
        return agents.reduce((most, agent) => {
            const mostConversations = most?.stats?.totalConversations || 0;
            const agentConversations = agent.stats?.totalConversations || 0;
            return agentConversations > mostConversations ? agent : most;
        }, null);
    });

    const fastestResponse = computed(() => {
        return agents.reduce((fastest, agent) => {
            const fastestTime = fastest?.stats?.avgResponseTime || Infinity;
            const agentTime = agent.stats?.avgResponseTime || Infinity;
            return agentTime < fastestTime ? agent : fastest;
        }, null);
    });

    function formatResponseTime(seconds) {
        if (!seconds) return 'N/A';
        if (seconds < 60) return `${seconds}s`;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        if (remainingSeconds === 0) return `${minutes}m`;
        return `${minutes}m ${remainingSeconds}s`;
    }
</script>

<style scoped>
    .agents-summary {
        flex-wrap: wrap;
    }
    .stat {
        flex: 1 1 calc(25% - var(--space-xs) * 3 / 4);
        min-width: calc(25% - var(--space-xs) * 3 / 4);
        max-width: calc(25% - var(--space-xs) * 3 / 4);
        padding-bottom: var(--space-xxs);
        gap: var(--space-xs);
        font-size: var(--font-size-s);
        color: var(--color-surface-fg-tertiary);
    }

    .stat:hover {
        color: var(--color-chrome-fg);
    }

    .stat-value {
        display: flex;
        gap: var(--space-xxs);
        align-items: center;
        justify-content: flex-end;
        min-width: 60px;
        font-weight: var(--font-weight-semibold);
    }
</style>
