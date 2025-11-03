import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('Call started:', body)
    
    // Create initial PT formation record
    const ptFormation = await prisma.pTFormation.create({
      data: {
        callId: body.call_id || body.id,
        companyName: 'Pending',
        businessActivities: 'Pending',
        companyAddress: 'Pending',
        registeredCapital: 0,
        contactPhone: 'Pending',
        contactEmail: 'Pending',
        status: 'IN_PROGRESS',
      },
    })

    return NextResponse.json({ 
      success: true, 
      formationId: ptFormation.id 
    })
  } catch (error) {
    console.error('Error in call-start webhook:', error)
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    )
  }
}

