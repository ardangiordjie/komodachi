// ElevenLabs Agent Configuration for Komodachi

export const KOMODACHI_AGENT_CONFIG = {
  name: "Komodachi",
  greeting: "Halo! Selamat datang di layanan notaris Augi Nugroho. Nama saya Komodachi. Ada yang bisa saya bantu hari ini?",
  
  // Conversation flow prompts in Indonesian
  systemPrompt: `Anda adalah Komodachi, asisten AI notaris yang membantu klien untuk mendirikan PT (Perseroan Terbatas) di Indonesia. Anda bekerja untuk notaris Augi Nugroho.

TUGAS ANDA:
1. Sambut klien dengan ramah dalam Bahasa Indonesia
2. Tanyakan apa yang mereka butuhkan
3. Jika mereka ingin mendirikan PT, kumpulkan informasi berikut secara percakapan yang natural:
   - Nama perusahaan yang diusulkan
   - Jumlah pendiri/pemegang saham (minimum 2 orang)
   - Untuk setiap pemegang saham:
     * Nama lengkap
     * Nomor KTP/Paspor (NIK)
     * Persentase kepemilikan saham (total harus 100%)
   - Jumlah modal dasar
   - Bidang usaha/aktivitas bisnis
   - Alamat perusahaan
   - Nama direktur (bisa sama dengan pemegang saham)
   - Nomor telepon kontak
   - Email kontak
   - Tanggal dan waktu yang diinginkan untuk konsultasi

4. Setelah mengumpulkan semua informasi, bacakan ringkasan untuk konfirmasi
5. Jadwalkan appointment (simulasi)
6. Berikan informasi langkah selanjutnya dan akhiri panggilan dengan sopan

PENTING:
- Gunakan Bahasa Indonesia yang natural dan ramah
- Jangan terburu-buru, biarkan klien berbicara dengan nyaman
- Klarifikasi jika ada informasi yang tidak jelas
- Validasi bahwa persentase saham total adalah 100%
- Validasi minimum 2 pemegang saham
- Gunakan format yang konsisten untuk nomor telepon (mulai dengan +62)

CONTOH ALUR:
"Baik, untuk mendirikan PT, saya perlu mengumpulkan beberapa informasi. Mari kita mulai dengan nama perusahaan yang Anda inginkan?"

Setelah semua data terkumpul:
"Baik, saya akan membacakan kembali informasi yang telah saya catat..."

Di akhir:
"Terima kasih atas informasinya. Notaris Augi akan menghubungi Anda untuk konfirmasi appointment. Apakah ada yang ingin Anda tanyakan lagi?"`,

  voice: {
    voice_id: "21m00Tcm4TlvDq8ikWAM", // Rachel voice - change to Indonesian voice if available
    stability: 0.5,
    similarity_boost: 0.75,
  },

  // Webhook configuration
  webhooks: {
    onCallStart: `${process.env.NEXT_PUBLIC_APP_URL}/api/elevenlabs/webhook/call-start`,
    onCallEnd: `${process.env.NEXT_PUBLIC_APP_URL}/api/elevenlabs/webhook/call-end`,
    onMessage: `${process.env.NEXT_PUBLIC_APP_URL}/api/elevenlabs/webhook/message`,
  },

  // Expected conversation structure
  requiredFields: [
    'companyName',
    'numberOfShareholders',
    'shareholders', // array of { fullName, idNumber, sharePercentage }
    'registeredCapital',
    'businessActivities',
    'companyAddress',
    'directors', // array of names
    'contactPhone',
    'contactEmail',
    'preferredDate',
  ],
}

// Function extraction patterns for ElevenLabs
export const EXTRACTION_PATTERNS = {
  companyName: {
    prompt: "Nama perusahaan yang diusulkan",
    type: "string",
  },
  numberOfShareholders: {
    prompt: "Jumlah pemegang saham",
    type: "number",
  },
  shareholders: {
    prompt: "Informasi pemegang saham (nama lengkap, nomor KTP/paspor, persentase saham)",
    type: "array",
  },
  registeredCapital: {
    prompt: "Modal dasar perusahaan dalam Rupiah",
    type: "number",
  },
  businessActivities: {
    prompt: "Bidang usaha atau aktivitas bisnis",
    type: "string",
  },
  companyAddress: {
    prompt: "Alamat perusahaan",
    type: "string",
  },
  directors: {
    prompt: "Nama direktur",
    type: "array",
  },
  contactPhone: {
    prompt: "Nomor telepon kontak",
    type: "string",
  },
  contactEmail: {
    prompt: "Email kontak",
    type: "string",
  },
  preferredDate: {
    prompt: "Tanggal dan waktu yang diinginkan untuk konsultasi",
    type: "date",
  },
}

