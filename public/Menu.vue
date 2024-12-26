<template>
  <div>
    <h1>Menu</h1>
    <div v-for="category in categories" :key="category">
      <h2>{{ category }}</h2>
      <div v-for="item in getItemsByCategory(category)" :key="item.id">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        <p>Price: ${{ (item.price / 100).toFixed(2) }}</p>
        <button @click="addToCart(item)">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useCartStore } from '../store';

export default {
  setup() {
    const store = useCartStore();
    const categories = computed(() => [...new Set(store.menu.map((item) => item.category))]);
    const getItemsByCategory = (category) => store.menu.filter((item) => item.category === category);
    const addToCart = (item) => store.addToCart(item);

    return { categories, getItemsByCategory, addToCart };
  },
};
</script>
