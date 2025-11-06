<template>
  <div>
    <div class="space-y-6">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
          <Upload class="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Document Upload</h2>
          <p class="text-sm text-gray-600 mt-1">Please upload the required documents</p>
        </div>
      </div>

      <div class="space-y-6">
        <!-- ID Document Upload -->
        <div class="space-y-3">
          <Label class="text-gray-700 font-medium">ID Document</Label>
          <div class="bg-white/80 backdrop-blur-sm border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 hover:border-blue-400 hover:bg-blue-50/50 shadow-lg" 
               :class="errors.idDocument ? 'border-red-300 bg-red-50' : 'border-blue-200 hover:border-blue-400'">
            <div v-if="!formData.idDocument" class="space-y-4">
              <div class="flex justify-center">
                <div class="p-3 bg-gradient-to-br from-blue-100 to-orange-100 rounded-full">
                  <Upload class="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div class="text-sm text-gray-600">
                <label for="idDocument" class="relative cursor-pointer rounded-md font-semibold text-blue-600 hover:text-blue-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 transition-colors">
                  <span>Upload ID document</span>
                  <input id="idDocument" name="idDocument" type="file" class="sr-only" @change="handleFileUpload($event, 'idDocument')" accept=".pdf">
                </label>
                <p class="mt-1">or drag and drop</p>
                <p class="text-xs text-gray-500 mt-2">PDF only, up to 10MB</p>
              </div>
            </div>
            
            <div v-else class="space-y-3">
              <div class="flex items-center justify-center">
                <div class="p-3 bg-green-100 rounded-full">
                  <FileCheck class="h-8 w-8 text-green-600" />
                </div>
              </div>
              <p class="text-sm font-medium text-gray-900">{{ formData.idDocument.name }}</p>
              <button type="button" class="text-sm text-red-500 hover:text-red-700 transition-colors" @click="removeFile('idDocument')">Remove</button>
            </div>
          </div>
          <span v-if="errors.idDocument" class="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle class="h-4 w-4" />
            {{ errors.idDocument }}
          </span>
        </div>

        <!-- Proof of Address -->
        <div class="space-y-3">
          <Label class="text-gray-700 font-medium">Proof of Address</Label>
          <div class="bg-white/80 backdrop-blur-sm border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 hover:border-blue-400 hover:bg-blue-50/50 shadow-lg"
               :class="errors.proofOfAddress ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-blue-400'">
            <div v-if="!formData.proofOfAddress" class="space-y-4">
              <div class="flex justify-center">
                <div class="p-3 bg-gradient-to-br from-blue-100 to-orange-100 rounded-full">
                  <Upload class="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div class="text-sm text-gray-600">
                <label for="proofOfAddress" class="relative cursor-pointer rounded-md font-semibold text-blue-600 hover:text-blue-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 transition-colors">
                  <span>Upload proof of address</span>
                  <input id="proofOfAddress" name="proofOfAddress" type="file" class="sr-only" @change="handleFileUpload($event, 'proofOfAddress')" accept=".pdf">
                </label>
                <p class="mt-1">or drag and drop</p>
                <p class="text-xs text-gray-500 mt-2">PDF only, up to 10MB</p>
              </div>
            </div>
            
            <div v-else class="space-y-3">
              <div class="flex items-center justify-center">
                <div class="p-3 bg-green-100 rounded-full">
                  <FileCheck class="h-8 w-8 text-green-600" />
                </div>
              </div>
              <p class="text-sm font-medium text-gray-900">{{ formData.proofOfAddress.name }}</p>
              <button type="button" class="text-sm text-red-500 hover:text-red-700 transition-colors" @click="removeFile('proofOfAddress')">Remove</button>
            </div>
          </div>
          <span v-if="errors.proofOfAddress" class="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle class="h-4 w-4" />
            {{ errors.proofOfAddress }}
          </span>
        </div>

        <!-- Bank Statement -->
        <div class="space-y-3">
          <Label class="text-gray-700 font-medium">Bank Statement (Last 3 months)</Label>
          <div class="bg-white/80 backdrop-blur-sm border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 hover:border-blue-400 hover:bg-blue-50/50 shadow-lg"
               :class="errors.bankStatement ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-blue-400'">
            <div v-if="!formData.bankStatement" class="space-y-4">
              <div class="flex justify-center">
                <div class="p-3 bg-gradient-to-br from-blue-100 to-orange-100 rounded-full">
                  <Upload class="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div class="text-sm text-gray-600">
                <label for="bankStatement" class="relative cursor-pointer rounded-md font-semibold text-blue-600 hover:text-blue-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 transition-colors">
                  <span>Upload bank statement</span>
                  <input id="bankStatement" name="bankStatement" type="file" class="sr-only" @change="handleFileUpload($event, 'bankStatement')" accept=".pdf">
                </label>
                <p class="mt-1">or drag and drop</p>
                <p class="text-xs text-gray-500 mt-2">PDF only, up to 10MB</p>
              </div>
            </div>
            
            <div v-else class="space-y-3">
              <div class="flex items-center justify-center">
                <div class="p-3 bg-green-100 rounded-full">
                  <FileCheck class="h-8 w-8 text-green-600" />
                </div>
              </div>
              <p class="text-sm font-medium text-gray-900">{{ formData.bankStatement.name }}</p>
              <button type="button" class="text-sm text-red-500 hover:text-red-700 transition-colors" @click="removeFile('bankStatement')">Remove</button>
            </div>
          </div>
          <span v-if="errors.bankStatement" class="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle class="h-4 w-4" />
            {{ errors.bankStatement }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import Label from '~/components/ui/label.vue'
import { Upload, FileCheck, AlertCircle } from 'lucide-vue-next'

const props = defineProps({
  registrationData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['dataChange'])

const defaultDocumentState = () => ({
  idDocument: null,
  proofOfAddress: null,
  bankStatement: null
})

const formData = ref(defaultDocumentState())
const isSyncingFromProps = ref(false)
const manualErrors = ref({})

// Initialize form data from props if available
watch(() => props.registrationData?.documents, (newValue) => {
  if (!newValue) {
    return
  }

  isSyncingFromProps.value = true
  formData.value = {
    ...defaultDocumentState(),
    ...newValue
  }
  isSyncingFromProps.value = false
}, { immediate: true, deep: true })

const validateFile = (file) => {
  if (!file) return false
  
  const maxSize = 10 * 1024 * 1024 // 10MB
  const allowedTypes = ['application/pdf']
  
  if (file.size > maxSize) {
    return 'File size must be less than 10MB'
  }
  
  if (!allowedTypes.includes(file.type)) {
    return 'File must be PDF format only'
  }
  
  return true
}

const handleFileUpload = (event, field) => {
  const file = event.target.files[0]
  if (!file) return
  
  const validation = validateFile(file)
  if (validation === true) {
    formData.value[field] = file
    if (manualErrors.value[field]) {
      const updated = { ...manualErrors.value }
      delete updated[field]
      manualErrors.value = updated
    }
  } else {
    manualErrors.value = { ...manualErrors.value, [field]: validation }
  }
}

const removeFile = (field) => {
  formData.value[field] = null
  if (manualErrors.value[field]) {
    const updated = { ...manualErrors.value }
    delete updated[field]
    manualErrors.value = updated
  }
}

const errors = computed(() => {
  const current = formData.value
  const newErrors = {}
  
  if (!current.idDocument) {
    newErrors.idDocument = 'ID document is required'
  }
  if (!current.proofOfAddress) {
    newErrors.proofOfAddress = 'Proof of address is required'
  }
  if (!current.bankStatement) {
    newErrors.bankStatement = 'Bank statement is required'
  }

  return {
    ...newErrors,
    ...manualErrors.value
  }
})

const emitDocuments = () => {
  if (isSyncingFromProps.value) {
    return
  }

  emit('dataChange', {
    documents: {
      idDocument: formData.value.idDocument,
      proofOfAddress: formData.value.proofOfAddress,
      bankStatement: formData.value.bankStatement
    }
  })
}

// Emit whenever the form data changes
watch(formData, emitDocuments, { deep: true, immediate: false })

// Expose form data to parent
defineExpose({
  validate: () => true,
  getData: () => formData.value,
  submit: () => {
    emitDocuments()
    return true
  }
})
</script> 