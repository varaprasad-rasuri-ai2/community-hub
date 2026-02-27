'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Image as ImageIcon, X } from 'lucide-react'

export default function GalleryPage() {
    const [selectedMedia, setSelectedMedia] = useState<{ url: string, title?: string, isVideo?: boolean } | null>(null)

    const photos = [
        { url: '/media/events/zumba/zumba-poster.jpeg', title: '🔥 Zumba 2-Day Free Workshop by 2A Dance Studio' },
        { url: '/media/events/holi/holi-poster.jpeg', title: 'STM Phase 3 Holi Celebrations' },
        { url: '/media/events/womens-day/womens-day-1.jpeg', title: "Women's Day Special Liva Expo - 1" },
        { url: '/media/events/womens-day/womens-day-2.jpeg', title: "Women's Day Special Liva Expo - 2" },
        { url: '/media/events/womens-day/womens-day-video.mp4', title: 'Special Expo Video' },
        { url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800', title: 'Community Dinner' },
        { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800', title: 'Summer Workshop' },
        { url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800', title: 'Holiday Celebration' },
        { url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800', title: 'Game Night' },
        { url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800', title: 'Outdoor Cinema' },
        { url: 'https://images.unsplash.com/photo-1522158633578-36c078e5588a?q=80&w=800', title: 'Fitness Meetup' }
    ]

    return (
        <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <div className="inline-flex items-center px-4 py-2 rounded-full glass text-blue-600 font-bold text-sm mb-6">
                    <ImageIcon size={16} className="mr-2" />
                    Community Memories
                </div>
                <h1 className="text-4xl md:text-6xl font-black mb-6">Gallery</h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
                    Relive the best moments from our community events and gatherings.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {photos.map((photo, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative h-80 rounded-[2rem] overflow-hidden shadow-lg cursor-pointer"
                        onClick={() => setSelectedMedia({ url: photo.url, title: photo.title, isVideo: photo.url.endsWith('.mp4') })}
                    >
                        {photo.url.endsWith('.mp4') ? (
                            <video
                                src={photo.url}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                        ) : (
                            <img
                                src={photo.url}
                                alt={photo.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                            <h3 className="text-white font-bold text-xl">{photo.title}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Media Modal */}
            <AnimatePresence>
                {selectedMedia && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8"
                        onClick={() => setSelectedMedia(null)}
                    >
                        <button
                            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                            onClick={() => setSelectedMedia(null)}
                        >
                            <X size={24} />
                        </button>

                        <div
                            className="relative max-w-5xl w-full h-full flex items-center justify-center p-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {selectedMedia.isVideo ? (
                                <video
                                    src={selectedMedia.url}
                                    className="max-h-[85vh] max-w-full rounded-2xl shadow-2xl"
                                    controls
                                    autoPlay
                                />
                            ) : (
                                <img
                                    src={selectedMedia.url}
                                    alt={selectedMedia.title || "Gallery Image"}
                                    className="max-h-[85vh] max-w-full rounded-2xl shadow-2xl object-contain bg-black"
                                />
                            )}

                            {selectedMedia.title && (
                                <div className="absolute bottom-4 left-0 right-0 text-center">
                                    <span className="bg-black/60 text-white px-6 py-2 rounded-full backdrop-blur-sm shadow-lg font-medium">
                                        {selectedMedia.title}
                                    </span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
