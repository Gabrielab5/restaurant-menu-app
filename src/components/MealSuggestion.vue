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
      <div v-for="item in suggestedItems" :key="item.title" class="item-card">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        <p>Price: ${{ (item.price / 100).toFixed(2) }}</p>
        <p>Tags: {{ item.tags.join(', ') }}</p>
      </div>
    </div>
    <div v-else-if="suggestedItems" class="no-results">
      <p>No items match your preferences. Try different keywords.</p>
    </div>
  </div>
</template>

<script>
import { fetchMenuData } from "./menuService.js";

export default {
  data() {
    return {
      preferences: "",
      suggestedItems: [],
    };
  },
  methods: {
    async suggestMeal() {
      if (!this.preferences.trim()) {
        alert("Please enter preferences before searching.");
        return;
      }

      try {
        const menuData = await fetchMenuData();
        const keywords = this.preferences.toLowerCase().split(" ");
        this.suggestedItems = menuData.flatMap((category) =>
          category.items.filter((item) =>
            keywords.some((keyword) =>
              item.tags.map((tag) => tag.toLowerCase()).includes(keyword)
            )
          )
        );
      } catch (error) {
        console.error("Error fetching menu data:", error);
        alert("Unable to fetch menu data. Please try again later.");
      }
    },
  },
};
</script>

<style scoped>
.meal-suggestion {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  color: #2d3b45;
  text-align: center;
  margin-bottom: 20px;
}

.input-section {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 50%;
}

button {
  padding: 10px 15px;
  background-color: #2d3b45;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #3b4d57;
}

.suggested-items {
  margin-top: 20px;
}

.item-card {
  background-color: #ffffff;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.item-card h3 {
  font-size: 1.5rem;
  color: #2d3b45;
  margin-bottom: 10px;
}

.item-card p {
  font-size: 1rem;
  color: #666;
  margin-bottom: 10px;
}

.no-results {
  text-align: center;
  color: #777;
  margin-top: 20px;
}
</style>
