<template>
  <!-- ================= Report Page ================= -->

  <div class="report-page">
    <!-- ================= Report Table ================= -->

    <ReportTable />
  </div>
</template>

<script setup>
/* ================= Import Report Table Component ================= */

import ReportTable from '@/views/Report/Components/reportTable.vue'
</script>

<style scoped>
/* ================= Report Page Layout ================= */

.report-page {
  width: 100%;
}
</style>
