<template>
  <div class="overlay show" id="modal-cart">
    <div class="modal">
      <header class="modal-header">
        <h2 class="modal-title">Cart</h2>
        <button class="modal-close" @click="closeCart()">x</button>
      </header>
      <table class="cart-table">
        <colgroup>
          <col class="col-goods" />
          <col class="col-price" />
          <col class="col-minus" />
          <col class="col-qty" />
          <col class="col-plus" />
          <col class="col-total-price" />
          <col class="col-delete" />
        </colgroup>
        <thead>
          <tr>
            <th>Good(s)</th>
            <th>Price</th>
            <th colspan="3">Qty.</th>
            <th colspan="2">Total</th>
          </tr>
        </thead>
        <tbody class="cart-table__goods">
          <tr
            class="cart-item"
            v-for="cartItem in cart"
            :key="cartItem.id"
          >
            <td>{{ cartItem.name }}</td>
            <td>{{ cartItem.price }}$</td>
            <td>
              <button
                class="cart-btn-minus"
                @click="minusCartItem(cartItem.id)"
              >
                -
              </button>
            </td>
            <td>{{ cartItem.count }}</td>
            <td>
              <button class="cart-btn-plus" @click="plusCartItem(cartItem.id)">
                +
              </button>
            </td>
            <td>{{ cartItem.price * cartItem.count }}</td>
            <td>
              <button class="cart-btn-delete" @click="remove(cartItem.id)">
                x
              </button>
            </td>
          </tr>
          <tr v-if="!cart.length">
            <td colspan="7" class="cart-empty">Корзина пуста</td>
          </tr>
        </tbody>
        <tfoot v-if="cart.length">
          <tr>
            <th colspan=" 5">Total:</th>
            <th class="card-table__total" colspan="2">{{ total }}$</th>
          </tr>
        </tfoot >
      </table>
      <form class="modal-form" action="">
        <input
          class="modal-input"
          type="text"
          placeholder="Имя"
          name="nameCustomer"
        />
        <input
          class="modal-input"
          type="text"
          placeholder="Телефон"
          name="phoneCustomer"
        />
        <button class="button cart-buy" type="submit">
          <span class="button-text">Checkout</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
const viewCart = useViewCart();
const cart = useCart();
const total = computed(() =>
  cart.value.reduce((sum, item) => {
    return sum + item.price * item.count;
  }, 0),
);

const closeCart = () => {
  viewCart.value = false;
};

const plusCartItem = (id) => {
  const itemFind = cart.value.find((c) => c.id === id);
  console.log(itemFind);
  if (itemFind) {
    itemFind.count++;
  }
};

const minusCartItem = (id) => {
  const itemFind = cart.value.find((c) => c.id === id);
  if (itemFind && itemFind.count > 1) {
    itemFind.count--;
  }
};

const remove = (id) => {
  cart.value = cart.value.filter((c) => c.id !== id);
};
</script>
