<template>
    <div>
      <h1>Menu</h1>
      <div v-for="category in menuData" :key="category.category">
        <h2>{{ category.category }}</h2>
        <div v-for="item in category.items" :key="item.title">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <p>Price: ${{ (item.price / 100).toFixed(2) }}</p>
          <button @click="addToCart(item)">Add to Cart</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['menuData'],
    methods: {
      addToCart(item) {
        this.$emit('addToCart', item);
      },
    },
  };
  </script>
  