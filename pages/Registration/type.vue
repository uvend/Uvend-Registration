<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl border-0 p-6 sm:p-8">
        <RegistrationType
          v-model:type="registrationType"
          @next="handleNext"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RegistrationType from '~/components/registration/RegistrationType.vue'

const registrationType = ref('')

const handleNext = (type) => {
  // Store the registration type in the store or local storage
  const registrationStore = useRegistrationStore()
  registrationStore.setType(type)
  
  // Navigate to the next step
  navigateTo('/registration/personal')
}
</script> 