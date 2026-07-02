import axios from 'axios'

/* ================= Axios Instance ================= */

const api = axios.create({
  baseURL: 'http://localhost/clientManagementBE/clientManagementBE/public/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

/* ================= Export Axios Instance ================= */

export default api

/* ================= Get All Clients ================= */

export const getAllClients = () => api.get('/client/getallclients')

/* ================= Get Client By ID ================= */

export const getClientById = (id) => api.get(`/client/getclientbyid/${id}`)

/* ================= Add Client ================= */

export const addClient = (data) => api.post('/client/addclient', data)

/* ================= Update Client ================= */

export const updateClient = (id, data) => api.put(`/client/updateclient/${id}`, data)

/* ================= Delete Client ================= */

export const deleteClient = (id) => api.delete(`/client/deleteclient/${id}`)

/* ================= Search Client By Phone ================= */

export const searchClientByPhone = (phone) => api.get(`/client/searchclientbyphone/${phone}`)

/* ================= Dashboard Summary ================= */

export const getDashboardSummary = () => api.get('/client/dashboardsummary')
