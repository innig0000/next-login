import prisma from '@/app/lib/prisma'
import {verifyJwt} from "@/app/lib/jwt";

export async function DELETE(
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
        console.debug(id);
        const deletedPost = await prisma.post.delete({
            where: {
                id: id,
            },
        });
        console.debug(deletedPost);

        return new Response(JSON.stringify(deletedPost))
    }
}