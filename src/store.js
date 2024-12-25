import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [],
    menu: [],
  }),
  actions: {
    async fetchMenu() {
      const response = await fetch('/Alchemy_Menu.json');
      this.menu = await response.json();
    },
    addToCart(item) {
      const existingItem = this.cart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart(itemId) {
      this.cart = this.cart.filter((item) => item.id !== itemId);
    },
    adjustQuantity(itemId, quantity) {
      const item = this.cart.find((cartItem) => cartItem.id === itemId);
      if (item) item.quantity = quantity;
    },
  },
});
