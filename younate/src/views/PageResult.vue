<template>
  <div v-if="mailSent" class="alert alert-success" role="alert">
    <h4>Vielen Dank für deine Spende!</h4>
    <p v-if="deliveryData === 'Abholung'">
      E-Mail wurde erfolgreich an unseren Lieferanten gesendet.
    </p>
    <p v-else>Deine Spende wird gleich von unseren Mitarbeitern entgegengenommen.</p>
  </div>

  <div v-else class="alert alert-danger" role="alert">
    <h4>Da ist etwas schief gelaufen!</h4>
    <p v-if="deliveryData === 'Abholung'">
      Leider konnte deine Spendenabholung nicht per E-Mail gesendet werden. Bitte versuche
      es gleich noch einmal.
    </p>
    <p v-else>
      Bitte wende dich an einen unserer Mitarbeiter, um deine Spende abzugeben.
    </p>
  </div>

  <div class="alert alert-secondary">
    <table class="table table-borderless table-secondary">
      <thead>
        <tr>
          <td>Art der Übergabe</td>
          <td>{{ deliveryData }}</td>
        </tr>
      </thead>
      <tbody v-for="(item, key) in formData" :key="key">
        <tr v-if="item.value !== ''">
          <td>{{ key }}</td>
          <td>{{ item.value }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Registrierung am</td>
          <td>{{ datetime }}</td>
        </tr>
      </tfoot>
    </table>
    <div class="row">
      <router-link v-if="deliveryData === 'Abholung'" to="/">
        Zurück zur Startseite
      </router-link>
      <router-link v-else to="/tablet"> Zurück zur Spendenabgabe </router-link>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const formData = ref({})
const deliveryData = ref({})
let datetime = new Date().toLocaleString()
let mailSent = ref(false)
const router = useRouter()

onMounted(() => {
  const storedFormData = localStorage.getItem('formData')
  const storedDeliveryData = localStorage.getItem('selectedDelivery')
  if (storedFormData && storedDeliveryData) {
    formData.value = JSON.parse(storedFormData)
    deliveryData.value = JSON.parse(storedDeliveryData)

    //formData & selectedDelivery wieder löschen, um mehrfache Anzeige zu verhindern
    localStorage.removeItem('formData')
    localStorage.removeItem('selectedDelivery')

    mailSent = sendEmail(formData)
  } else {
    //Seite direkt verlassen, wenn illegal aufgerufen
    router.push('/')
  }
})

const sendEmail = (formData) => {
  // Dummy - Simulate sending an email
  let sendResult = true
  console.log('Email sent status:' + sendResult)
  console.log('E-Mail content' + formData)

  return sendResult
}
</script>
