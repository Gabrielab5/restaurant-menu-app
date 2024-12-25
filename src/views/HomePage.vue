<template>
    <div class="homepage">
        <router-link to="/meal-suggestion">Go to Meal Suggestion</router-link>
      <RestaurantMenu />
      <ShoppingCart />
    </div>
  </template>
  
  <script>
  import RestaurantMenu from "../components/RestaurantMenu.vue";
  import ShoppingCart from "../components/ShoppingCart.vue";
  
  export default {
    components: { RestaurantMenu, ShoppingCart },
  };
  </script>
  