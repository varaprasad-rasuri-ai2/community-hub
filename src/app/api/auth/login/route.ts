import { NextResponse } from 'next/server'
import { signJWT } from '@/lib/auth'
import db from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json()

        // For MVP, we'll check against a single admin. In a real app, we'd query the DB.
        // If you haven't seeded the DB, this might fail, so let's handle that.
        const user = await db.user.findUnique({
            where: { email }
        })

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
        }

        const token = await signJWT({ userId: user.id, role: user.role })

        const response = NextResponse.json({ success: true, token })

        // Set cookie
        response.cookies.set('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 // 1 day
        })

        return response
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
