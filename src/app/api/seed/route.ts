import { NextResponse } from 'next/server'
import db from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function GET() {
    try {
        // Check if data already exists
        const existingEvents = await db.event.count()
        const existingAnnouncements = await db.announcement.count()

        if (existingEvents > 0 || existingAnnouncements > 0) {
            return NextResponse.json({ 
                message: 'Database already has data',
                eventsCount: existingEvents,
                announcementsCount: existingAnnouncements
            })
        }

        // Create sample events
        const events = await Promise.all([
            db.event.create({
                data: {
                    title: 'Community Zumba Night',
                    description: 'Join us for an energetic Zumba session suitable for all fitness levels. Dance, sweat, and have fun with your neighbors!',
                    date: new Date('2026-03-15'),
                    time: '7:00 PM',
                    location: 'Community Hall',
                    category: 'Fitness'
                }
            }),
            db.event.create({
                data: {
                    title: 'Holi Celebration',
                    description: 'Celebrate the festival of colors with your neighbors! Enjoy music, food, and lots of fun with colors.',
                    date: new Date('2026-03-20'),
                    time: '10:00 AM',
                    location: 'Main Lawn',
                    category: 'Festival'
                }
            }),
            db.event.create({
                data: {
                    title: "Women's Day Workshop",
                    description: 'A special workshop celebrating women in our community. Topics include wellness, empowerment, and networking.',
                    date: new Date('2026-03-08'),
                    time: '2:00 PM',
                    location: 'Conference Room',
                    category: 'Workshop'
                }
            }),
            db.event.create({
                data: {
                    title: 'Weekend Yoga Session',
                    description: 'Start your weekend with relaxing yoga and meditation. All levels welcome.',
                    date: new Date('2026-03-22'),
                    time: '8:00 AM',
                    location: 'Rooftop Garden',
                    category: 'Fitness'
                }
            })
        ])

        // Create sample announcements
        const announcements = await Promise.all([
            db.announcement.create({
                data: {
                    title: 'Welcome to Our Community Hub!',
                    message: 'We are excited to launch our new community website. Stay tuned for updates on events, announcements, and more!'
                }
            }),
            db.announcement.create({
                data: {
                    title: 'Maintenance Notice',
                    message: 'The community gym will be closed for maintenance from March 1-3. We apologize for any inconvenience.'
                }
            }),
            db.announcement.create({
                data: {
                    title: 'New Recycling Program',
                    message: 'We are introducing a new recycling program starting next month. Please check your email for details on how to participate.'
                }
            })
        ])

        return NextResponse.json({
            message: 'Sample data created successfully',
            eventsCreated: events.length,
            announcementsCreated: announcements.length
        })
    } catch (error) {
        console.error('Seed error:', error)
        return NextResponse.json({
            error: 'Failed to seed data',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession()
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Admin-only: Force re-seed
        await db.event.deleteMany()
        await db.announcement.deleteMany()

        // Recreate sample data
        const events = await Promise.all([
            db.event.create({
                data: {
                    title: 'Community Zumba Night',
                    description: 'Join us for an energetic Zumba session suitable for all fitness levels.',
                    date: new Date('2026-03-15'),
                    time: '7:00 PM',
                    location: 'Community Hall',
                    category: 'Fitness'
                }
            }),
            db.event.create({
                data: {
                    title: 'Holi Celebration',
                    description: 'Celebrate the festival of colors with your neighbors!',
                    date: new Date('2026-03-20'),
                    time: '10:00 AM',
                    location: 'Main Lawn',
                    category: 'Festival'
                }
            }),
            db.event.create({
                data: {
                    title: "Women's Day Workshop",
                    description: 'A special workshop celebrating women in our community.',
                    date: new Date('2026-03-08'),
                    time: '2:00 PM',
                    location: 'Conference Room',
                    category: 'Workshop'
                }
            })
        ])

        const announcements = await Promise.all([
            db.announcement.create({
                data: {
                    title: 'Welcome to Our Community Hub!',
                    message: 'We are excited to launch our new community website.'
                }
            }),
            db.announcement.create({
                data: {
                    title: 'Maintenance Notice',
                    message: 'The community gym will be closed for maintenance from March 1-3.'
                }
            })
        ])

        return NextResponse.json({
            message: 'Database reseeded successfully',
            eventsCreated: events.length,
            announcementsCreated: announcements.length
        })
    } catch (error) {
        console.error('Seed error:', error)
        return NextResponse.json({ error: 'Failed to seed data' }, { status: 500 })
    }
}
