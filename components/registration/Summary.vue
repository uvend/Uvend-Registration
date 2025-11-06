<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
        <Icon name="lucide:file-check-2" class="w-5 h-5 text-blue-600" />
      </div>
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Registration Summary</h2>
        <p class="text-sm text-gray-600 mt-1">Please review your information before submitting</p>
      </div>
      
      <!-- Desktop/Tablet Action Buttons (right side) -->
      <div v-if="!props.compact" class="ml-auto hidden sm:flex flex-row gap-3 items-center">
        <Button 
          @click="generatePDF" 
          class="justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
          :disabled="isGeneratingPDF"
        >
          <PrinterIcon v-if="!isGeneratingPDF" class="h-4 w-4 mr-2" />
          <Loader2Icon v-else class="h-4 w-4 mr-2 animate-spin" />
          {{ isGeneratingPDF ? 'Generating PDF...' : 'Print Summary' }}
        </Button>
        
        <Button 
          @click="submitRegistration" 
          class="justify-center bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
          :disabled="isSubmitting"
        >
          <FileIcon v-if="!isSubmitting" class="h-4 w-4 mr-2" />
          <Loader2Icon v-else class="h-4 w-4 mr-2 animate-spin" />
          {{ isSubmitting ? 'Submitting...' : 'Submit Registration' }}
        </Button>
      </div>
    </div>

    <!-- Mobile Action Buttons (under title/caption) -->
    <div v-if="!props.compact" class="sm:hidden mt-2 grid grid-cols-1 gap-2">
      <Button 
        @click="generatePDF" 
        class="w-full justify-center h-10 px-3 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
        :disabled="isGeneratingPDF"
      >
        <PrinterIcon v-if="!isGeneratingPDF" class="h-4 w-4 mr-2" />
        <Loader2Icon v-else class="h-4 w-4 mr-2 animate-spin" />
        {{ isGeneratingPDF ? 'Generating PDF...' : 'Print Summary' }}
      </Button>
      
      <Button 
        @click="submitRegistration" 
        class="w-full justify-center h-10 px-3 text-sm bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
        :disabled="isSubmitting"
      >
        <FileIcon v-if="!isSubmitting" class="h-4 w-4 mr-2" />
        <Loader2Icon v-else class="h-4 w-4 mr-2 animate-spin" />
        {{ isSubmitting ? 'Submitting...' : 'Submit Registration' }}
      </Button>
    </div>

    <!-- PDF Content Container (hidden for screen, visible for PDF) -->
    <div id="pdf-content" class="hidden">
      <div class="pdf-header">
        <h1 class="text-3xl font-bold text-center text-gray-900 mb-2">Registration Summary</h1>
        <p class="text-center text-gray-600 mb-8">Generated on {{ new Date().toLocaleDateString() }}</p>
      </div>
      
      <!-- PDF content will be populated here -->
    </div>

    <!-- Registration Type -->
    <div class="bg-white/80 backdrop-blur-sm rounded-xl border-0 p-6 space-y-4 shadow-lg">
      <div class="flex items-center justify-between border-b border-blue-100 pb-4">
        <h3 class="text-lg font-semibold text-gray-900">Registration Type</h3>
        <Button variant="outline" size="sm" @click="$emit('edit', 1)" class="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl">
          <PencilIcon class="h-4 w-4 mr-2" />
          Edit
        </Button>
      </div>
      <div class="grid grid-cols-1 gap-4">
        <div>
          <span class="text-sm font-medium text-gray-500">Type</span>
          <p class="mt-1 text-gray-900 font-medium">{{ getRegistrationTypeLabel(registrationData.type) || 'Not specified' }}</p>
        </div>
      </div>
    </div>

    <!-- Personal Information -->
    <div class="bg-white/80 backdrop-blur-sm rounded-xl border-0 p-6 space-y-4 shadow-lg">
      <div class="flex items-center justify-between border-b border-blue-100 pb-4">
        <h3 class="text-lg font-semibold text-gray-900">Personal Information</h3>
        <Button variant="outline" size="sm" @click="$emit('edit', 2)" class="border-blue-300 text-blue-700 hover:bg-blue-50">
          <PencilIcon class="h-4 w-4 mr-2" />
          Edit
        </Button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <span class="text-sm font-medium text-gray-500">First Name</span>
          <p class="mt-1 text-gray-900 font-medium">{{ registrationData.personal?.firstName || 'Not provided' }}</p>
        </div>
        <div>
          <span class="text-sm font-medium text-gray-500">Last Name</span>
          <p class="mt-1 text-gray-900 font-medium">{{ registrationData.personal?.lastName || 'Not provided' }}</p>
        </div>
        <div>
          <span class="text-sm font-medium text-gray-500">Email Address</span>
          <p class="mt-1 text-gray-900 font-medium">{{ registrationData.personal?.email || 'Not provided' }}</p>
        </div>
        <div>
          <span class="text-sm font-medium text-gray-500">Phone Number</span>
          <p class="mt-1 text-gray-900 font-medium">{{ registrationData.personal?.phone || 'Not provided' }}</p>
        </div>
        <div>
          <span class="text-sm font-medium text-gray-500">ID Number</span>
          <p class="mt-1 text-gray-900 font-medium">{{ registrationData.personal?.idNumber || 'Not provided' }}</p>
        </div>
        <div>
          <span class="text-sm font-medium text-gray-500">Date of Birth</span>
          <p class="mt-1 text-gray-900 font-medium">{{ formatDate(registrationData.personal?.dateOfBirth) || 'Not provided' }}</p>
        </div>
      </div>
    </div>

    <!-- Documents -->
    <div class="bg-white/80 backdrop-blur-sm rounded-xl border-0 p-6 space-y-4 shadow-lg">
      <div class="flex items-center justify-between border-b border-blue-100 pb-4">
        <h3 class="text-lg font-semibold text-gray-900">Documents</h3>
        <Button variant="outline" size="sm" @click="$emit('edit', 3)" class="border-blue-300 text-blue-700 hover:bg-blue-50">
          <PencilIcon class="h-4 w-4 mr-2" />
          Edit
        </Button>
      </div>
      <div class="space-y-4">
        <div v-if="hasDocuments" class="grid grid-cols-1 gap-4">
          <div v-if="registrationData.documents?.idDocument" class="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
            <FileIcon class="h-5 w-5 text-blue-600" />
            <div>
              <p class="text-sm font-medium text-gray-900">ID Document</p>
              <p class="text-xs text-gray-500">{{ registrationData.documents.idDocument.name }}</p>
            </div>
          </div>
          <div v-if="registrationData.documents?.proofOfAddress" class="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
            <FileIcon class="h-5 w-5 text-blue-600" />
            <div>
              <p class="text-sm font-medium text-gray-900">Proof of Address</p>
              <p class="text-xs text-gray-500">{{ registrationData.documents.proofOfAddress.name }}</p>
            </div>
          </div>
          <div v-if="registrationData.documents?.bankStatement" class="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
            <FileIcon class="h-5 w-5 text-blue-600" />
            <div>
              <p class="text-sm font-medium text-gray-900">Bank Statement</p>
              <p class="text-xs text-gray-500">{{ registrationData.documents.bankStatement.name }}</p>
            </div>
          </div>
        </div>
        <p v-else class="text-sm text-gray-500">No documents uploaded</p>
      </div>
    </div>

    <!-- Banking Details -->
    <div class="bg-white/80 backdrop-blur-sm rounded-xl border-0 p-6 space-y-4 shadow-lg">
      <div class="flex items-center justify-between border-b border-blue-100 pb-4">
        <h3 class="text-lg font-semibold text-gray-900">Banking Details</h3>
        <Button variant="outline" size="sm" @click="$emit('edit', 4)" class="border-blue-300 text-blue-700 hover:bg-blue-50">
          <PencilIcon class="h-4 w-4 mr-2" />
          Edit
        </Button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <span class="text-sm font-medium text-gray-500">Account Holder</span>
          <p class="mt-1 text-gray-900 font-medium">{{ registrationData.banking?.accountHolder || 'Not provided' }}</p>
        </div>
        <div>
          <span class="text-sm font-medium text-gray-500">Bank Name</span>
          <p class="mt-1 text-gray-900 font-medium">{{ registrationData.banking?.bankName || 'Not provided' }}</p>
        </div>
        <div>
          <span class="text-sm font-medium text-gray-500">Account Type</span>
          <p class="mt-1 text-gray-900 font-medium">{{ getAccountTypeLabel(registrationData.banking?.accountType) || 'Not provided' }}</p>
        </div>
        <div>
          <span class="text-sm font-medium text-gray-500">Branch Code</span>
          <p class="mt-1 text-gray-900 font-medium">{{ registrationData.banking?.branchCode || 'Not provided' }}</p>
        </div>
        <div>
          <span class="text-sm font-medium text-gray-500">Account Number</span>
          <p class="mt-1 text-gray-900 font-medium">{{ maskAccountNumber(registrationData.banking?.accountNumber) || 'Not provided' }}</p>
        </div>
      </div>
    </div>

    <!-- Address Details -->
    <div class="bg-white/80 backdrop-blur-sm rounded-xl border-0 p-6 space-y-4 shadow-lg">
      <div class="flex items-center justify-between border-b border-blue-100 pb-4">
        <h3 class="text-lg font-semibold text-gray-900">Address Details</h3>
        <Button variant="outline" size="sm" @click="$emit('edit', 5)" class="border-blue-300 text-blue-700 hover:bg-blue-50">
          <PencilIcon class="h-4 w-4 mr-2" />
          Edit
        </Button>
      </div>
      <div class="space-y-6">
        <!-- Main Business Address -->
        <div>
          <h4 class="font-semibold text-gray-900 mb-3">Main Business Address</h4>
          <div class="space-y-4">
            <div>
              <span class="text-sm font-medium text-gray-500">Street Address</span>
              <p class="mt-1 text-gray-900 font-medium">{{ registrationData.address?.streetAddress || 'Not provided' }}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span class="text-sm font-medium text-gray-500">Suburb</span>
                <p class="mt-1 text-gray-900 font-medium">{{ registrationData.address?.suburb || 'Not provided' }}</p>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-500">City</span>
                <p class="mt-1 text-gray-900 font-medium">{{ registrationData.address?.city || 'Not provided' }}</p>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-500">Province</span>
                <p class="mt-1 text-gray-900 font-medium">{{ registrationData.address?.province || 'Not provided' }}</p>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-500">Postal Code</span>
                <p class="mt-1 text-gray-900 font-medium">{{ registrationData.address?.postalCode || 'Not provided' }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Complexes -->
        <div v-if="registrationData.address?.complexes?.length">
          <h4 class="font-semibold text-gray-900 mb-3">Complexes</h4>
          <div class="space-y-6">
            <div 
              v-for="(complex, index) in registrationData.address.complexes" 
              :key="index"
              class="bg-white/60 rounded-xl p-4 border-0"
            >
              <h5 class="font-semibold text-gray-900 mb-3">Complex {{ index + 1 }}</h5>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span class="text-sm font-medium text-gray-500">Complex Name</span>
                  <p class="mt-1 text-gray-900 font-medium">{{ complex.name }}</p>
                </div>
                <div>
                  <span class="text-sm font-medium text-gray-500">Number of Units</span>
                  <p class="mt-1 text-gray-900 font-medium">{{ complex.unitCount }}</p>
                </div>
                <div class="md:col-span-2">
                  <span class="text-sm font-medium text-gray-500">Complex Address</span>
                  <p class="mt-1 text-gray-900 font-medium">{{ complex.address }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p v-else class="text-sm text-gray-500">No complexes added</p>
      </div>
    </div>

    <!-- Meter & Unit Details -->
    <div class="bg-white/80 backdrop-blur-sm rounded-xl border-0 p-6 space-y-4 shadow-lg">
      <div class="flex items-center justify-between border-b border-blue-100 pb-4">
        <h3 class="text-lg font-semibold text-gray-900">Meter & Unit Details</h3>
        <Button variant="outline" size="sm" @click="$emit('edit', 6)" class="border-blue-300 text-blue-700 hover:bg-blue-50">
          <PencilIcon class="h-4 w-4 mr-2" />
          Edit
        </Button>
      </div>
      <div v-if="registrationData.meters?.length" class="space-y-6">
        <div v-for="(meter, index) in registrationData.meters" :key="index" class="border-b border-blue-100 last:border-0 pb-6 last:pb-0">
          <h4 class="font-semibold text-gray-900 mb-4">Meter {{ index + 1 }}</h4>
          
          <!-- Meter Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <span class="text-sm font-medium text-gray-500">Meter Number</span>
              <p class="mt-1 text-gray-900 font-medium">{{ meter.meterNumber }}</p>
            </div>
            <div>
              <span class="text-sm font-medium text-gray-500">Utility Type</span>
              <p class="mt-1 text-gray-900 font-medium">{{ meter.utilityType }}</p>
            </div>
            <div>
              <span class="text-sm font-medium text-gray-500">Location</span>
              <p class="mt-1 text-gray-900 font-medium">{{ meter.location }}</p>
            </div>
            <div>
              <span class="text-sm font-medium text-gray-500">Status</span>
              <p class="mt-1 text-gray-900 font-medium">{{ meter.isActive ? 'Active' : 'Inactive' }}</p>
            </div>
          </div>

          <!-- Unit Information -->
          <div class="mt-4">
            <h5 class="font-semibold text-gray-900 mb-3">Unit Details</h5>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span class="text-sm font-medium text-gray-500">Unit Number</span>
                <p class="mt-1 text-gray-900 font-medium">{{ meter.unit?.unitNumber }}</p>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-500">Unit Type</span>
                <p class="mt-1 text-gray-900 font-medium">{{ meter.unit?.unitType }}</p>
              </div>
            </div>
          </div>

          <!-- Tenant Information -->
          <div v-if="meter.unit?.hasTenant" class="mt-4">
            <h5 class="font-semibold text-gray-900 mb-3">Tenant Information</h5>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span class="text-sm font-medium text-gray-500">Tenant Name</span>
                <p class="mt-1 text-gray-900 font-medium">{{ meter.unit.tenant.name }}</p>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-500">Phone Number</span>
                <p class="mt-1 text-gray-900 font-medium">{{ meter.unit.tenant.phone }}</p>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-500">Email</span>
                <p class="mt-1 text-gray-900 font-medium">{{ meter.unit.tenant.email }}</p>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-500">Lease Period</span>
                <p class="mt-1 text-gray-900 font-medium">{{ formatDate(meter.unit.tenant.leaseStart) }} - {{ formatDate(meter.unit.tenant.leaseEnd) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p v-else class="text-sm text-gray-500">No meters added</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { PencilIcon, FileIcon, PrinterIcon, Loader2Icon } from 'lucide-vue-next'
import Button from '~/components/ui/button.vue'

const props = defineProps({
  registrationData: {
    type: Object,
    required: true
  },
  compact: {
    type: Boolean,
    default: false
  }
})

// Debug logging
console.log('Summary component received data:', props.registrationData)

defineEmits(['edit'])

const isGeneratingPDF = ref(false)
const isSubmitting = ref(false)

const hasDocuments = computed(() => {
  return props.registrationData.documents && (
    props.registrationData.documents.idDocument ||
    props.registrationData.documents.proofOfAddress ||
    props.registrationData.documents.bankStatement
  )
})

const getRegistrationTypeLabel = (type) => {
  const types = {
    'new': 'New Registration',
    'update': 'Update Details',
    'existing': 'Existing Registration'
  }
  return types[type] || type
}

const getAccountTypeLabel = (type) => {
  const types = {
    'savings': 'Savings',
    'current': 'Current/Cheque',
    'transmission': 'Transmission'
  }
  return types[type] || type
}

const formatFileSize = (bytes) => {
  if (!bytes) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

const maskAccountNumber = (accountNumber) => {
  if (!accountNumber) return null
  const visible = accountNumber.slice(-4)
  const masked = '*'.repeat(accountNumber.length - 4)
  return masked + visible
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const generatePDF = async () => {
  isGeneratingPDF.value = true
  
  try {
    // Import html2pdf dynamically
    const html2pdf = (await import('html2pdf.js')).default
    
    // Create PDF content
    const pdfContent = createPDFContent()
    
    // Configure PDF options
    const options = {
      margin: [10, 10, 10, 10],
      filename: `registration-summary-${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }
    
    // Generate PDF
    await html2pdf().from(pdfContent).set(options).save()
    
  } catch (error) {
    console.error('Error generating PDF:', error)
    alert('Failed to generate PDF. Please try again.')
  } finally {
    isGeneratingPDF.value = false
  }
}

const submitRegistration = async () => {
  isSubmitting.value = true
  
  try {
    // Import html2pdf dynamically
    const html2pdf = (await import('html2pdf.js')).default
    
    // Create PDF content
    const pdfContent = createPDFContent()
    
    // Configure PDF options
    const options = {
      margin: [10, 10, 10, 10],
      filename: `registration-summary-${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }
    
    // Generate PDF blob
    const pdfBlob = await html2pdf().from(pdfContent).set(options).outputPdf('blob')
    
    // Create FormData for email
    const formData = new FormData()
    formData.append('to', 'registrations@uvend.co.za,shawaal@uvend.co.za,rross@uvend.co.za')
    formData.append('subject', `New Registration Submission - ${props.registrationData.personal?.firstName} ${props.registrationData.personal?.lastName}`)
    formData.append('body', createEmailBody())
    formData.append('pdf', pdfBlob, `registration-summary-${new Date().toISOString().split('T')[0]}.pdf`)
    
    // Send email with PDF attachment
    const response = await fetch('/api/send-email', {
      method: 'POST',
      body: formData
    })
    
    if (response.ok) {
      alert('Registration submitted successfully! You will receive a confirmation email shortly.')
      // Optionally redirect or reset form
    } else {
      throw new Error('Failed to send email')
    }
    
  } catch (error) {
    console.error('Error submitting registration:', error)
    alert('Failed to submit registration. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

const createEmailBody = () => {
  return `
New registration submission received:

Registration Type: ${getRegistrationTypeLabel(props.registrationData.type) || 'Not specified'}

Personal Information:
- Name: ${props.registrationData.personal?.firstName} ${props.registrationData.personal?.lastName}
- Email: ${props.registrationData.personal?.email}
- Phone: ${props.registrationData.personal?.phone}
- ID Number: ${props.registrationData.personal?.idNumber}

Banking Details:
- Bank: ${props.registrationData.banking?.bankName}
- Account Holder: ${props.registrationData.banking?.accountHolder}
- Account Type: ${getAccountTypeLabel(props.registrationData.banking?.accountType)}

Please see the attached PDF for complete details.

Submitted on: ${new Date().toLocaleString()}
  `.trim()
}

const createPDFContent = () => {
  const content = document.createElement('div')
  content.innerHTML = `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #3b82f6; padding-bottom: 20px;">
        <h1 style="color: #1e40af; font-size: 28px; margin: 0 0 10px 0;">Registration Summary</h1>
        <p style="color: #6b7280; margin: 0;">Generated on ${new Date().toLocaleDateString()}</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h2 style="color: #1e40af; font-size: 20px; margin-bottom: 15px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Registration Type</h2>
        <p><strong>Type:</strong> ${getRegistrationTypeLabel(props.registrationData.type) || 'Not specified'}</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h2 style="color: #1e40af; font-size: 20px; margin-bottom: 15px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Personal Information</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
          <p><strong>First Name:</strong> ${props.registrationData.personal?.firstName || 'Not provided'}</p>
          <p><strong>Last Name:</strong> ${props.registrationData.personal?.lastName || 'Not provided'}</p>
          <p><strong>Email:</strong> ${props.registrationData.personal?.email || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${props.registrationData.personal?.phone || 'Not provided'}</p>
          <p><strong>ID Number:</strong> ${props.registrationData.personal?.idNumber || 'Not provided'}</p>
          <p><strong>Date of Birth:</strong> ${formatDate(props.registrationData.personal?.dateOfBirth) || 'Not provided'}</p>
        </div>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h2 style="color: #1e40af; font-size: 20px; margin-bottom: 15px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Documents</h2>
        ${hasDocuments.value ? `
          <ul style="margin: 0; padding-left: 20px;">
            ${props.registrationData.documents?.idDocument ? `<li>ID Document: ${props.registrationData.documents.idDocument.name}</li>` : ''}
            ${props.registrationData.documents?.proofOfAddress ? `<li>Proof of Address: ${props.registrationData.documents.proofOfAddress.name}</li>` : ''}
            ${props.registrationData.documents?.bankStatement ? `<li>Bank Statement: ${props.registrationData.documents.bankStatement.name}</li>` : ''}
          </ul>
        ` : '<p>No documents uploaded</p>'}
      </div>
      
      <div style="margin-bottom: 25px;">
        <h2 style="color: #1e40af; font-size: 20px; margin-bottom: 15px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Banking Details</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
          <p><strong>Account Holder:</strong> ${props.registrationData.banking?.accountHolder || 'Not provided'}</p>
          <p><strong>Bank Name:</strong> ${props.registrationData.banking?.bankName || 'Not provided'}</p>
          <p><strong>Account Type:</strong> ${getAccountTypeLabel(props.registrationData.banking?.accountType) || 'Not provided'}</p>
          <p><strong>Branch Code:</strong> ${props.registrationData.banking?.branchCode || 'Not provided'}</p>
          <p><strong>Account Number:</strong> ${maskAccountNumber(props.registrationData.banking?.accountNumber) || 'Not provided'}</p>
        </div>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h2 style="color: #1e40af; font-size: 20px; margin-bottom: 15px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Address Details</h2>
        <h3 style="color: #374151; font-size: 16px; margin-bottom: 10px;">Main Business Address</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
          <p><strong>Street Address:</strong> ${props.registrationData.address?.streetAddress || 'Not provided'}</p>
          <p><strong>Suburb:</strong> ${props.registrationData.address?.suburb || 'Not provided'}</p>
          <p><strong>City:</strong> ${props.registrationData.address?.city || 'Not provided'}</p>
          <p><strong>Province:</strong> ${props.registrationData.address?.province || 'Not provided'}</p>
          <p><strong>Postal Code:</strong> ${props.registrationData.address?.postalCode || 'Not provided'}</p>
        </div>
        
        ${props.registrationData.address?.complexes?.length ? `
          <h3 style="color: #374151; font-size: 16px; margin-bottom: 10px;">Complexes</h3>
          ${props.registrationData.address.complexes.map((complex, index) => `
            <div style="border: 1px solid #e5e7eb; padding: 15px; margin-bottom: 15px; background-color: #f9fafb;">
              <h4 style="color: #1f2937; font-size: 14px; margin-bottom: 10px;">Complex ${index + 1}</h4>
              <p><strong>Name:</strong> ${complex.name}</p>
              <p><strong>Units:</strong> ${complex.unitCount}</p>
              <p><strong>Address:</strong> ${complex.address}</p>
            </div>
          `).join('')}
        ` : '<p>No complexes added</p>'}
      </div>
      
      <div style="margin-bottom: 25px;">
        <h2 style="color: #1e40af; font-size: 20px; margin-bottom: 15px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Meter & Unit Details</h2>
        ${props.registrationData.meters?.length ? props.registrationData.meters.map((meter, index) => `
          <div style="border-bottom: 1px solid #e5e7eb; padding-bottom: 20px; margin-bottom: 20px;">
            <h3 style="color: #374151; font-size: 16px; margin-bottom: 10px;">Meter ${index + 1}</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
              <p><strong>Meter Number:</strong> ${meter.meterNumber}</p>
              <p><strong>Utility Type:</strong> ${meter.utilityType}</p>
              <p><strong>Location:</strong> ${meter.location}</p>
              <p><strong>Status:</strong> ${meter.isActive ? 'Active' : 'Inactive'}</p>
            </div>
            
            <h4 style="color: #6b7280; font-size: 14px; margin-bottom: 8px;">Unit Details</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
              <p><strong>Unit Number:</strong> ${meter.unit?.unitNumber || 'Not provided'}</p>
              <p><strong>Unit Type:</strong> ${meter.unit?.unitType || 'Not provided'}</p>
            </div>
            
            ${meter.unit?.hasTenant ? `
              <h4 style="color: #6b7280; font-size: 14px; margin-bottom: 8px;">Tenant Information</h4>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <p><strong>Name:</strong> ${meter.unit.tenant.name}</p>
                <p><strong>Phone:</strong> ${meter.unit.tenant.phone}</p>
                <p><strong>Email:</strong> ${meter.unit.tenant.email}</p>
                <p><strong>Lease Period:</strong> ${formatDate(meter.unit.tenant.leaseStart)} - ${formatDate(meter.unit.tenant.leaseEnd)}</p>
              </div>
            ` : ''}
          </div>
        `).join('') : '<p>No meters added</p>'}
      </div>
    </div>
  `
  
  return content
}
</script>

<style scoped>
/* PDF-specific styles */
@media print {
  .bg-white\/95 {
    background-color: white !important;
  }
  
  .backdrop-blur-sm {
    backdrop-filter: none !important;
  }
  
  .shadow-lg {
    box-shadow: none !important;
  }
}
</style> 