import prisma from "@/app/lib/prisma";
const nodemailer = require('nodemailer');
import * as bcrypt from 'bcrypt'
import {verifyJwt} from "@/app/lib/jwt";
require('dotenv').config();
import * as yup from 'yup';
import {signJwtAccessToken} from "@/app/lib/jwt";

interface  emailRequestBody {
    name?: string;
    birthday?: string;
}

interface passwordRequestBody {
    name?: string;
    email?: string;
}

interface newPasswordRequestBody {
    password?: string;
    newPassword?: string;
    checkPassword?: string;
}

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

interface newUserRequestBody {
    name: string;
    email: string;
    password: string;
    birthday: string;
}

interface checkemailRequestBody {
    email: string;
}

interface userBody {
    email: string;
}

interface loginRequestBody {
    username?: string;
    password?: string;
}

export async function POST (
    request: Request,
    { params }: { params: { param : string } },
){
    const param = params.param;
    switch (param) {

//이메일 주소 찾기
        case 'find-email':
            try
            {
                const body: emailRequestBody = await request.json()

                if (!body.name) {
                    return new Response(JSON.stringify({error: "이름을 입력해 주세요."}), {status: 400});
                } else if (!body.birthday) {
                    return new Response(JSON.stringify({error: "생년월일을 입력해주세요."}), {status: 400});
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

            }
            catch (error) {
                console.error("error fetching user:", error);
                return new Response("An error occurred.", {status: 500});
            }
            break;

//마이페이지에서 비밀번호 바꾸기
        case 'newPassword':
            try{
                const body: newPasswordRequestBody = await request.json()
                const accessToken = request.headers.get('authorization')
                const res: userBody = verifyJwt(accessToken);
                const user = await prisma.user.findFirst({
                    where: {
                        email: res.email,
                    }
                })

                const isPasswordValid = await bcrypt.compare(body.password, user.password)

                if(!isPasswordValid) {
                    return new Response(JSON.stringify('비밀번호가 틀립니다.'), { status: 400 });
                }

                if (body.newPassword !== body.checkPassword) {
                    return new Response(JSON.stringify('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.'), {status: 400});
                }

                if (body.password === body.newPassword) {
                    return new Response(JSON.stringify('기존 비밀번호와 다른 새로운 비밀번호를 입력하세요.'), {status: 400});
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
                return new Response(JSON.stringify('서버 오류가 발생했습니다.'), {status: 500});
            }
            break;

//회원가입
        case 'newUser':
            try {
                const body: newUserRequestBody = await request.json()

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
            break;

//회원가입 시 이메일 중복 확인
        case 'check-email':
            try{
                const body: checkemailRequestBody = await request.json()
                const users = await prisma.user.findMany({
                })

                const isEmailTaken = users.some(user => user.email === body);

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
            break;

//임시 비밀번호 발급
        case 'password-reset':
            try{
                const body: passwordRequestBody = await request.json()

                const user = await prisma.user.findFirst({
                    where: {
                        email: body.email,
                    },
                })

                if (user === null) {
                    return new Response(JSON.stringify(user));
                }

            const generateTemporaryPassword = () => {
                const length = 10; // 임시 비밀번호 길이
                const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                let temporaryPassword = '';
                for (let i = 0; i < length; i++) {
                    const randomIndex = Math.floor(Math.random() * charset.length);
                    temporaryPassword += charset[randomIndex];
                }
                return temporaryPassword;
            }

                const temporaryPassword = generateTemporaryPassword();
                console.debug(temporaryPassword);


                // 이메일 전송
                if (user.name === body.name) {

                    await prisma.user.update({
                        where: {
                            email: body.email,
                        },
                        data: {
                            password: await bcrypt.hash(temporaryPassword, 10),
                        },
                    });

                  // Nodemailer 설정
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: process.env.MAIL_ID, // 이메일 계정
                            pass: process.env.MAIL_PASSWORD, // 이메일 계정 비밀번호
                        },
                    });

                    // 이메일 전송 설정
                    const mailOptions = {
                        from: process.env.MAIL_ID, // 보내는 이메일 주소
                        to: `${body.email}`, // 받는 이메일 주소
                        subject: '임시 비밀번호를 보내드립니다.', // 이메일 제목
                        text: `임시비밀번호 입니다: ${temporaryPassword}`, // 이메일 내용
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.error('이메일 전송 오류:', error);
                        } else {
                            console.log('이메일이 성공적으로 전송되었습니다.')
                        }
                    });
                } else {
                    console.log('사용자 이름과 이메일 주소를 알맞게 입력하세요.')
                }

                return new Response(JSON.stringify(user.name));
            }
            catch (error) {
                console.error("error fetching user:", error);
                return new Response("An error occurred.", {status: 500});
            }
            break;

//로그인
        case 'login':
            try {
                const body: loginRequestBody = await request.json()

                const user = await prisma.user.findFirst({
                    where: {
                        email: body.username,
                    },
                })

                if (user && (await bcrypt.compare(body.password, user.password))) {
                    const { password, ...userWithoutPass } = user

                    const accessToken = signJwtAccessToken(userWithoutPass);
                    const result = {
                        ...userWithoutPass,
                        accessToken,
                    };

                    return new Response(JSON.stringify(result))
                } else return new Response(JSON.stringify(null))
            } catch (error) {
                console.error("error fetching user:", error);
                return new Response("An error occurred.", {status: 500});
            }
            break;

        default:
            return new Response(JSON.stringify({error: "잘못된 param 입니다"}), {status: 400});
            break;
    }
}