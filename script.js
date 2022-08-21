const BASE = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GOODS = '/catalogData.json';

function service(url) {
  return fetch(url)
    .then((res) => res.json())
}

const app = new Vue({
  el: '#app',

  data: {
    items: [],
    itemsInBasket: [],
    default_image: 'https://www.calltekky.com/wp-content/uploads/2019/06/Peripheral-Devices-Services.jpg',
    search: '',
    isVisibleCart: false
  },

  methods: {
    fetchGoods() {
      return service(BASE + GOODS).then((data) => {
        this.items = data;
      })
    },

    showBasket() {
      this.isVisibleCart = true;
    },

    showCatalog() {
      this.isVisibleCart = false;
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
}
)




class GoodsItem {
  constructor({ product_name = 'Гитара', price = 0, image = default_image }) {
    this.title = product_name;
    this.price = price;
    this.image = image;
  }

  render() {
    return `
    <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="${this.image}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${this.title}</h5>
      <p class="card-text">Цена: ${this.price}</p>
      <a href="#" class="btn btn-primary">В корзину</a>
    </div>
  </div>
    `;
  }
}

class GoodsList {

  goods = [];

  fetchGoods() {
    return service(BASE + GOODS).then((data) => {
      this.goods = data;
    })
  }

  totalPrice() {
    return this.goods.reduce((prev, { price }) => {
      return prev + price
    }, 0)
  }

  render() {
    let goodsList = this.goods.map((item) => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.render();
    });
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
    document.querySelector('.total-price').innerHTML = `Общая стоимость - ${this.totalPrice()}`
  }
}

const goodsList = new GoodsList();

// goodsList.fetchGoods().then(() => {
//   goodsList.render()
// })
