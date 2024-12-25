<template>
    <div>
      <h1>Meal Suggestion</h1>
      <input v-model="preferences" placeholder="Enter your preferences" />
      <button @click="suggestMeal">Suggest Meal</button>
      <div v-if="suggestedItems.length">
        <h2>Suggested Items:</h2>
        <div v-for="item in suggestedItems" :key="item.title">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <p>Price: ${{ (item.price / 100).toFixed(2) }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        preferences: '',
        suggestedItems: [],
      };
    },
    methods: {
      suggestMeal() {
        const keywords = this.preferences.toLowerCase().split(' ');
        this.suggestedItems = this.$props.menuData.flatMap(category =>
          category.items.filter(item =>
            keywords.some(keyword => item.tags.map(tag => tag.toLowerCase()).includes(keyword))
          )
        );
      },
    },
    props: ['menuData'],
  };
  </script>
  