import prisma from '@/app/lib/prisma'

export async function GET(request: Request) {

        const allPosts = await prisma.post.findMany({
                include: {
                        author: {
                                select: {
                                        email: true,
                                        name: true,
                                }
                        }
                }
        });
        console.debug(allPosts);
        return new Response(JSON.stringify(allPosts));

}