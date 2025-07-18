<template>
    <div class="customer-details">
        <div class="customer-header vstack">
            <WidgetCustomer 
                email="sarah.jones@example.com" 
                name="Sarah Jones" 
                variant="detailed" 
                size="large"
                :show-email="false"
            />
        </div>

        <div class="details-section">
            <h4>Personal Context</h4>
            <div class="context-grid">
                <div class="context-item">
                    <span class="text-label">Site URL:</span>
                    <span class="value">myawesomeblog.wordpress.com</span>
                </div>
                <div class="context-item">
                    <span class="text-label">Site Title:</span>
                    <span class="value">My Awesome Blog</span>
                </div>
                <div class="context-item">
                    <span class="text-label">User Role:</span>
                    <span class="value">Administrator</span>
                </div>
                <div class="context-item">
                    <span class="text-label">Plan:</span>
                    <span class="value">Business</span>
                </div>
                <div class="context-item">
                    <span class="text-label">Account Type:</span>
                    <span class="value">WordPress.com</span>
                </div>
                <div class="context-item">
                    <span class="text-label">Location:</span>
                    <span class="value">San Francisco, CA</span>
                </div>
            </div>
        </div>

        <div class="details-section">
            <h4>Purchase History</h4>
            <div class="purchase-list">
                <div class="purchase-item">
                    <div class="purchase-header">
                        <span class="purchase-name">Business Plan</span>
                        <span class="purchase-amount">$300/year</span>
                    </div>
                    <div class="purchase-meta">
                        <span class="purchase-date text-xs">Renewed Jan 15, 2024</span>
                        <span class="purchase-status text-badge active">Active</span>
                    </div>
                </div>

                <div class="purchase-item">
                    <div class="purchase-header">
                        <span class="purchase-name">myawesomeblog.com</span>
                        <span class="purchase-amount">$18/year</span>
                    </div>
                    <div class="purchase-meta">
                        <span class="purchase-date text-xs">Renewed Jan 15, 2024</span>
                        <span class="purchase-status text-badge active">Active</span>
                    </div>
                </div>

                <div class="purchase-item">
                    <div class="purchase-header">
                        <span class="purchase-name">Premium Theme Bundle</span>
                        <span class="purchase-amount">$79</span>
                    </div>
                    <div class="purchase-meta">
                        <span class="purchase-date text-xs">Purchased Dec 3, 2023</span>
                        <span class="purchase-status text-badge completed">Completed</span>
                    </div>
                </div>

                <div class="purchase-item">
                    <div class="purchase-header">
                        <span class="purchase-name">Extra Storage (50GB)</span>
                        <span class="purchase-amount">$48/year</span>
                    </div>
                    <div class="purchase-meta">
                        <span class="purchase-date text-xs">Added Nov 22, 2023</span>
                        <span class="purchase-status text-badge active">Active</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="details-section">
            <h4>Support History</h4>
            <div class="support-list">
                <div class="support-item">
                    <div class="support-header">
                        <span class="support-subject"
                            >Custom CSS not applying to mobile</span
                        >
                        <span class="support-date">2 days ago</span>
                    </div>
                    <div class="support-summary">
                        Helped troubleshoot custom CSS issues on mobile devices.
                        Resolved by updating CSS media queries and clearing site
                        cache.
                    </div>
                    <div class="support-meta">
                        <span class="support-status resolved">Resolved</span>
                        <span class="support-agent">Agent: Sarah M.</span>
                    </div>
                </div>

                <div class="support-item">
                    <div class="support-header">
                        <span class="support-subject"
                            >How to set up email forwarding</span
                        >
                        <span class="support-date">1 week ago</span>
                    </div>
                    <div class="support-summary">
                        Provided step-by-step instructions for setting up email
                        forwarding from custom domain to Gmail account.
                    </div>
                    <div class="support-meta">
                        <span class="support-status resolved">Resolved</span>
                        <span class="support-agent">Agent: Mike R.</span>
                    </div>
                </div>

                <div class="support-item">
                    <div class="support-header">
                        <span class="support-subject">Site loading slowly</span>
                        <span class="support-date">3 weeks ago</span>
                    </div>
                    <div class="support-summary">
                        Identified large image files causing slow load times.
                        Recommended image optimization and caching plugins.
                    </div>
                    <div class="support-meta">
                        <span class="support-status resolved">Resolved</span>
                        <span class="support-agent">Agent: Jennifer L.</span>
                    </div>
                </div>

                <div class="support-item">
                    <div class="support-header">
                        <span class="support-subject"
                            >Upgrade to Business Plan</span
                        >
                        <span class="support-date">2 months ago</span>
                    </div>
                    <div class="support-summary">
                        Assisted with plan upgrade and migration. Explained new
                        features and helped configure business tools.
                    </div>
                    <div class="support-meta">
                        <span class="support-status resolved">Resolved</span>
                        <span class="support-agent">Agent: David K.</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import CryptoJS from 'crypto-js';
    import WidgetCustomer from '@/components/WidgetCustomer.vue';
