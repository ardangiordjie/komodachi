import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const [total, pending, inProgress, completed, recentCalls] = await Promise.all([
      prisma.pTFormation.count(),
      prisma.pTFormation.count({ where: { status: 'PENDING' } }),
      prisma.pTFormation.count({ where: { status: 'IN_PROGRESS' } }),
      prisma.pTFormation.count({ where: { status: 'COMPLETED' } }),
      prisma.pTFormation.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          createdAt: true,
          callDuration: true,
        },
      }),
    ])

    const totalDuration = recentCalls.reduce(
      (sum, call) => sum + (call.callDuration || 0),
      0
    )
    const avgDuration = recentCalls.length > 0 
      ? Math.round(totalDuration / recentCalls.length) 
      : 0

    return NextResponse.json({
      total,
      pending,
      inProgress,
      completed,
      avgDuration,
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}

