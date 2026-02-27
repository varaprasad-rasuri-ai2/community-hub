import { NextResponse } from 'next/server'
import db from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function GET() {
    try {
        const events = await db.event.findMany({
            orderBy: { date: 'asc' },
            include: { media: true }
        })
        return NextResponse.json(events)
    } catch (error) {
        console.error('Fetch events error:', error)
        return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession()
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const data = await request.json()
        const event = await db.event.create({
            data: {
                title: data.title,
                description: data.description,
                date: new Date(data.date),
                time: data.time,
                location: data.location,
                category: data.category,
                coverImage: data.coverImage
            }
        })
        return NextResponse.json(event)
    } catch (error) {
        console.error('Create event error:', error)
        return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
    }
}
