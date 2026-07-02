<template>
  <v-card class="report-card" elevation="0">
    <!-- ================= Toolbar ================= -->

    <div class="toolbar">
      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        placeholder="Search client name, email or phone..."
        variant="outlined"
        density="comfortable"
        hide-details
        class="search-box"
      />

      <v-select
        v-model="company"
        :items="companies"
        label="Company"
        variant="outlined"
        density="comfortable"
        hide-details
        class="company-box"
      />

      <v-spacer />

      <v-btn
        color="error"
        variant="outlined"
        prepend-icon="mdi-file-pdf-box"
        class="export-btn"
        @click="exportPDF"
      >
        Export PDF
      </v-btn>

      <v-btn
        color="success"
        variant="outlined"
        prepend-icon="mdi-file-excel"
        class="export-btn"
        @click="exportExcel"
      >
        Export Excel
      </v-btn>
    </div>

    <!-- ================= Table ================= -->

    <v-table class="report-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Company</th>
          <th>Address</th>

          <th class="text-right">
            Project Budget<br />
            (Rs.)
          </th>

          <th class="text-right">
            Service Charge<br />
            (Rs.)
          </th>

          <th class="text-right">
            Discount<br />
            (Rs.)
          </th>

          <th class="text-right">
            Final Value<br />
            (Rs.)
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(client, index) in clients" :key="client.client_id || client.email">
          <td>{{ index + 1 }}</td>

          <td>
            <div class="name-cell">
              <span class="client-name">
                {{ client.name }}
              </span>
            </div>
          </td>

          <td>{{ client.email }}</td>

          <td>{{ client.phone }}</td>

          <td>{{ client.company }}</td>

          <td>{{ client.address }}</td>

          <td class="text-right">
            {{ Number(client.project_budget).toLocaleString() }}
          </td>

          <td class="green text-right">
            {{ Number(client.service_charge).toLocaleString() }}
          </td>

          <td class="red text-right">
            {{ Number(client.discount_value).toLocaleString() }}
          </td>

          <td class="blue text-right">
            {{ Number(client.final_project_value).toLocaleString() }}
          </td>
        </tr>

        <!-- ================= Summary ================= -->

        <tr class="summary-row">
          <td colspan="6" class="summary-title">TOTAL SUMMARY</td>

          <td class="text-right">
            <strong>
              {{ Number(summary.total_project_budget || 0).toLocaleString() }}
            </strong>
          </td>

          <td class="green text-right">
            <strong>
              {{ Number(summary.total_service_charge || 0).toLocaleString() }}
            </strong>
          </td>

          <td class="red text-right">
            <strong>
              {{ Number(summary.total_discount || 0).toLocaleString() }}
            </strong>
          </td>

          <td class="blue text-right">
            <strong>
              {{ Number(summary.total_final_value || 0).toLocaleString() }}
            </strong>
          </td>
        </tr>
      </tbody>
    </v-table>

    <!-- ================= Footer ================= -->

    <div class="table-footer">
      <div class="entries">Showing {{ clients.length }} entries</div>
    </div>
  </v-card>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import { getAllClients, getDashboardSummary } from '@/api/clientApi'

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

/* ================= State ================= */

const search = ref('')

const company = ref('All Companies')

const page = ref(1)

const companies = ref(['All Companies'])

const allClients = ref([])

const clients = ref([])

const summary = ref({})

/* ================= Load Data ================= */

async function loadReport() {
  try {
    const clientResponse = await getAllClients()

    const summaryResponse = await getDashboardSummary()

    allClients.value = clientResponse.data.data

    clients.value = [...allClients.value]

    summary.value = summaryResponse.data.data

    const uniqueCompanies = [
      ...new Set(allClients.value.map((client) => client.company).filter(Boolean)),
    ]

    companies.value = ['All Companies', ...uniqueCompanies]
  } catch (error) {
    console.error(error)
  }
}

/* ================= Filter ================= */

