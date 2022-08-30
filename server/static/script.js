const BASE = 'http://localhost:3000';
const GOODS = '/goods.json';
const BASKET = '/basket';

function service(url, method = 'GET', body) {
  return fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
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

Vue.component('item-list', {
  template: `
    <div>
      <slot></slot>
    </div>
  `
})

Vue.component('basket', {
  data() {
    return {
      itemsInBasket: []
    }
  },
  props: ['image'],
  template: `
    <div>
      <item-list v-for="item in itemsInBasket" :key="item.id">
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" :src="image" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">{{ item.data.product_name }}</h5>
          <p class="card-text">Количество: {{item.count }}</p>
          <p class="card-text">Цена: {{item.data.price }}</p>
          <p class="card-text">Общая цена: {{item.total }}</p>
          <custom-button @click="addItem(item.id)">Добавить</custom-button>
          <custom-button @click="deleteItem(item.id)">Удалить</custom-button>
        </div>
        </div>
      </item-list>
    </div>
  `,
  methods: {
    addItem(id) {
      service(BASE + BASKET, 'POST', { id: id }).then(() => {
        service(BASE + BASKET).then((data) => {
          this.itemsInBasket = data;
        })
      })
    },
    deleteItem(id) {
      service(BASE + BASKET, 'DELETE', { id: id }).then(() => {
        service(BASE + BASKET).then((data) => {
          this.itemsInBasket = data;
        })
      })
    }
  },
  mounted() {
    service(BASE + BASKET).then((data) => {
      this.itemsInBasket = data;
    })
  },
})

const app = new Vue({
  el: '#app',
  data: {
    items: [],
    filteredItems: [],
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