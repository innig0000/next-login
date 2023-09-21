'use client'
import {useEffect, useState} from "react";
import Link from "next/link";
import {Button} from "react-bootstrap";

const SentenceSnow = () => {

    const [position, setPosition] = useState(0);

    const onScroll = () => {
        setPosition(window.scrollY);
        console.debug(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <main className='flex min-h-screen flex-col items-center space-y-10 p-24'>
            <img src="/firewall.jpeg" style={{width: "570px", height: "auto", opacity: `${1-position/500}`}}/>
            <img src="/arrow_down_icon.png" style={{width: "50px", height: "auto", opacity: `${1-position/500}`}}/>
            <p style={{positionY: position / -200, opacity: `${position / 500}`, transform: `translateY(${position / -3}px)`}}>
                환영합니다.
            </p>
            <p style={{opacity: `${position / 700}`, transform: `translateY(${position / -4}px)`}}>
                <Link href="/allpost">
                    <Button variant="outline-secondary">
                        모든 글
                    </Button>
                </Link>
                을 클릭하여 여러분이 작성한 글들을 읽어보세요.
            </p>
            <p style={{opacity: `${position / 800}`, transform: `translateY(${position / -5}px)`}}>
                <Link href="/newuser">
                    <Button variant="outline-secondary">
                        회원 가입
                    </Button>
                </Link>
                &
                <Link href="/signin">
                    <Button variant="outline-secondary">
                        로그인
                    </Button>
                </Link>
                을 하면 글을 쓸 수 있어요.
            </p>
                <img src="/reading.jpeg" alt="배경 이미지" style={{opacity: `${(position-500)/900}`, transform: `translateY(${position / -20}px)`}}/>
            <div>
            <p style={{opacity: `${(position-1500)/600}`, transform: `translateY(${1800-position}px)`}}>"좋은 글은 독자의 생각을 바꾸고,</p>
            <p style={{opacity: `${(position-1500)/600}`, transform: `translateY(${(1800-position) / 1.5}px)`}}>마음을 움직이며,</p>
            <p style={{opacity: `${(position-1500)/600}`, transform: `translateY(${(1800-position) / 3}px)`}}>세상을 보는 시선을 바꿔준다."</p>
            <p style={{opacity: `${(position-1500)/600}`, transform: `translateY(${(1800-position) / 6}px)`}}>- George Orwell</p>
            <p></p>
            <p></p>
            <p></p>
            </div>
        </main>
    )
}

export default SentenceSnow;