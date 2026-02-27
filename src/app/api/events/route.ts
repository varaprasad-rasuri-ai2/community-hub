import { NextResponse } from 'next/server'
import db from '@/lib/db'
import { getSession } from '@/lib/auth'

// Auto-seed function
async function seedDatabase() {
    const existingEvents = await db.event.count()
    if (existingEvents > 0) return false

    // Create sample events
    await Promise.all([
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
    await Promise.all([
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

    return true
}

export async function GET() {
    try {
        // Auto-seed if database is empty
        await seedDatabase()
        
        const events = await db.event.findMany({
            orderBy: { date: 'asc' },
            include: { media: true }
        })
        console.log('Events fetched:', events.length)
        return NextResponse.json(events)
    } catch (error) {
        console.error('Fetch events error:', error)
        return NextResponse.json({ 
            error: 'Failed to fetch events',
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