function filterClients() {
  let filtered = [...allClients.value]

  if (company.value !== 'All Companies') {
    filtered = filtered.filter((client) => client.company === company.value)
  }

  if (search.value.trim() !== '') {
    const keyword = search.value.toLowerCase()

    filtered = filtered.filter((client) => {
      return (
        (client.name || '').toLowerCase().includes(keyword) ||
        (client.email || '').toLowerCase().includes(keyword) ||
        (client.phone || '').toLowerCase().includes(keyword)
      )
    })
  }

  clients.value = filtered
}

/* ================= PDF Export ================= */

function exportPDF() {
  const doc = new jsPDF()

  doc.setFontSize(18)
  doc.text('Clients Report', 14, 18)

  autoTable(doc, {
    startY: 28,
    head: [['#', 'Name', 'Email', 'Phone', 'Company', 'Budget', 'Service', 'Discount', 'Final']],

    body: clients.value.map((client, index) => [
      index + 1,
      client.name,
      client.email,
      client.phone,
      client.company,
      Number(client.project_budget).toLocaleString(),
      Number(client.service_charge).toLocaleString(),
      Number(client.discount_value).toLocaleString(),
      Number(client.final_project_value).toLocaleString(),
    ]),
  })

  doc.save('Clients_Report.pdf')
}

/* ================= Excel Export ================= */

function exportExcel() {
  const data = clients.value.map((client, index) => ({
    No: index + 1,
    Name: client.name,
    Email: client.email,
    Phone: client.phone,
    Company: client.company,
    Address: client.address,
    Project_Budget: client.project_budget,
    Service_Charge: client.service_charge,
    Discount: client.discount_value,
    Final_Value: client.final_project_value,
  }))

  const worksheet = XLSX.utils.json_to_sheet(data)

  const workbook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Clients Report')

  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  })

  const file = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
  })

  saveAs(file, 'Clients_Report.xlsx')
}

/* ================= Watch ================= */

watch(search, () => {
  filterClients()
})

watch(company, () => {
  filterClients()
})

/* ================= Mounted ================= */

onMounted(() => {
  loadReport()
})
</script>
<style scoped>
/* ================= Report Card ================= */
.report-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
}

/* ================= Toolbar ================= */
.toolbar {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.search-box {
  width: 320px;
}

.company-box {
  width: 220px;
}

.export-btn {
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0;
}

/* ================= Report Table ================= */
.report-table {
  border: 1px solid #edf2f7;
  border-radius: 14px;
  overflow: hidden;
}

.report-table table {
  width: 100%;
  border-collapse: collapse;
}

.report-table thead {
  background: #f8fafc;
}

.report-table th {
  padding: 16px;
  color: #0a1551;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  border-bottom: 1px solid #e5e7eb;
}

.report-table td {
  padding: 16px;
  font-size: 13px;
  color: #475569;
  border-bottom: 1px solid #edf2f7;
  white-space: nowrap;
}

.report-table tbody tr:hover {
  background: #f8fbff;
}

.name-cell {
  display: flex;
  align-items: center;
}

.client-name {
  font-weight: 600;
  color: #0a1551;
}

.text-right {
  text-align: right;
}

/* ================= Value Colors ================= */
.green {
  color: #16a34a;
  font-weight: 700;
}

.red {
  color: #ef4444;
  font-weight: 700;
}

.blue {
  color: #2563eb;
  font-weight: 700;
}

/* ================= Summary Row ================= */
.summary-row td {
  background: #f8fafc;
  border-top: 2px solid #dbe3f0;
  font-weight: 700;
}

.summary-title {
  color: #0a1551;
  font-size: 14px;
}

/* ================= Table Footer ================= */
.table-footer {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
}

.entries {
  color: #64748b;
  font-size: 13px;
}

/* ================= Pagination Overrides ================= */
:deep(.v-pagination .v-btn) {
  min-width: 34px;
  height: 34px;
}

:deep(.v-pagination .v-btn--active) {
  background: #1846e0 !important;
  color: #ffffff !important;
}

/* ================= Responsive (Tablet / Small Screens) ================= */
@media (max-width: 1400px) {
  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .search-box,
  .company-box {
    width: 100%;
  }

  .table-footer {
    flex-direction: column;
    gap: 16px;
  }

  .report-card {
    overflow-x: auto;
  }
}
</style>
