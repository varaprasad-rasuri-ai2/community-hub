import jwt, { JwtPayload } from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function signJWT(payload: JwtPayload): Promise<string> {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' })
}

export async function verifyJWT(token: string): Promise<JwtPayload | null> {
    try {
        return jwt.verify(token, JWT_SECRET) as JwtPayload
    } catch {
        return null
    }
}

export async function getSession() {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value
    if (!token) return null
    return verifyJWT(token)
}
