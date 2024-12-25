<template>
    <div class="menu">
      <h2>Menu</h2>
      <div v-for="category in categories" :key="category">
        <h3>{{ category }}</h3>
        <div class="menu-items">
          <div v-for="item in getItemsByCategory(category)" :key="item.id" class="menu-item">
            <img :src="item.imageUrl" alt="item.title" />
            <h4>{{ item.title }}</h4>
            <p>{{ item.description }}</p>
            <p>{{ (item.price / 100).toFixed(2) }} USD</p>
            <button @click="addToCart(item)">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useCartStore } from "../store";
  import { computed } from 'vue'; 

  export default {
    name: "RestaurantMenu",
    setup() {
      const store = useCartStore();
      const categories = computed(() => [...new Set(store.menu.map((item) => item.category))]);
      const getItemsByCategory = (category) => store.menu.filter((item) => item.category === category);
      const addToCart = (item) => store.addToCart(item);
  
      return { categories, getItemsByCategory, addToCart };
    },
  };
  </script>
  
  <style>
  /* Add your styling here */
  </style>
  