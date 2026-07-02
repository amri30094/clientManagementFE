<template>
  <v-card class="panel-card" flat>
    <!-- ================= Panel Header ================= -->
    <div class="panel-header">
      <h3 class="panel-title">Recent Projects</h3>

      <RouterLink to="/clients" class="view-all"> View All </RouterLink>
    </div>

    <!-- ================= Project List ================= -->
    <div class="project-list">
      <div v-for="project in projects" :key="project.name" class="project-row">
        <v-avatar :color="getAvatarColor(project.company)" size="38" rounded="lg">
          <v-icon :icon="getProjectIcon(project.company)" color="white" size="18" />
        </v-avatar>

        <div class="project-info">
          <div class="project-name">
            {{ project.company }}
          </div>

          <div class="project-client">
            {{ project.name }}
          </div>
        </div>

        <div class="project-right">
          <div class="project-value">
            Rs. {{ Number(project.final_project_value).toLocaleString() }}
          </div>
        </div>
      </div>
    </div>

    <!-- ================= Panel Footer ================= -->
    <div class="panel-footer">
      <RouterLink to="/clients" class="view-all-link">
        View All Clients
        <v-icon size="16">mdi-arrow-right</v-icon>
      </RouterLink>
    </div>
  </v-card>
</template>

<script setup>
import { RouterLink } from 'vue-router'

/* ================= Props ================= */
defineProps({
  projects: {
    type: Array,
    default: () => [],
  },
})

/* ================= Project Icon Helper ================= */
function getProjectIcon(company) {
  const icons = [
    'mdi-office-building',
    'mdi-domain',
    'mdi-laptop',
    'mdi-code-tags',
    'mdi-monitor-dashboard',
    'mdi-folder',
    'mdi-briefcase',
    'mdi-web',
  ]

  let sum = 0

  for (let i = 0; i < company.length; i++) {
    sum += company.charCodeAt(i)
  }

  return icons[sum % icons.length]
}

/* ================= Avatar Color Helper ================= */
function getAvatarColor(company) {
  const colors = [
    '#3B82F6', // Blue
    '#16A34A', // Green
    '#8B5CF6', // Purple
    '#F59E0B', // Orange
    '#EF4444', // Red
    '#06B6D4', // Cyan
    '#EC4899', // Pink
    '#6366F1', // Indigo
  ]

  let sum = 0

  for (let i = 0; i < company.length; i++) {
    sum += company.charCodeAt(i)
  }

  return colors[sum % colors.length]
}
</script>

<style scoped>
/* ================= Panel Card ================= */
.panel-card {
  background: #fff;
  border-radius: 14px;
  padding: 20px;
  height: 470px;
  display: flex;
  flex-direction: column;
}

/* ================= Panel Header ================= */
.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.panel-title {
  color: #0a1551;
  font-size: 16px;
  font-weight: 700;
}

.view-all {
  color: #1846e0;
  font-size: 13px;
  text-decoration: none;
}

/* ================= Project List ================= */
.project-list {
  display: flex;
  flex-direction: column;
}

.project-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid #eef2f7;
}

.project-info {
  flex: 1;
}

.project-name {
  font-size: 14px;
  font-weight: 600;
  color: #0a1551;
}

.project-client {
  margin-top: 4px;
  font-size: 12px;
  color: #9ca3af;
}

.project-right {
  text-align: right;
}

.project-value {
  font-size: 13px;
  font-weight: 700;
  color: #0a1551;
}

/* ================= Panel Footer ================= */
.panel-footer {
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px solid #eef2f7;
  text-align: center;
}

.view-all-link {
  color: #1846e0;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
</style>
