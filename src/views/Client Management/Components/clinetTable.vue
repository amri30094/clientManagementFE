<template>
  <v-card class="table-card" flat>
    <!-- ================= Table Header ================= -->
    <div class="table-header">
      <div>
        <h2 class="table-title">All Clients</h2>
        <p class="table-subtitle">View and manage all your clients details</p>
      </div>

      <v-btn color="#1846e0" class="add-btn" @click="emit('add')">
        <v-icon icon="mdi-plus" size="18" class="mr-1" />
        Add New Client
      </v-btn>
    </div>

    <!-- ================= Filter Row (Search / Date) ================= -->
    <div class="filter-row">
      <v-text-field
        v-model="search"
        placeholder="Search by phone number"
        variant="outlined"
        density="compact"
        hide-details
        prepend-inner-icon="mdi-magnify"
        class="search-field"
      />

      <v-text-field
        v-model="date"
        type="date"
        variant="outlined"
        density="comfortable"
        hide-details
        class="date-box"
      />
    </div>

    <!-- ================= Clients Table ================= -->
    <div class="table-wrap">
      <table class="client-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Client Name</th>
            <th>Company</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Project Budget</th>
            <th>Service Charge</th>
            <th>Discount</th>
            <th>Final Value</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(client, idx) in paginatedClients" :key="client.id">
            <td>
              {{ (page - 1) * pageSize + idx + 1 }}
            </td>

            <!-- ================= Client Name Cell ================= -->
            <td>
              <div class="name-cell">
                <v-avatar :color="client.color" size="32">
                  <span class="initials">
                    {{ client.initials }}
                  </span>
                </v-avatar>

                <span class="name-text">
                  {{ client.name }}
                </span>
              </div>
            </td>

            <td>
              <div>{{ client.company }}</div>
              <div class="muted">({{ client.employeeCount }})</div>
            </td>

            <td>{{ client.phone }}</td>

            <td>{{ client.email }}</td>

            <td>
              {{ formatRs(client.projectBudget) }}
            </td>

            <!-- ================= Calculated Values (Service Charge / Discount / Final) ================= -->
            <td class="green-text">
              {{ formatRs(calc(client).serviceCharge) }}
            </td>

            <td class="red-text">
              {{ formatRs(calc(client).discount) }}
            </td>

            <td class="blue-text">
              {{ formatRs(calc(client).finalValue) }}
            </td>

            <td>
              <v-chip color="#16a34a" variant="flat" size="small" class="status-chip">
                {{ client.status }}
              </v-chip>
            </td>

            <!-- ================= Row Actions (View / Edit / Delete) ================= -->
            <td>
              <div class="actions-cell">
                <v-btn
                  icon
                  size="32"
                  variant="outlined"
                  color="#1846e0"
                  @click="emit('view', client)"
                >
                  <v-icon icon="mdi-eye-outline" size="16" />
                </v-btn>

                <v-btn
                  icon
                  size="32"
                  variant="outlined"
                  color="#1846e0"
                  @click="emit('edit', client)"
                >
                  <v-icon icon="mdi-pencil-outline" size="16" />
                </v-btn>

                <v-btn
                  icon
                  size="32"
                  variant="outlined"
                  color="#ef4444"
                  @click="emit('delete', client)"
                >
                  <v-icon icon="mdi-trash-can-outline" size="16" />
                </v-btn>
              </div>
            </td>
          </tr>
          <tr v-if="filteredClients.length === 0">
            <td colspan="11" class="empty-row">No clients found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ================= Pagination ================= -->
    <div class="pagination-row">
      <span class="showing-text">
        Showing
        {{ filteredClients.length === 0 ? 0 : (page - 1) * pageSize + 1 }}
        to
        {{ Math.min(page * pageSize, filteredClients.length) }}
        of
        {{ filteredClients.length }}
        entries
      </span>

      <div class="pagination-controls">
        <v-btn icon size="32" variant="outlined" :disabled="page === 1" @click="page--">
          <v-icon icon="mdi-chevron-left" size="18" />
        </v-btn>

        <v-btn
          v-for="p in totalPages"
          :key="p"
          icon
          size="32"
          :variant="p === page ? 'flat' : 'outlined'"
          :color="p === page ? '#1846e0' : undefined"
          @click="page = p"
        >
          {{ p }}
        </v-btn>

        <v-btn icon size="32" variant="outlined" :disabled="page === totalPages" @click="page++">
          <v-icon icon="mdi-chevron-right" size="18" />
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue'

