import prisma from '@/app/lib/prisma'
import {verifyJwt} from "@/app/lib/jwt";

export async function GET(
    request: Request,
    { params }: { params: { id: string } },
) {
    const accessToken = request.headers.get('authorization')
    if (!accessToken || !verifyJwt(accessToken)) {
        return new Response(JSON.stringify({error: 'No Authorization'}), {
            status: 401,
        })
    } else {

        const id = Number(params.id)
        const page = request.url.split('?')[1].split('page=')[1] || 1;
        const pageSize = 10;
        const offset = (page - 1) * pageSize;
        const totalItems = await prisma.post.count({
            where: {
                authorId: id,
            },
        });
        const totalpages = Math.ceil(totalItems / pageSize)

        const userPosts = await prisma.post.findMany({
            orderBy: {
                id: 'desc'
            },
            where: {
                authorId: id,
            },
            include: {
                author: {
                    select: {
                        email: true,
                        name: true,
                    },
                },
            },
            take : parseInt(pageSize),
            skip : parseInt(offset),
        })

        return new Response(JSON.stringify({
            data: userPosts,
            total_items: totalItems,
            current_page: page,
            total_pages: totalpages,
            page_size: pageSize,
        }))
    }
}