<template>
  <div>
    <div class="main-container">
      <div class="menu-container"></div>
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
</div>
    <div id="cart-icon" @click="toggleCart">
      🛒 ({{ cartItemCount }})
    </div>

     <ShoppingCart v-if="showCart" :cart="cart" @closeCart="toggleCart" />
  </div>
</template>

<script>
import ShoppingCart from "./components/ShoppingCart.vue";
import { fetchMenuData } from './services/menuService';
import { useCartStore } from './store';

export default {
  components: {
    ShoppingCart,
  },
  setup() {
    const cartStore = useCartStore(); 
    return { cartStore };
  },
  data() {
    return {
      restaurant: {},
      menu: [],
      //cart: []
      showCart: false,
    };
  },
  computed: {
    cartItemCount() {
      return this.cartStore.cart.reduce((total, item) => total + item.quantity, 0);
    },
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
      this.cartStore.addToCart(item);
    },
    toggleCart(){
      this.showCart = !this.showCart;
    },
  },
  created() {
    this.fetchMenuData();
  },
};
</script>

<style scoped>
#cart-icon {
  position: fixed;
  top: 20px;
  right: 20px;
  font-size: 1.5rem;
  cursor: pointer;
  background-color: #f4f4f9;
  padding: 10px;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.cart-item {
  margin: 10px 0;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
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
