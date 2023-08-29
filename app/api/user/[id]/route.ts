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

        const userPosts = await prisma.post.findMany({
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
        })
        return new Response(JSON.stringify(userPosts))
    }
}