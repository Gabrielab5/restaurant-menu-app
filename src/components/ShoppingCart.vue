<template>
  <div class="cart">
  
    <button class="close-button" @click="$emit('closeCart')">X</button>
    <h2>Cart</h2>

    <!-- Display each item in the cart -->
    <div v-for="item in cart" :key="item.uniqueIdentifier" class="cart-item">
      <h4>{{ item.title }}</h4>
      <p>{{ item.description }}</p>
      
      <div class="quantity-section">
        <!-- Quantity input for updating item quantity -->
        <input 
          type="number" 
          v-model.number="item.quantity" 
          @change="updateQuantity(item.uniqueIdentifier, item.quantity)" 
          min="1" 
        />
        <p class="item-price">Price: ${{ (item.price / 100).toFixed(2) }} each</p>
      </div>

      <!-- Display total for this item -->
      <p class="total-price">Total for this item: ${{ ((item.price * item.quantity) / 100).toFixed(2) }}</p>

      <!-- Button to remove item from the cart -->
      <button @click="removeFromCart(item.uniqueIdentifier)" class="remove-button">Remove</button>
    </div>

    <!-- Display total price for all items in the cart -->
    <p class="total-price">Total Price: ${{ totalPrice.toFixed(2) }} USD</p>
  </div>
</template>

<script>
import { useCartStore } from "../store";

export default {
  setup() {
    const cartStore = useCartStore();
    
    const removeFromCart = (uniqueIdentifier) => {
      cartStore.removeFromCart(uniqueIdentifier);
    };

    const updateQuantity = (uniqueIdentifier, quantity) => {
      cartStore.updateQuantity(uniqueIdentifier, quantity);
    };

    return {
      cartStore,
      removeFromCart,
      updateQuantity,
    };
  },
  computed: {
    // Return the cart items from the store
    cart() {
      return this.cartStore.cart || [];
    },
    // Calculate total price for all items in the cart
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

.item-price {
  font-size: 1rem;
  color: #2d6a4f; /* Deep green */
}

.total-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2d6a4f;
  margin-top: 10px;
}

.remove-button {
  background-color: #e75e2a; /* Red for removing items */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.remove-button:hover {
  background-color: #d65c2f; /* Darker red for hover effect */
}
</style>
