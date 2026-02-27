import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyJWT } from '@/lib/auth'

export async function middleware(request: NextRequest) {
    // Only protect /admin/dashboard and related routes
    // /admin/login should be accessible
    if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
        const token = request.cookies.get('auth_token')?.value

        if (!token || !(await verifyJWT(token))) {
            const url = request.nextUrl.clone()
            url.pathname = '/admin/login'
            return NextResponse.redirect(url)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/dashboard/:path*'],
}
