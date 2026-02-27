'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    BarChart3,
    Calendar,
    Megaphone,
    Image as ImageIcon,
    Plus,
    Settings,
    MoreVertical,
    Trash2,
    Edit2
} from 'lucide-react'

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview')
    const [stats] = useState([
        { name: 'Total Events', value: '12', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
        { name: 'Active Announcements', value: '5', icon: Megaphone, color: 'text-orange-600', bg: 'bg-orange-50' },
        { name: 'Gallery Media', value: '48', icon: ImageIcon, color: 'text-purple-600', bg: 'bg-purple-50' },
        { name: 'Admin Actions', value: '124', icon: Settings, color: 'text-slate-600', bg: 'bg-slate-50' }
    ])

    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black mb-2">Admin Dashboard</h1>
                    <p className="text-slate-500 font-medium">Manage your community content and engagement.</p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95">
                        <Plus size={20} className="mr-2" /> New Event
                    </button>
                    <button className="flex items-center px-6 py-3 glass rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-95">
                        <Plus size={20} className="mr-2" /> Post Announcement
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((stat, i) => {
                    const Icon = stat.icon
                    return (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm"
                        >
                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} inline-block mb-4`}>
                                <Icon size={24} />
                            </div>
                            <h3 className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-1">{stat.name}</h3>
                            <p className="text-3xl font-black">{stat.value}</p>
                        </motion.div>
                    )
                })}
            </div>

            {/* Main Content Areas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Recent Events List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold">Recent Events</h2>
                        <button className="text-sm font-bold text-blue-600 hover:underline">View All</button>
                    </div>

                    <div className="glass rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 dark:bg-slate-800/50">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Event</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Date</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {[1, 2, 3].map(i => (
                                    <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="font-bold text-slate-900 dark:text-white">Summer Party {i}</div>
                                            <div className="text-xs text-slate-500">Social • Pool Area</div>
                                        </td>
                                        <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-400">July 1{i}, 2026</td>
                                        <td className="px-6 py-5">
                                            <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-[10px] font-bold uppercase tracking-wider">Active</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex gap-2">
                                                <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors"><Edit2 size={16} /></button>
                                                <button className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                                <button className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"><MoreVertical size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Announcements Quick View */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold">Announcements</h2>
                        <button className="text-sm font-bold text-blue-600 hover:underline">View All</button>
                    </div>

                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm relative group">
                                <div className="pr-12">
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-2 leading-tight">Maintenance Notice #{i}</h4>
                                    <p className="text-xs text-slate-500 line-clamp-2">This is a summary of the announcement message that might go on for a couple of lines...</p>
                                </div>
                                <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
