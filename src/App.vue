<template>
  <div class="ithaca">
    <Sidebar />
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue';
</script>

<style scoped>
.ithaca {
  height: 100dvh;
  display: flex;
}

main {
  flex: 1;
  max-width: calc(100dvw - 220px);
}
</style>