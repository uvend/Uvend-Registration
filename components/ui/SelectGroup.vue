<template>
  <div :class="cn('p-1 w-full', $attrs.class)">
    <slot />
  </div>
</template>

<script setup>
import { cn } from '~/utils/cn'
</script>
