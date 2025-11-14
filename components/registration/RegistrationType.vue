<template>
  <div>
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
        <FileText class="w-5 h-5 text-blue-600" />
      </div>
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Registration Type</h2>
        <p class="text-sm text-gray-600 mt-1">Please select your registration type</p>
      </div>
    </div>

    <div class="space-y-4">
      <div
        v-for="option in registrationTypes"
        :key="option.value"
        class="relative flex cursor-pointer rounded-xl bg-white/80 backdrop-blur-sm border-0 p-6 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none group"
        :class="{
          'ring-2 ring-blue-500': selectedType === option.value
        }"
        @click="selectType(option.value)"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
        <div class="flex w-full items-center justify-between relative z-10">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <CheckCircle2 class="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p class="font-semibold text-gray-900">{{ option.title }}</p>
              <p class="text-sm text-gray-600 mt-1">{{ option.description }}</p>
            </div>
          </div>
          <div v-if="selectedType === option.value" class="flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full">
            <CheckIcon class="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { CheckIcon, FileText, CheckCircle2 } from 'lucide-vue-next'

const props = defineProps({
  registrationData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['dataChange', 'next'])

const registrationTypes = [
  {
    title: 'New Registration',
    value: 'new',
    description: 'Register as a new user or business'
  },
  {
    title: 'Update Details',
    value: 'update',
    description: 'Update your existing registration information'
  },
  {
    title: 'Existing Registration',
    value: 'existing',
    description: 'Access or view your existing registration'
  }
]

const selectedType = ref('')

watch(() => props.registrationData?.type, (newValue) => {
  if (newValue) {
    selectedType.value = newValue
  }
}, { immediate: true })

const selectType = (type) => {
  selectedType.value = type
  emit('dataChange', { type: selectedType.value })
  
  setTimeout(() => {
    emit('next')
  }, 300)
}

// Expose component data
defineExpose({
  validate: () => true,
  getData: () => ({
    type: selectedType.value
  }),
  submit: () => {
    emit('dataChange', { type: selectedType.value })
    return true
  }
})
</script> 