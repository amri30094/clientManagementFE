<template>
  <!-- ================= Dashboard Page ================= -->

  <div class="dashboard">
    <!-- ================= Date Section ================= -->

    <div class="date-row"></div>

    <!-- ================= Statistics Cards ================= -->

    <div class="stats-grid">
      <StatCard
        v-for="stat in stats"
        :key="stat.label"
        :label="stat.label"
        :value="stat.value"
        :trend="stat.trend"
        :icon="stat.icon"
        :icon-bg="stat.color"
      />
    </div>

    <!-- ================= Dashboard Panels ================= -->

    <div class="panels-grid">
      <RecentClientCard :clients="recentClients" />
      <RecentProjectCard :projects="recentProjects" />
      <IncomeOverView :summary="summary" />
    </div>
  </div>
</template>

<script setup>
/* ================= Import Components ================= */

import StatCard from '@/views/Dashboard/Components/statCard.vue'
import RecentClientCard from '@/views/Dashboard/Components/recentClientCard.vue'
import RecentProjectCard from '@/views/Dashboard/Components/recentProjectCard.vue'
import IncomeOverView from '@/views/Dashboard/Components/incomeOverviewCard.vue'

/* ================= Import Vue ================= */

import { ref, onMounted } from 'vue'

/* ================= Import Dashboard APIs ================= */

import { getDashboardSummary, getRecentClients, getRecentProjects } from '@/api/dashboardApi'

/* ================= Reactive Variables ================= */

const stats = ref([])

const recentClients = ref([])

const recentProjects = ref([])

const summary = ref({})

/* ================= Load Dashboard Data ================= */

async function loadDashboard() {
  try {
    const dashboard = await getDashboardSummary()

    const recent = await getRecentClients()

    const projects = await getRecentProjects()

    summary.value = dashboard.data.data

    stats.value = [
      {
        label: 'Total Clients',
        value: dashboard.data.data.total_clients,
        trend: '',
        icon: 'mdi-account-group',
        color: '#3B82F6',
      },
      {
        label: 'Project Budget',
        value: 'Rs. ' + Number(dashboard.data.data.total_project_budget).toLocaleString(),
        trend: '',
        icon: 'mdi-cash',
        color: '#16A34A',
      },
      {
        label: 'Service Charge',
        value: 'Rs. ' + Number(dashboard.data.data.total_service_charge).toLocaleString(),
        trend: '',
        icon: 'mdi-credit-card',
        color: '#8B5CF6',
      },
      {
        label: 'Discount',
        value: 'Rs. ' + Number(dashboard.data.data.total_discount).toLocaleString(),
        trend: '',
        icon: 'mdi-sale',
        color: '#F59E0B',
      },
      {
        label: 'Final Value',
        value: 'Rs. ' + Number(dashboard.data.data.total_final_value).toLocaleString(),
        trend: '',
        icon: 'mdi-chart-line',
        color: '#1846E0',
      },
    ]

    recentClients.value = recent.data.data

    recentProjects.value = projects.data.data
  } catch (error) {
    console.error(error)
  }
}

/* ================= Component Mounted ================= */

onMounted(() => {
  loadDashboard()
})
</script>

<style scoped>
/* ================= Dashboard Layout ================= */

.dashboard {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ================= Date Section ================= */

.date-row {
  display: flex;
  justify-content: flex-end;
}

.date-field {
  width: 280px;
  background: #fff;
}

/* ================= Statistics Grid ================= */

.stats-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  width: 100%;
}

/* ================= Dashboard Panels ================= */

.panels-grid {
  display: grid;
  grid-template-columns: 1.15fr 1.15fr 0.9fr;
  gap: 20px;
  align-items: stretch;
}

/* ================= Tablet Responsive ================= */

@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .panels-grid {
    grid-template-columns: 1fr;
  }
}

/* ================= Mobile Responsive ================= */

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* ================= Small Mobile Responsive ================= */

@media (max-width: 600px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
