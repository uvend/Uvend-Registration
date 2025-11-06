
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'RegistrationAddressDetails': typeof import("../components/registration/AddressDetails.vue")['default']
    'RegistrationBankingDetails': typeof import("../components/registration/BankingDetails.vue")['default']
    'RegistrationDocumentUpload': typeof import("../components/registration/DocumentUpload.vue")['default']
    'RegistrationMeterDetails': typeof import("../components/registration/MeterDetails.vue")['default']
    'RegistrationNavigationButtons': typeof import("../components/registration/NavigationButtons.vue")['default']
    'RegistrationPersonalInfo': typeof import("../components/registration/PersonalInfo.vue")['default']
    'RegistrationType': typeof import("../components/registration/RegistrationType.vue")['default']
    'RegistrationSummary': typeof import("../components/registration/Summary.vue")['default']
    'UiSelectContent': typeof import("../components/ui/SelectContent.vue")['default']
    'UiSelectGroup': typeof import("../components/ui/SelectGroup.vue")['default']
    'UiSelectItem': typeof import("../components/ui/SelectItem.vue")['default']
    'UiSelectLabel': typeof import("../components/ui/SelectLabel.vue")['default']
    'UiSelectTrigger': typeof import("../components/ui/SelectTrigger.vue")['default']
    'UiSelectValue': typeof import("../components/ui/SelectValue.vue")['default']
    'UiButton': typeof import("../components/ui/button.vue")['default']
    'UiCheckbox': typeof import("../components/ui/checkbox.vue")['default']
    'UiInput': typeof import("../components/ui/input.vue")['default']
    'UiLabel': typeof import("../components/ui/label.vue")['default']
    'UiSelect': typeof import("../components/ui/select.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
    'ClientOnly': typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtTime': typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
    'NuxtPicture': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
    'NuxtPage': typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
      'LazyRegistrationAddressDetails': LazyComponent<typeof import("../components/registration/AddressDetails.vue")['default']>
    'LazyRegistrationBankingDetails': LazyComponent<typeof import("../components/registration/BankingDetails.vue")['default']>
    'LazyRegistrationDocumentUpload': LazyComponent<typeof import("../components/registration/DocumentUpload.vue")['default']>
    'LazyRegistrationMeterDetails': LazyComponent<typeof import("../components/registration/MeterDetails.vue")['default']>
    'LazyRegistrationNavigationButtons': LazyComponent<typeof import("../components/registration/NavigationButtons.vue")['default']>
    'LazyRegistrationPersonalInfo': LazyComponent<typeof import("../components/registration/PersonalInfo.vue")['default']>
    'LazyRegistrationType': LazyComponent<typeof import("../components/registration/RegistrationType.vue")['default']>
    'LazyRegistrationSummary': LazyComponent<typeof import("../components/registration/Summary.vue")['default']>
    'LazyUiSelectContent': LazyComponent<typeof import("../components/ui/SelectContent.vue")['default']>
    'LazyUiSelectGroup': LazyComponent<typeof import("../components/ui/SelectGroup.vue")['default']>
    'LazyUiSelectItem': LazyComponent<typeof import("../components/ui/SelectItem.vue")['default']>
    'LazyUiSelectLabel': LazyComponent<typeof import("../components/ui/SelectLabel.vue")['default']>
    'LazyUiSelectTrigger': LazyComponent<typeof import("../components/ui/SelectTrigger.vue")['default']>
    'LazyUiSelectValue': LazyComponent<typeof import("../components/ui/SelectValue.vue")['default']>
    'LazyUiButton': LazyComponent<typeof import("../components/ui/button.vue")['default']>
    'LazyUiCheckbox': LazyComponent<typeof import("../components/ui/checkbox.vue")['default']>
    'LazyUiInput': LazyComponent<typeof import("../components/ui/input.vue")['default']>
    'LazyUiLabel': LazyComponent<typeof import("../components/ui/label.vue")['default']>
    'LazyUiSelect': LazyComponent<typeof import("../components/ui/select.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtTime': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const RegistrationAddressDetails: typeof import("../components/registration/AddressDetails.vue")['default']
export const RegistrationBankingDetails: typeof import("../components/registration/BankingDetails.vue")['default']
export const RegistrationDocumentUpload: typeof import("../components/registration/DocumentUpload.vue")['default']
export const RegistrationMeterDetails: typeof import("../components/registration/MeterDetails.vue")['default']
export const RegistrationNavigationButtons: typeof import("../components/registration/NavigationButtons.vue")['default']
export const RegistrationPersonalInfo: typeof import("../components/registration/PersonalInfo.vue")['default']
export const RegistrationType: typeof import("../components/registration/RegistrationType.vue")['default']
export const RegistrationSummary: typeof import("../components/registration/Summary.vue")['default']
export const UiSelectContent: typeof import("../components/ui/SelectContent.vue")['default']
export const UiSelectGroup: typeof import("../components/ui/SelectGroup.vue")['default']
export const UiSelectItem: typeof import("../components/ui/SelectItem.vue")['default']
export const UiSelectLabel: typeof import("../components/ui/SelectLabel.vue")['default']
export const UiSelectTrigger: typeof import("../components/ui/SelectTrigger.vue")['default']
export const UiSelectValue: typeof import("../components/ui/SelectValue.vue")['default']
export const UiButton: typeof import("../components/ui/button.vue")['default']
export const UiCheckbox: typeof import("../components/ui/checkbox.vue")['default']
export const UiInput: typeof import("../components/ui/input.vue")['default']
export const UiLabel: typeof import("../components/ui/label.vue")['default']
export const UiSelect: typeof import("../components/ui/select.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const LazyRegistrationAddressDetails: LazyComponent<typeof import("../components/registration/AddressDetails.vue")['default']>
export const LazyRegistrationBankingDetails: LazyComponent<typeof import("../components/registration/BankingDetails.vue")['default']>
export const LazyRegistrationDocumentUpload: LazyComponent<typeof import("../components/registration/DocumentUpload.vue")['default']>
export const LazyRegistrationMeterDetails: LazyComponent<typeof import("../components/registration/MeterDetails.vue")['default']>
export const LazyRegistrationNavigationButtons: LazyComponent<typeof import("../components/registration/NavigationButtons.vue")['default']>
export const LazyRegistrationPersonalInfo: LazyComponent<typeof import("../components/registration/PersonalInfo.vue")['default']>
export const LazyRegistrationType: LazyComponent<typeof import("../components/registration/RegistrationType.vue")['default']>
export const LazyRegistrationSummary: LazyComponent<typeof import("../components/registration/Summary.vue")['default']>
export const LazyUiSelectContent: LazyComponent<typeof import("../components/ui/SelectContent.vue")['default']>
export const LazyUiSelectGroup: LazyComponent<typeof import("../components/ui/SelectGroup.vue")['default']>
export const LazyUiSelectItem: LazyComponent<typeof import("../components/ui/SelectItem.vue")['default']>
export const LazyUiSelectLabel: LazyComponent<typeof import("../components/ui/SelectLabel.vue")['default']>
export const LazyUiSelectTrigger: LazyComponent<typeof import("../components/ui/SelectTrigger.vue")['default']>
export const LazyUiSelectValue: LazyComponent<typeof import("../components/ui/SelectValue.vue")['default']>
export const LazyUiButton: LazyComponent<typeof import("../components/ui/button.vue")['default']>
export const LazyUiCheckbox: LazyComponent<typeof import("../components/ui/checkbox.vue")['default']>
export const LazyUiInput: LazyComponent<typeof import("../components/ui/input.vue")['default']>
export const LazyUiLabel: LazyComponent<typeof import("../components/ui/label.vue")['default']>
export const LazyUiSelect: LazyComponent<typeof import("../components/ui/select.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>

export const componentNames: string[]
