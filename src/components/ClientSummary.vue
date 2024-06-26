<template>
    <div>
      <h1>Client Summary</h1>
        <table v-if="clientSummaryData && clientSummaryData.length > 0" class="client-summary-table">
            <thead>
                <tr>
                    <td class="bold">Client Name</td>
                    <td class="bold">Total Invoiced</td>
                    <td class="bold">Total Received</td>
                    <td class="bold">Balance Due</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(clientSummary, index) in clientSummaryData" :key="index">
                    <td>{{ clientSummary.client_name }}</td>
                    <td>{{ clientSummary.total_invoiced }}</td>
                    <td>{{ clientSummary.total_paid }}</td>
                    <td>{{ clientSummary.balance_due }}</td>
                </tr>
            </tbody>
        </table>

        <div v-else>
            <p>Loading client summaries...</p>
        </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, onMounted } from 'vue';
  import { ApiPath } from '../constants.js'; // Import ApiPath constant

  export default defineComponent({
    name: 'ClientSummary',
    setup() {
      const clientSummaryData = ref(null);
  
      const fetchClientSummary = async () => {
        try {
          const response = await fetch(`${ApiPath}client_Summary`);
          if (!response.ok) {
            throw new Error('Failed to fetch client summary');
          }
          let data=await response.json();
          console.log(data.dataset);
          clientSummaryData.value = data.dataset;
        } catch (error) {
          console.error('Error fetching client summary:', error);
        }
      };
  
      onMounted(fetchClientSummary);
  
      return {
        clientSummaryData
      };
    }
  });
  </script>
  
  <style scoped>
  /* Component-specific styles */
  .client-summary-table{
    border: 1px;
    width: 100%;
    padding: 10px;
  }
  .bold{
    font-weight: bold;
    padding: 10px;
    border: 1px solid black;
  }
  .client-summary-table thead tr:first-child {
    background-color: #f2f2f2; /* Light gray background for the first row */
    border: 1px solid black;
  }
  .client-summary-table tbody td {
    padding: 10px;
    border: 1px solid black;
  }
  </style>
  