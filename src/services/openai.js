import OpenAI from 'openai'

// OpenAI istemcisini başlat
let openai = null

try {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY
  if (apiKey && apiKey.trim() && apiKey !== 'your-openai-api-key-here') {
    openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true // Browser'da çalışması için gerekli
    })
    console.log('✅ OpenAI client initialized successfully')
  } else {
    console.warn('⚠️ OpenAI API key not found. Using mock responses.')
  }
} catch (error) {
  console.warn('❌ OpenAI initialization failed:', error)
}

// Fal kategorilerine göre promptlar
const fortunePrompts = {
  coffee: {
    system: "Sen profesyonel bir kahve falı uzmanısın. Gönderilen kahve fincanı fotoğrafına bakarak, geleneksel kahve falı yorumları yapıyorsun. Yorumların pozitif, umut verici ve gizemli olmalı. Türkçe yanıt ver.",
    user: (question) => `Bu kahve fincanındaki şekilleri yorumla. ${question ? `Özel sorum: ${question}` : ''} Lütfen detaylı bir kahve falı yorumu yap.`
  },
  tarot: {
    system: "Sen deneyimli bir tarot uzmanısın. Sorulan sorulara mystik ve derinlikli tarot yorumları yapıyorsun. Kartları çekmiş gibi davran ve anlamlı yorumlar sun. Türkçe yanıt ver.",
    user: (question) => `Tarot kartları için sorum: "${question}". Lütfen 3 kart çekmiş gibi (geçmiş-şimdi-gelecek) detaylı bir tarot yorumu yap.`
  },
  palm: {
    system: "Sen uzman bir el falı okuyucususun. Gönderilen el fotoğraflarında yaşam çizgisi, kalp çizgisi, akıl çizgisi gibi detayları analiz ediyorsun. Yorumların pozitif ve öngörü dolu olmalı. Türkçe yanıt ver.",
    user: (question) => `Bu el fotoğrafındaki çizgileri analiz et. ${question ? `Özel sorum: ${question}` : ''} Lütfen detaylı bir el falı yorumu yap.`
  }
}

// OpenAI ile fal yorumu oluştur
export async function generateFortuneWithAI(category, question = '', imageBase64 = null) {
  try {
    if (!openai || !import.meta.env.VITE_OPENAI_API_KEY) {
      throw new Error('OpenAI API key bulunamadı. Lütfen .env dosyasında VITE_OPENAI_API_KEY değişkenini ayarlayın.')
    }

    const prompt = fortunePrompts[category]
    if (!prompt) {
      throw new Error('Geçersiz fal kategorisi')
    }

    const messages = [
      {
        role: "system",
        content: prompt.system
      }
    ]

    // Eğer görsel varsa (kahve falı, el falı)
    if (imageBase64 && (category === 'coffee' || category === 'palm')) {
      messages.push({
        role: "user",
        content: [
          {
            type: "text",
            text: prompt.user(question)
          },
          {
            type: "image_url",
            image_url: {
              url: imageBase64
            }
          }
        ]
      })
    } else {
      // Sadece metin (tarot)
      messages.push({
        role: "user",
        content: prompt.user(question)
      })
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Görsel analiz için gpt-4-vision-preview kullan
      messages: messages,
      max_tokens: 500,
      temperature: 0.8 // Yaratıcılık için biraz yüksek
    })

    return response.choices[0].message.content
  } catch (error) {
    console.error('OpenAI API Hatası:', error)
    
    // Fallback: Hata durumunda mock yanıt döndür
    return generateMockFortune(category)
  }
}

// Fallback mock yanıtlar (API hatası durumunda)
function generateMockFortune(category) {
  const mockResults = {
    coffee: [
      "Fincanınızda geleceğe dair güzel işaretler görüyorum. Önümüzdeki dönemde önemli bir fırsat kapınızı çalacak.",
      "Aşk hayatınızda güzel gelişmeler var. Kalbimdeki şüpheler yakında netleşecek.",
      "Maddi konularda dikkatli olmalısınız, ancak sabırlı olursanız kazanç elde edeceksiniz."
    ],
    tarot: [
      "Kartlar size güçlü bir değişim döneminin yaklaştığını söylüyor. Cesaretinizi toplayın.",
      "İçsel gücünüzü keşfetme zamanı geldi. Kendi potansiyelinize güvenin.",
      "Geçmişten gelen bir sorun çözüme kavuşacak. Sabırlı olmaya devam edin."
    ],
    palm: [
      "El çizgileriniz yaratıcı yeteneklerinizi işaret ediyor. Sanatsal bir uğraşa yönelmelisiniz.",
      "Yaşam çizginiz uzun ve güçlü. Sağlıklı bir yaşam sizi bekliyor.",
      "Kalp çizginiz derin bir aşk yaşayacağınızı gösteriyor. Kalbinizi açık tutun."
    ]
  }

  const results = mockResults[category] || mockResults.coffee
  return results[Math.floor(Math.random() * results.length)]
}

// API durumu kontrol et
export async function checkOpenAIConnection() {
  try {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY
    if (!openai || !apiKey || !apiKey.trim() || apiKey === 'your-openai-api-key-here') {
      return { connected: false, error: 'API key bulunamadı' }
    }

    // Basit bir test çağrısı
    await openai.models.list()
    return { connected: true }
  } catch (error) {
    return { connected: false, error: error.message }
  }
} 