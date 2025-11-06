<template>
  <div class="w-full">
    <div class="flex justify-between items-center w-full gap-2 md:gap-4">
      <Button
        v-if="showPrev"
        type="button"
        variant="outline"
        class="flex-1 md:flex-none min-w-0 md:min-w-[140px] h-10 md:h-11 px-3 md:px-5 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 rounded-xl font-medium text-sm md:text-base shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-1.5 md:gap-2"
        @click="$emit('prev')"
      >
        <ChevronLeft class="h-3.5 w-3.5 md:h-4 md:w-4 flex-shrink-0" />
        <span class="hidden sm:inline">Previous</span>
        <span class="sm:hidden">Prev</span>
      </Button>
      <div v-else class="flex-1 md:flex-none min-w-0 md:min-w-[140px]" /> <!-- Spacer for alignment -->

      <div class="flex-1 px-2 md:px-4 flex justify-center min-w-0">
        <span class="text-xs md:text-sm text-gray-600 font-medium whitespace-nowrap">
          {{ currentStep }}/{{ totalSteps }}
        </span>
      </div>

      <Button
        type="submit"
        class="flex-1 md:flex-none min-w-0 md:min-w-[140px] h-10 md:h-11 px-3 md:px-5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl font-semibold text-sm md:text-base shadow-md hover:shadow-lg active:shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
        :disabled="loading"
      >
        <span v-if="loading" class="inline-flex items-center justify-center gap-1.5 md:gap-2 w-full">
          <Loader2 class="h-3.5 w-3.5 md:h-4 md:w-4 animate-spin flex-shrink-0" />
          <span class="hidden sm:inline">Loading</span>
          <span class="sm:hidden">...</span>
        </span>
        <span v-else class="inline-flex items-center justify-center gap-1.5 md:gap-2 w-full">
          <span>{{ isLastStep ? 'Submit' : 'Next' }}</span>
          <ChevronRight v-if="!isLastStep" class="h-3.5 w-3.5 md:h-4 md:w-4 flex-shrink-0" />
        </span>
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-vue-next'
import Button from '~/components/ui/button.vue'

defineProps({
  currentStep: {
    type: Number,
    required: true
  },
  totalSteps: {
    type: Number,
    required: true
  },
  showPrev: {
    type: Boolean,
    default: true
  },
  isLastStep: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['prev'])
</script> 