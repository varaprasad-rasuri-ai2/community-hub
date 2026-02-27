'use client'

import { motion } from 'framer-motion'
import { Megaphone, Calendar } from 'lucide-react'

interface AnnouncementCardProps {
    announcement: {
        title: string
        message: string
        createdAt: Date
    }
}

const AnnouncementCard = ({ announcement }: AnnouncementCardProps) => {
    const formattedDate = new Date(announcement.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    })

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm"
        >
            <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-600">
                    <Megaphone size={20} />
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-slate-900 dark:text-white">
                            {announcement.title}
                        </h4>
                        <div className="flex items-center text-xs text-slate-500">
                            <Calendar size={12} className="mr-1" />
                            {formattedDate}
                        </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {announcement.message}
                    </p>
                </div>
            </div>
        </motion.div>
    )
}

export default AnnouncementCard
