import { defineStore } from 'pinia'

// If you scale the app, create a pattern file to centralize API requests and retrieve information from the .env file.
const API_KEY = 'erbt02Nd-nMDpoKYfljXHFkT4RyZOgq1'
const API_URL = 'https://api.intern.d-tt.nl/api'
export const useHouseStore = defineStore('houseStore', {
  state: () => ({
    originalList: [],
    list: [],
    loading: false,
    item: {},
    text: '',
    sortBy: ''
  }),

  getters: {
    totalHouses: (state) => state.list.length
  },

  actions: {
    async getList() {
      this.loading = true
      const res = await fetch(`${API_URL}/houses`, {
        headers: { 'X-Api-Key': `${API_KEY}` }
      })
      this.list = await res.json()
      this.originalList = [...this.list]
      this.loading = false
    },

    async getItem(id) {
      this.loading = true
      const res = await fetch(`${API_URL}/houses/${id}`, {
        headers: { 'X-Api-Key': `${API_KEY}` }
      })
      const data = await res.json()
      this.item = data[0]
      this.loading = false
    },

    async createItem(data) {
      this.loading = true
      const res = await fetch(`${API_URL}/houses`, {
        method: 'POST',
        headers: {
          'X-Api-Key': `${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const resData = await res.json()
      this.item = resData
      this.loading = false
      return resData
    },

    async updateItem(id, data) {
      this.loading = true
      const res = await fetch(`${API_URL}/houses/${id}`, {
        method: 'POST',
        headers: {
          'X-Api-Key': `${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      this.loading = false

      return res
    },

    async postImage(id, data) {
      this.loading = true
      const formData = new FormData()
      formData.append('image', data)

      await fetch(`${API_URL}/houses/${id}/upload`, {
        method: 'POST',
        headers: { 'X-Api-Key': `${API_KEY}` },
        body: formData
      })
      this.loading = false
    },

    async deleteItem(id) {
      this.loading = true
      await fetch(`${API_URL}/houses/${id}`, {
        method: 'delete',
        headers: { 'X-Api-Key': `${API_KEY}` }
      })
      this.loading = false
    },

    filterList() {
      this.loading = true
      this.list = this.originalList.filter((house) =>
        house?.location?.city.toUpperCase().includes(this.text ? this.text.toUpperCase() : '')
      )
      this.loading = false
    },

    sortList() {
      this.loading = true
      let listFiltered = [...this.originalList]

      if (!this.sortBy && !this.text) {
        this.list = listFiltered
        return
      }

      if (this.text) {
        this.filterList()
        listFiltered = [...this.list]
      }

      this.list = listFiltered.sort((a, b) => a[this.sortBy] - b[this.sortBy])
      this.loading = false
    }
  }
})
