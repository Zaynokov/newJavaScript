export const CustomHeader = Vue.component('custom-header', {
    template: `
    <div class="header">
      <h1 class="logo">Shop</h1>
      <slot></slot>
    </div>
    `
  })