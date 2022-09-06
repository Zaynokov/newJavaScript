export const CustomInput = Vue.component('custom-input', {
    props: ['value', 'placeholder'],
    template: `
      <input
        v-bind:value="value"
        v-bind:placeholder="placeholder"
        v-on:input="$emit('input', $event.target.value)"
      >
    `
  })