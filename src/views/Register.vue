<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="mystical-card p-8">
        <div class="text-center">
          <h2 class="text-3xl font-mystical text-white mb-2">Kayıt Ol</h2>
          <p class="text-purple-200">Ücretsiz hesap oluştur ve 3 fal hakkı kazan</p>
        </div>

        <form @submit.prevent="handleRegister" class="mt-8 space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-white mb-2">
              Ad Soyad
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="mystical-input w-full"
              placeholder="Adınızı ve soyadınızı girin"
            />
          </div>

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

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-white mb-2">
              Şifre Tekrar
            </label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              required
              class="mystical-input w-full"
              placeholder="Şifrenizi tekrar girin"
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
              <span v-if="loading">Kayıt yapılıyor...</span>
              <span v-else>Kayıt Ol</span>
            </button>
          </div>

          <div class="text-center">
            <p class="text-purple-200">
              Zaten hesabın var mı?
              <router-link to="/login" class="text-purple-300 hover:text-purple-100 underline">
                Giriş yap
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
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const error = ref('')

const handleRegister = async () => {
  loading.value = true
  error.value = ''

  try {
    // Validation
    if (!form.value.name || !form.value.email || !form.value.password) {
      error.value = 'Lütfen tüm alanları doldurun'
      return
    }

    if (form.value.password !== form.value.confirmPassword) {
      error.value = 'Şifreler eşleşmiyor'
      return
    }

    if (form.value.password.length < 6) {
      error.value = 'Şifre en az 6 karakter olmalıdır'
      return
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    userStore.register({
      name: form.value.name,
      email: form.value.email
    })
    
    router.push('/dashboard')
  } catch (err) {
    error.value = 'Kayıt olurken bir hata oluştu'
  } finally {
    loading.value = false
  }
}
</script> 