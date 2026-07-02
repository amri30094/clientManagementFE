/* ================= Vue Router Imports ================= */

import { createRouter, createWebHistory } from 'vue-router'

/* ================= Layout Import ================= */

import MainLayouts from '@/Layouts/MainLayouts.vue'

/* ================= Page Imports ================= */

import Dashboard from '@/views/Dashboard.vue'
import Client from '@/views/Client.vue'
import Report from '@/views/Report.vue'

/* ================= Application Routes ================= */

const routes = [
  {
    path: '/',
    component: MainLayouts,
    children: [
      /* ================= Default Route ================= */

      {
        path: '',
        redirect: '/dashboard',
      },

      /* ================= Dashboard Route ================= */

      {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
          title: 'Dashboard',
        },
      },

      /* ================= Clients Management Route ================= */

      {
        path: 'clients',
        name: 'clients',
        component: Client,
        meta: {
          title: 'Clients Management',
        },
      },

      /* ================= Clients Report Route ================= */

      {
        path: 'reports',
        name: 'reports',
        component: Report,
        meta: {
          title: 'Clients Report',
        },
      },
    ],
  },

  /* ================= 404 Route ================= */

  {
    path: '/:pathMatch(.*)*',
    redirect: '/dashboard',
  },
]

/* ================= Router Configuration ================= */

const router = createRouter({
  history: createWebHistory(),
  routes,

  /* ================= Scroll To Top ================= */

  scrollBehavior() {
    return {
      top: 0,
    }
  },
})

/* ================= Export Router ================= */

export default router
