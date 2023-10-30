export { default } from 'next-auth/middleware'

export const config = {
    matcher: [
        '/post-table-mine/:path*',
        '/post-write/:path*',
        '/user-info/:path*',
        '/post-edit/:path*',
    ],
}