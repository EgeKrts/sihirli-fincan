<template>
  <div class="min-h-screen py-12 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-mystical text-white mb-4">Hoş Geldin, {{ userStore.user?.name }}!</h1>
        <p class="text-xl text-purple-200">Fal geçmişin ve hesap bilgilerin</p>
      </div>

      <!-- OpenAI Status - Gizli -->
      <div v-if="false" class="mb-8">
        <div class="mystical-card p-6 border-2 border-yellow-400">
          <div class="flex items-center justify-center text-center">
            <div class="text-4xl mr-4">⚠️</div>
            <div>
              <h3 class="text-xl font-bold text-yellow-400 mb-2">OpenAI API Bağlantısı Yok</h3>
              <p class="text-purple-200 mb-3">
                Gerçek AI yanıtları için OpenAI API key'i gerekli. Şu anda mock yanıtlar kullanılıyor.
              </p>
              <button 
                @click="setupOpenAI"
                class="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                API Kurulumunu Öğren
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div class="mystical-card p-6 text-center">
          <div class="text-3xl mb-2">📊</div>
          <div class="text-2xl font-bold text-white">{{ fortuneStore.fortunes.length }}</div>
          <div class="text-purple-200">Toplam Fal</div>
        </div>
        
        <div class="mystical-card p-6 text-center">
          <div class="text-3xl mb-2">⭐</div>
          <div class="text-2xl font-bold text-white">
            {{ userStore.isPremium ? '∞' : userStore.remainingFortuneCount }}
          </div>
          <div class="text-purple-200">
            {{ userStore.isPremium ? 'Premium Üye' : 'Kalan Hak' }}
          </div>
        </div>
        
        <div class="mystical-card p-6 text-center">
          <div class="text-3xl mb-2">🎭</div>
          <div class="text-2xl font-bold text-white">{{ fortuneStore.categories.length }}</div>
          <div class="text-purple-200">Fal Türü</div>
        </div>
        
        <div class="mystical-card p-6 text-center">
          <div class="text-3xl mb-2">📅</div>
          <div class="text-2xl font-bold text-white">
            {{ daysSinceJoined }}
          </div>
          <div class="text-purple-200">Gün Önce Katıldı</div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-white mb-6">Hızlı İşlemler</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <router-link
            to="/categories"
            class="mystical-card p-6 text-center hover:scale-105 transition-transform duration-300"
          >
            <div class="text-4xl mb-3">🔮</div>
            <div class="text-white font-semibold">Yeni Fal</div>
          </router-link>
          
          <router-link
            v-if="!userStore.isPremium"
            to="/subscription"
            class="mystical-card p-6 text-center hover:scale-105 transition-transform duration-300"
          >
            <div class="text-4xl mb-3">⭐</div>
            <div class="text-white font-semibold">Premium Ol</div>
          </router-link>
          
          <button
            @click="shareProfile"
            class="mystical-card p-6 text-center hover:scale-105 transition-transform duration-300"
          >
            <div class="text-4xl mb-3">📤</div>
            <div class="text-white font-semibold">Paylaş</div>
          </button>
          
          <button
            @click="exportFortunes"
            class="mystical-card p-6 text-center hover:scale-105 transition-transform duration-300"
          >
            <div class="text-4xl mb-3">📥</div>
            <div class="text-white font-semibold">Dışa Aktar</div>
          </button>
        </div>
      </div>

      <!-- Recent Fortunes -->
      <div>
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-white">Fal Geçmişin</h2>
          <div class="flex gap-2">
            <button
              v-for="cat in filterCategories"
              :key="cat.id"
              @click="selectedCategory = cat.id"
              class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
              :class="selectedCategory === cat.id 
                ? 'bg-purple-600 text-white' 
                : 'bg-white/10 text-purple-200 hover:bg-white/20'"
            >
              {{ cat.icon }} {{ cat.name }}
            </button>
          </div>
        </div>

        <div v-if="filteredFortunes.length === 0" class="text-center py-12">
          <div class="mystical-card p-8">
            <div class="text-6xl mb-4">🔮</div>
            <h3 class="text-xl font-bold text-white mb-2">Henüz Fal Yok</h3>
            <p class="text-purple-200 mb-6">İlk falınızı baktırmak için aşağıdaki butona tıklayın</p>
            <router-link to="/categories" class="mystical-button">
              Falına Bak
            </router-link>
          </div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="fortune in paginatedFortunes"
            :key="fortune.id"
            class="mystical-card p-6 hover:scale-105 transition-transform duration-300"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <span class="text-2xl mr-2">
                  {{ fortuneStore.getCategoryById(fortune.category)?.icon }}
                </span>
                <span class="text-white font-semibold">
                  {{ fortuneStore.getCategoryById(fortune.category)?.name }}
                </span>
              </div>
              <span class="text-xs text-purple-300">
                {{ formatDate(fortune.createdAt) }}
              </span>
            </div>

            <div v-if="fortune.image" class="mb-4">
              <img 
                :src="fortune.image" 
                alt="Fortune image" 
                class="w-full h-32 object-cover rounded-lg"
              />
            </div>

            <div v-if="fortune.question" class="mb-3">
              <p class="text-purple-200 text-sm font-medium mb-1">Soru:</p>
              <p class="text-white text-sm">{{ fortune.question }}</p>
            </div>

            <div class="mb-4">
              <p class="text-purple-200 text-sm font-medium mb-1">Yorum:</p>
              <p class="text-white text-sm line-clamp-3">{{ fortune.result }}</p>
            </div>

            <button
              @click="showFortuneDetail(fortune)"
              class="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Detayı Gör
            </button>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center mt-8">
          <div class="flex gap-2">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="currentPage = page"
              class="px-4 py-2 rounded-lg transition-all duration-300"
              :class="currentPage === page 
                ? 'bg-purple-600 text-white' 
                : 'bg-white/10 text-purple-200 hover:bg-white/20'"
            >
              {{ page }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Fortune Detail Modal -->
    <div
      v-if="selectedFortune"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      @click="selectedFortune = null"
    >
      <div
        class="mystical-card p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold text-white flex items-center">
            <span class="text-3xl mr-2">
              {{ fortuneStore.getCategoryById(selectedFortune.category)?.icon }}
            </span>
            {{ fortuneStore.getCategoryById(selectedFortune.category)?.name }}
          </h3>
          <button
            @click="selectedFortune = null"
            class="text-purple-300 hover:text-white"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="space-y-6">
          <div v-if="selectedFortune.image">
            <img 
              :src="selectedFortune.image" 
              alt="Fortune image" 
              class="w-full rounded-lg"
            />
          </div>

          <div v-if="selectedFortune.question">
            <h4 class="text-lg font-semibold text-white mb-2">Soru:</h4>
            <p class="text-purple-200">{{ selectedFortune.question }}</p>
          </div>

          <div>
            <h4 class="text-lg font-semibold text-white mb-2">Fal Yorumu:</h4>
            <div class="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg p-4">
              <p class="text-white leading-relaxed">{{ selectedFortune.result }}</p>
            </div>
          </div>

          <div class="text-sm text-purple-300">
            {{ formatDate(selectedFortune.createdAt) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import { useFortuneStore } from '../stores/fortune'

const userStore = useUserStore()
const fortuneStore = useFortuneStore()

const selectedCategory = ref('all')
const currentPage = ref(1)
const itemsPerPage = 6
const selectedFortune = ref(null)

const daysSinceJoined = computed(() => {
  if (!userStore.user?.createdAt) return 0
  const joinDate = new Date(userStore.user.createdAt)
  const today = new Date()
  const diffTime = Math.abs(today - joinDate)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
})

const filterCategories = computed(() => {
  return [
    { id: 'all', name: 'Tümü', icon: '🎯' },
    ...fortuneStore.categories
  ]
})

const filteredFortunes = computed(() => {
  if (selectedCategory.value === 'all') {
    return fortuneStore.fortunes
  }
  return fortuneStore.fortunes.filter(f => f.category === selectedCategory.value)
})

const totalPages = computed(() => {
  return Math.ceil(filteredFortunes.value.length / itemsPerPage)
})

const paginatedFortunes = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredFortunes.value.slice(start, start + itemsPerPage)
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const showFortuneDetail = (fortune) => {
  selectedFortune.value = fortune
}

const shareProfile = () => {
  const text = `Sihirli Fincan'da ${fortuneStore.fortunes.length} fal baktırdım! Sen de yapay zeka destekli falına bakmak ister misin?`
  if (navigator.share) {
    navigator.share({
      title: 'Sihirli Fincan',
      text: text,
      url: window.location.origin
    })
  } else {
    navigator.clipboard.writeText(text + ' ' + window.location.origin)
    alert('Paylaşım metni kopyalandı!')
  }
}

const exportFortunes = () => {
  const data = {
    user: userStore.user,
    fortunes: fortuneStore.fortunes,
    exportDate: new Date().toISOString()
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `sihirli-fincan-fallarim-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
}

const setupOpenAI = () => {
  alert(`OpenAI API Kurulumu:

1. https://platform.openai.com adresinden API key alın
2. Proje ana dizininde .env dosyası oluşturun
3. Şu satırı ekleyin:
   VITE_OPENAI_API_KEY=your-api-key-here
4. Sayfayı yenileyin

Not: API key'inizi kimseyle paylaşmayın ve production'da backend'de saklayın.`)
}

onMounted(async () => {
  // Reset page when category changes
  selectedCategory.value = 'all'
  currentPage.value = 1
  
  // Check OpenAI status
  await fortuneStore.checkOpenAIStatus()
})
</script> 