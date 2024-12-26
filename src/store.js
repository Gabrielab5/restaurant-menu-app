import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [],
  }),

  actions: {
    /**
     * Adds an item to the cart.
     * If the item already exists, it will increment the quantity.
     * If it doesn't exist, it will add it as a new item with quantity 1.
     */
    addToCart(item) {
      // Check if the item is already in the cart based on the id + name
      const existingItem = this.cart.find(
        (cartItem) => cartItem.id === item.id && cartItem.name === item.name
      );

      if (existingItem) {
        // Increase the quantity if it exists
        existingItem.quantity++;
      } else {
        // Add the new item if it doesn't exist yet
        this.cart.push({ ...item, quantity: 1 });
      }
    },

    /**
     * Removes an item from the cart by its ID.
     */
    removeFromCart(itemId) {
      this.cart = this.cart.filter((item) => item.id !== itemId);
    },

    /**
     * Updates the quantity of an item in the cart.
     */
    updateQuantity(itemId, quantity) {
      const item = this.cart.find(cartItem => cartItem.id === itemId);
      if (item && quantity > 0) {
        item.quantity = quantity;
      } else if (quantity <= 0) {
        this.removeFromCart(itemId);  // Remove item if quantity is 0 or less
      }
    },
  },
});
