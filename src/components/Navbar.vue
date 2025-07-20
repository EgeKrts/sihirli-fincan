<template>
  <nav class="bg-black/20 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <span class="text-2xl">🔮</span>
            <span class="text-xl font-mystical text-white">Sihirli Fincan</span>
          </router-link>
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <router-link
              to="/"
              class="text-white hover:text-purple-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="{ 'bg-purple-700': $route.name === 'home' }"
            >
              Ana Sayfa
            </router-link>
            <router-link
              to="/categories"
              class="text-white hover:text-purple-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="{ 'bg-purple-700': $route.name === 'categories' }"
            >
              Fal Kategorileri
            </router-link>
            <router-link
              v-if="userStore.isAuthenticated"
              to="/dashboard"
              class="text-white hover:text-purple-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="{ 'bg-purple-700': $route.name === 'dashboard' }"
            >
              Panelim
            </router-link>
          </div>
        </div>

        <!-- User Menu -->
        <div class="flex items-center space-x-4">
          <!-- Fortune Count -->
          <div v-if="userStore.isAuthenticated && !userStore.isPremium" class="text-white text-sm">
            <span class="bg-purple-600 px-2 py-1 rounded-full">
              {{ userStore.remainingFortuneCount }} fal hakkı
            </span>
          </div>
          <div v-else-if="userStore.isAuthenticated && userStore.isPremium" class="text-white text-sm">
            <span class="bg-gold-600 px-2 py-1 rounded-full text-yellow-300">
              ⭐ Premium
            </span>
          </div>

          <!-- Auth Buttons -->
          <div v-if="!userStore.isAuthenticated" class="flex space-x-2">
            <router-link
              to="/login"
              class="text-white hover:text-purple-300 px-3 py-2 rounded-md text-sm font-medium"
            >
              Giriş
            </router-link>
            <router-link
              to="/register"
              class="mystical-button text-sm"
            >
              Kayıt Ol
            </router-link>
          </div>

          <!-- User Menu -->
          <div v-else class="relative">
            <button
              @click="showUserMenu = !showUserMenu"
              class="flex items-center text-white hover:text-purple-300 focus:outline-none"
            >
              <span class="text-sm">{{ userStore.user?.name }}</span>
              <svg class="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-48 mystical-card py-1"
              @click="showUserMenu = false"
            >
              <router-link
                to="/dashboard"
                class="block px-4 py-2 text-sm text-white hover:bg-white/10"
              >
                Panelim
              </router-link>
              <router-link
                v-if="!userStore.isPremium"
                to="/subscription"
                class="block px-4 py-2 text-sm text-white hover:bg-white/10"
              >
                Premium Ol
              </router-link>
              <button
                @click="logout"
                class="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="showMobileMenu = !showMobileMenu"
            class="text-white hover:text-purple-300 focus:outline-none"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-if="showMobileMenu" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link
            to="/"
            class="text-white hover:text-purple-300 block px-3 py-2 rounded-md text-base font-medium"
            @click="showMobileMenu = false"
          >
            Ana Sayfa
          </router-link>
          <router-link
            to="/categories"
            class="text-white hover:text-purple-300 block px-3 py-2 rounded-md text-base font-medium"
            @click="showMobileMenu = false"
          >
            Fal Kategorileri
          </router-link>
          <router-link
            v-if="userStore.isAuthenticated"
            to="/dashboard"
            class="text-white hover:text-purple-300 block px-3 py-2 rounded-md text-base font-medium"
            @click="showMobileMenu = false"
          >
            Panelim
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()
const showUserMenu = ref(false)
const showMobileMenu = ref(false)

const logout = () => {
  userStore.logout()
  router.push('/')
}
</script> 