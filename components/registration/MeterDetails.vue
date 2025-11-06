<template>
  <div class="space-y-6">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
          <Gauge class="w-5 h-5 text-blue-600" />
        </div>
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Meter & Unit Details</h2>
        <p class="text-sm text-gray-600 mt-1">Add your utility meters and tenant information</p>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6" novalidate>
      <!-- Existing Meters List -->
      <div v-if="meters.length > 0" class="space-y-4">
        <div v-for="(meter, index) in meters" :key="index" class="p-6 bg-white/80 backdrop-blur-sm rounded-xl space-y-6 border-0 shadow-lg">
          <div class="flex justify-between items-center border-b border-gray-200 pb-4">
            <h3 class="text-lg font-semibold">Meter {{ index + 1 }}</h3>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              @click="removeMeter(index)"
            >
              <XIcon class="h-4 w-4" />
            </Button>
          </div>

          <!-- Meter Information -->
          <div class="space-y-6">
            <h4 class="font-medium text-gray-700">Meter Information</h4>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div class="space-y-2">
                <Label :for="'meterNumber-' + index">Meter Number</Label>
                <Input
                  :id="'meterNumber-' + index"
                  v-model="meter.meterNumber"
                  type="text"
                  placeholder="Enter meter number"
                  :class="{ 'border-red-500': errors[`meters.${index}.meterNumber`] }"
                />
                <span v-if="errors[`meters.${index}.meterNumber`]" class="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle class="h-4 w-4" />
                  {{ errors[`meters.${index}.meterNumber`] }}
                </span>
              </div>

              <div class="space-y-2">
                <Label :for="'utilityType-' + index">Utility Type</Label>
                <Select
                  :id="'utilityType-' + index"
                  v-model="meter.utilityType"
                  :options="utilityTypeOptions"
                  placeholder="Select utility type"
                  :class="{ 'border-red-500': errors[`meters.${index}.utilityType`] }"
                />
                <span v-if="errors[`meters.${index}.utilityType`]" class="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle class="h-4 w-4" />
                  {{ errors[`meters.${index}.utilityType`] }}
                </span>
              </div>
            </div>

            <div class="space-y-2">
              <Label :for="'location-' + index">Meter Location</Label>
              <Input
                :id="'location-' + index"
                v-model="meter.location"
                type="text"
                placeholder="e.g., Main Building Basement, Unit 101"
                :class="{ 'border-red-500': errors[`meters.${index}.location`] }"
              />
              <span v-if="errors[`meters.${index}.location`]" class="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle class="h-4 w-4" />
                {{ errors[`meters.${index}.location`] }}
              </span>
            </div>

            <div class="flex items-center space-x-2">
              <Checkbox
                :id="'isActive-' + index"
                v-model="meter.isActive"
              />
              <Label :for="'isActive-' + index">Meter is currently active</Label>
            </div>
          </div>

          <!-- Unit Details -->
          <div class="space-y-6 pt-6 border-t border-gray-200">
            <h4 class="font-medium text-gray-700">Unit Details</h4>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div class="space-y-2">
                <Label :for="'unitNumber-' + index">Unit Number</Label>
              <Input
                  :id="'unitNumber-' + index"
                  v-model="meter.unit.unitNumber"
                  type="text"
                  placeholder="e.g., Unit 101"
                  :class="{ 'border-red-500': errors[`meters.${index}.unit.unitNumber`] }"
                />
                <span v-if="errors[`meters.${index}.unit.unitNumber`]" class="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle class="h-4 w-4" />
                  {{ errors[`meters.${index}.unit.unitNumber`] }}
                </span>
              </div>

              <div class="space-y-2">
                <Label :for="'unitType-' + index">Unit Type</Label>
                <Select
                  :id="'unitType-' + index"
                  v-model="meter.unit.unitType"
                  :options="unitTypeOptions"
                  placeholder="Select unit type"
                  :class="{ 'border-red-500': errors[`meters.${index}.unit.unitType`] }"
                />
                <span v-if="errors[`meters.${index}.unit.unitType`]" class="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle class="h-4 w-4" />
                  {{ errors[`meters.${index}.unit.unitType`] }}
                </span>
              </div>
            </div>
          </div>

          <!-- Tenant Information -->
          <div class="space-y-6 pt-6 border-t border-gray-200">
            <div class="flex items-center justify-between">
              <h4 class="font-medium text-gray-700">Tenant Information</h4>
              <div class="flex items-center space-x-2">
                <Checkbox
                  :id="'hasTenant-' + index"
                  v-model="meter.unit.hasTenant"
                />
                <Label :for="'hasTenant-' + index">Unit has current tenant</Label>
              </div>
            </div>

            <div v-if="meter.unit.hasTenant" class="space-y-4">
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div class="space-y-2">
                  <Label :for="'tenantName-' + index">Tenant Name</Label>
                  <Input
                    :id="'tenantName-' + index"
                    v-model="meter.unit.tenant.name"
                    type="text"
                    placeholder="Enter tenant's full name"
                    :class="{ 'border-red-500': errors[`meters.${index}.unit.tenant.name`] }"
                  />
                  <span v-if="errors[`meters.${index}.unit.tenant.name`]" class="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle class="h-4 w-4" />
                    {{ errors[`meters.${index}.unit.tenant.name`] }}
                  </span>
                </div>

                <div class="space-y-2">
                  <Label :for="'tenantPhone-' + index">Phone Number</Label>
                  <Input
                    :id="'tenantPhone-' + index"
                    v-model="meter.unit.tenant.phone"
                    type="tel"
                    placeholder="Enter tenant's phone number"
                    :class="{ 'border-red-500': errors[`meters.${index}.unit.tenant.phone`] }"
                  />
                  <span v-if="errors[`meters.${index}.unit.tenant.phone`]" class="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle class="h-4 w-4" />
                    {{ errors[`meters.${index}.unit.tenant.phone`] }}
                  </span>
                </div>
              </div>

              <div class="space-y-2">
                <Label :for="'tenantEmail-' + index">Email Address</Label>
                <Input
                  :id="'tenantEmail-' + index"
                  v-model="meter.unit.tenant.email"
                  type="email"
                  placeholder="Enter tenant's email address"
                  :class="{ 'border-red-500': errors[`meters.${index}.unit.tenant.email`] }"
                />
                <span v-if="errors[`meters.${index}.unit.tenant.email`]" class="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle class="h-4 w-4" />
                  {{ errors[`meters.${index}.unit.tenant.email`] }}
                </span>
              </div>

              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div class="space-y-2">
                  <Label :for="'leaseStart-' + index">Lease Start Date</Label>
                  <Input
                    :id="'leaseStart-' + index"
                    v-model="meter.unit.tenant.leaseStart"
                    type="date"
                    :class="{ 'border-red-500': errors[`meters.${index}.unit.tenant.leaseStart`] }"
                  />
                  <span v-if="errors[`meters.${index}.unit.tenant.leaseStart`]" class="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle class="h-4 w-4" />
                    {{ errors[`meters.${index}.unit.tenant.leaseStart`] }}
                  </span>
                </div>

                <div class="space-y-2">
                  <Label :for="'leaseEnd-' + index">Lease End Date</Label>
                  <Input
                    :id="'leaseEnd-' + index"
                    v-model="meter.unit.tenant.leaseEnd"
                    type="date"
                    :class="{ 'border-red-500': errors[`meters.${index}.unit.tenant.leaseEnd`] }"
                  />
                  <span v-if="errors[`meters.${index}.unit.tenant.leaseEnd`]" class="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle class="h-4 w-4" />
                    {{ errors[`meters.${index}.unit.tenant.leaseEnd`] }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Add New Meter Button -->
      <Button
        type="button"
        variant="outline"
        class="w-full border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl"
        @click="addMeter"
      >
        <PlusIcon class="h-4 w-4 mr-2" />
        Add New Meter & Unit
      </Button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { XIcon, PlusIcon, AlertCircle, Gauge } from 'lucide-vue-next'
import Label from '~/components/ui/label.vue'
import Input from '~/components/ui/input.vue'
import Button from '~/components/ui/button.vue'
import Checkbox from '~/components/ui/checkbox.vue'
import Select from '~/components/ui/select.vue'

const emit = defineEmits(['dataChange'])

const props = defineProps({
  registrationData: {
    type: Object,
    required: true
  }
})

const utilityTypeOptions = [
  { value: 'electricity', label: 'Electricity' },
  { value: 'water', label: 'Water' },
  { value: 'gas', label: 'Gas' }
]

const unitTypeOptions = [
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'industrial', label: 'Industrial' }
]

