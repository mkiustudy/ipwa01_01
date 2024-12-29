<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img
          src="../assets/logo_small.png"
          alt="Logo"
          width="24"
          height="24"
          class="d-inline-block align-text-top"
        />
        Younate
      </a>
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleNav"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        v-bind:class="{ show: !isNavCollapsed }"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" v-for="(page, index) in pages" :key="index">
            <router-link
              class="nav-link"
              active-class="active"
              aria-current="page"
              :to="`${page.url}`"
              :title="page.title"
            >
              {{ page.title }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: ['pages'],
  data() {
    return {
      // Initialisiert das Menü als eingeklappt
      isNavCollapsed: true
    }
  },
  methods: {
    toggleNav() {
      this.isNavCollapsed = !this.isNavCollapsed
    }
  }
}
</script>


