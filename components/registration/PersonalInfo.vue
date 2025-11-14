<template>
  <div>
    <div class="space-y-6">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
          <User class="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Personal Information</h2>
          <p class="text-sm text-gray-600 mt-1">Please provide your personal details</p>
        </div>
      </div>

      <div class="bg-white/80 backdrop-blur-sm rounded-xl border-0 p-6 shadow-lg">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-3">
            <Label for="firstName" class="text-gray-700 font-medium">First Name</Label>
          <Input
            id="firstName"
            v-model="formData.firstName"
            type="text"
            placeholder="Enter your first name"
            maxlength="100"
            class="bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
            :class="{
              'border-red-500 focus:border-red-500 focus:ring-red-200': touched.firstName && errors.firstName,
              'border-green-500 focus:border-green-500 focus:ring-green-200': isFieldValid('firstName')
            }"
            @input="markTouched('firstName')"
          />
          <span v-if="touched.firstName && errors.firstName" class="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle class="h-4 w-4" />
            {{ errors.firstName }}
          </span>
          <span v-else-if="isFieldValid('firstName')" class="text-sm text-green-500 flex items-center gap-1">
            <CheckCircle class="h-4 w-4" />
          </span>
        </div>

        <div class="space-y-3">
          <Label for="lastName" class="text-gray-700 font-medium">Last Name</Label>
          <Input
            id="lastName"
            v-model="formData.lastName"
            type="text"
            placeholder="Enter your last name"
            maxlength="100"
            class="bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
            :class="{
              'border-red-500 focus:border-red-500 focus:ring-red-200': touched.lastName && errors.lastName,
              'border-green-500 focus:border-green-500 focus:ring-green-200': isFieldValid('lastName')
            }"
            @input="markTouched('lastName')"
          />
          <span v-if="touched.lastName && errors.lastName" class="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle class="h-4 w-4" />
            {{ errors.lastName }}
          </span>
          <span v-else-if="isFieldValid('lastName')" class="text-sm text-green-500 flex items-center gap-1">
            <CheckCircle class="h-4 w-4" />
          </span>
        </div>

        <div class="space-y-3">
          <Label for="email" class="text-gray-700 font-medium">Email Address</Label>
          <Input
            id="email"
            v-model="formData.email"
            type="email"
            placeholder="Enter your email"
            class="bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
            :class="{
              'border-red-500 focus:border-red-500 focus:ring-red-200': touched.email && errors.email,
              'border-green-500 focus:border-green-500 focus:ring-green-200': isFieldValid('email')
            }"
            @input="markTouched('email')"
          />
          <span v-if="touched.email && errors.email" class="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle class="h-4 w-4" />
            {{ errors.email }}
          </span>
          <span v-else-if="isFieldValid('email')" class="text-sm text-green-500 flex items-center gap-1">
            <CheckCircle class="h-4 w-4" />
          </span>
        </div>

        <div class="space-y-3">
          <Label for="phone" class="text-gray-700 font-medium">Phone Number</Label>
          <Input
            id="phone"
            v-model="formData.phone"
            type="tel"
            placeholder="Enter your phone number"
            class="bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
            :class="{
              'border-red-500 focus:border-red-500 focus:ring-red-200': touched.phone && errors.phone,
              'border-green-500 focus:border-green-500 focus:ring-green-200': isFieldValid('phone')
            }"
            @input="markTouched('phone')"
          />
          <span v-if="touched.phone && errors.phone" class="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle class="h-4 w-4" />
            {{ errors.phone }}
          </span>
          <span v-else-if="isFieldValid('phone')" class="text-sm text-green-500 flex items-center gap-1">
            <CheckCircle class="h-4 w-4" />
          </span>
        </div>

        <div class="space-y-3">
          <Label for="idNumber" class="text-gray-700 font-medium">ID Number</Label>
          <Input
            id="idNumber"
            v-model="formData.idNumber"
            type="text"
            placeholder="Enter your ID number"
            class="bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
            :class="{
              'border-red-500 focus:border-red-500 focus:ring-red-200': touched.idNumber && errors.idNumber,
              'border-green-500 focus:border-green-500 focus:ring-green-200': isFieldValid('idNumber')
            }"
            @input="markTouched('idNumber')"
          />
          <span v-if="touched.idNumber && errors.idNumber" class="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle class="h-4 w-4" />
            {{ errors.idNumber }}
          </span>
          <span v-else-if="isFieldValid('idNumber')" class="text-sm text-green-500 flex items-center gap-1">
            <CheckCircle class="h-4 w-4" />
          </span>
        </div>

        <div class="space-y-3">
          <Label for="dateOfBirth" class="text-gray-700 font-medium">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            v-model="formData.dateOfBirth"
            type="date"
            class="bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
            :class="{
              'border-red-500 focus:border-red-500 focus:ring-red-200': touched.dateOfBirth && errors.dateOfBirth,
              'border-green-500 focus:border-green-500 focus:ring-green-200': isFieldValid('dateOfBirth')
            }"
            @input="markTouched('dateOfBirth')"
          />
          <span v-if="touched.dateOfBirth && errors.dateOfBirth" class="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle class="h-4 w-4" />
            {{ errors.dateOfBirth }}
          </span>
          <span v-else-if="isFieldValid('dateOfBirth')" class="text-sm text-green-500 flex items-center gap-1">
            <CheckCircle class="h-4 w-4" />
          </span>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive, nextTick } from 'vue'
