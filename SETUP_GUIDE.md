# 🚀 Complete Setup Guide - Komodachi AI Notary

This guide will walk you through setting up Komodachi from scratch.

## 📋 Prerequisites Checklist

- [ ] Node.js 18 or higher installed
- [ ] PostgreSQL database (local or cloud)
- [ ] ElevenLabs account with API access
- [ ] Git installed
- [ ] Code editor (VS Code recommended)

## 🔧 Step-by-Step Setup

### Step 1: Project Setup (5 minutes)

1. **Navigate to the project directory**
   ```bash
   cd komodachi-augi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
   This will install:
   - Next.js 14
   - Prisma ORM
   - ElevenLabs SDK
   - UI libraries
   - All necessary dependencies

### Step 2: Database Setup (10 minutes)

#### Option A: Local PostgreSQL

1. **Install PostgreSQL** (if not already installed)
   - macOS: `brew install postgresql`
   - Ubuntu: `sudo apt-get install postgresql`
   - Windows: Download from [postgresql.org](https://www.postgresql.org/download/)

2. **Start PostgreSQL**
   ```bash
   # macOS/Linux
   brew services start postgresql
   # or
   sudo service postgresql start
   ```

3. **Create database**
   ```bash
   createdb komodachi_augi
   ```

4. **Get connection string**
   ```
   postgresql://yourusername:yourpassword@localhost:5432/komodachi_augi
   ```

#### Option B: Cloud PostgreSQL (Recommended)

**Using Neon (Free tier available)**
1. Go to [neon.tech](https://neon.tech)
2. Sign up and create a new project
3. Create a database named `komodachi_augi`
4. Copy the connection string

**Using Supabase (Free tier available)**
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string
5. Replace `[YOUR-PASSWORD]` with your actual password

### Step 3: Environment Variables (5 minutes)

1. **Copy the example file**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` file**
   ```env
   # Database - Use your connection string from Step 2
   DATABASE_URL="postgresql://user:password@host:5432/komodachi_augi?schema=public"

   # ElevenLabs - We'll add this in Step 4
   ELEVENLABS_API_KEY=""
   ELEVENLABS_AGENT_ID=""

   # App URL - Change in production
   NEXT_PUBLIC_APP_URL="http://localhost:3000"

   # Webhook Secret - Generate a random string
   WEBHOOK_SECRET="your_random_secret_here_12345"
   ```

3. **Generate a webhook secret**
   ```bash
   # macOS/Linux
   openssl rand -base64 32
   ```
   Copy the output to `WEBHOOK_SECRET`

### Step 4: ElevenLabs Setup (15 minutes)

#### 1. Get API Key

