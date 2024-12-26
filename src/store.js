import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [],  // This will store all the unique items in the cart
  }),

  actions: {
    /**
     * Adds an item to the cart.
     * If the item already exists, it will increment the quantity.
     * If it doesn't exist, it will add it as a new item with quantity 1.
     */
    addToCart(item) {
      // Use title + category as unique identifier to ensure each item is treated separately
      const uniqueIdentifier = item.title + item.category;
      const existingItem = this.cart.find(
        (cartItem) => cartItem.uniqueIdentifier === uniqueIdentifier
      );

      if (existingItem) {
        // If it exists, increment the quantity
        existingItem.quantity++;
      } else {
        // If it doesn't exist, add the item as a new entry with quantity 1
        this.cart.push({ ...item, quantity: 1, uniqueIdentifier });
      }
    },

    /**
     * Removes an item from the cart by its unique identifier.
     */
    removeFromCart(uniqueIdentifier) {
      this.cart = this.cart.filter((item) => item.uniqueIdentifier !== uniqueIdentifier);
    },

    /**
     * Updates the quantity of an item in the cart.
     */
    updateQuantity(uniqueIdentifier, quantity) {
      const item = this.cart.find(cartItem => cartItem.uniqueIdentifier === uniqueIdentifier);
      if (item && quantity > 0) {
        item.quantity = quantity;  // Update the quantity of the item
      } else if (quantity <= 0) {
        this.removeFromCart(uniqueIdentifier);  // Remove item if quantity is 0 or negative
      }
    },
  },
});

