'use client'
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import {Button, Card} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

const Top = () => {

    const { data: session } = useSession();
    const [storedSession, setStoredSession] = useState({
        user: {
            id: "",
            name: "",
            email: "",
        }
    });
    const router = useRouter();

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

    const deleteLocalStorage = () => {
        localStorage.removeItem('lastPage');
        router.push("/allpost");
    }

    if (storedSession && storedSession.user) {
    return (
        <header className="header">
            <Link href="/">
            <div className="logo">
                <img src="/Logo.jpg" alt="Logo"/>
            </div>
            </Link>
            <nav className="nav">
                <ul className="nav-list">
                </ul>
            </nav>
            <div className="auth">
                <Link href="/">
                    <Button variant="outline-dark">홈</Button>
                </Link>
                    <Button variant="outline-secondary" onClick={deleteLocalStorage}>모든 글</Button>
                <Link href="/posting">
                    <Button variant="outline-secondary">새 글 쓰기</Button>
                </Link>
                <Link href="/userposts">
                    <Button variant="outline-secondary" onClick={deleteLocalStorage}>{storedSession.user.name}님이 쓴 글</Button>
                </Link>
                <Link href="/mypage">
                       <Button variant="outline-secondary">마이페이지</Button>
                </Link>
                <div style={{paddingRight: "1rem"}}>
                <Button
                    variant="outline-secondary"
                    onClick={() => signOut()}
                >
                    로그아웃
                </Button>
                </div>
            </div>
        </header>
                );
    } //if...

                return (
                <header className="header">
                    <Link href="/">
                    <div className="logo">
                        <img src="/Logo.jpg" alt="Logo"/>
                    </div>
                    </Link>
                    <nav className="nav">
                        <ul className="nav-list">
                        </ul>
                    </nav>
                    <div className="auth">
                        <Link href="/">
                            <Button variant="outline-dark">홈</Button>
                        </Link>
                            <Button variant="outline-secondary" onClick={deleteLocalStorage}>모든 글</Button>
                        <Link href="/signin">
                    <Button variant="outline-secondary">로그인</Button>
                </Link>
                <Link href="/newuser"  style={{paddingRight: "1rem"}}>
                    <Button variant="outline-secondary" >회원가입</Button>
                </Link>
            </div>
        </header>
    );
}

export default Top;