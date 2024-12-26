<template>
  <div class="meal-suggestion">
    <h1>Meal Suggestion</h1>

    <!-- Search Input Field -->
    <div class="input-section">
      <input
        v-model="preferences"
        @input="suggestMeal"
        placeholder="Enter your preferences (e.g., spicy, vegan)"
        class="suggestion-input"
      />
    </div>

    <!-- Display filtered meal suggestions -->
    <div v-if="suggestedItems.length" class="suggested-items">
      <h2>Suggested Items:</h2>
      <div v-for="item in suggestedItems" :key="item.id" class="item-card">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        <p>Price: ${{ (item.price / 100).toFixed(2) }}</p>
        <p>Tags: {{ item.tags.join(', ') }}</p>
      </div>
    </div>

    <!-- Display no results if no meals match -->
    <div v-else-if="preferences" class="no-results">
      <p>No items match your preferences. Try different keywords.</p>
    </div>

    <!-- Back to Menu Button -->
    <button @click="goBackToMenu" class="back-button">Back to Menu</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    menu: Array,  // Receives the menu array from parent
  },
  data() {
    return {
      preferences: "",  // User input preferences for search
      suggestedItems: [],  // The list of filtered meal items based on the query
    };
  },
  methods: {
    async suggestMeal() {
      const userQuery = this.preferences.trim();

      // If there's no input, reset the suggested meals to show all
      if (!userQuery) {
        this.suggestedItems = this.menu;
        return;
      }

      const apiKey = process.env.VUE_APP_OPENAI_API_KEY;

      // Constructing a specific prompt for meal suggestions based on user preferences
      const prompt = `
        Suggest meals based on the following preferences: 
        ${userQuery}
        Please return meal names, their descriptions, and tags. Only suggest meals that match these preferences.
      `;

      try {
        const response = await axios.post(
          'https://api.openai.com/v1/completions',
          {
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 200,
            temperature: 0.7,
            n: 1,
          },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );

        const mealSuggestions = response.data.choices[0].text
          .split('\n')
          .map(item => item.trim())
          .filter(Boolean); // Clean empty lines

        // Filtering the menu to match the meal suggestions (by title)
        this.suggestedItems = this.menu.filter(item => {
          return mealSuggestions.some(meal => item.title.toLowerCase().includes(meal.toLowerCase()));
        });
      } catch (error) {
        console.error('Error fetching meal suggestions:', error);
      }
    },

    goBackToMenu() {
      // Emit an event to the parent component to switch back to the full menu
      this.$emit('back-to-menu');
    },
  },
};
</script>

<style scoped>
.meal-suggestion {
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
}

.input-section {
  margin-bottom: 20px;
}

.suggestion-input {
  padding: 10px;
  font-size: 1rem;
  width: 80%;
  border-radius: 5px;
  border: 1px solid #2d6a4f;
  margin-top: 10px;
}

.suggested-items {
  margin-top: 20px;
}

.item-card {
  padding: 15px;
  margin-bottom: 15px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.no-results {
  font-size: 1.2rem;
  color: #e75e2a;
}

.back-button {
  margin-top: 20px;
  padding: 10px;
  background-color: #4c9a2a;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #388e3c;
}
</style>
