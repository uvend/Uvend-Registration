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
            maxlength="100"
            class="bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
            :class="{ 
              'border-red-500 focus:ring-red-500': touched.streetAddress && errors.streetAddress,
              'border-green-500 focus:ring-green-500': isFieldValid('streetAddress')
            }"
            aria-describedby="streetAddress-error streetAddress-hint"
            @input="markTouched('streetAddress')"
          />
          <p id="streetAddress-hint" class="text-xs text-gray-500">Include your street name and building number</p>
          <span 
            v-if="touched.streetAddress && errors.streetAddress" 
            id="streetAddress-error" 
            class="text-sm text-red-500 flex items-center gap-1"
          >
            <AlertCircle class="h-4 w-4" />
            {{ errors.streetAddress }}
          </span>
          <span 
            v-else-if="isFieldValid('streetAddress')" 
            class="text-sm text-green-500 flex items-center gap-1"
          >
            <CheckCircle class="h-4 w-4" />
          </span>
        </div>

        <div class="space-y-2">
          <Label for="suburb" class="flex items-center justify-between">
            <span>Suburb</span>
            <span v-if="formData.suburb" class="text-xs text-gray-500">
              {{ formData.suburb.length }}/100 characters
            </span>
          </Label>
          <Input
            id="suburb"
            v-model="formData.suburb"
            type="text"
            placeholder="Enter your suburb"
            maxlength="100"
            class="bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
            :class="{ 
              'border-red-500 focus:ring-red-500': touched.suburb && errors.suburb,
              'border-green-500 focus:ring-green-500': isFieldValid('suburb')
            }"
            aria-describedby="suburb-error"
            @input="markTouched('suburb')"
          />
          <span 
            v-if="touched.suburb && errors.suburb" 
            id="suburb-error" 
            class="text-sm text-red-500 flex items-center gap-1"
          >
            <AlertCircle class="h-4 w-4" />
            {{ errors.suburb }}
          </span>
          <span 
            v-else-if="isFieldValid('suburb')" 
            class="text-sm text-green-500 flex items-center gap-1"
          >
            <CheckCircle class="h-4 w-4" />
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <Label for="city" class="flex items-center justify-between">
              <span>City</span>
              <span v-if="formData.city" class="text-xs text-gray-500">
                {{ formData.city.length }}/100 characters
              </span>
            </Label>
            <Input
              id="city"
              v-model="formData.city"
              type="text"
              placeholder="Enter your city"
              maxlength="100"
              class="bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
              :class="{ 
                'border-red-500 focus:ring-red-500': touched.city && errors.city,
                'border-green-500 focus:ring-green-500': isFieldValid('city')
              }"
              aria-describedby="city-error"
              @input="markTouched('city')"
            />
            <span 
              v-if="touched.city && errors.city" 
              id="city-error" 
              class="text-sm text-red-500 flex items-center gap-1"
            >
              <AlertCircle class="h-4 w-4" />
              {{ errors.city }}
            </span>
            <span 
              v-else-if="isFieldValid('city')" 
              class="text-sm text-green-500 flex items-center gap-1"
            >
              <CheckCircle class="h-4 w-4" />
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
                'border-red-500 focus:ring-red-500': touched.province && errors.province,
                'border-green-500 focus:ring-green-500': isFieldValid('province')
              }"
              aria-describedby="province-error"
              @input="markTouched('province')"
            />
            <span 
              v-if="touched.province && errors.province" 
              id="province-error" 
              class="text-sm text-red-500 flex items-center gap-1"
            >
              <AlertCircle class="h-4 w-4" />
              {{ errors.province }}
            </span>
            <span 
              v-else-if="isFieldValid('province')" 
              class="text-sm text-green-500 flex items-center gap-1"
            >
              <CheckCircle class="h-4 w-4" />
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
              'border-red-500 focus:ring-red-500': touched.postalCode && errors.postalCode,
              'border-green-500 focus:ring-green-500': isFieldValid('postalCode')
            }"
            aria-describedby="postalCode-error postalCode-hint"
            @input="formatPostalCode"
          />
          <p id="postalCode-hint" class="text-xs text-gray-500">Enter a valid 4-digit South African postal code</p>
          <span 
            v-if="touched.postalCode && errors.postalCode" 
            id="postalCode-error" 
            class="text-sm text-red-500 flex items-center gap-1"
          >
            <AlertCircle class="h-4 w-4" />
            {{ errors.postalCode }}
          </span>
          <span 
            v-else-if="isFieldValid('postalCode')" 
            class="text-sm text-green-500 flex items-center gap-1"
          >
            <CheckCircle class="h-4 w-4" />
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
                    'border-red-500': complexTouched[index]?.name && errors[`complexes.${index}.name`],
                    'border-green-500': isComplexFieldValid(index, 'name')
                  }"
                  @input="markComplexTouched(index, 'name')"
                />
                <span 
                  v-if="complexTouched[index]?.name && errors[`complexes.${index}.name`]" 
                  class="text-sm text-red-500 flex items-center gap-1"
                >
                  <AlertCircle class="h-4 w-4" />
                  {{ errors[`complexes.${index}.name`] }}
                </span>
                <span 
                  v-else-if="isComplexFieldValid(index, 'name')" 
                  class="text-sm text-green-500 flex items-center gap-1"
                >
                  <CheckCircle class="h-4 w-4" />
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
                    'border-red-500': complexTouched[index]?.address && errors[`complexes.${index}.address`],
                    'border-green-500': isComplexFieldValid(index, 'address')
                  }"
                  @input="markComplexTouched(index, 'address')"
                />
                <span 
                  v-if="complexTouched[index]?.address && errors[`complexes.${index}.address`]" 
                  class="text-sm text-red-500 flex items-center gap-1"
                >
                  <AlertCircle class="h-4 w-4" />
                  {{ errors[`complexes.${index}.address`] }}
                </span>
                <span 
                  v-else-if="isComplexFieldValid(index, 'address')" 
                  class="text-sm text-green-500 flex items-center gap-1"
                >
                  <CheckCircle class="h-4 w-4" />
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
                    'border-red-500': complexTouched[index]?.unitCount && errors[`complexes.${index}.unitCount`],
                    'border-green-500': isComplexFieldValid(index, 'unitCount')
                  }"
                  @input="markComplexTouched(index, 'unitCount')"
                />
                <span 
                  v-if="complexTouched[index]?.unitCount && errors[`complexes.${index}.unitCount`]" 
                  class="text-sm text-red-500 flex items-center gap-1"
                >
                  <AlertCircle class="h-4 w-4" />
                  {{ errors[`complexes.${index}.unitCount`] }}
                </span>
                <span 
                  v-else-if="isComplexFieldValid(index, 'unitCount')" 
                  class="text-sm text-green-500 flex items-center gap-1"
                >
                  <CheckCircle class="h-4 w-4" />
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

