<template>
  <v-card class="stat-card" elevation="0">
    <!-- ================= Icon Row ================= -->
    <div class="top-row">
      <v-avatar :color="iconBg" size="52" rounded="lg">
        <v-icon :icon="icon" color="white" size="26" />
      </v-avatar>
    </div>

    <!-- ================= Stat Label ================= -->
    <div class="stat-label">
      {{ label }}
    </div>

    <!-- ================= Stat Value ================= -->
    <div class="stat-value">
      {{ value }}
    </div>

    <!-- ================= Stat Trend ================= -->
    <div class="stat-trend">
      <v-icon icon="mdi-trending-up" color="#16A34A" size="16" />

      <span class="trend-percent">
        {{ trend }}
      </span>

      <span class="trend-text"> from last month </span>
    </div>
  </v-card>
</template>

<script setup>
/* ================= Props ================= */
defineProps({
  label: String,
  value: [String, Number],
  trend: String,
  icon: String,
  iconBg: String,
})
</script>

<style scoped>
/* ================= Stat Card ================= */
.stat-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 22px;
  width: 100%;
  min-height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.25s ease;
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
}

/* ================= Icon Row ================= */
.top-row {
  display: flex;
  justify-content: flex-start;
}

/* ================= Stat Label ================= */
.stat-label {
  margin-top: 18px;
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
}

/* ================= Stat Value ================= */
.stat-value {
  margin-top: 8px;
  color: #0a1551;
  font-size: 25px;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
}

/* ================= Stat Trend ================= */
.stat-trend {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 14px;
}

.trend-percent {
  color: #16a34a;
  font-size: 13px;
  font-weight: 700;
}

.trend-text {
  color: #9ca3af;
  font-size: 12px;
}

/* ================= Responsive (Mobile) ================= */
@media (max-width: 768px) {
  .stat-card {
    min-height: 150px;
    padding: 18px;
  }

  .stat-value {
    font-size: 24px;
  }
}
</style>
