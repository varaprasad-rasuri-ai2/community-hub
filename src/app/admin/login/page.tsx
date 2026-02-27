'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react'

export default function AdminLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })

            if (res.ok) {
                router.push('/admin/dashboard')
            } else {
                setError('Invalid credentials. Please try again.')
            }
        } catch (err) {
            setError('An error occurred. Please try again later.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md glass p-10 rounded-[2.5rem] shadow-2xl border border-white/40 dark:border-slate-800"
            >
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-blue-600/10 text-blue-600 mb-6">
                        <ShieldCheck size={40} />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Admin Portal</h1>
                    <p className="text-slate-500 font-medium">Please sign in to manage your community</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-4 mb-2 block">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@community.com"
                                className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 border border-slate-100 dark:border-slate-700 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-4 mb-2 block">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 border border-slate-100 dark:border-slate-700 transition-all"
                            />
                        </div>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium border border-red-100"
                        >
                            {error}
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-lg transition-all shadow-lg shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.98] flex items-center justify-center disabled:opacity-50"
                    >
                        {loading ? 'Authenticating...' : 'Sign In'}
                        {!loading && <ArrowRight className="ml-2" size={20} />}
                    </button>
                </form>
            </motion.div>
        </div>
    )
}
