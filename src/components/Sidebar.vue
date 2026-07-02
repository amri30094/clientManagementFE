<template>
  <!-- ================= Sidebar Navigation Drawer ================= -->

  <v-navigation-drawer permanent width="260" elevation="0" class="sidebar">
    <!-- ================= Logo Section ================= -->

    <div class="logo-section">
      <v-avatar size="52" color="#1846E0" rounded="lg">
        <v-icon icon="mdi-shield-half-full" color="white" size="30" />
      </v-avatar>

      <div class="logo-text">
        <div class="logo-title">CodeCraft</div>
        <div class="logo-subtitle">SOLUTIONS</div>
      </div>
    </div>

    <v-divider color="rgba(255,255,255,.08)" />

    <!-- ================= Navigation Menu ================= -->

    <v-list nav density="comfortable" class="menu-list">
      <v-list-item
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        rounded="lg"
        class="menu-item"
        :active="route.path === item.to"
      >
        <template #prepend>
          <v-icon :icon="item.icon" />
        </template>

        <v-list-item-title>
          {{ item.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>

    <!-- ================= Admin Profile ================= -->

    <template #append>
      <div class="admin-box">
        <v-avatar size="46" color="#1846E0">
          <v-icon icon="mdi-account" color="white" />
        </v-avatar>

        <div>
          <div class="admin-name">Admin User</div>

          <div class="admin-role">Super Admin</div>
        </div>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
/* ================= Import ================= */

import { useRoute } from 'vue-router'

/* ================= Current Route ================= */

const route = useRoute()

/* ================= Sidebar Menu Items ================= */

const navItems = [
  {
    title: 'Dashboard',
    icon: 'mdi-view-dashboard-outline',
    to: '/dashboard',
  },
  {
    title: 'Clients Management',
    icon: 'mdi-account-group-outline',
    to: '/clients',
  },
  {
    title: 'Clients Report',
    icon: 'mdi-file-chart-outline',
    to: '/reports',
  },
]
</script>

<style scoped>
/* ================= Sidebar ================= */

.sidebar {
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(180deg, #0a1551 0%, #162b88 100%) !important;
  color: white;
}

/* ================= Logo Section ================= */

.logo-section {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 24px 20px;
}

.logo-title {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
}

.logo-subtitle {
  font-size: 11px;
  color: #9fb3f5;
  letter-spacing: 2px;
}

/* ================= Navigation Menu ================= */

.menu-list {
  padding: 18px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu-item {
  color: #d7ddf6;
  min-height: 52px;
}

.menu-item :deep(.v-icon) {
  color: #d7ddf6;
}

/* ================= Active Menu ================= */

.menu-item.v-list-item--active {
  background: #3e63f4 !important;
  color: white !important;
  box-shadow: 0 8px 20px rgba(62, 99, 244, 0.35);
}

.menu-item.v-list-item--active :deep(.v-icon) {
  color: white !important;
}

/* ================= Admin Profile ================= */

.admin-box {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 18px;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.03);
}

.admin-name {
  font-size: 14px;
  font-weight: 600;
  color: white;
}

.admin-role {
  font-size: 12px;
  color: #a7b6f5;
}
</style>
