<template>
  <span :class="cn('block truncate', $attrs.class)">
    <slot>{{ placeholder }}</slot>
  </span>
</template>

<script setup>
import { cn } from '~/utils/cn'

defineProps({
  placeholder: {
    type: String,
    default: 'Select an option...'
  }
})
</script>
