import { defineNuxtRouteMiddleware, navigateTo } from '#app'

export default defineNuxtRouteMiddleware((to) => {
  const config = useRuntimeConfig()
  
  // Check if the route starts with /registration
  if (to.path.startsWith('/registration')) {
    // Allow access only if APP_ENV is 'registration'
    if (config.public.APP_ENV !== 'registration') {
      // Redirect to home page or show error page
      return navigateTo('/')
    }
  }
}) 