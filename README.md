# Komodachi - Voice AI Notary Assistant 🕵️‍♂️

![Komodachi Banner](https://img.shields.io/badge/ElevenLabs-Powered-blueviolet) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)

Voice AI assistant that handles notary intake for Indonesian PT (company) formation. 

## 🐲🤝 Name Origin
"Komodachi" blends Komodo Dragon (Indonesia's iconic, resilient animal) and "Tomodachi" (the Japanese word for 'friend'), symbolizing a trusted AI assistant that helps navigate complex business formation with strength and reliability, while being friendly and supportive.

## 🎯 Features

- 🎙️ **Natural Voice Conversations** - Powered by ElevenLabs AI
- 🇮🇩 **Indonesian Language Support** - Native Bahasa Indonesia conversations
- 📊 **Beautiful Dashboard** - Modern UI with real-time data
- 📝 **Automatic Documentation** - Auto-generated summary documents
- 🔄 **Real-time Webhooks** - Live call tracking and data collection
- 📞 **Call History** - Complete call logs with transcripts
- 👥 **Multi-stakeholder Support** - Handle complex PT formations

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Voice AI**: ElevenLabs Conversational AI
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Radix UI

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- ElevenLabs API key ([Get one here](https://elevenlabs.io))

### Installation

1. **Clone and install dependencies**
   ```bash
   cd komodachi-augi
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your credentials:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/komodachi_augi"
   ELEVENLABS_API_KEY="your_elevenlabs_api_key"
   ELEVENLABS_AGENT_ID="your_agent_id"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   WEBHOOK_SECRET="your_random_secret"
   ```

3. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎤 ElevenLabs Agent Setup

### 1. Create Your Agent

1. Go to [ElevenLabs Conversational AI](https://elevenlabs.io/app/conversational-ai)
2. Click "Create Agent"
3. Name it **"Komodachi"**

### 2. Configure the Agent

**System Prompt** (use Indonesian):
```
Anda adalah Komodachi, asisten AI notaris yang membantu klien untuk mendirikan PT (Perseroan Terbatas) di Indonesia. Anda bekerja untuk notaris Augi Nugroho.

TUGAS ANDA:
1. Sambut klien dengan ramah dalam Bahasa Indonesia
2. Tanyakan apa yang mereka butuhkan
3. Jika mereka ingin mendirikan PT, kumpulkan informasi berikut:
   - Nama perusahaan yang diusulkan
   - Jumlah pendiri/pemegang saham (minimum 2 orang)
   - Untuk setiap pemegang saham:
     * Nama lengkap
     * Nomor KTP/Paspor
     * Persentase kepemilikan saham
   - Jumlah modal dasar
   - Bidang usaha/aktivitas bisnis
   - Alamat perusahaan
   - Nama direktur
   - Nomor telepon kontak
   - Email kontak
   - Tanggal dan waktu konsultasi yang diinginkan

4. Setelah mengumpulkan semua informasi, bacakan ringkasan untuk konfirmasi
5. Jadwalkan appointment (simulasi)
6. Akhiri panggilan dengan sopan

PENTING:
- Gunakan Bahasa Indonesia yang natural dan ramah
- Jangan terburu-buru
- Klarifikasi jika ada informasi yang tidak jelas
- Validasi bahwa persentase saham total adalah 100%
- Validasi minimum 2 pemegang saham
```

### 3. Set Up Webhooks

Configure these webhook endpoints in your ElevenLabs agent:

- **Call Start**: `https://your-domain.com/api/elevenlabs/webhook/call-start`
- **Call End**: `https://your-domain.com/api/elevenlabs/webhook/call-end`
- **Message**: `https://your-domain.com/api/elevenlabs/webhook/message`

### 4. Voice Configuration

- Choose an Indonesian voice (or Rachel for now)
- Adjust stability and similarity boost as needed
- Test the voice to ensure natural conversation flow

## 📊 Dashboard Features

### Main Dashboard
- **Stats Overview**: Total calls, average duration, completion rate
- **Call History**: Recent PT formation requests
- **Quick Actions**: Fast access to common tasks
- **Status Overview**: Real-time status tracking

### Formation Detail View
- **Company Information**: Complete PT details
- **Shareholders**: Full shareholder information with percentages
- **Directors**: Director list
- **Call Information**: Duration, recording, transcript
- **Contact Details**: Phone and email
- **Summary Document**: Auto-generated downloadable summary

## 🗄️ Database Schema

```prisma
model PTFormation {
  - Company info (name, address, capital, activities)
  - Contact info (phone, email)
  - Call data (duration, recording, transcript)
  - Status tracking
  - Relationships to Shareholders and Directors
}

model Shareholder {
  - Full name
  - ID number (NIK/Passport)
  - Share percentage
}

model Director {
  - Full name
}
```

## 🎨 Design System

### Color Palette
- **Primary**: `#0378A6` (Ocean Blue)
- **Primary Light**: `#6AB9D9` (Sky Blue)
- **Accent**: `#F2B705` (Golden Yellow)
- **Accent Dark**: `#D9910B` (Dark Gold)
- **Accent Darker**: `#BF7D2C` (Bronze)

### Components
- Modern card-based layout
- Smooth animations and transitions
- Responsive design (mobile-first)
- Accessible UI components

## 📡 API Endpoints

### Formations
- `GET /api/formations` - List all formations
- `POST /api/formations` - Create new formation
- `GET /api/formations/[id]` - Get formation details
- `PATCH /api/formations/[id]` - Update formation
- `DELETE /api/formations/[id]` - Delete formation

### Stats
- `GET /api/stats` - Get dashboard statistics

### Webhooks (ElevenLabs)
- `POST /api/elevenlabs/webhook/call-start` - Call initiated
- `POST /api/elevenlabs/webhook/call-end` - Call completed
- `POST /api/elevenlabs/webhook/message` - Real-time messages

## 🚢 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Add environment variables
   - Deploy!

3. **Set up PostgreSQL**
   - Use [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) or
   - Use [Supabase](https://supabase.com) or
   - Use [Neon](https://neon.tech)

4. **Update ElevenLabs webhooks**
   - Replace `http://localhost:3000` with your Vercel URL
   - Test the webhooks

### Environment Variables for Production

Add these in Vercel dashboard:
```
DATABASE_URL
ELEVENLABS_API_KEY
ELEVENLABS_AGENT_ID
NEXT_PUBLIC_APP_URL
WEBHOOK_SECRET
```

## 🧪 Testing

### Test the Voice AI

1. Call the ElevenLabs phone number
2. Say: "Saya ingin mendirikan PT"
3. Follow the conversation flow
4. Check the dashboard for the new entry

### Test the Dashboard

1. Navigate to the dashboard
2. View call history
3. Click on a formation to see details
4. Download summary document

## 📝 Required Information Collection

The AI collects the following for PT formation:

1. **Company Details**
   - Proposed company name
   - Business activities/field
   - Registered address
   - Registered capital amount

2. **Shareholders** (minimum 2)
   - Full name
   - ID number (NIK/Passport)
   - Share percentage (must total 100%)

3. **Directors**
   - Full names (can be same as shareholders)

4. **Contact Information**
   - Phone number
   - Email address

5. **Appointment**
   - Preferred date and time for consultation

## 🤝 Contributing

This is a hackathon project. For improvements:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this for your projects!

## 👨‍💼 About

Built for **Augi Nugroho** - Professional Notary specializing in PT formation in Indonesia.

**Agent Name**: Komodachi (Indonesian for "friend/companion")

---

Made with ❤️ using ElevenLabs Conversational AI

