<template>
  <div class="row">
    <div class="col-sm-12">
      <donate-form @validation-results="handleValidationResults"></donate-form>
    </div>
  </div>
</template>

<script>
import DonateForm from '../components/DonateForm.vue'

export default {
  components: {
    DonateForm
  },
  created() {
    //this.$route.params
  }
}
</script>
