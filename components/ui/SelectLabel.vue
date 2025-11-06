<template>
  <div :class="cn('py-1.5 pl-8 pr-2 text-sm font-semibold', $attrs.class)">
    <slot />
  </div>
</template>

<script setup>
import { cn } from '~/utils/cn'
</script>
