<template>
  <div class="cart">
    <button class="close-button" @click="$emit('closeCart')">X</button>
    <h2>Cart</h2>
    <div v-for="item in cart" :key="item.id" class="cart-item">
      <h4>{{ item.title }}</h4>
      <div class="quantity-section">
        <input 
          type="number" 
          v-model.number="item.quantity" 
          @change="updateQuantity(item.id, item.quantity)" 
          min="1"
        />
        <p>Price: ${{ (item.price / 100).toFixed(2) }} each</p>
      </div>
      <p>Total for this item: ${{ ((item.price * item.quantity) / 100).toFixed(2) }}</p>
      <button @click="removeFromCart(item.id)">Remove</button>
    </div>
    <p class="total-price">Total Price: ${{ totalPrice.toFixed(2) }} USD</p>
  </div>
</template>

<script>
import { useCartStore } from "../store";

export default {
  setup() {
    const cartStore = useCartStore();
    
    const removeFromCart = (itemId) => {
      cartStore.removeFromCart(itemId); 
    };

    const updateQuantity = (itemId, quantity) => {
      cartStore.updateQuantity(itemId, quantity);
    };

    return {
      cartStore,
      removeFromCart,
      updateQuantity,
    };
  },
  computed: {
    cart() {
      return this.cartStore.cart || [] ; // Accessing the cart from the store
    },
    totalPrice() {
      return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0) / 100;
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

.cart-item {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cart-item h4 {
  margin: 0;
}

.quantity-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.quantity-section input {
  width: 50px;
  padding: 5px;
  text-align: center;
}

.total-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #e75e2a;
  margin-top: 20px;
}
</style>
