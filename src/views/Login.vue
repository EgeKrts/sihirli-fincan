<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="mystical-card p-8">
        <div class="text-center">
          <h2 class="text-3xl font-mystical text-white mb-2">Giriş Yap</h2>
          <p class="text-purple-200">Hesabına giriş yaparak fallarına devam et</p>
        </div>

        <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-white mb-2">
              E-posta Adresi
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="mystical-input w-full"
              placeholder="E-posta adresinizi girin"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-white mb-2">
              Şifre
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="mystical-input w-full"
              placeholder="Şifrenizi girin"
            />
          </div>

          <div v-if="error" class="text-red-400 text-sm text-center">
            {{ error }}
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="mystical-button w-full"
            >
              <span v-if="loading">Giriş yapılıyor...</span>
              <span v-else>Giriş Yap</span>
            </button>
          </div>

          <div class="text-center">
            <p class="text-purple-200">
              Hesabın yok mu?
              <router-link to="/register" class="text-purple-300 hover:text-purple-100 underline">
                Kayıt ol
              </router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()

const form = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simple validation for demo
    if (form.value.email && form.value.password) {
      const userData = {
        email: form.value.email,
        name: form.value.email.split('@')[0]
      }
      
      userStore.login(userData)
      router.push('/dashboard')
    } else {
      error.value = 'Lütfen tüm alanları doldurun'
    }
  } catch (err) {
    error.value = 'Giriş yapılırken bir hata oluştu'
  } finally {
    loading.value = false
  }
}
</script> 