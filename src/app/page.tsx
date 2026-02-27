'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar, Megaphone, Image as ImageIcon } from 'lucide-react'
import EventCard from '@/components/EventCard'
import AnnouncementCard from '@/components/AnnouncementCard'

// Mock data for initial UI (until DB is seeded)
const mockEvents = [
  {
    id: 'liva-expo-2026',
    title: "WOMEN'S DAY SPECIAL LIVA EXPO! 🌟",
    description: "Get ready for an evening full of shopping, food, and fun right in our community! 🎉",
    date: new Date('2026-03-08'),
    location: 'Sri Tirumala Millennium, Phase 3, Drive Way',
    category: 'Celebration',
    coverImage: '/media/events/womens-day/womens-day-1.jpeg'
  },
  {
    id: 'holi-2026',
    title: "STM Phase 3 Holi Celebrations",
    description: "शुभ होली (Happy Holi) - Holika Dahan: 3rd March, 7:00 PM | Holi with Colours: 4th March Morning.",
    date: new Date('2026-03-03'),
    location: 'STM Phase 3',
    category: 'Celebration',
    coverImage: '/media/events/holi/holi-poster.jpeg'
  },
  {
    id: '1',
    title: 'Summer Pooled Party',
    description: 'Join us for a day of fun, food, and music at the community pool! BBQ will be provided.',
    date: new Date('2026-07-15'),
    location: 'Central Pool Area',
    category: 'Social',
    coverImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1000'
  }
]

const mockAnnouncements = [
  {
    title: "Flash News: Women's Day LIVA EXPO! 🌟",
    message: "D Block Committee with Coordination of Phase 3 Federation presents Women's Day Special! Join us on March 8th, 4PM-10PM.",
    createdAt: new Date()
  },
  {
    title: "Upcoming: STM Phase 3 Holi Celebrations!",
    message: "Join us for Holi celebrations! Holika Dahan on March 3rd at 7:00 PM. Holi with Colours on March 4th Morning. Enjoy Rain Dance, DJ & Music, Food Stalls, and Fun Activities.",
    createdAt: new Date()
  },
  {
    title: 'Facility Maintenance',
    message: 'The gym will be closed for quarterly maintenance on Monday from 8 AM to 2 PM.',
    createdAt: new Date()
  },
  {
    title: 'New Recycling Policy',
    message: 'Please review the updated recycling guidelines posted in the lobby.',
    createdAt: new Date()
  }
]

const MOCK_GALLERY = [
  '/media/events/zumba/zumba-poster.jpeg',
  '/media/events/holi/holi-poster.jpeg',
  '/media/events/womens-day/womens-day-1.jpeg',
  '/media/events/womens-day/womens-day-2.jpeg',
]

export default function Home() {
  const [events, setEvents] = useState([])
  const [announcements, setAnnouncements] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, announcementsRes] = await Promise.all([
          fetch('/api/events'),
          fetch('/api/announcements')
        ])

        if (eventsRes.ok) {
          const eventsData = await eventsRes.json()
          setEvents(eventsData)
        }

        if (announcementsRes.ok) {
          const announcementsData = await announcementsRes.json()
          setAnnouncements(announcementsData)
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden rounded-[40px] mx-4">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000"
            alt="Community"
            className="w-full h-full object-cover brightness-50"
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Connecting <span className="text-blue-400">Our Community</span>
          </h1>
          <p className="text-xl text-slate-200 mb-10 leading-relaxed font-medium">
            Stay updated with the latest events, announcements, and memories from our vibrant community hub.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/events"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all shadow-xl hover:shadow-blue-500/20 active:scale-95 flex items-center"
            >
              Explore Events <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              href="/gallery"
              className="px-8 py-4 glass text-white hover:bg-white/20 rounded-2xl font-bold transition-all active:scale-95"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 space-y-32">
        {/* Announcements Section */}
        <section>
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center text-blue-600 font-bold uppercase tracking-widest text-sm mb-3">
                <Megaphone size={16} className="mr-2" />
                Latest News
              </div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Announcements</h2>
            </div>
            <Link href="/announcements" className="hidden md:flex items-center text-blue-600 font-bold hover:underline">
              View All <ArrowRight size={18} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.slice(0, 3).map((a: any, i) => (
              <AnnouncementCard key={i} announcement={a} />
            ))}
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section>
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center text-blue-600 font-bold uppercase tracking-widest text-sm mb-3">
                <Calendar size={16} className="mr-2" />
                Get Involved
              </div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Upcoming Events</h2>
            </div>
            <Link href="/events" className="hidden md:flex items-center text-blue-600 font-bold hover:underline">
              View All <ArrowRight size={18} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.slice(0, 3).map((e: any) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </section>

        {/* Gallery Preview */}
        <section className="pb-12">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center text-blue-600 font-bold uppercase tracking-widest text-sm mb-3">
                <ImageIcon size={16} className="mr-2" />
                Memories
              </div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Recent Gallery</h2>
            </div>
            <Link href="/gallery" className="hidden md:flex items-center text-blue-600 font-bold hover:underline">
              Full Gallery <ArrowRight size={18} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {MOCK_GALLERY.map((imgSrc, i) => (
              <div key={i} className="aspect-square rounded-3xl overflow-hidden bg-slate-100 group cursor-pointer relative">
                <img
                  src={imgSrc}
                  alt="Gallery"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-90 group-hover:brightness-100"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
