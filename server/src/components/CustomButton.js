export const CustomButton = Vue.component('custom-button', {
    template: `
      <button class="btn btn-primary" v-on:click="$emit('click')">
        <slot></slot>
      </button>
    `
  })