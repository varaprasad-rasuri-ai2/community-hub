import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const seedPrisma = new PrismaClient()

// Create a hashed password for admin
async function createAdminUser() {
    const hashedPassword = await bcrypt.hash('admin123', 10)
    const existingAdmin = await seedPrisma.user.findUnique({
        where: { email: 'admin@community.com' }
    })
    
    if (!existingAdmin) {
        await seedPrisma.user.create({
            data: {
                email: 'admin@community.com',
                password: hashedPassword,
                name: 'Admin'
            }
        })
        console.log('Created admin user: admin@community.com / admin123')
    }
}

async function main() {
    console.log('Seeding Database...')

    // Create admin user first
    await createAdminUser()

    // Insert Women's Day Event
    const event = await seedPrisma.event.create({
        data: {
            title: "WOMEN'S DAY SPECIAL LIVA EXPO! 🌟",
            description: "Get ready for an evening full of shopping, food, and fun right in our community! 🎉\n\n🛍 Exclusively Shopping Stalls\n🎊 Fashion\n💎 Jewellery\n🍔 Delicious Food Counters\n🎡 Exciting Kids Games & Activities\n🎁 Special Offers\n\nBring your family and friends and enjoy a wonderful evening together! 😊",
            date: new Date('2026-03-08'),
            time: "4:00 PM – 10:00 PM",
            location: "Sri Tirumala Millennium, Phase 3, Drive Way",
            category: "Celebration",
            coverImage: "/media/events/womens-day/womens-day-1.jpeg",
            media: {
                create: [
                    {
                        url: "/media/events/womens-day/womens-day-1.jpeg",
                        type: "image"
                    },
                    {
                        url: "/media/events/womens-day/womens-day-2.jpeg",
                        type: "image"
                    },
                    {
                        url: "/media/events/womens-day/womens-day-video.mp4",
                        type: "video"
                    }
                ]
            }
        }
    })
    console.log('Created Event:', event.title)

    // Insert Women's Day Announcement/Flash News
    const announcement1 = await seedPrisma.announcement.create({
        data: {
            title: "Flash News: Women's Day LIVA EXPO! 🌟",
            message: "D Block Committee with Coordination of Phase 3 Federation presents Women's Day Special! Join us on March 8th, 4PM-10PM at Sri Tirumala Millennium, Phase 3 Drive Way."
        }
    })
    console.log('Created Announcement:', announcement1.title)

    // Insert STM Phase 3 Holi Celebrations Event
    const holiEvent = await seedPrisma.event.create({
        data: {
            title: "STM Phase 3 Holi Celebrations",
            description: "शुभ होली (Happy Holi)\n\nHolika Dahan: 3rd March, 7:00 PM\nHoli with Colours: 4th March, Morning\n\nKey Attractions:\n- Rain Dance\n- DJ & Music\n- Food Stalls\n- Fun Activities\n\nCommunity Guidelines:\n- Avoid Harsh Colours\n- Handle Property with Care\n- Supervise Your Kids",
            date: new Date('2026-03-03'),
            time: "7:00 PM onwards",
            location: "STM Phase 3",
            category: "Celebration",
            coverImage: "/media/events/holi/holi-poster.jpeg",
            media: {
                create: [
                    {
                        url: "/media/events/holi/holi-poster.jpeg",
                        type: "image"
                    }
                ]
            }
        }
    })
    console.log('Created Event:', holiEvent.title)

    // Insert Holi Announcement/Flash News
    const announcement2 = await seedPrisma.announcement.create({
        data: {
            title: "Upcoming: STM Phase 3 Holi Celebrations!",
            message: "Join us for Holi celebrations! Holika Dahan on March 3rd at 7:00 PM, followed by Holi with Colours on March 4th Morning. Featuring Rain Dance, DJ, Food Stalls, and Fun Activities for everyone."
        }
    })
    console.log('Created Announcement:', announcement2.title)

    // Insert Zumba Workshop Event
    const zumbaEvent = await seedPrisma.event.create({
        data: {
            title: '🔥 Fitness Zumba 2-Day Free Workshop by 2A Dance Studio',
            description: "💖 Hi Beautiful Ladies! 💖\n✨ Greetings of the Day ✨\n\n2A Dance Studio proudly presents a FREE Fitness Zumba 2-Day Workshop!\n\nLet's move, groove & glow together 💃\n\n📅 Dates: 27th February (Friday) & 28th February (Saturday)\n⏰ Time: 05:00 PM – 06:00 PM\n📍 Venue: Phase 2, A-Block Clubhouse, STM\n👯 Open For: Super Ladies\n🎉 Registration: FREE\n\nFor more info, contact:\nDimpy Jha – Zumba Instructor ✨\n📞 9582745382",
            date: new Date('2026-02-27'),
            time: '5:00 PM – 6:00 PM',
            location: 'Phase 2, A-Block Clubhouse, STM',
            category: 'Fitness',
            coverImage: '/media/events/zumba/zumba-poster.jpeg',
            media: {
                create: [
                    { url: '/media/events/zumba/zumba-poster.jpeg', type: 'image' }
                ]
            }
        }
    })
    console.log('Created Event:', zumbaEvent.title)

    // Insert Zumba Announcement
    const announcement3 = await seedPrisma.announcement.create({
        data: {
            title: '🔥 FREE Zumba Workshop – 27 & 28 Feb @ A-Block Clubhouse!',
            message: '2A Dance Studio presents a FREE Fitness Zumba 2-Day Workshop for ladies! 💃 Join us on 27th Feb (Friday) & 28th Feb (Saturday), 5:00–6:00 PM at Phase 2 A-Block Clubhouse, STM. Registration is FREE! Contact Dimpy Jha at 9582745382.'
        }
    })
    console.log('Created Announcement:', announcement3.title)

    console.log('Seeding completed successfully.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await seedPrisma.$disconnect()
    })
