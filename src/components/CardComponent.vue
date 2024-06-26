<!-- src/components/Dashboard.vue -->
<template>
    <div class="container">
      <div class="card" v-for="card in cards" :key="card.title">
        <h2>{{ card.title }}</h2>
        <p>{{ card.description }}</p>
        <router-link :to="card.route">
            <button>View {{ card.title }}</button>
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CardComponent',
    data() {
      return {
        cards: [
          {
            title: 'Invoice',
            description: 'Manage all your invoices here.',
            route: '/invoices'
          },
          {
            title: 'Receipts',
            description: 'Keep track of all your receipts.',
            route: '/receipts'
          },
          {
            title: 'Client Summary',
            description: 'View account summary of your client.',
            route: '/client-summary'
          }
        ]
      };
    },
    methods: {
      viewCard(route) {
        this.$router.push(route);
      }
    }
  }
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 50px;
  }
  .card {
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px;
    text-align: center;
    width: 30%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
    margin: 10px;
  }
  .card:hover {
    transform: translateY(-10px);
  }
  button {
    background-color: #007bff;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin-top: 20px;
    cursor: pointer;
    border-radius: 5px;
  }
  button:hover {
    background-color: #0056b3;
  }
  </style>
  