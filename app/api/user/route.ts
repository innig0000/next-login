import prisma from '@/app/lib/prisma'
import * as bcrypt from 'bcrypt'
import * as yup from 'yup';

const createUserSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    birthday: yup
        .string()
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .test('is-future-date', '날짜가 유효하지 않습니다.', function(value) {
            const currentDate = new Date();
            return new Date(value) <= currentDate;
        })
        .required(),
});

interface RequestBody {
    name: string;
    email: string;
    password: string;
    birthday: string;
}

export async function POST(request: Request) {
    try {
        const body: RequestBody = await request.json()

        try {
            await createUserSchema.validate(body, {abortEarly: false});
        } catch (error) {
            return new Response(JSON.stringify({errors: error.errors}), {status: 400});
        }

        const existingUser = await prisma.user.findUnique({
            where: {email: body.email},
        });

        if (existingUser) {
            return new Response(JSON.stringify({error: 'Email is already in use'}), {status: 400});
        }

        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: await bcrypt.hash(body.password, 10),
                bday: body.birthday,
            },
        })

        const {bday, ...result} = user
        return new Response(JSON.stringify(result));
    } catch (error) {
        console.error('사용자 생성 중 오류 발생:', error);
        return new Response(JSON.stringify({ error: '내부 서버 오류'}), {status: 500});
    }
}