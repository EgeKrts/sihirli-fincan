<template>
  <div class="min-h-screen py-12 px-4">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-mystical text-white mb-4 flex items-center justify-center">
          <span class="text-5xl mr-3">{{ category?.icon }}</span>
          {{ category?.name }}
        </h1>
        <p class="text-xl text-purple-200">
          {{ category?.description }}
        </p>
      </div>

      <!-- AI Status Warning - Gizli -->
      <div v-if="false" class="mystical-card p-4 mb-6 border-2 border-yellow-400">
        <div class="flex items-center text-yellow-400">
          <span class="text-2xl mr-3">⚠️</span>
          <div>
            <p class="font-semibold">OpenAI API bağlı değil</p>
            <p class="text-sm text-purple-200">Bu fal mock (sahte) yanıt kullanacak. Gerçek AI için API key gerekli.</p>
          </div>
        </div>
      </div>

      <div class="mystical-card p-8">
        <form @submit.prevent="submitFortune" class="space-y-6">
          <!-- Image Upload for image-based categories -->
          <div v-if="category?.type === 'image'">
            <label class="block text-lg font-medium text-white mb-4">
              {{ category.id === 'coffee' ? 'Kahve Fincanınızın Fotoğrafı' : 'El Fotoğrafınız' }}
            </label>
            
            <div 
              @drop="handleDrop"
              @dragover.prevent
              @dragenter.prevent
              class="border-2 border-dashed border-purple-400 rounded-lg p-8 text-center hover:border-purple-300 transition-colors cursor-pointer"
              :class="{ 'border-green-400': form.image }"
            >
              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                @change="handleFileSelect"
                class="hidden"
              />
              
              <div v-if="!form.image" @click="$refs.fileInput.click()">
                <svg class="mx-auto h-12 w-12 text-purple-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p class="text-purple-200 text-lg mb-2">Fotoğrafınızı buraya sürükleyin</p>
                <p class="text-purple-300">veya tıklayarak seçin</p>
              </div>
              
              <div v-else class="space-y-4">
                <img :src="form.imagePreview" alt="Preview" class="max-w-full h-64 object-contain mx-auto rounded-lg" />
                <div class="flex gap-4 justify-center">
                  <button
                    type="button"
                    @click="$refs.fileInput.click()"
                    class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Değiştir
                  </button>
                  <button
                    type="button"
                    @click="removeImage"
                    class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Kaldır
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Question/Description -->
          <div>
            <label class="block text-lg font-medium text-white mb-4">
              {{ category?.type === 'text' ? 'Sorunuzu Yazın' : 'Ek Bilgi (İsteğe Bağlı)' }}
            </label>
            <textarea
              v-model="form.question"
              :required="category?.type === 'text'"
              :placeholder="getPlaceholderText()"
              rows="6"
              class="mystical-input w-full resize-none"
            ></textarea>
          </div>

          <div v-if="error" class="text-red-400 text-center">
            {{ error }}
          </div>

          <div class="flex gap-4 justify-center">
            <router-link
              to="/categories"
              class="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300"
            >
              Geri Dön
            </router-link>
            <button
              type="submit"
              :disabled="!canSubmit || fortuneStore.isGenerating"
              class="mystical-button"
            >
              <span v-if="fortuneStore.isGenerating">
                <span class="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                Fal Yorumlanıyor...
              </span>
              <span v-else>Falımı Gör</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Fortune Result -->
      <div v-if="fortuneStore.currentFortune" class="mt-8">
        <div class="mystical-card p-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-white text-center w-full">Falınızın Yorumu</h2>
          </div>
          
          <div class="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg p-6 mb-6">
            <p class="text-white text-lg leading-relaxed">
              {{ fortuneStore.currentFortune.result }}
            </p>
          </div>
          
          <div class="text-center">
            <router-link to="/dashboard" class="mystical-button mr-4">
              Tüm Fallarım
            </router-link>
            <router-link to="/categories" class="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 border border-white/30">
              Yeni Fal
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { useFortuneStore } from '../stores/fortune'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const fortuneStore = useFortuneStore()

const form = ref({
  question: '',
  image: null,
  imagePreview: null
})

const error = ref('')
const fileInput = ref(null)

const category = computed(() => {
  return fortuneStore.getCategoryById(route.params.category)
})

const canSubmit = computed(() => {
  if (category.value?.type === 'image') {
    return form.value.image !== null
  } else {
    return form.value.question.trim().length > 0
  }
})

onMounted(async () => {
  // Clear any previous fortune result
  fortuneStore.clearCurrentFortune()
  
  // Check if user can submit fortune
  if (!userStore.canSubmitFortune) {
    router.push('/subscription')
  }
  
  // Check OpenAI status
  await fortuneStore.checkOpenAIStatus()
})

const getPlaceholderText = () => {
  if (category.value?.id === 'tarot') {
    return 'Tarot kartlarından öğrenmek istediğiniz konuyu yazın. Örneğin: "Aşk hayatımda neler beni bekliyor?" veya "Kariyerimde hangi adımları atmalıyım?"'
  } else if (category.value?.type === 'image') {
    return 'Falınız hakkında özel bir sorunuz varsa buraya yazabilirsiniz...'
  }
  return 'Sorunuzu detaylı olarak yazın...'
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    processFile(file)
  }
}

const handleDrop = (event) => {
  event.preventDefault()
  const file = event.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    processFile(file)
  }
}

const processFile = (file) => {
  if (file.size > 5 * 1024 * 1024) { // 5MB limit
    error.value = 'Dosya boyutu 5MB\'dan küçük olmalıdır'
    return
  }

  form.value.image = file
  
  const reader = new FileReader()
  reader.onload = (e) => {
    form.value.imagePreview = e.target.result
  }
  reader.readAsDataURL(file)
  
  error.value = ''
}

const removeImage = () => {
  form.value.image = null
  form.value.imagePreview = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const submitFortune = async () => {
  try {
    error.value = ''
    
    const fortuneData = {
      category: category.value.id,
      question: form.value.question,
      image: form.value.imagePreview
    }

    await fortuneStore.submitFortune(fortuneData)
    userStore.useFortune()
    
    // Scroll to result
    setTimeout(() => {
      document.querySelector('.mystical-card:last-child')?.scrollIntoView({ 
        behavior: 'smooth' 
      })
    }, 100)
    
  } catch (err) {
    error.value = 'Fal gönderilirken bir hata oluştu. Lütfen tekrar deneyin.'
  }
}
</script> 