<template>
  <div class="min-h-screen py-12 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-5xl font-mystical text-white mb-4">Premium Üyelik</h1>
        <p class="text-xl text-purple-200 max-w-3xl mx-auto">
          Sınırsız fal deneyimi ile geleceğinizi keşfetmeye devam edin
        </p>
      </div>

      <!-- Current Status -->
      <div v-if="userStore.isAuthenticated" class="text-center mb-12">
        <div class="mystical-card p-6 max-w-md mx-auto">
          <div v-if="userStore.isPremium" class="text-green-400">
            <div class="text-4xl mb-2">⭐</div>
            <h3 class="text-xl font-bold text-white mb-2">Premium Üyesiniz!</h3>
            <p class="text-purple-200">Sınırsız fal hakkınız bulunuyor</p>
          </div>
          <div v-else class="text-orange-400">
            <div class="text-4xl mb-2">⏰</div>
            <h3 class="text-xl font-bold text-white mb-2">
              {{ userStore.remainingFortuneCount }} Fal Hakkınız Kaldı
            </h3>
            <p class="text-purple-200">Premium ol ve sınırsız fal hakkı kazan</p>
          </div>
        </div>
      </div>

      <!-- Pricing Plans -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <!-- Free Plan -->
        <div class="mystical-card p-8 text-center">
          <div class="text-4xl mb-4">🆓</div>
          <h3 class="text-2xl font-bold text-white mb-2">Ücretsiz</h3>
          <div class="text-3xl font-bold text-white mb-4">₺0</div>
          <p class="text-purple-200 mb-6">Deneme için mükemmel</p>
          
          <ul class="text-left space-y-3 mb-8">
            <li class="flex items-center text-purple-200">
              <span class="text-green-400 mr-2">✓</span>
              3 fal hakkı
            </li>
            <li class="flex items-center text-purple-200">
              <span class="text-green-400 mr-2">✓</span>
              AI destekli yorumlama
            </li>
            <li class="flex items-center text-purple-200">
              <span class="text-green-400 mr-2">✓</span>
              Tüm fal kategorileri
            </li>
            <li class="flex items-center text-red-400">
              <span class="text-red-400 mr-2">✗</span>
              Sınırsız erişim
            </li>
          </ul>
          
          <button
            v-if="!userStore.isAuthenticated"
            @click="$router.push('/register')"
            class="mystical-button w-full"
          >
            Kayıt Ol
          </button>
          <div v-else class="text-purple-300">Mevcut Planınız</div>
        </div>

        <!-- Premium Monthly -->
        <div class="mystical-card p-8 text-center border-2 border-purple-400 relative">
          <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold">
            Popüler
          </div>
          <div class="text-4xl mb-4">⭐</div>
          <h3 class="text-2xl font-bold text-white mb-2">Premium Aylık</h3>
          <div class="text-3xl font-bold text-white mb-4">₺29</div>
          <p class="text-purple-200 mb-6">Aylık yenilenen</p>
          
          <ul class="text-left space-y-3 mb-8">
            <li class="flex items-center text-purple-200">
              <span class="text-green-400 mr-2">✓</span>
              Sınırsız fal hakkı
            </li>
            <li class="flex items-center text-purple-200">
              <span class="text-green-400 mr-2">✓</span>
              Öncelikli AI yanıtları
            </li>
            <li class="flex items-center text-purple-200">
              <span class="text-green-400 mr-2">✓</span>
              Detaylı yorumlar
            </li>
            <li class="flex items-center text-purple-200">
              <span class="text-green-400 mr-2">✓</span>
              Geçmiş falları kaydetme
            </li>
            <li class="flex items-center text-purple-200">
              <span class="text-green-400 mr-2">✓</span>
              Premium destek
            </li>
          </ul>
          
          <button
            v-if="!userStore.isPremium"
            @click="subscribeToPremium('monthly')"
            :disabled="loading"
            class="mystical-button w-full"
          >
            <span v-if="loading">İşleniyor...</span>
            <span v-else>Premium Ol</span>
          </button>
          <div v-else class="text-green-400 font-bold">Aktif Plan</div>
        </div>

        <!-- Premium Yearly -->
        <div class="mystical-card p-8 text-center">
          <div class="text-4xl mb-4">💎</div>
          <h3 class="text-2xl font-bold text-white mb-2">Premium Yıllık</h3>
          <div class="flex items-center justify-center mb-4">
            <span class="text-xl text-purple-300 line-through mr-2">₺348</span>
            <span class="text-3xl font-bold text-white">₺299</span>
          </div>
          <p class="text-purple-200 mb-6">%14 indirim</p>
          
          <ul class="text-left space-y-3 mb-8">
            <li class="flex items-center text-purple-200">
              <span class="text-green-400 mr-2">✓</span>
              Sınırsız fal hakkı
            </li>
            <li class="flex items-center text-purple-200">
              <span class="text-green-400 mr-2">✓</span>
              Öncelikli AI yanıtları
            </li>
            <li class="flex items-center text-purple-200">
              <span class="text-green-400 mr-2">✓</span>
              Detaylı yorumlar
            </li>
            <li class="flex items-center text-purple-200">
              <span class="text-green-400 mr-2">✓</span>
              Geçmiş falları kaydetme
            </li>
            <li class="flex items-center text-purple-200">
              <span class="text-green-400 mr-2">✓</span>
              Premium destek
            </li>
            <li class="flex items-center text-purple-200">
              <span class="text-yellow-400 mr-2">⭐</span>
              Özel premium içerikler
            </li>
          </ul>
          
          <button
            v-if="!userStore.isPremium"
            @click="subscribeToPremium('yearly')"
            :disabled="loading"
            class="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg w-full"
          >
            <span v-if="loading">İşleniyor...</span>
            <span v-else>En İyi Teklif</span>
          </button>
          <div v-else class="text-green-400 font-bold">Aktif Plan</div>
        </div>
      </div>

      <!-- Features Comparison -->
      <div class="mystical-card p-8 mb-12">
        <h2 class="text-2xl font-bold text-white text-center mb-8">Özellik Karşılaştırması</h2>
        
        <div class="overflow-x-auto">
          <table class="w-full text-white">
            <thead>
              <tr class="border-b border-purple-400">
                <th class="text-left py-4 px-2">Özellik</th>
                <th class="text-center py-4 px-2">Ücretsiz</th>
                <th class="text-center py-4 px-2">Premium</th>
              </tr>
            </thead>
            <tbody class="space-y-4">
              <tr class="border-b border-purple-800">
                <td class="py-4 px-2">Fal Hakkı</td>
                <td class="text-center py-4 px-2">3 adet</td>
                <td class="text-center py-4 px-2 text-green-400">Sınırsız</td>
              </tr>
              <tr class="border-b border-purple-800">
                <td class="py-4 px-2">AI Yorumlama</td>
                <td class="text-center py-4 px-2 text-green-400">✓</td>
                <td class="text-center py-4 px-2 text-green-400">✓</td>
              </tr>
              <tr class="border-b border-purple-800">
                <td class="py-4 px-2">Fal Geçmişi</td>
                <td class="text-center py-4 px-2 text-green-400">✓</td>
                <td class="text-center py-4 px-2 text-green-400">✓</td>
              </tr>
              <tr class="border-b border-purple-800">
                <td class="py-4 px-2">Öncelikli İşleme</td>
                <td class="text-center py-4 px-2 text-red-400">✗</td>
                <td class="text-center py-4 px-2 text-green-400">✓</td>
              </tr>
              <tr class="border-b border-purple-800">
                <td class="py-4 px-2">Detaylı Yorumlar</td>
                <td class="text-center py-4 px-2 text-red-400">✗</td>
                <td class="text-center py-4 px-2 text-green-400">✓</td>
              </tr>
              <tr>
                <td class="py-4 px-2">Premium Destek</td>
                <td class="text-center py-4 px-2 text-red-400">✗</td>
                <td class="text-center py-4 px-2 text-green-400">✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- FAQ -->
      <div class="mystical-card p-8">
        <h2 class="text-2xl font-bold text-white text-center mb-8">Sıkça Sorulan Sorular</h2>
        
        <div class="space-y-6">
          <div class="border-b border-purple-800 pb-6">
            <h3 class="text-lg font-semibold text-white mb-2">Premium üyeliği iptal edebilir miyim?</h3>
            <p class="text-purple-200">Evet, istediğiniz zaman premium üyeliğinizi iptal edebilirsiniz. İptal ettikten sonra mevcut dönemin sonuna kadar premium özelliklerden yararlanmaya devam edersiniz.</p>
          </div>
          
          <div class="border-b border-purple-800 pb-6">
            <h3 class="text-lg font-semibold text-white mb-2">Ücretsiz fallar yenilenir mi?</h3>
            <p class="text-purple-200">Hayır, ücretsiz hesaplarda 3 fal hakkı bir kerelik verilir. Daha fazla fal için premium üyelik gereklidir.</p>
          </div>
          
          <div class="border-b border-purple-800 pb-6">
            <h3 class="text-lg font-semibold text-white mb-2">AI yorumları ne kadar doğru?</h3>
            <p class="text-purple-200">AI yorumlarımız eğlence amaçlıdır ve kesinlik içermez. Gerçek yaşamda önemli kararlar için profesyonel danışmanlık alınız.</p>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold text-white mb-2">Verilerim güvende mi?</h3>
            <p class="text-purple-200">Evet, tüm verileriniz şifrelenerek saklanır ve üçüncü şahıslarla paylaşılmaz. Gizlilik politikamızı okuyarak detaylı bilgi alabilirsiniz.</p>
          </div>
        </div>
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

const loading = ref(false)

const subscribeToPremium = async (plan) => {
  loading.value = true
  
  try {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mark user as premium
    userStore.becomePremium()
    
    alert('Tebrikler! Premium üyeliğiniz başarıyla aktifleştirildi.')
    router.push('/dashboard')
  } catch (error) {
    alert('Ödeme işleminde bir hata oluştu. Lütfen tekrar deneyin.')
  } finally {
    loading.value = false
  }
}
</script> 