<script setup>
const route = useRoute()
const router = useRouter()

// Redirect to lowercase version
if (route.path.startsWith('/Registration/')) {
  router.push(route.path.toLowerCase())
}
</script>

<template>
  <div>
    <!-- This page will redirect -->
  </div>
</template> 