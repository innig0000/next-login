import prisma from '@/app/lib/prisma'

export async function POST( request: Request ) {
    const body = await request.json()

    try{
        const users = await prisma.user.findMany({
        })

            const isEmailTaken = users.some(user => user.email === body.email);

            return new Response(JSON.stringify({ isEmailTaken }),{
                headers: { 'Content-Type': 'application/json'},
                status: 200,
            });
    } catch (error) {
    return new Response(JSON.stringify({error: 'Internal server error'}), {
        headers: {'Content-Type': 'application/json'},
        status: 500,
    });

    }
}