<template>
  <div>
    <div class="space-y-6">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
          <MapPin class="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Address Details</h2>
          <p class="text-sm text-gray-600 mt-1">Please provide your address information</p>
        </div>
      </div>

      <!-- Main Address -->
      <div class="bg-white/80 backdrop-blur-sm rounded-xl border-0 p-6 space-y-6 shadow-lg">
        <h3 class="text-lg font-medium text-gray-900">Main Business Address</h3>
        <div class="space-y-2">
          <Label for="streetAddress" class="flex items-center justify-between">
            <span>Street Address</span>
            <span v-if="formData.streetAddress" class="text-xs text-gray-500">
              {{ formData.streetAddress.length }}/100 characters
            </span>
          </Label>
          <Input
            id="streetAddress"
            v-model="formData.streetAddress"
            type="text"
            placeholder="Enter your street address"
            class="bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
            :class="{ 
              'border-red-500 focus:ring-red-500': errors.streetAddress,
              'border-green-500 focus:ring-green-500': formData.streetAddress && !errors.streetAddress
            }"
            aria-describedby="streetAddress-error streetAddress-hint"
          />
          <p id="streetAddress-hint" class="text-xs text-gray-500">Include your street name and building number</p>
          <span 
            v-if="errors.streetAddress" 
            id="streetAddress-error" 
            class="text-sm text-red-500 flex items-center gap-1"
          >
            <AlertCircle class="h-4 w-4" />
            {{ errors.streetAddress }}
          </span>
        </div>

        <div class="space-y-2">
          <Label for="suburb" class="flex items-center justify-between">
            <span>Suburb</span>
            <span v-if="formData.suburb" class="text-xs text-gray-500">
              {{ formData.suburb.length }}/50 characters
            </span>
          </Label>
          <Input
            id="suburb"
            v-model="formData.suburb"
            type="text"
            placeholder="Enter your suburb"
            class="bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
            :class="{ 
              'border-red-500 focus:ring-red-500': errors.suburb,
              'border-green-500 focus:ring-green-500': formData.suburb && !errors.suburb
            }"
            aria-describedby="suburb-error"
          />
          <span 
            v-if="errors.suburb" 
            id="suburb-error" 
            class="text-sm text-red-500 flex items-center gap-1"
          >
            <AlertCircle class="h-4 w-4" />
            {{ errors.suburb }}
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <Label for="city" class="flex items-center justify-between">
              <span>City</span>
              <span v-if="formData.city" class="text-xs text-gray-500">
                {{ formData.city.length }}/50 characters
              </span>
            </Label>
            <Input
              id="city"
              v-model="formData.city"
              type="text"
              placeholder="Enter your city"
              class="bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
              :class="{ 
                'border-red-500 focus:ring-red-500': errors.city,
                'border-green-500 focus:ring-green-500': formData.city && !errors.city
              }"
            aria-describedby="city-error"
            />
            <span 
              v-if="errors.city" 
              id="city-error" 
              class="text-sm text-red-500 flex items-center gap-1"
            >
              <AlertCircle class="h-4 w-4" />
              {{ errors.city }}
            </span>
          </div>

          <div class="space-y-2">
            <Label for="province" class="flex items-center justify-between">
              <span>Province</span>
              <span v-if="formData.province" class="text-xs text-gray-500">
                {{ formData.province.length }}/50 characters
              </span>
            </Label>
            <Input
              id="province"
              v-model="formData.province"
              type="text"
              maxlength="50"
              placeholder="Enter your province"
              :class="{ 
                'border-red-500 focus:ring-red-500': errors.province,
                'border-green-500 focus:ring-green-500': formData.province && !errors.province
              }"
            aria-describedby="province-error"
            />
            <span 
              v-if="errors.province" 
              id="province-error" 
              class="text-sm text-red-500 flex items-center gap-1"
            >
              <AlertCircle class="h-4 w-4" />
              {{ errors.province }}
            </span>
          </div>
        </div>

        <div class="space-y-2">
          <Label for="postalCode" class="flex items-center justify-between">
            <span>Postal Code</span>
            <span v-if="formData.postalCode" class="text-xs text-gray-500">
              {{ formData.postalCode.length }}/4 digits
            </span>
          </Label>
          <Input
            id="postalCode"
            v-model="formData.postalCode"
            type="text"
            maxlength="4"
            placeholder="Enter 4-digit postal code"
            :class="{ 
              'border-red-500 focus:ring-red-500': errors.postalCode,
              'border-green-500 focus:ring-green-500': formData.postalCode && !errors.postalCode
            }"
            aria-describedby="postalCode-error postalCode-hint"
            @input="formatPostalCode"
          />
          <p id="postalCode-hint" class="text-xs text-gray-500">Enter a valid 4-digit South African postal code</p>
          <span 
            v-if="errors.postalCode" 
            id="postalCode-error" 
            class="text-sm text-red-500 flex items-center gap-1"
          >
            <AlertCircle class="h-4 w-4" />
            {{ errors.postalCode }}
          </span>
        </div>
      </div>

      <!-- Complexes -->
      <div class="bg-white/95 backdrop-blur-sm rounded-2xl border border-blue-200 p-6 space-y-6 shadow-lg">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900">Complexes</h3>
          <Button 
            variant="outline" 
            size="sm" 
            type="button"
            class="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl"
            @click.prevent="addComplex"
          >
            <PlusIcon class="h-4 w-4 mr-2" />
            Add Complex
          </Button>
        </div>

        <div v-if="formData.complexes.length" class="space-y-6">
          <div 
            v-for="(complex, index) in formData.complexes" 
            :key="index"
            class="bg-white/60 rounded-xl p-4 space-y-4 border-0"
          >
            <div class="flex items-center justify-between">
              <h4 class="font-medium text-gray-900">Complex {{ index + 1 }}</h4>
              <Button 
                variant="ghost" 
                size="sm"
                class="text-red-600 hover:text-red-700"
                @click="removeComplex(index)"
              >
                <TrashIcon class="h-4 w-4" />
              </Button>
            </div>

            <div class="space-y-4">
              <div class="space-y-2">
                <Label :for="'complexName-' + index">Complex Name</Label>
                <Input
                  :id="'complexName-' + index"
                  v-model="complex.name"
                  type="text"
                  placeholder="Enter complex name"
                  :class="{ 
                    'border-red-500': errors[`complexes.${index}.name`]
                  }"
                />
                <span 
                  v-if="errors[`complexes.${index}.name`]" 
                  class="text-sm text-red-500 flex items-center gap-1"
                >
                  <AlertCircle class="h-4 w-4" />
                  {{ errors[`complexes.${index}.name`] }}
                </span>
              </div>

              <div class="space-y-2">
                <Label :for="'complexAddress-' + index">Complex Address</Label>
                <Input
                  :id="'complexAddress-' + index"
                  v-model="complex.address"
                  type="text"
                  placeholder="Enter complex address"
                  :class="{ 
                    'border-red-500': errors[`complexes.${index}.address`]
                  }"
                />
                <span 
                  v-if="errors[`complexes.${index}.address`]" 
                  class="text-sm text-red-500 flex items-center gap-1"
                >
                  <AlertCircle class="h-4 w-4" />
                  {{ errors[`complexes.${index}.address`] }}
                </span>
              </div>

              <div class="space-y-2">
                <Label :for="'unitCount-' + index">Number of Units</Label>
                <Input
                  :id="'unitCount-' + index"
                  v-model="complex.unitCount"
                  type="number"
                  min="1"
                  placeholder="Enter number of units"
                  :class="{ 
                    'border-red-500': errors[`complexes.${index}.unitCount`]
                  }"
                />
                <span 
                  v-if="errors[`complexes.${index}.unitCount`]" 
                  class="text-sm text-red-500 flex items-center gap-1"
                >
                  <AlertCircle class="h-4 w-4" />
                  {{ errors[`complexes.${index}.unitCount`] }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <p v-else class="text-sm text-gray-500 text-center">No complexes added yet</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import Label from '~/components/ui/label.vue'
import Input from '~/components/ui/input.vue'
import Button from '~/components/ui/button.vue'
import { AlertCircle, PlusIcon, TrashIcon, MapPin } from 'lucide-vue-next'

const props = defineProps({
  registrationData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['dataChange'])

const defaultAddressState = () => ({
  streetAddress: '',
  suburb: '',
  city: '',
  province: '',
  postalCode: '',
  complexes: []
})

const formData = ref(defaultAddressState())

const isSyncingFromProps = ref(false)

// Initialize / sync form data from props if available
watch(() => props.registrationData?.address, (newValue) => {
  if (!newValue) {
    return
  }

  isSyncingFromProps.value = true
  const synced = {
    ...defaultAddressState(),
    ...JSON.parse(JSON.stringify(newValue))
  }

  if (!Array.isArray(synced.complexes)) {
    synced.complexes = []
  }

  formData.value = synced
  isSyncingFromProps.value = false
}, { immediate: true, deep: true })

// Format postal code to only allow numbers
const formatPostalCode = (event) => {
  formData.value.postalCode = event.target.value.replace(/\D/g, '').slice(0, 4)
}

const addComplex = () => {
  formData.value.complexes.push({
    name: '',
    address: '',
    unitCount: null
  })
}

const removeComplex = (index) => {
  formData.value.complexes.splice(index, 1)
}

const errors = computed(() => {
  const currentValue = formData.value
  const newErrors = {}
  
  // Validate main address - 1+ character for most fields
  if (!currentValue.streetAddress || currentValue.streetAddress.trim().length === 0) {
    newErrors.streetAddress = 'Street address is required'
  }

  if (!currentValue.suburb || currentValue.suburb.trim().length === 0) {
    newErrors.suburb = 'Suburb is required'
  }

  if (!currentValue.city || currentValue.city.trim().length === 0) {
    newErrors.city = 'City is required'
  }

  if (!currentValue.province || currentValue.province.trim().length === 0) {
    newErrors.province = 'Province is required'
  }

  // Postal code - explicit limit: exactly 4 digits
  if (!currentValue.postalCode || currentValue.postalCode.trim().length === 0) {
    newErrors.postalCode = 'Postal code is required'
  } else if (!/^\d{4}$/.test(currentValue.postalCode)) {
    newErrors.postalCode = 'Please enter a valid 4-digit postal code'
  }

  // Validate complexes - only if complex exists (optional, but if added, fields are required)
  currentValue.complexes.forEach((complex, index) => {
    if (!complex.name || complex.name.trim().length === 0) {
      newErrors[`complexes.${index}.name`] = 'Complex name is required'
    }
    if (!complex.address || complex.address.trim().length === 0) {
      newErrors[`complexes.${index}.address`] = 'Complex address is required'
    }
    if (!complex.unitCount || complex.unitCount < 1) {
      newErrors[`complexes.${index}.unitCount`] = 'Number of units is required and must be at least 1'
    }
  })

  return newErrors
})

// Emit whenever the form changes (skip when syncing from props)
watch(formData, (newValue) => {
  if (isSyncingFromProps.value) {
    return
  }

  emit('dataChange', JSON.parse(JSON.stringify(newValue)))
}, { deep: true, immediate: false })

// Expose form data to parent
defineExpose({
  validate: () => true,
  getData: () => formData.value,
  submit: () => {
    emit('dataChange', { ...formData.value })
    return true
  }
})
</script> 