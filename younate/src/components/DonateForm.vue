<template>
  <div class="card border-info" id="donateForm">
    <div class="card-header bg-info">{{ formTitel }}</div>
    <div class="card-body">
      <form @submit.prevent="handleSubmit" class="form-floating">
        <!-- Art der Übergabe-->
        <div class="containter">
          <div class="row">
            <div
              class="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                class="btn-check"
                name="btn_abholung"
                id="btn_abholung"
                autocomplete="off"
                value="Abholung"
                v-model="selectedDelivery.value"
                :checked="selectedDelivery.value === 'Abholung'"
              />
              <label class="btn btn-outline-secondary" for="btn_abholung"
                >Abholung zuhause</label
              >

              <input
                type="radio"
                class="btn-check"
                name="btn_abgabe"
                id="btn_abgabe"
                autocomplete="off"
                v-model="selectedDelivery.value"
                value="Abgabe"
                :checked="selectedDelivery.value === 'Abgabe'"
              />
              <label class="btn btn-outline-secondary" for="btn_abgabe"
                >Abgabe vor Ort</label
              >
            </div>
          </div>
          <div class="row">
            <div
              v-for="field in formFields"
              :key="field.title"
              class="col-12 col-md-6 mt-3"
            >
              <div
                v-if="
                  field.delivery === selectedDelivery.value || field.delivery === 'Alle'
                "
              >
                <span v-if="!field.validationResult" class="error" style="color: red">
                  {{ field.errorMessage }}
                </span>
                <div class="form-floating">
                  <input
                    v-if="!field.options"
                    v-model="field.value"
                    :placeholder="field.title"
                    :maxlength="field.maxlength"
                    type="input"
                    class="form-control"
                  />
                  <label
                    v-if="!field.options"
                    class="floatingInputGrid"
                    :for="field.title"
                    >{{ field.title }}</label
                  >
                  <select v-else v-model="field.value" class="form-select">
                    <option
                      v-for="(optionValue, optionLabel) in field.options"
                      :value="optionValue"
                      :key="optionLabel"
                    >
                      {{ optionValue }}
                    </option>
                  </select>
                  <label v-if="field.options" class="floatingSelect" :for="field.title">{{
                    field.title
                  }}</label>
                </div>
              </div>
            </div>
          </div>
          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-success mt-3">
              {{ selectedDelivery.value }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
/**
 * Arraykonfiguration für die Formularfelder um das Template generisch zu halten.
 *
 * Jedes Objekt im Array enthält die folgenden Eigenschaften:
 * - validationRegex: Regular Expression zur validierung der Eingabe
 * - validationResult: Boolean, der angibt, ob das Feld den Validierungstest bestanden hat.
 * - title: Label des Formularfelds.
 * - options: Optionen für ein Dropdown-Feld (nur für Dropdown-Felder).
 *            Wenn options verwendet wird, wird das Feld als Dropdown-Feld gerendert.
 * - value: Der aktuelle Inputwert
 * - errorMessage: Fehlermeldung, die angezeigt wird, wenn das Feld den Validierungstest nicht besteht.
 * - maxlength: Maximale Länge des Feldwerts (Nur für Input-Felder).
 */

/*
Übersetzung der Regular Expressions:

|-------------------------------|-------------------------------------------------------------------|-------------------------|
| RegEx                         | Bedeutung                                                         | Anwendung               |
|-------------------------------|-------------------------------------------------------------------|-------------------------|
| /.+/                          | mindestens ein Zeichen (auch Leerzeichen)                         | Dropdown-Felder         |
| /^[a-zA-Z\s-äöüÄÖÜß]+$/       | mindestens ein Buchstabe, Leerzeichen, -, ß oder Umlaut           | Vorname, Nachname, Ort  |
| /^[a-zA-Z\s\d\-\.äöüÄÖÜß]+$/  | mindestens ein Buchstabe, Leerzeichen, Zahl, -, ., ß oder Umlaut  | Straße                  |
| /^(?=.*\d)[a-zA-Z\d\s\W]+$/   | mindestens ein Buchstabe, Leerzeichen, Zahl oder Sonderzeichen    | Hausnummer              |
| /^04[0-9]{3}$/                | 5 Zahlen, beginnend mit dem Bereich 04                            | PLZ                     |
|-------------------------------|-------------------------------------------------------------------|-------------------------|
*/

/* JSON Files mit den Dropdown-Optionen für Kleidung und Krisengebiete */
import clothingOptions from '../assets/clothing.json'
import locationOptions from '../assets/locations.json'

const formFields = reactive([
  {
    validationRegex: /.+/,
    validationResult: true,
    title: 'Art der Kleidung',
    options: clothingOptions,
    value: '',
    errorMessage: 'Kleidung wählen',
    delivery: 'Alle'
  }, // Art der Kleidung
  {
    validationRegex: /.+/,
    validationResult: true,
    title: 'Krisengebiet',
    options: locationOptions,
    value: '',
    errorMessage: 'Krisengebiet wählen',
    delivery: 'Alle'
  }, // Krisengebiet
  {
    validationRegex: /^[a-zA-Z\s-äöüÄÖÜß]+$/,
    validationResult: true,
    title: 'Vorname',
    value: '',
    maxlength: 50,
    errorMessage: 'Vornamen eingeben',
    delivery: 'Abholung'
  }, // Vorname
  {
    validationRegex: /^[a-zA-Z\s-äöüÄÖÜß]+$/,
    validationResult: true,
    title: 'Nachname',
    value: '',
    maxlength: 50,
    errorMessage: 'Nachnamen eingeben',
    delivery: 'Abholung'
  }, // Nachname
  {
    validationRegex: /^[a-zA-Z\s\d\-äöüÄÖÜß.]+$/,
    validationResult: true,
    title: 'Straße',
    value: '',
    maxlength: 50,
    errorMessage: 'Straße eingeben',
    delivery: 'Abholung'
  }, // Straße
  {
    validationRegex: /^(?=.*\d)[a-zA-Z\d\s\W]+$/,
    validationResult: true,
    title: 'Hausnummer',
    value: '',
    maxlength: 10,
    errorMessage: 'Hausnummer eingeben',
    delivery: 'Abholung'
  }, // Hausnummer
  {
    validationRegex: /^04[0-9]{3}$/,
    validationResult: true,
    title: 'PLZ',
    value: '',
    maxlength: 5,
    errorMessage: 'Abholung nur im PLZ Bereich 04xxx möglich.',
    delivery: 'Abholung'
  }, // PLZ
  {
    validationRegex: /^[a-zA-Z\s-äöüÄÖÜß]+$/,
    validationResult: true,
    title: 'Ort',
    value: '',
    maxlength: 50,
    errorMessage: 'Ort eingeben',
    delivery: 'Abholung'
  } // Ort
])

let selectedDelivery = reactive({
  value: router.currentRoute.value.path === '/tablet' ? 'Abgabe' : 'Abholung'
})

let formTitel = 'Spende jetzt!'

/**
 * Bereinigt den Eingabewert, um HTML-Injections vorzubeugen
 * @param {string} value - Der Eingabewert, der gesäubert werden soll.
 * @returns {string} - Der gesäuberte Eingabewert.
 */
const sanitizeInput = (value) => {
  const div = document.createElement('div')
  value = value.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  div.textContent = value
  return div.innerHTML.trim()
}

/**
 * Validiert die Formularfelder per Regular Expression
 * speichert das Ergebnis in der validationResult-Eigenschaft jedes Formularfelds.
 * @returns {boolean} - True, wenn alle Formularfelder die Validierung bestehen, sonst false.
 */
const validateForm = () => {
  let isValid = true
  formFields.forEach((field) => {
    if (field.delivery === 'Alle' || field.delivery === selectedDelivery.value) {
      const sanitizedValue = sanitizeInput(field.value)
      field.value = sanitizedValue
      field.validationResult = field.validationRegex.test(sanitizedValue)
      if (!field.validationResult) {
        isValid = false
      }
    }
  })
  return isValid
}

/**
 * Formularübermittlungsfunktion
 * - validiert die Formularfelder validiert
 * - leitet die Daten an die Ergebnisseite weiter, wenn die Validierung erfolgreich ist
 *
 * @returns {void}
 */
const handleSubmit = () => {
  const isValid = validateForm()
  if (isValid) {
    const formData = formFields.reduce((acc, field) => {
      acc[field.title] = {
        value: field.value,
        delivery: field.delivery
      }
      return acc
    }, {})
    //Daten im localStorage speichern
    localStorage.setItem('selectedDelivery', JSON.stringify(selectedDelivery.value))
    localStorage.setItem('formData', JSON.stringify(formData))
    router.push({ name: 'result' })
  }
}
</script>
