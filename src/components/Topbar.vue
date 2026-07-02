<template>
  <!-- ================= Top Navigation Bar ================= -->

  <v-app-bar flat height="84" class="topbar">
    <!-- ================= Sidebar Toggle Button ================= -->

    <v-app-bar-nav-icon class="menu-btn" @click="emit('toggle-sidebar')">
      <v-icon icon="mdi-menu" size="24" color="#0A1551" />
    </v-app-bar-nav-icon>

    <!-- ================= Page Title ================= -->

    <div class="title-section">
      <h2 class="page-title">
        {{ route.meta.title || 'Dashboard' }}
      </h2>

      <p class="page-subtitle">
        {{ subtitle }}
      </p>
    </div>

    <v-spacer />

    <!-- ================= Notification Button ================= -->

    <v-btn icon variant="text" class="notification-btn">
      <v-badge content="3" color="error" floating>
        <v-icon icon="mdi-bell-outline" size="25" />
      </v-badge>
    </v-btn>

    <!-- ================= User Profile ================= -->

    <div class="user-box">
      <v-avatar size="40" color="#FFFFFF">
        <v-icon icon="mdi-account-circle" color="#1846E0" size="34" />
      </v-avatar>

      <div>
        <div class="user-name">Admin User</div>

        <div class="user-role">Administrator</div>
      </div>
    </div>
  </v-app-bar>
</template>

<script setup>
/* ================= Import ================= */

import { computed } from 'vue'
import { useRoute } from 'vue-router'

/* ================= Emit Event ================= */

const emit = defineEmits(['toggle-sidebar'])

/* ================= Current Route ================= */

const route = useRoute()

/* ================= Page Subtitles ================= */

const subtitles = {
  dashboard: "Welcome back, Admin! Here's what's happening with your clients.",
  clients: 'Manage all your client records.',
  reports: 'View reports and analytics.',
}

/* ================= Dynamic Subtitle ================= */

const subtitle = computed(() => subtitles[route.name] || '')
</script>

<style scoped>
/* ================= Top Navigation Bar ================= */

.topbar {
  background: linear-gradient(90deg, #d9e5ff, #b8cbff) !important;
  padding: 0 2px;
}

/* ================= Menu Button ================= */

.menu-btn {
  margin-right: 10px;
}

/* ================= Title Section ================= */

.title-section {
  display: flex;
  flex-direction: column;
}

.page-title {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #0a1551;
}

.page-subtitle {
  margin-top: 2px;
  font-size: 13px;
  color: #54638f;
}

/* ================= Notification Button ================= */

.notification-btn {
  margin-right: 18px;
}

/* ================= User Profile ================= */

.user-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: #0a1551;
  padding: 0 5px;
}

.user-role {
  font-size: 12px;
  color: #64748b;
  padding: 0 5px;
}

/* ================= Responsive Design ================= */

@media (max-width: 768px) {
  .page-subtitle {
    display: none;
  }

  .user-box div {
    display: none;
  }
}
</style>
