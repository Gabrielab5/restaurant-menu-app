<template>
  <div class="app">
    <router-link to="/App">
    </router-link>
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
      
      />
    </div>

   <div class="menu-container">
  <div class="menu-items">
    <div
      v-for="item in paginatedItems"
      :key="item.title"
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

  <div class="pagination-controls">
    <button @click="prevPage" :disabled="currentPage === 1" class="pagination-button">
      Previous
    </button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-button">
      Next
    </button>
  </div>
</div>

    <!-- Cart Icon -->
    <router-link to="/Alchemy-Restaurant/shopping-cart">
    <div id="cart-icon" @click="toggleCart" class="cart-icon">
      🛒 ({{ cartItemCount }})
    </div>
  </router-link>

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
      filteredMenu: [], 
      currentPage: 1,   
      itemsPerPage: 9,
    };
  },
  computed: {
    cartItemCount() {
      return this.cartStore.cart.reduce((total, item) => total + item.quantity, 0);
    },
    allItems() {
      return this.menu.flatMap(category => category.items);
    },

    totalPages() {
      return Math.ceil(this.allItems.length / this.itemsPerPage);
    },

    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.allItems.slice(start, end);
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


     // When input is changed, it triggers suggestMeal function
     async suggestMeal() {
      const userQuery = this.preferences.trim();
      if (!userQuery) {
        this.filteredMenu = this.menu;
        return;
      }

      // Call the suggestMeal function of MealSuggestion using the correct reference
      await this.$refs.mealSuggestion.suggestMeal(userQuery);
    },
    
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }  
    },
    
    addToCart(item) {
      this.cartStore.addToCart(item); // Add item to the cart
    },
    
    toggleCart() {
      this.showCart = !this.showCart; // Toggle cart visibility
     // if (this.showCart) {
     // window.history.replaceState(null, '', '/');
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

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 15px;
}

.pagination-button {
  background-color: #2d6a4f;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.pagination-button:hover:not(:disabled) {
  background-color: #218c4b;
}

.pagination-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