<script setup lang="ts">
import { ref, watch, computed, reactive } from 'vue'
import Label from '../ui/label.vue'
import Input from '../ui/input.vue'
import Button from '../ui/button.vue'
import { AlertCircle, CheckCircle, PlusIcon, TrashIcon, MapPin } from 'lucide-vue-next'

const props = defineProps({
  registrationData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['dataChange'])

type ComplexFormState = {
  name: string
  address: string
  unitCount: string
}

type AddressFormState = {
  streetAddress: string
  suburb: string
  city: string
  province: string
  postalCode: string
  complexes: ComplexFormState[]
}

type AddressTouchedState = {
  streetAddress: boolean
  suburb: boolean
  city: boolean
  province: boolean
  postalCode: boolean
}

type ComplexFieldKey = keyof ComplexFormState
type ComplexTouchedState = Record<ComplexFieldKey, boolean>

const defaultAddressState = (): AddressFormState => ({
  streetAddress: '',
  suburb: '',
  city: '',
  province: '',
  postalCode: '',
  complexes: []
})

const formData = ref<AddressFormState>(defaultAddressState())
const isSyncingFromProps = ref(false)
const touched = reactive<AddressTouchedState>({
  streetAddress: false,
  suburb: false,
  city: false,
  province: false,
  postalCode: false
})
const complexTouched = ref<ComplexTouchedState[]>([])

const REQUIRED_MESSAGE = '* field must be filled'

const resetTouched = () => {
  ;(Object.keys(touched) as Array<keyof AddressTouchedState>).forEach((key) => {
    const value = formData.value[key]
    touched[key] = Boolean(value && value.toString().trim().length > 0)
  })
}

const defaultComplexTouchedState = (): ComplexTouchedState => ({
  name: false,
  address: false,
  unitCount: false
})

const resetComplexTouched = () => {
  complexTouched.value = formData.value.complexes.map((complex) => ({
    name: Boolean(complex.name && complex.name.toString().trim().length > 0),
    address: Boolean(complex.address && complex.address.toString().trim().length > 0),
    unitCount: Boolean(
      complex.unitCount !== '' &&
        !Number.isNaN(Number(complex.unitCount)) &&
        Number(complex.unitCount) > 0
    )
  }))
}

const markTouched = (field: keyof AddressTouchedState) => {
  touched[field] = true
}

const ensureComplexTouched = (index: number): ComplexTouchedState => {
  if (!complexTouched.value[index]) {
    complexTouched.value[index] = defaultComplexTouchedState()
  }
  return complexTouched.value[index]!
}

const markComplexTouched = (index: number, field: ComplexFieldKey) => {
  const state = ensureComplexTouched(index)
  state[field] = true
}

const isFieldValid = (field: keyof AddressTouchedState) => {
  const value = formData.value[field]
  return Boolean(
    touched[field] &&
      !errors.value[field] &&
      value &&
      value.toString().trim().length > 0
  )
}

const isComplexFieldValid = (index: number, field: ComplexFieldKey) => {
  const touchedState = complexTouched.value[index]
  const complex = formData.value.complexes[index]
  const key = `complexes.${index}.${field}`
  if (!touchedState || !complex) {
    return false
  }

  const rawValue = complex[field] ?? ''
  const stringValue = rawValue.toString()

  return Boolean(
    touchedState[field] &&
      !errors.value[key] &&
      stringValue.toString().trim().length > 0
  )
}

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
  resetTouched()
  resetComplexTouched()
  isSyncingFromProps.value = false
}, { immediate: true, deep: true })

