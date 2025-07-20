<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-20 px-4">
      <div class="max-w-7xl mx-auto text-center">
        <div class="mb-8">
          <h1 class="text-5xl md:text-7xl font-mystical text-white mb-6 animate-pulse">
            🔮 Sihirli Fincan
          </h1>
          <p class="text-xl md:text-2xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Geleceğinizi keşfedin! Kahve falı, tarot ve el falı ile yapay zeka destekli fal deneyimi yaşayın.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <router-link
            to="/categories"
            class="mystical-button text-lg px-8 py-4"
          >
            Falına Bak
          </router-link>
          <router-link
            v-if="!userStore.isAuthenticated"
            to="/register"
            class="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 border border-white/30"
          >
            Ücretsiz Kayıt Ol
          </router-link>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div class="mystical-card p-6 text-center">
            <div class="text-3xl mb-2">⭐</div>
            <div class="text-2xl font-bold text-white">3</div>
            <div class="text-purple-200">Ücretsiz Fal Hakkı</div>
          </div>
          <div class="mystical-card p-6 text-center">
            <div class="text-3xl mb-2">🤖</div>
            <div class="text-2xl font-bold text-white">AI</div>
            <div class="text-purple-200">Destekli Yorumlama</div>
          </div>
          <div class="mystical-card p-6 text-center">
            <div class="text-3xl mb-2">📱</div>
            <div class="text-2xl font-bold text-white">7/24</div>
            <div class="text-purple-200">Erişilebilir</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Fortune Categories Preview -->
    <section class="py-16 px-4">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl font-mystical text-white text-center mb-12">
          Fal Kategorileri
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="category in fortuneStore.categories"
            :key="category.id"
            class="mystical-card p-8 text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
            @click="goToCategory(category.id)"
          >
            <div class="text-6xl mb-4">{{ category.icon }}</div>
            <h3 class="text-2xl font-bold text-white mb-3">{{ category.name }}</h3>
            <p class="text-purple-200 mb-6">{{ category.description }}</p>
            <div class="mystical-button inline-block">
              Falına Bak
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="py-16 px-4 bg-black/20">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl font-mystical text-white text-center mb-12">
          Nasıl Çalışır?
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-white font-bold text-xl">1</span>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Kayıt Ol</h3>
            <p class="text-purple-200">Ücretsiz hesap oluştur ve 3 fal hakkını kazan</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-white font-bold text-xl">2</span>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Kategori Seç</h3>
            <p class="text-purple-200">Kahve falı, tarot veya el falı seçeneklerinden birini tercih et</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-white font-bold text-xl">3</span>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Gönder</h3>
            <p class="text-purple-200">Fotoğraf yükle veya sorununu yaz</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-white font-bold text-xl">4</span>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Sonuç Al</h3>
            <p class="text-purple-200">AI destekli yorumunu anında görüntüle</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Fortunes for Authenticated Users -->
    <section v-if="userStore.isAuthenticated && fortuneStore.recentFortunes.length > 0" class="py-16 px-4">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl font-mystical text-white text-center mb-12">
          Son Fallarınız
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="fortune in fortuneStore.recentFortunes.slice(0, 3)"
            :key="fortune.id"
            class="mystical-card p-6"
          >
            <div class="flex items-center mb-3">
              <span class="text-2xl mr-2">
                {{ fortuneStore.getCategoryById(fortune.category)?.icon }}
              </span>
              <span class="text-white font-semibold">
                {{ fortuneStore.getCategoryById(fortune.category)?.name }}
              </span>
            </div>
            <p class="text-purple-200 text-sm mb-3 line-clamp-3">
              {{ fortune.result }}
            </p>
            <div class="text-xs text-purple-300">
              {{ new Date(fortune.createdAt).toLocaleDateString('tr-TR') }}
            </div>
          </div>
        </div>
        
        <div class="text-center mt-8">
          <router-link to="/dashboard" class="mystical-button">
            Tüm Falları Görüntüle
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-4 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl font-mystical text-white mb-6">
          Geleceğinizi Keşfetmeye Hazır mısınız?
        </h2>
        <p class="text-xl text-purple-200 mb-8">
          Ücretsiz 3 fal hakkınızla başlayın, premium üyelikle sınırsız fal deneyimi yaşayın.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            v-if="!userStore.isAuthenticated"
            to="/register"
            class="mystical-button text-lg px-8 py-4"
          >
            Hemen Başla
          </router-link>
          <router-link
            v-else
            to="/categories"
            class="mystical-button text-lg px-8 py-4"
          >
            Falına Bak
          </router-link>
          <router-link
            v-if="userStore.isAuthenticated && !userStore.isPremium"
            to="/subscription"
            class="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Premium Ol
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { useFortuneStore } from '../stores/fortune'

const router = useRouter()
const userStore = useUserStore()
const fortuneStore = useFortuneStore()

const goToCategory = (categoryId) => {
  if (!userStore.isAuthenticated) {
    router.push('/register')
  } else if (!userStore.canSubmitFortune) {
    router.push('/subscription')
  } else {
    router.push(`/submit/${categoryId}`)
  }
}
</script> 