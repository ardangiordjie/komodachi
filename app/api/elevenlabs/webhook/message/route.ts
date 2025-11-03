import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('Message received:', body)
    
    // You can use this to track real-time conversation progress
    // For now, we'll just acknowledge receipt
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in message webhook:', error)
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    )
  }
}

