const createStore = require('vuex');

const store = createStore({
  state: {
    cart: [],
  },
  mutations: {
    addToCart(state, item) {
      const existingItem = state.cart.find(cartItem => cartItem.title === item.title);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart(state, index) {
      state.cart.splice(index, 1);
    },
  },
  getters: {
    cartItems: state => state.cart,
    totalPrice: state => (state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0) / 100).toFixed(2),
  },
});
export default store;
