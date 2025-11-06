<template>
  <div>
    <div class="space-y-6">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
          <Icon name="lucide:user" class="w-5 h-5 text-blue-600" />
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
              class="bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
              :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-200': errors.firstName }"
              @input="emitDataChange"
            />
          <span v-if="errors.firstName" class="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle class="h-4 w-4" />
            {{ errors.firstName }}
          </span>
        </div>

        <div class="space-y-3">
          <Label for="lastName" class="text-gray-700 font-medium">Last Name</Label>
          <Input
            id="lastName"
            v-model="formData.lastName"
            type="text"
            placeholder="Enter your last name"
            class="bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
            :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-200': errors.lastName }"
            @input="emitDataChange"
          />
          <span v-if="errors.lastName" class="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle class="h-4 w-4" />
            {{ errors.lastName }}
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
            :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-200': errors.email }"
            @input="emitDataChange"
          />
          <span v-if="errors.email" class="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle class="h-4 w-4" />
            {{ errors.email }}
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
            :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-200': errors.phone }"
            @input="emitDataChange"
          />
          <span v-if="errors.phone" class="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle class="h-4 w-4" />
            {{ errors.phone }}
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
            :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-200': errors.idNumber }"
            @input="emitDataChange"
          />
          <span v-if="errors.idNumber" class="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle class="h-4 w-4" />
            {{ errors.idNumber }}
          </span>
        </div>

        <div class="space-y-3">
          <Label for="dateOfBirth" class="text-gray-700 font-medium">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            v-model="formData.dateOfBirth"
            type="date"
            class="bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
            :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-200': errors.dateOfBirth }"
            @input="emitDataChange"
          />
          <span v-if="errors.dateOfBirth" class="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle class="h-4 w-4" />
            {{ errors.dateOfBirth }}
          </span>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Label from '~/components/ui/label.vue'
import Input from '~/components/ui/input.vue'
import { AlertCircle } from 'lucide-vue-next'

const props = defineProps({
  registrationData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['dataChange'])

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  idNumber: '',
  dateOfBirth: ''
})

const errors = ref({})

// Initialize form data from props if available
watch(() => props.registrationData?.personal, (newValue) => {
  if (newValue) {
    formData.value = { ...newValue }
  }
}, { immediate: true })

// Validate form data before submitting
watch(formData, (newValue) => {
  const newErrors = {}
  
  if (!newValue.firstName) {
    newErrors.firstName = 'First name is required'
  }
  if (!newValue.lastName) {
    newErrors.lastName = 'Last name is required'
  }
  if (!newValue.email) {
    newErrors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newValue.email)) {
    newErrors.email = 'Please enter a valid email address'
  }
  if (!newValue.phone) {
    newErrors.phone = 'Phone number is required'
  }
  if (!newValue.idNumber) {
    newErrors.idNumber = 'ID number is required'
  }
  if (!newValue.dateOfBirth) {
    newErrors.dateOfBirth = 'Date of birth is required'
  }

  errors.value = newErrors
}, { deep: true })

const emitDataChange = () => {
  emit('dataChange', { ...formData.value })
}

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