1. Go to [elevenlabs.io](https://elevenlabs.io)
2. Sign up or log in
3. Go to Profile → API Keys
4. Generate a new API key
5. Copy it to `ELEVENLABS_API_KEY` in `.env`

#### 2. Create Conversational AI Agent

1. Go to [ElevenLabs Dashboard](https://elevenlabs.io/app/conversational-ai)
2. Click **"New Agent"** or **"Create Agent"**
3. Fill in the details:

**Agent Name**: `Komodachi`

**First Message (Greeting)**:
```
Halo! Selamat datang di layanan notaris Augi Nugroho. Nama saya Komodachi. Ada yang bisa saya bantu hari ini?
```

**System Prompt**:
```
Anda adalah Komodachi, asisten AI notaris yang membantu klien untuk mendirikan PT (Perseroan Terbatas) di Indonesia. Anda bekerja untuk notaris Augi Nugroho.

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
"Terima kasih atas informasinya. Notaris Augi akan menghubungi Anda untuk konfirmasi appointment. Apakah ada yang ingin Anda tanyakan lagi?"
```

**Language**: Indonesian (if available, otherwise English)

**Voice**: Choose an Indonesian voice or a neutral voice

4. **Save the agent**

5. **Copy Agent ID**
   - After saving, you'll see the Agent ID in the URL or agent details
   - Copy it to `ELEVENLABS_AGENT_ID` in `.env`

#### 3. Configure Webhooks (Do this after deploying)

*Note: For local development, skip this for now. We'll set it up after deployment.*

### Step 5: Initialize Database (2 minutes)

1. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

2. **Push schema to database**
   ```bash
   npx prisma db push
   ```

3. **Verify it worked**
   ```bash
   npx prisma studio
   ```
   This opens a web interface to view your database.

### Step 6: Run the Application (1 minute)

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

3. **You should see the dashboard!** 🎉

### Step 7: Testing (10 minutes)

#### Test the Dashboard

1. **View the empty dashboard**
   - You should see stats showing zeros
   - Empty call history
   - Beautiful UI with the color scheme

#### Test with Mock Data (Optional)

Create a test file `scripts/seed.ts`:
```typescript
import { prisma } from '../lib/prisma'

async function main() {
  const formation = await prisma.pTFormation.create({
    data: {
      companyName: 'PT Test Indonesia',
      businessActivities: 'Teknologi Informasi',
      companyAddress: 'Jakarta Selatan',
      registeredCapital: 1000000000,
      contactPhone: '+6281234567890',
      contactEmail: 'test@pttest.com',
      status: 'COMPLETED',
      callDuration: 450,
      shareholders: {
        create: [
          {
            fullName: 'John Doe',
            idNumber: '1234567890123456',
            sharePercentage: 60,
          },
          {
            fullName: 'Jane Smith',
            idNumber: '6543210987654321',
            sharePercentage: 40,
          },
        ],
      },
      directors: {
        create: [
          {
            fullName: 'John Doe',
          },
        ],
      },
    },
  })
  
  console.log('Created test formation:', formation)
}

main()
```

Run it:
```bash
npx tsx scripts/seed.ts
```

Refresh the dashboard to see the test data!

### Step 8: Deploy to Production (30 minutes)

#### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   Follow the prompts:
   - Set up and deploy? Yes
   - Scope? Select your account
   - Link to existing project? No
   - Project name? komodachi-augi
   - Directory? ./
   - Override settings? No

4. **Add environment variables**
   ```bash
   vercel env add DATABASE_URL
   vercel env add ELEVENLABS_API_KEY
   vercel env add ELEVENLABS_AGENT_ID
   vercel env add NEXT_PUBLIC_APP_URL
   vercel env add WEBHOOK_SECRET
   ```

5. **Deploy to production**
   ```bash
   vercel --prod
   ```

6. **Copy your production URL**
   Example: `https://komodachi-augi.vercel.app`

#### Configure ElevenLabs Webhooks

1. Go back to ElevenLabs agent settings
2. Add webhook URLs:
   - **Call Start**: `https://your-domain.vercel.app/api/elevenlabs/webhook/call-start`
   - **Call End**: `https://your-domain.vercel.app/api/elevenlabs/webhook/call-end`
   - **Message**: `https://your-domain.vercel.app/api/elevenlabs/webhook/message`
3. Save the agent

### Step 9: Test the Complete Flow (10 minutes)

#### Make a Test Call

1. **Get the phone number** from ElevenLabs agent page
2. **Call the number**
3. **Have a conversation** in Indonesian:
   - "Saya ingin mendirikan PT"
   - Provide test information when asked
4. **Complete the call**
5. **Check the dashboard** - you should see the new entry!

## 🎉 You're Done!

Your Komodachi Voice AI Notary Assistant is now live!

## 🔍 Troubleshooting

### Database connection issues
```bash
# Test connection
npx prisma db pull
```

### Port already in use
```bash
# Use a different port
PORT=3001 npm run dev
```

### ElevenLabs webhook not working
- Check that webhook URLs are correct
- Verify NEXT_PUBLIC_APP_URL is set correctly
- Check Vercel logs: `vercel logs`

### Can't see new calls in dashboard
- Check Vercel logs for webhook errors
- Verify database connection
- Check ElevenLabs agent logs

## 📞 Support

Having issues? Common solutions:

1. **Clear next cache**: `rm -rf .next`
2. **Reinstall dependencies**: `rm -rf node_modules && npm install`
3. **Reset database**: `npx prisma db push --force-reset`

## 🎓 Next Steps

1. Customize the system prompt for your specific needs
2. Add more fields to collect
3. Integrate with document generation tools
4. Add email notifications
5. Create admin authentication

Happy coding! 🚀

