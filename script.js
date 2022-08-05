const default_image = 'https://musicmarket.by/images/thumbnails/460/460/detailed/1/523DC116BE9F9A99DC3A23E0B9835581_LRG.jpg.jpg'
const goods = [
    {title: 'Yamaha', price: 150000, image: default_image},
    {title: 'Fender', price: 50000, image: default_image},
    {title: 'Ibanez', price: 350000, image: default_image},
    {title: 'Gibson', price: 250000, image: default_image},
    {title: 'Squier', price: 25000, image: default_image},
];

const renderGoodsItem = ({title='Гитара', price='Дорого', image=default_image}) => {
    return `
    <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="${image}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">Цена: ${price}</p>
      <a href="#" class="btn btn-primary">В корзину</a>
    </div>
  </div>
    `;
};

const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item));
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
}

renderGoodsList(goods);