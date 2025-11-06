<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
        <Icon name="lucide:gauge" class="w-5 h-5 text-blue-600" />
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
                  @input="handleDataChange"
                />
                <span v-if="errors[`meters.${index}.meterNumber`]" class="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle class="h-4 w-4" />
                  {{ errors[`meters.${index}.meterNumber`] }}
                </span>
              </div>

              <div class="space-y-2">
                <Label :for="'utilityType-' + index">Utility Type</Label>
                <Select
                  v-model="meter.utilityType"
                  :class="{ 'border-red-500': errors[`meters.${index}.utilityType`] }"
                  @update:model-value="handleDataChange"
                >
                  <SelectTrigger :id="'utilityType-' + index">
                    <SelectValue placeholder="Select utility type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electricity">Electricity</SelectItem>
                    <SelectItem value="water">Water</SelectItem>
                    <SelectItem value="gas">Gas</SelectItem>
                  </SelectContent>
                </Select>
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
                @input="handleDataChange"
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
                @update:checked="handleDataChange"
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
                  @input="handleDataChange"
                />
                <span v-if="errors[`meters.${index}.unit.unitNumber`]" class="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle class="h-4 w-4" />
                  {{ errors[`meters.${index}.unit.unitNumber`] }}
                </span>
              </div>

              <div class="space-y-2">
                <Label :for="'unitType-' + index">Unit Type</Label>
                <Select
                  v-model="meter.unit.unitType"
                  :class="{ 'border-red-500': errors[`meters.${index}.unit.unitType`] }"
                  @update:model-value="handleDataChange"
                >
                  <SelectTrigger :id="'unitType-' + index">
                    <SelectValue placeholder="Select unit type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                  </SelectContent>
                </Select>
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
                  @update:checked="handleDataChange"
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
                    @input="handleDataChange"
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
                    @input="handleDataChange"
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
                  @input="handleDataChange"
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
                    @input="handleDataChange"
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
                    @input="handleDataChange"
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
import { ref, reactive, watch } from 'vue'
import { XIcon, PlusIcon, AlertCircle } from 'lucide-vue-next'
import Label from '~/components/ui/label.vue'
import Input from '~/components/ui/input.vue'
import Button from '~/components/ui/button.vue'
import Checkbox from '~/components/ui/checkbox.vue'
import Select from '~/components/ui/select.vue'
import SelectContent from '~/components/ui/SelectContent.vue'
import SelectItem from '~/components/ui/SelectItem.vue'
import SelectTrigger from '~/components/ui/SelectTrigger.vue'
import SelectValue from '~/components/ui/SelectValue.vue'

const emit = defineEmits(['dataChange'])

const props = defineProps({
  registrationData: {
    type: Object,
    required: true
  }
})

const meters = ref([])
const errors = reactive({})

// Initialize form data from props if available
watch(() => props.registrationData?.meters, (newValue) => {
  if (newValue && newValue.length > 0) {
    meters.value = [...newValue]
  }
}, { immediate: true })

const addMeter = () => {
  meters.value.push({
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
  handleDataChange()
}

const removeMeter = (index) => {
  meters.value.splice(index, 1)
  handleDataChange()
}

const handleDataChange = () => {
  // Emit the data to parent
  emit('dataChange', [...meters.value])
}

const validateForm = () => true

const handleSubmit = () => {
  handleDataChange()
}

defineExpose({
  validate: () => true,
  getData: () => [...meters.value],
  submit: () => {
    handleDataChange()
    return true
  }
})
</script> 