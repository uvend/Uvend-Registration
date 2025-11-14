<template>
  <div>
    <div class="space-y-6">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
          <CreditCard class="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Banking Details</h2>
          <p class="text-sm text-gray-600 mt-1">Please provide your banking information for payments</p>
        </div>
      </div>

      <div class="bg-white/80 backdrop-blur-sm rounded-xl border-0 p-6 shadow-lg">
        <div class="space-y-6">
          <div class="space-y-3">
            <Label for="accountHolder" class="flex items-center justify-between text-gray-700 font-medium">
            <span>Account Holder Name</span>
            <span v-if="formData.accountHolder" class="text-xs text-gray-500">
              {{ formData.accountHolder.length }}/100 characters
            </span>
          </Label>
          <Input
            id="accountHolder"
            v-model="formData.accountHolder"
            type="text"
            placeholder="Enter account holder name"
            maxlength="100"
            class="bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
            :class="{ 
              'border-red-500 focus:ring-red-500': touched.accountHolder && errors.accountHolder,
              'border-green-500 focus:ring-green-500': isFieldValid('accountHolder')
            }"
            aria-describedby="accountHolder-error"
            @input="markTouched('accountHolder')"
          />
          <p id="accountHolder-hint" class="text-xs text-gray-500">Enter the name exactly as it appears on your bank account</p>
          <span 
            v-if="touched.accountHolder && errors.accountHolder" 
            id="accountHolder-error" 
            class="text-sm text-red-500 flex items-center gap-1"
          >
            <AlertCircle class="h-4 w-4" />
            {{ errors.accountHolder }}
          </span>
          <span 
            v-else-if="isFieldValid('accountHolder')" 
            class="text-sm text-green-500 flex items-center gap-1"
          >
            <CheckCircle class="h-4 w-4" />
          </span>
        </div>

        <div class="space-y-3">
          <Label for="bankName" class="text-gray-700 font-medium">Bank Name</Label>
          <Input
            id="bankName"
            v-model="formData.bankName"
            type="text"
            placeholder="Enter bank name"
            maxlength="100"
            class="bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
            :class="{ 
              'border-red-500 focus:ring-red-500': touched.bankName && errors.bankName,
              'border-green-500 focus:ring-green-500': isFieldValid('bankName')
            }"
            @input="markTouched('bankName')"
          />
          <span 
            v-if="touched.bankName && errors.bankName" 
            id="bankName-error" 
            class="text-sm text-red-500 flex items-center gap-1"
          >
            <AlertCircle class="h-4 w-4" />
            {{ errors.bankName }}
          </span>
          <span 
            v-else-if="isFieldValid('bankName')" 
            class="text-sm text-green-500 flex items-center gap-1"
          >
            <CheckCircle class="h-4 w-4" />
          </span>
        </div>

        <div class="space-y-3">
          <Label for="accountNumber" class="flex items-center justify-between text-gray-700 font-medium">
            <span>Account Number</span>
            <span v-if="formData.accountNumber" class="text-xs text-gray-500">
              {{ formData.accountNumber.length }}/16 digits
            </span>
          </Label>
          <Input
            id="accountNumber"
            v-model="formData.accountNumber"
            type="text"
            maxlength="16"
            placeholder="Enter account number"
            class="bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
            :class="{ 
              'border-red-500 focus:ring-red-500': touched.accountNumber && errors.accountNumber,
              'border-green-500 focus:ring-green-500': isFieldValid('accountNumber')
            }"
            @input="formatAccountNumber"
          />
          <span 
            v-if="touched.accountNumber && errors.accountNumber" 
            id="accountNumber-error" 
            class="text-sm text-red-500 flex items-center gap-1"
          >
            <AlertCircle class="h-4 w-4" />
            {{ errors.accountNumber }}
          </span>
          <span 
            v-else-if="isFieldValid('accountNumber')" 
            class="text-sm text-green-500 flex items-center gap-1"
          >
            <CheckCircle class="h-4 w-4" />
          </span>
        </div>

        <div class="space-y-3">
          <Label for="accountType" class="text-gray-700 font-medium">Account Type</Label>
          <Select
            id="accountType"
            v-model="formData.accountType"
            :options="accountTypeOptions"
            placeholder="Select account type"
            :class="cn(
              'bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200',
              { 
                'border-red-500 focus:ring-red-500': touched.accountType && errors.accountType,
                'border-green-500 focus:ring-green-500': isFieldValid('accountType')
              }
            )"
            aria-describedby="accountType-error"
            @update:model-value="() => markTouched('accountType')"
          />
          <span 
            v-if="touched.accountType && errors.accountType" 
            id="accountType-error" 
            class="text-sm text-red-500 flex items-center gap-1"
          >
            <AlertCircle class="h-4 w-4" />
            {{ errors.accountType }}
          </span>
          <span 
            v-else-if="isFieldValid('accountType')" 
            id="accountType-success"
            class="text-sm text-green-500 flex items-center gap-1"
          >
            <CheckCircle class="h-4 w-4" />
          </span>
        </div>

        <div class="space-y-3">
          <Label for="branchCode" class="flex items-center justify-between text-gray-700 font-medium">
            <span>Branch Code</span>
            <span v-if="formData.branchCode" class="text-xs text-gray-500">
              {{ formData.branchCode.length }}/6 digits
            </span>
          </Label>
          <Input
            id="branchCode"
            v-model="formData.branchCode"
            type="text"
            maxlength="6"
            placeholder="Enter 6-digit branch code"
            class="bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
            :class="{ 
              'border-red-500 focus:ring-red-500': touched.branchCode && errors.branchCode,
              'border-green-500 focus:ring-green-500': isFieldValid('branchCode')
            }"
            aria-describedby="branchCode-error branchCode-hint"
            @input="formatBranchCode"
          />
          <p id="branchCode-hint" class="text-xs text-gray-500">Enter your bank's 6-digit branch/sorting code</p>
          <span 
            v-if="touched.branchCode && errors.branchCode" 
            id="branchCode-error" 
            class="text-sm text-red-500 flex items-center gap-1"
          >
            <AlertCircle class="h-4 w-4" />
            {{ errors.branchCode }}
          </span>
          <span 
            v-else-if="isFieldValid('branchCode')" 
            class="text-sm text-green-500 flex items-center gap-1"
          >
            <CheckCircle class="h-4 w-4" />
          </span>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive, nextTick } from 'vue'
