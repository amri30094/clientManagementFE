<template>
  <!-- ================= Dialog Wrapper ================= -->
  <v-dialog :model-value="modelValue" max-width="480" @update:model-value="close">
    <v-card class="modal-card">
      <!-- ================= Header ================= -->
      <div class="modal-header">
        <h3>{{ titles[mode] }}</h3>

        <v-btn icon variant="text" size="32" @click="close(false)">
          <v-icon icon="mdi-close" size="20" />
        </v-btn>
      </div>

      <!-- ================= Body ================= -->
      <div class="modal-body">
        <!-- ================= Client Name Field ================= -->
        <div class="field-block">
          <label>
            Client Name
            <span v-if="mode === 'add'" class="req">*</span>
          </label>

          <v-text-field
            v-model="form.name"
            placeholder="Enter client name"
            variant="outlined"
            density="compact"
            hide-details
            :readonly="mode !== 'add'"
          />
        </div>

        <!-- ================= Company Name Field ================= -->
        <div class="field-block">
          <label>
            Company Name
            <span v-if="mode === 'add'" class="req">*</span>
          </label>

          <v-text-field
            v-model="form.company"
            placeholder="Enter company name"
            variant="outlined"
            density="compact"
            hide-details
            :readonly="mode !== 'add'"
          />
        </div>

        <!-- ================= Employee Count Field ================= -->
        <div class="field-block">
          <div class="label-row">
            <label>
              Employee Count
              <span v-if="mode === 'add'" class="req">*</span>
            </label>

            <v-tooltip text="Used to automatically calculate Service Charge and Discount.">
              <template #activator="{ props: tip }">
                <v-icon v-bind="tip" icon="mdi-information-outline" size="16" color="#1846e0" />
              </template>
            </v-tooltip>
          </div>

          <v-text-field
            v-model.number="form.employeeCount"
            type="number"
            placeholder="Enter number of employees"
            variant="outlined"
            density="compact"
            hide-details
            :readonly="mode !== 'add'"
          />
        </div>

        <!-- ================= Phone & Email Fields ================= -->
        <div class="field-row">
          <div class="field-block">
            <label>
              Phone Number
              <span class="req">*</span>
            </label>

            <v-text-field
              v-model="form.phone"
              placeholder="Enter phone number"
              variant="outlined"
              density="compact"
              hide-details
              :readonly="mode === 'view'"
            />
          </div>

          <div class="field-block">
            <label>
              Email
              <span v-if="mode === 'add'" class="req">*</span>
            </label>

            <v-text-field
              v-model="form.email"
              placeholder="Enter email"
              variant="outlined"
              density="compact"
              hide-details
              :readonly="mode !== 'add'"
            />
          </div>
        </div>

        <!-- ================= Address Field ================= -->
        <div class="field-block">
          <label>Address</label>

          <v-textarea
            v-model="form.address"
            placeholder="Enter address"
            variant="outlined"
            density="compact"
            rows="2"
            hide-details
            :readonly="mode === 'view'"
          />
        </div>

        <!-- ================= Project Budget Field ================= -->
        <div class="field-block">
          <label>
            Project Budget (Rs.)
            <span v-if="mode === 'add'" class="req">*</span>
          </label>

          <v-text-field
            v-model.number="form.projectBudget"
            type="number"
            placeholder="Enter project budget"
            variant="outlined"
            density="compact"
            hide-details
            :readonly="mode === 'view'"
          />
        </div>

        <!-- ================= Calculated Values (Service Charge / Discount / Final) ================= -->
        <div class="calc-row">
          <div class="calc-box">
            <div class="calc-label">Service Charge (Rs.)</div>

            <div class="calc-value green-text">
              {{ calc.serviceCharge.toLocaleString('en-LK') }}
            </div>
          </div>

          <div class="calc-box">
            <div class="calc-label">Discount (Rs.)</div>

            <div class="calc-value red-text">
              {{ calc.discount.toLocaleString('en-LK') }}
            </div>
          </div>

          <div class="calc-box">
            <div class="calc-label">Final Value (Rs.)</div>

            <div class="calc-value blue-text">
              {{ calc.finalValue.toLocaleString('en-LK') }}
            </div>
          </div>
        </div>

        <!-- ================= Information Note ================= -->
        <div v-if="mode !== 'view'" class="info-note">
          <v-icon icon="mdi-information-outline" size="16" color="#1846e0" />

          <span>
            Service Charge and Discount will be calculated automatically based on Project Budget and
            Employee Count.
          </span>
        </div>
      </div>

      <!-- ================= Footer Actions ================= -->
      <div class="modal-footer">
        <v-btn variant="outlined" class="cancel-btn" @click="close(false)"> Cancel </v-btn>

        <v-btn v-if="mode !== 'view'" color="#1846e0" class="save-btn" @click="handleSave">
          {{ mode === 'add' ? 'Save Client' : 'Update Client' }}
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { reactive, watch, computed } from 'vue'

