'use client'
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import {Button} from "react-bootstrap";

const Top = () => {

    const { data: session } = useSession();

    if (session && session.user) {
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
                    <Button variant="outline-secondary">{session.user.name}님이 쓴 글</Button>
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