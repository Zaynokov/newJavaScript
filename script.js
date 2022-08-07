const default_image = 'https://musicmarket.by/images/thumbnails/460/460/detailed/1/523DC116BE9F9A99DC3A23E0B9835581_LRG.jpg.jpg'
const goods = [
    {title: 'Yamaha', price: 150000, image: default_image},
    {title: 'Fender', price: 50000, image: default_image},
    {title: 'Ibanez', price: 350000, image: default_image},
    {title: 'Gibson', price: 250000, image: default_image},
    {title: 'Squier', price: 25000, image: default_image},
];


class GoodsItem {
  constructor({title='Гитара', price=0, image=default_image}) {
    this.title = title;
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
    this.goods = goods;
  }

  totalPrice() {
    let result = 0;
    this.goods.forEach(item => {
      result += item.price
    })
    document.querySelector('.total-price').innerHTML = 'Общая стоимость - ' + result
  }

  render() {
    let goodsList = this.goods.map((item) => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.render();
    });
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
  }
}

const goodsList = new GoodsList();

goodsList.fetchGoods()
goodsList.render()
goodsList.totalPrice()