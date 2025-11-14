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
                <div class="flex flex-col sm:flex-row gap-2 justify-center items-center">
                  <label for="idDocument" class="relative cursor-pointer rounded-md font-semibold text-blue-600 hover:text-blue-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 transition-colors">
                    <span>Upload ID document</span>
                    <input id="idDocument" name="idDocument" type="file" class="sr-only" @change="handleFileUpload($event, 'idDocument')" accept="image/*,.pdf" capture="environment">
                  </label>
                  <span class="text-gray-400">or</span>
                  <button type="button" @click="captureFromCamera('idDocument')" class="font-semibold text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
                    📷 Take photo
                  </button>
                </div>
                <p class="mt-1">or drag and drop</p>
                <p class="text-xs text-gray-500 mt-2">Images or PDF, up to 10MB</p>
              </div>
            </div>
            
            <div v-else class="space-y-3">
              <div class="flex items-center justify-center">
                <div v-if="formData.idDocument.type?.startsWith('image/')" class="max-w-xs">
                  <img :src="getFilePreview(formData.idDocument)" alt="ID Document preview" class="max-h-48 w-auto mx-auto rounded-lg border-2 border-gray-200" />
                </div>
                <div v-else class="p-3 bg-green-100 rounded-full">
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
                <div class="flex flex-col sm:flex-row gap-2 justify-center items-center">
                  <label for="proofOfAddress" class="relative cursor-pointer rounded-md font-semibold text-blue-600 hover:text-blue-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 transition-colors">
                    <span>Upload proof of address</span>
                    <input id="proofOfAddress" name="proofOfAddress" type="file" class="sr-only" @change="handleFileUpload($event, 'proofOfAddress')" accept="image/*,.pdf" capture="environment">
                  </label>
                  <span class="text-gray-400">or</span>
                  <button type="button" @click="captureFromCamera('proofOfAddress')" class="font-semibold text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
                    📷 Take photo
                  </button>
                </div>
                <p class="mt-1">or drag and drop</p>
                <p class="text-xs text-gray-500 mt-2">Images or PDF, up to 10MB</p>
              </div>
            </div>
            
            <div v-else class="space-y-3">
              <div class="flex items-center justify-center">
                <div v-if="formData.proofOfAddress.type?.startsWith('image/')" class="max-w-xs">
                  <img :src="getFilePreview(formData.proofOfAddress)" alt="Proof of address preview" class="max-h-48 w-auto mx-auto rounded-lg border-2 border-gray-200" />
                </div>
                <div v-else class="p-3 bg-green-100 rounded-full">
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
                <div class="flex flex-col sm:flex-row gap-2 justify-center items-center">
                  <label for="bankStatement" class="relative cursor-pointer rounded-md font-semibold text-blue-600 hover:text-blue-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 transition-colors">
                    <span>Upload bank statement</span>
                    <input id="bankStatement" name="bankStatement" type="file" class="sr-only" @change="handleFileUpload($event, 'bankStatement')" accept="image/*,.pdf" capture="environment">
                  </label>
                  <span class="text-gray-400">or</span>
                  <button type="button" @click="captureFromCamera('bankStatement')" class="font-semibold text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
                    📷 Take photo
                  </button>
                </div>
                <p class="mt-1">or drag and drop</p>
                <p class="text-xs text-gray-500 mt-2">Images or PDF, up to 10MB</p>
              </div>
            </div>
            
            <div v-else class="space-y-3">
              <div class="flex items-center justify-center">
                <div v-if="formData.bankStatement.type?.startsWith('image/')" class="max-w-xs">
                  <img :src="getFilePreview(formData.bankStatement)" alt="Bank statement preview" class="max-h-48 w-auto mx-auto rounded-lg border-2 border-gray-200" />
                </div>
                <div v-else class="p-3 bg-green-100 rounded-full">
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
import { ref, watch, computed, nextTick } from 'vue'
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
const lastEmittedValue = ref<string>('')
const manualErrors = ref({})

// Helper to create a serializable representation of documents for comparison
const serializeDocuments = (docs) => {
  return JSON.stringify({
    idDocument: docs.idDocument ? {
      name: docs.idDocument.name,
      size: docs.idDocument.size,
      type: docs.idDocument.type,
      lastModified: docs.idDocument.lastModified
    } : null,
    proofOfAddress: docs.proofOfAddress ? {
      name: docs.proofOfAddress.name,
      size: docs.proofOfAddress.size,
      type: docs.proofOfAddress.type,
      lastModified: docs.proofOfAddress.lastModified
    } : null,
    bankStatement: docs.bankStatement ? {
      name: docs.bankStatement.name,
      size: docs.bankStatement.size,
      type: docs.bankStatement.type,
      lastModified: docs.bankStatement.lastModified
    } : null
  })
}

// Initialize form data from props if available
watch(() => props.registrationData?.documents, (newValue) => {
  if (!newValue) {
    return
  }

  const synced = {
    ...defaultDocumentState(),
    ...newValue
  }

  // Compare using serialized metadata since File objects can't be directly compared
  const currentSerialized = serializeDocuments(formData.value)
  const syncedSerialized = serializeDocuments(synced)

  // Only update if actually different
  if (currentSerialized !== syncedSerialized) {
    isSyncingFromProps.value = true
    formData.value = synced
    nextTick(() => {
      isSyncingFromProps.value = false
      lastEmittedValue.value = serializeDocuments(formData.value)
    })
  }
}, { immediate: true, deep: true })

