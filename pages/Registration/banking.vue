<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl border-0 p-6 sm:p-8">
        <BankingDetails
          @prev="handlePrev"
          @next="handleNext"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import BankingDetails from '~/components/registration/BankingDetails.vue'

const registrationStore = useRegistrationStore()
const router = useRouter()

onMounted(() => {
  // Check if user has completed previous steps
  if (!registrationStore.type || !registrationStore.personal || !registrationStore.documents) {
    router.push('/registration/documents')
  }
})

const handlePrev = () => {
  registrationStore.goBack()
  router.push('/registration/documents')
}

const handleNext = (data) => {
  registrationStore.setBanking(data)
  router.push('/registration/address')
}
</script> 