import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    remainingFortuneCount: parseInt(localStorage.getItem('remainingFortuneCount') || '3'),
    isPremium: localStorage.getItem('isPremium') === 'true'
  }),

  getters: {
    canSubmitFortune: (state) => {
      return state.isPremium || state.remainingFortuneCount > 0
    }
  },

  actions: {
    login(userData) {
      this.isAuthenticated = true
      this.user = userData
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('user', JSON.stringify(userData))
    },

    logout() {
      this.isAuthenticated = false
      this.user = null
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('user')
    },

    register(userData) {
      // Simulate registration
      const newUser = {
        id: Date.now(),
        email: userData.email,
        name: userData.name,
        createdAt: new Date().toISOString()
      }
      this.login(newUser)
    },

    useFortune() {
      if (!this.isPremium && this.remainingFortuneCount > 0) {
        this.remainingFortuneCount--
        localStorage.setItem('remainingFortuneCount', this.remainingFortuneCount.toString())
      }
    },

    becomePremium() {
      this.isPremium = true
      localStorage.setItem('isPremium', 'true')
    }
  }
}) 