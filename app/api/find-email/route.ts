import prisma from "@/app/lib/prisma";

interface  RequestBody {
    name?: string;
    birthday?: string;
}

export async function POST(request: Request) {
    try{
    const body: RequestBody = await request.json()

    if(!body.name) {
        return new Response(JSON.stringify({error: "이름을 입력해 주세요."}), {status:400});
    } else if (!body.birthday) {
        return new Response(JSON.stringify({error: "생년월일을 입력해주세요."}), {status:400});
    }

    const user = await prisma.user.findMany({
        where: {
            name: body.name,
            bday: body.birthday,
        },
    });

    if (user) {
        const emails = user.map(user => user.email);
     return new Response(JSON.stringify(emails));
    }
    } catch (error) {
        console.error("error fetching user:", error);
        return new Response("An error occurred.", {status: 500});
    }
}