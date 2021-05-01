'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Переделать в ДЗ не использовать fetch а Promise

// Используется принцип callback - функция обратного вызова
// Для отправки запросов в браузер встроен объект XMLHttpRequest
// Чтобы определить, куда отправить запрос, используется метод .open()
// Первый параметр - тип запроса
// Второй параметр - адрес ресурса
// Третий параметр - указатель асинхронности
// Если указатель асинхронности выставлен в true, то запрос не будет блокировать выполнение других скриптов на странице
// Чтобы поймать момент, когда ответ от сервиса получен, можно воспользоваться свойством onreadystatechange
// 4 – запрос выполнен
// Статус запроса хранится в xhr.status. По коду статуса можно понять, что ответил сервер: 200 – запрос выполнен успешно.
// xhr.responseText   // Текстовая строка
// xhr.responseXML    // XMLDocument
/*
let getRequest = (url, cb) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status !== 200) {
                console.log('Error');
            } else {
                cb(xhr.responseText);
            }
        }
    };
    xhr.send();
};
*/

// Функция запроса / ответа  getRequest на промисах
// Promise – это специальный объект, который находится в одном из трёх состояний: pending («ожидание»), fulfilled («выполнено успешно») и rejected («выполнено с ошибкой»). При создании промиса нужно указать два колбэка – для успешного выполнения и для ошибки
// Чтобы снабдить функцию функциональностью промисов, нужно просто вернуть в ней объект

/*
let getRequest = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    reject('Error');
                } else {
                    resolve(xhr.responseText);
                }
            }
        };
        xhr.send();
    })
};
*/

// Описываем классы методы добавления товара в корзину, удаления товара из корзины и получения списка товаров корзины

// Описываем базовые классы

class List {
    constructor(url, container, list = listContext) {
        this.container = container;
        this.list = list; // словарь для классов
        this.url = url;
        this.goods = [];
        this.allProducts = [];
        this.filtered = []; // отфильтрованные товары
        this._init();
    }

    // Получение данных с сервера
    // Fetch API предоставляет интерфейс JavaScript для работы с запросами и ответами HTTP. Он также предоставляет глобальный метод fetch() (en-US), который позволяет легко и логично получать ресурсы по сети асинхронно
    // url – URL для отправки запроса
    // options – дополнительные параметры: метод, заголовки и так далее

    getJson(url) {
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    // Обработка результата data (запроса/полученных данных)

    handleData(data) {
        this.goods = data;
        this.render();
    }

    // Подсчет стоимости всех товаров calcSum

    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            console.log(this.constructor.name);
            const productObj = new this.list[this.constructor.name](product);


            if (!productObj) return;

            console.log(productObj);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }


    // Поиск товаров (регулярки)
    // value - поисковый запрос

    filter(value) {
        const regexp = new RegExp(value, 'i'); //
        this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
        this.allProducts.forEach(el => {
            const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
            if (!this.filtered.includes(el)) {
                block.classList.add('invisible');
            } else {
                block.classList.remove('invisible');
            }
        })
    }
    _init() {
        return false
    }
}

class Item {
    constructor(el, img = 'https://via.placeholder.com/200x150') {
        this.product_name = el.product_name;
        this.price = el.price;
        this.id_product = el.id_product;
        this.img = img;
    }
    render() {
        return ``;
    }
}


// Наследование от базовых классов


class ProductsList extends List {
    constructor(cart, container = '.products', url = "/catalogData.json") {
        super(url, container);
        this.cart = cart;
        this.getJson()
            .then(data => this.handleData(data));
    }

    _init() {
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('buy-btn')) {
                this.cart.addProduct(e.target);
            }
        });
        document.querySelector('.search-form').addEventListener('submit', e => {
            e.preventDefault();
            this.filter(document.querySelector('.search-field').value);
        })
    }
}


class ProductItem extends Item {
    render() {
        return `<div class="product-item" data-id="${this.id_product}">
                  <img src="${this.img}" alt="Some img">
                  <div class="desc">
                      <h3>${this.product_name}</h3>
                      <p>${this.price} ₽</p>
                      <button class="buy-btn"
                        data-id="${this.id_product}"
                        data-name="${this.product_name}"
                        data-price="${this.price}">Купить</button>
                  </div>
              </div>`;
    }
}

class Cart extends List {
    constructor(container = ".cart-block", url = "/getBasket.json") {
        super(url, container);
        this.getJson()
            .then(data => {
                this.handleData(data.contents);
            });
    }


    // Добавление товара

    addProduct(element) {
        this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if (find) {
                        find.quantity++;
                        this._updateCart(find);
                    } else {
                        let product = {
                            id_product: productId,
                            price: +element.dataset['price'],
                            product_name: element.dataset['name'],
                            quantity: 1
                        };

                        this.goods = [product];

                        this.render();
                    }
                } else {
                    alert('Error');
                }
            })
    }


    // Удаление товара

    removeProduct(element) {
        this.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if (find.quantity > 1) { // если товара > 1, то уменьшаем количество на 1
                        find.quantity--;
                        this._updateCart(find);
                    } else { // удаляем
                        this.allProducts.splice(this.allProducts.indexOf(find), 1);
                        document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
                    }
                } else {
                    alert('Error');
                }
            })
    }


    // Обновление данных корзины

    _updateCart(product) {
        let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
        block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
        block.querySelector('.product-price').textContent = `${product.quantity * product.price} ₽`;
    }
    _init() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('del-btn')) {
                this.removeProduct(e.target);
            }
        })
    }

}


class CartItem extends Item {
    constructor(el, img = 'https://via.placeholder.com/50x100') {
        super(el, img);
        this.quantity = el.quantity;
    }
    render() {
        return `<div class="cart-item" data-id="${this.id_product}">
                  <div class="product-bio">
                  <img src="${this.img}" alt="Some image">
                  <div class="product-desc">
                  <p class="product-title">${this.product_name}</p>
                  <p class="product-quantity">Количество: ${this.quantity}</p>
              <p class="product-single-price">${this.price} за ед.</p>
              </div>
              </div>
              <div class="right-block">
                  <p class="product-price">${this.quantity * this.price} ₽</p>
                  <button class="del-btn" data-id="${this.id_product}">&times;</button>
              </div>
              </div>`
    }
}

const listContext = {
    ProductsList: ProductItem,
    Cart: CartItem
};

new ProductsList(new Cart());