import { NextResponse } from 'next/server'
import db from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function GET() {
    try {
        const announcements = await db.announcement.findMany({
            orderBy: { createdAt: 'desc' }
        })
        console.log('Announcements fetched:', announcements.length)
        return NextResponse.json(announcements)
    } catch (error) {
        console.error('Fetch announcements error:', error)
        return NextResponse.json({ 
            error: 'Failed to fetch announcements',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession()
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const data = await request.json()
        const announcement = await db.announcement.create({
            data: {
                title: data.title,
                message: data.message
            }
        })
        return NextResponse.json(announcement)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create announcement' }, { status: 500 })
    }
}