/* ================= Props & Emits ================= */
const props = defineProps({
  clients: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['add', 'view', 'edit', 'delete'])

/* ================= State ================= */
const search = ref('')
const date = ref('')
const category = ref('All Categories')
const dateRange = ref('')
const page = ref(1)

const pageSize = 6

/* ================= Filtering ================= */
const filteredClients = computed(() => {
  if (!search.value.trim()) return props.clients

  const q = search.value.replace(/\s+/g, '').toLowerCase()

  return props.clients.filter((client) =>
    client.phone.replace(/\s+/g, '').toLowerCase().includes(q),
  )
})

/* ================= Pagination Logic ================= */
const totalPages = computed(() => Math.max(1, Math.ceil(filteredClients.value.length / pageSize)))

const paginatedClients = computed(() => {
  const start = (page.value - 1) * pageSize

  return filteredClients.value.slice(start, start + pageSize)
})

/* ================= Service Charge Rate Logic ================= */
function serviceRate(projectBudget) {
  const budget = Number(projectBudget) || 0

  if (budget >= 1000000) return 0.1
  if (budget >= 500000) return 0.05
  return 0.02
}

/* ================= Discount Rate Logic ================= */
function discountRate(employeeCount) {
  const count = Number(employeeCount) || 0

  if (count > 100) return 0.05
  if (count > 0 && count < 100) return 0.02
  return 0
}

/* ================= Calculated Values (Service Charge / Discount / Final) ================= */
function calcValues(projectBudget, employeeCount) {
  const budget = Number(projectBudget) || 0

  const serviceCharge = Math.round(budget * serviceRate(budget))

  const discount = Math.round(budget * discountRate(employeeCount))

  const finalValue = budget + serviceCharge - discount

  return {
    serviceCharge,
    discount,
    finalValue,
  }
}

/* ================= Formatting Helpers ================= */
function formatRs(value) {
  return 'Rs. ' + (Number(value) || 0).toLocaleString('en-LK')
}

function calc(client) {
  return calcValues(client.projectBudget, client.employeeCount)
}
</script>

<style scoped>
/* ================= Table Card ================= */
.table-card {
  background: #fff;
  border-radius: 14px;
  padding: 24px;
}

/* ================= Table Header ================= */
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  gap: 12px;
  flex-wrap: wrap;
}

.table-title {
  color: #0a1551;
  font-size: 19px;
  font-weight: 700;
}

.table-subtitle {
  color: #6b7280;
  font-size: 13px;
  margin-top: 2px;
}

.add-btn {
  color: #fff !important;
  text-transform: none;
  font-weight: 600;
}

/* ================= Filter Row ================= */
.filter-row {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.search-field {
  flex: 1 1 240px;
  min-width: 200px;
}

.category-field {
  flex: 0 1 180px;
}

.date-field {
  flex: 0 1 200px;
}

.filter-btn {
  text-transform: none;
  color: #374151;
}

/* ================= Client Table ================= */
.table-wrap {
  overflow-x: auto;
}

.client-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 1000px;
}

.client-table th {
  text-align: left;
  color: #6b7280;
  font-size: 12.5px;
  font-weight: 600;
  padding: 10px 12px;
  border-bottom: 1px solid #eef0f6;
  white-space: nowrap;
}

.client-table td {
  padding: 14px 12px;
  font-size: 13px;
  color: #374151;
  border-bottom: 1px solid #f4f5f9;
  white-space: nowrap;
}

/* ================= Name Cell ================= */
.name-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.initials {
  color: white;
  font-size: 12px;
  font-weight: 600;
}

.name-text {
  font-weight: 600;
  color: #0a1551;
}

.muted {
  color: #9ca3af;
  font-size: 11.5px;
}

/* ================= Value Colors ================= */
.green-text {
  color: #16a34a;
  font-weight: 600;
}

.red-text {
  color: #ef4444;
  font-weight: 600;
}

.blue-text {
  color: #1846e0;
  font-weight: 600;
}

/* ================= Status Chip ================= */
.status-chip {
  color: white !important;
  font-size: 11px !important;
  font-weight: 600;
}

/* ================= Actions Cell ================= */
.actions-cell {
  display: flex;
  gap: 8px;
}

.empty-row {
  text-align: center;
  padding: 30px;
  color: #9ca3af;
}

/* ================= Pagination ================= */
.pagination-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
  flex-wrap: wrap;
  gap: 12px;
}

.showing-text {
  color: #6b7280;
  font-size: 13px;
}

.pagination-controls {
  display: flex;
  gap: 6px;
}
</style>
