import { defineStore } from 'pinia'

export interface RegistrationFormData {
  type: string
  personal: {
    firstName: string
    lastName: string
    email: string
    phone: string
    idNumber: string
    dateOfBirth: string
  }
  documents: {
    idDocument: File | null
    proofOfAddress: File | null
    additionalDocuments: File[]
  }
  banking: {
    bankName: string
    accountNumber: string
    accountHolder: string
    branchCode: string
    accountType: string
  }
  address: {
    streetAddress: string
    suburb: string
    city: string
    province: string
    postalCode: string
    complexes: Array<{
      name: string
      unitCount: number
      address: string
    }>
  }
  meters: Array<{
    meterNumber: string
    utilityType: string
    location: string
    isActive: boolean
    unit: {
      unitNumber: string
      unitType: string
      hasTenant: boolean
      tenant?: {
        name: string
        phone: string
        email: string
        leaseStart: string
        leaseEnd: string
      }
    }
  }>
}

export const useRegistrationStore = defineStore('registration', {
  state: () => ({
    currentStep: 1,
    formData: {
      type: '',
      personal: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        idNumber: '',
        dateOfBirth: ''
      },
      documents: {
        idDocument: null,
        proofOfAddress: null,
        additionalDocuments: []
      },
      banking: {
        bankName: '',
        accountNumber: '',
        accountHolder: '',
        branchCode: '',
        accountType: ''
      },
      address: {
        streetAddress: '',
        suburb: '',
        city: '',
        province: '',
        postalCode: '',
        complexes: []
      },
      meters: []
    } as RegistrationFormData
  }),

  getters: {
    isStepComplete: (state) => (step: number) => {
      switch (step) {
        case 1: // Type
          return !!state.formData.type
        case 2: // Personal
          return !!(state.formData.personal.firstName && state.formData.personal.lastName && state.formData.personal.email)
        case 3: // Documents
          return !!(state.formData.documents.idDocument && state.formData.documents.proofOfAddress)
        case 4: // Banking
          return !!(state.formData.banking.bankName && state.formData.banking.accountNumber && state.formData.banking.accountHolder && state.formData.banking.branchCode)
        case 5: // Address
          return !!(state.formData.address.streetAddress && state.formData.address.city && state.formData.address.province && state.formData.address.postalCode)
        case 6: // Meters
          return state.formData.meters.length > 0
        case 7: // Summary
          return true
        default:
          return false
      }
    }
  },

  actions: {
    setType(data: string) {
      this.formData.type = data
    },

    setPersonal(data: Partial<RegistrationFormData['personal']>) {
      this.formData.personal = { ...this.formData.personal, ...data }
    },

    setDocuments(data: Partial<RegistrationFormData['documents']>) {
      this.formData.documents = { ...this.formData.documents, ...data }
    },

    setBanking(data: Partial<RegistrationFormData['banking']>) {
      this.formData.banking = { ...this.formData.banking, ...data }
    },

    setAddress(data: Partial<RegistrationFormData['address']>) {
      this.formData.address = { ...this.formData.address, ...data }
    },

    setMeters(data: Partial<RegistrationFormData['meters']>) {
      this.formData.meters = { ...this.formData.meters, ...data }
    },

    goBack() {
      if (this.currentStep > 1) {
        this.currentStep--
      }
    },

    nextStep() {
      this.currentStep++
    },

    reset() {
      this.currentStep = 1
      this.formData = {
        type: '',
        personal: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          idNumber: '',
          dateOfBirth: ''
        },
        documents: {
          idDocument: null,
          proofOfAddress: null,
          additionalDocuments: []
        },
        banking: {
          bankName: '',
          accountNumber: '',
          accountHolder: '',
          branchCode: '',
          accountType: ''
        },
        address: {
          streetAddress: '',
          suburb: '',
          city: '',
          province: '',
          postalCode: '',
          complexes: []
        },
        meters: []
      }
    }
  }
})
