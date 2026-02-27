'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Calendar, MapPin, Clock, ArrowLeft, Share2 } from 'lucide-react'

interface Media {
    id: string
    url: string
    type: string
}

interface CommunityEvent {
    id: string
    title: string
    description: string
    date: Date | string
    time?: string
    location: string
    category?: string
    coverImage?: string
    media?: Media[]
}

export default function EventDetail() {
    const { id } = useParams()
    const router = useRouter()
    const [event, setEvent] = useState<CommunityEvent | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await fetch(`/api/events/${id}`)
                if (res.ok) {
                    const data = await res.json()
                    setEvent(data)
                }
            } catch (error) {
                console.error('Failed to fetch event:', error)
            } finally {
                setLoading(false)
            }
        }
        if (id) {
            fetchEvent()
        }
    }, [id])

    if (loading) return (
        <div className="container mx-auto px-4 py-12">
            <div className="h-[400px] w-full bg-slate-100 dark:bg-slate-800 rounded-[3rem] animate-pulse mb-8" />
            <div className="h-12 w-1/3 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
        </div>
    )

    if (!event) return (
        <div className="container mx-auto px-4 py-24 text-center">
            <h1 className="text-2xl font-bold mb-4">Event not found</h1>
            <button onClick={() => router.back()} className="text-blue-600 font-bold hover:underline">Go Back</button>
        </div>
    )

    return (
        <div className="container mx-auto px-4">
            <button
                onClick={() => router.back()}
                className="flex items-center text-slate-500 font-bold hover:text-blue-600 transition-colors mb-8"
            >
                <ArrowLeft size={18} className="mr-2" /> Back to Events
            </button>

            <div className="relative h-[400px] w-full rounded-[3rem] overflow-hidden mb-12 shadow-2xl">
                <Image
                    src={event.coverImage || 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1500'}
                    alt={event.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-10 left-10">
                    <div className="flex items-center space-x-2 mb-4">
                        <span className="px-4 py-1.5 rounded-full glass text-white text-xs font-black uppercase tracking-widest leading-none">
                            {event.category || 'Event'}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white">{event.title}</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 space-y-8">
                    <section>
                        <h2 className="text-2xl font-black mb-6 flex items-center">
                            About the Event
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                            {event.description}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black mb-6">Gallery</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {event.media && event.media.length > 0 ? (
                                event.media.map((m) => (
                                    <div key={m.id} className="aspect-square rounded-3xl overflow-hidden bg-slate-100 relative">
                                        <Image src={m.url} alt="Event Media" fill className="object-cover" />
                                    </div>
                                ))
                            ) : (
                                <p className="text-slate-400 text-sm italic">No photos uploaded yet.</p>
                            )}
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm space-y-6 sticky top-24">
                        <h3 className="text-xl font-bold mb-4">Event Details</h3>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white dark:bg-slate-700 rounded-2xl shadow-sm text-blue-600">
                                <Calendar size={20} />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Date</div>
                                <div className="font-bold">{new Date(event.date).toLocaleDateString(undefined, { dateStyle: 'long' })}</div>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white dark:bg-slate-700 rounded-2xl shadow-sm text-blue-600">
                                <Clock size={20} />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Time</div>
                                <div className="font-bold">{event.time || 'TBA'}</div>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white dark:bg-slate-700 rounded-2xl shadow-sm text-blue-600">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Location</div>
                                <div className="font-bold">{event.location}</div>
                            </div>
                        </div>

                        <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center">
                            Add to Calendar
                        </button>

                        <button className="w-full py-4 glass text-slate-600 dark:text-slate-300 rounded-2xl font-bold flex items-center justify-center">
                            <Share2 size={18} className="mr-2" /> Share Event
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
