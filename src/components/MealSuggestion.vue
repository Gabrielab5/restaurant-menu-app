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
    <div v-if="suggestedItems.length > 0" class="suggested-items">
      <h2>Suggested Items:</h2>
      <div v-for="item in suggestedItems" :key="item.id" class="item-card">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        <p>Price: ${{ (item.price / 100).toFixed(2) }}</p>
        <p>Tags: {{ item.tags ? item.tags.join(', ') : 'No tags available' }}</p>
        <button @click="addToCart(item)">Add to Cart</button>
      </div>
    </div>

    <!-- Display no results if no meals match -->
    <div v-else-if="preferences" class="no-results">
      <p>No items match your preferences. Try different keywords.</p>
    </div>

  </div>
</template>

<script>
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
    suggestMeal() {
  const userQuery = this.preferences.trim().toLowerCase();

  if (!userQuery) {
    this.suggestedItems = this.menu.flatMap(category => category.items);
    return;
  }

  const searchTerms = userQuery.split(' ').filter(term => term);
  this.suggestedItems = this.menu.flatMap(category =>
    category.items.filter(item => {
      const searchableText = [
        item.title,
        item.description,
        ...(item.tags || []) 
      ].join(' ').toLowerCase();
      return searchTerms.every(term => searchableText.includes(term));
    })
  );
},
    addToCart(item) {
      this.$emit('add-to-cart', item); // Emit the item to add it to the cart
    },
  },
};
</script>

<style scoped>
.meal-suggestion {
  padding: 20px;
  background-color: #eafaf0; /* Light green background */
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the content */
  justify-content: center;
  min-height: 100vh;
  max-width: 600px; /* Limit the width */
  margin: 0 auto; /* Center horizontally */
}

.input-section {
  margin-bottom: 20px;
}

.suggestion-input {
  padding: 12px;
  font-size: 1rem;
  width: 80%; 
  max-width: 2000px; 
  border-radius: 10px;
  border: 1px solid #2d6a4f;
}

.suggested-items {
  margin-top: 20px;
  width: 100%;
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


</style>
