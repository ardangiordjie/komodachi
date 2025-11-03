# ⚡ Quick Start - Get Running in 10 Minutes

## 🎯 Goal
Get Komodachi running on your local machine as fast as possible.

## 📋 Prerequisites
- Node.js 18+ installed
- PostgreSQL running (or use a cloud database)
- 10 minutes of your time

## 🚀 Steps

### 1️⃣ Install Dependencies (2 min)
```bash
cd komodachi-augi
npm install
```

### 2️⃣ Set Up Database (3 min)

**Option A: Quick Cloud Database (Recommended)**
1. Go to [neon.tech](https://neon.tech)
2. Sign up (free)
3. Create project → Copy connection string
4. Skip to step 3

**Option B: Local PostgreSQL**
```bash
# Create database
createdb komodachi_augi

# Your connection string:
# postgresql://yourusername@localhost:5432/komodachi_augi
```

### 3️⃣ Configure Environment (1 min)
```bash
# Copy example
cp .env.example .env

# Edit .env - ONLY CHANGE THIS LINE for now:
DATABASE_URL="your_connection_string_here"

# Leave other variables as-is for now
```

### 4️⃣ Initialize Database (1 min)
```bash
npx prisma generate
npx prisma db push
```

### 5️⃣ Run the App (1 min)
```bash
npm run dev
```

### 6️⃣ Open Dashboard (instantly)
Open browser: [http://localhost:3000](http://localhost:3000)

🎉 **You should see the beautiful dashboard!**

## 🎯 What You'll See

- Beautiful dashboard with Augi's branding
- Stats showing zeros (no data yet)
- Empty call history
- Quick action buttons
- Fully functional UI

## 🧪 Test with Mock Data (Optional)

Want to see how it looks with data?

Create `test-data.ts`:
```typescript
// Save this as scripts/test-data.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const formation = await prisma.pTFormation.create({
    data: {
      companyName: 'PT Teknologi Maju',
      businessActivities: 'Teknologi Informasi dan Konsultasi',
      companyAddress: 'Jl. Sudirman No. 123, Jakarta Selatan',
      registeredCapital: 2500000000,
      contactPhone: '+628123456789',
      contactEmail: 'info@teknomaJU.com',
      status: 'COMPLETED',
      callDuration: 420,
      transcript: 'Test transcript...',
      summaryDocument: 'Test summary...',
      shareholders: {
        create: [
          {
            fullName: 'Budi Santoso',
            idNumber: '3171234567890123',
            sharePercentage: 60,
          },
          {
            fullName: 'Siti Rahayu',
            idNumber: '3172345678901234',
            sharePercentage: 40,
          },
        ],
      },
      directors: {
        create: [
          { fullName: 'Budi Santoso' },
        ],
      },
    },
  })

  console.log('✅ Created test formation:', formation.id)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

Run it:
```bash
npx tsx scripts/test-data.ts
```

Refresh dashboard - you'll see the test data!

## 🎤 Next: Set Up Voice AI

Your dashboard is ready! Now set up the ElevenLabs voice AI:

**See detailed guide in: `ELEVENLABS_INTEGRATION.md`**

Quick version:
1. Get ElevenLabs API key
2. Create agent named "Komodachi"
3. Copy system prompt from `lib/elevenlabs-config.ts`
4. Add API key to `.env`
5. Deploy to production
6. Configure webhooks

## 🚢 Ready to Deploy?

When ready for production:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**See full deployment guide in: `SETUP_GUIDE.md`**

## 📚 More Information

- **Full Setup**: `SETUP_GUIDE.md`
- **ElevenLabs Setup**: `ELEVENLABS_INTEGRATION.md`
- **Project Details**: `PROJECT_OVERVIEW.md`
- **API Reference**: `README.md`

## ❓ Troubleshooting

### "Cannot find module '@prisma/client'"
```bash
npx prisma generate
```

### "Error: Database connection failed"
- Check your DATABASE_URL in `.env`
- Ensure PostgreSQL is running
- Try the Neon.tech cloud option

### "Port 3000 already in use"
```bash
# Use different port
PORT=3001 npm run dev
```

### Dashboard shows errors
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

## ✅ Success Checklist

- [ ] Dependencies installed
- [ ] Database connected
- [ ] Prisma initialized
- [ ] App running on localhost:3000
- [ ] Dashboard loading correctly
- [ ] Stats showing (even if zeros)
- [ ] No console errors

## 🎉 You're Ready!

Dashboard is running! Next steps:
1. Explore the UI
2. Try adding test data
3. Set up ElevenLabs agent
4. Deploy to production
5. Start taking calls!

---

**Need help?** Check the other documentation files or review the code comments.

**Ready for production?** Follow `SETUP_GUIDE.md` for complete deployment instructions.

