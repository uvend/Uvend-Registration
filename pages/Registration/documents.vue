<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl border-0 p-6 sm:p-8">
        <DocumentUpload
          @prev="handlePrev"
          @next="handleNext"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import DocumentUpload from '~/components/registration/DocumentUpload.vue'

const registrationStore = useRegistrationStore()
const router = useRouter()

onMounted(() => {
  // Check if user has completed previous steps
  if (!registrationStore.type || !registrationStore.personal) {
    router.push('/registration/personal')
  }
})

const handlePrev = () => {
  registrationStore.goBack()
  router.push('/registration/personal')
}

const handleNext = (data) => {
  registrationStore.setDocuments(data)
  router.push('/registration/banking')
}
</script> 