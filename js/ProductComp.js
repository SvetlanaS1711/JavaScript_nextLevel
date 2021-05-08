//template служит невидимой обёрткой и сам в результатах отрисовки не появляется
//v-show: элемент всегда присутствует в DOM, и только CSS-свойство переключается в зависимости от условия
//v-if: используется для рендеринга блока по условию. Блок будет отображаться только в том случае, если выражение директивы возвращает значение, приводимое к true
//v-for: для отрисовки списка элементов на основе массива данных. У директивы v-for особый синтаксис записи: item in items, где items — исходный массив, а item — ссылка на текущий элемент массива
//$emit генерация события в дочернем компоненте и обработка в родительском

Vue.component('products', {
    props: ['products', 'img'],
    template: `
        <div class="products">
            <product v-for="item of products"
                :key="item.id_product"
                :img="img"
                :product="item"></product>
        </div>
    `
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `
    <div class="product-item">
                <img :src="img" alt="Some img">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}}₽</p>
                    <button class="buy-btn" @click="$parent.$emit('add-product', product)">Купить</button>
                </div>
            </div>
    `
});

