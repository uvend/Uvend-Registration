<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl border-0 p-6 sm:p-8">
        <Summary
          :registration-data="registrationStore.formData"
          @prev="handlePrev"
          @submit="handleSubmit"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Summary from '~/components/registration/Summary.vue'

const registrationStore = useRegistrationStore()
const router = useRouter()

onMounted(() => {
  // Check if all steps are completed
  if (!registrationStore.isComplete) {
    router.push('/registration/meters')
  }
})

const handlePrev = () => {
  registrationStore.goBack()
  router.push('/registration/meters')
}

const handleSubmit = async (data) => {
  try {
    // Here you would typically send the data to your backend
    await new Promise(resolve => setTimeout(resolve, 2000)) // Simulated API call

    // Show success message
    useToast({
      title: 'Success',
      description: 'Your registration has been submitted successfully. We will send you a confirmation email shortly.',
      variant: 'success'
    })

    // Reset registration store
    registrationStore.reset()

    // Redirect to home page or dashboard
    await router.push('/')
  } catch (error) {
    console.error('Error submitting registration:', error)
    useToast({
      title: 'Error',
      description: 'There was an error submitting your registration. Please try again.',
      variant: 'destructive'
    })
  }
}
</script> 