import Label from '../ui/label.vue'
import Input from '../ui/input.vue'
import { AlertCircle, CheckCircle, CreditCard } from 'lucide-vue-next'
import Select from '../ui/select.vue'
import { cn } from '../../utils/cn'

const props = defineProps({
  registrationData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['dataChange'])

type BankingFormState = {
  accountHolder: string
  bankName: string
  accountNumber: string
  accountType: string
  branchCode: string
}

type BankingTouchedState = Record<keyof BankingFormState, boolean>

const defaultBankingState = (): BankingFormState => ({
  accountHolder: '',
  bankName: '',
  accountNumber: '',
  accountType: '',
  branchCode: ''
})

const formData = ref<BankingFormState>(defaultBankingState())
const isSyncingFromProps = ref(false)
const lastEmittedValue = ref<string>('')
const errors = reactive<Record<keyof BankingFormState, string>>({
  accountHolder: '',
  bankName: '',
  accountNumber: '',
  accountType: '',
  branchCode: ''
})
const touched = reactive<BankingTouchedState>({
  accountHolder: false,
  bankName: false,
  accountNumber: false,
  accountType: false,
  branchCode: false
})

const REQUIRED_MESSAGE = '* field must be filled'

const deepEqual = (a: any, b: any): boolean => {
  if (a === b) return true
  if (!a || !b) return false
  if (typeof a !== 'object' || typeof b !== 'object') return false
  
  const keysA = Object.keys(a)
  const keysB = Object.keys(b)
  if (keysA.length !== keysB.length) return false
  
  for (const key of keysA) {
    if (!keysB.includes(key)) return false
    if (a[key] !== b[key] && typeof a[key] === 'object' && typeof b[key] === 'object') {
      if (!deepEqual(a[key], b[key])) return false
    } else if (a[key] !== b[key]) {
      return false
    }
  }
  return true
}

const resetTouched = () => {
  Object.keys(touched).forEach((key) => {
    touched[key as keyof BankingTouchedState] = false
  })
}

const markTouched = (field: keyof BankingTouchedState) => {
  touched[field] = true
  errors[field] = validateRequired(formData.value[field])
}

const isFieldValid = (field: keyof BankingFormState) => {
  const value = formData.value[field]
  return Boolean(
    touched[field] &&
      !errors[field] &&
      value &&
      value.toString().trim().length > 0
  )
}

const accountTypeOptions = [
  { value: 'savings', label: 'Savings' },
  { value: 'current', label: 'Current/Cheque' },
  { value: 'transmission', label: 'Transmission' }
]

watch(() => props.registrationData?.banking, (newValue) => {
  if (!newValue) return

  const synced = {
    ...defaultBankingState(),
    ...JSON.parse(JSON.stringify(newValue))
  }
  if (!synced.accountType) synced.accountType = ''

  // Only update if actually different
  if (!deepEqual(formData.value, synced)) {
    isSyncingFromProps.value = true
    formData.value = synced
    resetTouched()
    nextTick(() => {
      isSyncingFromProps.value = false
      lastEmittedValue.value = JSON.stringify(formData.value)
    })
  }
}, { immediate: true, deep: true })

const formatAccountNumber = (event: Event) => {
  const target = event.target as HTMLInputElement
  const formatted = target?.value.replace(/\D/g, '').slice(0, 16) || ''
  formData.value.accountNumber = formatted
  markTouched('accountNumber')
  errors.accountNumber = validateRequired(formatted)
}

const formatBranchCode = (event: Event) => {
  const target = event.target as HTMLInputElement
  const formatted = target?.value.replace(/\D/g, '').slice(0, 6) || ''
  formData.value.branchCode = formatted
  markTouched('branchCode')
  errors.branchCode = validateRequired(formatted)
}

const validateRequired = (value: string | null | undefined) => {
  const strValue = value?.toString().trim() ?? ''
  if (!strValue || strValue.length === 0) {
    return REQUIRED_MESSAGE
  }
  return ''
}

watch(() => formData.value.accountHolder, (val) => {
  errors.accountHolder = validateRequired(val)
}, { immediate: true })

watch(() => formData.value.bankName, (val) => {
  errors.bankName = validateRequired(val)
}, { immediate: true })

watch(() => formData.value.accountNumber, (val) => {
  errors.accountNumber = validateRequired(val)
}, { immediate: true })

watch(() => formData.value.accountType, (val) => {
  errors.accountType = validateRequired(val)
}, { immediate: true })

watch(() => formData.value.branchCode, (val) => {
  errors.branchCode = validateRequired(val)
}, { immediate: true })

watch(formData, (newValue) => {
  if (isSyncingFromProps.value) return

  const payload = {
    ...JSON.parse(JSON.stringify(newValue)),
    accountType: newValue.accountType || ''
  }
  const payloadStr = JSON.stringify(payload)
  
  // Only emit if the payload has actually changed
  if (payloadStr !== lastEmittedValue.value) {
    lastEmittedValue.value = payloadStr
    emit('dataChange', payload)
  }
}, { deep: true, immediate: false })

defineExpose({
  validate: () => Object.values(errors).every(msg => msg === ''),
  getData: () => formData.value,
  submit: () => {
    Object.keys(touched).forEach(key => {
      touched[key as keyof BankingTouchedState] = true
    })
    emit('dataChange', { ...formData.value })
    return Object.values(errors).every(msg => msg === '')
  },
  errors,
  touched,
  isFieldValid
})
</script> 