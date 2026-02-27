'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Calendar, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'

interface EventCardProps {
    event: {
        id: string
        title: string
        description: string
        date: Date
        time?: string
        location: string
        category?: string
        coverImage?: string
    }
}

const EventCard = ({ event }: EventCardProps) => {
    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="group relative bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700 transition-all hover:shadow-2xl"
        >
            <Link href={`/events/${event.id}`}>
                <div className="relative h-48 w-full overflow-hidden">
                    {event.coverImage ? (
                        <Image
                            src={event.coverImage}
                            alt={event.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white/20">
                            <Calendar size={64} />
                        </div>
                    )}
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass text-xs font-bold uppercase tracking-wider text-blue-600">
                        {event.category || 'General'}
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                        {event.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-4">
                        {event.description}
                    </p>

                    <div className="space-y-2">
                        <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                            <Calendar size={16} className="mr-2 text-blue-500" />
                            <span>{formattedDate}</span>
                        </div>
                        {event.time && (
                            <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                                <Clock size={16} className="mr-2 text-blue-500" />
                                <span>{event.time}</span>
                            </div>
                        )}
                        <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                            <MapPin size={16} className="mr-2 text-blue-500" />
                            <span>{event.location}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

export default EventCard
