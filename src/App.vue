<template>
  <div class="app">
    <div class="header">
      <h1>{{ restaurant.name }}</h1>
      <p class="restaurant-description">{{ restaurant.description }}</p>
    </div>

    <div class="menu-container">
      <!-- Loop through each category and display the items within it -->
      <div v-for="category in menu" :key="category.category" class="category-container">
        <h2 class="category-title">{{ category.category }}</h2>
        <div class="menu-items">
          <div v-for="item in category.items" :key="item.id" class="menu-item">
            <img :src="item.imageUrl"  class="menu-item-image" />
            <div class="menu-item-details">
              <h3 class="menu-item-title">{{ item.title }}</h3>
              <p class="menu-item-description">{{ item.description }}</p>
              <p class="menu-item-price">Price: ${{ (item.price / 100).toFixed(2) }}</p>
              <p class="menu-item-tags">Tags: {{ item.tags.join(', ') }}</p>
              <button @click="addToCart(item)" class="add-to-cart-button">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Cart Icon -->
    <div id="cart-icon" @click="toggleCart" class="cart-icon">
      🛒 ({{ cartItemCount }})
    </div>

    <!-- Shopping Cart -->
    <ShoppingCart v-if="showCart" :cart="cartStore.cart" @closeCart="toggleCart" />
  </div>
</template>

<script>
import { useCartStore } from './store';
import ShoppingCart from './components/ShoppingCart.vue';
import { fetchMenuData } from './services/menuService';  // Import the fetchMenuData function

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
        const data = await fetchMenuData(); // Fetch menu data
        this.restaurant = data.restaurant;
        this.menu = data.menu;
      } catch (error) {
        console.error('Error fetching menu data:', error);
        this.menu = [];  // If the fetch fails, set menu to an empty array
      }
    },
    addToCart(item) {
      this.cartStore.addToCart(item); // Add item to the cart
    },
    toggleCart() {
      this.showCart = !this.showCart; // Toggle cart visibility
    },
  },
  created() {
    this.fetchMenuData(); // Fetch the menu when the component is created
  },
};
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  background-color: #f3f8f4; /* Soft green background */
  color: #333;
  padding: 20px;
}

/* Header styles */
.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #2d6a4f; /* Deep green */
  font-size: 3rem;
}

.restaurant-description {
  font-size: 1.2rem;
  color: #4c9a2a; /* Lighter green */
}

/* Category container styles */
.category-container {
  margin-bottom: 30px;
}

.category-title {
  font-size: 2rem;
  color: #1b5c43; /* Darker green */
  margin-bottom: 15px;
  text-transform: uppercase;
}

/* Menu items */
.menu-items {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.menu-item {
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 30%;
  transition: transform 0.3s ease;
}

.menu-item:hover {
  transform: translateY(-5px);
}

.menu-item-image {
  width: 100%;
  border-radius: 8px;
}

.menu-item-details {
  margin-top: 15px;
}

.menu-item-title {
  font-size: 1.5rem;
  color: #2d6a4f;
}

.menu-item-description {
  font-size: 1rem;
  color: #4c9a2a;
  margin: 10px 0;
}

.menu-item-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2d6a4f;
}

.menu-item-tags {
  font-size: 0.9rem;
  color: #7a9a46; /* Muted green for tags */
  margin-bottom: 15px;
}

.add-to-cart-button {
  background-color: #4c9a2a; /* Light green */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.add-to-cart-button:hover {
  background-color: #388e3c; /* Darker green */
}

/* Cart Icon */
.cart-icon {
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

.cart-icon:hover {
  background-color: #d6e8e0; /* Light hover effect for cart icon */
}

.total-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2d6a4f;
  margin-top: 20px;
}
</style>
