'use strict';

// Определим массив со списком товаров. Для каждого товара определим артикул, наименование и цену
const goods = [
    { id_product: 11111, title: 'Процессор', price: 16000 },
    { id_product: 22222, title: 'Видеокарта', price: 30000 },
    { id_product: 33333, title: 'Жесткий диск', price: 3000 },
    { id_product: 44444, title: 'Оперативная память', price: 2500 },
    { id_product: 55555, title: 'Материнская плата', price: 8000 },
];

// Создадим функцию, которая будет возвращать разметку для конкретного товара, подставляя его артикул, название и цену
/*
const renderGoodItem = (id_product, title, price) => {
    return `<div class="good-item">
            <h3 class="good-title">Наименование товара: ${title}</h3>
            <p><b>Код товара:</b> ${id_product}</p>
            <p><b>Стоимость товара:</b> ${price} ₽</p>
            <button class="by-button">Добавить в корзину</button>
            </div>`;
}

// Создадим функцию, которая будет собирать все товары в один список и запсывать его в контейнер .goods-list
// Метод map() создаёт новый массив с результатом вызова указанной функции для каждого элемента массива
// Установка параметра innerHTML string преобразует массив в строку, разделенную запятыми; разделитель запятых используется по умолчанию для параметра Array.prototype.toString
// Метод join() позволяет преобразовать и объединить все элементы массива в одно строковое значение. По умолчанию, элементы массива будут разделены запятой, это поведение можно изменить передав в качестве параметра метода значение, которое будет использовано в качестве разделителя.
const renderGoodsList = (list) => {
    const goodsListHTML = list.map((item) => renderGoodItem(item.id_product, item.title, item.price));
    //console.log(goodsListHTML);
    document.querySelector('.goods-list').innerHTML = goodsListHTML.join(' ');
}

renderGoodsList(goods);
*/

// Создадим функцию, которая будет возвращать разметку для конкретного товара, подставляя его артикул, название и цену

const renderGoodItem = (item, img = 'https://via.placeholder.com/200x150') => {
    return `<div class="good-item">
                <img src="${img}" alt="Good image">
                <div class="good-description">
                    <h3 class="good-title">${item.title}</h3>
                    <p><b>Код товара:</b> ${item.id_product}</p>
                    <p><b>Стоимость товара:</b> ${item.price} \u20bd</p>
                    <button class="by-button">Купить</button>
                </div>
            </div>`;
}

// Создадим функцию, которая будет собирать все товары в один список и запсывать его в контейнер .goods-list
// Метод map() создаёт новый массив с результатом вызова указанной функции для каждого элемента массива
// Установка параметра innerHTML string преобразует массив в строку, разделенную запятыми; разделитель запятых используется по умолчанию для параметра Array.prototype.toString
// Метод join() позволяет преобразовать и объединить все элементы массива в одно строковое значение. По умолчанию, элементы массива будут разделены запятой, это поведение можно изменить передав в качестве параметра метода значение, которое будет использовано в качестве разделителя.
const renderGoodsList = (list) => {
    document.querySelector('.goods-list').insertAdjacentHTML('beforeend', list.map((item) => renderGoodItem(item)).join(' '));
}

renderGoodsList(goods);
