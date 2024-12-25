<template>
  <div class="cart">
    <h2>Cart</h2>
    <div v-for="item in cart" :key="item.id" class="cart-item">
      <h4>{{ item.title }}</h4>
      <input type="number" v-model.number="item.quantity" @change="updateQuantity(item.id, item.quantity)" />
      <button @click="removeFromCart(item.id)">Remove</button>
    </div>
    <p>Total: {{ totalPrice }} USD</p>
  </div>
</template>

<script>
import { useCartStore } from "../store";
import { computed } from 'vue'; 
export default {
  name: "ShoppingCart",
  setup() {
    const store = useCartStore();
    const cart = computed(() => store.cart);
    const totalPrice = computed(() =>
      store.cart.reduce((total, item) => total + item.quantity * item.price, 0) / 100
    );
    const removeFromCart = (itemId) => store.removeFromCart(itemId);
    const updateQuantity = (itemId, quantity) => store.adjustQuantity(itemId, quantity);

    return { cart, totalPrice, removeFromCart, updateQuantity };
  },
};
</script>