// Format postal code to only allow numbers
const formatPostalCode = (event: Event) => {
  const target = event.target as HTMLInputElement | null
  const formatted = target?.value.replace(/\D/g, '').slice(0, 4) ?? ''
  formData.value.postalCode = formatted
  markTouched('postalCode')
}

const addComplex = () => {
  formData.value.complexes.push({
    name: '',
    address: '',
    unitCount: ''
  })
  complexTouched.value.push(defaultComplexTouchedState())
}

const removeComplex = (index: number) => {
  formData.value.complexes.splice(index, 1)
  complexTouched.value.splice(index, 1)
}

const errors = computed<Record<string, string>>(() => {
  const currentValue = formData.value
  const newErrors: Record<string, string> = {}

  const isFilled = (value: string | null | undefined) =>
    Boolean(value && value.toString().trim().length > 0)

  if (!isFilled(currentValue.streetAddress)) {
    newErrors.streetAddress = REQUIRED_MESSAGE
  }

  if (!isFilled(currentValue.suburb)) {
    newErrors.suburb = REQUIRED_MESSAGE
  }

  if (!isFilled(currentValue.city)) {
    newErrors.city = REQUIRED_MESSAGE
  }

  if (!isFilled(currentValue.province)) {
    newErrors.province = REQUIRED_MESSAGE
  }

  if (!isFilled(currentValue.postalCode)) {
    newErrors.postalCode = REQUIRED_MESSAGE
  }

  currentValue.complexes.forEach((complex, index) => {
    if (!isFilled(complex.name)) {
      newErrors[`complexes.${index}.name`] = REQUIRED_MESSAGE
    }
    if (!isFilled(complex.address)) {
      newErrors[`complexes.${index}.address`] = REQUIRED_MESSAGE
    }
    const units = Number(complex.unitCount)
    if (
      !isFilled(complex.unitCount) ||
      Number.isNaN(units) ||
      units <= 0
    ) {
      newErrors[`complexes.${index}.unitCount`] = REQUIRED_MESSAGE
    }
  })

  console.debug('[AddressDetails] validate', {
    values: currentValue,
    errors: newErrors,
    touched: { ...touched },
    complexTouched: complexTouched.value
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
  validate: () => Object.values(errors.value).every((message) => message === ''),
  getData: () => formData.value,
  submit: () => {
    ;(Object.keys(touched) as Array<keyof AddressTouchedState>).forEach((key) => {
      touched[key] = true
    })
    complexTouched.value = complexTouched.value.map(() => ({
      name: true,
      address: true,
      unitCount: true
    }))
    emit('dataChange', { ...formData.value })
    return Object.values(errors.value).every((message) => message === '')
  },
  errors,
  touched,
  complexTouched,
  isFieldValid,
  isComplexFieldValid
})
</script> 