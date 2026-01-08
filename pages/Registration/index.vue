<template>
    <div v-if="isRegistrationEnabled" class="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed" style="background-image: url('/Background.jpg');">
        <div class="min-h-screen bg-black/20 backdrop-blur-[1px]">
        <div class="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-6 lg:py-8">
            <div class="flex items-center justify-center mb-6 md:mb-8">
                <div class="flex items-center gap-3 md:gap-4">
                    <div class="flex items-center gap-2 md:gap-3">
                        <h1 class="text-gray-900 font-bold text-xl md:text-2xl leading-tight tracking-wide" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                            U-Vend
                        </h1>
                        <div class="text-orange-500 font-semibold text-xs md:text-sm leading-tight tracking-wider">
                            <div>PREPAID</div>
                            <div>UTILITIES</div>
                            <div>MANAGEMENT</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl border-0 mb-12">
                <form id="registrationForm" @submit.prevent="handleStepComplete" novalidate>
                    <div class="p-6 lg:p-8 pt-4 lg:pt-6 overflow-y-auto max-h-[calc(100vh-220px)] md:max-h-[calc(100vh-260px)] scroll-area">
                        <div v-if="pairedComponent && currentComponent" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                                <KeepAlive>
                                    <component
                                        ref="currentComponentRef"
                                        :is="currentComponent"
                                        :key="effectiveSteps[currentStep - 1]?.id || currentStep"
                                        v-model:type="formData.type"
                                        :registration-data="formData"
                                        @data-change="handleDataChange"
                                    />
                                </KeepAlive>
                            </div>
                            <div class="hidden lg:block bg-white/70 rounded-xl border-0 shadow-sm p-4 lg:p-6 self-start">
                                <KeepAlive>
                                    <component
                                        :is="pairedComponent"
                                        :key="'pair-' + (effectiveSteps[currentStep - 1]?.id || currentStep)"
                                        :registration-data="formData"
                                        @data-change="handleDataChange"
                                        @next="handleStepComplete"
                                    />
                                </KeepAlive>
                            </div>
                        </div>
                        <div v-else-if="currentComponent">
                            <KeepAlive>
                                <component
                                    ref="currentComponentRef"
                                    :is="currentComponent"
                                    :key="effectiveSteps[currentStep - 1]?.id || currentStep"
                                    v-model:type="formData.type"
                                    :registration-data="formData"
                                    @data-change="handleDataChange"
                                    @next="handleStepComplete"
                                />
                            </KeepAlive>
                        </div>
                        <div v-else class="p-6 text-center text-gray-500">
                            Loading...
                        </div>
                    </div>
                    <div class="px-6 lg:px-8 pb-6 lg:pb-8 border-t border-gray-200 pt-6">
                        <NavigationButtons
                            :current-step="currentStep"
                            :total-steps="effectiveSteps.length"
                            :show-prev="currentStep > 1"
                            :is-last-step="currentStep === effectiveSteps.length"
                            :loading="loading"
                            @prev="prevStep"
                        />
                    </div>
                </form>
            </div>
        </div>
        </div>
    </div>
    <div v-else class="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed" style="background-image: url('/Background.jpg');">
        <div class="min-h-screen w-full bg-black/20 backdrop-blur-[1px] flex items-center justify-center">
        <div class="text-center px-4 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border-0 max-w-md">
            <div class="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Lock class="w-8 h-8 text-gray-400" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Registration Not Available</h2>
            <p class="text-gray-600 mb-6">Registration is currently not enabled in this environment.</p>
            <NuxtLink to="/" class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 font-medium">
                <ArrowLeft class="w-4 h-4" />
                Return to Home
            </NuxtLink>
        </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, markRaw, watch, onMounted, onBeforeUnmount } from 'vue'
import { Lock, ArrowLeft } from 'lucide-vue-next'
import RegistrationType from '~/components/registration/RegistrationType.vue'
import PersonalInfo from '~/components/registration/PersonalInfo.vue'
import DocumentUpload from '~/components/registration/DocumentUpload.vue'
import BankingDetails from '~/components/registration/BankingDetails.vue'
import AddressDetails from '~/components/registration/AddressDetails.vue'
import MeterDetails from '~/components/registration/MeterDetails.vue'
import Summary from '~/components/registration/Summary.vue'
import NavigationButtons from '~/components/registration/NavigationButtons.vue'
import { useRegistrationStore } from '~/stores/registration'

const config = useRuntimeConfig()
const isRegistrationEnabled = computed(() => config.public.APP_ENV === 'registration')

const registrationStore = useRegistrationStore()

// Define 5 steps total (with paired components for steps 2 and 3) for large screens
const steps5 = [
    { id: 'type', name: 'Type', component: markRaw(RegistrationType), pairedComponent: null },
    { id: 'personal-banking', name: 'Personal Info & Banking', component: markRaw(PersonalInfo), pairedComponent: markRaw(BankingDetails) },
    { id: 'address-meters', name: 'Address & Meters', component: markRaw(AddressDetails), pairedComponent: markRaw(MeterDetails) },
    { id: 'documents', name: 'Documents', component: markRaw(DocumentUpload), pairedComponent: null },
    { id: 'summary', name: 'Summary', component: markRaw(Summary), pairedComponent: null }
]

