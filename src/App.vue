<template>
  <div>
    <h1>{{ restaurant.name }}</h1>
    <p>{{ restaurant.description }}</p>
    <div v-for="category in menu" :key="category.category">
      <h2>{{ category.category }}</h2>
      <div v-for="item in category.items" :key="item.title">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        <p>Price: ${{ (item.price / 100).toFixed(2) }}</p>
        <p>Tags: {{ item.tags.join(', ') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      restaurant: {},
      menu: []
    };
  },
  created() {
    this.fetchMenuData();
  },
  methods: {
    async fetchMenuData() {
      try {
        const response = await fetch('/Alchemy_Menu.json');
        const data = await response.json();
        this.restaurant = data.restaurant;
        this.menu = data.menu;
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
