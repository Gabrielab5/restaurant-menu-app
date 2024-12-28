<template>
  <div class="app">
    <div class="header">
      <h1>{{ restaurant.name }}</h1>
      <p class="restaurant-description">{{ restaurant.description }}</p>
    </div>

    <!-- Category Buttons for Navigation -->
    <div class="category-buttons">
      <button
        v-for="category in menu"
        :key="category.category"
        @click="scrollToCategory(category.category)"
        class="category-button"
      >
        {{ category.category }}
      </button>
    </div>

    <!-- Meal Suggestion Section -->
    <div class="meal-suggestion-section">
      <meal-suggestion
        ref="mealSuggestion" 
        v-if="filteredMenu.length > 0" 
        :menu="filteredMenu"
        @add-to-cart="addToCart"
        @back-to-menu="toggleMenu"
      />
    </div>

    <!-- Full Menu Section -->
    <div class="menu-container">
      <div
        v-for="category in menu"
        :key="category.category"
        class="category-container"
        :id="category.category" 
      >
        <h2 class="category-title">{{ category.category }}</h2>
        <div class="menu-items">
          <div
            v-for="item in category.items"
            :key="item.title + category.category"
            class="menu-item"
          >
            <img :src="item.imageUrl" class="menu-item-image" />
            <div class="menu-item-details">
              <h3 class="menu-item-title">{{ item.title }}</h3>
              <p class="menu-item-description">{{ item.description }}</p>
              <p class="menu-item-price">Price: ${{ (item.price / 100).toFixed(2) }}</p>
              <p class="menu-item-tags" :style="{ color: '#2d6a4f' }">Tags: {{ item.tags.join(', ') }}</p>
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
import MealSuggestion from './components/MealSuggestion.vue';
import { useCartStore } from './store';
import ShoppingCart from './components/ShoppingCart.vue';
import { fetchMenuData } from './services/menuService';

export default {
  components: {
    ShoppingCart,
    MealSuggestion,
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
      preferences: "",
      filteredMenu: [], // Holds the filtered meals based on the user input
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
        this.filteredMenu = this.menu; // Initially show all items
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
    toggleMenu() {
      this.showSuggestions = !this.showSuggestions; // Toggle meal suggestion visibility
    },
    scrollToCategory(category) {
      const categoryElement = document.getElementById(category);
      if (categoryElement) {
        categoryElement.scrollIntoView({ behavior: 'smooth' });
      }
    },
  },
  created() {
    this.fetchMenuData(); // Fetch the menu when the component is created
  },
};
</script>

<style scoped>
/* Main App Styles */
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
  background-color: #d6e8e0;
}

.total-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2d6a4f;
  margin-top: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #2d6a4f; 
  font-size: 3rem;
}

.restaurant-description {
  font-size: 1.2rem;
  color: #4c9a2a;
}

/* Search Input */


/* Category Buttons */
.category-buttons {
  text-align: center;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
}

.category-button {
  background-color: #2d6a4f;
  color: white;
  padding: 5px 12px; 
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px; 
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.category-button:hover {
  background-color: #218c4b;
}

/* Menu Section */
.menu-container {
  margin-top: 20px;
}

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
</style>
