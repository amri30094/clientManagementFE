<template>
  <!-- ================= Main Layout ================= -->

  <div class="layout">
    <!-- ================= Sidebar ================= -->

    <Sidebar />

    <!-- ================= Main Content Area ================= -->

    <v-main class="main-layout">
      <!-- ================= Top Navigation Bar ================= -->

      <Topbar />

      <!-- ================= Page Content ================= -->

      <div class="content-wrapper">
        <RouterView />
      </div>
    </v-main>
  </div>
</template>

<script setup>
/* ================= Import Components ================= */

import { RouterView } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'
import Topbar from '@/components/Topbar.vue'
</script>

<style scoped>
/* ================= Main Layout ================= */

.layout {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

/* ================= Main Content ================= */

.main-layout {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f5f7fb;
  overflow: hidden;
}

/* ================= Router View Content ================= */

.content-wrapper {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
