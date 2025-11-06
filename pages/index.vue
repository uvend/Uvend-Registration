<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-200 via-blue-100 to-orange-50 flex items-center justify-center">
    <div class="text-center px-4 bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-blue-200 max-w-md">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Welcome</h1>
      <p class="text-gray-600 mb-6">Get started with your registration process.</p>
      <NuxtLink 
        to="/Registration" 
        class="inline-block bg-gradient-to-r from-blue-600 to-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Start Registration
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
// Redirect to registration page
await navigateTo('/Registration')
</script>
