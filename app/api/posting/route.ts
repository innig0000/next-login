import prisma from '@/app/lib/prisma'
import {verifyJwt} from "@/app/lib/jwt";

interface RequestBody {
    title: string;
    content: string;
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json()
    const accessToken = request.headers.get('authorization')
    if (!accessToken || !verifyJwt(accessToken)) {
        return new Response(JSON.stringify({error: 'No Authorization'}), {
            status: 401,
        })
    }
    const res = verifyJwt(accessToken);
    const id = Number(res.id);

    const newPost = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            author: {
                connect: {
                    id: id
                }
            }
        },
    })
console.debug(newPost);
    return new Response(newPost.id)
}