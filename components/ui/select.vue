<template>
  <div class="relative">
    <select
      :id="id"
      :class="cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        $attrs.class
      )"
      v-bind="$attrs"
      @change="onChange"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { cn } from '~/utils/cn'

const props = defineProps({
  id: {
    type: String,
    default: () => `select-${Math.random().toString(36).substr(2, 9)}`
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Select an option...'
  },
  options: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

function onChange(event) {
  emit('update:modelValue', event.target && event.target.value)
}
</script>