/* ================= Props & Emits ================= */
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },

  mode: {
    type: String,
    default: 'add',
  },

  client: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue', 'save'])

/* ================= Modal Titles ================= */
const titles = {
  add: 'Add New Client',
  edit: 'Edit Client',
  view: 'Client Details',
}

/* ================= Form State ================= */
const emptyForm = () => ({
  name: '',
  company: '',
  employeeCount: '',
  phone: '',
  email: '',
  address: '',
  projectBudget: '',
})

const form = reactive(emptyForm())

/* ================= Sync Form With Props ================= */
watch(
  () => [props.modelValue, props.client, props.mode],
  () => {
    if (props.modelValue) {
      Object.assign(form, props.client ? { ...props.client } : emptyForm())
    }
  },
  {
    immediate: true,
  },
)

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
const calc = computed(() => {
  const budget = Number(form.projectBudget) || 0

  const serviceCharge = Math.round(budget * serviceRate(budget))

  const discount = Math.round(budget * discountRate(form.employeeCount))

  const finalValue = budget + serviceCharge - discount

  return {
    serviceCharge,
    discount,
    finalValue,
  }
})

/* ================= Modal Actions ================= */
function close(value = false) {
  emit('update:modelValue', value)
}

function handleSave() {
  emit('save', {
    ...form,
  })
}
</script>

<style scoped>
/* ================= Modal Card ================= */
.modal-card {
  border-radius: 16px;
  padding: 0;
}

/* ================= Modal Header ================= */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #eef0f6;
}

.modal-header h3 {
  color: #0a1551;
  font-size: 17px;
  font-weight: 700;
}

/* ================= Modal Body ================= */
.modal-body {
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 65vh;
  overflow-y: auto;
}

/* ================= Field Blocks & Rows ================= */
.field-block {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 0;
}

.field-row {
  display: flex;
  gap: 14px;
}

.label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

label {
  font-size: 13px;
  font-weight: 600;
  color: #0a1551;
}

.req {
  color: #ef4444;
}

/* ================= Calculation Boxes ================= */
.calc-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.calc-box {
  border: 1px solid #eef0f6;
  border-radius: 10px;
  padding: 12px;
  text-align: center;
}

.calc-label {
  font-size: 11.5px;
  color: #6b7280;
  margin-bottom: 6px;
}

.calc-value {
  font-size: 17px;
  font-weight: 700;
}

.green-text {
  color: #16a34a;
}

.red-text {
  color: #ef4444;
}

.blue-text {
  color: #1846e0;
}

/* ================= Information Note ================= */
.info-note {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  background: #eef3ff;
  border-radius: 10px;
  padding: 12px;
  font-size: 12.5px;
  color: #374151;
}

/* ================= Modal Footer ================= */
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px 24px;
  border-top: 1px solid #eef0f6;
}

.cancel-btn {
  text-transform: none;
  color: #374151;
}

.save-btn {
  color: #ffffff !important;
  text-transform: none;
  font-weight: 600;
}
</style>
