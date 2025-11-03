import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const formation = await prisma.pTFormation.findUnique({
      where: { id: params.id },
      include: {
        shareholders: true,
        directors: true,
      },
    })

    if (!formation) {
      return NextResponse.json(
        { error: 'Formation not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(formation)
  } catch (error) {
    console.error('Error fetching formation:', error)
    return NextResponse.json(
      { error: 'Failed to fetch formation' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    const formation = await prisma.pTFormation.update({
      where: { id: params.id },
      data: {
        status: body.status,
        appointmentNotes: body.appointmentNotes,
        preferredDate: body.preferredDate ? new Date(body.preferredDate) : undefined,
      },
      include: {
        shareholders: true,
        directors: true,
      },
    })

    return NextResponse.json(formation)
  } catch (error) {
    console.error('Error updating formation:', error)
    return NextResponse.json(
      { error: 'Failed to update formation' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.pTFormation.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting formation:', error)
    return NextResponse.json(
      { error: 'Failed to delete formation' },
      { status: 500 }
    )
  }
}

