const nodemailer = require('nodemailer');

export async function POST(req, res) {

// Nodemailer 설정
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jy.park@x-widget.org', // 이메일 계정
            pass: 'ptevspsjitrnsgyo', // 이메일 계정 비밀번호
        },
    });

// 이메일 전송 설정
    const mailOptions = {
        from: 'jy.park@x-widget.org', // 보내는 이메일 주소
        to: "innig0000@gmail.com", // 받는 이메일 주소
        subject: '이메일 전송을 테스트합니다33333', // 이메일 제목
        text: '이메일을 보냅니다.', // 이메일 내용
    };

// 이메일 전송
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('이메일 전송 오류:', error);
        } else {
            console.log('이메일이 성공적으로 전송되었습니다.')
        }
    });
}





