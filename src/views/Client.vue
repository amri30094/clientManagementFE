<template>
  <div class="client-page">
    <ClientTable
      :clients="clients"
      @add="openAdd"
      @view="openView"
      @edit="openEdit"
      @delete="deleteClient"
    />

    <ClientCard v-model="showModal" :mode="modalMode" :client="selectedClient" @save="handleSave" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import ClientTable from './Client Management/Components/clinetTable.vue'
import ClientCard from './Client Management/Components/clientcard.vue'

import {
  getAllClients,
  addClient,
  updateClient,
  deleteClient as deleteClientApi,
} from '@/api/clientApi'

/* ================= State ================= */
const clients = ref([])

const showModal = ref(false)
const modalMode = ref('add')
const selectedClient = ref(null)

const avatarColors = ['#3b82f6', '#16a34a', '#8b5cf6', '#f59e0b', '#ef4444']

/* ================= Helpers ================= */
function getInitials(name) {
  return name
    .split(' ')
    .map((item) => item[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()
}

/* ================= Load Clients ================= */
async function loadClients() {
  try {
    const response = await getAllClients()

    clients.value = response.data.data.map((client, index) => ({
      id: client.id,
      name: client.name,
      company: client.company,
      employeeCount: client.employee_count,
      phone: client.phone,
      email: client.email,
      address: client.address,
      projectBudget: Number(client.project_budget),
      status: 'Active',
      initials: getInitials(client.name),
      color: avatarColors[index % avatarColors.length],

      created_at: client.created_at,
    }))
  } catch (error) {
    console.error('Load Clients Error:', error)
  }
}

onMounted(() => {
  loadClients()
})

/* ================= Modal Openers ================= */
function openAdd() {
  modalMode.value = 'add'
  selectedClient.value = null
  showModal.value = true
}

function openView(client) {
  modalMode.value = 'view'
  selectedClient.value = { ...client }
  showModal.value = true
}

function openEdit(client) {
  modalMode.value = 'edit'
  selectedClient.value = { ...client }
  showModal.value = true
}

/* ================= Delete Client ================= */
async function deleteClient(client) {
  const confirmDelete = confirm(`Are you sure you want to delete ${client.name}?`)

  if (!confirmDelete) return

  try {
    await deleteClientApi(client.id)

    await loadClients()

    alert('Client Deleted Successfully.')
  } catch (error) {
    console.error(error)

    alert('Failed to Delete Client.')
  }
}

/* ================= Save (Add / Edit) ================= */
async function handleSave(data) {
  try {
    const payload = {
      name: data.name,
      company: data.company,
      employee_count: Number(data.employeeCount),
      phone: data.phone,
      email: data.email,
      address: data.address,
      project_budget: Number(data.projectBudget),
    }

    if (modalMode.value === 'add') {
      await addClient(payload)

      alert('Client Added Successfully.')
    } else {
      await updateClient(selectedClient.value.id, {
        phone: payload.phone,
        address: payload.address,
        project_budget: payload.project_budget,
      })

      alert('Client Updated Successfully.')
    }

    showModal.value = false

    await loadClients()
  } catch (error) {
    console.error(error)

    if (error.response?.data?.errors) {
      alert(Object.values(error.response.data.errors).flat().join('\n'))
    } else {
      alert('Something went wrong.')
    }
  }
}
</script>

<style scoped>
/* ================= Client Page ================= */
.client-page {
  width: 100%;
}
</style>
