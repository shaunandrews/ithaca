<template>
    <div class="library">
        <div class="library-content vstack">
            <h3>Triggers</h3>
            <div class="library-blocks">
                <div class="library-item">Manual</div>
                <div class="library-item">Webhook</div>
                <div class="library-item">Scheduled</div>
                <div class="library-item">Chat message</div>
            </div>
            <h3>Actions</h3>
            <div class="library-blocks">
                <div class="library-item">Gather context</div>
                <div class="library-item">Assign tags</div>
                <div class="library-item">Analyze sentiment</div>
                <div class="library-item">Send email</div>
                <div class="library-item">Create Zendesk ticket</div>
                <div class="library-item">HTTP request</div>
            </div>
            
            <h3>Flow</h3>
            <div class="library-blocks">
                <div class="library-item">If/Else</div>
                <div class="library-item">Loop</div>
                <div class="library-item">Switch</div>
                <div class="library-item">Filter</div>
                <div class="library-item">Merge</div>
                <div class="library-item">Wait</div>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
    .library-content {
        gap: var(--space-m);
    }

    .library-blocks {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-xs);
    }

    .library-item {
        padding: var(--space-xxs) var(--space-s);
        border-radius: var(--radius-s);
        background-color: var(--color-surface-tint-light);
        border: 1px solid var(--color-surface-tint);
    }
</style> 