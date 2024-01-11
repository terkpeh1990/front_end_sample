import { defineStore } from 'pinia'
import { createAxiosIns } from '@axios'

export const useInvoiceStore = defineStore('InvoiceStore', {
  actions: {
    // 👉 Fetch all Invoices
    fetchInvoices(params) {
      return createAxiosIns().get('apps/invoices', { params })
    },

    // 👉 Fetch single invoice
    fetchInvoice(id) {
      return createAxiosIns().get(`/apps/invoices/${id}`)
    },

    // 👉 Fetch Clients
    fetchClients() {
      return createAxiosIns().get('/apps/invoice/clients')
    },
  },
})
