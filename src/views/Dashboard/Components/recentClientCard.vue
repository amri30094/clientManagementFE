<template>
  <v-card class="panel-card" flat>
    <!-- ================= Panel Header ================= -->
    <div class="panel-header">
      <h3 class="panel-title">Recent Clients</h3>
      <RouterLink to="/clients" class="view-all">View All</RouterLink>
    </div>

    <!-- ================= Client List ================= -->
    <div class="client-list">
      <div v-for="client in clients" :key="client.email" class="client-row">
        <v-avatar :color="getAvatarColor(client.name)" size="38">
          <span class="initials">
            {{
              client.name
                .split(' ')
                .map((word) => word[0])
                .join('')
                .substring(0, 2)
                .toUpperCase()
            }}
          </span>
        </v-avatar>

        <div class="client-info">
          <div class="client-name">{{ client.name }}</div>
          <div class="client-email">{{ client.email }}</div>
        </div>

        <div class="client-phone">{{ client.phone }}</div>

        <v-chip color="#16a34a" variant="flat" size="small" class="status-chip"> Active </v-chip>
      </div>
    </div>

    <!-- ================= Panel Footer ================= -->
    <div class="panel-footer"></div>
  </v-card>
</template>

<script setup>
import { RouterLink } from 'vue-router'

/* ================= Props (Default Client List) ================= */
defineProps({
  clients: {
    type: Array,
    default: () => [
      {
        name: 'John Silva',
        email: 'john.silva@example.com',
        phone: '077 123 4567',
        status: 'Active',
        initials: 'JS',
        color: '#3b82f6',
      },
      {
        name: 'Sarah Perera',
        email: 'sarah.perera@example.com',
        phone: '071 234 5678',
        status: 'Active',
        initials: 'SP',
        color: '#16a34a',
      },
      {
        name: 'Nimal Fernando',
        email: 'nimal.fernando@example.com',
        phone: '076 345 6789',
        status: 'Active',
        initials: 'NF',
        color: '#8b5cf6',
      },
      {
        name: 'Hashini De Silva',
        email: 'hashini.desilva@example.com',
        phone: '070 456 7890',
        status: 'Active',
        initials: 'HD',
        color: '#f59e0b',
      },
      {
        name: 'Chamika Rathnayake',
        email: 'chamika.r@example.com',
        phone: '075 567 8901',
        status: 'Active',
        initials: 'CR',
        color: '#ef4444',
      },
    ],
  },
})

/* ================= Avatar Color Helper ================= */
function getAvatarColor(name) {
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

  for (let i = 0; i < name.length; i++) {
    sum += name.charCodeAt(i)
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
  overflow: hidden;
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
  font-weight: 500;
  text-decoration: none;
}

/* ================= Client List ================= */
.client-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.client-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 14px;
  border-bottom: 1px solid #f1f3f9;
}

.client-row > .v-avatar {
  flex-shrink: 0;
}

.initials {
  color: white;
  font-size: 13px;
  font-weight: 600;
}

.client-info {
  flex: 1 1 0;
  min-width: 0;
}

.client-name {
  color: #0a1551;
  font-size: 13.5px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.client-email {
  color: #9ca3af;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.client-phone {
  color: #6b7280;
  font-size: 12.5px;
  margin-right: 14px;
  white-space: nowrap;
  flex-shrink: 0;
}

.status-chip {
  color: white !important;
  font-size: 11px !important;
  font-weight: 600;
}

/* ================= Panel Footer ================= */
.panel-footer {
  text-align: center;
  margin-top: 8px;
}

.view-all-link {
  color: #1846e0;
  font-size: 13.5px;
  font-weight: 500;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
</style>