import Label from '../ui/label.vue'
import Input from '../ui/input.vue'
import { AlertCircle, CheckCircle, User } from 'lucide-vue-next'

const props = defineProps({
  registrationData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['dataChange'])

type PersonalFormState = {
  firstName: string
  lastName: string
  email: string
  phone: string
  idNumber: string
  dateOfBirth: string
}

type PersonalTouchedState = Record<keyof PersonalFormState, boolean>

const defaultPersonalState = (): PersonalFormState => ({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  idNumber: '',
  dateOfBirth: ''
})

const formData = ref<PersonalFormState>(defaultPersonalState())
const isSyncingFromProps = ref(false)
const errors = reactive<Record<keyof PersonalFormState, string>>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  idNumber: '',
  dateOfBirth: ''
})
const touched = reactive<PersonalTouchedState>({
  firstName: false,
  lastName: false,
  email: false,
  phone: false,
  idNumber: false,
  dateOfBirth: false
})

const REQUIRED_MESSAGE = '* field must be filled'

const resetTouched = () => {
  Object.keys(touched).forEach(key => {
    touched[key as keyof PersonalTouchedState] = false
  })
}

const markTouched = (field: keyof PersonalTouchedState) => {
  touched[field] = true
}

const isFieldValid = (field: keyof PersonalFormState) => {
  const val = formData.value[field]
  return touched[field] && !errors[field] && val && val.toString().trim().length > 0
}

const deepEqual = (a: any, b: any): boolean => {
  if (a === b) return true
  if (!a || !b) return false
  if (typeof a !== 'object' || typeof b !== 'object') return false
  
  const keysA = Object.keys(a)
  const keysB = Object.keys(b)
  if (keysA.length !== keysB.length) return false
  
  for (const key of keysA) {
    if (!keysB.includes(key)) return false
    if (a[key] !== b[key] && typeof a[key] === 'object' && typeof b[key] === 'object') {
      if (!deepEqual(a[key], b[key])) return false
    } else if (a[key] !== b[key]) {
      return false
    }
  }
  return true
}

const lastEmitted = ref('')

watch(() => props.registrationData?.personal, (newValue) => {
  if (!newValue) return

  const synced = {
    ...defaultPersonalState(),
    ...JSON.parse(JSON.stringify(newValue))
  }

  if (!deepEqual(formData.value, synced)) {
    isSyncingFromProps.value = true
    formData.value = synced
    resetTouched()
    nextTick(() => {
      isSyncingFromProps.value = false
      lastEmitted.value = JSON.stringify(formData.value)
    })
  }
}, { immediate: true, deep: true })

const validateRequired = (value: string | null | undefined) => {
  if (!value || !value.toString().trim()) {
    return REQUIRED_MESSAGE
  }
  return ''
}

watch(() => formData.value.firstName, (val) => {
  errors.firstName = validateRequired(val)
}, { immediate: true })

watch(() => formData.value.lastName, (val) => {
  errors.lastName = validateRequired(val)
}, { immediate: true })

watch(() => formData.value.email, (val) => {
  errors.email = validateRequired(val)
}, { immediate: true })

watch(() => formData.value.phone, (val) => {
  errors.phone = validateRequired(val)
}, { immediate: true })

watch(() => formData.value.idNumber, (val) => {
  errors.idNumber = validateRequired(val)
}, { immediate: true })

watch(() => formData.value.dateOfBirth, (val) => {
  errors.dateOfBirth = validateRequired(val)
}, { immediate: true })

watch(formData, (newValue) => {
  if (isSyncingFromProps.value) return

  const payload = JSON.parse(JSON.stringify(newValue))
  const payloadStr = JSON.stringify(payload)
  
  if (payloadStr !== lastEmitted.value) {
    lastEmitted.value = payloadStr
    emit('dataChange', payload)
  }
}, { deep: true, immediate: false })

defineExpose({
  validate: () => Object.values(errors).every(msg => msg === ''),
  getData: () => formData.value,
  submit: () => {
    Object.keys(touched).forEach(key => {
      touched[key as keyof PersonalTouchedState] = true
    })
    emit('dataChange', JSON.parse(JSON.stringify(formData.value)))
    return Object.values(errors).every(msg => msg === '')
  },
  errors,
  touched,
  isFieldValid
})
</script> 