// Define 7 steps for small screens (each renders alone)
const steps7 = [
    { id: 'type', name: 'Type', component: markRaw(RegistrationType) },
    { id: 'personal', name: 'Personal Info', component: markRaw(PersonalInfo) },
    { id: 'banking', name: 'Banking', component: markRaw(BankingDetails) },
    { id: 'address', name: 'Address', component: markRaw(AddressDetails) },
    { id: 'meters', name: 'Meters', component: markRaw(MeterDetails) },
    { id: 'documents', name: 'Documents', component: markRaw(DocumentUpload) },
    { id: 'summary', name: 'Summary', component: markRaw(Summary) }
]

const currentStep = ref(registrationStore.currentStep || 1)
const loading = ref(false)
const currentComponentRef = ref(null)

// Track screen size to choose effective steps list
const isLargeScreen = ref(true)

onMounted(() => {
    const mq = window.matchMedia('(min-width: 1024px)') // lg breakpoint
    const update = () => { 
        isLargeScreen.value = mq.matches
        // Adjust current step if it's out of bounds after screen size change
        const effectiveStepsList = isLargeScreen.value ? steps5 : steps7
        if (currentStep.value > effectiveStepsList.length) {
            currentStep.value = effectiveStepsList.length
        }
    }
    update()
    mq.addEventListener('change', update)
    onBeforeUnmount(() => mq.removeEventListener('change', update))
})

// Use the store's formData getter
const formData = computed(() => registrationStore.formData)

// Effective steps depend on screen size
const effectiveSteps = computed(() => (isLargeScreen.value ? steps5 : steps7))

const currentComponent = computed(() => {
    const step = effectiveSteps.value[currentStep.value - 1]
    return step?.component || null
})

const pairedComponent = computed(() => {
    if (!isLargeScreen.value) return null
    const step = steps5[currentStep.value - 1]
    return step?.pairedComponent || null
})

const prevStep = () => {
    if (currentStep.value > 1) {
        currentStep.value--
        registrationStore.goBack()
    }
}

// Keep store step in sync so back to first item is reliable across renders
watch(currentStep, (value) => {
    try {
        registrationStore.currentStep = value
    } catch {}
})

const handleStepComplete = async () => {
    loading.value = true
    try {
        // Get the current component instance using template ref
        const componentRef = currentComponentRef.value
        
        // If on the last step (Summary), validate terms acceptance
        if (currentStep.value === effectiveSteps.value.length) {
            if (componentRef && typeof componentRef.validateTerms === 'function') {
                const isValid = componentRef.validateTerms()
                if (!isValid) {
                    loading.value = false
                    return
                }
            }
        }
        
        // Try to call submit method on the component
        if (componentRef && typeof componentRef.submit === 'function') {
            // Call submit for any side effects, but do not block progression
            try {
                componentRef.submit()
            } catch (e) {
                // Ignore validation failures to allow progression
            }
        }
        
        if (currentStep.value === effectiveSteps.value.length) {
            await handleSubmit()
        } else {
            // Move to next step
            currentStep.value++
        }
    } catch (error) {
        // Do not block navigation on errors; optionally log for debugging
        console.error('Step progression error (ignored):', error)
    } finally {
        loading.value = false
    }
}

const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
}

const buildDocumentsPayload = async () => {
    const documentsPayload = {}

    const addDoc = async (key, file) => {
        if (!file) return
        try {
            const base64 = await fileToBase64(file)
            documentsPayload[key] = {
                name: file.name,
                type: file.type,
                size: file.size,
                base64
            }
        } catch (err) {
            console.error(`Failed to read ${key} as base64:`, err)
            // Fallback to metadata only if reading fails
            documentsPayload[key] = {
                name: file.name,
                type: file.type,
                size: file.size
            }
        }
    }

    if (formData.value.documents) {
        await addDoc('idDocument', formData.value.documents.idDocument)
        await addDoc('proofOfAddress', formData.value.documents.proofOfAddress)
        await addDoc('bankStatement', formData.value.documents.bankStatement || null)

        if (Array.isArray(formData.value.documents.additionalDocuments)) {
            documentsPayload.additionalDocuments = []
            for (const file of formData.value.documents.additionalDocuments) {
                if (!file) continue
                try {
                    const base64 = await fileToBase64(file)
                    documentsPayload.additionalDocuments.push({
                        name: file.name,
                        type: file.type,
                        size: file.size,
                        base64
                    })
                } catch (err) {
                    console.error('Failed to read additional document as base64:', err)
                    documentsPayload.additionalDocuments.push({
                        name: file.name,
                        type: file.type,
                        size: file.size
                    })
                }
            }
        }
    }

    return documentsPayload
}

