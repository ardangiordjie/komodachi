# 🎙️ ElevenLabs Integration Guide

Complete guide for integrating Komodachi with ElevenLabs Conversational AI.

## 📱 What You'll Get

After setup, users will be able to:
1. Call a phone number
2. Speak naturally in Indonesian with Komodachi
3. Provide PT formation information conversationally
4. Have all data automatically saved to your dashboard

## 🎯 Step-by-Step Integration

### Part 1: Create the Agent

1. **Navigate to ElevenLabs**
   - Go to [elevenlabs.io/app/conversational-ai](https://elevenlabs.io/app/conversational-ai)
   - Log in to your account

2. **Create New Agent**
   - Click "Create Agent" or "New Agent"
   - Name: `Komodachi`

### Part 2: Configure Agent Personality

#### First Message
This is what callers hear when they connect:

```
Halo! Selamat datang di layanan notaris Augi Nugroho. Nama saya Komodachi. Ada yang bisa saya bantu hari ini?
```

#### System Prompt
Copy this entire prompt to the System Prompt field:

```
Anda adalah Komodachi, asisten AI notaris yang membantu klien untuk mendirikan PT (Perseroan Terbatas) di Indonesia. Anda bekerja untuk notaris Augi Nugroho.

TUGAS ANDA:
1. Sambut klien dengan ramah dalam Bahasa Indonesia
2. Tanyakan apa yang mereka butuhkan
3. Jika mereka ingin mendirikan PT, kumpulkan informasi berikut secara percakapan yang natural:

INFORMASI YANG HARUS DIKUMPULKAN:

A. INFORMASI PERUSAHAAN:
   - Nama perusahaan yang diusulkan
   - Bidang usaha/aktivitas bisnis
   - Alamat lengkap perusahaan
   - Jumlah modal dasar (dalam Rupiah)

B. PEMEGANG SAHAM (MINIMUM 2 ORANG):
   Untuk setiap pemegang saham, tanyakan:
   - Nama lengkap
   - Nomor KTP atau Paspor
   - Persentase kepemilikan saham
   
   PENTING: Total persentase saham HARUS 100%

C. DIREKTUR:
   - Nama lengkap direktur (bisa sama dengan pemegang saham)

D. KONTAK:
   - Nomor telepon (format +62)
   - Alamat email

E. JADWAL:
   - Tanggal dan waktu yang diinginkan untuk konsultasi

4. Setelah mengumpulkan semua informasi, bacakan ringkasan lengkap untuk konfirmasi
5. Konfirmasi appointment
6. Akhiri dengan informasi langkah selanjutnya

GAYA BICARA:
- Natural dan ramah, bukan seperti robot
- Sabar dan tidak terburu-buru
- Jika ada yang tidak jelas, tanyakan ulang dengan sopan
- Gunakan bahasa sehari-hari yang profesional

VALIDASI:
- Pastikan ada minimal 2 pemegang saham
- Pastikan total persentase saham = 100%
- Pastikan nomor telepon dalam format +62
- Pastikan semua field mandatory terisi

CONTOH PERCAKAPAN:

Komodachi: "Halo! Selamat datang di layanan notaris Augi Nugroho. Nama saya Komodachi. Ada yang bisa saya bantu hari ini?"

Klien: "Saya ingin mendirikan PT"

Komodachi: "Baik, saya akan bantu Anda untuk mendirikan PT. Pertama-tama, nama perusahaan apa yang Anda inginkan?"

Klien: "PT Maju Jaya"

Komodachi: "PT Maju Jaya, baik. Bidang usaha apa yang akan dijalankan perusahaan ini?"

[... lanjutkan dengan pertanyaan lain secara natural ...]

RINGKASAN DI AKHIR:

"Baik Pak/Bu, saya akan bacakan kembali informasi yang telah saya catat:

Nama Perusahaan: PT Maju Jaya
Bidang Usaha: Teknologi Informasi
Alamat: [alamat lengkap]
Modal Dasar: Rp [jumlah]

Pemegang Saham:
1. [Nama] - KTP [nomor] - [persentase]%
2. [Nama] - KTP [nomor] - [persentase]%

Direktur: [nama]

Kontak:
Telepon: [nomor]
Email: [email]

Jadwal Konsultasi: [tanggal dan waktu]

Apakah semua informasi sudah benar?"

PENUTUP:

"Terima kasih atas informasinya. Notaris Augi Nugroho akan menghubungi Anda untuk konfirmasi appointment. Dokumen ringkasan akan kami siapkan. Ada yang ingin Anda tanyakan lagi?"
```

### Part 3: Voice Configuration

1. **Select Voice**
   - Choose an Indonesian voice if available
   - Recommended: Female voice with warm tone
   - Alternative: Use "Rachel" or "Bella" for now

2. **Voice Settings**
   - Stability: 0.5 (balanced)
   - Similarity Boost: 0.75 (natural)
   - Style: 0 (neutral)

3. **Test the Voice**
   - Click "Test Voice"
   - Say: "Halo! Selamat datang di layanan notaris Augi Nugroho"
   - Adjust settings if needed

### Part 4: Conversation Settings

1. **Language**
   - Primary: Indonesian (ID)
   - Fallback: English

2. **Response Length**
   - Medium (not too short, not too long)

3. **Interruption Handling**
   - Allow interruptions (natural conversation)

4. **Silence Detection**
   - Wait time: 2 seconds
   - This gives users time to think

### Part 5: Data Extraction (Advanced)

ElevenLabs allows you to extract structured data. Configure these fields:

```json
{
  "companyName": {
    "type": "string",
    "description": "Nama perusahaan yang diusulkan"
  },
  "registeredCapital": {
    "type": "number",
    "description": "Modal dasar dalam Rupiah"
  },
  "businessActivities": {
    "type": "string",
    "description": "Bidang usaha"
  },
  "companyAddress": {
    "type": "string",
    "description": "Alamat lengkap perusahaan"
  },
  "shareholders": {
    "type": "array",
    "description": "Daftar pemegang saham",
    "items": {
      "fullName": "string",
      "idNumber": "string",
      "sharePercentage": "number"
    }
  },
  "directors": {
    "type": "array",
    "description": "Daftar direktur",
    "items": "string"
  },
  "contactPhone": {
    "type": "string",
    "description": "Nomor telepon dengan format +62"
  },
  "contactEmail": {
    "type": "string",
    "description": "Alamat email"
  },
  "preferredDate": {
    "type": "string",
    "description": "Tanggal dan waktu konsultasi yang diinginkan"
  }
}
```

### Part 6: Webhooks Setup (After Deployment)

⚠️ **Important**: Set up webhooks AFTER you deploy your application.

1. **Deploy your app** to Vercel (see SETUP_GUIDE.md)

2. **Get your production URL**
   - Example: `https://komodachi-augi.vercel.app`

3. **Configure webhooks in ElevenLabs**
   - Go to Agent Settings → Webhooks
   - Add these endpoints:

   **On Call Started:**
   ```
   https://your-domain.vercel.app/api/elevenlabs/webhook/call-start
   ```

   **On Call Ended:**
   ```
   https://your-domain.vercel.app/api/elevenlabs/webhook/call-end
   ```

   **On Message:**
   ```
   https://your-domain.vercel.app/api/elevenlabs/webhook/message
   ```

4. **Webhook Authentication**
   - Method: Header
   - Header name: `X-Webhook-Secret`
   - Value: [your WEBHOOK_SECRET from .env]

### Part 7: Phone Number Setup

1. **Get a Phone Number**
   - ElevenLabs provides a phone number with your agent
   - Or connect your own Twilio number

2. **Test the Number**
   - Call the number
   - Verify you hear the greeting
   - Have a test conversation

3. **Share the Number**
   - Give this number to Augi Nugroho's clients
   - Add it to business cards, website, etc.

## 🧪 Testing the Integration

### Test Scenario 1: Basic PT Formation

**Script to test with:**

1. Call the number
2. Wait for greeting
3. Say: "Saya ingin mendirikan PT"
4. Provide this information when asked:
   - Company: "PT Test Indonesia"
   - Business: "Teknologi Informasi"
   - Address: "Jakarta Selatan"
   - Capital: "1 miliar rupiah"
   - Shareholder 1: "John Doe, KTP 1234567890123456, 60 persen"
   - Shareholder 2: "Jane Smith, KTP 6543210987654321, 40 persen"
   - Director: "John Doe"
   - Phone: "081234567890"
   - Email: "test@example.com"
   - Date: "Besok jam 10 pagi"

5. Confirm the information
6. End the call

**Expected Results:**
- New entry appears in dashboard within 1 minute
- All information is correctly captured
- Summary document is generated
- Status shows "COMPLETED"

### Test Scenario 2: Complex Formation (3+ Shareholders)

Test with more shareholders to ensure the agent can handle complex scenarios.

### Test Scenario 3: Error Handling

Test these scenarios:
- Only 1 shareholder (should ask for minimum 2)
- Share percentages don't add to 100% (should ask to correct)
- Invalid phone number (should ask again)
- Missing information (should ask for it)

## 🐛 Troubleshooting

### Agent Not Responding
- Check voice settings
- Verify system prompt is saved
- Test with simpler greeting first

### Data Not Appearing in Dashboard
- Verify webhooks are configured correctly
- Check Vercel logs: `vercel logs`
- Ensure DATABASE_URL is set in Vercel
- Check that call ended properly

### Voice Sounds Unnatural
- Adjust stability (0.3-0.7 range)
- Try different voices
- Simplify the system prompt

### Agent Speaks English Instead of Indonesian
- Set language to Indonesian in settings
- Add more Indonesian examples in prompt
- Start greeting in Indonesian

### Webhooks Failing
- Check webhook URL is accessible
- Verify webhook secret matches
- Check for CORS issues
- Look at ElevenLabs webhook logs

## 📊 Monitoring

### Check Call Quality
1. Review call recordings in ElevenLabs dashboard
2. Read transcripts in your Komodachi dashboard
3. Listen for:
   - Natural conversation flow
   - All questions being asked
   - Proper information capture
   - Polite closing

### Monitor Success Rate
Track these metrics:
- % of calls that collect all information
- Average call duration (target: 5-8 minutes)
- Customer satisfaction feedback
- Data accuracy

## 🎯 Optimization Tips

### Improve Conversation Flow
1. **Add more examples** to system prompt
2. **Use follow-up questions** for clarity
3. **Add acknowledgment phrases** ("Baik, saya catat...")
4. **Repeat important information** back to caller

### Handle Edge Cases
- Multiple directors
- Foreign shareholders (passport vs KTP)
- Special characters in company names
- Different date formats

### Enhance User Experience
- Add background music during wait times
- Provide estimated duration upfront
- Offer to send confirmation via SMS
- Allow callback if connection drops

## 🚀 Advanced Features

### Future Enhancements
1. **Multi-language support** (English for expats)
2. **Document upload** during call
3. **Payment processing** integration
4. **Calendar integration** for appointments
5. **Email confirmations** automatic
6. **SMS notifications** for updates

### Integration Ideas
- WhatsApp Business API
- Google Calendar
- DocuSign for e-signatures
- Stripe for payments
- Slack for team notifications

## 📞 Support

If you need help:
1. Check ElevenLabs documentation
2. Review Vercel deployment logs
3. Test webhooks with tools like webhook.site
4. Contact ElevenLabs support if agent issues

---

**Ready to go live?** Follow this checklist:

- [ ] Agent configured and tested
- [ ] Webhooks working properly
- [ ] Phone number tested
- [ ] Dashboard showing data correctly
- [ ] Summary documents generating
- [ ] Error handling verified
- [ ] Client instructions prepared
- [ ] Monitoring set up

Good luck! 🎉

