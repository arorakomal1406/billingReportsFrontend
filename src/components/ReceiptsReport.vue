

<template>
    <div>
      <h1>Receipts</h1>
        <table v-if="receiptData.data && receiptData.data.length > 0" class="receipts-table">
            <thead>
            <tr>
                <th>Document No</th>
                <th>Year</th>
                <th>Client ID</th>
                <th>Amount</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(receipt, index) in receiptData.data" :key="index">
                <td>{{ receipt.receipt_document_no }}</td>
                <td>{{ receipt.year_series }}</td>
                <td>{{ receipt.client_name }}</td>
                <td>{{ receipt.receipt_amount }}</td>
            </tr>
            </tbody>
        </table>
        <div v-else>
            <p>Loading receipts...</p>
        </div>
  
      <!-- Pagination Links -->
      <div class="pagination-links">
        <nav aria-label="Page navigation">
          <ul class="pagination">
            <li v-for="link in receiptData.links" :key="link.label" :class="{ 'page-item': true, 'active': link.active }">
              <a class="page-link" :href="link.url" @click.prevent="goToPage(link.url)" v-html="link.label"></a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, onMounted } from 'vue';
  import { ApiPath } from '../constants.js'; // Import ApiPath constant
  
  export default defineComponent({
    name: 'ReceiptsReport',
    setup() {
      const receiptData = ref({
        data: [],
        links: [],
        firstPage: null,
        currentPage: null,
        lastPage: null,
      });
  
      const fetchReceiptReport = async () => {
        try {
          const response = await fetch(`${ApiPath}receipt_view`);
          if (!response.ok) {
            throw new Error('Failed to fetch receipts');
          }
          const receipts = await response.json();
          receiptData.value = {
            data: receipts.dataset.data,
            links: receipts.dataset.links,
            firstPage: receipts.dataset.first_page_url,
            currentPage: receipts.dataset.current_page,
            lastPage: receipts.dataset.last_page,
          };
        } catch (error) {
          console.error('Error fetching receipts:', error);
        }
      };
  
      const goToPage = async (url) => {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Failed to fetch receipts');
          }
          const receipts = await response.json();
          receiptData.value = {
            data: receipts.dataset.data,
            links: receipts.dataset.links,
            firstPage: receipts.dataset.first_page_url,
            currentPage: receipts.dataset.current_page,
            lastPage: receipts.dataset.last_page,
          };
        } catch (error) {
          console.error('Error fetching receipts:', error);
        }
      };
  
      onMounted(fetchReceiptReport);
  
      return {
        receiptData,
        goToPage,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Component-specific styles */
  .receipts-table {
    width: 100%;
  }
  .receipts-table th
  {
    background-color: #f2f2f2; /* Light gray background for the first row */

  }
  .receipts-table th,
  .receipts-table td {
    padding: 10px;
    border: 1px solid black;
  }
  
  .pagination-links {
    margin-top: 20px;
  }
  
  .pagination-links .pagination {
    display: flex;
    list-style-type: none;
    padding: 0;
  }
  
  .pagination-links .pagination li {
    margin-right: 5px;
  }
  
  .pagination-links .pagination li a {
    padding: 8px 16px;
    text-decoration: none;
    color: #007bff;
    border: 1px solid #007bff;
    border-radius: 4px;
  }
  
  .pagination-links .pagination li.active a {
    background-color: #007bff;
    color: white;
  }
  
  </style>
  