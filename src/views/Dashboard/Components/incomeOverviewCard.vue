<template>
  <v-card class="panel-card" flat>
    <!-- ================= Panel Header ================= -->
    <div class="panel-header">
      <h3 class="panel-title">Income Overview</h3>

      <v-btn variant="text" color="primary" size="small"> This Month </v-btn>
    </div>

    <!-- ================= Total Income Section ================= -->
    <div class="income-section">
      <div class="income-title">Total Income</div>

      <div class="income-value">
        Rs. {{ Number(summary.total_final_value || 0).toLocaleString() }}
      </div>

      <div class="income-growth">
        <v-icon icon="mdi-trending-up" color="success" size="18" />

        <span>+7.8% from last month</span>
      </div>
    </div>

    <!-- ================= Progress Breakdown List ================= -->
    <div class="progress-list">
      <div class="progress-item">
        <div class="progress-header">
          <span>Project Budget</span>
          <strong> Rs. {{ Number(summary.total_project_budget || 0).toLocaleString() }} </strong>
        </div>

        <v-progress-linear model-value="86" color="success" bg-color="#E5E7EB" rounded height="8" />

        <div class="percent">86%</div>
      </div>

      <div class="progress-item">
        <div class="progress-header">
          <span>Service Charge</span>
          <strong> Rs. {{ Number(summary.total_service_charge || 0).toLocaleString() }} </strong>
        </div>

        <v-progress-linear
          model-value="7"
          color="deep-purple"
          bg-color="#E5E7EB"
          rounded
          height="8"
        />

        <div class="percent">7%</div>
      </div>

      <div class="progress-item">
        <div class="progress-header">
          <span>Discount</span>
          <strong> Rs. {{ Number(summary.total_discount || 0).toLocaleString() }} </strong>
        </div>

        <v-progress-linear model-value="5" color="orange" bg-color="#E5E7EB" rounded height="8" />

        <div class="percent">5%</div>
      </div>

      <div class="progress-item">
        <div class="progress-header">
          <span>Other Income</span>
          <strong>Rs. 509,000</strong>
        </div>

        <v-progress-linear model-value="4" color="blue" bg-color="#E5E7EB" rounded height="8" />

        <div class="percent">4%</div>
      </div>
    </div>

    <!-- ================= Panel Footer (Total) ================= -->
    <div class="panel-footer">
      <div class="total-text">Total</div>

      <div class="total-value">
        Rs. {{ Number(summary.total_final_value || 0).toLocaleString() }}
      </div>
    </div>
  </v-card>
</template>

<script setup>
/* ================= Props ================= */
defineProps({
  summary: {
    type: Object,
    default: () => ({}),
  },
})
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
  margin-bottom: 18px;
}

.panel-title {
  font-size: 16px;
  font-weight: 700;
  color: #0a1551;
}

/* ================= Total Income Section ================= */
.income-title {
  color: #64748b;
  font-size: 14px;
}

.income-value {
  margin-top: 6px;
  font-size: 24px;
  font-weight: 700;
  color: #0a1551;
}

.income-growth {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
  color: #16a34a;
  font-size: 13px;
  font-weight: 600;
}

/* ================= Progress Breakdown List ================= */
.progress-list {
  margin-top: 26px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 13px;
  color: #475569;
}

.progress-header strong {
  color: #0a1551;
}

.percent {
  margin-top: 4px;
  text-align: right;
  font-size: 12px;
  color: #64748b;
}

/* ================= Panel Footer (Total) ================= */
.panel-footer {
  margin-top: auto;
  border-top: 1px solid #eef2f7;
  padding-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-text {
  font-size: 18px;
  font-weight: 700;
  color: #0a1551;
}

.total-value {
  font-size: 22px;
  font-weight: 700;
  color: #0a1551;
}
</style>
