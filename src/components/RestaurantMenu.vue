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
      const categories = computed(() => {
      const categorySet = new Set(store.menu.map((item) => item.category));
      return Array.from(categorySet);
    });

    const menuByCategory = computed(() => {
      return categories.value.reduce((acc, category) => {
        acc[category] = store.menu.filter((item) => item.category === category);
        return acc;
      }, {});
    });

    const addToCart = (item) => {
      store.addToCart(item);
    };
      return { categories, menuByCategory, addToCart };
    },
  };
  </script>
  
  <style scoped>
.restaurant-menu {
  padding: 20px;
}
.menu-category {
  margin-bottom: 20px;
}
.menu-items {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}
.menu-item {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
  width: 200px;
}
.menu-item-image {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
}
</style>
