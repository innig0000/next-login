import prisma from '@/app/lib/prisma'
import {verifyJwt} from "@/app/lib/jwt";

interface  RequestBody {
    title?: string;
    content?: string;
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const body: RequestBody = await request.json()

        const updatedPostData = {
            title: body.title,
            content: body.content,
        }

        const accessToken = request.headers.get('authorization')
        if (!accessToken || !verifyJwt(accessToken)) {
            return new Response(JSON.stringify({error: 'No Authorization'}), {
                status: 401,
            })
        } else {
            const id = Number(params.id)
            console.debug(id);
            const updatedPost = await prisma.post.update({
                where: {
                    id: id,
                },
                data: updatedPostData,
            });
            console.log("포스트 수정 성공:", updatedPost);
            return new Response(JSON.stringify(updatedPost))
        }
    } catch (error) {
        console.error("포스트 수정 실패:", error);
    }
}