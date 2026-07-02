import api from './clientApi'

/* ================= Dashboard Summary API ================= */

// Dashboard Summary
export const getDashboardSummary = () => api.get('/client/dashboardsummary')

/* ================= Recent Clients API ================= */

// Recent Clients
export const getRecentClients = () => api.get('/client/recentclients')

/* ================= Recent Projects API ================= */

// Recent Projects
export const getRecentProjects = () => api.get('/client/recentprojects')
