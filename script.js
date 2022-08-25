const BASE = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GOODS = '/catalogData.json';

function service(url) {
  return fetch(url)
    .then((res) => res.json())
}

Vue.component('custom-header', {
  template: `
  <div class="header">
    <h1 class="logo">Shop</h1>
    <slot></slot>
  </div>
  `
})

Vue.component('custom-input', {
  props: ['value', 'placeholder'],
  template: `
    <input
      v-bind:value="value"
      v-bind:placeholder="placeholder"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})

Vue.component('custom-button', {
  template: `
    <button class="btn btn-primary" v-on:click="$emit('click')">
      <slot></slot>
    </button>
  `
})

Vue.component('card', {
  props: ['item', 'image'],
  template: `
  <div class="card" style="width: 18rem;">
    <img class="card-img-top" :src="image" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">{{ item.product_name }}</h5>
      <p class="card-text">Цена: {{item.price }}</p>
      <a href="#" class="btn btn-primary">В корзину</a>
    </div>
  </div>
`
})

Vue.component('item-list', {
  template: `
    <div>
      <slot></slot>
    </div>
  `
})

Vue.component('basket', {
  template: `
    <div>
    </div>
  `
})

const app = new Vue({
  el: '#app',
  data: {
    items: [],
    filteredItems: [],
    itemsInBasket: [],
    image: 'https://www.calltekky.com/wp-content/uploads/2019/06/Peripheral-Devices-Services.jpg',
    search: '',
    isVisibleCart: false
  },

  methods: {
    fetchGoods() {
      return service(BASE + GOODS).then((data) => {
        this.items = data;
        this.filteredItems = data;
      })
    },

    switchBasketCatalog() {
      this.isVisibleCart = !this.isVisibleCart;
    },

    filterItems() {
      this.filteredItems = this.items.filter(({ product_name }) => {
        return product_name.match(new RegExp(this.search, 'gui'))
      })
    },

    totalPrice(items) {
      return items.reduce((prev, { price }) => {
        return prev + price
      }, 0)
    }
  },

  mounted() {
    this.fetchGoods();
  }
})