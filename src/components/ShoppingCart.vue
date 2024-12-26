<template>
  <div class="cart">
    <button class="close-button" @click="$emit('closeCart')">X</button>
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

export default {
  setup() {
    const cartStore = useCartStore();
    return {
      cartStore, 
    };
  },
  methods: {
    closeCart() {
      this.$emit('closeCart'); 
    },
    removeFromCart(itemId) {
      this.cartStore.removeFromCart(itemId); 
    },
  },
};
</script>

<style scoped>
.cart {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: #fff;
  box-shadow: -4px 0 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow-y: auto;
  z-index: 1000;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
}
</style>