const handleSubmit = async () => {
    try {
        // Extract document metadata plus base64 content so originals can be emailed as attachments
        const documentsPayload = await buildDocumentsPayload()

        const payload = {
            type: formData.value.type,
            personal: formData.value.personal,
            banking: formData.value.banking,
            address: formData.value.address,
            meters: formData.value.meters,
            documents: documentsPayload
        }

        const res = await $fetch('/api/registration', {
            method: 'POST',
            body: payload
        })

        console.log('Registration saved:', res)

        // Use nuxtApp to access toast
        const nuxtApp = useNuxtApp()
        if (nuxtApp.$toast) {
          nuxtApp.$toast({
            title: 'Success',
            description: 'Your registration has been submitted successfully! A confirmation email has been sent to your email address, and our team will reach out to you shortly.',
            variant: 'success'
          })
        } else {
          // Fallback to alert if toast is not available
          alert('Registration submitted successfully! A confirmation email has been sent to your email address.')
        }

        await navigateTo('/')
    } catch (error) {
        console.error('Error submitting registration:', error)
        throw new Error('There was an error submitting your registration. Please try again.')
    }
}

const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value)
const toPlain = (value) => JSON.stringify(value ?? null)
const hasChanged = (current, next) => toPlain(current) !== toPlain(next)

const personalKeys = ['firstName', 'lastName', 'email', 'phone', 'idNumber', 'dateOfBirth']
const bankingKeys = ['accountHolder', 'bankName', 'accountNumber', 'accountType', 'branchCode']
const addressKeys = ['streetAddress', 'suburb', 'city', 'province', 'postalCode', 'complexes']

const handleDataChange = (data) => {
    const currentStepIndex = currentStep.value - 1
    if (currentStepIndex < 0 || currentStepIndex >= effectiveSteps.value.length) {
        console.warn('Invalid step index:', currentStepIndex, 'Steps length:', effectiveSteps.value.length)
        return
    }
    const stepId = effectiveSteps.value[currentStepIndex]?.id
    if (!stepId) return
    
    switch (stepId) {
        case 'type':
            if (isObject(data) && typeof data.type === 'string' && registrationStore.formData.type !== data.type) {
                registrationStore.setType(data.type)
            } else if (typeof data === 'string' && registrationStore.formData.type !== data) {
                registrationStore.setType(data)
            }
            break
        case 'personal':
        case 'personal-banking':
            // Handle personal info (mobile: 'personal', desktop: 'personal-banking')
            if (isObject(data) && personalKeys.some(key => key in data)) {
                if (hasChanged(registrationStore.formData.personal, data)) {
                    registrationStore.setPersonal(data)
                }
            }
            // For desktop 'personal-banking', also handle banking data
            if (stepId === 'personal-banking' && isObject(data) && bankingKeys.some(key => key in data)) {
                if (hasChanged(registrationStore.formData.banking, data)) {
                    registrationStore.setBanking(data)
                }
            }
            break
        case 'banking':
            // Handle banking details (mobile only)
            if (isObject(data) && bankingKeys.some(key => key in data)) {
                if (hasChanged(registrationStore.formData.banking, data)) {
                    registrationStore.setBanking(data)
                }
            }
            break
        case 'address':
        case 'address-meters':
            // Handle address (mobile: 'address', desktop: 'address-meters')
            if (isObject(data) && addressKeys.some(key => key in data)) {
                if (hasChanged(registrationStore.formData.address, data)) {
                    registrationStore.setAddress(data)
                }
            }
            // For desktop 'address-meters', also handle meters data
            if (stepId === 'address-meters' && Array.isArray(data)) {
                if (hasChanged(registrationStore.formData.meters, data)) {
                    registrationStore.setMeters(data)
                }
            }
            break
        case 'meters':
            // Handle meters (mobile only)
            if (Array.isArray(data)) {
                if (hasChanged(registrationStore.formData.meters, data)) {
                    registrationStore.setMeters(data)
                }
            }
            break
        case 'documents':
            if (isObject(data) && isObject(data.documents)) {
                if (hasChanged(registrationStore.formData.documents, data.documents)) {
                    registrationStore.setDocuments(data.documents)
                }
            } else if (isObject(data)) {
                if (hasChanged(registrationStore.formData.documents, data)) {
                    registrationStore.setDocuments(data)
                }
            }
            break
    }
}

const handlePrev = () => {
    if (currentStep.value > 1) {
        currentStep.value--
        registrationStore.goBack()
    }
}
</script>

<style scoped>
.scroll-area {
    scrollbar-width: thin;
    scrollbar-color: #93c5fd #f3f4f6;
}

.scroll-area::-webkit-scrollbar {
    width: 8px;
}

.scroll-area::-webkit-scrollbar-track {
    background: #f3f4f6;
    border-radius: 8px;
}

.scroll-area::-webkit-scrollbar-thumb {
    background: #93c5fd;
    border-radius: 8px;
}

.scroll-area::-webkit-scrollbar-thumb:hover {
    background: #60a5fa;
}
</style>
