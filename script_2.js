'use strict';

/*
//1. Добавьте пустые классы для корзины товаров и элемента корзины товаров. Продумайте, какие методы понадобятся для работы с этими сущностями.

// класс элемента корзины
// по сути, нам нужно отображать в корзине те же самые элементы, что и в ProductItem/ProductList + можно добавить параметр количество + ссылку на товар (или сделать ссылку через title или img товара)

class CartItem {
    constructor(product, img = 'https://via.placeholder.com/200x150', link) {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
        this.quantity = quantity;
        this.link = link;
    }

    //Отрисовка элемента корзины, по факту может быть аналогичная ProductItem
    render() {
    }
}

// класс корзины
class Cart {
    constructor() {
        // В классе корзины массив с добавленными товарами покупателя (пустой массив, куда будут скидываться выбранные покупателем товары)
        this.addProduct = [];
    }

    // Добавление товара в корзину по нажатию кнопки onClick + внутри данного метода добавить метод проверки наличия товара в магазине
    addToCart() { }

    // Удаление товара из корзины по нажатию кнопки onClick
    deleteFromCart() { }

    // Продолжить покупки,вернуться в каталог
    returnToCatalog() { }

    // Итоговый подсчет количества и стоимости товаров в корзине
    calcProductsInCart() { }

    // Проверка авторизации покупателя
    checkAuthorization() { }

    // Метод, который проверяет, добавлены ли в корзину какие-либо товары и при их наличии активирует кнопку "Оформить заказ" и переправляет далее на платежную систему
    isOrder() { }
}
*/


class ProductList {
    constructor(container = ".products") {
        this.container = container;
        // массив для хранения информации, сюда будут прилетать данные, с которыми будем работать => кэш данных)
        this._goods = [];
        // экземпляры классов, актульное состояние товаров (сюда добавляется товар => хранилище товаров)
        this._allProducts = [];

        this._fetchGoods();
        this._render();
    }

    /*
    sum метод, определяющий суммарную стоимость всех товаров
    reduce(): работа с элементами с сохранением промежуточного результата
    деструктуризация, извлечениу свойств из объектов
    */
    sum() {
        return this._goods.reduce((sum, { price }) => sum + price, 0);
    }

    _fetchGoods() {
        this._goods = [
            { id: 11111, title: 'Процессор', price: 16000 },
            { id: 22222, title: 'Видеокарта', price: 30000 },
            { id: 33333, title: 'Жесткий диск', price: 3000 },
            { id: 44444, title: 'Оперативная память', price: 2500 },
            { id: 55555, title: 'Материнская плата', price: 8000 },
        ];
    }

    _render() {
        const block = document.querySelector(this.container);

        for (const good of this._goods) {
            const productObject = new ProductItem(good);
            this._allProducts.push(productObject);
            block.insertAdjacentHTML('afterbegin', productObject.render());
        }
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                    <img src="${this.img}" alt="Product img">
                    <div class="product-description">
                        <h3 class="product-title">${this.title}</h3>
                        <p><b>Код товара:</b> ${this.id}</p>
                        <p><b>Стоимость товара:</b> ${this.price} \u20bd</p>
                        <button class="by-button">Купить</button>  
                    </div>
                </div>`
    }
}

new ProductList();