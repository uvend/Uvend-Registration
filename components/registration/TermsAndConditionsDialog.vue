<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    @click.self="close"
  >
    <div class="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 class="text-2xl font-bold text-gray-900">U-Vend Terms and Conditions</h2>
        <button
          @click="close"
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Close"
        >
          <X class="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto p-6 space-y-6">
        <div class="prose prose-sm max-w-none">
          <p class="text-gray-700 leading-relaxed">
            <strong>U-VEND's meters are not Municipal/Eskom meters</strong> and must not be used to replace your Municipal/Eskom. Our prepaid meters are sub-meter which suited for landlords, body corporates and property management agents and must be installed after your municipal/Eskom meter. Please contact your local Municipality or Eskom office for you Municipal or Eskom meters.
          </p>

          <h3 class="text-lg font-semibold text-gray-900 mt-6 mb-3">Installation of Electricity</h3>
          <ol class="list-decimal list-inside space-y-2 text-gray-700">
            <li>These are prepaid sub-meters, and must be connected to the main supply of the house.</li>
            <li>The meter draws power from the house.</li>
            <li>Our meters cannot be used instead of, or to replace a Municipal or Eskom meter.</li>
            <li>Our meters can also not be connected directly to the municipal or Eskom supply.</li>
            <li>We recommend a qualified electrician is used to install the electricity meter.</li>
          </ol>

          <h3 class="text-lg font-semibold text-gray-900 mt-6 mb-3">Installation of Water Meters</h3>
          <ol class="list-decimal list-inside space-y-2 text-gray-700">
            <li>Our water meters can also not be used in place of, or to replace the municipal water meter.</li>
            <li>Water meters are connected inline, to whichever area you want to be on prepaid water.</li>
            <li>We recommend that a plumber be used to install the water meter.</li>
          </ol>

          <h3 class="text-lg font-semibold text-gray-900 mt-6 mb-3">Registering your meter</h3>
          <ol class="list-decimal list-inside space-y-2 text-gray-700">
            <li>To help with the tariff settings and correct refund data, it is important that the Landlord register your meter.</li>
            <li>As part of our compliance to the Protection of Personal Information act (POPI act), we only accept customer details via our registration app.</li>
            <li>Uvend accepts the registration information as submitted on the web-based registration form in good faith, and will not be responsible for any consequences due to the supply of wrong information.</li>
            <li>Please ensure that your information on our system is kept up to date. Tamper codes, payment notices, rate change notices etc., are communicated to the number supplied on registration only.</li>
            <li>We only communicate with the landlord in the case of rates adjustments, reset codes etc., or anything related to the meter.</li>
            <li>Uvend reserves the right to ask the enquirer personal details, to assess his/her authenticity in this regard.</li>
            <li>It is the landlord's responsibility to notify Uvend of any change of ownership via the Uvend registration form, as per the Uvend web-based link.</li>
            <li>Uvend will not take responsibility for any payments made to previous or past landlords, unless proper and timeous notice of change of ownership was submitted via the Uvend registration web-based process.</li>
          </ol>

          <h3 class="text-lg font-semibold text-gray-900 mt-6 mb-3">Warranty</h3>
          <p class="text-gray-700 leading-relaxed">
            Prepaid electricity/water meters carry a 12-month warranty post the installation of the meter. The warranty is based on manufacturing defects and faults due to lightning and meter abuse will be for the customer's account. Meters will be tested and repaired free of charge if found to be faulty due to manufacturing fault. Meters found to be faulty due to any other reason will be charged for the customer's account.
          </p>

          <p class="text-gray-700 leading-relaxed mt-4">
            <strong>Your registration implies your acceptance of the following terms and conditions</strong>, as they are a binding agreement between you and us.
          </p>

          <ol class="list-decimal list-inside space-y-2 text-gray-700 mt-4">
            <li>All meters fitted remain the property of UVEND until paid in full and we will not be held responsible for damages caused if the need for removal should arise.</li>
            <li>We are not responsible for damages, drilling or cutting into concealed pipes or cables or missed pipes on installation of water meters.</li>
            <li>We are not responsible for dust caused when breaking or chasing walls indoors.</li>
            <li>Additional hourly rates will be applicable on any unforeseen/undisclosed structural obstacles to installation.</li>
            <li>Any extras on this quote will be charged accordingly.</li>
            <li>Interest and other charges.</li>
            <li>Interest on overdue accounts will be charged at our banks current interest rates.</li>
            <li>You further consent to us:
              <ul class="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>At our discretion, on any overdue account, to recover said monies and interest owed to UVEND through the funds collected on your behalf through the prepaid platform.</li>
                <li>A R450.00 cancellation fee applies to all installation cancellations.</li>
                <li>UVEND is not liable for any damage to property caused by a leaking UVEND water meter.</li>
              </ul>
            </li>
          </ol>

          <h3 class="text-lg font-semibold text-gray-900 mt-6 mb-3">Refunds</h3>
          <ol class="list-decimal list-inside space-y-2 text-gray-700">
            <li>The landlord is refunded whatever is spent on the prepaid submeters on a monthly basis, less our administrative commission.</li>
            <li>Our financial month runs from the 26th of one month, to the 25th of the following month.</li>
            <li>Customers will receive their refunds between the 26th and the 30th of the month, allowing for cross bank transfers or weekend transfer delays.</li>
          </ol>

          <h3 class="text-lg font-semibold text-gray-900 mt-6 mb-3">Vending rates on meter</h3>
          <ol class="list-decimal list-inside space-y-2 text-gray-700">
            <li>Municipal water and electricity tariffs vary between municipalities. Our meters are set at a prescribed rate at which water or electricity is charged. We will adjust the tariffs when the meters are registered but cannot be held responsible for its accuracy.</li>
            <li>Uvend will not automatically adjust such rates, unless notified by the owner in writing.</li>
            <li>The onus is on the Landlord to regularly check the electricity/ water rate, by comparing their refund amounts with what they spend. We cannot be held liable if this is different to your municipal rate.</li>
            <li>We do not refund less than R50. If the refund amount for any period is less than R50, it will be carried over to the next period.</li>
          </ol>

          <h3 class="text-lg font-semibold text-gray-900 mt-6 mb-3">Porting</h3>
          <p class="text-gray-700 leading-relaxed">
            Porting is the process where the landlord moves the management of the meter from one management company to another. We subsidise the sale of our meters with the agreement that we recover the said subsidies over the first three years after purchase, from the vending. We charge a porting fee of R250 per electricity meter and R450 per water meter should you port your meter within the first three years from purchase.
          </p>

          <h3 class="text-lg font-semibold text-gray-900 mt-6 mb-3">Tariffs</h3>
          <p class="text-gray-700 leading-relaxed mb-2">The client is responsible:</p>
          <ol class="list-decimal list-inside space-y-2 text-gray-700">
            <li>for providing us with the electricity and/or water tariffs for the property and ensure that we implement annual tariff changes in compliance with regulated or approved tariffs.</li>
            <li>Notify UVEND promptly of any changes in your details on our system, particularly regarding banking details, email addresses, and telephone numbers.</li>
          </ol>

          <h3 class="text-lg font-semibold text-gray-900 mt-6 mb-3">Support</h3>
          <ol class="list-decimal list-inside space-y-2 text-gray-700">
            <li>Our call centre is available via our telephone and WhatsApp numbers from 8am to 8pm, seven days a week. The contact numbers are on the meters and meter number cards.</li>
            <li>New meters have a one year bring in guarantee from the date of first registration.</li>
            <li>The owner agrees that should we be called out to check a meter during the guarantee period, and the fault is because of customer negligence: a stopcock that was closed, or the main supply is off for whatever reason, that we will bill the customer a callout fee.</li>
          </ol>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-6 border-t border-gray-200 flex justify-end">
        <Button @click="close" class="bg-blue-600 hover:bg-blue-700 text-white">
          Close
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { X } from 'lucide-vue-next'
import Button from '~/components/ui/button.vue'
import { onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:isOpen'])

const close = () => {
  emit('update:isOpen', false)
}

const handleEscape = (event) => {
  if (event.key === 'Escape' && props.isOpen) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
.prose ol {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.prose ul {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>

