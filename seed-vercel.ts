import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.announcement.deleteMany()
  await prisma.event.deleteMany()

  // Create Announcements - in chronological order (newest at top for announcements)
  await prisma.announcement.createMany({
    data: [
      {
        title: "🔥 FREE Zumba Workshop – 27 & 28 Feb @ A-Block Clubhouse!",
        message: "2A Dance Studio presents a FREE Fitness Zumba 2-Day Workshop for ladies! 💃 Join us on 27th Feb (Friday) & 28th Feb (Saturday), 5:00–6:00 PM at Phase 2 A-Block Clubhouse, STM. Registration is FREE! Contact Dimpy Jha at 9582745382."
      },
      {
        title: "🩺 MASTER HEALTH CHECKUP CAMP - 1st March",
        message: "Hello! SRI TIRUMALA MILLENIUM PHASE-2 & 3 APARTMENT's Residents.\n\nMASTER HEALTH CHECKUP CAMP By MAHESH DIAGNOSTICS in our Society which is going to be held on Sundays (I.e., 01/03/2026 Sunday) From 6:30 AM To 12:30 PM.\n\nThis will be the golden opportunity to get your blood test done.\n\nFor HOME Visit Sample Collection please Contact: 7569829339/8008570951.\n\nThank you.\nMAHESH DIAGNOSTICS"
      },
      {
        title: "🩺 FREE Breast Health & Cancer Screening Test - 1st March",
        message: "CONTACT THERMALYSE SYSTEM presents SPECIAL BREAST HEALTH AND BREAST CANCER SCREENING TEST - FREE!\n\nFeatures:\n• No pain\n• No radiation\n• No age restriction\n• Privacy protected\n• Comfortable\n• Can detect cancer before the lump\n\nVenue: Thirumala Millenium, Phase-2, A Block, Party Hall, 1st Floor\nDate: 1st March 2026\nTimings: 10 AM Onwards\nContact: 9440029880, 7993429880\n\nOrganized by: UMANG"
      },
      {
        title: "Upcoming: STM Phase 3 Holi Celebrations!",
        message: "Join us for Holi celebrations! Holika Dahan on March 3rd at 7:00 PM, followed by Holi with Colours on March 4th Morning. Featuring Rain Dance, DJ, Food Stalls, and Fun Activities for everyone."
      },
      {
        title: "Flash News: Women's Day LIVA EXPO! 🌟",
        message: "D Block Committee with Coordination of Phase 3 Federation presents Women's Day Special! Join us on March 8th, 4PM-10PM at Sri Tirumala Millennium, Phase 3 Drive Way."
      }
    ]
  })

  // Create Events with cover images - ordered by date and time ascending
  await prisma.event.createMany({
    data: [
      {
        title: "🔥 Fitness Zumba 2-Day Free Workshop by 2A Dance Studio",
        description: "💖 Hi Beautiful Ladies! 💖 ✨ Greetings of the Day ✨ 2A Dance Studio proudly presents a FREE Fitness Zumba 2-Day Workshop! Let's move, groove & glow together 💃 📅 Dates: 27th February (Friday) & 28th February (Saturday) ⏰ Time: 05:00 PM – 06:00 PM 📍 Venue: Phase 2, A-Block Clubhouse, STM 👯 Open For: Super Ladies 🎉 Registration: FREE For more info, contact: Dimpy Jha – Zumba Instructor ✨ 📞 9582745382",
        date: new Date("2026-02-27"),
        time: "5:00 PM – 6:00 PM",
        location: "Phase 2, A-Block Clubhouse, STM",
        category: "Fitness",
        coverImage: "/media/events/zumba/zumba-poster.jpeg"
      },
      {
        title: "🏥 MASTER HEALTH CHECKUP CAMP",
        description: "SRI TIRUMALA MILLENIUM PHASE-2 & 3 APARTMENT's Residents.\n\nMASTER HEALTH CHECKUP CAMP By MAHESH DIAGNOSTICS in our Society which is going to be held on Sunday (01/03/2026) From 6:30 AM To 12:30 PM.\n\nThis will be the golden opportunity to get your blood test done.\n\nFor HOME Visit Sample Collection please Contact: 7569829339/8008570951.\n\nThank you.\nMAHESH DIAGNOSTICS",
        date: new Date("2026-03-01"),
        time: "6:30 AM – 12:30 PM",
        location: "Sri Tirumala Millennium, Phase-2 & 3",
        category: "Health",
        coverImage: "/media/events/health-checkup/master-health-checkup.jpeg"
      },
      {
        title: "🩺 FREE Breast Health & Cancer Screening Test",
        description: "CONTACT THERMALYSE SYSTEM presents SPECIAL BREAST HEALTH AND BREAST CANCER SCREENING TEST - FREE!\n\n✨ Features:\n• No pain\n• No radiation\n• No age restriction\n• Privacy protected\n• Comfortable\n• Can detect cancer before the lump\n\n📍 Venue:\nThirumala Millenium,\nPhase-2, A Block,\nParty Hall, 1st Floor\n\n📅 Date: 1st March 2026\n⏰ Timings: 10 AM Onwards\n\n📞 Contact: 9440029880, 7993429880\n\nOrganized by: UMANG",
        date: new Date("2026-03-01"),
        time: "10:00 AM onwards",
        location: "Thirumala Millenium, Phase-2, A Block, Party Hall, 1st Floor",
        category: "Health",
        coverImage: "/media/events/breast-screening/poster.jpeg"
      },
      {
        title: "STM Phase 3 Holi Celebrations",
        description: "शुभ होली (Happy Holi) Holika Dahan: 3rd March, 7:00 PM Holi with Colours: 4th March, Morning Key Attractions: - Rain Dance - DJ & Music - Food Stalls - Fun Activities Community Guidelines: - Avoid Harsh Colours - Handle Property with Care - Supervise Your Kids",
        date: new Date("2026-03-03"),
        time: "7:00 PM onwards",
        location: "STM Phase 3",
        category: "Celebration",
        coverImage: "/media/events/holi/holi-poster.jpeg"
      },
      {
        title: "WOMEN'S DAY SPECIAL LIVA EXPO! 🌟",
        description: "Get ready for an evening full of shopping, food, and fun right in our community! 🎉 🛍 Exclusively Shopping Stalls 🎊 Fashion 💎 Jewellery 🍔 Delicious Food Counters 🎡 Exciting Kids Games & Activities 🎁 Special Offers Bring your family and friends and enjoy a wonderful evening together! 😊",
        date: new Date("2026-03-08"),
        time: "4:00 PM – 10:00 PM",
        location: "Sri Tirumala Millennium, Phase 3, Drive Way",
        category: "Celebration",
        coverImage: "/media/events/womens-day/womens-day-1.jpeg"
      }
    ]
  })

  console.log("Data seeded successfully with all events!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
