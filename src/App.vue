<template>
  <div>
    <h1>{{ restaurant.name }}</h1>
    <p>{{ restaurant.description }}</p>
    <div v-for="category in menu" :key="category.category">
      <h2>{{ category.category }}</h2>
      <div v-for="item in category.items" :key="item.title" class="menu-item">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        <p>Price: ${{ (item.price / 100).toFixed(2) }}</p>
        <p>Tags: {{ item.tags.join(', ') }}</p>
        <button @click="addToCart(item)">Add to Cart</button>
      </div>
    </div>

    <h2>Your Cart</h2>
    <div v-for="item in cart" :key="item.title" class="cart-item">
      <h3>{{ item.title }} (x{{ item.quantity }})</h3>
      <p>Price: ${{ ((item.price * item.quantity) / 100).toFixed(2) }}</p>
      <button @click="removeFromCart(item)">Remove</button>
    </div>
    <p>Total: ${{ (cartTotal / 100).toFixed(2) }}</p>
  </div>
</template>

<script>
import { fetchMenuData } from './components/menuService';

export default {
  data() {
    return {
      restaurant: {},
      menu: [],
      cart: []
    };
  },
  methods: {
    async fetchMenuData() {
      try {
        const data = await fetchMenuData();
        this.restaurant = data.restaurant;
        this.menu = data.menu;
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    },
    addToCart(item) {
      const cartItem = this.cart.find(cartItem => cartItem.title === item.title);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        this.cart.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart(item) {
      const cartIndex = this.cart.findIndex(cartItem => cartItem.title === item.title);
      if (cartIndex !== -1) {
        this.cart[cartIndex].quantity--;
        if (this.cart[cartIndex].quantity === 0) {
          this.cart.splice(cartIndex, 1);
        }
      }
    }
  },
  created() {
    this.fetchMenuData();
  }
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f9;
    color: #333;
    padding: 20px;
  }

  /* Restaurant Name */
  h1 {
    font-size: 2.5rem;
    text-align: center;
    color: #2d3b45;
    margin-bottom: 20px;
  }

  /* Restaurant Description */
  p {
    font-size: 1rem;
    line-height: 1.5;
    text-align: center;
    color: #666;
    margin-bottom: 40px;
  }

  /* Menu Category */
  h2 {
    font-size: 2rem;
    color: #2d3b45;
    margin: 20px 0;
  }

  /* Menu Items */
  .menu-item {
    background-color: #ffffff;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .menu-item h3 {
    font-size: 1.5rem;
    color: #2d3b45;
    margin-bottom: 10px;
  }

  .menu-item p {
    font-size: 1rem;
    color: #666;
    margin-bottom: 10px;
  }

  .menu-item .price {
    font-size: 1.2rem;
    color: #e75e2a;
    font-weight: bold;
  }

  .menu-item .tags {
    font-size: 0.9rem;
    color: #777;
    margin-top: 10px;
  }

  .tags span {
    background-color: #e75e2a;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    margin-right: 5px;
  }

.cart-item {
  margin: 10px 0;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
