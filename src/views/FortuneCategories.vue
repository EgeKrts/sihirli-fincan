<template>
  <div class="min-h-screen py-12 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-5xl font-mystical text-white mb-4">Fal Kategorileri</h1>
        <p class="text-xl text-purple-200 max-w-3xl mx-auto">
          Hangi türde falınıza bakılmasını istiyorsunuz? AI destekli yorumlama ile geleceğinizi keşfedin.
        </p>
      </div>

      <!-- User Status -->
      <div v-if="userStore.isAuthenticated" class="text-center mb-8">
        <div v-if="userStore.isPremium" class="inline-block bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-full font-semibold">
          ⭐ Premium Üye - Sınırsız Fal Hakkı
        </div>
        <div v-else class="inline-block bg-purple-600 text-white px-6 py-3 rounded-full font-semibold">
          {{ userStore.remainingFortuneCount }} Fal Hakkınız Kaldı
        </div>
      </div>

      <!-- Categories Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="category in fortuneStore.categories"
          :key="category.id"
          class="mystical-card p-8 text-center hover:scale-105 transition-all duration-300 cursor-pointer group"
          @click="selectCategory(category)"
        >
          <div class="text-8xl mb-6 group-hover:scale-110 transition-transform duration-300">
            {{ category.icon }}
          </div>
          
          <h3 class="text-3xl font-bold text-white mb-4">{{ category.name }}</h3>
          
          <p class="text-purple-200 text-lg mb-6 leading-relaxed">
            {{ category.description }}
          </p>
          
          <div class="space-y-3 mb-6">
            <div class="flex items-center justify-center text-purple-200">
              <span class="text-green-400 mr-2">✓</span>
              <span>AI Destekli Yorumlama</span>
            </div>
            <div class="flex items-center justify-center text-purple-200">
              <span class="text-green-400 mr-2">✓</span>
              <span>Anında Sonuç</span>
            </div>
            <div class="flex items-center justify-center text-purple-200">
              <span class="text-green-400 mr-2">✓</span>
              <span>{{ category.type === 'image' ? 'Fotoğraf Yükleme' : 'Metin Girişi' }}</span>
            </div>
          </div>

          <button
            class="mystical-button w-full group-hover:scale-105 transition-transform duration-300"
            :disabled="!canSubmitFortune"
          >
            <span v-if="!userStore.isAuthenticated">
              Giriş Yapın
            </span>
            <span v-else-if="!canSubmitFortune">
              Premium Gerekli
            </span>
            <span v-else>
              Falına Bak
            </span>
          </button>
        </div>
      </div>

      <!-- Need Premium Alert -->
      <div v-if="userStore.isAuthenticated && !canSubmitFortune" class="mt-12 text-center">
        <div class="mystical-card p-8 max-w-2xl mx-auto">
          <h3 class="text-2xl font-bold text-white mb-4">Fal Hakkınız Bitti!</h3>
          <p class="text-purple-200 mb-6">
            Ücretsiz 3 fal hakkınızı kullandınız. Premium üyelikle sınırsız fal deneyimi yaşayın.
          </p>
          <router-link to="/subscription" class="mystical-button">
            Premium Ol
          </router-link>
        </div>
      </div>

      <!-- Not Authenticated Alert -->
      <div v-if="!userStore.isAuthenticated" class="mt-12 text-center">
        <div class="mystical-card p-8 max-w-2xl mx-auto">
          <h3 class="text-2xl font-bold text-white mb-4">Falınıza Bakmak İçin Giriş Yapın</h3>
          <p class="text-purple-200 mb-6">
            Ücretsiz hesap oluşturun ve 3 fal hakkınızı kazanın.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link to="/register" class="mystical-button">
              Kayıt Ol
            </router-link>
            <router-link to="/login" class="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 border border-white/30">
              Giriş Yap
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { useFortuneStore } from '../stores/fortune'

const router = useRouter()
const userStore = useUserStore()
const fortuneStore = useFortuneStore()

const canSubmitFortune = computed(() => {
  return userStore.isAuthenticated && userStore.canSubmitFortune
})

const selectCategory = (category) => {
  if (!userStore.isAuthenticated) {
    router.push('/register')
  } else if (!userStore.canSubmitFortune) {
    router.push('/subscription')
  } else {
    router.push(`/submit/${category.id}`)
  }
}
</script> 