</script>

<style scoped>
    .customer-details {
        display: flex;
        flex-direction: column;
        gap: var(--space-m);
    }

    .customer-header {
        align-items: center;
        gap: var(--space-s);
    }

    .details-section {
        display: flex;
        flex-direction: column;
        gap: var(--space-s);
    }

    .details-section h4 {
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-medium);
        margin: 0;
    }

    /* Personal Context Styles */
    .context-grid {
        display: flex;
        flex-direction: column;
        gap: var(--space-xs);
    }

    .context-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-xs) 0;
        border-bottom: 1px solid var(--color-surface-tint);
    }

    .context-item:last-child {
        border-bottom: none;
    }


    .value {
        font-size: var(--font-size-s);
        color: var(--color-chrome-fg-primary);
        font-weight: var(--font-weight-medium);
    }

    /* Purchase History Styles */
    .purchase-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-s);
    }

    .purchase-item {
        padding: var(--space-s);
        border: 1px solid var(--color-surface-tint);
        border-radius: var(--radius-m);
        background: var(--color-surface);
    }

    .purchase-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-xs);
    }

    .purchase-name {
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-medium);
        color: var(--color-chrome-fg-primary);
    }

    .purchase-amount {
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-medium);
        color: var(--color-chrome-fg-primary);
    }

    .purchase-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .purchase-date text-xs {
        /* Uses .text-xs utility class */
    }

    .purchase-status text-badge {
        /* Uses .text-badge utility class */
        padding: var(--space-xxs) var(--space-xs);
        border-radius: var(--radius-s);
    }

    .purchase-status text-badge.active {
        background: var(--color-success-bg);
        color: var(--color-success-fg);
    }

    .purchase-status text-badge.completed {
        background: var(--color-surface-tint);
        color: var(--color-chrome-fg-secondary);
    }

    /* Support History Styles */
    .support-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-s);
    }

    .support-item {
        padding: var(--space-s);
        border: 1px solid var(--color-surface-tint);
        border-radius: var(--radius-m);
        background: var(--color-surface);
    }

    .support-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: var(--space-xs);
        gap: var(--space-s);
    }

    .support-subject {
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-medium);
        color: var(--color-chrome-fg-primary);
        flex: 1;
    }

    .support-date {
        font-size: var(--font-size-xs);
        color: var(--color-chrome-fg-secondary);
        white-space: nowrap;
    }

    .support-summary {
        font-size: var(--font-size-s);
        color: var(--color-chrome-fg-secondary);
        line-height: var(--line-height-tight);
        margin-bottom: var(--space-xs);
    }

    .support-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .support-status {
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-medium);
        padding: var(--space-xxs) var(--space-xs);
        border-radius: var(--radius-s);
        text-transform: uppercase;
        letter-spacing: var(--letter-spacing-wide);
    }

    .support-status.resolved {
        background: var(--color-success-bg);
        color: var(--color-success-fg);
    }

    .support-agent {
        font-size: var(--font-size-xs);
        color: var(--color-chrome-fg-secondary);
    }
</style>
