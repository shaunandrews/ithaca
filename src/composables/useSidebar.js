import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

const STORAGE_KEY = 'ithaca-sidebar-mini';
const MOBILE_BREAKPOINT = 768; // 768px

export function useSidebar() {
    // Initialize from localStorage or default to false
    const isMini = ref(localStorage.getItem(STORAGE_KEY) === 'true');
    const isMobile = ref(false);

    // Check if screen is mobile
    function checkMobile() {
        isMobile.value = window.innerWidth < MOBILE_BREAKPOINT;

        // Auto-collapse on mobile if not already mini
        if (isMobile.value && !isMini.value) {
            isMini.value = true;
        }
    }

    // Toggle function
    function toggleSidebar() {
        // Don't allow expanding on mobile
        if (isMobile.value && !isMini.value) {
            return;
        }
        isMini.value = !isMini.value;
    }

    // Persist state to localStorage
    watch(isMini, (newValue) => {
        localStorage.setItem(STORAGE_KEY, newValue.toString());
    });

    // Handle resize events
    let resizeTimeout;
    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(checkMobile, 100);
    }

    onMounted(() => {
        checkMobile();
        window.addEventListener('resize', handleResize);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(resizeTimeout);
    });

    return {
        isMini,
        isMobile,
        toggleSidebar,
    };
}
