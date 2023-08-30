import prisma from '@/app/lib/prisma'

export async function POST( request: Request ) {
    const body = await request.json()
    console.debug(body.email);
    try{
        const users = await prisma.user.findMany({
        })
        console.debug(users);
            const isEmailTaken = users.some(user => user.email === body.email);
            console.debug(isEmailTaken);
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