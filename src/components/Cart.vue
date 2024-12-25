<template>
    <div>
      <h1>Cart</h1>
      <div v-for="(item, index) in cartItems" :key="index">
        <h3>{{ item.title }}</h3>
        <p>Quantity: {{ item.quantity }}</p>
        <p>Total: ${{ ((item.price * item.quantity) / 100).toFixed(2) }}</p>
        <button @click="removeFromCart(index)">Remove</button>
      </div>
      <h2>Total Price: ${{ totalPrice }}</h2>
    </div>
  </template>
  
  <script>
  export default {
    props: ['cartItems'],
    computed: {
      totalPrice() {
        return (this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) / 100).toFixed(2);
      },
    },
    methods: {
      removeFromCart(index) {
        this.$emit('removeFromCart', index);
      },
    },
  };
  </script>
  