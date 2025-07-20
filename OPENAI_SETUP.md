# 🤖 OpenAI API Kurulum Rehberi

Bu rehber, Sihirli Fincan projesinde gerçek AI yanıtları almak için OpenAI API'sini nasıl kuracağınızı anlatmaktadır.

## 📋 Gereksinimler

- OpenAI hesabı
- API key'i
- Kredi kartı (API kullanımı için)

## 🔧 Kurulum Adımları

### 1. OpenAI Hesabı Oluşturun

1. [https://platform.openai.com](https://platform.openai.com) adresine gidin
2. "Sign up" butonuna tıklayın
3. E-posta ve telefon doğrulamasını tamamlayın

### 2. API Key Alın

1. [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) adresine gidin
2. "Create new secret key" butonuna tıklayın
3. Key'e bir isim verin (örn: "sihirli-fincan")
4. API key'i kopyalayın ve güvenli bir yerde saklayın
   - ⚠️ **ÖNEMLİ:** Bu key'i bir daha göremeyeceksiniz!

### 3. Ödeme Bilgilerini Ekleyin

1. [https://platform.openai.com/account/billing](https://platform.openai.com/account/billing) adresine gidin
2. "Add payment method" butonuna tıklayın
3. Kredi kartı bilgilerinizi girin
4. İsteğe bağlı: Aylık harcama limiti belirleyin

### 4. Projeye API Key'i Ekleyin

1. Proje ana dizininde `.env` dosyası oluşturun:
```bash
# Proje ana dizininde
touch .env
```

2. `.env` dosyasını açın ve şu satırı ekleyin:
```env
VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

3. `xxxxxxx` yerine gerçek API key'inizi yazın

### 5. Projeyi Yeniden Başlatın

```bash
npm run dev
```

## 🎯 Desteklenen Özellikler

### ☕ Kahve Falı
- **Model:** gpt-4o-mini (görsel analiz)
- **Özellik:** Kahve fincanı fotoğrafını analiz eder
- **Prompt:** Profesyonel kahve falı uzmanı rolü

### 🔮 Tarot
- **Model:** gpt-4o-mini
- **Özellik:** Metin tabanlı tarot yorumu
- **Prompt:** 3 kart (geçmiş-şimdi-gelecek) yorumu

### 🖐️ El Falı
- **Model:** gpt-4o-mini (görsel analiz)
- **Özellik:** El çizgilerini analiz eder
- **Prompt:** Uzman el falı okuyucusu rolü

## 💰 Maliyet Bilgileri

### gpt-4o-mini Fiyatları (2024)
- **Input:** $0.150 / 1M token
- **Output:** $0.600 / 1M token
- **Görsel:** $0.2833 / görsel

### Tahmini Kullanım
- **Metin fal:** ~0.005$ per fortune
- **Görsel fal:** ~0.30$ per fortune

### Günlük Kullanım Örneği
- 50 fal/gün = ~$15/gün
- Aylık ~$450

## 🔒 Güvenlik

### ✅ Yapılması Gerekenler
- API key'i `.env` dosyasında saklayın
- `.env` dosyasını `.gitignore`'a ekleyin
- Production'da environment variables kullanın

### ❌ Yapılmaması Gerekenler
- API key'i kodda yazmayın
- GitHub'a push etmeyin
- Kimseyle paylaşmayın

## 🚀 Production Kurulumu

Production ortamında API key'i güvenli şekilde saklamak için:

### Vercel
```bash
vercel env add VITE_OPENAI_API_KEY
```

### Netlify
```bash
netlify env:set VITE_OPENAI_API_KEY your-api-key
```

### Docker
```dockerfile
ENV VITE_OPENAI_API_KEY=your-api-key
```

## 🛠️ Hata Giderme

### "API key bulunamadı" Hatası
1. `.env` dosyasının proje ana dizininde olduğunu kontrol edin
2. `VITE_OPENAI_API_KEY` yazımını kontrol edin
3. Sunucuyu yeniden başlatın (`npm run dev`)

### "Unauthorized" Hatası
1. API key'in doğru olduğunu kontrol edin
2. OpenAI hesabınızda kredi olduğunu kontrol edin
3. API key'in aktif olduğunu kontrol edin

### "Rate limit" Hatası
1. Çok fazla istek gönderiyorsunuz
2. Ödeme planınızı yükseltin
3. İstekleri yavaşlatın

## 📊 Kullanım İzleme

OpenAI kullanımınızı izlemek için:
1. [https://platform.openai.com/usage](https://platform.openai.com/usage)
2. Günlük/aylık harcamalarınızı görün
3. Token kullanımını analiz edin

## 🔄 Fallback Sistemi

API hatası durumunda proje otomatik olarak mock yanıtlara geçer:
- Kullanıcı deneyimi kesintisiz devam eder
- Dashboard'da AI/Mock badge'leri gösterilir
- Console'da hata logları yazdırılır

## 📞 Destek

Sorun yaşıyorsanız:
1. Console loglarını kontrol edin
2. OpenAI status sayfasını kontrol edin
3. API key'inizin geçerli olduğunu doğrulayın

---

**Not:** Bu proje eğitim amaçlıdır. Production kullanımında güvenlik ve maliyet optimizasyonları yapın. 

## 🤖 OpenAI API Entegrasyonu Tamamlandı

### ✅ Eklenen Özellikler

1. **OpenAI SDK Kurulumu**
   - `openai` paketi eklendi
   - gpt-4o-mini modeli ile görsel analiz desteği

2. **AI Servis Sistemi**
   - `src/services/openai.js` - OpenAI API çağrıları
   - Her fal kategorisi için özel promptlar
   - Görsel analiz desteği (kahve falı, el falı)

3. **Akıllı Fallback Sistemi**
   - API hatası durumunda otomatik mock yanıt
   - Kullanıcı deneyimi kesintisiz
   - Hata logları ve durum takibi

4. **UI Geliştirmeleri**
   - OpenAI durum göstergesi (Dashboard)
   - AI/Mock badge'leri (fal sonuçlarında)
   - API kurulum uyarıları
   - Gerçek zamanlı durum kontrolü

### 🔧 API Kurulumu

**Hızlı Kurulum:**
1. [OpenAI Platform](https://platform.openai.com/account/api-keys)'dan API key alın
2. Proje ana dizininde `.env` dosyası oluşturun:
```env
<code_block_to_apply_changes_from>
```
3. Sunucuyu yeniden başlatın: `npm run dev`

**Detaylı Rehber:** `OPENAI_SETUP.md` dosyasını inceleyin

### 🎯 Desteklenen AI Özellikleri

- **☕ Kahve Falı:** Fotoğraf analizi + AI yorumu
- **🔮 Tarot:** Metin tabanlı 3 kart yorumu  
- **🖐️ El Falı:** El çizgisi analizi + AI yorumu

### 💡 Demo Testi

1. **API Key Olmadan:** Mock yanıtlar çalışır
2. **API Key İle:** Gerçek AI yanıtları alırsınız
3. **UI'da Fark:** AI/Mock badge'leri ile görürsünüz

### 📊 Maliyet Bilgisi

- **Metin fal:** ~$0.005 per fal
- **Görsel fal:** ~$0.30 per fal
- Günlük 50 fal = ~$15

Proje şu anda hem OpenAI API hem de mock sistemle çalışıyor. API key eklemeden de test edebilir, eklediğinizde gerçek AI yanıtları alabilirsiniz!

Projeyi test etmek ister misiniz? Hangi özelliği denemek istiyorsunuz? 