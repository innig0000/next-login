import prisma from '@/app/lib/prisma'

export async function GET(request: Request) {
        const page = request.url.split('?')[1].split('page=')[1] || 1;
        const pageSize = 10;
        const offset = (page - 1) * pageSize;
        const totalItems = await prisma.post.count();
        const totalpages = Math.ceil(totalItems / pageSize)

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
                },
                take : parseInt(pageSize),
                skip : parseInt(offset),

        });

        return new Response(JSON.stringify({
                data: allPosts,
                total_items: totalItems,
                current_page: page,
                total_pages: totalpages,
                page_size: pageSize,
        }));

}