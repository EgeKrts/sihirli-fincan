import { defineStore } from 'pinia'
import { generateFortuneWithAI, checkOpenAIConnection } from '../services/openai'

export const useFortuneStore = defineStore('fortune', {
  state: () => ({
    fortunes: JSON.parse(localStorage.getItem('fortunes') || '[]'),
    categories: [
      {
        id: 'coffee',
        name: 'Kahve Falı',
        description: 'Kahve fincanınızın fotoğrafını gönderin, AI size falınızı yorsun',
        icon: '☕',
        type: 'image',
        color: 'from-amber-500 to-orange-600'
      },
      {
        id: 'tarot',
        name: 'Tarot Kartları',
        description: 'Sorunuzu yazın ve AI size tarot yorumu yapsın',
        icon: '🔮',
        type: 'text',
        color: 'from-purple-500 to-indigo-600'
      },
      {
        id: 'palm',
        name: 'El Falı',
        description: 'Avuç içinizin fotoğrafını gönderin, el çizgilerinizi yorumlayalım',
        icon: '🖐️',
        type: 'image',
        color: 'from-pink-500 to-rose-600'
      }
    ],
    currentFortune: null,
    isGenerating: false,
    openaiStatus: { connected: false, error: null }
  }),

  actions: {
    async checkOpenAIStatus() {
      this.openaiStatus = await checkOpenAIConnection()
    },

    async submitFortune(fortuneData) {
      this.isGenerating = true
      
      try {
        console.log('Fal gönderiliyor:', fortuneData.category)
        
        // OpenAI API ile fal yorumu oluştur
        const result = await generateFortuneWithAI(
          fortuneData.category,
          fortuneData.question,
          fortuneData.image
        )
        
        const fortune = {
          id: Date.now(),
          category: fortuneData.category,
          question: fortuneData.question,
          image: fortuneData.image,
          result: result,
          createdAt: new Date().toISOString(),
          status: 'completed',
          isAIGenerated: !!import.meta.env.VITE_OPENAI_API_KEY
        }

        this.fortunes.unshift(fortune)
        this.currentFortune = fortune
        
        // Save to localStorage
        localStorage.setItem('fortunes', JSON.stringify(this.fortunes))
        
        console.log('Fal başarıyla oluşturuldu')
        return fortune
      } catch (error) {
        console.error('Error generating fortune:', error)
        
        // Fallback: Mock yanıt kullan
        const mockResult = this.generateMockFortune(fortuneData.category)
        const fortune = {
          id: Date.now(),
          category: fortuneData.category,
          question: fortuneData.question,
          image: fortuneData.image,
          result: mockResult,
          createdAt: new Date().toISOString(),
          status: 'completed',
          isAIGenerated: false
        }

        this.fortunes.unshift(fortune)
        this.currentFortune = fortune
        localStorage.setItem('fortunes', JSON.stringify(this.fortunes))
        
        return fortune
      } finally {
        this.isGenerating = false
      }
    },

    generateMockFortune(category) {
      const mockResults = {
        coffee: [
          "Fincanınızda geleceğe dair güzel işaretler görüyorum. Önümüzdeki dönemde önemli bir fırsat kapınızı çalacak.",
          "Aşk hayatınızda güzel gelişmeler var. Kalbimdeki şüpheler yakında netleşecek.",
          "Maddi konularda dikkatli olmalısınız, ancak sabırlı olursanız kazanç elde edeceksiniz.",
          "Fincanınızın dibindeki şekiller yaratıcılığınızın artacağını gösteriyor.",
          "Önümüzdeki aylarda yeni bir dostluk kurabilirsiniz."
        ],
        tarot: [
          "Kartlar size güçlü bir değişim döneminin yaklaştığını söylüyor. Cesaretinizi toplayın.",
          "İçsel gücünüzü keşfetme zamanı geldi. Kendi potansiyelinize güvenin.",
          "Geçmişten gelen bir sorun çözüme kavuşacak. Sabırlı olmaya devam edin.",
          "Aşk kartları olumlu enerji gönderiyor. Kalbinizi açık tutun.",
          "Maddi konularda yeni fırsatlar doğacak. Hazır olun."
        ],
        palm: [
          "El çizgileriniz yaratıcı yeteneklerinizi işaret ediyor. Sanatsal bir uğraşa yönelmelisiniz.",
          "Yaşam çizginiz uzun ve güçlü. Sağlıklı bir yaşam sizi bekliyor.",
          "Kalp çizginiz derin bir aşk yaşayacağınızı gösteriyor. Kalbinizi açık tutun.",
          "Akıl çizginiz başarılı projeler geliştireceğinizi gösteriyor.",
          "Parmak uçlarınızdaki çizgiler şans getireceğinizi işaret ediyor."
        ]
      }

      const results = mockResults[category] || mockResults.coffee
      return results[Math.floor(Math.random() * results.length)]
    },

    getCategoryById(id) {
      return this.categories.find(cat => cat.id === id)
    },

    clearCurrentFortune() {
      this.currentFortune = null
    }
  },

  getters: {
    recentFortunes: (state) => {
      return state.fortunes.slice(0, 5)
    },

    fortunesByCategory: (state) => {
      return (category) => state.fortunes.filter(f => f.category === category)
    },

    aiGeneratedCount: (state) => {
      return state.fortunes.filter(f => f.isAIGenerated).length
    },

    mockGeneratedCount: (state) => {
      return state.fortunes.filter(f => !f.isAIGenerated).length
    }
  }
}) 