import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create Announcements
  await prisma.announcement.createMany({
    data: [
      {
        title: "🔥 FREE Zumba Workshop – 27 & 28 Feb @ A-Block Clubhouse!",
        message: "2A Dance Studio presents a FREE Fitness Zumba 2-Day Workshop for ladies! 💃 Join us on 27th Feb (Friday) & 28th Feb (Saturday), 5:00–6:00 PM at Phase 2 A-Block Clubhouse, STM. Registration is FREE! Contact Dimpy Jha at 9582745382."
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

  // Create Events
  await prisma.event.createMany({
    data: [
      {
        title: "🔥 Fitness Zumba 2-Day Free Workshop by 2A Dance Studio",
        description: "💖 Hi Beautiful Ladies! 💖 ✨ Greetings of the Day ✨ 2A Dance Studio proudly presents a FREE Fitness Zumba 2-Day Workshop! Let's move, groove & glow together 💃 📅 Dates: 27th February (Friday) & 28th February (Saturday) ⏰ Time: 05:00 PM – 06:00 PM 📍 Venue: Phase 2, A-Block Clubhouse, STM 👯 Open For: Super Ladies 🎉 Registration: FREE For more info, contact: Dimpy Jha – Zumba Instructor ✨ 📞 9582745382",
        date: new Date("2026-02-27"),
        time: "5:00 PM – 6:00 PM",
        location: "Phase 2, A-Block Clubhouse, STM",
        category: "Fitness"
      },
      {
        title: "STM Phase 3 Holi Celebrations",
        description: "शुभ होली (Happy Holi) Holika Dahan: 3rd March, 7:00 PM Holi with Colours: 4th March, Morning Key Attractions: - Rain Dance - DJ & Music - Food Stalls - Fun Activities Community Guidelines: - Avoid Harsh Colours - Handle Property with Care - Supervise Your Kids",
        date: new Date("2026-03-03"),
        time: "7:00 PM onwards",
        location: "STM Phase 3",
        category: "Celebration"
      },
      {
        title: "WOMEN'S DAY SPECIAL LIVA EXPO! 🌟",
        description: "Get ready for an evening full of shopping, food, and fun right in our community! 🎉 🛍 Exclusively Shopping Stalls 🎊 Fashion 💎 Jewellery 🍔 Delicious Food Counters 🎡 Exciting Kids Games & Activities 🎁 Special Offers Bring your family and friends and enjoy a wonderful evening together! 😊",
        date: new Date("2026-03-08"),
        time: "4:00 PM – 10:00 PM",
        location: "Sri Tirumala Millennium, Phase 3, Drive Way",
        category: "Celebration"
      }
    ]
  })

  console.log("Data seeded successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
