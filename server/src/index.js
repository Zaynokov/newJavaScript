import './style.css';
import { BASE,GOODS, BASKET } from './constants';
import { service } from './service';
import { CustomHeader } from './components/CustomHeader';
import { CustomInput } from './components/CustomInput';
import { CustomButton } from './components/CustomButton';
import { Card } from './components/Card';
import { ItemList } from './components/ItemList';
import { Basket } from './components/Basket';

function init(){
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
}

window.onload = init