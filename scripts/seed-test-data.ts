import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database with test data...\n')

  // Create first PT formation
  const pt1 = await prisma.pTFormation.create({
    data: {
      companyName: 'PT Teknologi Maju Indonesia',
      businessActivities: 'Teknologi Informasi dan Konsultasi Digital',
      companyAddress: 'Jl. Sudirman No. 123, Jakarta Selatan, DKI Jakarta 12190',
      registeredCapital: 2500000000, // 2.5 billion IDR
      contactPhone: '+628123456789',
      contactEmail: 'info@teknomaju.co.id',
      status: 'COMPLETED',
      callDuration: 420, // 7 minutes
      transcript: `Komodachi: Halo! Selamat datang di layanan notaris Augi Nugroho. Nama saya Komodachi. Ada yang bisa saya bantu hari ini?

Client: Selamat pagi, saya ingin mendirikan PT.

Komodachi: Baik, saya akan bantu Anda. Pertama-tama, nama perusahaan apa yang Anda inginkan?

Client: PT Teknologi Maju Indonesia.

Komodachi: PT Teknologi Maju Indonesia, baik saya catat. Bidang usaha apa yang akan dijalankan?

Client: Teknologi Informasi dan Konsultasi Digital.

Komodachi: Baik. Untuk alamat perusahaan dimana?

Client: Jl. Sudirman No. 123, Jakarta Selatan.

Komodachi: Berapa modal dasar yang akan didaftarkan?

Client: 2.5 miliar rupiah.

Komodachi: Baik, 2.5 miliar. Sekarang untuk pemegang saham, ada berapa orang?

Client: Ada 2 orang.

Komodachi: Baik, nama lengkap pemegang saham pertama?

Client: Budi Santoso.

[Conversation continues...]`,
      summaryDocument: `RINGKASAN PEMBENTUKAN PT

INFORMASI PERUSAHAAN
Nama Perusahaan: PT Teknologi Maju Indonesia
Bidang Usaha: Teknologi Informasi dan Konsultasi Digital
Alamat: Jl. Sudirman No. 123, Jakarta Selatan, DKI Jakarta 12190
Modal Dasar: Rp 2.500.000.000

PEMEGANG SAHAM
1. Budi Santoso
   NIK: 3171234567890123
   Kepemilikan: 60%
2. Siti Rahayu
   NIK: 3172345678901234
   Kepemilikan: 40%

DIREKTUR
1. Budi Santoso

KONTAK
Telepon: +628123456789
Email: info@teknomaju.co.id

JADWAL KONSULTASI
Senin, 4 November 2024, 10:00 WIB

---
Dokumen ini dibuat secara otomatis oleh Komodachi AI Assistant
Notaris: Augi Nugroho`,
      preferredDate: new Date('2024-11-04T10:00:00'),
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
  console.log('✅ Created PT Teknologi Maju Indonesia')

  // Create second PT formation
  const pt2 = await prisma.pTFormation.create({
    data: {
      companyName: 'PT Mandiri Sejahtera',
      businessActivities: 'Perdagangan Umum dan Distribusi',
      companyAddress: 'Jl. Gatot Subroto No. 45, Bandung, Jawa Barat 40262',
      registeredCapital: 1000000000, // 1 billion IDR
      contactPhone: '+628234567890',
      contactEmail: 'contact@mandirisejahtera.com',
      status: 'IN_PROGRESS',
      callDuration: 380,
      preferredDate: new Date('2024-11-05T14:00:00'),
      shareholders: {
        create: [
          {
            fullName: 'Ahmad Wijaya',
            idNumber: '3273123456789012',
            sharePercentage: 50,
          },
          {
            fullName: 'Dewi Kusuma',
            idNumber: '3273234567890123',
            sharePercentage: 50,
          },
        ],
      },
      directors: {
        create: [
          { fullName: 'Ahmad Wijaya' },
          { fullName: 'Dewi Kusuma' },
        ],
      },
    },
  })
  console.log('✅ Created PT Mandiri Sejahtera')

  // Create third PT formation (3 shareholders)
  const pt3 = await prisma.pTFormation.create({
    data: {
      companyName: 'PT Nusantara Berkah',
      businessActivities: 'Jasa Konsultasi Bisnis dan Manajemen',
      companyAddress: 'Jl. Asia Afrika No. 88, Surabaya, Jawa Timur 60271',
      registeredCapital: 5000000000, // 5 billion IDR
      contactPhone: '+628345678901',
      contactEmail: 'info@nusantaraberkah.id',
      status: 'COMPLETED',
      callDuration: 540, // 9 minutes
      transcript: 'Full conversation transcript...',
      summaryDocument: `RINGKASAN PEMBENTUKAN PT

INFORMASI PERUSAHAAN
Nama Perusahaan: PT Nusantara Berkah
Bidang Usaha: Jasa Konsultasi Bisnis dan Manajemen
Alamat: Jl. Asia Afrika No. 88, Surabaya, Jawa Timur 60271
Modal Dasar: Rp 5.000.000.000

PEMEGANG SAHAM
1. Hendra Gunawan
   NIK: 3578123456789012
   Kepemilikan: 40%
2. Linda Wijaya
   NIK: 3578234567890123
   Kepemilikan: 35%
3. Rizki Pratama
   NIK: 3578345678901234
   Kepemilikan: 25%

DIREKTUR
1. Hendra Gunawan
2. Linda Wijaya

KONTAK
Telepon: +628345678901
Email: info@nusantaraberkah.id

JADWAL KONSULTASI
Rabu, 6 November 2024, 09:00 WIB

---
Dokumen ini dibuat secara otomatis oleh Komodachi AI Assistant
Notaris: Augi Nugroho`,
      preferredDate: new Date('2024-11-06T09:00:00'),
      shareholders: {
        create: [
          {
            fullName: 'Hendra Gunawan',
            idNumber: '3578123456789012',
            sharePercentage: 40,
          },
          {
            fullName: 'Linda Wijaya',
            idNumber: '3578234567890123',
            sharePercentage: 35,
          },
          {
            fullName: 'Rizki Pratama',
            idNumber: '3578345678901234',
            sharePercentage: 25,
          },
        ],
      },
      directors: {
        create: [
          { fullName: 'Hendra Gunawan' },
          { fullName: 'Linda Wijaya' },
        ],
      },
    },
  })
  console.log('✅ Created PT Nusantara Berkah')

  // Create fourth PT formation (recent/pending)
  const pt4 = await prisma.pTFormation.create({
    data: {
      companyName: 'PT Digital Kreatif',
      businessActivities: 'Desain Grafis dan Media Digital',
      companyAddress: 'Jl. Diponegoro No. 77, Yogyakarta 55231',
      registeredCapital: 750000000, // 750 million IDR
      contactPhone: '+628456789012',
      contactEmail: 'hello@digitalkreatif.com',
      status: 'PENDING',
      callDuration: 290,
      preferredDate: new Date('2024-11-07T11:00:00'),
      shareholders: {
        create: [
          {
            fullName: 'Andi Prasetyo',
            idNumber: '3471123456789012',
            sharePercentage: 70,
          },
          {
            fullName: 'Maya Sari',
            idNumber: '3471234567890123',
            sharePercentage: 30,
          },
        ],
      },
      directors: {
        create: [
          { fullName: 'Andi Prasetyo' },
        ],
      },
    },
  })
  console.log('✅ Created PT Digital Kreatif')

  // Create fifth PT formation (recent call)
  const pt5 = await prisma.pTFormation.create({
    data: {
      companyName: 'PT Cahaya Bersama',
      businessActivities: 'Perdagangan Elektronik dan E-Commerce',
      companyAddress: 'Jl. Thamrin No. 99, Jakarta Pusat 10310',
      registeredCapital: 3000000000, // 3 billion IDR
      contactPhone: '+628567890123',
      contactEmail: 'info@cahayabersama.co.id',
      status: 'COMPLETED',
      callDuration: 465,
      preferredDate: new Date('2024-11-08T15:00:00'),
      shareholders: {
        create: [
          {
            fullName: 'Tono Wijaya',
            idNumber: '3175123456789012',
            sharePercentage: 55,
          },
          {
            fullName: 'Sari Indah',
            idNumber: '3175234567890123',
            sharePercentage: 45,
          },
        ],
      },
      directors: {
        create: [
          { fullName: 'Tono Wijaya' },
        ],
      },
    },
  })
  console.log('✅ Created PT Cahaya Bersama')

  console.log('\n🎉 Successfully seeded 5 PT formations!')
  console.log('\n📊 Summary:')
  console.log('   - 3 Completed')
  console.log('   - 1 In Progress')
  console.log('   - 1 Pending')
  console.log('\n✨ Refresh your dashboard to see the data!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

