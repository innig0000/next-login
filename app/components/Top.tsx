'use client'
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import {Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";

const Top = () => {

    const { data: session } = useSession();
    const [storedSession, setStoredSession] = useState({
        user: {
            id: "",
            name: "",
            email: "",
        }
    });

    useEffect(() => {
        const storedSessionString = localStorage.getItem('userSession');
        if (storedSessionString) {
            const storedSession = JSON.parse(storedSessionString);
            setStoredSession(storedSession);
        }
    }, []);

    useEffect(() => {
        if (session) {
            localStorage.setItem('userSession', JSON.stringify(session));
            setStoredSession(session);
        } else {
            localStorage.removeItem('userSession');
            setStoredSession(null);
        }
    }, [session]);

    if (storedSession && storedSession.user) {
    return (
        <header className="header">
            <nav className="nav">
                <ul className="nav-list">
                </ul>
            </nav>
            <div className="auth">
                <Link href="/">
                    <Button variant="outline-info">홈</Button>
                </Link>
                <Link href="/posting">
                    <Button variant="outline-secondary">새 글 쓰기</Button>
                </Link>
                <Link href="/userposts">
                    <Button variant="outline-secondary">{storedSession.user.name}님이 쓴 글</Button>
                </Link>
                <Link href="/mypage">
                       <Button variant="outline-secondary">마이페이지</Button>
                </Link>
                <Button
                    variant="outline-secondary"
                    onClick={() => signOut()}
                >
                    로그아웃
                </Button>
            </div>
        </header>
                );
    } //if...

                return (
                <header className="header">
                    <nav className="nav">
                        <ul className="nav-list">
                        </ul>
                    </nav>
                    <div className="auth">
                        <Link href="/">
                            <Button variant="outline-info">홈</Button>
                        </Link>


                        <Link href="/signin">
                    <Button variant="outline-secondary">로그인</Button>
                </Link>
                <Link href="/newuser">
                    <Button variant="outline-secondary">회원가입</Button>
                </Link>
            </div>
        </header>
    );
}

export default Top;