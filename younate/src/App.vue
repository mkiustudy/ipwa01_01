<template>
  <header>
    <page-navi :pages="pages"></page-navi>
  </header>
  <main>
    <div class="container overflow-auto p-5">
      <router-view></router-view>
    </div>
  </main>
  <footer class="footer mt-auto py-3 bg-dark text-light">
    <page-footer></page-footer>
  </footer>
</template>

<script>
import PageNavi from './views/PageNavi.vue'
import PageFooter from './views/PageFooter.vue'

export default {
  components: {
    PageNavi,
    PageFooter
  },
  data() {
    return {
      pages: [
        { title: 'Home', url: '/' },
        { title: 'Tablet', url: '/tablet' },
        { title: 'Impressum', url: '/impressum' },
        { title: 'Datenschutz', url: '/datenschutz' }
      ],
      formSent: false,
      formValidationError: false,
      formValidationResults: [],
      formValidationValues: []
    }
  },
  methods: {
    handleValidationResults(formSent, hasError, values, results) {
      this.formSent = formSent
      this.formValidationError = hasError
      this.formValidationValues = values
      this.formValidationResults = results
    }
  }
}
</script>
<style>
html {
  position: relative;
  min-height: 100%;
}
body {
  background-color: #deddd4 !important;
  /* Margin bottom by footer height */
  margin-bottom: 60px;
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  /* Set the fixed height of the footer here */
  height: 60px;
  line-height: 20px; /* Vertically center the text there */
  background-color: #deddd4;
}
</style>
