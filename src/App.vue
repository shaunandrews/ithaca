<template>
  <div class="ithaca" :style="{ '--sidebar-width': sidebarWidth }">
    <Sidebar :mini="isMini" @toggle="toggleSidebar" />
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Sidebar from './components/Sidebar.vue';

const isMini = ref(false);
const sidebarWidth = computed(() => (isMini.value ? '56px' : '220px'));

function toggleSidebar() {
  isMini.value = !isMini.value;
}
</script>

<style scoped>
.ithaca {
  height: 100dvh;
  display: flex;
}

main {
  flex: 1;
  max-width: calc(100dvw - var(--sidebar-width));
}
</style>