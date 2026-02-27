'use client'

import { useState, useEffect } from 'react'
import { Megaphone, Search, Filter } from 'lucide-react'
import AnnouncementCard from '@/components/AnnouncementCard'

interface Announcement {
    id: string
    title: string
    message: string
    createdAt: Date
}

export default function AnnouncementsPage() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const res = await fetch('/api/announcements')
                if (res.ok) {
                    const data = await res.json()
                    setAnnouncements(data)
                }
            } catch (error) {
                console.error('Failed to fetch announcements:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchAnnouncements()
    }, [])

    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div className="max-w-2xl">
                    <div className="inline-flex items-center px-4 py-2 rounded-full glass text-blue-600 font-bold text-sm mb-6">
                        <Megaphone size={16} className="mr-2" />
                        Community Updates
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6">Announcements</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
                        Stay informed with the latest news, guidelines, and flash updates from the community.
                    </p>
                </div>

                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search announcements..."
                            className="pl-12 pr-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 border border-slate-100 dark:border-slate-700 w-full md:w-64"
                        />
                    </div>
                    <button className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 transition-colors">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-48 rounded-3xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
                    ))}
                </div>
            ) : announcements.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {announcements.map((announcement) => (
                        <AnnouncementCard key={announcement.id} announcement={announcement} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 bg-slate-50 dark:bg-slate-800/30 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-700">
                    <Megaphone className="mx-auto text-slate-300 mb-4" size={48} />
                    <p className="text-slate-500">No announcements found. You're all caught up!</p>
                </div>
            )}
        </div>
    )
}
