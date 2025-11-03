import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function POST(request: Request) {
  try {
    // Security: Add a simple check (in production, use proper auth)
    const { secret } = await request.json()
    
    if (secret !== process.env.WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('Initializing database schema...')
    
    const { stdout, stderr } = await execAsync('npx prisma db push --skip-generate --accept-data-loss', {
      env: {
        ...process.env,
        DATABASE_URL: process.env.DIRECT_URL || process.env.DATABASE_URL
      }
    })

    console.log('stdout:', stdout)
    if (stderr) console.error('stderr:', stderr)

    return NextResponse.json({ 
      success: true, 
      message: 'Database schema initialized',
      output: stdout 
    })
  } catch (error: any) {
    console.error('Error initializing database:', error)
    return NextResponse.json({ 
      error: 'Failed to initialize database',
      details: error.message 
    }, { status: 500 })
  }
}

