# 🔮 Sihirli Fincan - AI Destekli Fal Sitesi

Modern ve şık tasarımlı, yapay zeka destekli fal yorumlama sitesi. Kullanıcılar kahve falı, tarot ve el falı kategorilerinde fallarını baktırabilirler.

<img width="1457" height="917" alt="HomePage" src="https://github.com/user-attachments/assets/1df45c8a-27cc-495e-8b89-72bbeef8e2d6" />


## ✨ Özellikler

- **🔮 3 Fal Kategorisi**
  - ☕ Kahve Falı (Görsel Analiz)
  - 🎴 Tarot Kartları (Metin Tabanlı)
  - 🖐️ El Falı (Görsel Analiz)

<img width="1244" height="850" alt="CategoriesPage" src="https://github.com/user-attachments/assets/019bb420-383e-46b9-9a65-351cf25957aa" />

- **🤖 AI Destekli Yorumlama**
  - OpenAI GPT-4 Vision entegrasyonu
  - Özel prompt tasarımları
  - Fallback mock sistem

- **👥 Kullanıcı Yönetimi**
  - Kayıt/Giriş sistemi
  - Kullanıcı paneli
  - Fal geçmişi
<img width="1178" height="873" alt="Dashboard" src="https://github.com/user-attachments/assets/86583529-4edf-4229-b73b-9509ed74cd77" />

- **💎 Premium Sistem**
  - Ücretsiz 3 fal hakkı
  - Premium sınırsız erişim
  - Abonelik yönetimi
<img width="731" height="810" alt="SubscribePage" src="https://github.com/user-attachments/assets/83ec175e-79b0-4f3f-b0fe-9802f82455ea" />

- **📱 Modern UI/UX**
  - Responsive tasarım
  - Glassmorphism efektleri
  - Smooth animasyonlar
  - Dark theme

## 🚀 Teknolojiler

- **Frontend:** Vue.js 3, Composition API
- **Styling:** Tailwind CSS
- **State Management:** Pinia
- **Routing:** Vue Router 4
- **Build Tool:** Vite
- **AI Integration:** OpenAI API
- **Icons:** Unicode Emojis

## 🛠️ Kurulum

### Ön Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Proje Kurulumu

```bash
# Repository'yi klonlayın
git clone https://github.com/[kullanici-adi]/sihirli-fincan.git
cd sihirli-fincan

# Bağımlılıkları yükleyin
npm install

# Development server'ı başlatın
npm run dev
```

### OpenAI API Kurulumu (İsteğe Bağlı)

Gerçek AI yanıtları için:

1. [OpenAI Platform](https://platform.openai.com/account/api-keys)'dan API key alın
2. Proje ana dizininde `.env` dosyası oluşturun:
```env
VITE_OPENAI_API_KEY=your-openai-api-key-here
```
3. Server'ı yeniden başlatın

**Not:** API key olmadan da mock yanıtlarla tam olarak çalışır.

## 📦 Production Build

```bash
# Production build oluşturun
npm run build

# Build'i önizleyin
npm run preview
```

## 🎯 Demo

- **Demo URL:** [Buraya deploy URL'nizi ekleyin]
- **Test Kullanıcı:** `demo@sihirlifincan.com` / `123456`

## 📁 Proje Yapısı

```
sihirli-fincan/
├── src/
│   ├── components/          # Vue bileşenleri
│   │   └── Navbar.vue
│   ├── views/              # Sayfa bileşenleri
│   │   ├── Home.vue
│   │   ├── Login.vue
│   │   ├── Register.vue
│   │   ├── FortuneCategories.vue
│   │   ├── SubmitFortune.vue
│   │   ├── Dashboard.vue
│   │   └── Subscription.vue
│   ├── stores/             # Pinia stores
│   │   ├── user.js
│   │   └── fortune.js
│   ├── services/           # API servisleri
│   │   └── openai.js
│   ├── router/             # Vue Router
│   │   └── index.js
│   ├── assets/             # Statik dosyalar
│   │   └── main.css
│   └── main.js             # Ana uygulama
├── public/                 # Public dosyalar
├── OPENAI_SETUP.md        # API kurulum rehberi
└── README.md              # Bu dosya
```

## 🔧 Geliştirme

### Kullanılabilir Komutlar

```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Build önizleme
```

### Fal Kategorileri Ekleme

Yeni fal kategorisi eklemek için:

1. `src/stores/fortune.js` → `categories` array'ine ekleyin
2. `src/services/openai.js` → `fortunePrompts` objesine prompt ekleyin
3. UI'da kategori ikonu ve açıklaması otomatik görünür

## 💰 Maliyet Bilgisi

OpenAI API kullanımı (tahmini):
- **Metin fal:** ~$0.005 per fal
- **Görsel fal:** ~$0.30 per fal
- **Günlük 50 fal:** ~$15/gün

## 🔒 Güvenlik

- API key'leri environment variables'da saklanır
- .env dosyaları git'e dahil edilmez
- Client-side API kullanımı (demo amaçlı)
- Production'da backend API önerilir

## 📄 Lisans

Bu proje eğitim amaçlıdır. MIT License.

## 👨‍💻 Geliştirici

- **GitHub:** [Kullanıcı adınız]
- **Email:** [Email adresiniz]

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Changelog

### v1.0.0 (2024)
- ✅ İlk sürüm
- ✅ 3 fal kategorisi
- ✅ OpenAI entegrasyonu
- ✅ Kullanıcı sistemi
- ✅ Premium abonelik
- ✅ Responsive tasarım

---

**⚠️ Önemli:** Bu proje eğitim/demo amaçlıdır. Gerçek production kullanımında güvenlik ve performans optimizasyonları yapın.
