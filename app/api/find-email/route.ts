import prisma from "@/app/lib/prisma";

interface  RequestBody {
    name?: string;
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json()

    if(!body.name) {
        return new Response("Name is required.", {status:400});
    }

    try{
    const user = await prisma.user.findMany({
        where: {
            name: body.name,
        },
    });
    
    if (user) {
        const emails = user.map(user => user.email);
     return new Response(JSON.stringify(emails));}
    } catch (error) {
        console.error("error fetching user:", error);
        return new Response("An error occurred.", {status: 500});
    }
}