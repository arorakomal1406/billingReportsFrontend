// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import ClientSummary from './components/ClientSummary.vue';
import HelloWorld from './components/HelloWorld.vue';
import InvoicesReport from './components/InvoicesReport.vue';
import ReceiptsReport from './components/ReceiptsReport.vue';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HelloWorld
    },
    {
        path: '/invoices',
        name: 'InvoicesReport',
        component: InvoicesReport
    },
    {
        path: '/receipts',
        name: 'ReceiptsReport',
        component: ReceiptsReport
    },
    {
        path: '/client-summary',
        name: 'ClientSummary',
        component: ClientSummary
    }
  ]
});

export default router;
