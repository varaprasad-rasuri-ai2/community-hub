import { NextResponse } from 'next/server'
import db from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const event = await db.event.findUnique({
            where: { id },
            include: { media: true }
        })
        if (!event) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 })
        }
        return NextResponse.json(event)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 })
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getSession()
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const data = await request.json()
        const event = await db.event.update({
            where: { id },
            data: {
                ...data,
                date: data.date ? new Date(data.date) : undefined
            }
        })
        return NextResponse.json(event)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update event' }, { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getSession()
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        await db.event.delete({ where: { id } })
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 })
    }
}
