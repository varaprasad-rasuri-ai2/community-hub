'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Home, Calendar, Megaphone, Image, Menu, X } from 'lucide-react'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'Events', href: '/events', icon: Calendar },
        { name: 'Announcements', href: '/announcements', icon: Megaphone },
        { name: 'Gallery', href: '/gallery', icon: Image },
    ]

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}
        >
            <div className="container mx-auto px-4">
                <div className={`glass rounded-2xl px-6 py-3 flex items-center justify-between shadow-lg transition-all ${isScrolled ? 'bg-white/80 dark:bg-slate-900/80' : 'bg-white/50 dark:bg-slate-900/50'}`}>
                    <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Community Hub
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => {
                            const Icon = link.icon
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="flex items-center space-x-2 text-sm font-medium hover:text-blue-600 transition-colors"
                                >
                                    <Icon size={18} />
                                    <span>{link.name}</span>
                                </Link>
                            )
                        })}
                        <Link
                            href="/admin/login"
                            className="px-5 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all shadow-md active:scale-95"
                        >
                            Admin
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden absolute top-20 left-4 right-4 glass rounded-2xl p-4 shadow-xl z-50"
                >
                    <div className="flex flex-col space-y-4">
                        {navLinks.map((link) => {
                            const Icon = link.icon
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Icon size={20} />
                                    <span className="font-medium">{link.name}</span>
                                </Link>
                            )
                        })}
                        <Link
                            href="/admin/login"
                            className="flex items-center justify-center p-3 rounded-xl bg-blue-600 text-white font-bold"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Admin Login
                        </Link>
                    </div>
                </motion.div>
            )}
        </nav>
    )
}

export default Navbar
