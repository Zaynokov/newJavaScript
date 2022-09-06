export const Card = Vue.component('card', {
    props: ['item', 'image'],
    template: `
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" :src="image" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">{{ item.product_name }}</h5>
        <p class="card-text">Цена: {{item.price }}</p>
        <custom-button @click="addItem">В корзину</custom-button>
      </div>
    </div>
    `,
    methods: {
      addItem() {
        service(BASE + BASKET, 'POST', { id: this.item.id })
      }
    }
  })