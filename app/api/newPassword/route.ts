import prisma from "@/app/lib/prisma";
import {verifyJwt} from "@/app/lib/jwt";
import * as bcrypt from 'bcrypt'

interface RequestBody {
    password?: string;
    newPassword?: string;
    checkPassword?: string;
}

export async function POST(request: Request) {
    try{
    const body: RequestBody = await request.json()
    const accessToken = request.headers.get('authorization')
    const res = verifyJwt(accessToken);
    const user = await prisma.user.findFirst({
        where: {
            email: res.email,
        }
    })

    const isPasswordValid = await bcrypt.compare(body.password, user.password)

    if(!isPasswordValid) {
        return new Response(JSON.stringify({error:'비밀번호가 틀립니다.'}), { status: 400 });
    }

    if (body.newPassword !== body.checkPassword) {
        return new Response(JSON.stringify({error: '새 비밀번호와 확인 비밀번호가 일치하지 않습니다.'}), {status: 400});
    }

            await prisma.user.update({
                where: {
                    email: user.email,
                },
                data: {
                    password: await bcrypt.hash(body.newPassword, 10),
                },
            });

        return new Response(JSON.stringify({ message: '비밀번호가 업데이트 되었습니다.' }))
    } catch (error) {
     console.error('에러:', error);
     return new Response(JSON.stringify({ error: '서버 오류가 발생했습니다.'}), {status: 500});
    }
}