import { useToast } from '@/components/ui/toast/use-toast'
export default defineNuxtPlugin((nuxtApp) => {
    // Use the useToast composable to get the toast function
    const { toast } = useToast();
  
    // Make `toast` globally available via `nuxtApp.provide`
    nuxtApp.provide('toast', toast);
  });