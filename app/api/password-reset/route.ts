import prisma from '@/app/lib/prisma'
const nodemailer = require('nodemailer');
import * as bcrypt from 'bcrypt'
require('dotenv').config();

interface RequestBody {
    name?: string;
    email?: string;
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json()
    console.debug(body.email);

    const user = await prisma.user.findFirst({
        where: {
            email: body.email,
        },
    })

    if (user === null) {
        return new Response(JSON.stringify(user));
    }

    function generateTemporaryPassword() {
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