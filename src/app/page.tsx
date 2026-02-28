'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar, Megaphone, Image as ImageIcon } from 'lucide-react'
import EventCard from '@/components/EventCard'
import AnnouncementCard from '@/components/AnnouncementCard'

const MOCK_GALLERY = [
  '/media/events/zumba/zumba-poster.jpeg',
  '/media/events/health-checkup/master-health-checkup.jpeg',
  '/media/events/breast-screening/poster.jpeg',
  '/media/events/holi/holi-poster.jpeg',
]

interface HomeEvent {
  id: string
  title: string
  description: string
  date: Date
  time?: string
  location: string
  category?: string
  coverImage?: string
}

interface HomeAnnouncement {
  id?: string
  title: string
  message: string
  createdAt: Date
}

export default function Home() {
  const [events, setEvents] = useState<HomeEvent[]>([])
  const [announcements, setAnnouncements] = useState<HomeAnnouncement[]>([])
  const [eventsError, setEventsError] = useState<string>('')
  const [announcementsError, setAnnouncementsError] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, announcementsRes] = await Promise.all([
          fetch('/api/events'),
          fetch('/api/announcements')
        ])

        if (eventsRes.ok) {
          const eventsData: HomeEvent[] = await eventsRes.json()
          setEvents(eventsData)
        } else {
          const errorData = await eventsRes.json()
          setEventsError(errorData.details || errorData.error || 'Failed to load events')
        }

        if (announcementsRes.ok) {
          const announcementsData: HomeAnnouncement[] = await announcementsRes.json()
          setAnnouncements(announcementsData)
        } else {
          const errorData = await announcementsRes.json()
          setAnnouncementsError(errorData.details || errorData.error || 'Failed to load announcements')
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setEventsError('Network error - could not connect to server')
        setAnnouncementsError('Network error - could not connect to server')
      }
    }

    fetchData()
  }, [])

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden rounded-[40px] mx-4">
        <div className="absolute inset-0 z-0">
          <Image
            src="/media/community/stm-entrance.jpg"
            alt="Community"
            fill
            className="object-cover brightness-50"
            priority
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

          {announcementsError ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
              <p className="font-semibold">Error loading announcements</p>
              <p className="text-sm mt-1">{announcementsError}</p>
            </div>
          ) : announcements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {announcements.slice(0, 3).map((a, i) => (
                <AnnouncementCard key={i} announcement={a} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700">
              <Megaphone className="mx-auto text-slate-300 mb-4" size={48} />
              <p className="text-slate-500">No announcements yet.</p>
            </div>
          )}
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

          {eventsError ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
              <p className="font-semibold">Error loading events</p>
              <p className="text-sm mt-1">{eventsError}</p>
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.slice(0, 3).map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700">
              <Calendar className="mx-auto text-slate-300 mb-4" size={48} />
              <p className="text-slate-500">No upcoming events. Check back later!</p>
            </div>
          )}
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
                <Image
                  src={imgSrc}
                  alt="Gallery"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110 brightness-90 group-hover:brightness-100"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
