<template>
    <div class="blockflow-divider">
        <svg width="10" height="70" viewBox="0 0 10 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1200_12271)">
                <path d="M5 0C5.55228 -2.41411e-08 6 0.447715 6 1V66.5322L8.28809 64.2109C8.6758 63.8178 9.30889 63.8136 9.70215 64.2012C10.0953 64.5889 10.0996 65.222 9.71191 65.6152L5.83691 69.5449C5.65846 69.8184 5.35094 70 5 70C4.64887 70 4.34052 69.8187 4.16211 69.5449L0.288086 65.6152L0.219727 65.5391C-0.0979081 65.1441 -0.0707099 64.5647 0.297852 64.2012C0.666534 63.8378 1.24626 63.8186 1.63672 64.1416L1.71191 64.2109L4 66.5322V1C4 0.447715 4.44772 2.41411e-08 5 0Z" fill="currentColor"/>
            </g>
            <defs>
                <clipPath id="clip0_1200_12271">
                    <rect width="10" height="70" fill="none"/>
                </clipPath>
            </defs>
        </svg>
        <div class="plus">
            <Plus size="16" stroke-width="2" />
        </div>
    </div>
</template>

<script setup>
    import { Plus } from 'lucide-vue-next';
</script>

<style scoped>
    .blockflow-divider {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        width: 60px;
        height: 24px;
        margin: var(--space-xxs) 0;
        position: relative;
        z-index: 0;
        overflow: hidden;
        color: var(--color-surface-fg);
        opacity: 0.25;
        transition: var(--transition-quick);
    }

    .blockflow-divider:hover {
        height: 54px;
        opacity: 1;
        color: var(--color-accent);
    }

    .plus {
        opacity: 0;
        position: absolute;
        bottom: 80%;
        left: 50%;
        transform: translate(-50%, 50%);
        background: var(--color-accent);
        color: var(--color-accent-fg);
        border-radius: var(--radius);
        border: 3px solid var(--color-chrome);
        display: flex;
        align-items: center;
        justify-content: center;
        height: 24px;
        width: 24px;
        transition: var(--transition-quick);
    }

    .blockflow-divider:hover .plus {
        bottom: 55%;
        opacity: 1;
    }
</style> 