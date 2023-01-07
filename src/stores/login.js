import { defineStore } from 'pinia'
import router from '../router'

export const useLoginStore = defineStore('loginStore', {
  state: () => {
    return {
      token: null,
      user: null
    }
  },
  actions: {
    updateToken() {
      this.token = localStorage.getItem('token')
    },
    updateUser() {
      this.user = JSON.parse(localStorage.getItem('user'))
    },
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.updateToken()
      this.updateUser()

      router.push('/login')
    },
  },
})
