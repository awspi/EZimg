<template>
  <div>
    <!-- PC   -->
    <pc-payment-vue v-if="!isMobileTerminal" :payData="payData"></pc-payment-vue>
    <!-- Mobile  -->
    <mobile-payment-vue v-else :payData="payData"></mobile-payment-vue>
  </div>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible';
import pcPaymentVue from './pc-payment/index.vue'
import mobilePaymentVue from './mobile-payment/index.vue'
//
const props = defineProps({
  payData: {
    required: true,
    type: Object
  }
})
</script>

<style lang="scss" scoped>
</style>
