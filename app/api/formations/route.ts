import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const status = searchParams.get('status')

    const formations = await prisma.pTFormation.findMany({
      where: status ? { status: status as any } : undefined,
      include: {
        shareholders: true,
        directors: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    })

    return NextResponse.json(formations)
  } catch (error) {
    console.error('Error fetching formations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch formations' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const formation = await prisma.pTFormation.create({
      data: {
        companyName: body.companyName,
        businessActivities: body.businessActivities,
        companyAddress: body.companyAddress,
        registeredCapital: body.registeredCapital,
        contactPhone: body.contactPhone,
        contactEmail: body.contactEmail,
        preferredDate: body.preferredDate ? new Date(body.preferredDate) : null,
        shareholders: {
          create: body.shareholders || [],
        },
        directors: {
          create: body.directors?.map((name: string) => ({ fullName: name })) || [],
        },
      },
      include: {
        shareholders: true,
        directors: true,
      },
    })

    return NextResponse.json(formation)
  } catch (error) {
    console.error('Error creating formation:', error)
    return NextResponse.json(
      { error: 'Failed to create formation' },
      { status: 500 }
    )
  }
}

