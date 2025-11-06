<template>
  <div class="flex items-center space-x-2">
    <input
      :id="id"
      type="checkbox"
      :checked="modelValue"
      :class="cn(
        'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        $attrs.class
      )"
      v-bind="$attrs"
      @change="onChange"
    />
    <label
      v-if="label"
      :for="id"
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {{ label }}
    </label>
  </div>
</template>

<script setup>
import { cn } from '~/utils/cn'

const props = defineProps({
  id: {
    type: String,
    default: () => `checkbox-${Math.random().toString(36).substr(2, 9)}`
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

function onChange(event) {
  emit('update:modelValue', event.target && event.target.checked)
}
</script>
