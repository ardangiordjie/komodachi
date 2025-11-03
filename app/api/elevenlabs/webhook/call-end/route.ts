import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface CallEndPayload {
  call_id?: string
  id?: string
  duration?: number
  recording_url?: string
  transcript?: string
  analysis?: {
    companyName?: string
    shareholders?: Array<{
      fullName: string
      idNumber: string
      sharePercentage: number
    }>
    registeredCapital?: number
    businessActivities?: string
    companyAddress?: string
    directors?: string[]
    contactPhone?: string
    contactEmail?: string
    preferredDate?: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CallEndPayload = await request.json()
    
    console.log('Call ended:', body)
    
    const callId = body.call_id || body.id
    
    if (!callId) {
      return NextResponse.json(
        { error: 'No call ID provided' },
        { status: 400 }
      )
    }

    // Find the existing PT formation record
    const existingFormation = await prisma.pTFormation.findUnique({
      where: { callId },
    })

    if (!existingFormation) {
      console.log('No existing formation found, creating new one')
    }

    // Extract data from analysis
    const analysis = body.analysis || {}
    
    // Update or create PT formation with complete data
    const ptFormation = await prisma.pTFormation.upsert({
      where: { callId },
      update: {
        callDuration: body.duration,
        recordingUrl: body.recording_url,
        transcript: body.transcript,
        companyName: analysis.companyName || 'Not provided',
        registeredCapital: analysis.registeredCapital || 0,
        businessActivities: analysis.businessActivities || 'Not provided',
        companyAddress: analysis.companyAddress || 'Not provided',
        contactPhone: analysis.contactPhone || 'Not provided',
        contactEmail: analysis.contactEmail || 'Not provided',
        preferredDate: analysis.preferredDate ? new Date(analysis.preferredDate) : null,
        status: 'COMPLETED',
        updatedAt: new Date(),
      },
      create: {
        callId,
        callDuration: body.duration,
        recordingUrl: body.recording_url,
        transcript: body.transcript,
        companyName: analysis.companyName || 'Not provided',
        registeredCapital: analysis.registeredCapital || 0,
        businessActivities: analysis.businessActivities || 'Not provided',
        companyAddress: analysis.companyAddress || 'Not provided',
        contactPhone: analysis.contactPhone || 'Not provided',
        contactEmail: analysis.contactEmail || 'Not provided',
        preferredDate: analysis.preferredDate ? new Date(analysis.preferredDate) : null,
        status: 'COMPLETED',
      },
    })

    // Create shareholders if provided
    if (analysis.shareholders && Array.isArray(analysis.shareholders)) {
      await prisma.shareholder.deleteMany({
        where: { ptFormationId: ptFormation.id },
      })
      
      await prisma.shareholder.createMany({
        data: analysis.shareholders.map((sh: any) => ({
          ptFormationId: ptFormation.id,
          fullName: sh.fullName || sh.name || 'Not provided',
          idNumber: sh.idNumber || sh.nik || 'Not provided',
          sharePercentage: sh.sharePercentage || sh.percentage || 0,
        })),
      })
    }

    // Create directors if provided
    if (analysis.directors && Array.isArray(analysis.directors)) {
      await prisma.director.deleteMany({
        where: { ptFormationId: ptFormation.id },
      })
      
      await prisma.director.createMany({
        data: analysis.directors.map((name: string) => ({
          ptFormationId: ptFormation.id,
          fullName: typeof name === 'string' ? name : 'Not provided',
        })),
      })
    }

    // Generate summary document
    const summary = generateSummary(ptFormation, analysis)
    await prisma.pTFormation.update({
      where: { id: ptFormation.id },
      data: { summaryDocument: summary },
    })

    return NextResponse.json({ 
      success: true, 
      formationId: ptFormation.id 
    })
  } catch (error) {
    console.error('Error in call-end webhook:', error)
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    )
  }
}

function generateSummary(formation: any, analysis: any): string {
  const shareholders = analysis.shareholders || []
  const directors = analysis.directors || []
  
  return `RINGKASAN PEMBENTUKAN PT

INFORMASI PERUSAHAAN
Nama Perusahaan: ${formation.companyName}
Bidang Usaha: ${formation.businessActivities}
Alamat: ${formation.companyAddress}
Modal Dasar: Rp ${formation.registeredCapital.toLocaleString('id-ID')}

PEMEGANG SAHAM
${shareholders.map((sh: any, i: number) => `${i + 1}. ${sh.fullName || sh.name}
   NIK/Paspor: ${sh.idNumber || sh.nik}
   Kepemilikan: ${sh.sharePercentage || sh.percentage}%`).join('\n')}

DIREKTUR
${directors.map((name: string, i: number) => `${i + 1}. ${name}`).join('\n')}

KONTAK
Telepon: ${formation.contactPhone}
Email: ${formation.contactEmail}

JADWAL KONSULTASI
${formation.preferredDate ? new Date(formation.preferredDate).toLocaleString('id-ID') : 'Belum ditentukan'}

---
Dokumen ini dibuat secara otomatis oleh Komodachi AI Assistant
Notaris: Augi Nugroho
`
}

