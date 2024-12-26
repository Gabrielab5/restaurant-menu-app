import { defineStore } from 'pinia';
import { fetchMenuData } from './services/menuService.js';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [],
    menu: [],
  }),
  actions: {
      /**
         * Loads menu data into the state.
         * @returns {Promise<void>} Resolves when the data is loaded.
         */
    async fetchMenu() {
      try {
        this.menu = await fetchMenuData();
      } catch (error) {
        console.error('Failed to fetch menu:', error);
      }
    },
    /**
         * Adds an item to the cart.
         * @param {Object} item - The item to add.
         */
    addToCart(item) {
      const existingItem = this.cart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({ ...item, quantity: 1 });
      }
    },
     /**
         * Removes an item from the cart.
         * @param {number} itemId - The ID of the item to remove.
         */
    removeFromCart(itemId) {
      this.cart = this.cart.filter((item) => item.id !== itemId);
    },
    /**
         * Adjusts the quantity of an item in the cart.
         * @param {number} itemId - The ID of the item to adjust.
         * @param {number} quantity - The new quantity.
         */
    adjustQuantity(itemId, quantity) {
      const cartItem = this.cart.find((cartItem) => cartItem.id === itemId);
      if (cartItem) {
        if (quantity <= 0) {
            this.removeFromCart(itemId);
        } else {
            cartItem.quantity = quantity;
        }
      }
    },
     /**
     * Clears the cart.
     */
    clearCart() {
      this.cart = [];
    },
  },
});
