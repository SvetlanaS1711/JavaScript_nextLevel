//template служит невидимой обёрткой и сам в результатах отрисовки не появляется
//v-show: элемент всегда присутствует в DOM, и только CSS-свойство переключается в зависимости от условия
//v-if: используется для рендеринга блока по условию. Блок будет отображаться только в том случае, если выражение директивы возвращает значение, приводимое к true
//v-for: для отрисовки списка элементов на основе массива данных. У директивы v-for особый синтаксис записи: item in items, где items — исходный массив, а item — ссылка на текущий элемент массива
//$emit генерация события в дочернем компоненте и обработка в родительском

Vue.component('cart', {
    props: ['cartItems', 'img', 'visibility'],
    template: `<div class="cart-block" v-show="visibility">
                <p v-if="!cartItems.length">Корзина пуста</p>
                <cart-item class="cart-item" v-for="item of cartItems"
                    :key="item.id_product"
                    :cart-item="item"
                    :img="img">
                </cart-item>
            </div>`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
                <div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">{{cartItem.product_name}}</p>
                            <p class="product-quantity">Количество: {{cartItem.quantity}}</p>
                            <p class="product-single-price">{{cartItem.price}}₽ за единицу</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">{{cartItem.quantity*cartItem.price}}₽</p>
                        <button class="del-btn" @click="$parent.$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>
    `
});