const createEmptyMeter = () => ({
  meterNumber: '',
  utilityType: '',
  location: '',
  isActive: true,
  unit: {
    unitNumber: '',
    unitType: '',
    hasTenant: false,
    tenant: {
      name: '',
      phone: '',
      email: '',
      leaseStart: '',
      leaseEnd: ''
    }
  }
})

const meters = ref([])
const isSyncingFromProps = ref(false)

watch(() => props.registrationData?.meters, (newValue) => {
  if (!newValue) {
    meters.value = []
    return
  }

  isSyncingFromProps.value = true
  meters.value = JSON.parse(JSON.stringify(newValue))
  isSyncingFromProps.value = false
}, { immediate: true, deep: true })

const addMeter = () => {
  meters.value.push(createEmptyMeter())
}

const removeMeter = (index) => {
  meters.value.splice(index, 1)
}

const errors = computed(() => {
  const errorMap = {}

  meters.value.forEach((meter, index) => {
    if (!meter.meterNumber || meter.meterNumber.trim().length === 0) {
      errorMap[`meters.${index}.meterNumber`] = 'Meter number is required'
    }

    if (!meter.utilityType || meter.utilityType === '') {
      errorMap[`meters.${index}.utilityType`] = 'Utility type is required'
    }

    if (!meter.unit?.unitType || meter.unit.unitType === '') {
      errorMap[`meters.${index}.unit.unitType`] = 'Unit type is required'
    }

    if (meter.unit?.hasTenant) {
      const tenant = meter.unit.tenant ?? {}

      if (!tenant.name || tenant.name.trim().length === 0) {
        errorMap[`meters.${index}.unit.tenant.name`] = 'Tenant name is required'
      }
      if (!tenant.phone || tenant.phone.trim().length === 0) {
        errorMap[`meters.${index}.unit.tenant.phone`] = 'Tenant phone is required'
      }
      if (!tenant.email || tenant.email.trim().length === 0) {
        errorMap[`meters.${index}.unit.tenant.email`] = 'Tenant email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tenant.email)) {
        errorMap[`meters.${index}.unit.tenant.email`] = 'Please enter a valid email address'
      }
      if (!tenant.leaseStart || tenant.leaseStart.trim().length === 0) {
        errorMap[`meters.${index}.unit.tenant.leaseStart`] = 'Lease start date is required'
      }
      if (!tenant.leaseEnd || tenant.leaseEnd.trim().length === 0) {
        errorMap[`meters.${index}.unit.tenant.leaseEnd`] = 'Lease end date is required'
      }
    }
  })

  return errorMap
})

watch(meters, (newValue) => {
  if (isSyncingFromProps.value) {
    return
  }

  emit('dataChange', JSON.parse(JSON.stringify(newValue)))
}, { deep: true, immediate: false })

const handleSubmit = () => {
  if (isSyncingFromProps.value) {
    return
  }

  emit('dataChange', JSON.parse(JSON.stringify(meters.value)))
}

defineExpose({
  validate: () => true,
  getData: () => JSON.parse(JSON.stringify(meters.value)),
  submit: () => {
    handleSubmit()
    return true
  }
})
</script> 