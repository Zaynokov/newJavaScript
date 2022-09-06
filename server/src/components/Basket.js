export const Basket = Vue.component('basket', {
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