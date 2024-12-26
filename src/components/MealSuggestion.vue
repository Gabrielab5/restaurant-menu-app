<template>
  <div class="meal-suggestion">
    <h1>Meal Suggestion</h1>
    <div class="input-section">
      <input
        v-model="preferences"
        placeholder="Enter your preferences (e.g., spicy, vegan)"
      />
      <button @click="suggestMeal">Suggest Meal</button>
    </div>

    <div v-if="suggestedItems.length" class="suggested-items">
      <h2>Suggested Items:</h2>
      <div v-for="item in suggestedItems" :key="item.id" class="item-card">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        <p>Price: ${{ (item.price / 100).toFixed(2) }}</p>
        <p>Tags: {{ item.tags.join(', ') }}</p>
      </div>
    </div>
    <div v-else-if="preferences" class="no-results">
      <p>No items match your preferences. Try different keywords.</p>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '../store';

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
      const menu = useCartStore().menu;

      this.suggestedItems = menu.filter((item) =>
        keywords.some((keyword) =>
          item.tags?.some((tag) => tag.toLowerCase().includes(keyword))
        )
      );
    },
  },
};
</script>
