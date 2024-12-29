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
      // Mapping der Seitentitel in der Navigation zu den Routing URLs
      pages: [
        { title: 'Home', url: '/' },
        { title: 'Tablet', url: '/tablet' },
        { title: 'Impressum', url: '/impressum' },
        { title: 'Datenschutz', url: '/datenschutz' }
      ],
      // Formularvariablen initialisieren
      formSent: false,
      formValidationError: false,
      formValidationResults: [],
      formValidationValues: []
    }
  },
  methods: {
    // Formularvalidierung abfangen
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
  /* Margin bottom für den dunklen Footer*/
  margin-bottom: 60px;
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  /* Fixe höhe für den Footer */
  height: 60px;
  line-height: 20px;
  background-color: #deddd4;
}
</style>
