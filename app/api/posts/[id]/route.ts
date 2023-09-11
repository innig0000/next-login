import prisma from '@/app/lib/prisma'

export async function GET(
    request: Request,
    { params }: { params: { id: string } },
) {

        const id = Number(params.id)

        const Posts = await prisma.post.findFirst({
            where: {
                id: id,
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

        return new Response(JSON.stringify(Posts))

}