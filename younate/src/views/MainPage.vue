<template>
  <div class="row">
    <div class="col-sm-8">
      <div id="content" class="text-center">
        <component :is="currentComponent"></component>
      </div>
    </div>
    <div class="col-sm-4">
      <donate-form @validation-results="handleValidationResults"></donate-form>
    </div>
  </div>
</template>

<script>
import PageContent from './PageContent.vue'
import ImpressumContent from './ImpressumContent.vue'
import DatenschutzContent from './DatenschutzContent.vue'
import DonateForm from '../components/DonateForm.vue'

export default {
  components: {
    PageContent,
    ImpressumContent,
    DatenschutzContent,
    DonateForm
  },
  computed: {
    currentComponent() {
      const componentsMap = {
        ImpressumPage: 'ImpressumContent',
        DatenschutzPage: 'DatenschutzContent',
        default: 'PageContent'
      }
      return componentsMap[this.$route.name] || componentsMap.default
    }
  }
}
</script>
