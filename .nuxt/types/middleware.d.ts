import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "registration-access"
declare module 'nuxt/app' {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}