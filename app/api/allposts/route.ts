import prisma from '@/app/lib/prisma'

export async function GET(request: Request) {

        const allPosts = await prisma.post.findMany({
                orderBy: {
                        id: 'desc'
                },
                include: {
                        author: {
                                select: {
                                        email: true,
                                        name: true,
                                }
                        }
                }
        });

        return new Response(JSON.stringify(allPosts));

}