import { defineStore } from 'pinia'

export const useFormStore = defineStore('formStore', {
  state: () => ({
    errors: []
  }),

  getters: {
    checkError: (state) => {
      return state.errors.some((error) => error.error === true)
    }
  },

  actions: {
    setError({ error, name }) {
      this.errors.push({ name, error })
      this.errors = this.errors.filter(
        (item, index) => this.errors.map((e) => e.name).lastIndexOf(item.name) === index
      )
    }
  }
})