const validateFile = (file) => {
  if (!file) return false
  
  const maxSize = 10 * 1024 * 1024 // 10MB
  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif'
  ]
  
  if (file.size > maxSize) {
    return 'File size must be less than 10MB'
  }
  
  if (!allowedTypes.includes(file.type)) {
    return 'File must be an image (JPEG, PNG, WebP, GIF) or PDF'
  }
  
  return true
}

const captureFromCamera = async (field) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: { facingMode: 'environment' } // Use back camera on mobile
    })
    
    // Create video element to show camera feed
    const video = document.createElement('video')
    video.srcObject = stream
    video.autoplay = true
    video.playsInline = true
    
    // Create a modal/dialog for camera preview
    const modal = document.createElement('div')
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col items-center justify-center'
    
    const container = document.createElement('div')
    container.className = 'bg-white rounded-xl p-6 max-w-md w-full mx-4'
    
    const videoContainer = document.createElement('div')
    videoContainer.className = 'mb-4 rounded-lg overflow-hidden bg-black'
    video.style.width = '100%'
    video.style.height = 'auto'
    video.style.maxHeight = '400px'
    video.style.objectFit = 'contain'
    videoContainer.appendChild(video)
    
    const buttonContainer = document.createElement('div')
    buttonContainer.className = 'flex gap-3 justify-center'
    
    const captureBtn = document.createElement('button')
    captureBtn.className = 'px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors'
    captureBtn.textContent = 'Capture Photo'
    
    const cancelBtn = document.createElement('button')
    cancelBtn.className = 'px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-colors'
    cancelBtn.textContent = 'Cancel'
    
    captureBtn.onclick = () => {
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0)
      
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `camera-capture-${field}-${Date.now()}.jpg`, { type: 'image/jpeg' })
          const validation = validateFile(file)
          
          if (validation === true) {
            formData.value[field] = file
            if (manualErrors.value[field]) {
              const updated = { ...manualErrors.value }
              delete updated[field]
              manualErrors.value = updated
            }
            emitDocuments()
          } else {
            manualErrors.value = { ...manualErrors.value, [field]: validation }
          }
        }
        
        // Clean up
        stream.getTracks().forEach(track => track.stop())
        document.body.removeChild(modal)
      }, 'image/jpeg', 0.9)
    }
    
    cancelBtn.onclick = () => {
      stream.getTracks().forEach(track => track.stop())
      document.body.removeChild(modal)
    }
    
    buttonContainer.appendChild(captureBtn)
    buttonContainer.appendChild(cancelBtn)
    
    container.appendChild(videoContainer)
    container.appendChild(buttonContainer)
    modal.appendChild(container)
    document.body.appendChild(modal)
    
    // Wait for video to be ready
    video.onloadedmetadata = () => {
      video.play()
    }
  } catch (error) {
    console.error('Error accessing camera:', error)
    alert('Unable to access camera. Please ensure you have granted camera permissions and try again.')
  }
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
  const file = formData.value[field]
  if (file && file.previewUrl) {
    URL.revokeObjectURL(file.previewUrl)
  }
  formData.value[field] = null
  if (manualErrors.value[field]) {
    const updated = { ...manualErrors.value }
    delete updated[field]
    manualErrors.value = updated
  }
}

const getFilePreview = (file) => {
  if (!file) return ''
  if (file.previewUrl) return file.previewUrl
  if (file.type?.startsWith('image/')) {
    file.previewUrl = URL.createObjectURL(file)
    return file.previewUrl
  }
  return ''
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

// Helper to create a serializable representation of documents for comparison
const serializeDocuments = (docs) => {
  return JSON.stringify({
    idDocument: docs.idDocument ? {
      name: docs.idDocument.name,
      size: docs.idDocument.size,
      type: docs.idDocument.type,
      lastModified: docs.idDocument.lastModified
    } : null,
    proofOfAddress: docs.proofOfAddress ? {
      name: docs.proofOfAddress.name,
      size: docs.proofOfAddress.size,
      type: docs.proofOfAddress.type,
      lastModified: docs.proofOfAddress.lastModified
    } : null,
    bankStatement: docs.bankStatement ? {
      name: docs.bankStatement.name,
      size: docs.bankStatement.size,
      type: docs.bankStatement.type,
      lastModified: docs.bankStatement.lastModified
    } : null
  })
}

const emitDocuments = () => {
  if (isSyncingFromProps.value) {
    return
  }

  const payload = {
    documents: {
      idDocument: formData.value.idDocument,
      proofOfAddress: formData.value.proofOfAddress,
      bankStatement: formData.value.bankStatement
    }
  }
  
  const payloadStr = serializeDocuments(formData.value)
  
  // Only emit if the payload has actually changed
  if (payloadStr !== lastEmittedValue.value) {
    lastEmittedValue.value = payloadStr
    emit('dataChange', payload)
  }
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