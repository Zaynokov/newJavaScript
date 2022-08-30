const express = require('express');
const { writeFile, readFile } = require('fs/promises');
const cors = require('cors')
const bodyParser = require('body-parser');

const BASKET = 'static/basket-goods.json'
const ITEMS = 'static/goods.json'

function getRawBasketItems() {
    return readFile(BASKET, 'utf-8').then((text) => {
        return JSON.parse(text);
    });
}

function getItems() {
    return readFile(ITEMS, 'utf-8').then((text) => {
        return JSON.parse(text);
    });
}

function write(path, data) {
  return writeFile(path, JSON.stringify(data))
}

function getBasketItems() {
    return Promise.all([
        getRawBasketItems(),
        getItems()
    ]).then(([ rawBasketItems, items ]) => {
        return rawBasketItems.map((rawBasketItem) => {
            const { id, count } = rawBasketItem;
            const item = items.find(({ id: itemId }) => {
                return itemId === id
            });
            return {
                ...rawBasketItem, 
                data: item,
                total: count * item.price
            }
        })
    })
}

function addBasketItem(targetId) {
  return getRawBasketItems().then((basketItems) => {
    let hasItem = false;
    const newItems = basketItems.map(item => {
      if (item.id == targetId) {
        hasItem = true;
        return {
          id: item.id,
          count: item.count + 1
        }
      } else {
        return item
      }
    })
    if (!hasItem) {
      newItems.push(
        {
          id: targetId,
          count:1
        }
      )
    }
    return newItems
  }).then((data) => {
    write(BASKET, data)
    return data
  })
}

function deleteBasketItem(targetId) {
  return getRawBasketItems().then((basketItems) => {
    const newItems = basketItems.map(item => {
      if (item.id == targetId) {
        if (item.count > 1) {
          return {
            id: item.id,
            count: item.count -1
          }
        } else {
          return {}
        } 
      } else {
        return item
      }
    })
    return newItems.filter(item => {
      return !(JSON.stringify(item) === '{}')
    })
  }).then((data) => {
    write(BASKET, data)
    return data
  })
}

const app = express();

app.use(cors());
app.use(express.static('static'));
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

app.get('/basket', (req, res) => {
    getBasketItems().then((data) => {
        res.send(data)
    }) 
})

app.post('/basket', (req, res) => {
  addBasketItem(req.body.id).then((data) => {
    res.send(data)
  })
})

app.delete('/basket', (req, res) => {
  deleteBasketItem(req.body.id).then((data) => {
    res.send(data)
  })
})

app.listen(3000, () => {
    console.log('server is running')
})



