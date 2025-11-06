<template>
  <input
    :value="modelValue"
    :class="cn(
      'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      classAttr
    )"
    v-bind="restAttrs"
    @input="onInput"
  />
</template>

<script setup lang="ts">
import { computed, useAttrs, withDefaults } from 'vue'
import type { ClassValue } from 'clsx'
import { cn } from '~/utils/cn'

const props = withDefaults(defineProps<{
  modelValue?: string | number
}>(), {
  modelValue: ''
})

const modelValue = computed(() => props.modelValue)

const emit = defineEmits(['update:modelValue'])

const attrs = useAttrs()

const classAttr = computed<ClassValue>(() => attrs.class as ClassValue)

const restAttrs = computed<Record<string, unknown>>(() => {
  const { class: _class, modelValue: _omit, ...rest } = attrs as Record<string, unknown>
  return rest
})

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target?.value ?? '')
}
</script>
