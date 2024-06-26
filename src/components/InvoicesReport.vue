<template>
    <div>
      <h1>Invoices</h1>
        <table v-if="invoiceData.data && invoiceData.data.length > 0" class="invoices-table">
            <thead>
            <tr>
                <th>Document No</th>
                <th>Year</th>
                <th>Client ID</th>
                <th>Amount</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(invoice, index) in invoiceData.data" :key="index">
                <td>{{ invoice.document_no }}</td>
                <td>{{ invoice.year_series }}</td>
                <td>{{ invoice.client_name }}</td>
                <td>{{ invoice.amount }}</td>
                <td>{{ invoice.status }}</td>
            </tr>
            </tbody>
        </table>
        <div v-else>
                <p>Loading invoices...</p>
        </div>
  
      <!-- Pagination Links -->
      <div class="pagination-links">
        <nav aria-label="Page navigation">
          <ul class="pagination">
            <li v-for="link in invoiceData.links" :key="link.label" :class="{ 'page-item': true, 'active': link.active }">
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
    name: 'InvoicesReport',
    setup() {
      const invoiceData = ref({
        data: [],
        links: [],
        firstPage: null,
        currentPage: null,
        lastPage: null,
      });
  
      const fetchInvoiceReport = async () => {
        try {
          const response = await fetch(`${ApiPath}invoice_view`);
          if (!response.ok) {
            throw new Error('Failed to fetch Invoices');
          }
          const invoices = await response.json();
          invoiceData.value = {
            data: invoices.dataset.data,
            links: invoices.dataset.links,
            firstPage: invoices.dataset.first_page_url,
            currentPage: invoices.dataset.current_page,
            lastPage: invoices.dataset.last_page,
          };
        } catch (error) {
          console.error('Error fetching Invoices:', error);
        }
      };
  
      const goToPage = async (url) => {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Failed to fetch Invoices');
          }
          const invoices = await response.json();
          invoiceData.value = {
            data: invoices.dataset.data,
            links: invoices.dataset.links,
            firstPage: invoices.dataset.first_page_url,
            currentPage: invoices.dataset.current_page,
            lastPage: invoices.dataset.last_page,
          };
        } catch (error) {
          console.error('Error fetching Invoices:', error);
        }
      };
  
      onMounted(fetchInvoiceReport);
  
      return {
        invoiceData,
        goToPage,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Component-specific styles */
  .invoices-table {
    width: 100%;
  }
  .invoices-table th
  {
    background-color: #f2f2f2; /* Light gray background for the first row */

  }
  .invoices-table th,
  .invoices-table td {
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
  